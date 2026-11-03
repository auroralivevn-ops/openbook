// Gửi đơn hàng: Google Sheet + Telegram chạy song song.
// - Telegram nhận đơn là báo thành công ngay (khách chỉ chờ ~1–2 giây).
// - Sheet vẫn gửi tiếp kể cả khi khách đóng trang (keepalive).
// - Sheet lỗi → gửi thêm tin Telegram cảnh báo để nhập tay.
// - Telegram lỗi → chờ Sheet tối đa 10 giây. Cả hai lỗi → báo khách gọi hotline.

const pad = (n) => String(n).padStart(2, '0')
const makeOrderId = () => {
  const d = new Date()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `EXB-${String(d.getFullYear()).slice(2)}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}-${rand}`
}
const withTimeout = (promise, ms) =>
  Promise.race([promise, new Promise((resolve) => setTimeout(() => resolve('timeout'), ms))])

export async function submitOrder({ name, phone, address, quantity }) {
  const timestamp = new Date().toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
  const PRICE_MAP = { 1: 199000, 2: 250000, 3: 350000, 4: 450000 };
  const total = PRICE_MAP[quantity] || 199000;
  const shipNote = 'FREESHIP';
  const COMBO_NAMES = {
    1: '1 cuốn Nếu Con Làm Bố Mẹ Một Ngày',
    2: 'Combo 2: Nếu Con Làm Bố Mẹ Một Ngày + Học Ít Nhớ Nhiều',
    3: 'Combo 3: NCLBMMN + Định Luật Murphy + Mẹo Ứng Xử Lịch Sự',
    4: 'Combo 4: NCLBMMN + Murphy + Đắc Nhân Tâm + Mẹo Ứng Xử Lịch Sự (+ Kỷ Luật Tự Giác QUÀ TẶNG)',
  };
  const comboLabel = COMBO_NAMES[quantity] || `${quantity} cuốn`;

  const SHEET_URL = import.meta.env.VITE_APPS_SCRIPT_URL;
  const TG_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const TG_CHAT = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  const orderId = makeOrderId();

  const sendTelegram = (text) =>
    fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      // form-urlencoded = "simple request", không cần preflight → keepalive hoạt động ổn định
      body: new URLSearchParams({ chat_id: TG_CHAT, text, parse_mode: 'Markdown' }),
      keepalive: true,
    })

  // ── BƯỚC 1: Google Sheet — chạy nền, không bị huỷ khi khách đóng trang ──
  const sheetPromise = SHEET_URL
    ? fetch(SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ name, phone, address, quantity, total, note: `${shipNote} | Mã web: ${orderId}`, timestamp, product: comboLabel }),
        redirect: 'follow',
        keepalive: true,
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) console.error('[submitOrder] Apps Script báo lỗi:', data.error)
          return !!data.success
        })
        .catch((err) => { console.error('[submitOrder] Không gọi được Apps Script:', err); return false })
    : Promise.resolve(false)

  // ── BƯỚC 2: Telegram — cùng lúc với Sheet ──
  const telegramMsg =
    `🔔 *Nếu Con Làm Bố Mẹ*\n\n` +
    `📋 Mã đơn: \`${orderId}\`\n` +
    `🕐 ${timestamp}\n\n` +
    `👤 *Khách:* ${name}\n` +
    `📞 *SĐT:* ${phone}\n` +
    `📍 *Địa chỉ:* ${address}\n\n` +
    `📦 *${comboLabel}*\n` +
    `💰 Tổng: *${total.toLocaleString('vi-VN')}đ* (${shipNote})`;

  const telegramPromise = TG_TOKEN && TG_CHAT
    ? withTimeout(
        sendTelegram(telegramMsg)
          .then(async (res) => { if (!res.ok) console.error('[submitOrder] Telegram trả lỗi:', await res.text()); return res.ok })
          .catch((err) => { console.error('[submitOrder] Không gọi được Telegram:', err); return false }),
        8000,
      ).then((r) => r === true)
    : Promise.resolve(false)

  // Sheet lỗi (sau khi Telegram đã nhận) → báo thêm để nhập tay
  if (TG_TOKEN && TG_CHAT && SHEET_URL) {
    sheetPromise.then((ok) => {
      if (!ok) sendTelegram(`⚠️ Đơn \`${orderId}\` (${name} · ${phone}) *chưa vào Google Sheet* — vui lòng nhập tay.`).catch(() => {})
    })
  }

  // ── BƯỚC 3: Quyết định báo khách ──
  const telegramOk = await telegramPromise
  let sheetOk = false
  if (!telegramOk) {
    sheetOk = (await withTimeout(sheetPromise, 10000)) === true
  }

  if (!SHEET_URL && !TG_TOKEN) {
    console.warn('[submitOrder] Không có Apps Script URL hoặc Telegram token — dev mode, đơn không được lưu.');
    // Cho phép qua để dev test UI
  } else if (!telegramOk && !sheetOk) {
    // Cả 2 đều fail — thực sự thất bại
    return { success: false, error: 'Không gửi được đơn — cả Sheet và Telegram đều lỗi' };
  }

  // ── BƯỚC 4: Tracking pixel ──
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'Sách Nếu Con Làm Bố Mẹ Một Ngày',
      content_category: 'Sách giáo dục',
      value: total,
      currency: 'VND',
      num_items: quantity,
    });
    window.fbq('track', 'Purchase', {
      value: total,
      currency: 'VND',
      content_ids: [orderId],
      content_type: 'product',
      num_items: quantity,
    });
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      value: total,
      currency: 'VND',
      items: [{
        item_id: 'sach-neu-con-lam-bo-me',
        item_name: 'Sách Nếu Con Làm Bố Mẹ Một Ngày',
        item_category: 'Sách giáo dục',
        quantity,
        price: 199000,
      }],
    });
    window.gtag('event', 'generate_lead', { currency: 'VND', value: total });
    // Google Ads conversion — Lượt mua hàng
    window.gtag('event', 'conversion', {
      send_to: 'AW-18072732291/VSggCOv8trMcEIOF4KlD',
      transaction_id: orderId,
    });
  }
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track('PlaceAnOrder', {
      contents: [{
        content_id: 'sach-neu-con-lam-bo-me',
        content_name: 'Sách Nếu Con Làm Bố Mẹ Một Ngày',
        content_type: 'product',
        quantity,
        price: 199000,
      }],
      value: total,
      currency: 'VND',
      order_id: orderId,
    });
    window.ttq.track('CompletePayment', {
      contents: [{
        content_id: 'sach-neu-con-lam-bo-me',
        content_name: 'Sách Nếu Con Làm Bố Mẹ Một Ngày',
        content_type: 'product',
        quantity,
        price: 199000,
      }],
      value: total,
      currency: 'VND',
      order_id: orderId,
    });
  }

  return { success: true, orderId, total, sheetOk, telegramOk };
}

export const validatePhone = (p) => /^(03|05|07|08|09)\d{8}$/.test(p.replace(/\s/g, ''));
export const validateName = (n) => n.trim().length >= 2;
export const validateAddress = (a) => a.trim().length >= 10;
