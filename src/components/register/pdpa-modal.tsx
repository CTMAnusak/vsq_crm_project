"use client"

import { useEffect } from "react"
import ButtonSubmit from "./button-submit"

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
    <div className="pdpa-modal flex-center fixed w-768 mb-w-768 mx-auto pl-21 pr-21 pt-87 pb-87  mb-flex-center mb-fixed mb-pl-21 mb-pr-21 mb-pt-87 mb-pb-87">
      <div className="pdpa-content relative w-full h-full rounded-49 pt-45 pl-40 pr-40  mb-rounded-49 mb-pt-45 mb-pl-40 mb-pr-40">
        <p className="headText-pdpa inline font-size-29 mb-font-size-29 font-normal ">ข้อตกลงการใช้บริการ</p>
        <div className="box-text-pdpa pt-33 mb-pt-33">
          <div className="text-pdpa font-light overflow-y-auto font-size-23 mb-font-size-23">
            <p >
            ธนาคารสงวนสิทธิ์ในการจัดให้มีเว็บไซต์นี้ เพื่ออำนวยความสะดวกแก่ลูกค้า ประชาชน และผู้ที่สนใจทั่วไป (ผู้ใช้) ที่ต้องการทราบข้อมูลข่าวสาร ความเคลื่อนไหวต่างๆ ในการดำเนินธุรกิจของธนาคาร ในช่องการทางสื่อสารผ่านระบบเครือข่ายอินเตอร์เน็ต ที่ผู้ใช้บริการยอมรับเงื่อนไขและรายละเอียดต่างๆ ตามที่ปรากฎอยู่ในข้อตกลงการใช้บริการนี้เท่านั้น
            ธนาคารเป็นเจ้าของลิขสิทธิ์ ในข้อมูลที่แสดง รูปภาพ และรูปแบบการแสดงผล ตามที่ปรากฎ ในเว็บไซต์ทั้งหมด ยกเว้นจะมีการระบุอย่างชัดเจนเป็นอื่น ห้ามมิให้ผู้ใดทำการคัดลอก ทำซ้ำ มีสำเนา สำรองไว้ ทำเลียนแบบ ทำเหมือน ดัดแปลง ทำเพิ่ม ซึ่งนำไปเผยแพร่ด้วยวัตถุประสงค์อื่นใด นอกจากได้รับอนุญาตจากธนาคาร
            </p>
            <p className="mb-39 mb-mb-39">ข้อยกเว้น / ข้อจำกัดการใช้บริการ</p>

            <p className="mb-39 mb-mb-39">
              <span className="pr-12 mb-pr-12">1.</span>ข้อมูลที่แสดงบนเว็บไซต์นี้ จัดทำขึ้นโดยคณะผู้จัดทำของธนาคาร ประกอบขึ้นจากตัวแทนของหน่วยงานต่างๆ ภายในธนาคาร การรวบรวม เรียบเรียง ปรับปรุงให้สอดคล้องกับการนำเสนอบนเว็บไซต์ ธนาคารมิอาจรับรองความถูกต้อง หรือความเป็นปัจจุบัน ความต่อเนื่อง หรือความครบถ้วนสมบูรณ์เพื่อการใช้ในทางการค้าหรือประโยชน์อื่นใด จึงขอสงวนสิทธิ์การปรับปรุงเปลี่ยนแปลงข้อมูลเมื่อใดก็ได้ โดยมิต้องแจ้งให้ทราบล่วงหน้า
            </p>
            <p className="pb-33 mb-pb-33">
              <span className="pr-12 mb-pr-12">2.</span>ผู้ใช้ที่ต้องการคำยืนยัน การรับรอง ความถูกต้องครบถ้วนสมบูรณ์ ความเป็นปัจจุบัน และความต่อเนื่องของข้อมูล จะต้องติดต่อกับหน่วยงานของธนาคารที่เกี่ยวข้องและรับผิดชอบโดยตรง ธนาคารจะไม่รับผิดชอบในความเสียหาย สูญเสีย ไม่ว่าทางตรงหรือทางอ้อม หรือค่าใช้จ่ายใดๆ ที่เกิดจากการใช้ประโยชน์จากเว็บไซต์นี้ ไม่ว่าจะเป็นเพราะความไม่ครบถ้วนสมบูรณ์ ความไม่เป็นปัจจุบัน ความผิดพลาด ความล่าช้าของข้อมูล การขาดความต่อเนื่องของการเชื่อมโยงอุปกรณ์ หรือความประมาทเลินเล่อใด ๆ ไม่ว่าจะมีผู้ใดแจ้งหรือแนะนำ ธนาคารก่อนหน้าเกี่ยวกับโอกาสที่จะเกิดปัญหาดังกล่าวหรือไม่ ผู้ใช้ยอมรับและตระหนักดีว่า ธนาคารไม่ต้องรับผิด
            </p>

          </div>
        </div>
        <div className="pdpa-confirm-box flex-center">
        <ButtonSubmit 
            variant="blue_border"
            className="w-283 h-81 mb-w-283 mb-h-81"
            onClick={onDecline}
          >
            ไม่ยอมรับ
          </ButtonSubmit>
          <ButtonSubmit 
            variant="blue_bg"
            className="w-283 h-81 mb-w-283 mb-h-81"
            onClick={onAccept}
          >
            ยอมรับ
          </ButtonSubmit>
        </div>
      </div>
    </div>
  )
}
