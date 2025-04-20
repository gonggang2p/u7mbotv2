# LINE Bot + Google Sheets (พร้อมใช้บน Render)

## ✅ ความสามารถ
- รับ userId จาก 4–10 บัญชี LINE ด้วย LINE Bot เดียว
- บันทึก userId + เวลา (Asia/Bangkok) ลง Google Sheets
- ไม่บันทึก userId ซ้ำ
- ใช้งานได้ 24/7 บน Render + GitHub

## 📌 ไฟล์ .env ที่ต้องใช้
```
PORT=3001
SPREADSHEET_ID=ไอดีของ Google Sheet
SHEET_NAME=ชื่อชีท (เช่น Sheet1)
BOT_NAME=ชื่อบอทที่ใช้บันทึก
```

## 📄 การสร้าง Google API Credentials (Service Account)
1. ไปที่ https://console.cloud.google.com
2. สร้าง Project ใหม่ หรือเลือก Project เดิม
3. ไปที่ "APIs & Services" > "Credentials"
4. กด "Create Credentials" > เลือก "Service Account"
5. ตั้งชื่อ แล้วกด "Done"
6. เข้า Service Account ที่สร้าง > แท็บ "KEYS" > "Add Key" > "JSON"
7. ดาวน์โหลดไฟล์มาแล้ววางในโฟลเดอร์ `credentials/` ตั้งชื่อว่า `credentials.json`
8. เปิด Google Sheet > กด "แชร์" > เพิ่ม email จาก service account (ลงท้ายด้วย `@project.iam.gserviceaccount.com`)

## 🚀 Deploy บน Render
1. สร้าง GitHub Repo แล้ว push โค้ดนี้ขึ้นไป
2. ไปที่ https://render.com > New > Web Service
3. ตั้งค่าตามนี้:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: ใส่ค่าจาก `.env`
   - Port: `3001`
4. กด Deploy!

## 🌀 เชื่อมกับ LINE
- ตั้ง Webhook URL เป็น: `https://your-render-app-name.onrender.com/webhook`
