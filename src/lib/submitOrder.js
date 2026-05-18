export async function submitOrder({ name, phone, address, quantity }) {
  // Đếm số thứ tự đơn hàng trên browser này: EXB-1, EXB-2, EXB-3, ...
  const nextNum = (parseInt(localStorage.getItem('exb_order_counter') || '0', 10) || 0) + 1;
  localStorage.setItem('exb_order_counter', String(nextNum));
  const orderId = `EXB-${nextNum}`;
  const timestamp = new Date().toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
  const PRICE_MAP = { 1: 179000, 2: 250000, 3: 350000, 4: 450000 };
  const total = PRICE_MAP[quantity] || 179000;
  const shipNote = 'FREESHIP';
  const COMBO_NAMES = {
    1: '1 cuốn Học Ít Nhớ Nhiều',
    2: '2 cuốn Học Ít Nhớ Nhiều',
    3: 'Combo 3: HNNN + Định Luật Murphy + Đắc Nhân Tâm Cho Trẻ',
    4: 'Combo 4: HNNN + Murphy + Đắc Nhân Tâm Cho Trẻ + Kỷ Luật Tự Giác',
  };
  const comboLabel = COMBO_NAMES[quantity] || `${quantity} cuốn`;

  const telegramMsg =
    `🔔 *ĐƠN HÀNG MỚI - OpenBook*\n\n` +
    `📋 Mã đơn: \`${orderId}\`\n` +
    `🕐 ${timestamp}\n\n` +
    `👤 *Khách:* ${name}\n` +
    `📞 *SĐT:* ${phone}\n` +
    `📍 *Địa chỉ:* ${address}\n\n` +
    `📦 *${comboLabel}*\n` +
    `💰 Tổng: *${total.toLocaleString('vi-VN')}đ* (${shipNote})`;

  const payload = { orderId, name, phone, address, quantity, total, note: shipNote, timestamp };

  const TG_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const TG_CHAT = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  const SHEET_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

  try {
    const tasks = [];
    if (TG_TOKEN && TG_CHAT) {
      tasks.push(
        fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TG_CHAT, text: telegramMsg, parse_mode: 'Markdown' })
        })
      );
    }
    if (SHEET_URL) {
      tasks.push(
        fetch(SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        })
      );
    }
    if (tasks.length === 0) {
      console.warn('[submitOrder] Không có VITE_APPS_SCRIPT_URL hoặc VITE_TELEGRAM_BOT_TOKEN — chỉ chạy ở chế độ dev, đơn hàng không được lưu.');
    } else {
      const results = await Promise.allSettled(tasks);
      const anyFulfilled = results.some((r) => r.status === 'fulfilled');
      if (!anyFulfilled) throw new Error('Tất cả kênh gửi đơn đều thất bại');
    }
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Sách Học Ít Nhớ Nhiều',
        content_category: 'Sách giáo dục',
        value: total,
        currency: 'VND',
        num_items: quantity
      });
      window.fbq('track', 'Purchase', {
        value: total,
        currency: 'VND',
        content_ids: [orderId],
        content_type: 'product',
        num_items: quantity
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
          quantity: quantity,
          price: 179000
        }]
      });
      window.gtag('event', 'generate_lead', {
        currency: 'VND',
        value: total
      });
    }
    return { success: true, orderId, total };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export const validatePhone = (p) => /^(03|05|07|08|09)\d{8}$/.test(p.replace(/\s/g, ''));
export const validateName = (n) => n.trim().length >= 2;
export const validateAddress = (a) => a.trim().length >= 10;
