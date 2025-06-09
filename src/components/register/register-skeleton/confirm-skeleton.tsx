"use client"

import React from "react"
import { Skeleton } from "@mui/material"

export default function ConfirmSkeleton() {
  return (
    <div className="register-container h-auto flex-start-center flex-col">
      <div className="register-card">
        {/* RegisterHeader Skeleton (reusing logic from RegisterSkeleton) */}
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
        <div className="register-content w-656 mx-auto mt-23 mb-273 mb-w-656 mb-mx-auto mb-mt-23 mb-mb-273">
          {/* Title Skeleton */}
          <div className="flex-start-center flex-col text-center mb-24 mb-mb-24">
            <Skeleton variant="text" width={300} height={47} className="mb-2" />
            <Skeleton variant="text" width={400} height={35} className="mb-2" />
            <Skeleton variant="text" width={400} height={35} />
          </div>

          {/* Confirm Data Box Skeleton */}
          <div className="bg-white w-651 mb-59 pt-115 pl-71 pr-71 pb-135 rounded-10 mb-w-651 mb-mb-59 mb-pt-115 mb-pl-71 mb-pr-71 mb-pb-135 mb-rounded-10">
            <div className="confirm-data-box grid grid-cols-2">
              {[1, 2, 3].map((index) => (
                <React.Fragment key={index}>
                  <Skeleton variant="text" width={150} height={35} className="text-left" />
                  <Skeleton variant="text" width={200} height={35} className="text-left" />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex-start-center flex-col gap-18 mb-gap-18">
            <Skeleton variant="rounded" width={553} height={84} className="mb-w-553 mb-h-84" />
            <Skeleton variant="rounded" width={553} height={84} className="mb-w-553 mb-h-84" />
          </div>
        </div>
      </div>
    </div>
  )
} 