"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import "@/assets/css/pxtovw.css";
import "@/assets/css/appointment.css";
import "@/assets/css/titlepage.css";
import Titlepage from "@/components/titlepage";
import calendar from "@/assets/images/course/calenda.png";
import clock from "@/assets/images/course/icon-clock.png"
import calendargray from "@/assets/images/course/calenda-1.png"
import clockgray from "@/assets/images/course/icon-clock-1.png"
import icontitle from "@/assets/images/course/icon-title.png"
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export default function AppointmentPage() {
  return (
    <>
      <Header />
      <AppointmentContent />
      {/* <Footer /> */}
    </>
  );
}

const AppointmentContent = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [progressBarData, setProgressBarData] = useState(null);
  const [memberLevelPeriodData, setMemberLevelPeriodData] = useState(null);
  const [badgeCountsData, setBadgeCountsData] = useState(null);
  const [completedAppointments, setCompletedAppointments] = useState<any>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<any>(null);

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
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken }),
      });
      const response = await res.json();
      const result = response.result;
      const resultData = result?.data;
      const upcomingRaw = resultData?.upcoming_appointments;
      const normalizedUpcoming = Array.isArray(upcomingRaw)
        ? upcomingRaw
        : upcomingRaw
        ? [upcomingRaw]
        : [];
      setUpcomingAppointments(normalizedUpcoming);
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

  const sortedUpcomingAppointments = useMemo(() => {
    if (!Array.isArray(upcomingAppointments)) return [];
    const copy = [...upcomingAppointments];
    copy.sort((a, b) => {
      const aTime = a?.date ? new Date(a.date).getTime() : 0;
      const bTime = b?.date ? new Date(b.date).getTime() : 0;
      // radio-1: วันที่เก่าสุด (น้อย -> มาก), radio-2: วันที่ล่าสุด (มาก -> น้อย)
      return selectedFilter === "radio-1" ? aTime - bTime : bTime - aTime;
    });
    return copy;
  }, [upcomingAppointments, selectedFilter]);

  if (isLoading || upcomingAppointments === null || upcomingAppointments === undefined) {
    return (
      <main className="section-service w-full overflow-hidden">
        <div className="section-service-bg h-100dvh">
          <div className="title relative flex">
            <div className="flex relative w-full">
              <div className="flex relative w-full justify-between items-baseline">
                <h2 className="section-text-headline font-size-50 font-light text-drakble mt-85 pl-48 mb-font-size-50 mb-mt-85 mb-pl-48">
                  นัดหมาย
                </h2>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="section-service w-full overflow-hidden mb-w-full">
      <div className="section-service-bg">
        {/* <Titlepage title={"นัดหมาย"} /> */}
        <div className="title relative flex">
          <div className="flex relative w-full">
            <div className="flex relative w-full justify-between items-baseline">
              <h2 className="section-text-headline font-size-50 font-light text-drakble mt-85 pl-48 mb-font-size-50 mb-mt-85 mb-pl-48">
                นัดหมาย
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
                  <label htmlFor="radio-1" className="radio-label font-size-43 font-light text-darkblue mb-font-size-43">วันที่เก่าสุด</label>
                </div>

                <div className="radio">
                  <input id="radio-2" className="radio" type="radio" value="radio-2" checked={selectedFilter === "radio-2"} onChange={handleRadioChange} />
                  <label htmlFor="radio-2" className="radio-label font-size-43 font-light text-darkblue mb-font-size-43">วันที่ล่าสุด</label>
                </div>
              </div>

            </div>
          </div>
        </div>


        <div className="section-appointment">
          <div className="flex flex-col gap-30 items-center mb-gap-30">
            <div className="section-lits-course-expire flex-center flex-wrap relative top-13 gap-28 mb-gap-28 w-full mb-top-13">
              {Array.isArray(sortedUpcomingAppointments) && sortedUpcomingAppointments.length > 0 ? (
                sortedUpcomingAppointments.map((item: any) => {
                  return (
                    <div key={item?.id} className="course-list-info relative overflow-hidden flex-wrap flex w-675 rounded-32 items-stretch pd-0 mb-w-675 mb-rounded-32">
                      <div className="w-289 h-auto overflow-hidden overflow-hidden ml-10 pt-10 pb-10 mb-w-289 flex-center flex-col mb-ml-10 mb-pt-10 mb-pb-10">
                        <p className="day-date text-drakblue font-size-26 font-normal mb-font-size-26">{formatWeekdayTh(item?.date)}</p>
                        <div className="date-text-button">
                          <p className="number-date text-drakblue font-size-104 line-08 mb-line-08 mb-font-size-104">{getDayNumber(item?.date)}</p>
                          <p className="month-date text-drakblue font-size-26 line-1 font-normal mt-6 mb-font-size-26 mb-mt-6">{formatMonthLongTh(item?.date)}</p>
                        </div>
                      </div>

                      <div className="text-activity text-start w-350 mb-w-350 relative">
                        <label className="detail-text-activity text-drakblue font-size-28 font-medium line-13 mb-font-size-28">
                          {Array.isArray(item?.product_group_names) && item.product_group_names.length > 0 ? item.product_group_names.join(", ") : ""}
                        </label>
                        <div className="branch-button w-full relative pt-12 mb-pt-12">
                          <p className="text-branch text-lingblue font-size-24 font-light mb-font-size-24">สาขา {item?.division_name ?? '-'}</p>
                          <div className="branch-text-icon w-auto gap-15 mb-gap-15">
                            <div className="icon-day-time pd-0 gap-4 mb-pd-0 mb-gap-4">
                              <div className="img-icon">
                                <Image src={calendar} alt="calendar" width={26} height={23} className="w-26 h-23 mb-w-26 mb-h-23" />
                              </div>
                              <p className="text-day-time font-light text-lingblue font-size-23 mb-font-size-23">{formatShortDateTh(item?.date)}</p>
                            </div>
                            {item?.time_start !== null && item?.time_start !== undefined && item?.time_start !== "" && (
                            <div className="icon-day-time pd-0 gap-4 mb-pd-0 mb-gap-4">
                              <div className="img-icon">
                                <Image src={clock} alt="calendar" width={23} height={23} className="w-23 h-23 mb-w-23 mb-h-23" />
                              </div>
                                <p className="text-day-time font-light text-lingblue font-size-23 mb-font-size-23">{formatTimeTh(item.time_start)}</p>
                            </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="font-size-28 font-light text-gray mt-150 mb-font-size-28 mb-mt-150">ไม่พบข้อมูลนัดหมาย</div>
              )}
            </div>
            {/* <div className="font-size-28 font-light text-gray mt-150 mb-font-size-28 mb-mt-150">ไม่พบข้อมูลนัดหมาย</div> */}
            {/* <div className="section-lits-course-expire flex-center flex-wrap relative top-13 gap-28 mb-gap-28 w-full mb-top-13">
              <div className="course-list-info relative overflow-hidden flex-wrap flex w-672 h-188 rounded-32 items-center pd-0 mb-w-675 mb-h-188 mb-rounded-32">
                <div className="date-text-button w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28 flex-center flex-col mb-ml-5">
                  <p className="day-date text-drakblue font-size-26 font-normal mb-font-size-26">จันทร์</p>
                  <p className="number-date text-drakblue font-size-104 line-08 pt-10 mb-pt-10 mb-font-size-104 line-08">23</p>
                  <p className="month-date text-drakblue font-size-26 font-normal mb-font-size-26">มิถุนายน</p>
                </div>
                
                <div className="text-activity text-start w-350 h-178 mb-h-178 mb-w-350 relative">
                  <label className="detail-text-activity text-drakblue font-size-28 font-medium mb-font-size-28 mt-11 mb-mt-11">
                  ฉีดโบท็อกซ์ <span className="span-text-content">: Nabota</span>
                  </label>
                  <div className="branch-button w-full relative top-7 mb-top-7 mb-w-full">
                    <p className="text-branch text-lingblue font-size-24 font-light mb-font-size-24">สาขา เซ็นทรัล เวสต์วิลล์</p>
                    <div className="branch-text-icon w-auto gap-5 mb-w-full mb-gap-5">
                      <div className="icon-day-time pd-0 gap-4 mb-pd-0 mb-gap-4">
                        <div className="img-icon">
                          <Image src={calendar} alt="calendar" width={26} height={23} className="w-26 h-23 mb-w-26 mb-h-23"/>
                        </div>
                        <p className="text-day-time font-light text-lingblue font-size-23 mb-font-size-23">23 มิ.ย. 68</p>
                      </div>
                      <div className="icon-day-time pd-0 gap-4 mb-pd-0 mb-gap-4">
                        <div className="img-icon">
                          <Image src={clock} alt="calendar" width={23} height={23} className="w-23 h-23 mb-w-23 mb-h-23"/>
                        </div>
                        <p className="text-day-time font-light text-lingblue font-size-23 mb-font-size-23">13.00 น.</p>
                      </div> 
                    </div>
                  </div>
                </div>
              </div>
              <div className="course-list-info relative overflow-hidden flex-wrap flex w-672 h-188 rounded-32 items-center pd-0 mb-w-675 mb-h-188 mb-rounded-32">
                <div className="date-text-button w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28 flex-center flex-col mb-ml-5 mb-h-auto">
                  <p className="day-date text-drakblue font-size-26 font-normal mb-font-size-26">อังคาร</p>
                  <p className="number-date text-drakblue font-size-104 line-08 pt-10 mb-pt-10 mb-line-08 mb-font-size-104">17</p>
                  <p className="month-date text-drakblue font-size-26 font-normal mb-font-size-26">กรกฎาคม</p>
                </div>
                
                <div className="text-activity text-start w-350 h-178 mb-h-178 mb-w-350 relative">
                  <label className="detail-text-activity text-drakblue font-size-28 font-medium mb-font-size-28 mt-11 mb-mt-11">
                  เลเซอร์รักแร้
                  </label>
                  <div className="branch-button w-full relative top-7 mb-top-7">
                    <p className="text-branch text-lingblue font-size-24 font-light mb-font-size-24">สาขา เซ็นทรัล ลาดพร้าว</p>
                    <div className="branch-text-icon w-auto gap-5 mb-gap-5">
                      <div className="icon-day-time pd-0 gap-4 mb-pd-0 mb-gap-4">
                        <div className="img-icon">
                          <Image src={calendar} alt="calendar" width={26} height={23} className="w-26 h-23 mb-w-26 mb-h-23"/>
                        </div>
                        <p className="text-day-time font-light text-lingblue font-size-23 mb-font-size-23">17 ก.ค. 68</p>
                      </div>
                      <div className="icon-day-time pd-0 gap-4 mb-pd-0 mb-gap-4">
                        <div className="img-icon">
                          <Image src={clock} alt="calendar" width={23} height={23} className="w-23 h-23 mb-w-23 mb-h-23"/>
                        </div>
                        <p className="text-day-time font-light text-lingblue font-size-23 mb-font-size-23">15.30 น.</p>
                      </div> 
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* <div className="section-record-date relative w-full top-75 mb-top-75">
            <h2 className="font-light text-darkblue font-size-38 ml-85 mb-ml-85 mb-font-size-38">ประวัติการนัดหมาย</h2>
            <div className="section-lits-course-expire flex-center flex-wrap relative top-34 gap-28 mb-gap-28 w-full mb-top-34">
              <div className="record-list-info relative overflow-hidden flex-wrap flex w-672 h-188 rounded-32 items-center pd-0 mb-w-675 mb-h-188 mb-rounded-32">
                <div className="record-date-text-button w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28 mb-ml-5 flex-center flex-col">
                  <p className="record-day-date text-gray-1 font-size-26 font-normal mb-font-size-26">เสาร์</p>
                  <p className="number-date text-gray-1 font-size-104 line-08 pt-10 mb-line-08 mb-pt-10 mb-font-size-104">7</p>
                  <p className="month-date text-gray-1 font-size-26 font-normal mb-font-size-26">มิถุนายน</p>
                </div>
                
                <div className="record-text-activity text-start w-350 h-178 mb-h-178 mb-w-350 relative">
                  <label className="record-detail-text-activity text-gray-1 font-size-28 font-medium mb-font-size-28 mt-11 mb-mt-11">
                  ดริปวิตามินผิว <span className="span-text-content">: Radian</span>
                  </label>
                  <div className="branch-button w-full relative top-7 mb-top-7">
                    <p className="text-branch text-linggray font-size-24 font-light mb-font-size-24">สาขาพระราม 3</p>
                    <div className="record-branch-text-icon w-auto gap-5 mb-gap-5">
                      <div className="record-icon-day-time pd-0 gap-4 mb-pd-0 mb-gap-4">
                        <div className="img-icon">
                          <Image src={calendargray} alt="calendar" width={26} height={23} className="w-26 h-23 mb-w-26 mb-h-23"/>
                        </div>
                        <p className="text-day-time font-light text-linggray font-size-23 mb-font-size-23">7 มิ.ย. 68</p>
                      </div>
                      <div className="record-icon-day-time pd-0 gap-4 mb-pd-0 mb-gap-4">
                        <div className="img-icon">
                          <Image src={clockgray} alt="calendar" width={23} height={23} className="w-23 h-23 mb-w-23 mb-h-23"/>
                        </div>
                        <p className="text-day-time font-light text-linggray font-size-23 mb-font-size-23">13.00 น.</p>
                      </div> 
                    </div>
                  </div>
                </div>
              </div>
              <div className="record-list-info relative overflow-hidden flex-wrap flex w-672 h-188 rounded-32 items-center pd-0 mb-w-675 mb-h-188 mb-rounded-32">
                <div className="record-date-text-button w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28 flex-center flex-col mb-ml-5">
                  <p className="record-day-date text-gray-1 font-size-26 font-normal mb-font-size-26">พุธ</p>
                  <p className="number-date text-gray-1 font-size-104 line-08 pt-10 mb-line-08 mb-pt-10 mb-font-size-104">4</p>
                  <p className="month-date text-gray-1 font-size-26 mb-font-size-26 font-normal">มิถุนายน</p>
                </div>
                
                <div className="record-text-activity text-start w-350 h-178 mb-h-178 mb-w-350 relative">
                  <label className="record-detail-text-activity text-gray-1 font-size-28 mb-font-size-28 font-medium mb-font-size-28 mt-11 mb-mt-11">
                  เลเซอร์รักแร้
                  </label>
                  <div className="branch-button w-full relative top-7 mb-top-7">
                    <p className="text-branch text-linggray font-size-24 mb-font-size-24 font-light">สาขา เซ็นทรัล ลาดพร้าว</p>
                    <div className="record-branch-text-icon w-auto gap-5 mb-gap-5">
                      <div className="record-icon-day-time pd-0 gap-4 mb-pd-0 mb-gap-4">
                        <div className="img-icon">
                          <Image src={calendargray} alt="calendar" width={26} height={23} className="w-26 h-23 mb-w-26 mb-h-23" />
                        </div>
                        <p className="text-day-time font-light text-linggray font-size-23 mb-font-size-23">4 มิ.ย. 68</p>
                      </div>
                      <div className="record-icon-day-time pd-0 gap-4 mb-pd-0 mb-gap-4">
                        <div className="img-icon">
                          <Image src={clockgray} alt="calendar" width={23} height={23} className="w-23 h-23 mb-w-23 mb-h-23"/>
                        </div>
                        <p className="text-day-time font-light text-linggray font-size-23 mb-font-size-23">15.20 น.</p>
                      </div> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

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
              src={iconAppointmentActive}
              alt=""
              className={`w-59 h-61 mb-w-59 mb-h-61 brightness-300 opacity-1`}
            />
            <span className={`font-size-17 mt-3 mb-font-size-17 mb-mt-3 text-footer-active opacity-1 whitespace-pre-line text-center line-12`}>
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
