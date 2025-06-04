"use client"

import type React from "react"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { useRouter } from "next/navigation"
import { CheckIcon, InfoIcon } from "lucide-react"
import PDPAModal from "./pdpa-modal"
import ButtonSubmit from "./button-submit"

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
  const [isTabLoading, setIsTabLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [notFound, setNotFound] = useState(false)
  const [showPDPA, setShowPDPA] = useState(false)
  const [notFoundFields, setNotFoundFields] = useState<string[]>([])
  const [isDataMismatch, setIsDataMismatch] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

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

  const handleTabChange = useCallback((tab: TabType) => {
    // ป้องกันการ scroll อัตโนมัติ
    const currentScroll = window.scrollY
    
    // อัพเดท state โดยไม่ใช้ transition
    setActiveTab(tab)
    setErrors({})
    setNotFound(false)
    setNotFoundFields([])
    setIsDataMismatch(false)

    // ป้องกันการ scroll อัตโนมัติ
    requestAnimationFrame(() => {
      window.scrollTo({
        top: currentScroll,
        behavior: 'instant'
      })
    })
  }, [])

  const isFormValid = useMemo(() => {
    if (activeTab === "new") {
      return formData.phone.length === 10
    }
    // สำหรับลูกค้าเดิม ต้องกรอกข้อมูลครบทุกช่อง
    return formData.firstName.trim() !== "" && 
           formData.lastName.trim() !== "" && 
           formData.phone.length === 10
  }, [activeTab, formData.firstName, formData.lastName, formData.phone])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "")
      setFormData((prev) => ({ ...prev, [name]: numericValue }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

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
    const errorMessages: string[] = []

    if (activeTab === "new") {
      // ตรวจสอบความถูกต้องของเบอร์โทรศัพท์
      if (!formData.phone) {
        newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์"
        errorMessages.push("เบอร์โทรศัพท์")
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก"
        errorMessages.push("เบอร์โทรศัพท์")
      } else {
        // ตรวจสอบความซ้ำซ้อนของข้อมูล
        const existingPhone = mockExistingUsers.some(user => user.phone === formData.phone)
        const existingName = mockExistingUsers.some(
          user => user.firstName === formData.firstName && user.lastName === formData.lastName
        )
        const existingAll = mockExistingUsers.some(
          user => 
            user.firstName === formData.firstName && 
            user.lastName === formData.lastName && 
            user.phone === formData.phone
        )

        if (existingAll) {
          newErrors.phone = "ข้อมูลนี้ถูกใช้งานแล้ว"
          errorMessages.push("ข้อมูลนี้ถูกใช้งานแล้ว")
        } else if (existingName) {
          newErrors.phone = "ชื่อและนามสกุลถูกใช้งานแล้ว"
          errorMessages.push("ชื่อและนามสกุลถูกใช้งานแล้ว")
        } else if (existingPhone) {
          newErrors.phone = "เบอร์โทรศัพท์ถูกใช้งานแล้ว"
          errorMessages.push("เบอร์โทรศัพท์ถูกใช้งานแล้ว")
        }
      }
    } else {
      // ตรวจสอบทุกฟิลด์สำหรับลูกค้าเดิม
      if (!formData.firstName) {
        newErrors.firstName = "กรุณากรอกชื่อ"
        errorMessages.push("ชื่อ")
      }
      if (!formData.lastName) {
        newErrors.lastName = "กรุณากรอกนามสกุล"
        errorMessages.push("นามสกุล")
      }
      if (!formData.phone) {
        newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์"
        errorMessages.push("เบอร์โทรศัพท์")
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก"
        errorMessages.push("เบอร์โทรศัพท์")
      }
    }

    setErrors(newErrors)
    
    // ถ้ามี error ให้แสดงข้อความรวม
    if (errorMessages.length > 0) {
      setNotFoundFields(errorMessages)
      setNotFound(true)
      setIsDataMismatch(false)
    }

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (activeTab === "existing") {
      // ตรวจสอบว่ามีข้อมูลในระบบหรือไม่
      const notFound: string[] = []
      
      if (!mockExistingUsers.some(user => user.firstName === formData.firstName)) {
        notFound.push("ชื่อ")
      }
      if (!mockExistingUsers.some(user => user.lastName === formData.lastName)) {
        notFound.push("นามสกุล")
      }
      if (!mockExistingUsers.some(user => user.phone === formData.phone)) {
        notFound.push("เบอร์โทรศัพท์")
      }

      if (notFound.length > 0) {
        setNotFoundFields(notFound)
        setNotFound(true)
        setIsDataMismatch(false)
        return
      }

      // ตรวจสอบความถูกต้องของข้อมูล
      const isDataValid = mockExistingUsers.some(
        user => 
          user.firstName === formData.firstName && 
          user.lastName === formData.lastName && 
          user.phone === formData.phone
      )

      if (!isDataValid) {
        setIsDataMismatch(true)
        setNotFound(false)
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

  const renderFormFields = () => {
    const formFields = [
      {
        id: "firstName",
        name: "firstName",
        label: "ชื่อ*",
        placeholder: "ชื่อ",
        type: "text",
        value: formData.firstName,
        error: errors.firstName || notFoundFields.includes("ชื่อ") || isDataMismatch
      },
      {
        id: "lastName",
        name: "lastName",
        label: "นามสกุล*",
        placeholder: "นามสกุล",
        type: "text",
        value: formData.lastName,
        error: errors.lastName || notFoundFields.includes("นามสกุล") || isDataMismatch
      },
      {
        id: "phone",
        name: "phone",
        label: "เบอร์โทรศัพท์*",
        placeholder: "เบอร์โทรศัพท์",
        type: "tel",
        value: formData.phone,
        error: errors.phone || notFoundFields.includes("เบอร์โทรศัพท์") || isDataMismatch
      }
    ]

    return (
      <div>
        {formFields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="font-size-35 mb-font-size-35 font-normal">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.name}
              value={field.value}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              className={`register-form-input text-color-blue font-normal text-center w-557 h-88 rounded-17 font-size-35 mb-w-557 mb-h-88 mb-rounded-17 mb-font-size-35 ${
                field.error ? "input-error" : ""
              }`}
            />
          </div>
        ))}
      </div>
    )
  }

  const TabButton = useMemo(() => {
    return ({ tab }: { tab: typeof customerTabs[0] }) => (
      <button
        key={tab.id}
        className={`${
          activeTab === tab.id ? "customer-tab-active" : "customer-tab"
        } relative bg-white overflow-hidden w-319 h-121 rounded-10 mb-w-319 mb-h-121 mb-rounded-10`}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleTabChange(tab.id as TabType)
        }}
      >
        <div
          className={`checkbox-container absolute flex-center top-0 left-0 w-40 h-40 mb-top-0 mb-left-0 mb-w-40 mb-h-40 ${
            activeTab === tab.id ? "checkbox-checked" : "checkbox-unchecked"
          }`}
        >
          {activeTab === tab.id && <CheckIcon className="text-white" />}
        </div>
        <p className={`customer-tab-text absolute contents line-12 font-light top-1-2 left-1-2 font-size-30 mb-top-1-2 mb-left-1-2  mb-font-size-30  ${
          activeTab === tab.id ? "customer-tab-text-active" : ""
        }`}>
          {tab.title}
          <br />
          {tab.subtitle}
        </p>
      </button>
    )
  }, [activeTab, handleTabChange])

  return (
    <div>
      {showPDPA && (
        <PDPAModal
          onAccept={handleAcceptPDPA}
          onDecline={handleDeclinePDPA}
        />
      )}
      <div className="flex-center-start gap-16 mb-gap-16">
        {customerTabs.map((tab) => (
          <TabButton key={tab.id} tab={tab} />
        ))}
      </div>

      <form ref={formRef} className="register-form flex-start-center flex-col" onSubmit={handleSubmit}>
        <div className="bg-white flex-start-center text-center flex-col mt-21 pt-32 pl-48 pr-48 pb-46 rounded-10 mb-mt-21 mb-pt-32 mb-pl-48 mb-pr-48 mb-pb-46 mb-rounded-10">
          {renderFormFields()}
        </div>
        <div className="text-center h-64 mb-h-64 flex-center flex-col">
          {activeTab === "new" && errors.phone && (
            <p className="text-error text-sm">
              *{errors.phone}
            </p>
          )}
          {activeTab === "existing" && notFound && (
            <p className="text-error text-sm">
              *ไม่พบข้อมูล "{notFoundFields.length > 1 ? notFoundFields.slice(0, -1).join(", ") + " และ " + notFoundFields.slice(-1) : notFoundFields[0]}" กรุณากรอกข้อมูลใหม่
            </p>
          )}
          {activeTab === "existing" && isDataMismatch && (
            <p className="text-error text-sm">
              *ข้อมูลไม่ตรงกัน กรุณากรอกข้อมูลใหม่
            </p>
          )}
        </div>
        <ButtonSubmit
          type="submit"
          variant={isFormValid ? "blue_bg" : "gray_bg"}
          className={`w-553 h-84 mb-w-553 mb-h-84 ${activeTab === "new" ? "mb-84 mb-mb-84" : ""}`}
          isDisabled={!isFormValid}
        >
          {activeTab === "existing" ? "ยืนยันข้อมูล" : "ถัดไป"}
        </ButtonSubmit>
      </form>

      {activeTab === "existing" && (
        <p className="text-exceeds-w-box relative text-center text-color-blue-deep font-light top-0 left-1-2 font-size-26 mt-24 mb-26 mb-top-0 mb-left-1-2  mb-font-size-26 mb-mt-24 mb-mb-26">
          *ชื่อ – นามสกุล ผิด ลูกค้าแจ้งแก้ไขได้ ที่หน้าสาขา V Square Clinic
        </p>
      )}

    </div>
  )
}
