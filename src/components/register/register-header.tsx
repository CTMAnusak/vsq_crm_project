import Image from "next/image"

interface RegisterHeaderProps {
  profileImage?: string | null;
}

export default function RegisterHeader({ profileImage }: RegisterHeaderProps) {
  return (
    <div>
      <div className="register-header-bar relative">
        <div className="register-header w-768 h-353 mb-w-768 mb-h-353">
          <div className="flex-start-center pl-27 pt-27 mb-pl-27 mb-pt-27">
            <div className="bg-white w-18 h-18 mr-19 mb-w-18 mb-h-18 mb-mr-19"></div>
            <span className="font-gotham font-light font-size-30 mb-font-size-30 text-white">REGISTER</span>
          </div>
        </div>
        <div className="register-profile-img absolute rounded-circle overflow-hidden top-40 left-1-2 mx-auto w-226 h-226 mb-top-40 mb-left-1-2 mb-w-226 mb-h-226 flex-center-center bg-color-gray-regular ">
          {profileImage ? (
            <Image src={profileImage} alt="Profile"  width={226} height={226} className="object-cover w-full h-full" />
          ) : null}
        </div>
      </div>
      <div className="flex-start-center flex-col text-center mt-65 mb-flex-start-center mb-flex-col mb-text-center mb-mt-65 gap-10 mb-gap-10">
        <p className="font-kanit text-color-blue-deep font-normal font-size-47 mb-font-size-47">
          เข้าร่วม <span className="font-gotham-medium font-medium">
            V Club
          </span>
        </p>
        <p className="text-color-blue font-normal line-12 font-size-35 mb-font-size-35 ">
          พบกับสิทธิประโยชน์ และรางวัลสุดพิเศษ
          <br />
          สำหรับสมาชิกเท่านั้น !
        </p>
      </div>
    </div>
    
  )
} 