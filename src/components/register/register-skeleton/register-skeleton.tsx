"use client"

import { Skeleton } from "@mui/material"

export default function RegisterSkeleton() {
  return (
    <div className="w-full">
      <div className="register-container h-auto flex-start-center flex-col">
        <div className="register-card">
          {/* Header Skeleton */}
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
          <div className="register-content w-656 mx-auto mt-15 mb-w-656 mb-mx-auto mb-mt-15">
            {/* Title Skeleton */}
            <div className="flex-start-center flex-col text-center mb-24 mb-flex-start-center mb-flex-col mb-text-center mb-mb-24">
              <Skeleton variant="text" width={300} height={47} className="mb-2" />
              <Skeleton variant="text" width={400} height={35} className="mb-2" />
              <Skeleton variant="text" width={400} height={35} />
            </div>

            {/* Tabs Skeleton */}
            <div className="flex-center-start gap-16 mb-gap-16">
              {[1, 2].map((index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  width={319}
                  height={121}
                  className="mb-w-319 mb-h-121 mb-rounded-10"
                />
              ))}
            </div>

            {/* Form Fields Skeleton */}
            <div className="bg-white flex-start-center text-center flex-col mt-21 pt-32 pl-48 pr-48 pb-46 rounded-10 mb-mt-21 mb-pt-32 mb-pl-48 mb-pr-48 mb-pb-46 mb-rounded-10">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="mb-4 w-full">
                  <Skeleton variant="text" width={100} height={35} className="mb-2" />
                  <Skeleton
                    variant="rounded"
                    width={557}
                    height={88}
                    className="mb-w-557 mb-h-88 mb-rounded-17"
                  />
                </div>
              ))}
            </div>

            {/* Submit Button Skeleton */}
            <div className="mt-4">
              <Skeleton
                variant="rounded"
                width={553}
                height={84}
                className="mb-w-553 mb-h-84"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 