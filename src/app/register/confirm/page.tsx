"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import RegisterHeader from "../../../components/register/register-header"
import ButtonSubmit from "../../../components/register/button-submit"
import ConfirmSkeleton from "../../../components/register/register-skeleton/confirm-skeleton"
import liff from "@line/liff"

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
  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    // ดึงข้อมูลจาก localStorage
    const storedData = localStorage.getItem("registrationData")
    if (storedData) {
      setFormData(JSON.parse(storedData))
    } else {
      // ถ้าไม่มีข้อมูล ให้กลับไปหน้าลงทะเบียน
      router.push("/register")
    }

    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile()
          setProfileImage(profile.pictureUrl || null)
        }
      } catch (err) {
        console.error("LIFF initialization failed on confirm page:", err)
      }
    }
    initializeLiff()
  }, [router])

  const handleEdit = () => {
    if (formData) {
      // ตรวจสอบสถานะ PDPA ก่อนบันทึกข้อมูล
      const pdpaAccepted = localStorage.getItem("vsquare_pdpa_accepted")
      if (pdpaAccepted === "true") {
        // เก็บข้อมูลที่ต้องการแก้ไขไว้ใน localStorage พร้อมสถานะ PDPA
        const dataWithPDPA = {
          ...formData,
          isPDPAAccepted: true
        }
        localStorage.setItem("editingRegistrationData", JSON.stringify(dataWithPDPA))
        router.push("/register")
      } else {
        // ถ้ายังไม่ยอมรับ PDPA ให้กลับไปหน้าแรก
        router.push("/")
      }
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
        <RegisterHeader profileImage={profileImage} />
        <div className="register-content w-656 mx-auto mt-60  mb-w-656 mb-mx-auto mb-mt-60">
          {/* กล่องแสดงข้อมูลยืนยัน */}
          <div className="bg-white w-651 mb-59 pt-80 pl-50 pr-50 pb-80 rounded-10  mb-w-651 mb-mb-59 mb-pt-80 mb-pl-50 mb-pr-50 mb-pb-80 mb-rounded-10">
            <div className="confirm-data-box grid grid-cols-2">
              {confirmFields.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="confirm-text font-size-35 mb-font-size-35 font-normal text-color-blue text-left pr-46 mb-pr-46">{item.label}</div>
                  <div className="confirm-data font-size-35 mb-font-size-35 font-normal text-color-blue-deep text-left">{item.value}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* ปุ่ม */}
          <div className="flex-start-center flex-col gap-25 mb-gap-25">
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

          <p className="text-exceeds-w-box translateX-minus-1-2 relative text-center text-color-blue-deep font-light top-0 left-1-2 font-size-26 mt-80 mb-60 mb-top-0 mb-left-1-2  mb-font-size-26 mb-mt-80 mb-mb-60">
          *ชื่อ–นามสกุล ไม่ถูกต้องโปรดแจ้งได้ที่หน้าสาขา <span className="font-gotham-book font-normal font-size-24 mb-font-size-24">V Square Clinic</span>
        </p>
        
        </div>
      </div>
    </div>
  )
}
