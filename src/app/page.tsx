"use client"

import Link from "next/link"

export default function Home() {
  return (
    <main className="w-full">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-6">V Square Clinic</h1>
        <p className="text-lg mb-8 text-center">ยินดีต้อนรับสู่ V Square Clinic ระบบลงทะเบียนสมาชิก</p>
        <Link href="/register" className="btn-primary px-8 py-4 text-lg">
          ลงทะเบียนสมาชิก
        </Link>

        {/* เพิ่มปุ่มรีเซ็ตการยอมรับ PDPA สำหรับทดสอบ */}
        <button
          onClick={() => {
            localStorage.removeItem("vsquare_pdpa_accepted")
            alert("รีเซ็ตการยอมรับ PDPA เรียบร้อยแล้ว")
          }}
          className="mt-8 text-sm text-gray-500 btn-link"
        >
          รีเซ็ตการยอมรับ PDPA (สำหรับทดสอบ)
        </button>
      </div>
    </main>
    
  )
}
