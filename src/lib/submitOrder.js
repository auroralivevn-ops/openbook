export async function submitOrder({ name, phone, address, quantity }) {
  const orderId = `HHA-${Date.now()}`;
  const timestamp = new Date().toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
  const total = quantity === 2 ? 258000 : 149000;
  const shipNote = quantity === 2 ? 'FREESHIP' : '+ 20K ship';

  const telegramMsg =
    `🔔 *ĐƠN HÀNG MỚI - Book Hồng Hà*\n\n` +
    `📋 Mã đơn: \`${orderId}\`\n` +
    `🕐 ${timestamp}\n\n` +
    `👤 *Khách:* ${name}\n` +
    `📞 *SĐT:* ${phone}\n` +
    `📍 *Địa chỉ:* ${address}\n\n` +
    `📦 Số lượng: *${quantity} cuốn*\n` +
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
          price: 129000
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
