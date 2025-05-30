"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CheckIcon } from "lucide-react"
import Image from "next/image"

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
    <div className="register-container">
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
      <div className="register-card mb-flex-center mb-flex-col mb-mt-24">
        <Image
          src="/assets/images/anime_fairy.jpg"
          alt="VSquare Clinic Logo"
          width={200}
          height={200}
          className="mx-auto mb-8"
        />
        <div className="register-content mb-w-656 mb-mx-auto mb-mt-15">
          <div className="p-8 flex flex-col items-center">

            <div className="check-icon">
              <span className="ripple"></span>
              <div className="circle-container">
                <div className="ripple"></div>
                <div className="outer-circle">
                  <div className="middle-circle">
                    <div className="inner-circle">
                      <CheckIcon className="mb-h-50 mb-w-50 text-white" />
                    </div>
                  </div>
                </div>
            </div>

            <div className="shadow-bar "></div>
          </div>


            <h1 className="text-color-blue-deep mb-mb-28 mb-font-size-20 mb-font-normal mb-line-12 text-center">
              การลงทะเบียนสมาชิก
              <br />
              เสร็จสมบูรณ์
            </h1>

            <hr className="mb-border-t mb-border-gray-light mb-w-full mb-mb-6" />

            <p className="text-center text-color-blue mb-mb-28 mb-font-size-20 mb-font-normal mb-line-12">
              V Square Clinic ขอขอบคุณ
              <br />
              ติดตามสิทธิสุดพิเศษได้เลย !
              <br />
              ทาง LINE@ V Square Clinic
            </p>

            <Link href="#" className="mb-flex-center bg-color-blue mb-w-553 mb-h-84 mb-rounded-17 mb-font-light mb-font-size-30 text-white">
              เข้าสู่ LINE@ V Square Clinic
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
