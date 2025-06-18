"use client"

import { Skeleton } from "@mui/material"

export default function RegisterHeaderSkeleton() {
  return (
    <div className="register-header-bar relative h-353 mb-h-353">
      <div className="">
        <div className="flex-start-center pl-27 pt-27 mb-pl-27 mb-pt-27">
            <div className="w-18 mb-w-18 h-18 mb-h-18 mr-19 mb-mr-19">
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </div>
            <div className="w-150 mb-w-150 h-50 mb-h-50 mr-19 mb-mr-19">
              <Skeleton variant="text" width="100%" height="100%" />
            </div>
        </div>
      </div>
      <div className="register-profile-img absolute rounded-circle overflow-hidden w-226 mb-w-226 h-226 mb-h-226 top-0 left-1-2 mx-auto mb-top-0 mb-left-1-2">
          <Skeleton variant="circular" width="100%" height="100%" />
      </div>
    </div>
  )
} 