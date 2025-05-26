import Image from "next/image"

export default function RegisterHeader() {
  return (
    <div className="register-header-bar mb-relative">
      <div className="register-header">
        <div className="mb-flex-start-center mb-pl-27 mb-pt-27">
          <div className="mb-w-18 mb-h-18 bg-white mb-mr-19"></div>
          <span className="mb-font-size-30 mb-font-light text-white">REGISTER</span>
        </div>
      </div>
      <div className="register-profile-img mb-absolute mb-top-0 mb-left-1-2 mb-mx-auto mb-w-226 mb-h-226 mb-rounded-circle mb-overflow-hidden ">
        <Image src="/images/anime_fairy.jpg" alt="Profile" width={96} height={96} className="object-cover" />
      </div>
    </div>
  )
} 