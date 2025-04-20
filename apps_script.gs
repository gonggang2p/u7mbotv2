function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  const data = JSON.parse(e.postData.contents);
  const userId = data.userId;
  const timestamp = new Date();
  
  const existing = sheet.getRange('A:A').getValues().flat();
  if (existing.includes(userId)) return ContentService.createTextOutput('Duplicate');

  sheet.appendRow([userId, timestamp]);
  return ContentService.createTextOutput('OK');
}
