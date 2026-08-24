"use client";

import Image from "next/image";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { type RegistrationSessionData } from "@/types";
import RegisterHeader from "@/components/register/RegisterHeader";
import RegisterForm from "@/components/register/RegisterForm";
import { motion } from "framer-motion";

import "@/assets/css/register.css";
import "@/assets/css/confirm.css";
import "@/assets/css/pxtovw.css";

import spinnerUrl from "@/assets/images/spinner.svg";

export default function ConfirmPage() {
  return (
    <>
      <ConfirmContent />
    </>
  );
}

const ConfirmContent = () => {
  const {user, isAuthenticated, isLoading} = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationSessionData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(
      sessionStorage.getItem("registrationData") || "null"
    );

    if (!isLoading && (!data?.lineUserId || !data?.first_name || !data?.last_name || !data?.tel_no)) {
      router.push("/register");
    } else {
      setRegistrationData(data);
    }
  }, [isAuthenticated, isLoading, router]);

  const confirmFields = registrationData ? [
    { label: "ชื่อ :", value: registrationData.first_name },
    { label: "นามสกุล :", value: registrationData.last_name },
    { label: "Email :", value: registrationData.email ?? "" },
    { label: "เบอร์โทรศัพท์ :", value: registrationData.tel_no },
  ] : [];

  const handleConfirm = async () => {
    if (!registrationData) {
      console.error("Registration data is not available");
      return;
    }
    setIsSubmitting(true);
    router.push("/register/otp");
  };

  const handleEdit = async () => {
    router.push("/register");
  };

  if (isLoading || !registrationData) {
    return (
      <main className="w-full">
        <div className="register-container">
          <div className="w-full">
            <RegisterHeader isAuthenticated={isAuthenticated} isLoading={isLoading} profileImage={user?.profileImage} />
            <div className="register-content w-656 mx-auto mt-40 mb-w-656 mb-mx-auto mb-mt-40">
              <RegisterForm
                key={user?.lineUserId || "form"}
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
                profile={registrationData}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full">
      <div className="register-container">
        <div className="w-full">
          <RegisterHeader
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
            profileImage={user?.profileImage}
          />
          <div className="register-content w-656 mx-auto mt-40 mb-w-656 mb-mx-auto mb-mt-40">
            {/* กล่องแสดงข้อมูลยืนยัน */}
            <div className="bg-white w-651 mb-59 pt-80 pl-50 pr-50 pb-80 rounded-10 mb-w-651 mb-mb-59 mb-pt-80 mb-pl-50 mb-pr-50 mb-pb-80 mb-rounded-10">
              <div className="flex-start flex-wrap gap-row-55 mb-gap-row-55">
                {confirmFields.map((item, idx) => (
                  <Fragment key={idx}>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 40 }}
                      transition={{
                        duration: 0.9,
                        ease: [0.17, 0.55, 0.55, 1],
                        delay: 0.3 + idx * 0.1,
                      }}
                      className="w-210 font-size-35 mb-font-size-35 font-normal text-color-blue text-right line-14 mb-w-210"
                    >
                      {item.label}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 40 }}
                      transition={{
                        duration: 0.9,
                        ease: [0.17, 0.55, 0.55, 1],
                        delay: 0.3 + idx * 0.1,
                      }}
                      className="w-338 font-size-35 mb-font-size-35 font-normal text-color-blue-deep text-left line-14 break-word pl-50 mb-w-338 mb-pl-50"
                    >
                      {item.value}
                    </motion.div>
                  </Fragment>
                ))}
              </div>
            </div>
            {/* ปุ่ม */}
            <div className="flex-start-center flex-col gap-25 mb-gap-25">
              <motion.button
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{
                  duration: 0.9,
                  ease: [0.17, 0.55, 0.55, 1],
                  delay: 0.7,
                }}
                onClick={handleConfirm}
                className={`flex-center font-light font-kanit font-size-30 mb-font-size-30 rounded-17 mb-rounded-17 w-553 h-81 mb-w-553 mb-h-81 ${isSubmitting ? "text-color-white-light bg-color-gray-soft" : "text-color-white-light bg-color-blue"}`}>
                {isSubmitting ? (
                  <>
                    <Image
                      width={36}
                      height={36}
                      src={spinnerUrl.src}
                      alt="spinner"
                      className="w-36 h-36 mr-15 mb-w-36 mb-h-36 mb-mr-15"
                    />
                    {/* <img src={spinnerUrl.src} alt="spinner" className="w-36 h-36 mr-15 mb-w-36 mb-h-36 mb-mr-15" /> */}
                    กำลังดำเนินการ...
                  </>
                ) : (
                  <>ยืนยันข้อมูล</>
                )}
              </motion.button>
              <motion.button 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ 
                  duration: 0.9,
                  ease: [0.17, 0.55, 0.55, 1],
                  delay: 0.8,
                }}
                onClick={handleEdit}
                className="flex-center font-light font-kanit font-size-30 mb-font-size-30 rounded-17 mb-rounded-17 text-color-blue bg-white border-color-blue w-553 h-81 mb-w-553 mb-h-81">
                แก้ไขข้อมูล
              </motion.button>
              {/* <ButtonSubmit
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
              </ButtonSubmit> */}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ 
                duration: 0.9,
                ease: [0.17, 0.55, 0.55, 1],
                delay: 0.9,
              }}
              className="text-exceeds-w-box relative flex-center-start flex-col font-size-26 mt-35 mb-mt-35">
              <p className="text-center text-color-blue-deep font-light font-size-26 mb-font-size-26">
                *ชื่อ–นามสกุล ไม่ถูกต้องโปรดแจ้งได้ที่หน้าสาขา{" "}
                <span className="font-gotham-book font-normal font-size-24 mb-font-size-24">
                  V Square Clinic
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};
