import Image from "next/image"
import icontitle from "../assets/images/course/icon-title.png"
import React, { useState } from "react";
import "../assets/css/titlepage.css"

export default function Titlepage({title}) {

  const [selectedRadio, setSelectedRadio] = useState("radio-1");
  const [OpenFilter, setOpenFilter] = useState(false);
  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleClick = () => {
    if (OpenFilter) {
      setOpenFilter(false);
    } else {
      setOpenFilter(true);
    }
  };

  return (
    <div className="title relative flex">
      <div className="flex relative w-full">
        <div className="flex relative w-full justify-between items-baseline">
          <h2 className="section-text-headline font-size-50 font-light text-drakble mt-85 pl-48 mb-font-size-50 mb-mt-85 mb-pl-48">
            {title}
          </h2>
          <div className="icon-title pr-49 mb-pr-49">
          <button className="btn-filter" onClick={handleClick}>
          <Image src={icontitle} alt="icontitle"  width={34} height={25} data-target="redem-1" className="icon-img w-34 h-25 mb-w-34 mb-h-25" />
          </button>
          </div>
        </div>
      </div>

      <div id="redem-1" className={`redem-modal ${
                  OpenFilter ? "is-open" : ""
                }`}>
          <div className="redem-modal-content">
            <div className="sort-by-date" onClick={handleClick}>
              <div className="line-date"></div>
              <h3 className="font-size-43 font-light text-darkblue pt-15 hidden mb-font-size-43 mb-pt-15">เรียงตาม</h3>
            </div>
            <div className="check-day">
              <div className="radio">
                <input id="radio-1" className="radio" type="radio" value="radio-1" checked={selectedRadio === "radio-1"} onChange={handleRadioChange} />
                <label htmlFor="radio-1" className="radio-label font-size-43 font-light text-darkblue mb-font-size-43">วันที่ล่าสุด</label>
              </div>

              <div className="radio">
                <input id="radio-2" className="radio" type="radio" value="radio-2" checked={selectedRadio === "radio-2"} onChange={handleRadioChange} />
                <label htmlFor="radio-2" className="radio-label font-size-43 font-light text-darkblue mb-font-size-43">วันที่เก่าสุด</label>
              </div>
            </div>

          </div>
        </div>

    </div>

  )
} 