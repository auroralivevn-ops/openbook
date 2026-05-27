/**
 * GOOGLE APPS SCRIPT — OpenBook orders → Google Sheet (Web 2)
 *
 * Phiên bản cho web nhân bản. Khác bản gốc duy nhất ở SHEET_ID.
 *
 * MỖI LẦN SỬA file này, anh PHẢI:
 *   1. Save (Ctrl+S) trong Apps Script editor
 *   2. Deploy → Manage deployments → bút chì 🖊️ trên deployment đang dùng
 *   3. Mục "Version" chọn → "New version" (KHÔNG TẠO NEW DEPLOYMENT — sẽ ra URL khác)
 *   4. Bấm Deploy
 */

const SHEET_ID = '1A_Ps5owWx8Kv3g-zr4VNJGopKJVX52TJbiyUZLw0dZw'; // Web 2 sheet
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
  lock.waitLock(10000);

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

    // Sinh mã đơn EXB-N theo số dòng hiện có (đếm độc lập với web cũ vì Sheet khác)
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
      ''
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
    .createTextOutput('OpenBook Web 2 order endpoint OK — gửi POST để ghi đơn.')
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
    'Test Manual Web 2',
    '0987654321',
    'Địa chỉ test',
    1,
    179000,
    'Test từ Apps Script Web 2',
    ''
  ]);
}
