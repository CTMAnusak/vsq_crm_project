"use client"

import { Skeleton } from "@mui/material"

export default function SuccessSkeleton() {
  return (
    <div className="register-container h-auto flex-start-center flex-col">
      <div className="register-card flex-center flex-col mt-106 mb-mt-106">
        {/* Logo Skeleton */}
        <div className="relative w-562 h-270 mb-w-562 mb-h-270">
          <Skeleton variant="rectangular" width={562} height={270} />
        </div>
        <div className="register-content h-auto flex-start-center flex-col mx-auto w-700 mb-244 mb-w-700 mb-mb-244">
          {/* Check Icon Skeleton */}
          <div className="flex flex-col items-center">
            <div className="check-icon relative flex-center w-768 h-431 mt-29 mb-w-768 mb-h-431 mb-mt-29">
              <Skeleton variant="rectangular" width={768} height={431} />
            </div>
          </div>

          {/* Text Paragraphs Skeleton */}
          <div className="character-divider text-color-blue-deep font-normal text-center pb-60 font-size-54 mb-pb-60 mb-font-size-54 w-full">
            <Skeleton variant="text" width="70%" height={54} className="mx-auto mb-2" />
            <Skeleton variant="text" width="50%" height={54} className="mx-auto" />
          </div>

          <div className="text-center text-color-blue font-normal line-14 mb-70 mt-60 font-size-39 mb-mb-70 mb-mt-60 mb-font-size-39 w-full">
            <Skeleton variant="text" width="80%" height={39} className="mx-auto mb-2" />
            <Skeleton variant="text" width="70%" height={39} className="mx-auto mb-2" />
            <Skeleton variant="text" width="60%" height={39} className="mx-auto" />
          </div>

          {/* Button Skeleton */}
          <div className="mt-4">
            <Skeleton
              variant="rounded"
              width={553}
              height={84}
              className="mb-w-553 mb-h-84 mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 