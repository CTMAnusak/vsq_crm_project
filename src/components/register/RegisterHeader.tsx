"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import "@/assets/css/registerHeader.css";

interface RegisterHeaderProps {
  isAuthenticated?: boolean;
  isLoading?: boolean;
  profileImage?: string | null;
}

export default function RegisterHeader({ isAuthenticated, isLoading, profileImage }: RegisterHeaderProps) {
  
  if (isLoading || isAuthenticated) {
    return (
      <div>
        <div className="register-header-bar relative">
          <div className="register-header filter-grayscale">
            <div className="flex-start-center pl-27 pt-38 mb-pl-27 mb-pt-38">
              <div className="bg-white w-18 h-18 mr-19 mb-w-18 mb-h-18 mb-mr-19"></div>
              <div className="skeleton-animate w-154 h-28 rounded-4 mb-w-154 mb-h-28 mb-rounded-4"></div>
            </div>
          </div>
          <div className="flex-start-center flex-col w-full pt-125 mb-pt-125">
            <div className="register-profile-img relative rounded-circle overflow-hidden w-226 h-226 mb-w-226 mb-h-226 bg-color-gray-regular">
              <div className="skeleton-animate w-full h-full"></div>
            </div>
          </div>
        </div>
        <div className="flex-start-center flex-col text-center pt-20 mb-flex-start-center mb-flex-col mb-text-center mb-pt-20 gap-8 mb-gap-8">
          <div className="skeleton-animate w-307 h-47 rounded-6 mb-w-307 mb-h-47 mb-rounded-6"></div>
          <div className="flex-start-center flex-col">
            <div className="skeleton-animate w-550 h-37 rounded-4 mt-16 mb-w-550 mb-h-37 mb-rounded-4 mb-mt-16"></div>
            <div className="skeleton-animate w-280 h-37 rounded-4 mt-10 mb-w-280 mb-h-37 mb-rounded-4 mb-mt-10"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="relative">
        <div className="register-header">
          <div className="flex-start-center pl-27 pt-27 mb-pl-27 mb-pt-27">
            <div className="bg-white w-18 h-18 mr-19 mb-w-18 mb-h-18 mb-mr-19"></div>
            <span className="font-gotham font-light font-size-30 text-white text-spacing-6 mb-font-size-30 mb-text-spacing-6">
                REGISTER
            </span>
          </div>
        </div>
        <div className="flex-start-center flex-col w-full pt-125 mb-pt-125">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ 
              duration: 0.9,
              ease: [0.17, 0.55, 0.55, 1],
            }}
            className="register-profile-img relative rounded-circle overflow-hidden w-226 h-226 mb-w-226 mb-h-226 bg-color-gray-regular">
            {profileImage ? (
            <Image src={profileImage} alt="Profile" fill className="img-w-full" />
            ) : null}
          </motion.div>
        </div>
      </div>
      <div className="flex-start-center flex-col text-center pt-10 mb-pt-10 gap-8 mb-gap-8">
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ 
            duration: 0.9,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.1,
          }}
          className="font-kanit text-color-blue-deep font-normal font-size-47 mb-font-size-47">
          เข้าร่วม <span className="font-gotham-medium font-medium">V Serenade</span>
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ 
            duration: 0.9,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.2,
          }}
          className="text-color-blue font-normal line-12 font-size-35 mb-font-size-35 ">
          พบกับสิทธิประโยชน์ และรางวัลสุดพิเศษ
          <br />
          สำหรับสมาชิกเท่านั้น!
        </motion.p>
      </div>
    </div>
  )
} 