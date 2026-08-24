"use client";

import Image from "next/image";
import { useEffect } from "react";
import ButtonSubmit from "@/components/register/button-submit";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SkeletonHome from "@/components/SkeletonHome";

import logo from "@/assets/images/register/vsq-text-logo.png";
import bgSuccess from "@/assets/images/register/bg-success.png";
import iconSuccess from "@/assets/images/register/icon-success.png";
import bgcheckIconComplete from "@/assets/images/register/check-icon-complete-page.png";

import "@/assets/css/success.css";
import "@/assets/css/pxtovw.css";

export default function SuccessPage() {
  return (
    <>
      <SuccessContent />
    </>
  );
}

const SuccessContent = () => {
  const { user, isAuthenticated, isLoading, closeWindow } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [user, isAuthenticated, router]);

  if (!isLoading && !isAuthenticated) {
    return (
      <main className="w-full">
        <div className="register-container">
          <div className="w-full pt-106 mb-pt-106">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{
                duration: 0.9,
                ease: [0.17, 0.55, 0.55, 1],
              }}  
              className="relative w-562 mx-auto mb-w-562">
              <Image
                src={logo}
                alt="VSquare Clinic Logo"
                className="w-full h-auto mx-auto"
              />
            </motion.div>
            <div className="relative w-full pt-29 mb-pt-29 pb-244 mb-pb-244">
              <div className="absolute top--85 left-0 w-full mb-top--85">
                <Image
                  src={bgSuccess}
                  alt="bg"
                  className="w-full h-auto mx-auto"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{
                  duration: 0.9,
                  ease: [0.17, 0.55, 0.55, 1],
                  delay: 0.1,
                }} 
                className="relative w-291 mx-auto z-9 mb-w-291">
                <Image
                  src={iconSuccess}
                  alt="icon"
                  className="w-full h-auto mx-auto"
                />
              </motion.div>
              <div className="relative w-490 mx-auto mb-w-490">
                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.17, 0.55, 0.55, 1],
                    delay: 0.2,
                  }}
                  className="character-divider w-full text-color-blue-deep line-14 font-normal text-center mt-19 mb-mt-19 pb-63 font-size-54 mb-pb-63 mb-font-size-54">
                  การลงทะเบียนสมาชิก
                  <br />
                  เสร็จสมบูรณ์
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.17, 0.55, 0.55, 1],
                    delay: 0.3,
                  }}
                  className="text-center text-color-blue font-normal line-14 mb-70 mt-56 font-size-39 mb-mb-70 mb-mt-56 mb-font-size-39">
                  V Square Clinic ขอขอบคุณ
                  <br />
                  ติดตามสิทธิสุดพิเศษได้เลย !
                  <br />
                  ทาง LINE@ V Square Clinic
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.17, 0.55, 0.55, 1],
                    delay: 0.4,
                  }}
                  className="flex-center font-light font-kanit font-size-30 mb-font-size-30 rounded-17 mb-rounded-17 text-color-white-light bg-color-blue w-full h-81 mb-h-81"
                  onClick={closeWindow}
                >
                  เข้าสู่ LINE@ V Square Clinic
                </motion.button>
              </div>
              {/* <ButtonSubmit
                onClick={closeWindow}
                variant="blue_bg"
                className="w-490 h-81 mb-w-490 mb-h-81"
              >
                เข้าสู่ LINE@ V Square Clinic
              </ButtonSubmit> */}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <SkeletonHome />
  )
}
