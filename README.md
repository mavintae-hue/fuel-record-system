# Fuel Record System

Web Application สำหรับ "ระบบบันทึกการเติมน้ำมันพนักงาน" และ "ระบบดึงรายงาน Excel (Admin)" 
พัฒนาด้วย Next.js (App Router), Tailwind CSS และ Supabase.

## Environment Variables

คุณต้องตั้งค่าตัวแปรเหล่านี้ทั้งใน **Local Development (`.env.local`)** และบน **Vercel**

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_EXPORT_PASSWORD=your_secure_password_here
```

### คำอธิบายตัวแปร:
- `NEXT_PUBLIC_SUPABASE_URL`: URL ของโปรเจกต์ Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: คีย์สำหรับ public access (ปลอดภัยสำหรับการใช้บน Client)
- `SUPABASE_SERVICE_ROLE_KEY`: **(ห้ามหลุดเด็ดขาด)** คีย์สำหรับข้าม RLS ใช้บน Server (API) เท่านั้น
- `ADMIN_EXPORT_PASSWORD`: รหัสผ่านที่คุณตั้งไว้เพื่อดึงรายงาน (ให้แอดมินใช้ในหน้าเว็บ)

## การติดตั้งและการรัน Server (Local)

1. ติดตั้ง Dependencies:
   ```bash
   npm install
   ```
2. รัน Development Server:
   ```bash
   npm run dev
   ```
3. เปิดเบราว์เซอร์ที่ `http://localhost:3000`

## การเชื่อมต่อ GitHub (Source Control)

1. `git init` ในโฟลเดอร์โปรเจกต์ (ถ้ายังไม่ได้ทำ)
2. นำเข้าไฟล์: `git add .` และ `git commit -m "Initial check-in"`
3. นำโค้ดขึ้น GitHub Repository ของคุณ: `git remote add origin <your_repo_url>` และ `git push -u origin main`

## การ Deploy ขึ้น Vercel

1. ล็อกอินเข้าสู่ [Vercel](https://vercel.com)
2. กด **Add New... > Project**
3. เลือกบัญชีและ Repository GitHub ของระบบนี้
4. ในหน้าจอ Configure Project ให้เปิดเมนู **Environment Variables**
5. ตรวจสอบและกรอกตัวแปรคีย์ทั้งหมด (4 ตัว) ตามด้านบน
6. คลิก **Deploy**

## ฐานข้อมูล (Supabase)

อย่าลืมคัดลอกคำสั่งในโฟลเดอร์ `supabase/schema.sql` ไปรันใน **SQL Editor** ของโปรเจกต์ Supabase ของคุณเพื่อสร้าง Table `fuel_records` และกำหนด Security Policies (RLS) ให้เรียบร้อย.
