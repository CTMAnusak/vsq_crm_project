"use client"

import { useState, useEffect } from "react"
import RegistrationForm from "../../components/register/registration-form"
import RegisterHeader from "../../components/register/register-header"
import PDPAModal from "../../components/register/pdpa-modal"
import { useRouter } from "next/navigation"
import liff from "@line/liff"
import RegisterConsoleLog from "../../components/register/registerConsoleLog"


export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState<"existing" | "new">("existing")
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isFlowComplete, setIsFlowComplete] = useState(true); // Start as true to prevent flash of popup on server
  const router = useRouter()

  useEffect(() => {
    // This single effect handles all client-side logic after hydration
    const checkCompletionStatus = async () => {
      // The "master" flag. If this is true, the user has done everything.
      const registrationComplete = localStorage.getItem("vsquare_registration_complete") === "true";
      const storedUserId = localStorage.getItem("vsquare_line_user_id");
      
      if (registrationComplete && storedUserId) {
        setIsFlowComplete(true);
        try {
          // If flow is complete, we should be logged in. Init LIFF to get profile.
          await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
          if (liff.isLoggedIn()) {
            const profile = await liff.getProfile();
            setProfileImage(profile.pictureUrl || null);
          }
        } catch (e) {
          console.error("LIFF init failed (flow was complete):", e);
        }
        return; // Early exit, popup will not be shown
      }

      // If we are here, the flow is not complete.
      // We must initialize LIFF to check the user's login status.
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });

        // Check if the user has just returned from a successful LIFF login.
        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          
          // เก็บค่า profile.userId ไว้ใน localStorage
          localStorage.setItem("vsquare_line_user_id", profile.userId);
          
          // This is the final step! The user is now fully registered.
          localStorage.setItem("vsquare_registration_complete", "true");
          setIsFlowComplete(true); // This will hide the popup
          setProfileImage(profile.pictureUrl || null);
        } else {
          // User is NOT logged in. The flow is definitely not complete.
          setIsFlowComplete(false); // This ensures the popup is shown.
        }
      } catch (err) {
        console.error("LIFF initialization failed:", err);
        // If LIFF fails to initialize, we assume the flow is not complete.
        setIsFlowComplete(false);
      }
    };

    checkCompletionStatus();
  }, []);

  useEffect(() => {
    // เพิ่ม class ให้ header
    const header = document.querySelector("header");
    if (header) header.classList.add("hide-header-footer");

    // เพิ่ม class ให้ footer
    const footer = document.querySelector("footer");
    if (footer) footer.classList.add("hide-header-footer");

    // cleanup (ลบ class เมื่อออกจากเพจนี้)
    return () => {
      if (header) header.classList.remove("hide-header-footer");
      if (footer) footer.classList.remove("hide-header-footer");
    };
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("sessionStarted")) {
      localStorage.removeItem("registrationData");
      localStorage.removeItem("vsquare_pdpa_accepted");
      localStorage.removeItem("vsquare_line_user_id");
      // เพิ่ม key อื่นๆ ที่ต้องการลบได้ที่นี่
      sessionStorage.setItem("sessionStarted", "true");
    }
  }, []);

  const handleAcceptPDPA = () => {
    // This flag is temporary, only for the login-line page to check.
    localStorage.setItem("vsquare_pdpa_accepted", "true")
    router.push("/register/login-line")
  }

  const handleDeclinePDPA = () => {
    localStorage.setItem("vsquare_pdpa_accepted", "false")
    router.push("/")
  }

  return (
    <main className="w-full">
      <RegisterConsoleLog pageName="Register" />
      <div className="register-container h-auto flex-start-center flex-col">
        <div className="register-card">
          <RegisterHeader profileImage={profileImage} />
          <div className="register-content  w-656 mx-auto mt-40 mb-w-656 mb-mx-auto mb-mt-40">
            <RegistrationForm 
              onTabChange={setActiveTab} 
              isPDPAAccepted={isFlowComplete}
            />
          </div>
        </div>
      </div>
      {!isFlowComplete && (
        <PDPAModal 
          onAccept={handleAcceptPDPA} 
          onDecline={handleDeclinePDPA} 
          onClose={() => {}} 
        />
      )}
    </main>
    
  )
}
