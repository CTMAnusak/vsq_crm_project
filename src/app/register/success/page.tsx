"use client"

import Link from "next/link"
import { CheckIcon } from "lucide-react"
import Image from "next/image"
import ButtonSubmit from "../../../components/register/button-submit"

export default function SuccessPage() {
  return (
    <div className="register-container h-auto flex-start-center flex-col">

      <div className="register-card flex-center flex-col mt-106 mb-mt-106">
        <div className="relative w-562 h-270 mb-w-562 mb-h-270">
          <Image
            src="/register/vsq-text-logo.png"
            alt="VSquare Clinic Logo"
            fill
            className="w-auto h-full mx-auto"
          />
        </div>
        <div className="register-content h-auto flex-start-center flex-col mx-auto w-700 mb-244  mb-w-700 mb-mb-244">
          <div className="flex flex-col items-center">
            <div className="check-icon relative flex-center w-768 h-431 mt-29 mb-w-768 mb-h-431 mb-mt-29">
              <Image
              src="/register/check-icon-complete-page.png"
              alt="VSquare Clinic Logo"
              fill
              className="w-full h-auto mx-auto"
            />
            </div>
          </div>


            <p className="character-divider text-color-blue-deep font-normal text-center pb-60 font-size-54  mb-pb-60 mb-font-size-54">
              การลงทะเบียนสมาชิก
              <br />
              เสร็จสมบูรณ์
            </p>

            <p className="text-center text-color-blue font-normal line-14 mb-70 mt-60 font-size-39  mb-mb-70 mb-mt-60 mb-font-size-39">
              V Square Clinic ขอขอบคุณ
              <br />
              ติดตามสิทธิสุดพิเศษได้เลย !
              <br />
              ทาง LINE@ V Square Clinic
            </p>

            <ButtonSubmit 
              href="#"
              variant="blue_bg"
              className="w-553 h-84 mb-w-553 mb-h-84"
            >
              เข้าสู่ LINE@ V Square Clinic
            </ButtonSubmit>
          </div>
        </div>
      </div>

  )
}
