"use client"

import type React from "react"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { useRouter } from "next/navigation"
import { CheckIcon, InfoIcon } from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import PDPAModal from "./pdpa-modal"
import ButtonSubmit from "./button-submit"

type TabType = "existing" | "new"
type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  isExistingCustomer?: boolean // เพิ่มฟิลด์เพื่อระบุว่าเป็นลูกค้าเดิมหรือลูกค้าใหม่
  isPDPAAccepted?: boolean // เพิ่มฟิลด์สำหรับสถานะการยอมรับ PDPA
}

// จำลองข้อมูลผู้ใช้ที่มีอยู่ในระบบ
const mockExistingUsers = [
  {
    firstName: "สมชาย",
    lastName: "รักเรียน",
    email: "somchai@example.com",
    phone: "0812345678"
  },
  {
    firstName: "สมหญิง",
    lastName: "รักเรียน",
    email: "somying@example.com",
    phone: "0898765432"
  },

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

interface RegistrationFormProps {
  onTabChange: (tab: TabType) => void
  isPDPAAccepted: boolean
}

export default function RegistrationForm({ onTabChange, isPDPAAccepted }: RegistrationFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>("existing")
  const [isTabLoading, setIsTabLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [notFound, setNotFound] = useState(false)
  const [showPDPA, setShowPDPA] = useState(false)
  const [notFoundFields, setNotFoundFields] = useState<string[]>([])
  const [isDataMismatch, setIsDataMismatch] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
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

  const handleTabChange = useCallback((tab: TabType) => {
    // ป้องกันการ scroll อัตโนมัติ
    const currentScroll = window.scrollY
    
    // อัพเดท state โดยไม่ใช้ transition
    setActiveTab(tab)
    onTabChange(tab)
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
  }, [onTabChange])

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
      // จำกัดให้กรอกได้แค่ตัวเลข และจำกัดความยาวไม่เกิน 10 หลัก
      const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10)
      setFormData((prev) => ({ ...prev, [name]: numericValue }))
    } else if (name === "firstName" || name === "lastName") {
      // จำกัดให้กรอกได้แค่ตัวอักษร (ไทยและอังกฤษ) เท่านั้น ไม่รวมเว้นวรรคและอักษรพิเศษ
      const alphabeticValue = value.replace(/[^a-zA-Z\u0E00-\u0E7F]/g, "")
      setFormData((prev) => ({ ...prev, [name]: alphabeticValue }))
    }
    else {
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
      // ตรวจสอบความถูกต้องของ Email
      if (!formData.firstName) {
        newErrors.firstName = "กรุณากรอกชื่อ"
        errorMessages.push("ชื่อ")
      }
      if (!formData.lastName) {
        newErrors.lastName = "กรุณากรอกนามสกุล"
        errorMessages.push("นามสกุล")
      }
      if (!formData.email) {
        newErrors.email = "กรุณากรอก Email"
        errorMessages.push("Email")
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "รูปแบบ Email ไม่ถูกต้อง"
        errorMessages.push("Email")
      }

      // ตรวจสอบความถูกต้องของเบอร์โทรศัพท์
      if (!formData.phone) {
        newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์"
        errorMessages.push("เบอร์โทรศัพท์")
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก"
        errorMessages.push("เบอร์โทรศัพท์")
      } else {
        // ตรวจสอบความซ้ำซ้อนของข้อมูล ตามเงื่อนไขที่ผู้ใช้กำหนด
        const existingPhone = mockExistingUsers.some(user => user.phone === formData.phone)
        const existingEmail = mockExistingUsers.some(user => user.email === formData.email)
        const existingName = mockExistingUsers.some(
          user => user.firstName === formData.firstName && user.lastName === formData.lastName
        )
        const existingAll = mockExistingUsers.some(
          user => 
            user.firstName === formData.firstName && 
            user.lastName === formData.lastName && 
            user.phone === formData.phone &&
            user.email === formData.email
        )

        // *** เงื่อนไขการตรวจสอบข้อมูลซ้ำเมื่อ activeTab === "new" ตามที่ผู้ใช้กำหนด ***

        // กรณีที่ 2: เบอร์โทรศัพท์ซ้ำเพียงอย่างเดียว (ชื่อ-นามสกุล และ Email ไม่ซ้ำ)
        if (existingPhone && !existingName && !existingEmail) {
            newErrors.phone = "เบอร์โทรศัพท์นี้ถูกใช้ไปแล้ว กรุณาติดต่อสาขาที่ท่านใช้บริการ";
            // เพิ่มเฉพาะข้อความรวมสำหรับกรณีนี้ หากยังไม่มีข้อความนี้อยู่ใน list
            if (errorMessages.indexOf("เบอร์โทรศัพท์นี้ถูกใช้ไปแล้ว กรุณาติดต่อสาขาที่ท่านใช้บริการ") === -1) {
               errorMessages.push("เบอร์โทรศัพท์นี้ถูกใช้ไปแล้ว กรุณาติดต่อสาขาที่ท่านใช้บริการ");
            }
        }
        // กรณีที่ 1: ข้อมูลซ้ำกับในระบบ (เงื่อนไขอื่นๆ ที่นอกเหนือจากกรณีที่ 2)
        else if (existingAll || existingEmail || existingName) {
            const errorMessage = "ข้อมูลซ้ำกับในระบบ กรุณากรอกข้อมูลใหม่อีกครั้ง";
            // ตั้งค่า error สำหรับ fields ที่ซ้ำจริงในกลุ่มนี้ เพื่อให้ไฮไลท์
            if (existingName || existingAll) {
                newErrors.firstName = errorMessage;
                newErrors.lastName = errorMessage;
            }
            if (existingEmail || existingAll) {
                newErrors.email = errorMessage;
            }
             // เพิ่มเงื่อนไขนี้เพื่อให้เบอร์โทรศัพท์ถูกไฮไลท์ เมื่อเบอร์โทรศัพท์ซ้ำและเข้าเงื่อนไขกรณีที่ 1
             if (existingPhone && (existingName || existingEmail || existingAll)) {
                 newErrors.phone = errorMessage;
             }


            // เพิ่มเฉพาะข้อความรวมสำหรับกรณีนี้ หากยังไม่มีข้อความนี้อยู่ใน list
            if (errorMessages.indexOf(errorMessage) === -1) {
               errorMessages.push(errorMessage);
            }
        }
         // สิ้นสุดเงื่อนไขการตรวจสอบข้อมูลซ้ำ

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
      if (!formData.email) {
        newErrors.email = "กรุณากรอก Email"
        errorMessages.push("Email")
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "รูปแบบ Email ไม่ถูกต้อง"
        errorMessages.push("Email")
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
    } else {
      // Clear errors if no errors were found
      setNotFoundFields([]);
      setNotFound(false);
      setIsDataMismatch(false);
    }

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      // If validation fails, set notFound and notFoundFields based on errors
      return;
    }

    if (activeTab === "existing") {
      // *** START: Initial check if each individual field value exists in the system ***
      const notFound: string[] = [];
      const hasFirstName = mockExistingUsers.some(user => user.firstName === formData.firstName);
      const hasLastName = mockExistingUsers.some(user => user.lastName === formData.lastName);
      const hasEmail = mockExistingUsers.some(user => user.email === formData.email);
      const hasPhone = mockExistingUsers.some(user => user.phone === formData.phone);

      if (!hasFirstName) notFound.push("ชื่อ");
      if (!hasLastName) notFound.push("นามสกุล");
      if (!hasEmail) notFound.push("Email");
      if (!hasPhone) notFound.push("เบอร์โทรศัพท์");

      if (notFound.length > 0) {
        setNotFoundFields(notFound);
        setNotFound(true);
        setIsDataMismatch(false);
        return; // Stop here if any field value is not found in the system at all
      }
      // *** END: Initial check ***

      // --- Logic below runs only if all individual fields exist in the system ---
      // Find if any user matches ALL four fields
      const foundUser = mockExistingUsers.find(
        user =>
          user.firstName === formData.firstName &&
          user.lastName === formData.lastName &&
          user.email === formData.email &&
          user.phone === formData.phone
      );

      if (foundUser) {
        // If user found, proceed
        const dataToSave = {
          ...formData,
          isExistingCustomer: true,
        };
        localStorage.setItem("registrationData", JSON.stringify(dataToSave));
        router.push("/register/confirm");
      } else {
        // If user not found with all fields matching, check specific mismatch cases

        // Case: Name, Email match, but Phone doesn't match that specific user
        const nameEmailMatchButPhoneMismatch = mockExistingUsers.some(
          user =>
            user.firstName === formData.firstName &&
            user.lastName === formData.lastName &&
            user.email === formData.email &&
            user.phone !== formData.phone
        );

        if (nameEmailMatchButPhoneMismatch) {
          setNotFoundFields(["เบอร์โทรศัพท์ถูกใช้ไปแล้ว กรุณาติดต่อสาขาที่ท่านใช้บริการ"]);
          setNotFound(true);
          setIsDataMismatch(false);
        } else {
          // This else block should ideally not be reached if the initial check passes
          // but as a fallback, we can keep the data mismatch error if needed.
          // For now, we expect the initial check or the specific mismatch cases to handle all scenarios
           setNotFoundFields(["ข้อมูลไม่ตรงกัน กรุณากรอกข้อมูลใหม่"]);
           setNotFound(true);
           setIsDataMismatch(true);
        }
      }
      return; // Exit handleSubmit after handling existing user checks
    }

    // Logic for activeTab === "new" remains below

    // Add isExistingCustomer flag for new users
    const dataToSave = {
      ...formData,
      isExistingCustomer: false, // This will be false for new users
    }

    // Save data to localStorage for next page
    localStorage.setItem("registrationData", JSON.stringify(dataToSave))

    // Navigate to confirmation page
    router.push("/register/confirm")
  }

  const renderFormFields = () => {
    const formFields = [
      {
        id: "firstName",
        name: "firstName",
        placeholder: "ชื่อ*",
        type: "text",
        value: formData.firstName,
      },
      {
        id: "lastName",
        name: "lastName",
        placeholder: "นามสกุล*",
        type: "text",
        value: formData.lastName,
      },
      {
        id: "email",
        name: "email",
        placeholder: "Email*",
        type: "email",
        value: formData.email,
      },
      {
        id: "phone",
        name: "phone",
        placeholder: "เบอร์โทรศัพท์*",
        type: "tel",
        value: formData.phone,
      }
    ]

    return (
      <div>
        {formFields.map((field) => {
          // Determine the error state for the current field
          let hasError = false;
          if (errors[field.name as keyof FormData]) {
            hasError = true; // Field has a specific validation error
          } else if (activeTab === "existing") {
            // Check existing user specific errors
            if (notFoundFields.includes(field.placeholder.replace("*", ""))) {
              hasError = true; // Data not found for this field
            } else if (notFound && notFoundFields[0]?.includes("ถูกใช้ไปแล้ว") && field.name === "phone") {
              hasError = true; // Phone used error specific to phone field
            }
          } else if (activeTab === "new") {
            // Check new user specific errors (primarily duplicate checks handled in validateForm)
            if (notFound && notFoundFields.includes(field.placeholder.replace("*", ""))) {
              hasError = true; // Error indicated for this field in notFoundFields
            }
          }

          return (
            <div key={field.id} className="mb-28 mb-mb-28">
              <input
                type={field.type}
                id={field.id}
                name={field.name}
                value={field.value}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                className={`register-form-input text-left w-555 h-86 rounded-17 mb-w-555 mb-h-86 mb-rounded-17 pl-40 mb-pl-40 pr-40 mb-pr-40 ${
                  hasError
                    ? "input-error text-input-error font-normal font-size-35 mb-font-size-35"
                    : field.value
                      ? (field.name === "email" ? "font-normal text-color-blue font-size-35 mb-font-size-35" : "font-normal text-color-blue font-size-35 mb-font-size-35") 
                      : (field.name === "email" ? "font-gotham text-color-gray-mid font-normal font-size-30 mb-font-size-30" : "font-light text-color-gray-mid font-size-30 mb-font-size-30")
                }`}
              />
            </div>
          );
        })}
      </div>
    );
  }

  const TabButton = useMemo(() => {
    return ({ tab }: { tab: typeof customerTabs[0] }) => (
      <button
        key={tab.id}
        className={`${
          activeTab === tab.id ? "customer-tab-active w-321 h-123 mb-w-321 mb-h-123" : "customer-tab w-319 h-121 mb-w-319 mb-h-121"
        } relative bg-white overflow-hidden rounded-10 mb-rounded-10 line-13`}
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
          {activeTab === tab.id && <FontAwesomeIcon icon={faCheck} className="font-size-30 mb-font-size-30" />}
        </div>
        <p className={`customer-tab-text absolute contents line-12  top-1-2 left-1-2 font-size-30 mb-top-1-2 mb-left-1-2 mb-font-size-30  ${
          activeTab === tab.id ? "customer-tab-active text-color-blue font-normal" : "text-color-gray-mid font-light"
        }`}>
          {tab.id === "existing" ? (
            <>
              ลูกค้า <span className={`${activeTab === "existing" ? "font-gotham font-medium font-size-28 mb-font-size-28" : "font-kanit font-light font-size-30 mb-font-size-30"}`}>V Square</span>
            </>
          ) : (
            tab.title
          )}
          <br />
          {tab.subtitle}
        </p>
      </button>
    )
  }, [activeTab, handleTabChange])

  return (
    <div>
      <div className="flex-center gap-16 mb-gap-16">
        {customerTabs.map((tab) => (
          <TabButton key={tab.id} tab={tab} />
        ))}
      </div>

      <form ref={formRef} className="register-form flex-start-center flex-col" onSubmit={handleSubmit}>
        <div className="bg-white flex-start-center text-center flex-col w-651 mb-w-651 mt-22 pt-77 pb-54 rounded-10 mb-mt-22 mb-pt-77 mb-pb-54 mb-rounded-10">
          {renderFormFields()}
        </div>
        <div className="h-82 mb-h-82 flex-center flex-col text-exceeds-w-box">
          {activeTab === "existing" && notFound && (
            <p className="text-error font-normal font-size-28 mb-font-size-28">
              {notFoundFields[0]?.includes("ถูกใช้ไปแล้ว") 
                ? `*${notFoundFields[0]}`
                : `*ไม่พบข้อมูลนี้ กรุณากรอกข้อมูลใหม่อีกครั้ง`}
            </p>
          )}
          {activeTab === "existing" && isDataMismatch && (
            <p className="text-error font-normal font-size-28 mb-font-size-28">
              *ข้อมูลไม่ตรงกัน กรุณากรอกข้อมูลใหม่
            </p>
          )}
          {activeTab === "new" && notFound && notFoundFields.length > 0 && (
            <p className="text-error font-normal font-size-28 mb-font-size-28">
              *{notFoundFields[0]}
            </p>
          )}
        </div>
        <ButtonSubmit
          type="submit"
          variant={isFormValid ? "blue_bg" : "gray_bg"}
          className={`w-553 h-81 mb-w-553 mb-h-81 ${activeTab === "new" ? "mb-131 mb-mb-131" : ""}`}
          isDisabled={!isFormValid}
        >
          ถัดไป
        </ButtonSubmit>
      </form>

      {activeTab === "existing" && (
        <p className="text-exceeds-w-box translateX-minus-1-2 relative text-center text-color-blue-deep font-light top-0 left-1-2 font-size-26 mt-35 mb-60 mb-top-0 mb-left-1-2  mb-font-size-26 mb-mt-35 mb-mb-60">
          *ชื่อ – นามสกุล ผิด ลูกค้าแจ้งแก้ไขได้ ที่หน้าสาขา <span className="font-gotham font-size-24 mb-font-size-24 font-normal">V Square Clinic</span>
        </p>
      )}

    </div>
  )
}
