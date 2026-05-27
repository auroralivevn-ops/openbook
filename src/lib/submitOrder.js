export async function submitOrder({ name, phone, address, quantity }) {
  const timestamp = new Date().toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
  const PRICE_MAP = { 1: 179000, 2: 250000, 3: 350000, 4: 450000 };
  const total = PRICE_MAP[quantity] || 179000;
  const shipNote = 'FREESHIP';
  const COMBO_NAMES = {
    1: '1 cuốn Học Ít Nhớ Nhiều',
    2: 'Combo 2: Học Ít Nhớ Nhiều + Mẹo Ứng Xử Lịch Sự',
    3: 'Combo 3: HÍNN + Định Luật Murphy + Mẹo Ứng Xử Lịch Sự',
    4: 'Combo 4: HÍNN + Murphy + Đắc Nhân Tâm + Mẹo Ứng Xử Lịch Sự (+ Kỷ Luật Tự Giác QUÀ TẶNG)',
  };
  const comboLabel = COMBO_NAMES[quantity] || `${quantity} cuốn`;

  const SHEET_URL = import.meta.env.VITE_APPS_SCRIPT_URL;
  const TG_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const TG_CHAT = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  // ── BƯỚC 1: POST tới Apps Script, nhận lại orderId server-side ──
  let orderId = `EXB-FB-${Date.now()}`; // fallback nếu Sheet fail
  let sheetOk = false;

  if (SHEET_URL) {
    try {
      const payload = { name, phone, address, quantity, total, note: shipNote, timestamp };
      const res = await fetch(SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        redirect: 'follow',
      });
      const data = await res.json();
      if (data.success && data.orderId) {
        orderId = data.orderId;
        sheetOk = true;
      } else {
        console.error('[submitOrder] Apps Script báo lỗi:', data.error);
      }
    } catch (err) {
      console.error('[submitOrder] Không gọi được Apps Script:', err);
    }
  }

  // ── BƯỚC 2: Gửi Telegram (backup, dùng orderId từ bước 1) ──
  let telegramOk = false;
  if (TG_TOKEN && TG_CHAT) {
    const telegramMsg =
      `🔔 *ĐƠN HÀNG MỚI - OpenBook*\n\n` +
      `📋 Mã đơn: \`${orderId}\`${sheetOk ? '' : ' ⚠️ (Sheet fail — chỉ có Telegram)'}\n` +
      `🕐 ${timestamp}\n\n` +
      `👤 *Khách:* ${name}\n` +
      `📞 *SĐT:* ${phone}\n` +
      `📍 *Địa chỉ:* ${address}\n\n` +
      `📦 *${comboLabel}*\n` +
      `💰 Tổng: *${total.toLocaleString('vi-VN')}đ* (${shipNote})`;

    try {
      const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT, text: telegramMsg, parse_mode: 'Markdown' }),
      });
      telegramOk = res.ok;
      if (!res.ok) console.error('[submitOrder] Telegram trả lỗi:', await res.text());
    } catch (err) {
      console.error('[submitOrder] Không gọi được Telegram:', err);
    }
  }

  // ── BƯỚC 3: Phân tích kết quả ──
  if (!SHEET_URL && !TG_TOKEN) {
    console.warn('[submitOrder] Không có Apps Script URL hoặc Telegram token — dev mode, đơn không được lưu.');
    // Cho phép qua để dev test UI
  } else if (!sheetOk && !telegramOk) {
    // Cả 2 đều fail — thực sự thất bại
    return { success: false, error: 'Không gửi được đơn — cả Sheet và Telegram đều lỗi' };
  }

  // ── BƯỚC 4: Tracking pixel ──
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'Sách Học Ít Nhớ Nhiều',
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
        item_id: 'sach-hoc-it-nho-nhieu',
        item_name: 'Sách Học Ít Nhớ Nhiều',
        item_category: 'Sách giáo dục',
        quantity,
        price: 179000,
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
        content_id: 'sach-hoc-it-nho-nhieu',
        content_name: 'Sách Học Ít Nhớ Nhiều',
        content_type: 'product',
        quantity,
        price: 179000,
      }],
      value: total,
      currency: 'VND',
      order_id: orderId,
    });
    window.ttq.track('CompletePayment', {
      contents: [{
        content_id: 'sach-hoc-it-nho-nhieu',
        content_name: 'Sách Học Ít Nhớ Nhiều',
        content_type: 'product',
        quantity,
        price: 179000,
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
