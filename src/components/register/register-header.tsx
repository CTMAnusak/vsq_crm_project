import Image from "next/image"

export default function RegisterHeader() {
  return (
    <div className="register-header-bar relative">
      <div className="register-header">
        <div className="flex-start-center pl-27 pt-27 mb-pl-27 mb-pt-27">
          <div className="bg-white w-18 h-18 mr-19 mb-w-18 mb-h-18 mb-mr-19"></div>
          <span className="font-size-30 mb-font-size-30 font-light text-white">REGISTER</span>
        </div>
      </div>
      <div className="register-profile-img absolute rounded-circle overflow-hidden top-0 left-1-2 mx-auto w-226 h-226 mb-top-0 mb-left-1-2 mb-w-226 mb-h-226">
        <Image src="/register/anime_fairy.jpg" alt="Profile"  width={96} height={96} className="object-cover" />
      </div>
    </div>
  )
} 