"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import RegisterHeader from "../../../components/register/register-header"
import OTPSkeleton from "../../../components/register/register-skeleton/otp-skeleton"

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export default function OTPPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData | null>(null)
  const [otp, setOtp] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState("")
  const [isResending, setIsResending] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // ดึงข้อมูลจาก localStorage
    const storedData = localStorage.getItem("registrationData")
    if (storedData) {
      setFormData(JSON.parse(storedData))
    } else {
      // ถ้าไม่มีข้อมูล ให้กลับไปหน้าลงทะเบียน
      router.push("/register")
    }
  }, [router])

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    // Countdown timer for OTP resend
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow digits and limit to 6 characters
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value)
      setError("") // Clear error on input change

      // ถ้ากรอกครบ 6 หลัก ให้ตรวจสอบ OTP ทันที
      if (value.length === 6) {
        // ตรวจสอบ OTP (สำหรับ demo purposes)
        if (value === "856900") {
          // ถ้าถูกต้อง ไปหน้าถัดไปทันที ไม่ต้องรอ blur
          router.push("/register/success")
        }
        // ถ้าไม่ถูกต้อง จะรอตรวจสอบและแสดง error ตอน blur แทน
      }

    } else if (!/^\d*$/.test(value)) {
       // ถ้าไม่ใช่ตัวเลข
       setError("กรุณากรอกเฉพาะตัวเลข")
    }
  }

  // เพิ่ม handleBlur สำหรับ input OTP
  const handleOtpBlur = () => {
    // ตรวจสอบเมื่อ blur เท่านั้น
    if (otp.length > 0 && otp.length < 6) {
      setError("กรุณากรอกรหัส OTP ให้ครบ 6 หลัก") // ข้อความ error เมื่อกรอกไม่ครบ 6 หลักตอน blur
    } else if (otp.length === 6) {
      // ตรวจสอบ OTP (สำหรับ demo purposes) เมื่อ blur และกรอกครบ 6 หลัก
      if (otp !== "856900") {
         setError("กรุณากรอกรหัส OTP ใหม่อีกครั้ง"); // ข้อความ error สำหรับรหัสไม่ถูกต้อง
      } else {
         // ถ้าถูกต้อง ลบ error (การไปหน้าถัดไปทำใน handleOtpChange แล้ว)
         setError("");
      }
    } else if (otp.length === 0) {
      // ถ้า input ว่างตอน blur ไม่ต้องแสดง error
      setError("");
    }
  }

  const handleRequestOTP = () => {
    if (countdown > 0) return

    setIsResending(true)
    // Simulate OTP sending
    setTimeout(() => {
      setCountdown(30)
      setIsResending(false)
    }, 1000)
  }

  // กำหนด class สำหรับ border เมื่อกรอกถูกต้องครบ 6 หลัก
  const correctBorderClass = useMemo(() => {
    // ถ้าไม่มี error และกรอกครบ 6 หลัก และถูกต้อง
    if (!error && otp.length === 6 && otp === "856900") {
      return "otp-input"; // ใช้ class สำหรับ border สีน้ำเงิน
    } else {
      return ""; // ไม่มี class เพิ่มเติมสำหรับ default หรือ error
    }
  }, [error, otp]);

  if (!formData) {
    return (
      <OTPSkeleton />
    )
  }

  return (
    <div className="register-container h-auto flex-start-center flex-col">
      <div className="register-card">
        <RegisterHeader />
        <div className="register-content relative flex-start-center flex-col mx-auto w-651 mt-97 mb-w-651 mb-mt-97 mb-445 mb-mb-445">
          <div className="flex-start-center flex-col text-center mb-40  mb-mb-40">
            <h2 className="register-title font-normal font-size-60 mb-font-size-60 text-color-blue-deep">ยืนยันรหัส <span className="text-color-blue">OTP</span></h2>
          </div>

          <div className="bg-white w-full  pt-56 pl-10 pr-10 pb-60 rounded-10  mb-pt-56 mb-pl-10 mb-pr-10 mb-pb-60 mb-rounded-10">
            {formData && (
                <p className="pb-56 font-size-30  mb-pb-56 mb-font-size-30 text-color-blue-deep font-light text-center">
                  กรุญายืนยัน OTP 6 หลัก
                  <br />
                  ที่ส่งไปที่หมายเลข {formData.phone}
                </p>
              )}
            <div className="flex-center">
              <input
                ref={inputRef}
                type="text"
                value={otp}
                onChange={handleOtpChange}
                onBlur={handleOtpBlur} // เพิ่ม onBlur handler
                // ใช้ class otp-input เป็นพื้นฐาน และเพิ่ม input-error เมื่อมี error หรือ correctBorderClass เมื่อถูกต้อง
                className={`otp-input px-0 mb-px-0 text-color-blue font-normal text-center w-539 h-113 rounded-17 font-size-60  mb-w-539 mb-h-113 mb-rounded-17 mb-font-size-60 
                  ${error ? "otp-input-error" : correctBorderClass}`}
                placeholder="• • • • • •"
                maxLength={6} // เพิ่ม maxLength เพื่อจำกัดจำนวนตัวอักษรใน input
              />
            </div>

            {/* Request OTP */}
            <div className="text-exceeds-w-box translateX-minus-1-2 relative top-0 left-1-2  mb-top-0 mb-left-1-2">
              <p className="pt-56 font-size-30  mb-pt-56 mb-font-size-30 text-color-blue-deep font-light text-center">
                กรณีไม่ได้รับรหัส SMS OTP ให้กด{" "}
                <button
                  type="button"
                  onClick={handleRequestOTP}
                  className={`text-color-blue underline font-size-30  mb-font-size-30 font-normal ${countdown > 0 ? "opacity-50 cursor-not-allowed text-color-gray-soft" : ""}`}
                  disabled={countdown > 0 || isResending}
                >
                  Request OTP
                </button>
              <br/>
              {isResending
                  ? "เพื่อขอรับรหัสใหม่อีกครั้ง"
                  : countdown > 0 // ตรวจสอบเงื่อนไข countdown
                    ? <>{"เพื่อขอรับรหัสใหม่อีกครั้ง "} {/* ข้อความส่วนแรก */}
                       <span className="text-color-red">{`กรุณารอ (${countdown}s)`}</span>{/* ข้อความส่วนที่ต้องการเป็นสีแดง */}
                      </>
                    : "เพื่อขอรับรหัสใหม่อีกครั้ง" // ข้อความเมื่อ countdown เป็น 0
                }
              </p>
            </div>

          </div>
            {/* Error Message */}
            <div className="relative w-full">
              {error && ( // แสดง error ถ้ามี
                <div className="absolute flex-center top-40 mb-top-40 left-1-2 mb-translate-x--1-2  bg-color-red-soft text-error font-light text-center w-537 h-82 rounded-17 font-size-30   mb-w-537 mb-h-82 mb-rounded-17 mb-font-size-30">
                  {error}
                </div>
              )}
            </div>
            
        </div>
      </div>
    </div>
  )
}
