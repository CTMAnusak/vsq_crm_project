"use client"

import { useEffect } from "react"

interface PDPAModalProps {
  onAccept: () => void
  onDecline: () => void
}

export default function PDPAModal({ onAccept, onDecline }: PDPAModalProps) {
  // ป้องกันการเลื่อนหน้าเว็บเมื่อ modal เปิดอยู่
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div className="pdpa-modal mb-flex-center mb-fixed mb-pl-21 mb-pr-21 mb-pt-87 mb-pb-87">
      <div className="pdpa-content mb-relative mb-w-full mb-h-full mb-rounded-49">
        <p className="headText-pdpa mb-inline mb-font-size-29 mb-font-normal mb-mb-40">ข้อตกลงการใช้บริการ</p>
        <div className="text-pdpa font-light mb-mb-30  mb-overflow-y-auto mb-font-size-23">
          <p className="mb-mb-10">
            ธุรกิจของเราเก็บรวบรวมข้อมูลส่วนตัวของคุณ เพื่อนำมาพัฒนาผลิตภัณฑ์ สินค้า บริการต่างๆ และวิเคราะห์ข้อมูล (KYC) ที่จะนำมาพัฒนาผลิตภัณฑ์
            บริการ ความพึงพอใจของลูกค้า ในการนำเสนอผลิตภัณฑ์ บริการ การนำเสนอสิทธิประโยชน์ที่ท่านจะได้รับ กิจกรรมส่งเสริมการขาย ข้อเสนอพิเศษ
            ข่าวสารต่างๆ ตามที่ท่านสนใจ ข้อมูลการเข้าร่วมกิจกรรมต่างๆ ความชื่นชอบ พฤติกรรมการใช้บริการ หรือข้อมูลอื่นใด ที่เกี่ยวข้องกับท่าน
            ที่ท่านได้ให้ไว้กับเรา หรือที่เราได้รับ หรือเข้าถึงได้จากแหล่งอื่น ที่เชื่อถือได้ เพื่อวัตถุประสงค์ดังต่อไปนี้
          </p>

          <ol className="list-decimal pl-6 space-y-4">
            <li>
              เพื่อใช้ในการดำเนินธุรกิจ ดำเนินกิจกรรมใดๆ ทั้งหมดของเราตามวัตถุประสงค์ที่กำหนดไว้ภายใต้ขอบเขตอำนาจหน้าที่ของเรา
              รวมถึงการรวบรวม จัดเก็บ ใช้ ประมวลผล วิเคราะห์ข้อมูลเพื่อการพัฒนาผลิตภัณฑ์ บริการ รวมถึงการส่งเสริมการขาย การตลาด
              การประชาสัมพันธ์ การจัดกิจกรรมส่งเสริมการขาย ข้อเสนอพิเศษ การแจ้งเตือนหรือการแจ้งข่าวสารต่างๆ
              โดยเฉพาะที่เกี่ยวข้องกับผลิตภัณฑ์และบริการ
            </li>
            <li>
              เพื่อใช้ในการติดต่อสื่อสาร การตอบข้อซักถาม การแจ้งข่าวสารใดๆ เกี่ยวกับผลิตภัณฑ์และบริการ การแจ้งสิทธิประโยชน์ รวมถึงการแจ้งเตือนใดๆ
              ที่เกี่ยวข้องกับผลิตภัณฑ์และบริการ การแจ้งเตือนเมื่อมีการดำเนินการเกี่ยวกับคำขอใดๆ ของท่าน การแจ้งผลการดำเนินการ
              หรือการแจ้งเปลี่ยนแปลงใดๆ ที่สำคัญ การแจ้งข้อมูลที่จำเป็นหรือที่ควรแจ้งให้ท่านทราบ
            </li>
          </ol>
        </div>
        <div className="flex justify-between">
          <button onClick={onDecline} className="btn-secondary">
            ไม่ยอมรับ
          </button>
          <button onClick={onAccept} className="btn-primary">
            ยอมรับ
          </button>
        </div>
      </div>
    </div>
  )
}
