"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import RegistrationForm from "../../components/register/registration-form"
import PDPAModal from "../../components/register/pdpa-modal"
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
        <div className="register-header">
          <div className="register-header-icon">
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
          <span className="register-header-title">REGISTER</span>
        </div>

        <div className="register-content">
          <div className="register-profile">
            <div className="register-avatar">
              <Image src="/images/anime_fairy.jpg" alt="Profile" width={96} height={96} className="object-cover" />
            </div>
            <h2 className="register-title">เข้าร่วม V Club</h2>
            <p className="register-subtitle">
              พบกับสิทธิประโยชน์ และรางวัลสุดพิเศษ
              <br />
              สำหรับสมาชิกทุกท่าน!
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
