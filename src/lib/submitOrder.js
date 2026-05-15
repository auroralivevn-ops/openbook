export async function submitOrder({ name, phone, address, quantity }) {
  const orderId = `HHA-${Date.now()}`;
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
    const results = await Promise.allSettled([
      fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT, text: telegramMsg, parse_mode: 'Markdown' })
      }),
      fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      })
    ]);
    const telegramOk = results[0].status === 'fulfilled';
    if (!telegramOk) throw new Error('Telegram failed');
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
