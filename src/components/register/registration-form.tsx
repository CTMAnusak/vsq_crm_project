"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckIcon, InfoIcon } from "lucide-react"
import PDPAModal from "./pdpa-modal"

type TabType = "existing" | "new"
type FormData = {
  firstName: string
  lastName: string
  phone: string
  isExistingCustomer?: boolean // เพิ่มฟิลด์เพื่อระบุว่าเป็นลูกค้าเดิมหรือลูกค้าใหม่
}

// จำลองข้อมูลผู้ใช้ที่มีอยู่ในระบบ
const mockExistingUsers = [
  { firstName: "อารียา", lastName: "บุญประเสริฐ", phone: "0845984512" },
  { firstName: "สมชาย", lastName: "ใจดี", phone: "0812345678" },
  { firstName: "วิภาวดี", lastName: "รักเรียน", phone: "0898765432" },
  { firstName: "ธนพล", lastName: "มั่งมี", phone: "0923456789" },
  { firstName: "กมลวรรณ", lastName: "สวัสดี", phone: "0834567890" },
  { firstName: "ปิยะ", lastName: "รักสวย", phone: "0956789012" },
  { firstName: "นภา", lastName: "ใจงาม", phone: "0867890123" },
  { firstName: "วิชัย", lastName: "สุขสันต์", phone: "0978901234" },
]

const customerTabs = [
  {
    id: "existing",
    title: "ลูกค้า V Square",
    subtitle: "เคยรับบริการแล้ว"
  },
  {
    id: "new",
    title: "สมัครสมาชิก",
    subtitle: "ลูกค้าใหม่"
  }
];

export default function RegistrationForm() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>("existing")
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [notFound, setNotFound] = useState(false)
  const [showPDPA, setShowPDPA] = useState(false)

  useEffect(() => {
    // ตรวจสอบว่ายอมรับ PDPA แล้วหรือยัง
    const pdpaAccepted = localStorage.getItem("vsquare_pdpa_accepted")
    if (!pdpaAccepted) {
      setShowPDPA(true)
    }

    // ตรวจสอบว่ามีข้อมูลที่กำลังแก้ไขหรือไม่
    const editingData = localStorage.getItem("editingRegistrationData")
    if (editingData) {
      const parsedData = JSON.parse(editingData) as FormData
      setFormData(parsedData)

      // เลือก tab ตามประเภทลูกค้า
      if (parsedData.isExistingCustomer) {
        setActiveTab("existing")
      } else {
        setActiveTab("new")
      }

      // ลบข้อมูลที่กำลังแก้ไขออกจาก localStorage เพื่อไม่ให้โหลดซ้ำ
      localStorage.removeItem("editingRegistrationData")
    }
  }, [])

  const handleAcceptPDPA = () => {
    localStorage.setItem("vsquare_pdpa_accepted", "true")
    setShowPDPA(false)
  }

  const handleDeclinePDPA = () => {
    router.push("/")
  }

  const isFormValid = formData.firstName && formData.lastName && formData.phone

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    setFormData({ firstName: "", lastName: "", phone: "" })
    setErrors({})
    setNotFound(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    // Clear not found error when user changes input
    if (notFound) {
      setNotFound(false)
    }
  }

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.firstName) {
      newErrors.firstName = "กรุณากรอกชื่อ"
    }

    if (!formData.lastName) {
      newErrors.lastName = "กรุณากรอกนามสกุล"
    }

    if (!formData.phone) {
      newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์"
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (activeTab === "existing") {
      // ตรวจสอบว่ามีข้อมูลในระบบหรือไม่
      const userExists = mockExistingUsers.some(
        (user) =>
          user.firstName === formData.firstName && user.lastName === formData.lastName && user.phone === formData.phone,
      )

      if (!userExists) {
        setNotFound(true)
        return
      }
    }

    // เพิ่มข้อมูลว่าเป็นลูกค้าเดิมหรือลูกค้าใหม่
    const dataToSave = {
      ...formData,
      isExistingCustomer: activeTab === "existing",
    }

    // บันทึกข้อมูลลงใน localStorage เพื่อใช้ในหน้าถัดไป
    localStorage.setItem("registrationData", JSON.stringify(dataToSave))

    // ไปยังหน้ายืนยันข้อมูล
    router.push("/register/confirm")
  }

  return (
    <div>
      {showPDPA && (
        <PDPAModal
          onAccept={handleAcceptPDPA}
          onDecline={handleDeclinePDPA}
        />
      )}
      <div className="mb-flex-center-start mb-gap-16">
        {customerTabs.map((tab) => (
          <button
            key={tab.id}
            className={`${
              activeTab === tab.id ? "customer-tab-active" : "customer-tab"
            } mb-relative mb-w-319 mb-h-121 mb-rounded-10 mb-bg-white mb-overflow-hidden`}
            onClick={() => handleTabChange(tab.id as TabType)}
          >
            <div
              className={`checkbox-container mb-absolute mb-top-0 mb-left-0 mb-flex-center mb-w-40 mb-h-40 ${
                activeTab === tab.id ? "checkbox-checked" : "checkbox-unchecked"
              }`}
            >
              {activeTab === tab.id && <CheckIcon className="mb-h-24px mb-w-31 text-white" />}
            </div>
            <p className={`customer-tab-text mb-absolute mb-contents mb-top-1-2 mb-left-1-2 mb-font-light mb-font-size-30 mb-line-12 ${
              activeTab === tab.id ? "customer-tab-text-active" : ""
            }`}>
              {tab.title}
              <br />
              {tab.subtitle}
            </p>
          </button>
        ))}
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="mb-flex mb-mt-21 mb-bg-white mb-items-stretch mb-text-center mb-justify-start mb-flex-col mb-pt-32 mb-pl-48 mb-pr-48 mb-pb-46">
          <div>
            <label htmlFor="firstName" className="mb-font-size-35 mb-font-normal">ชื่อ*</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="ชื่อ"
              className={errors.firstName ? "input-error" : ""}
            />
            {errors.firstName && <p className="error-text text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="mb-font-size-35 mb-font-normal">นามสกุล*</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="นามสกุล"
              className={errors.lastName ? "input-error" : ""}
            />
            {errors.lastName && <p className="error-text text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="mb-font-size-35 mb-font-normal">เบอร์โทรศัพท์*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="เบอร์โทรศัพท์"
              className={errors.phone ? "input-error" : ""}
            />
            {errors.phone && <p className="error-text text-sm mt-1">{errors.phone}</p>}
          </div>

          {notFound && <p className="error-text text-sm">*ไม่พบข้อมูล กรุณาตรวจสอบข้อมูลใหม่</p>}

          <button
            type="submit"
            className={isFormValid ? "btn-primary w-full" : "btn-disabled w-full"}
            disabled={!isFormValid}
          >
            {activeTab === "existing" ? "ยืนยันข้อมูล" : "ถัดไป"}
          </button>
        </div>
      </form>

      <p className="text-xs text-gray-500 mt-4">*ชื่อ - นามสกุล คือ ลูกค้าเจ้าของเบอร์ ที่มาบริการ V Square Clinic</p>
    </div>
  )
}
