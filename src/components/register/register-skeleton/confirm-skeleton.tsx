"use client"

import React from "react"
import { Skeleton } from "@mui/material"
import RegisterHeaderSkeleton from "./register-header-skeleton"

export default function ConfirmSkeleton() {
  return (
    <div className="register-container h-auto flex-start-center flex-col">
      <div className="register-card w-full">
        {/* RegisterHeader Skeleton (reusing logic from RegisterSkeleton) */}
        <RegisterHeaderSkeleton />

        {/* Content Skeleton */}
        <div className="register-content w-656 mx-auto mt-40 mb-w-656 mb-mx-auto mb-mt-40">

          {/* Confirm Data Box Skeleton */}
          <div className="bg-white w-651 mb-59 pt-80 pl-50 pr-50 pb-80 rounded-10  mb-w-651 mb-mb-59 mb-pt-80 mb-pl-50 mb-pr-50 mb-pb-80 mb-rounded-10">
            <div className="confirm-data-box grid grid-cols-2">
              {[1, 2, 3, 4].map((index) => (
                <React.Fragment key={index}>
                  <div className="w-full flex-start">
                    <div className="w-240 mb-w-240 h-56 mb-h-56 pr-77 mb-pr-77">
                      <Skeleton variant="text" width="100%" height="100%" />
                    </div>
                  </div>
                  <div className="confirm-data w-full mb-w-full h-56 mb-h-56">
                    <Skeleton variant="text" width="100%" height="100%" />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex-start-center flex-col gap-25 mb-gap-25">
            <div className="flex-center rounded-17 mb-rounded-17 w-553 h-81 mb-w-553 mb-h-81">
              <Skeleton variant="rounded" width="100%" height="100%" />
            </div>
            <div className="flex-center rounded-17 mb-rounded-17 w-553 h-81 mb-w-553 mb-h-81">
              <Skeleton variant="rounded" width="100%" height="100%" />
            </div>
          </div>

          <div className="mt-80 mb-60 mb-mt-80 mb-mb-60 mx-auto w-668 h-50 mb-w-668 mb-h-50">
            <Skeleton variant="text" width="100%" height="100%" />
          </div>

        </div>
      </div>
    </div>
  )
} 