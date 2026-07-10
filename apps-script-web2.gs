/**
 * OpenBook — Nhận đơn COD, ghi vào Google Sheet
 * Nhận POST (JSON) từ website, ghi 1 dòng đơn hàng và trả về mã đơn.
 *
 * ====== CÁCH DÙNG ======
 * 1. Mở Google Sheet chứa đơn -> Extensions (Tiện ích mở rộng) > Apps Script.
 * 2. Xoá hết code cũ, dán toàn bộ file này vào.
 * 3. Chỉnh SHEET_NAME cho đúng tên tab (mặc định "Đơn hàng").
 *    - Nếu Apps Script GẮN TRỰC TIẾP trong Sheet: để SHEET_ID = '' (giữ nguyên).
 *    - Nếu là script ĐỘC LẬP: điền ID của Sheet vào SHEET_ID.
 * 4. Deploy > Manage deployments > (bản hiện có) Edit > Version: New version > Deploy.
 *    -> GIỮ NGUYÊN URL web app cũ để website không phải đổi.
 */

// ====== CẤU HÌNH ======
const SHEET_ID = '';            // để trống nếu script gắn trong Sheet; điền ID nếu script độc lập
const SHEET_NAME = 'Đơn hàng';  // tên tab chứa đơn — đổi nếu Sheet của bạn khác

// Thứ tự cột — "Tên sách / Combo" nằm ngay SAU "Địa chỉ"
const HEADERS = [
  'Thời gian',          // 1
  'Họ tên',             // 2
  'SĐT',                // 3  (ghi dạng text để giữ số 0 đầu)
  'Địa chỉ',            // 4
  'Tên sách / Combo',   // 5  <-- ngay sau Địa chỉ
  'Số lượng',           // 6
  'Tổng tiền',          // 7
  'Ghi chú',            // 8
];

function getSheet_() {
  const ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  // Nếu sheet trống -> ghi hàng tiêu đề
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.getRange('C:C').setNumberFormat('@'); // cả cột SĐT là text
  }
  return sheet;
}

function pad_(n) { return ('0' + n).slice(-2); }

function makeOrderId_(now) {
  // EXB-YYMMDD-HHMMSS
  return 'EXB-' + (now.getFullYear() % 100) + pad_(now.getMonth() + 1) + pad_(now.getDate())
    + '-' + pad_(now.getHours()) + pad_(now.getMinutes()) + pad_(now.getSeconds());
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet_();

    const now = new Date();
    const orderId = makeOrderId_(now);

    const row = [
      data.timestamp || Utilities.formatDate(now, 'GMT+7', 'dd/MM/yyyy HH:mm'),
      data.name || '',
      String(data.phone || ''),   // giữ nguyên chuỗi, cột đã format text
      data.address || '',
      data.product || '',         // Tên sách / Combo — ngay sau Địa chỉ
      data.quantity || '',
      data.total || '',
      data.note || '',
    ];

    const targetRow = sheet.getLastRow() + 1;
    // Đặt định dạng TEXT cho ô SĐT (cột 3) TRƯỚC khi ghi -> giữ số 0 đầu
    sheet.getRange(targetRow, 3).setNumberFormat('@');
    sheet.getRange(targetRow, 1, 1, row.length).setValues([row]);

    return jsonOut_({ success: true, orderId: orderId });
  } catch (err) {
    return jsonOut_({ success: false, error: String(err) });
  }
}

function doGet() {
  return jsonOut_({ success: true, message: 'OpenBook order endpoint OK' });
}
