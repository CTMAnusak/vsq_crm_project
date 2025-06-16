"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import RegisterHeader from "../../../components/register/register-header"
import ButtonSubmit from "../../../components/register/button-submit"
import ConfirmSkeleton from "../../../components/register/register-skeleton/confirm-skeleton"

type FormData = {
  firstName: string
  lastName: string
  phone: string
  email: string
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
      <ConfirmSkeleton />
    )
  }

  const confirmFields = [
    { label: "ชื่อ :", value: formData.firstName },
    { label: "นามสกุล :", value: formData.lastName },
    { label: "Email :", value: formData.email },
    { label: "เบอร์โทรศัพท์ :", value: formData.phone },
  ];

  return (
    <div className="register-container h-auto flex-start-center flex-col">
      <div className="register-card">
        {/* Header เหมือนหน้า register */}
        <RegisterHeader />
        <div className="register-content w-656 mx-auto mt-23 mb-273  mb-w-656 mb-mx-auto mb-mt-23 mb-mb-273">
          <div className="flex-start-center flex-col text-center mb-24 mb-mb-24">
            <p className="font-kanit text-color-blue-deep font-normal font-size-47 mb-font-size-47">เข้าร่วม <span className="font-gotham font-medium">V Club</span></p>
            <p className="text-color-blue font-size-35 mb-font-size-35 font-normal line-12">
              พบกับสิทธิประโยชน์ และรางวัลสุดพิเศษ<br />
              สำหรับสมาชิกเท่านั้น !
            </p>
          </div>
          {/* กล่องแสดงข้อมูลยืนยัน */}
          <div className="bg-white w-651 mb-59 pt-80 pl-10 pr-10 pb-80 rounded-10  mb-w-651 mb-mb-59 mb-pt-80 mb-pl-10 mb-pr-10 mb-pb-80 mb-rounded-10">
            <div className="confirm-data-box grid grid-cols-2">
              {confirmFields.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="confirm-text font-size-35 mb-font-size-35 font-normal text-color-blue-deep text-right pr-77 mb-pr-77">{item.label}</div>
                  <div className="confirm-data font-size-35 mb-font-size-35 font-normal text-color-blue text-left">{item.value}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* ปุ่ม */}
          <div className="flex-start-center flex-col gap-18 mb-gap-18">
            <ButtonSubmit 
              onClick={handleConfirm} 
              variant="blue_bg"
              className="w-553 h-81 mb-w-553 mb-h-81"
            >
              ยืนยันข้อมูล
            </ButtonSubmit>
            <ButtonSubmit 
              onClick={handleEdit} 
              variant="blue_border"
              className="w-557 h-85 mb-w-557 mb-h-85"
            >
              แก้ไขข้อมูล
            </ButtonSubmit>
          </div>
        </div>
      </div>
    </div>
  )
}
