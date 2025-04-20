const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || 'Sheet1';
const TIMEZONE = 'Asia/Bangkok';

const auth = new GoogleAuth({
  keyFile: './credentials/credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function appendUserToSheet(userId) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const now = dayjs().tz(TIMEZONE).format('YYYY-MM-DD HH:mm:ss');

  const getRes = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:A`,
  });

  const existingUserIds = getRes.data.values ? getRes.data.values.flat() : [];
  if (existingUserIds.includes(userId)) return;

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:C`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[userId, now, process.env.BOT_NAME || 'BOT']],
    },
  });
}

module.exports = { appendUserToSheet };
