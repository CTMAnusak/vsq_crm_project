"use client"

import { Skeleton } from "@mui/material"

export default function OTPSkeleton() {
  return (
    <div className="register-container h-auto flex-start-center flex-col">
      <div className="register-card">
        {/* RegisterHeader Skeleton */}
        <div className="register-header-bar relative">
          <div className="register-header">
            <div className="flex-start-center pl-27 pt-27 mb-pl-27 mb-pt-27">
              <Skeleton variant="rectangular" width={18} height={18} className="mr-19 mb-mr-19" />
              <Skeleton variant="text" width={100} height={30} />
            </div>
          </div>
          <div className="register-profile-img absolute rounded-circle overflow-hidden top-0 left-1-2 mx-auto w-226 h-226 mb-top-0 mb-left-1-2 mb-w-226 mb-h-226">
            <Skeleton variant="circular" width={226} height={226} />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="register-content flex-start-center flex-col mx-auto w-656 mt-15 mb-w-656 mb-mt-15">
          {/* Title Skeleton */}
          <div className="flex-start-center flex-col text-center mb-24  mb-mb-24">
            <Skeleton variant="text" width={300} height={60} />
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