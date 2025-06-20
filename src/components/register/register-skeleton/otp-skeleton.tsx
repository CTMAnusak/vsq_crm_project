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
        <div className="register-content flex-start-center flex-col mx-auto w-651 mt-95 mb-w-651 mb-mt-95 mb-445 mb-mb-445">
          {/* Title Skeleton */}
          <div className="flex-start-center flex-col text-center mb-52 mb-mb-52 w-370 mb-w-370 h-87 mb-h-87">
            <Skeleton variant="text" width="100%" height="100%" />
          </div>

          {/* OTP Form Box Skeleton */}
          <div className="bg-white mb-32 pt-52 pl-48 pr-48 pb-46 rounded-10  mb-mb-32 mb-pt-52 mb-pl-48 mb-pr-48 mb-pb-46 mb-rounded-10 w-full">
            {/* Description Skeleton */}
            <div className="mx-auto mb-2 w-286 mb-w-286 h-56 mb-h-56">
              <Skeleton variant="text" width="100%" height="100%" />
            </div>
            <div className="mx-auto w-386 mb-w-386 h-56 mb-h-56">
              <Skeleton variant="text" width="100%" height="100%" />
            </div>

            {/* OTP Input Skeleton */}
            <div className="mt-42 mb-mt-42 mx-auto w-539 mb-w-539 h-113 mb-h-113 rounded-17 mb-rounded-17">
              <Skeleton variant="rounded" width="100%" height="100%" />
            </div>

            {/* Request OTP Skeleton */}
            <div className="text-exceeds-w-box translateX-minus-1-2 relative top-0 left-1-2  mb-top-0 mb-left-1-2 mt-38 mb-mt-38 text-center">
              <div className="mx-auto w-570 mb-w-570 h-72 mb-h-72">
                <Skeleton variant="text" width="100%" height="100%" />
              </div>
              <div className="mx-auto w-292 mb-w-292 h-72 mb-h-72">
                <Skeleton variant="text" width="100%" height="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 