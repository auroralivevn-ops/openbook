/**
 * GOOGLE APPS SCRIPT — OpenBook orders → Google Sheet
 *
 * Server-side sinh mã đơn EXB-N độc nhất toàn hệ thống (dựa trên số dòng Sheet)
 * → Không bao giờ trùng dù nhiều khách đặt cùng lúc.
 *
 * MỖI LẦN SỬA file này, anh PHẢI:
 *   1. Save (Ctrl+S) trong Apps Script editor
 *   2. Deploy → Manage deployments → bút chì 🖊️ trên deployment đang dùng
 *   3. Mục "Version" chọn → "New version" (KHÔNG TẠO NEW DEPLOYMENT — sẽ ra URL khác)
 *   4. Bấm Deploy
 */

const SHEET_ID = '10wooxh1cjJ51TbtUMq-hED9AR1KCIFzU2L88CHxl_Tw';
const SHEET_NAME = 'Sheet1';

const HEADERS = [
  'Thời gian',
  'Mã đơn',
  'Tên khách',
  'Số điện thoại',
  'Địa chỉ',
  'Số cuốn',
  'Tổng tiền (đ)',
  'Ghi chú',
  '[DEBUG] Raw body'
];

function getSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#FEF3C7');
  }
  return sheet;
}

function doPost(e) {
  // LockService đảm bảo 2 request đồng thời không cùng đếm ra cùng 1 mã EXB
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // chờ tối đa 10 giây

  try {
    const sheet = getSheet();
    const rawBody = (e && e.postData && e.postData.contents) || '(no body)';
    const now = new Date().toLocaleString('vi-VN');

    let data;
    try {
      data = JSON.parse(rawBody);
    } catch (err) {
      sheet.appendRow([
        now, '[PARSE-ERROR]', '', '', '', '', '', err.message, rawBody
      ]);
      return jsonResponse({ success: false, error: 'JSON parse error: ' + err.message });
    }

    // Sinh mã đơn EXB-N theo số dòng hiện có
    // lastRow gồm cả header → orderNumber = lastRow (vì header chiếm row 1, đơn đầu tiên là row 2 = EXB-1)
    const orderNumber = sheet.getLastRow();
    const orderId = `EXB-${orderNumber}`;

    sheet.appendRow([
      data.timestamp || now,
      orderId,
      data.name || '',
      data.phone || '',
      data.address || '',
      data.quantity || '',
      data.total || '',
      data.note || '',
      '' // không cần raw body khi parse OK
    ]);

    return jsonResponse({ success: true, orderId: orderId });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService
    .createTextOutput('OpenBook order endpoint OK — gửi POST để ghi đơn.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function testAppend() {
  const sheet = getSheet();
  const orderNumber = sheet.getLastRow();
  sheet.appendRow([
    new Date().toLocaleString('vi-VN'),
    `EXB-${orderNumber}`,
    'Test Manual',
    '0987654321',
    'Địa chỉ test',
    1,
    179000,
    'Test từ Apps Script',
    ''
  ]);
}
