"use client"

import { Skeleton } from "@mui/material"

export default function SuccessSkeleton() {
  return (
    <div className="register-container h-auto flex-start-center flex-col">
      <div className="register-card flex-center flex-col mt-148 mb-mt-148">
        {/* Logo Skeleton */}
        <div className="relative w-475 h-183 mb-w-475 mb-h-183">
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </div>
        <div className="register-content h-auto flex-start-center flex-col mx-auto w-700 mb-244 mb-w-700 mb-mb-244">
          {/* Check Icon Skeleton */}
          <div className="flex flex-col items-center">
            <div className="flex-center w-290 h-290 mt-73 mb-w-290 mb-h-290 mb-mt-73 mb-40 mb-mb-40">
              <Skeleton variant="circular" width="100%" height="100%" />
            </div>
          </div>

          {/* Text Paragraphs Skeleton */}
          <div className="character-divider text-color-blue-deep font-normal text-center pb-60 font-size-54 mb-pb-60 mb-font-size-54 w-full">
            <div className="mx-auto w-465 h-80 mb-w-465 mb-h-80">
              <Skeleton variant="text" width="100%" height="100%" />
            </div>
            <div className="mx-auto w-285 h-80 mb-w-285 mb-h-80">
              <Skeleton variant="text" width="100%" height="100%" />
            </div>
          </div>

          <div className="text-center text-color-blue font-normal line-14 mb-70 mt-60 font-size-39 mb-mb-70 mb-mt-60 mb-font-size-39 w-full">
            <div className="mx-auto w-447 h-58 mb-w-447 mb-h-58">
              <Skeleton variant="text" width="100%" height="100%" />
            </div>
            <div className="mx-auto w-434 h-58 mb-w-434 mb-h-58">
              <Skeleton variant="text" width="100%" height="100%" />
            </div>
            <div className="mx-auto w-450 h-58 mb-w-450 mb-h-58">
              <Skeleton variant="text" width="100%" height="100%" />
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="w-490 h-81 mb-w-490 mb-h-81 rounded-17 mb-rounded-17">
            <Skeleton variant="rounded" width="100%" height="100%" className="mb-w-553 mb-h-84 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
} 