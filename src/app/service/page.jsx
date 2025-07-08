"use client";
import Image from "next/image";
import "../../assets/css/service.css"
import "../../assets/css/fonts.css";
import Titlepage from "../../components/titlepage";
import hifu from "../../assets/images/course/HIFU-img.png"
import pcakrew from "../../assets/images/course/pack-rew-img.png"
import laser from "../../assets/images/course/cours-laser.png"
import vitamin from "../../assets/images/course/vitamin-img.png"

export default function Service() {
    return (
      <main className="section-service w-full overflow-hidden">
        <div className="section-service-bg">
          <Titlepage title={"บริการของคุณ"} />
          <div className="flex flex-col gap-30 items-center">
            <div className="section-lits-course-expire flex-center flex-wrap relative top-13 gap-28 mb-gap-28 ">
              <div className="course-list-info relative overflow-hidden flex-wrap flex w-675 h-186 rounded-32 items-center gap-50 pd-0 mb-w-675 mb-h-186 mb-rounded-32">
                <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28">
                  <Image src={hifu} alt="" className="w-full h-auto mb-w-full" />
                </div>
                <div className="text-activity text-start h-178 mb-h-178 ">
                  <h3 className="detail-text-activity-eng text-drakblue font-size-28 font-medium mb-font-size-28">
                    HIFU Ultraformer III
                  </h3>
                  <p className="text-content font-size-24 text-lingblue font-light mb-font-size-24"><span className="span-text-content">
                    600 Line |</span> 1 ครั้ง
                  </p>
                </div>
                <div className="date-text">
                  <p className="text-date-1 relative inline-block z-1 text-lingblue font-normal font-size-23 pr-0 mb-font-size-23 mb-pr-0">
                  ถึง 17 มิ.ย. 68
                  </p>
                </div>
              </div>
              <div className="course-list-info relative overflow-hidden flex w-675 h-186 rounded-32 items-center gap-50 pd-0 mb-w-675 mb-h-186 mb-rounded-32">
                <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28 mb-ml-5">
                  <Image src={pcakrew} alt="" className="w-full h-auto" />
                </div>
                <div className="text-activity text-start h-178  mb-h-178">
                  <h3 className="detail-text-activity text-drakblue font-size-28 font-medium line-14 mb-font-size-28 mb-line-14">
                   แพ็คเกจเรียว<span className="detail-text-activity-eng">X2</span>
                  </h3>
                </div>
                <div className="date-text">
                  <p className="text-date-1 relative inline-block z-1 text-lingblue font-normal font-size-23 pr-0 mb-font-size-23 mb-pr-0">
                  ถึง 28 มิ.ย. 68
                  </p>
                </div>
              </div>
              <div className="course-list-info relative overflow-hidden flex w-675 h-186 rounded-32 items-center gap-50 pd-0 mb-w-675 mb-h-186 mb-rounded-32">
                <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28 mb-ml-5">
                  <Image src={laser} alt="" className="w-full h-auto" />
                </div>
                <div className="text-activity text-start h-178  mb-h-178">
                  <h3 className="detail-text-activity text-drakblue font-size-28 font-medium line-14 mb-font-size-28 mb-line-14">
                    คอร์ส <span className="detail-text-activity-eng">laser</span>
                  </h3>
                  <p className="text-content font-size-24 text-lingblue font-light mb-font-size-24">
                    รักแร้ <span className="span-text-content">5/10</span>  ครั้ง
                  </p>
                  <p className="text-content font-size-24 text-lingblue font-light mb-font-size-24"><span className="span-text-content">
                  Brazilian  5/5</span> ครั้ง
                  </p>
                </div>
                <div className="date-text">
                  <p className="text-date-1 relative inline-block z-1 text-lingblue font-normal font-size-23 pr-0 mb-font-size-23 mb-pr-0">
                  ถึง 2 ก.ค. 68
                  </p>
                </div>
              </div>
              <div className="course-list-info relative overflow-hidden flex w-675 h-186 rounded-32 items-center gap-50 pd-0 mb-w-675 mb-h-186 mb-rounded-32 mb-gap-50">
                <div className="img-icon w-289 h-auto overflow-hidden rounded-28 overflow-hidden ml-5 mb-w-289 mb-rounded-28">
                  <Image src={vitamin} alt="" className="w-full h-auto" />
                </div>
                <div className="text-activity text-start h-178  mb-h-178">
                  <h3 className="detail-text-activity text-drakblue font-size-28 font-medium line-14 mb-font-size-28 mb-line-14">วิตามิน
                  </h3>
                  <p className="text-content font-size-24 text-lingblue font-light mb-font-size-24"><span className="span-text-content">
                  White Rediance  2/5</span> ครั้ง
                  </p>
                </div>
                <div className="date-text">
                  <p className="text-date-1 relative inline-block z-1 text-lingblue font-normal font-size-23 pr-0 mb-font-size-23 mb-pr-0">
                  ถึง 27 มิ.ย. 68
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}