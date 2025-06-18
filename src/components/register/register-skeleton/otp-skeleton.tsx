"use client"

import { Skeleton } from "@mui/material"
import RegisterHeaderSkeleton from "./register-header-skeleton"

export default function OTPSkeleton() {
  return (
    <div className="register-container h-auto flex-start-center flex-col">
      <div className="register-card w-full">
        {/* RegisterHeader Skeleton (reusing logic from RegisterSkeleton) */}
        <RegisterHeaderSkeleton />

        {/* Content Skeleton */}
        <div className="register-content flex-start-center flex-col mx-auto w-651 mt-100 mb-w-651 mb-mt-100 mb-445 mb-mb-445">
          {/* Title Skeleton */}
          <div className="flex-start-center flex-col text-center mb-40 mb-mb-40 w-370 mb-w-370 h-104 mb-h-104">
            <Skeleton variant="text" width="100%" height="100%" />
          </div>

          {/* OTP Form Box Skeleton */}
          <div className="bg-white mb-32 pt-32 pl-48 pr-48 pb-46 rounded-10  mb-mb-32 mb-pt-32 mb-pl-48 mb-pr-48 mb-pb-46 mb-rounded-10 w-full">
            {/* Description Skeleton */}
            <Skeleton variant="text" width="80%" height={30} className="mx-auto mb-2" />
            <Skeleton variant="text" width="60%" height={30} className="mx-auto" />

            {/* OTP Input Skeleton */}
            <div className="mt-8">
              <Skeleton
                variant="rounded"
                width={557}
                height={88}
                className="mb-w-557 mb-h-88 mb-rounded-17 mx-auto"
              />
            </div>

            {/* Request OTP Skeleton */}
            <div className="mt-8 text-center">
              <Skeleton variant="text" width="70%" height={30} className="mx-auto" />
              <Skeleton variant="text" width="50%" height={30} className="mx-auto mt-1" />
            </div>
          </div>

          {/* Error Message Placeholder (optional, but good to have space) */}
          <div className="mt-4">
             <Skeleton variant="rounded" width={557} height={88} className="mb-w-557 mb-h-88 mb-rounded-17 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
} 