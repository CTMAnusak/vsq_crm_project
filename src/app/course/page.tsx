"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
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
import icontitle from "@/assets/images/course/icon-title.png"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import iconLocked from "@/assets/images/course/icon-locked.png";
import redemptLocked from "@/assets/images/course/redempt-locked.png";

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
  const [userData, setUserData] = useState<any>(null);
  const [courseData, setCourseData] = useState<any>(null);
  const [progressBarData, setProgressBarData] = useState(null);
  const [memberLevelPeriodData, setMemberLevelPeriodData] = useState(null);
  const [badgeCountsData, setBadgeCountsData] = useState(null);

  const [selectedFilter, setSelectedFilter] = useState("radio-1");
  const [OpenFilter, setOpenFilter] = useState(false);
  const openFilterRef = useRef(null);

  const router = useRouter();

  const fetchData = useCallback(async () => {
    if (isLoading) {
      return;
    }

    try {
      const accessToken = await liffService.getAccessToken();
      const res = await fetch("/api/course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken }),
      });
      const response = await res.json();
      const result = response.result;
      const resultData = result.data;
      setCourseData(resultData);
    } catch (error: any) {
      console.error(error?.message || error);
    } finally {
    }
  }, [isLoading]);

  useEffect(() => {
    setUserData(user);
    fetchData();
    const progressBarRes = user?.progressBar;
    setProgressBarData(progressBarRes);
    const memberLevelPeriodData = user?.memberLevelPeriod;
    setMemberLevelPeriodData(memberLevelPeriodData);
    const badgeCountsData = user?.badgeCounts;
    setBadgeCountsData(badgeCountsData);
  }, [user, isAuthenticated, isLoading, fetchData]);

  const formatWeekdayTh = (dateStr: string): string => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const text = new Intl.DateTimeFormat('th-TH', { weekday: 'long' }).format(d);
    return text.replace(/^วัน/, "");
  };

  const getDayNumber = (dateStr: string): string => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.getDate().toString();
  };

  const formatMonthLongTh = (dateStr: string): string => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat('th-TH', { month: 'long' }).format(d);
  };

  const formatShortDateTh = (dateStr: string): string => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat('th-TH', { day: '2-digit', month: 'short', year: '2-digit' }).format(d);
  };

  const formatTimeTh = (timeStr: string | null | undefined): string => {
    if (!timeStr) return "";
    return timeStr.replace(":", ".") + " น.";
  };

  const handleRadioChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleClickTitle = (event) => {
    if (OpenFilter) {
      setOpenFilter(false);
    } else {
      setOpenFilter(true);
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

  const sortedCourseData = useMemo(() => {
    if (!Array.isArray(courseData)) return [];
    const dataCopy = [...courseData];
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
  }, [courseData, selectedFilter]);

  if (isLoading || courseData === null || courseData === undefined) {
    return (
      <main className="section-course w-full overflow-hidden">
        <div className="section-course-bg h-100dvh">
          <div className="title relative flex">
            <div className="flex relative w-full">
              <div className="flex relative w-full justify-between items-baseline">
                <h2 className="section-text-headline font-size-50 font-light text-drakble mt-85 pl-48 mb-font-size-50 mb-mt-85 mb-pl-48">
                  คอร์สที่ค้าง
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
        {/* <Titlepage title={"คอร์สที่ค้าง"} /> */}
        <div className="title relative flex">
          <div className="flex relative w-full">
            <div className="flex relative w-full justify-between items-baseline">
              <h2 className="section-text-headline font-size-50 font-light text-drakble mt-85 pl-48 mb-font-size-50 mb-mt-85 mb-pl-48">
                คอร์สที่ค้าง
              </h2>
              <div className="icon-title pr-49 mb-pr-49">
                <button className={`btn-filter ${OpenFilter ? "filter-open" : ""}`} onClick={(event) => handleClickTitle(event)}>
                  <Image src={icontitle} alt="icontitle" width={34} height={25} data-target="redem-1" className="icon-img w-34 h-25 mb-w-34 mb-h-25" />
                </button>
              </div>
            </div>
          </div>

          <div ref={openFilterRef} id="redem-1" className={`redem-modal ${OpenFilter ? "is-open" : ""}`}>
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

        <div className="section-course-expire">
          <div className="flex flex-col gap-30 items-center min-h-800 mb-gap-30 mb-min-h-800">
            {/* <div className="font-size-28 font-light text-gray mt-150 mb-font-size-28 mb-mt-150">ไม่พบข้อมูลของสมนาคุณพิเศษ</div> */}
            <div className="section-lits-course-expire flex-center flex-wrap relative top-13 gap-28 mb-gap-28">

              {Array.isArray(sortedCourseData) && sortedCourseData.length > 0 ? (
                sortedCourseData.map((item: any) => {
                  const expire = formatShortDateTh(item?.expiration_date);
                  return (
                    <div key={item?.id} className="course-list-info relative overflow-hidden flex w-675 h-186 rounded-32 items-center gap-20 pd-0 mb-w-675 mb-h-186 mb-rounded-32 mb-gap-20">
                    <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28 mb-ml-5">
                      <Image src={iconvsq} alt="" className="w-full h-auto" />
                    </div>
                    <div className="text-activity text-start h-178  mb-h-178">
                      <h3 className="text-drakblue font-size-28 font-medium line-14 pt-20 mb-font-size-28 mb-line-14 mb-pt-20">
                        {item?.title}
                      </h3>
                      <p className="text-content font-size-24 text-lingblue font-light mb-font-size-24">
                        {/* แฟต <span className="span-text-content">|</span> 6 CC */}
                        {item?.subtitle}
                      </p>
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
                <div className="font-size-28 font-light text-gray mt-150 mb-font-size-28 mb-mt-150">ไม่พบข้อมูลคอร์ส</div>
              )}

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
              src={iconCourseActive}
              alt=""
              className={`w-59 h-61 mb-w-59 mb-h-61 brightness-300 opacity-1`}
            />
            <span className={`font-size-17 mt-3 mb-font-size-17 mb-mt-3 text-footer-active opacity-1 whitespace-pre-line text-center line-12`}>
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
    </main>
  );
}
