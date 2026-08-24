"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { liffService } from "@/lib/liff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ButtonSubmit from "./button-submit";
import { type RegistrationSessionData } from "@/types";
import { motion } from "framer-motion";

import "@/assets/css/registerForm.css";

import spinnerUrl from "@/assets/images/spinner.svg";

interface FormData {
  lineUserId: string;
  firstName: string;
  lastName: string;
  email: string;
  telePhone: string;
  isOldCustomer: boolean;
  type: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  telePhone?: string;
  message?: string;
}

export default function RegisterForm({ isAuthenticated, isLoading, profile }: { isAuthenticated: boolean; isLoading: boolean; profile: RegistrationSessionData | null }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(profile?.type || "existing");
  const [formData, setFormData] = useState<FormData>({
    lineUserId: profile?.lineUserId || "",
    firstName: profile?.first_name || "",
    lastName: profile?.last_name || "",
    email: profile?.email || "",
    telePhone: profile?.tel_no || "",
    isOldCustomer: profile?.type === "existing",
    type: profile?.type || "existing",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (profile?.type) {
      setActiveTab(profile.type);
    }
  }, [profile?.type]);

  const customerTabs = [
    {
      id: "existing",
      title: "ลูกค้า V Square",
      subtitle: "เคยรับบริการแล้ว",
    },
    {
      id: "new",
      title: "สมัครสมาชิก",
      subtitle: "ลูกค้าใหม่",
    },
  ];

  const formFields = [
    {
      id: "firstName",
      name: "firstName",
      placeholder: "ชื่อ*",
      type: "text",
      value: "",
    },
    {
      id: "lastName",
      name: "lastName",
      placeholder: "นามสกุล*",
      type: "text",
      value: "",
    },
    {
      id: "email",
      name: "email",
      placeholder: "Email*",
      type: "email",
      value: "",
    },
    {
      id: "telePhone",
      name: "telePhone",
      placeholder: "เบอร์โทรศัพท์*",
      type: "tel",
      value: "",
    },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setFormData({
      ...formData,
      type: tabId,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // สำหรับเบอร์โทรศัพท์ให้รับเฉพาะตัวเลข
    if (name === "telePhone") {
      const numericValue = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // ลบ error message เมื่อผู้ใช้แก้ไข
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // ตรวจสอบชื่อ
    if (!formData.firstName || formData.firstName.trim() === "") {
      newErrors.firstName = "กรุณากรอกชื่อ";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร";
    }

    // ตรวจสอบนามสกุล
    if (!formData.lastName || formData.lastName.trim() === "") {
      newErrors.lastName = "กรุณากรอกนามสกุล";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร";
    }

    // ตรวจสอบอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }
    // if (!formData.email || formData.email.trim() === "") {
    //   newErrors.email = "กรุณากรอกอีเมล";
    // } else if (!emailRegex.test(formData.email)) {
    //   newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    // }

    // ตรวจสอบเบอร์โทรศัพท์
    const phoneString = formData.telePhone || "";
    if (!phoneString || phoneString === "") {
      newErrors.telePhone = "กรุณากรอกเบอร์โทรศัพท์";
    } else if (phoneString.length !== 10) {
      newErrors.telePhone = "เบอร์โทรศัพท์ต้องมี 10 หลัก";
    }
    // else if (!/^0[0-9]{9}$/.test(phoneString)) {
    //   newErrors.telePhone = "เบอร์โทรศัพท์ไม่ถูกต้อง";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isFormValid = validateForm();
    const newErrors: FormErrors = {};
    setIsSubmitted(true);

    if (!isFormValid) {
      setIsSubmitted(false);
      return;
    }

    const dataToCheck = {
      lineUserId: profile?.lineUserId,
      type: formData.type,
      is_old_customer: formData.type === "existing",
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email || null,
      tel_no: formData.telePhone,
    };

    const accessToken = await liffService.getAccessToken();

    const checkRes = await fetch("/api/user/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dataToCheck, accessToken }),
    });
    const checkResult = await checkRes.json();

    const server = checkResult?.result;
    if (server && (server.code === 422 && server.error?.field)) {
      const field = server.error?.field || null;
      if (field.first_name) newErrors.firstName = field.first_name;
      if (field.last_name) newErrors.lastName = field.last_name;
      if (field.email) newErrors.email = field.email;
      if (field.tel_no) newErrors.telePhone = field.tel_no;
      setErrors(newErrors);
      setIsSubmitted(false);
    } else if (server && (server.code === 400 && !server.error?.field)) {
      const message = server.error?.message || null;
      newErrors.message = message;
      setErrors(newErrors);
      setIsSubmitted(false);
    } else if (server && server.code === 200) {
      // const dataToStore = {
      //   lineUserId: profile?.lineUserId,
      //   firstName: formData.firstName,
      //   lastName: formData.lastName,
      //   email: formData.email || null,
      //   telePhone: formData.telePhone,
      //   profileImage: profile?.profileImage || null,
      //   type: formData.type,
      // };
      // localStorage.setItem("registrationData", JSON.stringify(dataToStore));
      sessionStorage.setItem("registrationData", JSON.stringify(dataToCheck));
      router.push("/register/confirm");
    }

    // if (isFormValid) {
    //   const dataToStore = {
    //     lineUserId: profile?.lineUserId,
    //     firstName: formData.firstName,
    //     lastName: formData.lastName,
    //     email: formData.email || null,
    //     telePhone: formData.telePhone,
    //     profileImage: profile?.profileImage || null,
    //     type: formData.type,
    //   };
    //   // localStorage.setItem("registrationData", JSON.stringify(dataToStore));
    //   sessionStorage.setItem("registrationData", JSON.stringify(dataToStore));
    //   // router.push("/register/confirm");
    // } else {
    //   setIsSubmitted(false);
    // }
  };

  const renderFormFields = () => {
    if (isLoading || isAuthenticated) {
      return (
        <div>
          {formFields.map((field) => (
            <div key={field.id} className="skeleton-animate w-555 h-86 rounded-17 mb-w-555 mb-h-86 mb-rounded-17 mb-28 mb-mb-28"></div>
          ))}
        </div>
      );
    }

    return (
      <div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{
            duration: 0.9,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.5,
          }}
          className="mb-28 mb-mb-28"
        >
          <input
            type={formFields[0].type}
            maxLength={formFields[0].type === "tel" ? 10 : undefined}
            inputMode={formFields[0].type === "tel" ? "numeric" : undefined}
            pattern={formFields[0].type === "tel" ? "\\d{0,10}" : undefined}
            id={formFields[0].id}
            name={formFields[0].name}
            value={formData[formFields[0].name as keyof FormData] as string || ""}
            onChange={handleInputChange}
            placeholder={formFields[0].placeholder}
            className={`register-form-input text-left w-555 h-86 rounded-17 mb-w-555 mb-h-86 mb-rounded-17 pl-40 mb-pl-40 pr-40 mb-pr-40 font-normal text-color-blue-deep font-size-30 mb-font-size-30 ${errors[formFields[0].name as keyof FormErrors] ? "input-error text-input-error" : ""}`}
            disabled={isSubmitted}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{
            duration: 0.9,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.6,
          }}
          className="mb-28 mb-mb-28"
        >
          <input
            type={formFields[1].type}
            maxLength={formFields[1].type === "tel" ? 10 : undefined}
            inputMode={formFields[1].type === "tel" ? "numeric" : undefined}
            pattern={formFields[1].type === "tel" ? "\\d{0,10}" : undefined}
            id={formFields[1].id}
            name={formFields[1].name}
            value={formData[formFields[1].name as keyof FormData] as string || ""}
            onChange={handleInputChange}
            placeholder={formFields[1].placeholder}
            className={`register-form-input text-left w-555 h-86 rounded-17 mb-w-555 mb-h-86 mb-rounded-17 pl-40 mb-pl-40 pr-40 mb-pr-40 font-normal text-color-blue-deep font-size-30 mb-font-size-30 ${errors[formFields[1].name as keyof FormErrors] ? "input-error text-input-error" : ""}`}
            disabled={isSubmitted}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{
            duration: 0.9,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.7,
          }}
          className="mb-28 mb-mb-28"
        >
          <input
            type={formFields[2].type}
            maxLength={formFields[2].type === "tel" ? 10 : undefined}
            inputMode={formFields[2].type === "tel" ? "numeric" : undefined}
            pattern={formFields[2].type === "tel" ? "\\d{0,10}" : undefined}
            id={formFields[2].id}
            name={formFields[2].name}
            value={formData[formFields[2].name as keyof FormData] as string || ""}
            onChange={handleInputChange}
            placeholder={formFields[2].placeholder}
            className={`register-form-input text-left w-555 h-86 rounded-17 mb-w-555 mb-h-86 mb-rounded-17 pl-40 mb-pl-40 pr-40 mb-pr-40 font-normal text-color-blue-deep font-size-30 mb-font-size-30 ${errors[formFields[2].name as keyof FormErrors] ? "input-error text-input-error" : ""}`}
            disabled={isSubmitted}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{
            duration: 0.9,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.8,
          }}
          className="mb-28 mb-mb-28"
        >
          <input
            type={formFields[3].type}
            maxLength={formFields[3].type === "tel" ? 10 : undefined}
            inputMode={formFields[3].type === "tel" ? "numeric" : undefined}
            pattern={formFields[3].type === "tel" ? "\\d{0,10}" : undefined}
            id={formFields[3].id}
            name={formFields[3].name}
            value={formData[formFields[3].name as keyof FormData] as string || ""}
            onChange={handleInputChange}
            placeholder={formFields[3].placeholder}
            className={`register-form-input text-left w-555 h-86 rounded-17 mb-w-555 mb-h-86 mb-rounded-17 pl-40 mb-pl-40 pr-40 mb-pr-40 font-normal text-color-blue-deep font-size-30 mb-font-size-30 ${errors[formFields[3].name as keyof FormErrors] ? "input-error text-input-error" : ""}`}
            disabled={isSubmitted}
          />
        </motion.div>
        {/* {formFields.map((field, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ 
              type: "spring",
              duration: 0.6,
              stiffness: 200,
              damping: 20,
              delay: 0.1 * index,
            }}
            key={field.id} 
            className="mb-28 mb-mb-28"
          >
            <input
              type={field.type}
              maxLength={field.type === "tel" ? 10 : undefined}
              inputMode={field.type === "tel" ? "numeric" : undefined}
              pattern={field.type === "tel" ? "\\d{0,10}" : undefined}
              id={field.id}
              name={field.name}
              value={formData[field.name as keyof FormData] as string || ""}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              className={`register-form-input text-left w-555 h-86 rounded-17 mb-w-555 mb-h-86 mb-rounded-17 pl-40 mb-pl-40 pr-40 mb-pr-40 font-normal text-color-blue-deep font-size-30 mb-font-size-30 ${errors[field.name as keyof FormErrors] ? "input-error text-input-error" : ""}`}
            />
          </motion.div>
        ))} */}
      </div>
    );
  };

  const TabButton = () => {
    if (isLoading || isAuthenticated) {
      return (
        <div className="flex-center gap-16 mb-gap-16">
          {customerTabs.map((item) => (
            <div key={item.id} className="skeleton-animate w-319 h-121 mb-w-319 mb-h-121 overflow-hidden rounded-10 mb-rounded-10"></div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex-center gap-16 mb-gap-16">
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{
            duration: 0.9,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.3,
          }}
          className={`customer-tab w-319 h-121 mb-w-319 mb-h-121 relative bg-white overflow-hidden rounded-10 mb-rounded-10 line-13 ${activeTab === "existing" ? "customer-tab-active" : ""}`}
          onClick={() => handleTabChange("existing")}
          disabled={isSubmitted}
        >
          <div className={`checkbox-container absolute flex-center top-0 left-0 w-40 h-40 mb-top-0 mb-left-0 mb-w-40 mb-h-40 ${activeTab === "existing" ? "checkbox-checked" : "checkbox-unchecked"}`}>
            {activeTab === "existing" && (
              <FontAwesomeIcon icon={faCheck} className="font-size-30 mb-font-size-30" />
            )}
          </div>
          <p className={`flex-center line-12 font-size-30 mb-font-size-30 ${activeTab === "existing" ? "text-color-blue font-normal" : "text-color-gray-mid font-light"}`}>
            {customerTabs[0].title}
            <br />
            {customerTabs[0].subtitle}
          </p>
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{
            duration: 0.9,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.4,
          }}
          className={`customer-tab w-319 h-121 mb-w-319 mb-h-121 relative bg-white overflow-hidden rounded-10 mb-rounded-10 line-13 ${activeTab === "new" ? "customer-tab-active" : ""}`}
          onClick={() => handleTabChange("new")}
          disabled={isSubmitted}
        >
          <div className={`checkbox-container absolute flex-center top-0 left-0 w-40 h-40 mb-top-0 mb-left-0 mb-w-40 mb-h-40 ${activeTab === "new" ? "checkbox-checked" : "checkbox-unchecked"}`}>
            {activeTab === "new" && (
              <FontAwesomeIcon icon={faCheck} className="font-size-30 mb-font-size-30" />
            )}
          </div>
          <p className={`customer-tab-text absolute contents line-12 top-1-2 left-1-2 font-size-30 mb-top-1-2 mb-left-1-2 mb-font-size-30 ${activeTab === "new" ? "customer-tab-active text-color-blue font-normal" : "text-color-gray-mid font-light"}`}>
            {customerTabs[1].title}
            <br />
            {customerTabs[1].subtitle}
          </p>
        </motion.button>
        {/* {customerTabs.map((item, index) => (
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ 
              type: "spring",
              duration: 0.6,
              stiffness: 200,
              damping: 20,
              delay: 0.1 * index,
            }}
            key={item.id} 
            className={`customer-tab w-319 h-121 mb-w-319 mb-h-121 relative bg-white overflow-hidden rounded-10 mb-rounded-10 line-13 ${activeTab === item.id ? "customer-tab-active" : ""}`} 
            onClick={() => handleTabChange(item.id)}
          >
            <div className={`checkbox-container absolute flex-center top-0 left-0 w-40 h-40 mb-top-0 mb-left-0 mb-w-40 mb-h-40 ${activeTab === item.id ? "checkbox-checked" : "checkbox-unchecked"}`}>
              {activeTab === item.id && (
                <FontAwesomeIcon icon={faCheck} className="font-size-30 mb-font-size-30" />
              )}
            </div>
            <p className={`customer-tab-text absolute contents line-12 top-1-2 left-1-2 font-size-30 mb-top-1-2 mb-left-1-2 mb-font-size-30 ${activeTab === item.id ? "customer-tab-active text-color-blue font-normal" : "text-color-gray-mid font-light"}`}>
              {item.id === "existing" ? (
                <>
                  ลูกค้า <span className={`${activeTab === "existing" ? "font-gotham-medium font-medium font-size-28 mb-font-size-28" : "font-kanit font-light font-size-30 mb-font-size-30"}`}>V Square</span>
                </>
              ) : (
                item.title
              )}
              <br/>
              {item.subtitle}
            </p>
          </motion.button>
        ))} */}
      </div>
    );
  };

  if (isLoading || isAuthenticated) {
    return (
      <div>
        {TabButton()}
        <div className="register-form flex-start-center flex-col">
          <div className="bg-white flex-start-center text-center flex-col w-651 mb-w-651 mt-40 pt-77 pb-54 rounded-10 mb-mt-40 mb-pt-77 mb-pb-54 mb-rounded-10">
            {renderFormFields()}
          </div>
          <div className="h-82 mb-h-82 flex-center flex-col text-exceeds-w-box"></div>
          <div className="skeleton-animate w-553 h-81 mb-w-553 mb-h-81 rounded-17 mb-rounded-17"></div>
        </div>

        <div className="relative flex-center-start w-full mt-39 mb-65 mb-mt-39 mb-mb-65">
          <div className="skeleton-animate w-680 h-46 rounded-4 mb-w-680 mb-h-46 mb-rounded-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {TabButton()}
      <form className="register-form flex-start-center flex-col" onSubmit={handleSubmit}>
        <div className="bg-white flex-start-center text-center flex-col w-651 mb-w-651 mt-40 pt-77 pb-54 rounded-10 mb-mt-40 mb-pt-77 mb-pb-54 mb-rounded-10">
          {renderFormFields()}
        </div>
        <div className="h-82 mb-h-82 flex-center flex-col text-exceeds-w-box">
          {Object.keys(errors).length > 0 && (
            <p className="text-error font-normal font-size-28 mb-font-size-28">
              {Object.values(errors)[0]}
            </p>
          )}
        </div>
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{
            duration: 0.9,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.9,
          }}
          className={`flex-center font-light font-kanit font-size-30 mb-font-size-30 rounded-17 mb-rounded-17 w-553 h-81 mb-w-553 mb-h-81 ${isSubmitted || !formData.firstName || !formData.lastName || !formData.email || !formData.telePhone ? "text-color-white-light bg-color-gray-soft" : "text-color-white-light bg-color-blue"}`}
          type="submit"
          disabled={isSubmitted || !formData.firstName || !formData.lastName || !formData.email || !formData.telePhone}
        >
          {isSubmitted ? (
            <>
              <Image
                width={36}
                height={36}
                src={spinnerUrl.src}
                alt="spinner"
                className="w-36 h-36 mr-15 mb-w-36 mb-h-36 mb-mr-15"
              />
              {/* <img src={spinnerUrl.src} alt="spinner" className="w-36 h-36 mr-15 mb-w-36 mb-h-36 mb-mr-15" /> */}
              กำลังดำเนินการ...
            </>
          ) : (
            <>ถัดไป</>
          )}
        </motion.button>
        {/* <ButtonSubmit
          type="submit"
          variant={!isSubmitted && formData.firstName && formData.lastName && formData.email && formData.telePhone ? "blue_bg" : "gray_bg"}
          className={`w-553 h-81 mb-w-553 mb-h-81`}
          isDisabled={isSubmitted || !formData.firstName || !formData.lastName || !formData.email || !formData.telePhone}
        >
          ถัดไป
        </ButtonSubmit> */}
      </form>

      <motion.div
        // initial={{ opacity: 0, y: 20, x: "-50%" }}
        // whileInView={{ opacity: 1, y: 0, x: "-50%" }}
        // viewport={{ once: true }}
        // transition={{ 
        //   duration: 0.9,
        //   ease: [0.17, 0.55, 0.55, 1],
        // }}
        initial={{ opacity: 0, y: 40, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        exit={{ opacity: 0, y: 40, x: "-50%" }}
        transition={{
          duration: 0.9,
          ease: [0.17, 0.55, 0.55, 1],
          delay: 1
        }}
        className="text-exceeds-w-box relative left-1-2 translate-x--1-2 flex-start-center flex-col font-size-26 mt-35 mb-mt-35">
        <p className="text-center text-color-blue-deep font-light font-size-26 mb-font-size-26">
          *ชื่อ–นามสกุล ไม่ถูกต้องโปรดแจ้งได้ที่หน้าสาขา{" "}
          <span className="font-gotham-book font-normal font-size-24 mb-font-size-24">
            V Square Clinic
          </span>
        </p>
      </motion.div>
    </div>
  );
}
