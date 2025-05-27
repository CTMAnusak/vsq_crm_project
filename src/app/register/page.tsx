"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import RegistrationForm from "../../components/register/registration-form"
import PDPAModal from "../../components/register/pdpa-modal"
import RegisterHeader from "../../components/register/register-header"
import { useRouter } from "next/navigation"


export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showPDPA, setShowPDPA] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoading(false)
    // ตรวจสอบว่ายอมรับ PDPA แล้วหรือยัง
    const pdpaAccepted = localStorage.getItem("vsquare_pdpa_accepted")
    if (!pdpaAccepted) {
      setShowPDPA(true)
    }
  }, [])

  const handleAcceptPDPA = () => {
    localStorage.setItem("vsquare_pdpa_accepted", "true")
    setShowPDPA(false)
  }

  const handleDeclinePDPA = () => {
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-card">
          <p className="text-center">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <RegisterHeader />
        <div className="register-content mb-w-656 mb-mx-auto mb-mt-15">
          <div className="mb-flex-start-center mb-flex-col mb-text-center mb-mb-24">
            <h2 className="register-title">เข้าร่วม V Club</h2>
            <p className="register-subtitle mb-font-size-35 mb-font-normal mb-line-12">
            พบกับสิทธิประโยชน์ และรางวัลสุดพิเศษ
              <br />
              สำหรับสมาชิกเท่านั้น !
            </p>
          </div>

          <RegistrationForm />
        </div>
      </div>
      {showPDPA && (
        <PDPAModal
          onAccept={handleAcceptPDPA}
          onDecline={handleDeclinePDPA}
        />
      )}
    </div>
  )
}
