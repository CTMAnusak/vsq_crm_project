"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CheckIcon } from "lucide-react"

export default function SuccessPage() {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: string; delay: string }>>([])

  useEffect(() => {
    // สร้าง confetti effect
    const confettiCount = 30
    const newConfetti = []

    for (let i = 0; i < confettiCount; i++) {
      newConfetti.push({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
      })
    }

    setConfetti(newConfetti)

    // ลบข้อมูลลงทะเบียนจาก localStorage
    localStorage.removeItem("registrationData")
  }, [])

  return (
    <div className="min-h-screen bg-[#f0f8f0] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Confetti animation */}
      {confetti.map((item) => (
        <div
          key={item.id}
          className="confetti"
          style={{
            left: item.left,
            animationDelay: item.delay,
            backgroundColor: ["#3b82f6", "#60a5fa", "#93c5fd", "#2563eb"][Math.floor(Math.random() * 4)],
          }}
        />
      ))}

      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden z-10">
        <div className="p-8 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-6 relative">
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center success-animation">
              <CheckIcon className="h-12 w-12 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
            การลงทะเบียนสมาชิก
            <br />
            เสร็จสมบูรณ์
          </h1>

          <p className="text-center text-gray-600 mb-8">
            V Square Clinic ขอขอบคุณ
            <br />
            ที่ตามสิทธิสุดพิเศษกับเรา !
            <br />
            ทาง LINE@ V Square Clinic
          </p>

          <Link href="#" className="btn-primary w-full flex items-center justify-center">
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
              className="mr-2"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            เข้าสู่ LINE@ V Square Clinic
          </Link>
        </div>
      </div>
    </div>
  )
}
