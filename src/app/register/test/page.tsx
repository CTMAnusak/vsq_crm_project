"use client"

import ConfirmSkeleton from "../../../components/register/register-skeleton/confirm-skeleton"
import OTPSkeleton from "../../../components/register/register-skeleton/otp-skeleton"
import RegisterHeaderSkeleton from "../../../components/register/register-skeleton/register-header-skeleton"
import RegisterSkeleton from "../../../components/register/register-skeleton/register-skeleton"

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100">
        {/* <RegisterSkeleton /> */}
      {/* <ConfirmSkeleton /> */}
      <OTPSkeleton />
    </div>
  )
}
