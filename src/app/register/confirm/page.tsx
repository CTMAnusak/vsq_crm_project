"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import RegisterHeader from "../../../components/register/register-header"

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

  const confirmFields = [
    { label: "ชื่อ :", value: formData.firstName },
    { label: "นามสกุล :", value: formData.lastName },
    { label: "เบอร์โทรศัพท์ :", value: formData.phone },
  ];

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Header เหมือนหน้า register */}
        <RegisterHeader />
        <div className="register-content mb-w-656 mb-mx-auto mb-mt-15">
          <div className="mb-flex-start-center mb-flex-col mb-text-center mb-mb-24">
            <h2 className="register-title">เข้าร่วม V Prestige Club</h2>
            <p className="text-color-blue mb-font-size-35 mb-font-normal mb-line-12">
              พบกับสิทธิประโยชน์ และรางวัลสุดพิเศษ<br />
              สำหรับสมาชิกเท่านั้น !
            </p>
          </div>
          {/* กล่องแสดงข้อมูลยืนยัน */}
          <div className="mb-bg-white mb-mb-32 mb-pt-32 mb-pl-48 mb-pr-48 mb-pb-46 mb-rounded-10">
            <div className="grid grid-cols-2 gap-y-4">
              {confirmFields.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="confirm-text mb-font-size-30 mb-font-light text-color-blue-deep text-left">{item.label}</div>
                  <div className="confirm-data mb-font-size-30 mb-font-light text-color-blue text-left">{item.value}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* ปุ่ม */}
          <div className="mb-flex-start-center mb-flex-col mb-gap-7 mb-mb-84">
            <button onClick={handleConfirm} className="confirm-btn bg-color-blue mb-w-553 mb-h-84 mb-rounded-17 mb-font-light mb-font-size-30 text-white">
              ยืนยันข้อมูล
            </button>
            <button onClick={handleEdit} className="edit-btn bg-white mb-w-553 mb-h-84 mb-rounded-17 mb-font-light mb-font-size-30 text-color-blue">
              แก้ไขข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
