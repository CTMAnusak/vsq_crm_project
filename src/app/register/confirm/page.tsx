"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

type FormData = {
  firstName: string
  lastName: string
  phone: string
  isExistingCustomer?: boolean // เพิ่มฟิลด์เพื่อระบุว่าเป็นลูกค้าเดิมหรือลูกค้าใหม่
}

export default function ConfirmPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData | null>(null)

  useEffect(() => {
    // ดึงข้อมูลจาก localStorage
    const storedData = localStorage.getItem("registrationData")
    if (storedData) {
      setFormData(JSON.parse(storedData))
    } else {
      // ถ้าไม่มีข้อมูล ให้กลับไปหน้าลงทะเบียน
      router.push("/register")
    }
  }, [router])

  const handleEdit = () => {
    if (formData) {
      // เก็บข้อมูลที่ต้องการแก้ไขไว้ใน localStorage ด้วยคีย์พิเศษ
      localStorage.setItem("editingRegistrationData", JSON.stringify(formData))
      router.push("/register")
    }
  }

  const handleConfirm = () => {
    router.push("/register/otp")
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-[#f0f8f0] flex justify-center items-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <p className="text-center">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f8f0] flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden mt-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-4 text-white flex items-center">
          <div className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <span className="font-semibold">REGISTER</span>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
              <Image
                src="/images/anime_fairy.jpg"
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-blue-600 mb-1">เข้าร่วม V Club</h2>
            <p className="text-sm text-center text-gray-600 mb-4">
              พบกับสิทธิประโยชน์ และรางวัลสุดพิเศษ
              <br />
              สำหรับสมาชิกทุกท่าน!
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-center mb-4">ยืนยันข้อมูล</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">ชื่อ :</span>
                <span className="font-medium text-blue-600">{formData.firstName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">นามสกุล :</span>
                <span className="font-medium text-blue-600">{formData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">เบอร์โทรศัพท์ :</span>
                <span className="font-medium text-blue-600">{formData.phone}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={handleEdit} className="btn-secondary">
              แก้ไขข้อมูล
            </button>
            <button onClick={handleConfirm} className="btn-primary">
              ยืนยันข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
