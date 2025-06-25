"use client"

import { useState, useEffect } from "react"
import RegistrationForm from "../../components/register/registration-form"
import RegisterHeader from "../../components/register/register-header"
import PDPAModal from "../../components/register/pdpa-modal"
import { useRouter } from "next/navigation"
import liff from "@line/liff"


export default function RegisterPage() {
  const [pdpaStatus, setPdpaStatus] = useState<'checking' | 'accepted' | 'declined'>('checking');
  const [activeTab, setActiveTab] = useState<"existing" | "new">("existing")
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          setProfileImage(profile.pictureUrl || null);
        }
      } catch (err) {
        console.error("LIFF initialization failed", err);
      }
    };
    initializeLiff();
  }, []);

  useEffect(() => {
    const pdpaAccepted = localStorage.getItem("vsquare_pdpa_accepted")
    if (pdpaAccepted === "true") {
      setPdpaStatus('accepted')
    } else {
      setPdpaStatus('declined')
    }
  }, [])

  const handleAcceptPDPA = () => {
    localStorage.setItem("vsquare_pdpa_accepted", "true")
    setPdpaStatus('accepted')
    router.push("/register/login-line")
  }

  const handleDeclinePDPA = () => {
    localStorage.setItem("vsquare_pdpa_accepted", "false")
    setPdpaStatus('declined')
    router.push("/")
  }

  return (
    <main className="w-full">
      <div className="register-container h-auto flex-start-center flex-col">
        <div className="register-card">
          <RegisterHeader profileImage={profileImage} />
          <div className="register-content  w-656 mx-auto mt-15 mb-w-656 mb-mx-auto mb-mt-15">
            <div className="flex-start-center flex-col text-center mb-24 mb-flex-start-center mb-flex-col mb-text-center mb-mb-24">
              <p className="font-kanit text-color-blue-deep font-normal font-size-47 mb-font-size-47">
                เข้าร่วม <span className="font-gotham-medium font-medium">
                  V Club
                </span>
              </p>
              <p className="text-color-blue font-normal line-12 font-size-35 mb-font-size-35 ">
                พบกับสิทธิประโยชน์ และรางวัลสุดพิเศษ
                <br />
                สำหรับสมาชิกเท่านั้น !
              </p>
            </div>

            <RegistrationForm 
              onTabChange={setActiveTab} 
              isPDPAAccepted={pdpaStatus === 'accepted'}
            />
          </div>
        </div>
      </div>
      {pdpaStatus === 'declined' && (
        <PDPAModal 
          onAccept={handleAcceptPDPA} 
          onDecline={handleDeclinePDPA} 
          onClose={() => {}} 
        />
      )}
    </main>
    
  )
}
