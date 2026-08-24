"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import "@/assets/css/pxtovw.css";
import "@/assets/css/course.css";
import "@/assets/css/titlepage.css";
import vitamin from "@/assets/images/course/img-vitamin.png";
import coolyag from "@/assets/images/course/img-coolyag.png";
import hifu from "@/assets/images/course/img-hifu.png";
import gfg from "@/assets/images/course/fgf.png";
import iconvsq from "@/assets/images/course/img-vsq.png";
import bgBlue from "@/assets/images/course/bg-blue.png";
import bgGold from "@/assets/images/course/bg-gold.png";
import bgPlatinum from "@/assets/images/course/bg-patinum.png";
import Titlepage from "@/components/titlepage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import iconLocked from "@/assets/images/course/icon-locked.png";
import iconLockedXl from "@/assets/images/course/icon-locked-xl.png";
import redemptLocked from "@/assets/images/course/redempt-locked.png";
import icontitle from "@/assets/images/course/icon-title.png"

import iconHome from "@/assets/images/home/icon-home.png";
import iconCourse from "@/assets/images/home/icon-course.png";
import iconGift from "@/assets/images/home/icon-gift.png";
import iconAppointment from "@/assets/images/home/icon-appointment.png";
import iconHomeActive from "@/assets/images/home/icon-home-active.png";
import iconCourseActive from "@/assets/images/home/icon-course-active.png";
import iconGiftActive from "@/assets/images/home/icon-gift-active.png";
import iconAppointmentActive from "@/assets/images/home/icon-appointment-active.png";

import { useAuth } from "@/contexts/AuthContext";
import { liffService } from "@/lib/liff";

export default function CoursePage() {
  return (
    <>
      <Header />
      <CourseContent />
      {/* <Footer /> */}
    </>
  );
}

const CourseContent = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [progressBarData, setProgressBarData] = useState(null);
  const [memberLevelPeriodData, setMemberLevelPeriodData] = useState(null);
  const [badgeCountsData, setBadgeCountsData] = useState(null);
  const [giftData, setGiftData] = useState<any>(null);
  const [vipData, setVipData] = useState<any>(null);
  const [servicesData, setServicesData] = useState<any>(null);
  const [membershipScore, setMembershipScore] = useState<number>(null);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState("radio-1");
  const [OpenFilter, setOpenFilter] = useState(false);
  const openFilterRef = useRef(null);

  const router = useRouter();

  const fetchData = useCallback(async (user: any) => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    try {
      const accessToken = await liffService.getAccessToken();
      const res = await fetch("/api/gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken }),
      });
      const response = await res.json();
      const result = response.result;
      const resultData = result.data;
      setGiftData(resultData);
    } catch (error: any) {
      console.error(error?.message || error);
    } finally {
    }

    try {
      const res = await fetch("/api/vip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Hn: user?.hn }),
      });
      const response = await res.json();
      const result = response.result;
      setVipData(result);
    } catch (error: any) {
      console.error(error?.message || error);
    } finally {
    }

    try {
      const res = await fetch("/api/vip/gift", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const response = await res.json();
      const result = response.result;
      setServicesData(result);
    } catch (error: any) {
      console.error(error?.message || error);
    } finally {
    }

    setLoading(false);
  }, [isLoading]);

  useEffect(() => {
    setUserData(user);
    let score = 0;
    if (user?.memberLevelName === "V Gold") {
      setMembershipScore(300000);
      score = 300000;
    } else if (user?.memberLevelName === "V Platinum") {
      setMembershipScore(500000);
      score = 500000;
    } else {
      setMembershipScore(0);
      score = 0;
    }
    fetchData(user);
    const progressBarRes = user?.progressBar;
    setProgressBarData(progressBarRes);
    const memberLevelPeriodData = user?.memberLevelPeriod;
    setMemberLevelPeriodData(memberLevelPeriodData);
    const badgeCountsData = user?.badgeCounts;
    setBadgeCountsData(badgeCountsData);
  }, [user, isAuthenticated, isLoading, router, fetchData]);

  const addMonthsNoSkipUTC = (isoString, monthsToAdd) => {
    const base = new Date(isoString);
    const baseYear = base.getUTCFullYear();
    const baseMonth = base.getUTCMonth();
    const baseDay = base.getUTCDate();

    const targetMonthIndex = baseMonth + monthsToAdd;
    const targetYear = baseYear + Math.floor(targetMonthIndex / 12);
    const normalizedTargetMonth = ((targetMonthIndex % 12) + 12) % 12;

    const daysInTargetMonth = new Date(Date.UTC(targetYear, normalizedTargetMonth + 1, 0)).getUTCDate();
    const targetDay = baseDay <= daysInTargetMonth ? baseDay : baseDay - daysInTargetMonth;

    return new Date(Date.UTC(targetYear, normalizedTargetMonth, targetDay)).toISOString();
  };

  const redemptionData = Array.isArray(vipData?.redemption) && vipData.redemption.length > 0
    ? vipData.redemption.flatMap(item => 
      Array.from({ length: item.period }, (_, index) => {
        const { period, ...rest } = item;
        const usedAtISO = addMonthsNoSkipUTC(rest.usedAt, index);
        const d = new Date(usedAtISO);
        const currentYear = new Date().getFullYear();
        if (d.getFullYear() === currentYear) {
          return {
            ...rest,
            dateRedeem: item.dateRedeem,
            usedAt: usedAtISO
          };
        }
        return null;
      })
    ).filter(item => item !== null) : [];

  const months = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];

  const handleClick = () => {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const handleClick2 = () => {
    if (dropdown2) {
      setDropdown2(false);
    } else {
      setDropdown2(true);
    }
  };

  const getBgImage = (score) => {
    if (score >= 0 && score <= 100000) {
      return bgBlue.src;
    } else if (score >= 100001 && score <= 300000) {
      return bgGold.src;
    } else if (score >= 300001 && score <= 500000) {
      return bgPlatinum.src;
    } else {
      return ""; // กรณีคะแนนนอกเหนือเงื่อนไข
    }
  };

  const getTextColor = (score) => {
    if (score >= 0 && score <= 100000) {
      return "#2d4c9d"; // สีขาวสำหรับพื้นหลังสีน้ำเงิน
    } else if (score >= 100001 && score <= 300000) {
      return "#644D3D"; // สีดำสำหรับพื้นหลังสีทอง
    } else if (score >= 300001 && score <= 500000) {
      return "#ffffff"; // สีขาวสำหรับพื้นหลังสีแพลทินัม
    } else {
      return "#2d4c9d"; // สีดำเป็นค่าเริ่มต้น
    }
  };

  // ตั้งค่า CSS custom property สำหรับพื้นหลังและสีตัวอักษรตามคะแนนสมาชิก
  React.useEffect(() => {
    if (membershipScore !== null) {
      document.documentElement.style.setProperty('--btn-dropdown-bg', `url(${getBgImage(membershipScore)})`);
      document.documentElement.style.setProperty('--btn-dropdown-text-color', getTextColor(membershipScore));
    }
  }, [membershipScore]);

  const formatDateTh = (dateStr: string | null | undefined) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    try {
      return new Intl.DateTimeFormat('th-TH', {
        year: '2-digit',
        month: 'short',
        day: '2-digit'
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  const isExpired = (dateStr: string | null | undefined) => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  const handleRadioChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const sortedGiftData = useMemo(() => {
    if (!Array.isArray(giftData)) return [];
    const dataCopy = [...giftData];
    dataCopy.sort((a, b) => {
      const aDate = a?.expiration_date ? new Date(a.expiration_date).getTime() : 0;
      const bDate = b?.expiration_date ? new Date(b.expiration_date).getTime() : 0;
      if (selectedFilter === "radio-2") {
        // วันที่เก่าสุด: เรียงจากน้อยไปมาก
        return aDate - bDate;
      }
      // วันที่ล่าสุด: เรียงจากมากไปน้อย (ค่าเริ่มต้น radio-1)
      return bDate - aDate;
    });
    return dataCopy;
  }, [giftData, selectedFilter]);

  const handleClickTitle = (event) => {
    if (OpenFilter) {
      setOpenFilter(false);
    } else {
      setOpenFilter(true);
    }
  };

  // เพิ่ม useEffect เพื่อจัดการการคลิกภายนอก Redem Modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (openFilterRef.current && !openFilterRef.current.contains(event.target) && OpenFilter) {
        setOpenFilter(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [OpenFilter]);

  if (isLoading || !userData || loading) {
    return (
      <main className="section-course w-full overflow-hidden">
        <div className="section-course-bg h-100dvh">
          <div className="title relative flex">
            <div className="flex relative w-full">
              <div className="flex relative w-full justify-between items-baseline">
                <h2 className="section-text-headline font-size-50 font-light text-drakble mt-85 pl-48 mb-font-size-50 mb-mt-85 mb-pl-48">
                  สิทธิพิเศษ
                </h2>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="section-course w-full overflow-hidden">
      <div className="section-course-bg">
        {/* <Titlepage title={"สิทธิพิเศษ"} /> */}
        <div className="title relative flex">
          <div className="flex relative w-full">
            <div className="flex relative w-full justify-between items-baseline">
              <h2 className="section-text-headline font-size-50 font-light text-drakble mt-85 pl-48 mb-font-size-50 mb-mt-85 mb-pl-48">
                สิทธิพิเศษ
              </h2>
              <div className="icon-title pr-49 mb-pr-49">
              <button className={`btn-filter ${ OpenFilter ? "filter-open" : "" }`} onClick={(event) => handleClickTitle(event)}>
                <Image src={icontitle} alt="icontitle" width={34} height={25} data-target="redem-1" className="icon-img w-34 h-25 mb-w-34 mb-h-25" />
              </button>
              </div>
            </div>
          </div>

          <div ref={openFilterRef} id="redem-1" className={`redem-modal ${ OpenFilter ? "is-open" : "" }`}>
            <div className="redem-modal-content">
              <div className="sort-by-date">
                <div className="line-date"></div>
                <h3 className="font-size-43 font-light text-darkblue pt-15 hidden mb-font-size-43 mb-pt-15">เรียงตาม</h3>
              </div>
              <div className="check-day">
                <div className="radio">
                  <input id="radio-1" className="radio" type="radio" value="radio-1" checked={selectedFilter === "radio-1"} onChange={handleRadioChange} />
                  <label htmlFor="radio-1" className="radio-label font-size-43 font-light text-darkblue mb-font-size-43">วันที่ล่าสุด</label>
                </div>

                <div className="radio">
                  <input id="radio-2" className="radio" type="radio" value="radio-2" checked={selectedFilter === "radio-2"} onChange={handleRadioChange} />
                  <label htmlFor="radio-2" className="radio-label font-size-43 font-light text-darkblue mb-font-size-43">วันที่เก่าสุด</label>
                </div>
              </div>

            </div>
          </div>
        </div>

        <section className="dropdown-menu-vip-hed relative w-768 mb-w-768 flex">
          <div className="container w-full mb-w-full">
            <div className="dropdown">
              {userData?.memberLevelName !== "V Member" && (
              <button
                className={`btn-dropdown font-size-38 mb-font-size-38 font-light ${user?.memberLevelName === "V Platinum" ? "text-white" : "text-drakble"} ${dropdown ? "active" : ""}`}
                type="button"
                onClick={handleClick}
              >
                สิทธิพิเศษ <span className="text-vip">VIP</span>
              </button>
              )}
              {dropdown && userData?.memberLevelName !== "V Member" && (
                <div className="dropdown-vip-list w-670 mb-w-670 h-1000 mb-h-1000">
                  <p className="redeem-text font-size-30 mb-font-size-30 font-light mt-45 mb-mt-45 ml-20 mb-ml-20">
                    แลกรับบริการฟรี
                  </p>
                  <div className="all-service-item flex-center-start gap-9 mb-gap-9 mt-20 mb-mt-20">
                  {servicesData?.filter((service) => service?.className === userData?.memberLevelName).map((service) => (
                    <div key={service._id} className="all-service-item-wrapper">
                      <div
                        className="all-service-img w-full mb-w-full h-full mb-h-full z-1 rounded-21 mb-rounded-21"
                        style={{
                          backgroundImage: `url(https://vipvsq.vsquareclinic.com${service.image})`,
                          backgroundSize: "100% auto",
                          height: "100%",
                        }}
                      ></div>
                      <div className="all-service-detail">
                        <div className="all-service-headline">
                          <span className="all-service-subtext font-size-11 mb-font-size-11">
                            {service.type}
                          </span>
                          <h6 className="all-service-title font-size-18 mb-font-size-18 font-normal line-12 mb-line-12">
                            {service.name} {service.priceText}
                          </h6>
                        </div>
                        <div className="all-service-btn-wrapper">
                          <div className="all-service-btn font-size-13 mb-font-size-13 font-normal">
                            {service.terms}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>

                  <div className="flex-start-start flex-col w-full mb-w-full mt-40 mb-mt-40">
                    <p className="redeem-text font-size-30 mb-font-size-30 font-light mt-35 mb-mt-35 ml-20 mb-ml-20">
                      ประวัติการแลกสิทธิพิเศษ
                    </p>
                    <div className="flex-start-center flex-col mt-25 mb-mt-25">
                      <div className="shadow-item w-630 mb-w-630 mx-auto rounded-16 pt-32 pb-32 pl-20 pr-20 mb-rounded-16 mb-pt-32 mb-pb-32 mb-pl-20 mb-pr-20">
                        <div className="grid grid-cols-6 gap-28 mb-gap-28">
                          {/* <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              ม.ค.
                            </p>
                            <button
                              data-target="redem-1"
                              className="icon-redemption active w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"
                            ></button>
                          </div> */}
                          {months.map((month, index) => {
                            const isActive = redemptionData.some(redem => {
                              const monthRedeemUsedAt = new Date(redem.usedAt).getMonth() + 1;
                              const yearRedeemUsedAt = new Date(redem.usedAt).getFullYear();
                              const currentYear = new Date().getFullYear();
                              // console.log("monthRedeemUsedAt: " + monthRedeemUsedAt);
                              return monthRedeemUsedAt === index + 1 && yearRedeemUsedAt === currentYear;
                            });
                            const numberMonth = index + 1;
                            // console.log(index + 1 + ": " + isActive);
                            return (
                              <div className="flex-start-center flex-col" key={month}>
                                <p className="font-size-30 color-theme font-light mb-font-size-30">
                                  {month}
                                </p>
                                {isActive ? (
                                  <button 
                                    data-target={`redem-${numberMonth}`} 
                                    className="icon-redemption active w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"
                                  ></button>
                                ) : (
                                  <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                                )}
                              </div>
                            );
                          })}
                          {/* <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              ม.ค.
                            </p>
                            <button
                              data-target="redem-1"
                              className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"
                            ></button>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              ก.พ.
                            </p>
                            <button
                              data-target="redem-2"
                              className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"
                            ></button>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              มี.ค.
                            </p>
                            <button
                              data-target="redem-3"
                              className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"
                            ></button>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              เม.ย.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              พ.ค.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              มิ.ย.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              ก.ค.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              ส.ค.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              ก.ย.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              ต.ค.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              พ.ย.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div>
                          <div className="flex-start-center flex-col">
                            <p className="font-size-30 color-theme font-light mb-font-size-30">
                              ธ.ค.
                            </p>
                            <div className="icon-redemption w-87 h-87 border-w-2 mb-w-87 mb-h-87 mb-border-w-2"></div>
                          </div> */}
                        </div>
                      </div>

                      <div className="flex-center-start w-full mt-16 mb-mt-16">
                        <div className="flex flex-col">
                          <div className="flex-start-center">
                            <div className="icon-redemption w-42 h-42 border-w-1 mb-w-42 mb-h-42"></div>
                            <p className="font-size-26 color-theme font-light line-1 ml-24 mb-font-size-26 mb-ml-24">
                              สิทธิ์คงเหลือสำหรับแลกรับบริการ
                            </p>
                          </div>
                          <div className="flex-start-center mt-5 mb-mt-5">
                            <div className="icon-redemption active w-42 h-42 border-w-1 mb-w-42 mb-h-42"></div>
                            <p className="font-size-26 color-theme font-light line-1 ml-24 mb-font-size-26 mb-ml-24">
                              แลกสิทธิ์สำเร็จแล้ว
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {userData?.memberLevelName === "V Member" ? (
                <button
                  className={`btn-dropdown bg-gold font-size-38 mb-font-size-38 font-light text-drakble ${dropdown2 ? "active" : ""}`}
                  type="button"
                  onClick={handleClick2}
                >
                  สิทธิพิเศษ <span className="text-vip">VIP</span>
                  <Image src={iconLocked} alt="icon-locked" className="w-22 h-27 ml-16 mb-w-22 mb-h-27 mb-ml-16" style={{filter: "brightness(0) saturate(100%) invert(20%) sepia(73%) saturate(1513%) hue-rotate(207deg) brightness(102%) contrast(89%)"}} />
                </button>
              ) : userData?.memberLevelName === "V Gold" ? (
                <button
                  className={`btn-dropdown bg-platinum font-size-38 mb-font-size-38 font-light text-white ${dropdown2 ? "active" : ""}`}
                  type="button"
                  onClick={handleClick2}
                >
                  สิทธิพิเศษ <span className="text-vip">VIP</span>
                  <Image src={iconLocked} alt="icon-locked" className="w-22 h-27 ml-16 mb-w-22 mb-h-27 mb-ml-16" />
                </button>
              ) : null}

              {dropdown2 && userData?.memberLevelName === "V Member" ? (
                <div className="dropdown-vip-list dropdown-disable w-670 mb-w-670 pb-67 mb-pb-67">
                  <div className="absolute top-0 left-0 w-full h-full flex-center flex-col bg-black-opacity z-99">
                    <Image src={iconLockedXl} alt="icon-locked" className="w-110 h-137 mb-w-110 mb-h-137" />
                    <p className="font-kanit font-light font-size-24 text-white line-13 text-center mt-22 mb-font-size-24 mb-mt-22">
                      ปลดล็อกระดับ GOLD MEMBER<br />
                      เพื่อรับสิทธิพิเศษ VIP
                    </p>
                  </div>
                  <p className="redeem-text font-size-30 mb-font-size-30 font-light mt-45 mb-mt-45 ml-20 mb-ml-20">
                    แลกรับบริการฟรี
                  </p>
                  <div className="all-service-item flex-center-start gap-9 mb-gap-9 mt-20 mb-mt-20">
                  {servicesData?.filter((service) => service?.className === "V Gold").map((service) => (
                    <div key={service._id} className="all-service-item-wrapper">
                      <div
                        className="all-service-img w-full mb-w-full h-full mb-h-full z-1 rounded-21 mb-rounded-21"
                        style={{
                          backgroundImage: `url(https://vipvsq.vsquareclinic.com${service.image})`,
                          backgroundSize: "100% auto",
                          height: "100%",
                        }}
                      ></div>
                      <div className="all-service-detail">
                        <div className="all-service-headline">
                          <span className="all-service-subtext font-size-11 mb-font-size-11">
                            {service.type}
                          </span>
                          <h6 className="all-service-title font-size-18 mb-font-size-18 font-normal line-12 mb-line-12">
                            {service.name} {service.priceText}
                          </h6>
                        </div>
                        <div className="all-service-btn-wrapper">
                          <div className="all-service-btn font-size-13 mb-font-size-13 font-normal">
                            {service.terms}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              ) : dropdown2 && userData?.memberLevelName === "V Gold" ? (
                <div className="dropdown-vip-list dropdown-disable w-670 mb-w-670 pb-67 mb-pb-67">
                  <div className="absolute top-0 left-0 w-full h-full flex-center flex-col bg-black-opacity z-99">
                    <Image src={iconLockedXl} alt="icon-locked" className="w-110 h-137 mb-w-110 mb-h-137" />
                    <p className="font-kanit font-light font-size-24 text-white line-13 text-center mt-22 mb-font-size-24 mb-mt-22">
                      ปลดล็อกระดับ PLATINUM MEMBER<br />
                      เพื่อรับสิทธิพิเศษ VIP
                    </p>
                  </div>
                  <p className="redeem-text font-size-30 mb-font-size-30 font-light mt-45 mb-mt-45 ml-20 mb-ml-20">
                    แลกรับบริการฟรี
                  </p>
                  <div className="all-service-item flex-center-start gap-9 mb-gap-9 mt-20 mb-mt-20">
                  {servicesData?.filter((service) => service?.className === "V Platinum").map((service) => (
                    <div key={service._id} className="all-service-item-wrapper">
                      <div
                        className="all-service-img w-full mb-w-full h-full mb-h-full z-1 rounded-21 mb-rounded-21"
                        style={{
                          backgroundImage: `url(https://vipvsq.vsquareclinic.com${service.image})`,
                          backgroundSize: "100% auto",
                          height: "100%",
                        }}
                      ></div>
                      <div className="all-service-detail">
                        <div className="all-service-headline">
                          <span className="all-service-subtext font-size-11 mb-font-size-11">
                            {service.type}
                          </span>
                          <h6 className="all-service-title font-size-18 mb-font-size-18 font-normal line-12 mb-line-12">
                            {service.name} {service.priceText}
                          </h6>
                        </div>
                        <div className="all-service-btn-wrapper">
                          <div className="all-service-btn font-size-13 mb-font-size-13 font-normal">
                            {service.terms}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              ) : null}
              {/* {dropdown2 && userData?.memberLevelName === "V Member" && (
                <div className="dropdown-vip-list w-670 mb-w-670 h-1000 mb-h-1000">
                  <p className="redeem-text font-size-30 mb-font-size-30 font-light mt-45 mb-mt-45 ml-20 mb-ml-20">
                    แลกรับบริการฟรี
                  </p>
                  <div className="all-service-item flex-center-start gap-9 mb-gap-9 mt-20 mb-mt-20">
                  {servicesData?.filter((service) => service?.className === "V Gold").map((service) => (
                    <div key={service._id} className="all-service-item-wrapper">
                      <div
                        className="all-service-img w-full mb-w-full h-full mb-h-full z-1 rounded-21 mb-rounded-21"
                        style={{
                          backgroundImage: `url(https://vipvsq.vsquareclinic.com${service.image})`,
                          backgroundSize: "100% auto",
                          height: "100%",
                        }}
                      ></div>
                      <div className="all-service-detail">
                        <div className="all-service-headline">
                          <span className="all-service-subtext font-size-11 mb-font-size-11">
                            {service.type}
                          </span>
                          <h6 className="all-service-title font-size-18 mb-font-size-18 font-normal line-12 mb-line-12">
                            {service.name} {service.priceText}
                          </h6>
                        </div>
                        <div className="all-service-btn-wrapper">
                          <div className="all-service-btn font-size-13 mb-font-size-13 font-normal">
                            {service.terms}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              )} */}
              {/* {userData?.memberLevelName === "V Member" && (
                <button
                  className={`btn-dropdown bg-gold font-size-38 mb-font-size-38 font-light text-drakble ${dropdown2 ? "active" : ""}`}
                  type="button"
                  onClick={handleClick2}
                >
                  สิทธิพิเศษ <span className="text-vip">VIP</span>
                  <Image src={iconLocked} alt="icon-locked" className="w-22 h-27 ml-16 mb-w-22 mb-h-27 mb-ml-16" style={{filter: "brightness(0) saturate(100%) invert(20%) sepia(73%) saturate(1513%) hue-rotate(207deg) brightness(102%) contrast(89%)"}} />
                </button>
              )}
              {userData?.memberLevelName === "V Gold" && (
                <button
                  className={`btn-dropdown bg-platinum font-size-38 mb-font-size-38 font-light text-drakble ${dropdown2 ? "active" : ""}`}
                  type="button"
                  onClick={handleClick2}
                >
                  สิทธิพิเศษ <span className="text-vip">VIP</span>
                  <Image src={iconLocked} alt="icon-locked" className="w-22 h-27 ml-16 mb-w-22 mb-h-27 mb-ml-16" />
                </button>
              )} */}
              {/* {dropdown2 && (
                <div className="dropdown-vip-list w-669 mb-w-669 h-408 mb-h-408">
                  <Image
                    src={redemptLocked}
                    alt="icon-locked"
                    quality={100}
                    sizes="(min-width: 1024px) 512px, 100vw"
                    className="w-full h-full"
                  />
                </div>
              )} */}
            </div>
          </div>
        </section>

        <div className="section-course-expire">
          <h1 className="head-course-expire font-size-45 font-light pl-54 text-drakblue mb-font-size-45 mb-pl-54">
            ของสมนาคุณพิเศษ
          </h1>
          <div className="flex flex-col gap-30 items-center min-h-800 mb-gap-30 mb-min-h-800">
            {/* <div className="font-size-28 font-light text-gray mt-150 mb-font-size-28 mb-mt-150">ไม่พบข้อมูลของสมนาคุณพิเศษ</div> */}
            <div className="section-lits-course-expire flex-center flex-wrap relative top-13 gap-28 mb-gap-28">
              {Array.isArray(sortedGiftData) && sortedGiftData.length > 0 ? (
                sortedGiftData.map((item: any) => {
                  const purchase = formatDateTh(item?.received_date);
                  const expire = formatDateTh(item?.expiration_date);
                  return (
                    <div key={item?.id} className="course-list-info relative overflow-hidden flex w-675 h-186 rounded-32 items-center gap-20 pd-0 mb-w-675 mb-h-186 mb-rounded-32 mb-gap-20">
                      <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28 mb-ml-5">
                        <Image src={iconvsq} alt="" className="w-full h-auto" />
                      </div>
                      <div className="text-activity text-start w-330 h-178 mb-w-330 mb-h-178">
                        <h3 className="text-drakblue font-size-28 font-medium line-14 pt-20 mb-font-size-28 mb-line-14 mb-pt-20">
                          {item?.title}
                        </h3>
                      </div>
                      <div className="date-text">
                        <p className={`text-date-1 relative inline-block z-1 font-normal font-size-23 pr-0 mb-font-size-23 mb-pr-0 ${isExpired(item?.expiration_date) ? "text-red" : "text-lingblue"}`}>
                          {expire ? `ถึง ${expire}` : ''}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="font-size-28 font-light text-gray mt-150 mb-font-size-28 mb-mt-150">ไม่พบข้อมูลของสมนาคุณพิเศษ</div>
              )}

              {/* <div className="course-list-info relative overflow-hidden flex-wrap flex w-675 h-186 rounded-32 items-center gap-50 pd-0 mb-w-675 mb-h-186 mb-rounded-32">
                <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28">
                  <Image src={gfg} alt="" className="w-full h-auto mb-w-full" />
                </div>
                <div className="text-activity text-start h-178 mb-h-178 ">
                  <h3 className="detail-text-activity text-drakblue font-size-28 font-medium mb-font-size-28">
                    กิจกรรม เพื่อนได้เราได้
                  </h3>
                  <p className="text-content font-size-24 text-lingblue font-light mb-font-size-24">
                    มาเด้ <span className="span-text-content">|</span> 1 ครั้ง
                  </p>
                </div>
                <div className="date-text">
                  <p className="text-date-1 relative inline-block z-1 text-lingblue font-normal font-size-23 pr-0 mb-font-size-23 mb-pr-0">
                    ถึง 26 ก.ค. 68
                  </p>
                </div>
              </div>
              <div className="course-list-info relative overflow-hidden flex w-675 h-186 rounded-32 items-center gap-50 pd-0 mb-w-675 mb-h-186 mb-rounded-32">
                <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28 mb-ml-5">
                  <Image src={iconvsq} alt="" className="w-full h-auto" />
                </div>
                <div className="text-activity text-start h-178  mb-h-178">
                  <h3 className="detail-text-activity text-drakblue font-size-28 font-medium line-14 mb-font-size-28 mb-line-14">
                    กิจกรรมบอกต่อความ<br />ประทับใจ
                  </h3>
                  <p className="text-content font-size-24 text-lingblue font-light mb-font-size-24">
                    แฟต <span className="span-text-content">|</span> 6 CC
                  </p>
                </div>
                <div className="date-text">
                  <p className="text-date-1 relative inline-block z-1 text-lingblue font-normal font-size-23 pr-0 mb-font-size-23 mb-pr-0">
                    ถึง 2 มิ.ย. 68
                  </p>
                </div>
              </div>
              <div className="course-list-info relative overflow-hidden flex w-675 h-186 rounded-32 items-center gap-50 pd-0 mb-w-675 mb-h-186 mb-rounded-32">
                <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28 mb-ml-5">
                  <Image src={iconvsq} alt="" className="w-full h-auto" />
                </div>
                <div className="text-activity text-start h-178  mb-h-178">
                  <h3 className="detail-text-activity text-drakblue font-size-28 font-medium line-14 mb-font-size-28 mb-line-14">
                    ของขวัญจกคุณหมอ
                  </h3>
                </div>
                <div className="date-text">
                  <p className="text-date-1 relative inline-block z-1 text-lingblue font-normal font-size-23 pr-0 mb-font-size-23 mb-pr-0">
                    ถึง 2 มิ.ย. 68
                  </p>
                </div>
              </div>
              <div className="course-list-info relative overflow-hidden flex w-675 h-186 rounded-32 items-center gap-50 pd-0 mb-w-675 mb-h-186 mb-rounded-32 mb-gap-50">
                <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28">
                  <Image src={iconvsq} alt="" className="w-full h-auto" />
                </div>
                <div className="text-activity text-start h-178  mb-h-178">
                  <h3 className="detail-text-activity text-drakblue font-size-28 font-medium line-14 mb-font-size-28 mb-line-14">
                    Voucher เลเซอร์ขนพรีเมี่ยม
                  </h3>
                </div>
                <div className="date-text">
                  <p className="text-date-1 relative inline-block z-1 text-lingblue font-normal font-size-23 pr-0 mb-font-size-23 mb-pr-0">
                    ถึง 2 มิ.ย. 68
                  </p>
                </div>
              </div>
              <div className="course-list-info relative overflow-hidden flex w-675 h-186 rounded-32 items-center gap-50 pd-0 mb-w-675 mb-h-186 mb-rounded-32 mb-gap-50 mb-pd-0">
                <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28 mb-ml-5">
                  <Image src={iconvsq} alt="" className="w-full h-auto" />
                </div>
                <div className="text-activity text-start h-178 mb-h-178 ">
                  <h3 className="detail-text-activity text-drakblue font-size-28 font-medium line-14 mb-font-size-28 mb-line-14">
                    กิจกรรมเพื่อนชวนเพื่อน <br />(เลเซอร์ขน)
                  </h3>
                </div>
                <div className="date-text">
                  <p className="text-date-1 relative inline-block z-1 text-lingblue font-normal font-size-23 pr-0 mb-font-size-23 mb-pr-0">
                    ถึง 2 มิ.ย. 68
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>

      </div>

      <footer className="fixed bottom-0 left-1-2 translate-x--1-2 z-99 pb-45 mb-pb-45">
        <div className="shadow-footer-item shadow-footer-container bg-white flex-center mx-auto h-129 rounded-80 gap-35 pl-20 pr-20 mb-h-129 mb-rounded-80 mb-gap-35 mb-pl-20 mb-pr-20">
          <Link href="/" className={`w-130 h-145 rounded-circle cursor-pointer relative flex-center flex-col transition-all duration-200 mb-w-130 mb-h-145`}>
            <Image
              src={iconHome}
              alt=""
              className={`w-59 h-61 mb-w-59 mb-h-61 opacity-04`}
            />
            <span className={`font-size-17 mt-3 mb-font-size-17 mb-mt-3 opacity-04 text-darkblue whitespace-pre-line text-center line-12`}>
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
              src={iconGiftActive}
              alt=""
              className={`w-59 h-61 mb-w-59 mb-h-61 brightness-300 opacity-1`}
            />
            <span className={`font-size-17 mt-3 mb-font-size-17 mb-mt-3 text-footer-active opacity-1 whitespace-pre-line text-center line-12`}>
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
    </main>
  );
}
