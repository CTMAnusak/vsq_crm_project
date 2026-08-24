"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { liffService } from "@/lib/liff";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logo from "@/assets/images/home/vsquare-logo.png";

import "@/assets/css/pxtovw.css";
import "@/assets/css/home.css";

import basicCard from "@/assets/images/home/basic-card.png";
import silverCard from "@/assets/images/home/silver-card.png";
import goldCard from "@/assets/images/home/gold-card.png";
import platinumCard from "@/assets/images/home/platinum-card.png";
import bgHeader from "@/assets/images/home/bg-header.png";
import light from "@/assets/images/home/light.png";

import iconHome from "@/assets/images/home/icon-home.png";
import iconCourse from "@/assets/images/home/icon-course.png";
import iconGift from "@/assets/images/home/icon-gift.png";
import iconAppointment from "@/assets/images/home/icon-appointment.png";
import iconHomeActive from "@/assets/images/home/icon-home-active.png";
import iconCourseActive from "@/assets/images/home/icon-course-active.png";
import iconGiftActive from "@/assets/images/home/icon-gift-active.png";
import iconAppointmentActive from "@/assets/images/home/icon-appointment-active.png";

import iconMemberCard from "@/assets/images/home/icon-member-card.png";
import iconSilverCard from "@/assets/images/home/icon-silver-card.png";
import iconGoldCard from "@/assets/images/home/icon-gold-card.png";
import iconPlatinumCard from "@/assets/images/home/icon-platinum-card.png";

import iconGift1 from "@/assets/images/home/icon-gift-1.png";
import iconGift2 from "@/assets/images/home/icon-gift-2.png";
import iconGift3 from "@/assets/images/home/icon-gift-3.png";

export default function HomePage() {
  return (
    <>
      {/* <Header /> */}
      <HomeContent />
      {/* <Footer /> */}
    </>
  );
}

const HomeContent = () => {
  const { user, isAuthenticated, isLoading, logout, closeWindow } = useAuth();
  const [memberClass, setMemberClass] = useState("member");
  const [userData, setUserData] = useState(null);
  const [progressBarData, setProgressBarData] = useState(null);
  const [memberLevelPeriodData, setMemberLevelPeriodData] = useState(null);
  const [badgeCountsData, setBadgeCountsData] = useState(null);
  const [activeTab, setActiveTab] = useState<'member' | 'silver' | 'gold' | 'platinum'>('member');
  const activeClassByTab = {
    member: 'active-member',
    silver: 'active-silver',
    gold: 'active-gold',
    platinum: 'active-platinum'
  } as const;
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        setUserData(user);
        if (user?.memberLevelName === "V Silver") {
          setMemberClass("silver");
          setActiveTab('silver');
        } else if (user?.memberLevelName === "V Gold") {
          setMemberClass("gold");
          setActiveTab('gold');
        } else if (user?.memberLevelName === "V Platinum") {
          setMemberClass("platinum");
          setActiveTab('platinum');
        } else {
          setMemberClass("member");
          setActiveTab('member');
        }
      } else {
        router.push("/register");
      }
    }
    const progressBarRes = user?.progressBar;
    setProgressBarData(progressBarRes);
    const memberLevelPeriodData = user?.memberLevelPeriod;
    setMemberLevelPeriodData(memberLevelPeriodData);
    const badgeCountsData = user?.badgeCounts;
    setBadgeCountsData(badgeCountsData);
  }, [user, isAuthenticated, isLoading, router]);

  const membershipData = {
    member: {
      cardImage: basicCard,
      bgMainClass: "bg-basic",
      bgSubClass: "bg-basic-sub",
      spendingAmount: "0 บาท",
      progressBgColor: "bg-white",
      progressIndicatorColor: "progressIndicatorColor-basic",
    },
    silver: {
      cardImage: silverCard, // You can replace with a silver card image if available
      bgMainClass: "bg-silver",
      bgSubClass: "bg-silver-sub",
      spendingAmount: "150,250 บาท",
      progressBgColor: "bg-white",
      progressIndicatorColor: "progressIndicatorColor-silver",
    },
    gold: {
      cardImage: goldCard,
      bgMainClass: "bg-gold",
      bgSubClass: "bg-gold-sub",
      spendingAmount: "350,250 บาท",
      progressBgColor: "bg-white",
      progressIndicatorColor: "progressIndicatorColor-gold",
    },
    platinum: {
      cardImage: platinumCard,
      bgMainClass: "bg-platinum",
      bgSubClass: "bg-platinum-sub",
      spendingAmount: "560,250 บาท",
      progressBgColor: "bg-white",
      progressIndicatorColor: "progressIndicatorColor-platinum",
    },
  };

  const memberships = [
    {
      key: "member",
      label: "V MEMBER",
      min: 0,
      max: 300000,
    },
    {
      key: "silver",
      label: "V SILVER",
      min: 100001,
      max: 300000,
    },
    {
      key: "gold",
      label: "V GOLD",
      min: 300001,
      max: 500000,
    },
    {
      key: "platinum",
      label: "V PLATINUM",
      min: 500001,
      max: 900000,
    },
  ];

  const getClassIndex = (memberClass: string) =>
    memberships.findIndex((c) => c.key === memberClass);

  const getClassRange = (memberClass: string) => {
    const idx = getClassIndex(memberClass);
    return {
      current: memberships[idx],
      next: memberships[idx + 1] || null,
      prev: memberships[idx - 1] || null,
      isFirst: idx === 0,
      isLast: idx === memberships.length - 1,
    };
  };

  // Function to calculate progress within current class range
  const calculateRangeProgress = (
    spendingAmount: string,
    memberClass: string
  ): number => {
    const amount = parseInt(spendingAmount.replace(/[^0-9]/g, ""));
    const { current, next } = getClassRange(memberClass);
    if (!next) {
      // กรณี platinum ให้แสดงเต็ม 100%
      return 100;
    }
    const min = current.min;
    const max = next.min - 1;
    const progress = Math.max(
      0,
      Math.min(100, Math.round(((amount - min) / (max - min)) * 100))
    );
    return progress;
  };

  const currentMembership = membershipData[memberClass];
  const { current, next, isLast } = getClassRange(memberClass);

  const handleDeleteUser = async () => {
    const uuid = userData?.customerUuid;
    try {
      const accessToken = await liffService.getAccessToken();
      const deleteRes = await fetch("/api/user/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uuid, accessToken }),
      });
      const deleteResult = await deleteRes.json();
      await logout();
      await closeWindow();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-loading w-full relative pb-70 mb-pb-70">
        <header className="absolute top-22 right-29 z-9 mb-top-22 mb-right-29">
            <div className="skeleton-animate w-168 h-60 rounded-8 mb-w-168 mb-h-60 mb-rounded-8"></div>
        </header>
        {/* Header background image */}
        {/* <div className="absolute top-0 left-0 right-0 z-0 overflow-visible">
          <Image
            src={bgHeader}
            alt="Header background"
            width={768}
            height={546}
            className="w-full h-auto bg-header-shadow"
          />
        </div> */}

        {/* Main content */}
        <main className="w-full flex flex-col items-center custom-height-100dvh">
          {/* Greeting */}
          <div className="w-full pl-50 pr-50 mt-70 mb-80 mb-pl-50 mb-pr-50 mb-mt-70 mb-mb-80 z-3">
            <h1 className="skeleton-animate w-231 h-64 rounded-8 mt-15 mb-14 mb-w-231 mb-h-64 mb-rounded-8 mb-mt-15 mb-mb-14"></h1>
            <h2 className="skeleton-animate w-440 h-54 rounded-8 mt-14 mb-w-440 mb-h-54 mb-rounded-8 mb-mt-14"></h2>
          </div>

          {/* Membership Card */}
          <div className="relative">
            <div className="bg-white overflow-hidden card-shadow w-669 h-435 rounded-22 mb-w-669 mb-h-435 mb-rounded-22">
              <div className="skeleton-animate w-full h-full"></div>
            </div>
            <div className="absolute top-342 left--110 w-640 h-183 mb-top-342 mb-left--110 mb-w-640 mb-h-183">
              <Image src={light} alt="Light effect" className="w-full h-auto" />
            </div>
          </div>

          {/* Membership Level */}
          <div className="w-full flex-start-center flex-col mt-20 mb-60 mb-mt-20 mb-mb-60">
            <h3 className="skeleton-animate w-418 h-60 rounded-8 mt-24 mb-w-418 mb-h-60 mb-rounded-8 mb-mt-24"></h3>
            <div className="skeleton-animate w-182 h-55 rounded-50 pl-33 pr-33 mt-30 mb-w-182 mb-h-55 mb-rounded-50 mb-pl-33 mb-pr-33 mb-mt-30 card-shadow"></div>
          </div>
          {/* Progress Bar */}
          <div className="w-full mb-30 mb-mb-30">
            <div className="flex flex-col items-center h-100 mb-h-100">
              <div className="skeleton-animate w-152 h-38 mb-20 rounded-4 mb-w-152 mb-h-38 mb-mb-20 mb-rounded-4"></div>
              <div className="flex-center mb-8 gap-9 mb-mb-8 mb-gap-9">
                <div className="skeleton-animate w-116 h-34 rounded-4 mb-w-116 mb-h-34 mb-rounded-4"></div>
                <div className="flex-1 relative flex items-center w-440 mb-w-440">
                  <div className="w-full bg-white relative overflow-hidden h-10 rounded-100 mb-h-10 mb-rounded-100 ">
                    <div
                      className="skeleton-animate h-full"
                      style={{ width: `50%` }}
                    ></div>
                  </div>
                  <span className="skeleton-animate absolute left-0 w-24 h-24 mb-w-24 mb-h-24 rounded-100 mb-rounded-100"></span>
                  <span className="absolute right-0 w-24 h-24 mb-w-24 mb-h-24 rounded-100 mb-rounded-100 bg-white"></span>
                  <div className="absolute left-0 top-40 translate-x--75 mb-top-40 mb-translate-x--75">
                    <div className="skeleton-animate w-128 h-28 rounded-4 mb-w-128 mb-h-28 mb-rounded-4"></div>
                  </div>
                  <div className="absolute right-0 top-40 translate-x-75 mb-top-40 mb-translate-x-75">
                    <div className="skeleton-animate w-150 h-28 rounded-4 mb-w-150 mb-h-28 mb-rounded-4"></div>
                  </div>
                </div>
                <div className="skeleton-animate w-97 h-34 rounded-4 mb-w-97 mb-h-34 mb-rounded-4"></div>
              </div>
            </div>
          </div>
          <div className="flex-start-center flex-col w-full mt-50 mb-mt-50">
            <div className="skeleton-animate flex w-320 h-28 rounded-4 mb-w-320 mb-h-28 mb-rounded-4"></div>
            <div className="skeleton-animate flex w-390 h-28 rounded-4 mt-11 mb-w-390 mb-h-28 mb-rounded-4 mb-mt-11"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      className={`w-full relative ${currentMembership.bgMainClass}`}
    >
      <header className="absolute top-16 right-29 z-9 mb-top-16 mb-right-29">
        <Link href="/" className="w-168 h-65 mb-w-168 mb-h-65">
          <Image className="w-full h-auto" src={logo} alt="logo" />
        </Link>
      </header>
      {/* <div onClick={handleDeleteUser} className="absolute top-92 right-35 z-9 flex-center w-160 h-60 font-kanit font-size-25 font-normal text-white bg-color-blue-deep rounded-8 cursor-pointer mb-top-92 mb-right-35 mb-w-160 mb-h-60 mb-font-size-25 mb-rounded-8">Delete User</div> */}
      {/* Header background image */}
      {/* <div className="absolute top-0 left-0 right-0 z-0 overflow-visible">
        <Image
          src={bgHeader}
          alt="Header background"
          width={768}
          height={546}
          className="w-full h-auto bg-header-shadow"
        />
      </div> */}

      {/* Main content */}
      <main className="">
        <div className="w-full flex flex-col items-center custom-height-100dvh">
          {/* Greeting */}
          <div className="w-full pl-50 pr-50 mt-70 mb-80 mb-pl-50 mb-pr-50 mb-mt-70 mb-mb-80 z-3">
            <h1 className="font-light font-size-71 mx-0 mb-font-size-71 line-13 text-darkblue">
              <p>สวัสดีค่ะ</p>
            </h1>
            <h2 className="font-light font-size-54 mx-0 mb-font-size-54 line-1 text-blue">
              คุณ {userData?.firstName} {userData?.lastName}
            </h2>
          </div>

          {/* Membership Card */}
          <div className="relative">
            <div className="overflow-hidden card-shadow w-669 mb-w-669">
              <Image
                src={currentMembership.cardImage || "/placeholder.svg"}
                alt={`${memberClass.charAt(0).toUpperCase() + memberClass.slice(1)
                  } Membership Card`}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-342 left--110 w-640 h-183 mb-top-342 mb-left--110 mb-w-640 mb-h-183">
              <Image src={light} alt="Light effect" className="w-full h-auto" />
            </div>
          </div>

          {/* Membership Level */}
          <div className="w-full text-center mt-20 mb-60 mb-mt-20 mb-mb-60">
            <h3 className="text-white mb-2 font-size-75 line-15 mb-font-size-75 mb-line-15 font-gotham-book font-normal">
              <span className="">V {memberClass.toUpperCase()}</span>
            </h3>
            <div
              className={`inline-block text-white font-gotham-book font-normal rounded-35 pl-33 pr-33 font-size-34 mb-rounded-35 mb-pl-33 mb-pr-33 mb-font-size-34 card-shadow ${currentMembership.bgSubClass}`}
            >
              CLASS
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full mb-30 mb-mb-30">
            <div className="flex flex-col items-center">
              <p className="text-center text-white font-light font-size-24 mb-font-size-24 mb-20 mb-mb-20">
                ยอดใช้จ่ายสะสม
              </p>
              {/* Class range label */}
              <div className="relative flex-start-center w-708 mb-8 gap-9 mb-w-708 mb-mb-8 mb-gap-9">
                {/* Start class */}
                <span className="text-white font-gotham font-light font-size-21 uppercase mb-font-size-21 min-w-90 mb-min-w-90">
                  {progressBarData?.label_start ?? 'V MEMBER'}
                </span>
                {/* Progress bar */}
                <div className="flex-1 relative flex items-center w-468 max-w-468 mb-w-468 mb-max-w-468">
                  {/* Bar background */}
                  <div className="w-full bg-white relative overflow-hidden h-10 rounded-100 mb-h-10 mb-rounded-100 ">
                    {/* Progress indicator */}
                    <div
                      className={`h-full ${currentMembership.progressIndicatorColor}`}
                      style={{
                        width: progressBarData?.label_start === "V Platinum" ? '100%' : `${progressBarData?.percent ?? 0}%`,
                      }}
                    />
                  </div>
                  {/* Start dot */}
                  <span
                    className={`absolute left-0 w-24 h-24 mb-w-24 mb-h-24 rounded-100 mb-rounded-100 ${currentMembership.progressIndicatorColor}`}
                  ></span>
                  {/* End dot */}
                  <span
                    className={`absolute right-0 w-24 h-24 mb-w-24 mb-h-24 rounded-100 mb-rounded-100 ${progressBarData?.label_start === "V Platinum"
                      ? currentMembership.progressIndicatorColor
                      : "bg-white"
                      }`}
                  ></span>
                </div>
                <span className={`absolute text-center text-white font-light top-25 mt-22 mb-top-25 mb-mt-22 font-size-24 mb-font-size-24 ${progressBarData?.label_start === "V Platinum" ? 'left-1-2 translate-x--1-2' : 'left-1-2 translate-x--310 mb-translate-x--310'}`}>
                  <span className="font-gotham font-normal">
                    {progressBarData?.current_value ? progressBarData?.current_value.toLocaleString() : '0'}
                  </span>
                  <span className="kanit-light"> บาท</span>
                </span>
                {progressBarData?.label_start !== "V Platinum" && (
                  <span className="absolute text-center text-white font-light right-1-2 top-25 mt-22 mb-top-25 mb-mt-22 font-size-24 mb-font-size-24 translate-x-310 mb-translate-x-310">
                    <span className="font-gotham font-normal">
                      {progressBarData?.value_end ? progressBarData?.value_end.toLocaleString() : '300,000'}
                    </span>
                    <span className="kanit-light"> บาท</span>
                  </span>
                )}
                {/* End class */}
                {progressBarData?.label_start !== "V Platinum" && (
                  <span className="text-white font-gotham font-light font-size-21 uppercase mb-font-size-21">
                    {progressBarData?.label_end ?? 'V GOLD'}
                  </span>
                )}
              </div>
            </div>
          </div>
          <p className="text-center text-white font-light mt-50 mb-mt-50 font-size-21 mb-font-size-21">
            {progressBarData?.suggestion_message_line_1 ?? 'สะสมยอดใช้จ่ายให้ครบ 300,000 บาท'}
            <br />
            {progressBarData?.suggestion_message_line_2 ?? 'เพื่อรับสิทธิพิเศษ V Gold ภายใน 31/12/2025'}
          </p>
        </div>
        <div className="section-tabs relative w-full flex flex-col overflow-hidden mt--120 mb-mt--120">
          <div role="tablist" aria-label="Membership levels" className={`relative w-full h-120 flex-center-start mb-h-120 bg-white is-tab-active ${activeClassByTab[activeTab]}`}>
            <button
              onClick={() => setActiveTab('member')}
              role="tab"
              aria-selected={activeTab === 'member'}
              className={`relative flex flex-col justify-center w-192 h-full font-gotham-book font-size-22 font-normal text-center mb-w-192 mb-font-size-22 ${activeTab === 'member' ? 'text-drak-blue' : 'text-light-gray pb-24 mb-pb-24'}`}
            >
              {activeTab === 'member' && (
                <div className="flex-center w-full h-65 mb-h-65">
                  <Image src={iconMemberCard} alt="icon member card" className="w-auto h-full mx-auto" />
                </div>
              )}
              <p className={`flex-center w-full text-center ${activeTab === 'member' ? 'mt-6 mb-mt-6' : ''}`}>MEMBER</p>
            </button>
            {/* <button
              onClick={() => setActiveTab('silver')}
              role="tab"
              aria-selected={activeTab === 'silver'}
              className={`relative flex flex-col justify-center w-192 h-full font-gotham-book font-size-22 font-normal mb-w-192 mb-font-size-22 ${activeTab === 'silver' ? 'text-drak-blue' : 'text-light-gray pb-24 mb-pb-24'}`}
            >
              {activeTab === 'silver' && (
                <div className="flex-center w-full h-65 mb-h-65">
                  <Image src={iconSilverCard} alt="icon silver card" className="w-auto h-full mx-auto" />
                </div>
              )}
              <p className={`flex-center w-full text-center ${activeTab === 'silver' ? 'mt-6 mb-mt-6' : ''}`}>SILVER</p>
            </button> */}
            <button
              onClick={() => setActiveTab('gold')}
              role="tab"
              aria-selected={activeTab === 'gold'}
              className={`relative flex flex-col justify-center w-192 h-full font-gotham-book font-size-22 font-normal mb-w-192 mb-font-size-22 ${activeTab === 'gold' ? 'text-drak-blue' : 'text-light-gray pb-24 mb-pb-24'}`}
            >
              {activeTab === 'gold' && (
                <div className="flex-center w-full h-65 mb-h-65">
                  <Image src={iconGoldCard} alt="icon gold card" className="w-auto h-full mx-auto" />
                </div>
              )}
              <p className={`flex-center w-full text-center ${activeTab === 'gold' ? 'mt-6 mb-mt-6' : ''}`}>GOLD</p>
            </button>
            <button
              onClick={() => setActiveTab('platinum')}
              role="tab"
              aria-selected={activeTab === 'platinum'}
              className={`relative flex flex-col justify-center w-192 h-full font-gotham-book font-size-22 font-normal mb-w-192 mb-font-size-22 ${activeTab === 'platinum' ? 'text-drak-blue' : 'text-light-gray pb-24 mb-pb-24'}`}
            >
              {activeTab === 'platinum' && (
                <div className="flex-center w-full h-65 mb-h-65">
                  <Image src={iconPlatinumCard} alt="icon platinum card" className="w-auto h-full mx-auto" />
                </div>
              )}
              <p className={`flex-center w-full text-center ${activeTab === 'platinum' ? 'mt-6 mb-mt-6' : ''}`}>PLATINUM</p>
            </button>
          </div>
          <div className="w-full bg-white">
            <div className={`w-full min-h-825 mb-min-h-825 ${activeTab === 'member' ? '' : 'hidden'}`}></div>
            {/* <div className={`relative w-full pt-20 pb-170 pl-58 pr-58 mb-pt-20 mb-pb-170 mb-pl-58 mb-pr-58 ${activeTab === 'member' ? '' : 'hidden'}`}>
              <p className="font-kanit font-size-21 font-light text-light-gray text-center line-13 mb-font-size-21">เพียงมียอดใช้บริการ 100,000 บาท/บิล หรือ ยอดสะสม 200,000 บาท ภายใน 1 ปี เพื่อรับสิทธิพิเศษของ V Silver นาน 1 ปี</p>
              <div className="w-full flex-start-center flex-col">
                <div className="flex-start-center flex-wrap w-full">
                  <div className="w-auto h-108 mr-38 mb-h-108 mb-mr-38">
                    <Image src={iconGift1} alt="icon gift" className="w-auto h-full mx-auto" />
                  </div>
                  <div className="border-bottom-item relative flex-center-start flex-col w-504 min-h-194 mb-w-504 mb-min-h-194">
                    <h4 className="block font-kanit font-size-31 font-light text-drak-blue line-12 mb-font-size-31">โปรแกรม วิตามินผิว มูลค่า 1,500.-</h4>
                    <h4 className="block font-kanit font-size-27 font-light text-light-gray line-13 mt-5 mb-font-size-27 mb-mt-5">แลกสิทธิ์ 1 ครั้ง / ได้ทุกๆ 1 เดือน</h4>
                  </div>
                </div>
                <div className="flex-start-center flex-wrap w-full">
                  <div className="w-auto h-108 mr-38 mb-h-108 mb-mr-38">
                    <Image src={iconGift2} alt="icon gift" className="w-auto h-full mx-auto" />
                  </div>
                  <div className="border-bottom-item relative flex-center-start flex-col w-504 min-h-194 mb-w-504 mb-min-h-194">
                    <h4 className="block font-kanit font-size-31 font-light text-drak-blue line-12 mb-font-size-31">โปรแกรม Cool Yag ตำแหน่งใดก็ได้ มูลค่า 1,500.-</h4>
                    <h4 className="block font-kanit font-size-27 font-light text-light-gray line-13 mt-5 mb-font-size-27 mb-mt-5">แลกสิทธิ์ 1 ครั้ง / ได้ทุกๆ 1 เดือน</h4>
                  </div>
                </div>
                <div className="flex-start-center flex-wrap w-full">
                  <div className="w-auto h-108 mr-38 mb-h-108 mb-mr-38">
                    <Image src={iconGift3} alt="icon gift" className="w-auto h-full mx-auto" />
                  </div>
                  <div className="relative flex-center-start flex-col w-504 min-h-194 mb-w-504 mb-min-h-194">
                    <h4 className="block font-kanit font-size-31 font-light text-drak-blue line-12 mb-font-size-31">โปรแกรม HIFU Ultraformer III 80 shot มูลค่า 2,500.-</h4>
                    <h4 className="block font-kanit font-size-27 font-light text-light-gray line-13 mt-5 mb-font-size-27 mb-mt-5">แลกสิทธิ์ 1 ครั้ง / ได้ทุกๆ 3 เดือน</h4>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className={`relative w-full pt-20 pb-170 pl-58 pr-58 mb-pt-20 mb-pb-170 mb-pl-58 mb-pr-58 ${activeTab === 'silver' ? '' : 'hidden'}`}>
              <p className="font-kanit font-size-21 font-light text-light-gray text-center line-13 mb-font-size-21">เพียงมียอดใช้บริการ 100,000 บาท/บิล หรือ ยอดสะสม 200,000 บาท ภายใน 1 ปี เพื่อรับสิทธิพิเศษของ V Silver นาน 1 ปี</p>
              <div className="w-full flex-start-center flex-col">
                <div className="flex-start-center flex-wrap w-full">
                  <div className="w-auto h-108 mr-38 mb-h-108 mb-mr-38">
                    <Image src={iconGift1} alt="icon gift" className="w-auto h-full mx-auto" />
                  </div>
                  <div className="border-bottom-item relative flex-center-start flex-col w-504 min-h-194 mb-w-504 mb-min-h-194">
                    <h4 className="block font-kanit font-size-31 font-light text-drak-blue line-12 mb-font-size-31">โปรแกรม วิตามินผิว มูลค่า 1,500.-</h4>
                    <h4 className="block font-kanit font-size-27 font-light text-light-gray line-13 mt-5 mb-font-size-27 mb-mt-5">แลกสิทธิ์ 1 ครั้ง / ได้ทุกๆ 1 เดือน</h4>
                  </div>
                </div>
                <div className="flex-start-center flex-wrap w-full">
                  <div className="w-auto h-108 mr-38 mb-h-108 mb-mr-38">
                    <Image src={iconGift2} alt="icon gift" className="w-auto h-full mx-auto" />
                  </div>
                  <div className="border-bottom-item relative flex-center-start flex-col w-504 min-h-194 mb-w-504 mb-min-h-194">
                    <h4 className="block font-kanit font-size-31 font-light text-drak-blue line-12 mb-font-size-31">โปรแกรม Cool Yag ตำแหน่งใดก็ได้ มูลค่า 1,500.-</h4>
                    <h4 className="block font-kanit font-size-27 font-light text-light-gray line-13 mt-5 mb-font-size-27 mb-mt-5">แลกสิทธิ์ 1 ครั้ง / ได้ทุกๆ 1 เดือน</h4>
                  </div>
                </div>
                <div className="flex-start-center flex-wrap w-full">
                  <div className="w-auto h-108 mr-38 mb-h-108 mb-mr-38">
                    <Image src={iconGift3} alt="icon gift" className="w-auto h-full mx-auto" />
                  </div>
                  <div className="relative flex-center-start flex-col w-504 min-h-194 mb-w-504 mb-min-h-194">
                    <h4 className="block font-kanit font-size-31 font-light text-drak-blue line-12 mb-font-size-31">โปรแกรม HIFU Ultraformer III 80 shot มูลค่า 2,500.-</h4>
                    <h4 className="block font-kanit font-size-27 font-light text-light-gray line-13 mt-5 mb-font-size-27 mb-mt-5">แลกสิทธิ์ 1 ครั้ง / ได้ทุกๆ 3 เดือน</h4>
                  </div>
                </div>
              </div>
            </div> */}
            <div className={`relative w-full pt-20 pb-170 pl-58 pr-58 mb-pt-20 mb-pb-170 mb-pl-58 mb-pr-58 ${activeTab === 'gold' ? '' : 'hidden'}`}>
              <p className="font-kanit font-size-21 font-light text-light-gray text-center line-13 pl-22 pr-22 mb-font-size-21 mb-pl-22 mb-pr-22">เพียงมียอดใช้บริการ 150,000 บาท/บิล หรือ ยอดสะสม 300,000 บาท ภายใน 1 ปี เพื่อรับสิทธิพิเศษของ V Gold นาน 1 ปี</p>
              <div className="w-full flex-start-center flex-col">
                <div className="flex-start-center flex-wrap w-full">
                  <div className="w-auto h-108 mr-38 mb-h-108 mb-mr-38">
                    <Image src={iconGift1} alt="icon gift" className="w-auto h-full mx-auto" />
                  </div>
                  <div className="border-bottom-item relative flex-center-start flex-col w-504 min-h-194 mb-w-504 mb-min-h-194">
                    <h4 className="block font-kanit font-size-31 font-light text-drak-blue line-12 mb-font-size-31">โปรแกรม วิตามินผิว มูลค่า 2,500.-</h4>
                    <h4 className="block font-kanit font-size-27 font-light text-light-gray line-13 mt-5 mb-font-size-27 mb-mt-5">แลกสิทธิ์ 1 ครั้ง / ได้ทุกๆ 1 เดือน</h4>
                  </div>
                </div>
                <div className="flex-start-center flex-wrap w-full">
                  <div className="w-auto h-108 mr-38 mb-h-108 mb-mr-38">
                    <Image src={iconGift2} alt="icon gift" className="w-auto h-full mx-auto" />
                  </div>
                  <div className="border-bottom-item relative flex-center-start flex-col w-504 min-h-194 mb-w-504 mb-min-h-194">
                    <h4 className="block font-kanit font-size-31 font-light text-drak-blue line-12 mb-font-size-31">โปรแกรม Cool Yag ตำแหน่งใดก็ได้ มูลค่า 2,500.-</h4>
                    <h4 className="block font-kanit font-size-27 font-light text-light-gray line-13 mt-5 mb-font-size-27 mb-mt-5">แลกสิทธิ์ 1 ครั้ง / ได้ทุกๆ 1 เดือน</h4>
                  </div>
                </div>
                <div className="flex-start-center flex-wrap w-full">
                  <div className="w-auto h-108 mr-38 mb-h-108 mb-mr-38">
                    <Image src={iconGift3} alt="icon gift" className="w-auto h-full mx-auto" />
                  </div>
                  <div className="relative flex-center-start flex-col w-504 min-h-194 mb-w-504 mb-min-h-194">
                    <h4 className="block font-kanit font-size-31 font-light text-drak-blue line-12 mb-font-size-31">โปรแกรม HIFU Ultraformer III 200 shot มูลค่า 6,999.-</h4>
                    <h4 className="block font-kanit font-size-27 font-light text-light-gray line-13 mt-5 mb-font-size-27 mb-mt-5">แลกสิทธิ์ 1 ครั้ง / ได้ทุกๆ 3 เดือน</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className={`relative w-full pt-20 pb-170 pl-58 pr-58 mb-pt-20 mb-pb-170 mb-pl-58 mb-pr-58 ${activeTab === 'platinum' ? '' : 'hidden'}`}>
              <p className="font-kanit font-size-21 font-light text-light-gray text-center line-13 pl-22 pr-22 mb-font-size-21 mb-pl-22 mb-pr-22">เพียงมียอดใช้บริการ 250,000 บาท/บิล หรือ ยอดสะสม 500,000 บาท ภายใน 1 ปี เพื่อรับสิทธิพิเศษของ V Platinum นาน 1 ปี</p>
              <div className="w-full flex-start-center flex-col">
                <div className="flex-start-center flex-wrap w-full">
                  <div className="w-auto h-108 mr-38 mb-h-108 mb-mr-38">
                    <Image src={iconGift1} alt="icon gift" className="w-auto h-full mx-auto" />
                  </div>
                  <div className="border-bottom-item relative flex-center-start flex-col w-504 min-h-194 mb-w-504 mb-min-h-194">
                    <h4 className="block font-kanit font-size-31 font-light text-drak-blue line-12 mb-font-size-31">โปรแกรม วิตามินผิว มูลค่า 4,500.-</h4>
                    <h4 className="block font-kanit font-size-27 font-light text-light-gray line-13 mt-5 mb-font-size-27 mb-mt-5">แลกสิทธิ์ 1 ครั้ง / ได้ทุกๆ 1 เดือน</h4>
                  </div>
                </div>
                <div className="flex-start-center flex-wrap w-full">
                  <div className="w-auto h-108 mr-38 mb-h-108 mb-mr-38">
                    <Image src={iconGift2} alt="icon gift" className="w-auto h-full mx-auto" />
                  </div>
                  <div className="border-bottom-item relative flex-center-start flex-col w-504 min-h-194 mb-w-504 mb-min-h-194">
                    <h4 className="block font-kanit font-size-31 font-light text-drak-blue line-12 mb-font-size-31">โปรแกรม Cool Yag ตำแหน่งใดก็ได้ มูลค่า 4,500.-</h4>
                    <h4 className="block font-kanit font-size-27 font-light text-light-gray line-13 mt-5 mb-font-size-27 mb-mt-5">แลกสิทธิ์ 1 ครั้ง / ได้ทุกๆ 1 เดือน</h4>
                  </div>
                </div>
                <div className="flex-start-center flex-wrap w-full">
                  <div className="w-auto h-108 mr-38 mb-h-108 mb-mr-38">
                    <Image src={iconGift3} alt="icon gift" className="w-auto h-full mx-auto" />
                  </div>
                  <div className="relative flex-center-start flex-col w-504 min-h-194 mb-w-504 mb-min-h-194">
                    <h4 className="block font-kanit font-size-31 font-light text-drak-blue line-12 mb-font-size-31">โปรแกรม HIFU Ultraformer III 400 shot มูลค่า 11,000.-</h4>
                    <h4 className="block font-kanit font-size-27 font-light text-light-gray line-13 mt-5 mb-font-size-27 mb-mt-5">แลกสิทธิ์ 1 ครั้ง / ได้ทุกๆ 3 เดือน</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-1-2 translate-x--1-2 z-99 pb-45 mb-pb-45">
        <div className="shadow-footer-item shadow-footer-container bg-white flex-center mx-auto h-129 rounded-80 gap-35 pl-20 pr-20 mb-h-129 mb-rounded-80 mb-gap-35 mb-pl-20 mb-pr-20">
          <Link href="/" className={`w-130 h-145 rounded-circle cursor-pointer relative flex-center flex-col transition-all duration-200 mb-w-130 mb-h-145`}>
            <Image
              src={iconHomeActive}
              alt=""
              className={`w-59 h-61 mb-w-59 mb-h-61 brightness-300 opacity-1`}
            />
            <span className={`font-size-17 mt-3 mb-font-size-17 mb-mt-3 text-footer-active opacity-1 whitespace-pre-line text-center line-12`}>
              หน้าแรก
            </span>
          </Link>
          {/* <Link href="/course" className={`w-130 h-145 rounded-circle cursor-pointer relative flex-center flex-col transition-all duration-200 mb-w-130 mb-h-145`}>
            <Image
              src={iconCourse}
              alt=""
              className={`w-59 h-61 mb-w-59 mb-h-61 opacity-04`}
            />
            <span className={`font-size-17 mt-3 mb-font-size-17 mb-mt-3 opacity-04 text-darkblue whitespace-pre-line text-center line-12`}>
              คอร์สที่ค้าง
            </span>
            {badgeCountsData?.course !== null && badgeCountsData?.course !== undefined && badgeCountsData?.course > 0 && badgeCountsData?.course !== "0" && (
              <div className="absolute flex-center bg-alert text-white rounded-circle font-gotham font-normal z-2 top-32 right-25 mb-top-32 mb-right-25 w-28 h-28 mb-w-28 mb-h-28 font-size-18 mb-font-size-18">
                {Number(badgeCountsData?.course)}
              </div>
            )}
          </Link> */}
          <Link href="/gift" className={`w-130 h-145 rounded-circle cursor-pointer relative flex-center flex-col transition-all duration-200 mb-w-130 mb-h-145`}>
            <Image
              src={iconGift}
              alt=""
              className={`w-59 h-61 mb-w-59 mb-h-61 opacity-04`}
            />
            <span className={`font-size-17 mt-3 mb-font-size-17 mb-mt-3 opacity-04 text-darkblue whitespace-pre-line text-center line-12`}>
              หัตถการฟรี
            </span>
            {badgeCountsData?.gift !== null && badgeCountsData?.gift !== undefined && badgeCountsData?.gift > 0 && badgeCountsData?.gift !== "0" && (
              <div className="absolute flex-center bg-alert text-white rounded-circle font-gotham font-normal z-2 top-32 right-25 mb-top-32 mb-right-25 w-28 h-28 mb-w-28 mb-h-28 font-size-18 mb-font-size-18">
                {Number(badgeCountsData?.gift)}
              </div>
            )}
          </Link>
          <Link href="/appointment" className={`w-130 h-145 rounded-circle cursor-pointer relative flex-center flex-col transition-all duration-200 mb-w-130 mb-h-145`}>
            <Image
              src={iconAppointment}
              alt=""
              className={`w-59 h-61 mb-w-59 mb-h-61 opacity-04`}
            />
            <span className={`font-size-17 mt-3 mb-font-size-17 mb-mt-3 opacity-04 text-darkblue whitespace-pre-line text-center line-12`}>
              นัดหมาย
            </span>
            {badgeCountsData?.appointment !== null && badgeCountsData?.appointment !== undefined && badgeCountsData?.appointment > 0 && badgeCountsData?.appointment !== "0" && (
              <div className="absolute flex-center bg-alert text-white rounded-circle font-gotham font-normal z-2 top-32 right-25 mb-top-32 mb-right-25 w-28 h-28 mb-w-28 mb-h-28 font-size-18 mb-font-size-18">
                {Number(badgeCountsData?.appointment)}
              </div>
            )}
          </Link>
        </div>
      </footer>

    </div>
  );
}
