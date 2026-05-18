/**
 * GOOGLE APPS SCRIPT — đổ data từ form đặt hàng OpenBook vào Google Sheet
 *
 * CÁCH SETUP:
 * 1. Mở Sheet: https://docs.google.com/spreadsheets/d/10wooxh1cjJ51TbtUMq-hED9AR1KCIFzU2L88CHxl_Tw/edit
 * 2. Menu: Extensions → Apps Script
 * 3. Xóa code mẫu, paste TOÀN BỘ file này vào
 * 4. Save (Ctrl+S), đặt tên dự án bất kỳ
 * 5. Bấm "Deploy" → "New deployment"
 *    - Type (gear icon): chọn "Web app"
 *    - Description: "OpenBook orders"
 *    - Execute as: "Me" (chính tài khoản anh)
 *    - Who has access: "Anyone" (BẮT BUỘC — không có chọn này thì web không gửi được)
 *    - Bấm "Deploy"
 * 6. Lần đầu sẽ yêu cầu cấp quyền: chọn account anh → "Advanced" → "Go to <project> (unsafe)" → "Allow"
 * 7. Copy "Web app URL" (dạng https://script.google.com/macros/s/.../exec)
 * 8. Tạo file `.env` trong root project, dán:
 *    VITE_APPS_SCRIPT_URL=<paste URL ở đây>
 * 9. Restart `npm run dev`. Đặt thử 1 đơn → kiểm tra Sheet có row mới không.
 *
 * LƯU Ý:
 * - Mỗi lần SỬA code này, phải Deploy lại (Manage deployments → bút chì → New version → Deploy)
 * - Nếu đổi URL, nhớ cập nhật lại .env
 */

const SHEET_ID = '10wooxh1cjJ51TbtUMq-hED9AR1KCIFzU2L88CHxl_Tw';
const SHEET_NAME = 'Sheet1'; // Đổi nếu sheet anh tên khác

const HEADERS = [
  'Thời gian',
  'Mã đơn',
  'Tên khách',
  'Số điện thoại',
  'Địa chỉ',
  'Số cuốn',
  'Tổng tiền (đ)',
  'Ghi chú'
];

function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.getSheets()[0];

    // Tự thêm header nếu sheet còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#FEF3C7');
    }

    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('vi-VN'),
      data.orderId || '',
      data.name || '',
      data.phone || '',
      data.address || '',
      data.quantity || '',
      data.total || '',
      data.note || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Hỗ trợ test bằng cách truy cập URL trên trình duyệt
function doGet() {
  return ContentService
    .createTextOutput('OpenBook order endpoint OK — gửi POST để ghi đơn.')
    .setMimeType(ContentService.MimeType.TEXT);
}
