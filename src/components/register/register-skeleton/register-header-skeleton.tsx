"use client"

import { Skeleton } from "@mui/material"

export default function RegisterHeaderSkeleton() {
  return (
    <div className="bg-color-light-surface">
        <div className="register-header-bar relative h-353 mb-h-353">
          <div className="">
            <div className="flex-start-center pl-27 pt-27 mb-pl-27 mb-pt-27">
                <div className="w-20 mb-w-20 h-20 mb-h-20 mr-19 mb-mr-19">
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                </div>
                <div className="w-155 mb-w-155 h-50 mb-h-50 mr-19 mb-mr-19">
                  <Skeleton variant="text" width="100%" height="100%" />
                </div>
            </div>
          </div>
          <div className="register-profile-img absolute rounded-circle overflow-hidden w-226 mb-w-226 h-226 mb-h-226 top-40 left-1-2 mx-auto mb-top-40 mb-left-1-2">
              <Skeleton variant="circular" width="100%" height="100%" />
          </div>
        </div>
         
         {/* Title Skeleton */}
        <div className="flex-start-center flex-col text-center mt-65 mb-flex-start-center mb-flex-col mb-text-center mb-mt-65 gap-10 mb-gap-10">
          <div className="w-300 h-75 mb-w-300 mb-h-75">
              <Skeleton variant="text" width="100%" height="100%" />
            </div>
            <div className="flex-center flex-col">
              <div className="w-550 h-53 mb-w-550 mb-h-53">
                <Skeleton variant="text" width="100%" height="100%" />
              </div>
              <div className="w-301 h-53 mb-w-301 mb-h-53">
                <Skeleton variant="text" width="100%" height="100%" />
              </div>
            </div>
            
        </div>
    </div>
    
  )
} 