"use client";
import Image from "next/image";
import "../../assets/css/appointment.css";
import "../../assets/css/fonts.css";
import Titlepage from "../../components/titlepage";
import calendar from "../../assets/images/course/calenda.png";
import clock from "../../assets/images/course/icon-clock.png"
import calendargray from "../../assets/images/course/calenda-1.png"
import clockgray from "../../assets/images/course/icon-clock-1.png"

export default function Appointment() {
  return (
    <main className="section-service w-full overflow-hidden mb-w-full">
      <div className="section-service-bg">
        <Titlepage title={"นัดหมาย"} />
        <div className="section-appointment">
          <div className="flex flex-col gap-30 items-center mb-gap-30">
            <div className="section-lits-course-expire flex-center flex-wrap relative top-13 gap-28 mb-gap-28 w-full mb-top-13">
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
            </div>
          </div>

          <div className="section-record-date relative w-full top-75 mb-top-75">
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
          </div>

        </div>
      </div>
    </main>
  );
}
