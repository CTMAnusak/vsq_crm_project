"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

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
      setError("")
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (otp.length !== 6) {
      setError("กรุณากรอกรหัส OTP ให้ครบ 6 หลัก")
      return
    }

    // For demo purposes, any 6-digit OTP is valid
    if (otp === "856900") {
      router.push("/register/success")
    } else {
      setError("กรุณากรอกรหัส OTP ใหม่อีกครั้ง")
      setOtp("")
    }
  }

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
    <div className="min-h-screen bg-[#f0f8f0] flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden mt-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-4 text-white flex items-center">
          <div className="mr-2">
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
          <span className="font-semibold">REGISTER</span>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
              <Image
                src="/images/anime_fairy.jpg"
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">ยืนยันรหัส OTP</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center text-sm text-gray-600 mb-4">
              <p>กรุณาใส่รหัส OTP 6 หลัก</p>
              <p>ที่ส่งไปที่หมายเลข {formData.phone}</p>
            </div>

            <div className="mb-4">
              <input
                ref={inputRef}
                type="text"
                value={otp}
                onChange={handleOtpChange}
                className={`otp-input ${error ? "border-red-500" : ""}`}
                placeholder="• • • • • •"
              />
            </div>

            {error && <div className="bg-red-100 text-red-600 p-3 rounded-md text-center text-sm">{error}</div>}

            <div className="text-center text-sm">
              <p>
                กรณีไม่ได้รับรหัส SMS OTP ให้กด{" "}
                <button
                  type="button"
                  onClick={handleRequestOTP}
                  className={`text-blue-600 font-medium ${countdown > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={countdown > 0 || isResending}
                >
                  Request OTP
                </button>
              </p>
              <p className="mt-1">
                {isResending
                  ? "เพื่อขอรับรหัสใหม่อีกครั้ง"
                  : countdown > 0
                    ? `เพื่อขอรับรหัสใหม่อีกครั้ง กรุณารอ (${countdown}s)`
                    : "เพื่อขอรับรหัสใหม่อีกครั้ง"}
              </p>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={otp.length !== 6}>
              ยืนยัน
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
