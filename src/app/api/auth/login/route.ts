import { NextResponse } from "next/server";
import { demoAccounts, findUserByMobile, toPublicUser } from "@/lib/users";

type Body = {
  method?: "password" | "otp";
  mobile?: string;
  password?: string;
  otp?: string;
};

export async function GET() {
  return NextResponse.json({ accounts: demoAccounts() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Body;
  const mobile = (body.mobile ?? "").trim();
  const method = body.method ?? "password";

  if (!/^\d{10}$/.test(mobile)) {
    return NextResponse.json({ code: "INVALID_MOBILE" }, { status: 400 });
  }

  const user = findUserByMobile(mobile);
  if (!user) {
    return NextResponse.json({ code: "USER_NOT_FOUND" }, { status: 401 });
  }

  if (method === "otp") {
    if (body.otp !== user.otp) {
      return NextResponse.json({ code: "BAD_OTP" }, { status: 401 });
    }
  } else if (body.password !== user.password) {
    return NextResponse.json({ code: "BAD_PASSWORD" }, { status: 401 });
  }

  return NextResponse.json({ user: toPublicUser(user) });
}
