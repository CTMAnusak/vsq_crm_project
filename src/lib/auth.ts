import { cookies } from "next/headers";
import { prisma } from "./prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import { BadgeCounts, MemberLevelPeriod, ProgressBarItem } from "@/types";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET environment variable");
  return secret;
};

type AuthTokenPayload = { 
  lineUserId: string;
  customerUuid?: string | null;
  hn?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  telePhone?: string | null;
  profileImage?: string | null;
  badgeCounts?: BadgeCounts[] | null;
  memberLevelName?: string | null;
  memberLevelShortName?: string | null;
  memberLevelPeriod?: MemberLevelPeriod[] | null;
  progressBar?: ProgressBarItem[] | null;
  remainingService?: number | null;
  remainingGift?: number | null;
  nextAppointmentDate?: string | null;
};

export interface SessionUser {
  lineUserId: string | null;
  customerUuid: string | null;
  hn: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  telePhone: string | null;
  profileImage: string | null;
  badgeCounts: BadgeCounts[] | null;
  memberLevelName: string | null;
  memberLevelShortName: string | null;
  memberLevelPeriod: MemberLevelPeriod[] | null;
  progressBar: ProgressBarItem[] | null;
  remainingService: number | null;
  remainingGift: number | null;
  nextAppointmentDate: string | null;
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("AUTH_TOKEN")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, getJwtSecret()) as AuthTokenPayload;

    return {
      lineUserId: decoded.lineUserId ?? null,
      customerUuid: decoded.customerUuid ?? null,
      hn: decoded.hn ?? null,
      firstName: decoded.firstName ?? null,
      lastName: decoded.lastName ?? null,
      email: decoded.email ?? null,
      telePhone: decoded.telePhone ?? null,
      profileImage: decoded.profileImage ?? null,
      badgeCounts: decoded.badgeCounts ?? null,
      memberLevelName: decoded.memberLevelName ?? null,
      memberLevelShortName: decoded.memberLevelShortName ?? null,
      memberLevelPeriod: decoded.memberLevelPeriod ?? null,
      progressBar: decoded.progressBar ?? null,
      remainingService: decoded.remainingService ?? null,
      remainingGift: decoded.remainingGift ?? null,
      nextAppointmentDate: decoded.nextAppointmentDate ?? null,
    };
    // const user = await prisma.user.findUnique({ where: { lineUserId: decoded.lineUserId } });
    // if (!user) return null;

    // return {
    //   id: user.id,
    //   lineUserId: user.lineUserId,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   email: user.email,
    //   telephone: user.telePhone,
    // };
  } catch {
    return null;
  }
}

export function createAuthToken(
  lineUserId: string | null,
  hn: string | null,
  firstName: string | null,
  lastName: string | null,
  email: string | null,
  telePhone: string | null,
  profileImage: string | null,
  customerUuid: string | null,
  badgeCounts: BadgeCounts[] | null,
  memberLevelName: string | null,
  memberLevelShortName: string | null,
  memberLevelPeriod: MemberLevelPeriod[] | null,
  progressBar: ProgressBarItem[] | null,
  remainingService: number | null,
  remainingGift: number | null,
  nextAppointmentDate: string | null,
): string {
  return jwt.sign({ lineUserId, hn, firstName, lastName, email, telePhone, profileImage, customerUuid, badgeCounts, memberLevelName, memberLevelShortName, memberLevelPeriod, progressBar, remainingService, remainingGift, nextAppointmentDate }, getJwtSecret(), {
    algorithm: "HS256",
    expiresIn: "90d",
  });
}