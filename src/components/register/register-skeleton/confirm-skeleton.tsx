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
        <div className="register-content w-656 mx-auto mt-23 mb-273 mb-w-656 mb-mx-auto mb-mt-23 mb-mb-273">
          {/* Title Skeleton */}
          <div className="flex-start-center flex-col text-center mb-24 mb-mb-24">
            <div className="w-307 mb-w-307 h-75 mb-h-75">
              <Skeleton variant="text" width="100%" height="100%" />
            </div>
            <div className="w-520 mb-w-520 h-42 mb-h-42">
              <Skeleton variant="text" width="100%" height="100%" />
            </div>
            <div className="w-310 mb-w-310 h-42 mb-h-42">
              <Skeleton variant="text" width="100%" height="100%" />
            </div>
          </div>

          {/* Confirm Data Box Skeleton */}
          <div className="bg-white w-651 mb-59 pt-80 pl-10 pr-10 pb-80 rounded-10  mb-w-651 mb-mb-59 mb-pt-80 mb-pl-10 mb-pr-10 mb-pb-80 mb-rounded-10">
            <div className="confirm-data-box grid grid-cols-2">
              {[1, 2, 3, 4].map((index) => (
                <React.Fragment key={index}>
                  <div className="w-full flex-end-start">
                    <div className="w-200 mb-w-200 h-35 mb-h-35 pr-77 mb-pr-77">
                      <Skeleton variant="text" width="100%" height="100%" />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="w-240 mb-w-240 h-35 mb-h-35">
                      <Skeleton variant="text" width="100%" height="100%" />
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex-start-center flex-col gap-18 mb-gap-18">
            <div className="flex-center rounded-17 mb-rounded-17 w-553 h-81 mb-w-553 mb-h-81">
              <Skeleton variant="rounded" width="100%" height="100%" />
            </div>
            <div className="flex-center rounded-17 mb-rounded-17 w-553 h-81 mb-w-553 mb-h-81">
              <Skeleton variant="rounded" width="100%" height="100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 