"use client"

// import { Skeleton } from "@mui/material"
import RegisterHeaderSkeleton from "./register-header-skeleton"

export default function RegisterSkeleton() {
  return (
    <div className="w-full">
      <div className="register-container h-auto flex-start-center flex-col">
        <div className="register-card w-full">
          {/* Header Skeleton */}
          <RegisterHeaderSkeleton />

          {/* Content Skeleton */}
          <div className="register-content w-656 mx-auto mt-40 mb-w-656 mb-mx-auto mb-mt-40">
            

            {/* Tabs Skeleton */}
            <div className="flex-center-start gap-16 mb-gap-16">
              {/* {[1, 2].map((index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  width={319}
                  height={121}
                  className="mb-w-319 mb-h-121 mb-rounded-10"
                />
              ))} */}
            </div>

            {/* Form Fields Skeleton */}
            <div className="bg-white flex-start-center text-center flex-col w-651 mb-w-651 mt-40 pt-77 pb-54 rounded-10 mb-mt-40 mb-pt-77 mb-pb-54 mb-rounded-10 mb-82 mb-mb-82">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="mb-28 mb-mb-28 w-full w-555 h-86 mb-w-555 mb-h-86 rounded-17 mb-rounded-17 ">
                  {/* <Skeleton
                    variant="rounded"
                    width="100%"
                    height="100%"
                    className=""
                  /> */}
                </div>
              ))}
            </div>

            {/* Submit Button Skeleton */}
            <div className="mx-auto rounded-17 mb-rounded-17 w-553 h-81 mb-w-553 mb-h-81">
              {/* <Skeleton
                variant="rounded"
                width="100%"
                height="100%"
                className=""
              /> */}
            </div>

            <div className="mt-35 mb-60 mb-mt-35 mb-mb-60 mx-auto w-668 h-50 mb-w-668 mb-h-50">
              {/* <Skeleton variant="text" width="100%" height="100%" /> */}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
} 