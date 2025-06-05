"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import RegisterHeader from "../../../components/register/register-header"

type FormData = {
  firstName: string
  lastName: string
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
         setError("รหัส OTP ไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง"); // ข้อความ error สำหรับรหัสไม่ถูกต้อง
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
      <div className="min-h-screen bg-[#f0f8f0] flex justify-center items-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <p className="text-center">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="register-container h-auto flex-start-center flex-col">
      <div className="register-card">
        <RegisterHeader />
        <div className="register-content flex-start-center flex-col mx-auto w-656 mt-15 mb-w-656 mb-mt-15">
          <div className="flex-start-center flex-col text-center mb-24  mb-mb-24">
            <h2 className="register-title font-normal font-size-60 mb-font-size-60 text-color-blue-deep">ยืนยันรหัส <span className="text-color-blue">OTP</span></h2>
          </div>

          <div className="bg-white mb-32 pt-32 pl-48 pr-48 pb-46 rounded-10  mb-mb-32 mb-pt-32 mb-pl-48 mb-pr-48 mb-pb-46 mb-rounded-10">
            {formData && (
                <p className="pb-42 font-size-30  mb-pb-42 mb-font-size-30 text-color-blue-deep font-light text-center">
                  กรุณาใส่รหัส OTP 6 หลัก
                  <br />
                  ที่ส่งไปที่หมายเลข {formData.phone}
                </p>
              )}
            <div>
              <input
                ref={inputRef}
                type="text"
                value={otp}
                onChange={handleOtpChange}
                onBlur={handleOtpBlur} // เพิ่ม onBlur handler
                // ใช้ class otp-input เป็นพื้นฐาน และเพิ่ม input-error เมื่อมี error หรือ correctBorderClass เมื่อถูกต้อง
                className={`otp-input text-color-blue font-normal text-center w-557 h-88 rounded-17 font-size-35  mb-w-557 mb-h-88 mb-rounded-17 mb-font-size-35 
                  ${error ? "input-error" : correctBorderClass}`}
                placeholder="• • • • • •"
                maxLength={6} // เพิ่ม maxLength เพื่อจำกัดจำนวนตัวอักษรใน input
              />
            </div>

            {/* Request OTP */}
            <div className="text-exceeds-w-box relative top-0 left-1-2  mb-top-0 mb-left-1-2">
              <p className="pt-42 font-size-30  mb-pt-55 mb-font-size-30 text-color-blue-deep font-light text-center">
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
                       <span className="text-error">{`กรุณารอ (${countdown}s)`}</span>{/* ข้อความส่วนที่ต้องการเป็นสีแดง */}
                      </>
                    : "เพื่อขอรับรหัสใหม่อีกครั้ง" // ข้อความเมื่อ countdown เป็น 0
                }
              </p>
            </div>

          </div>
            {/* Error Message */}
            {error && ( // แสดง error ถ้ามี
              <div className="flex-center bg-color-red-soft text-error font-normal text-center mb-55 w-557 h-88 rounded-17 font-size-24  mb-mb-55 mb-w-557 mb-h-88 mb-rounded-17 mb-font-size-24">
                {error}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
