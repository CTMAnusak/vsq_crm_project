"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import RegistrationForm from "../../components/register/registration-form"
import RegisterHeader from "../../components/register/register-header"
import { useRouter } from "next/navigation"


export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"existing" | "new">("existing")
  const router = useRouter()

  useEffect(() => {
    setIsLoading(false)
  }, [])

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
    <main className="w-full">
      <div className="register-container h-auto flex-start-center flex-col">
        <div className="register-card">
          <RegisterHeader />
          <div className="register-content  w-656 mx-auto mt-15 mb-w-656 mb-mx-auto mb-mt-15">
            <div className="flex-start-center flex-col text-center mb-24 mb-flex-start-center mb-flex-col mb-text-center mb-mb-24">
              <p className="font-kanit text-color-blue-deep font-normal font-size-47 mb-font-size-47">
                เข้าร่วม <span className="font-gotham font-medium">
                  {activeTab === "existing" ? "V Club" : "V Prestige Club"}
                </span>
              </p>
              <p className="text-color-blue font-normal line-12 font-size-35 mb-font-size-35 ">
                พบกับสิทธิประโยชน์ และรางวัลสุดพิเศษ
                <br />
                สำหรับสมาชิกเท่านั้น !
              </p>
            </div>

            <RegistrationForm onTabChange={setActiveTab} />
          </div>
        </div>
      </div>
    </main>
    
  )
}
