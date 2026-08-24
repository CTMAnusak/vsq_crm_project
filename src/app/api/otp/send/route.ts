import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { telephone } = body;

  if (!telephone) {
    return NextResponse.json({ message: "Phone number is required" }, { status: 400 });
  }

  try {
    const response = await axios.post("https://portal-otp.smsmkt.com/api/otp-send", {
      project_key: process.env.SMSMKT_PROJECT_KEY,
      phone: telephone,
    }, {
      headers: {
        "Content-Type": "application/json",
        "api_key": process.env.SMSMKT_API_KEY,
        "secret_key": process.env.SMSMKT_SECRET_KEY,
      },
      timeout: 10000, // 10 seconds
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("An Axios error occurred while sending OTP:", error.response?.data?.message || error.message);
      return NextResponse.json({ message: "Failed to send OTP", error: error.response?.data || error.message }, { status: error.response?.status || 500 });
    } else {
      console.error("Failed to send OTP:", error);
      return NextResponse.json({ message: "Failed to send OTP", error: "An unknown error occurred" }, { status: 500 });
    }
  }
} 