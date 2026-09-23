# Modern Personnel Assessment System (Backend API)

โปรเจกต์นี้เป็นการพัฒนาระบบ Back-end สำหรับ **"ระบบประเมินบุคลากรด้วยระบบเทคโนโลยีสารสนเทศสมัยใหม่"** ซึ่งสร้างขึ้นเพื่อฝึกซ้อมและเตรียมความพร้อมสำหรับการแข่งขันทักษะวิชาชีพระดับชาติ ประจำปีการศึกษา 2568

**My Role:** Backend Developer

## Tech Stack
ระบบ Back-end นี้พัฒนาโดยใช้เทคโนโลยีตามมาตรฐานของการแข่งขัน:
- **Runtime Environment:** Node.js (v18+)
- **Framework:** Express.js, Express-Validator, Dotenv, Bcrypt, JsonWebToken, Cors, Mysql2, Multer
- **Database:** MySQL / MariaDB
- **Authentication:** JWT
- **Tools:** VS Code, Postman/Thunder Client, DBeaver

## Core Features
- **RESTful API Design:** ออกแบบ API ตามมาตรฐาน RESTful สื่อความหมายชัดเจน
- **Secure Authentication:** ระบบ Login และตรวจสอบสิทธิ์การเข้าถึงข้อมูลด้วย JWT Token
- **File Management:** รองรับ API สำหรับอัปโหลดไฟล์เอกสารประกอบการประเมิน (File Upload)
- **Data Validation & Exception Handling:** มีระบบตรวจสอบความถูกต้องของข้อมูลก่อนบันทึก และจัดการข้อผิดพลาด พร้อมส่ง Response กลับเป็นรูปแบบ JSON อย่างเป็นระบบ
- **Database Architecture:** ออกแบบโครงสร้างฐานข้อมูล (ER-Diagram) แบบ Relational Design รองรับระบบประเมิน 3 ภาคส่วน ได้แก่ ฝ่ายบริหาร ผู้รับการประเมิน และกรรมการ

## API Endpoints
ออกแบบ Endpoint ให้มีความสอดคล้องกัน เช่น:
- `POST /api/login` - สำหรับเข้าสู่ระบบและรับ JWT Token
- `GET /api/teachers` - ดึงข้อมูลรายชื่อบุคลากร
- `GET /api/scores/{id}` - ดึงข้อมูลคะแนนการประเมินรายบุคคล
- `POST /api/upload` - อัปโหลดไฟล์หลักฐาน

## การติดตั้งและรันโปรเจกต์
1. Clone โปรเจกต์ลงมาที่เครื่อง
2. ติดตั้งแพ็กเกจด้วยคำสั่ง `npm install`
3. คัดลอกไฟล์ `.env.example` เปลี่ยนชื่อเป็น `.env` และตั้งค่าการเชื่อมต่อฐานข้อมูล
4. รันคำสั่ง `npm start` หรือ `npm run dev` เพื่อเปิดเซิร์ฟเวอร์

---
*Developed for training and skills improvement in the Future Thai Professional exhibition.*