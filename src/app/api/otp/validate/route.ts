import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token, otp_code } = body;

  if (!token) {
    return NextResponse.json({ message: "Token are required" }, { status: 400 });
  }

  if (!otp_code) {
    return NextResponse.json({ message: "OTP code are required" }, { status: 400 });
  }

  try {
    const response = await axios.post("https://portal-otp.smsmkt.com/api/otp-validate", {
      token: token,
      otp_code: otp_code,
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
      return NextResponse.json({ message: "Failed to validate OTP", error: error.response?.data || error.message }, { status: error.response?.status || 500 });
    } else {
      return NextResponse.json({ message: "Failed to validate OTP", error: "An unknown error occurred" }, { status: 500 });
    }
  }
} 