"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { RegistrationSessionData } from "@/types";
import { motion } from "framer-motion";
import RegisterForm from "@/components/register/RegisterForm";
import RegisterHeader from "@/components/register/RegisterHeader";
import TermsModal from "@/components/register/TermsModal";
import { useRouter } from "next/navigation";

import "@/assets/css/pxtovw.css";
import "@/assets/css/register.css";

export default function RegisterPage() {
  return (
    <>
      <RegisterContent />
    </>
  );
}

const RegisterContent = () => {
  const { user, isAuthenticated, isAcceptTerms, isLoading, login, closeWindow } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<RegistrationSessionData | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push("/");
      }
    }
    const registrationData = JSON.parse(
      sessionStorage.getItem("registrationData") || "null"
    );

    const data = registrationData || user;
    setProfileData(data);
    setProfileImage(data?.profileImage || user?.profileImage || null);

  }, [user, isAuthenticated, isLoading, router]);

  const handleAcceptPDPA = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleDeclinePDPA = async () => {
    try {
      closeWindow();
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  if (isLoading || isAuthenticated) {
    return (
      <main className="w-full">
        <div className="register-container">
          <div className="w-full">
            <RegisterHeader isAuthenticated={isAuthenticated} isLoading={isLoading} profileImage={profileImage} />
            <div className="register-content w-656 mx-auto mt-40 mb-w-656 mb-mx-auto mb-mt-40">
              <RegisterForm
                key={profileData?.lineUserId || "form"}
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
                profile={profileData}
              />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="w-full">
      <div className="register-container">
        <div className="w-full">
          <RegisterHeader isAuthenticated={isAuthenticated} isLoading={isLoading} profileImage={profileImage} />
          <div className="register-content w-656 mx-auto mt-40 mb-w-656 mb-mx-auto mb-mt-40">
            <RegisterForm
              key={profileData?.lineUserId || "form"}
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
              profile={profileData}
            />
          </div>
        </div>
      </div>
      {!isAcceptTerms && (
        <TermsModal
          onAccept={handleAcceptPDPA}
          onDecline={handleDeclinePDPA}
        />
      )}
    </main>
  )
}
