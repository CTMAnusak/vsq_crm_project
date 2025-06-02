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
    <div className="register-container h-auto flex-start-center flex-col">
      <div className="register-card">
        {/* Header เหมือนหน้า register */}
        <RegisterHeader />
        <div className="register-content w-656 mx-auto mt-23 mb-273  mb-w-656 mb-mx-auto mb-mt-23 mb-mb-273">
          <div className="flex-start-center flex-col text-center mb-24 mb-mb-24">
            <h2 className="register-title text-color-blue-deep">เข้าร่วม V Prestige Club</h2>
            <p className="text-color-blue font-size-35 mb-font-size-35 font-normal line-12">
              พบกับสิทธิประโยชน์ และรางวัลสุดพิเศษ<br />
              สำหรับสมาชิกเท่านั้น !
            </p>
          </div>
          {/* กล่องแสดงข้อมูลยืนยัน */}
          <div className="bg-white w-651 mb-59 pt-115 pl-71 pr-71 pb-135 rounded-10  mb-w-651 mb-mb-59 mb-pt-115 mb-pl-71 mb-pr-71 mb-pb-135 mb-rounded-10">
            <div className="confirm-data-box grid grid-cols-2">
              {confirmFields.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="confirm-text font-size-35 mb-font-size-35 font-normal text-color-blue-deep text-left">{item.label}</div>
                  <div className="confirm-data font-size-35 mb-font-size-35 font-normal text-color-blue text-left">{item.value}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* ปุ่ม */}
          <div className="flex-start-center flex-col gap-18 mb-gap-18">
            <button onClick={handleConfirm} className="confirm-btn bg-color-blue font-light text-white w-553 h-84 rounded-17 font-size-30  mb-w-553 mb-h-84 mb-rounded-17  mb-font-size-30">
              ยืนยันข้อมูล
            </button>
            <button onClick={handleEdit} className="edit-btn bg-white font-light text-color-blue w-553 h-84 rounded-17 font-size-30  mb-w-553 mb-h-84 mb-rounded-17 mb-font-size-30 ">
              แก้ไขข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
