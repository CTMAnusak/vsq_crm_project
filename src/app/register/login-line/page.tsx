"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import RegisterHeader from "../../../components/register/register-header"
import ButtonSubmit from "../../../components/register/button-submit"
import ConfirmSkeleton from "../../../components/register/register-skeleton/confirm-skeleton"
import PDPAModal from "../../../components/register/pdpa-modal"
import liff from "@line/liff"

type FormData = {
  firstName: string
  lastName: string
  phone: string
  email: string
  isExistingCustomer?: boolean // เพิ่มฟิลด์เพื่อระบุว่าเป็นลูกค้าเดิมหรือลูกค้าใหม่
}

export default function LoginLinePage() {
  const [showPDPA, setShowPDPA] = useState(false)
  useEffect(() => {
    const accepted = localStorage.getItem("vsquare_pdpa_accepted")
    if (accepted !== "true") {
      setShowPDPA(true)
    }
  }, [])

  useEffect(() => {
    // เรียกใช้งาน LIFF เมื่อโหลดหน้า
    liff.init({ liffId: '2007605538-yPqjO4RW' })
  }, [])

  const handleAcceptPDPA = () => {
    localStorage.setItem("vsquare_pdpa_accepted", "true")
    setShowPDPA(false)
  }
  const handleDeclinePDPA = () => {
    // สามารถเพิ่ม logic ถ้าไม่ยอมรับ เช่น redirect หรือปิดเว็บ
    setShowPDPA(false)
  }

  const handleLoginLiff = async () => {
    try {
      await liff.login()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }} className="flex items-center justify-center">
      {showPDPA && (
        <PDPAModal
          onAccept={handleAcceptPDPA}
          onDecline={handleDeclinePDPA}
          onClose={() => setShowPDPA(false)}
        />
      )}
      {!showPDPA && (
        <ButtonSubmit
          onClick={handleLoginLiff}
          variant="green_bg"
          className="w-553 h-81 mb-w-553 mb-h-81"
        >
          เข้าสู่ระบบด้วย Line
        </ButtonSubmit>
      )}
    </div>
  )
}
