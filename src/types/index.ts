
// Types for LINE LIFF and User data
export interface LineProfile {
  userId: string;
  pictureUrl?: string;
  email?: string;
}

export interface User {
  badgeCounts: BadgeCounts[] | null;
  customerUuid: string | null;
  lineUserId: string;
  Hn: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  telePhone?: string | null;
  profileImage?: string | null;
  type?: string | null;
  memberLevelShortName?: string | null;
  memberLevelName?: string | null;
  memberLevelPeriod?: MemberLevelPeriod[] | null;
  progressBar?:  ProgressBarItem[] | null;
  remainingService?: number | null;
  remainingGift?: number | null;
  nextAppointmentDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegistrationSessionData {
  lineUserId: string;
  is_old_customer: boolean;
  first_name: string;
  last_name: string;
  email: string | null;
  tel_no: string;
  type: string;
}

export interface BadgeCounts {
  course: number | null,
  gift: number | null,
  appointment: number | null,
}

export interface MemberLevelPeriod {
  start_date: string | null,
  end_date: string | null,
}

export interface ProgressBarItem {
  label_start: string | null,
  label_end: string | null,
  value_start: number | null,
  value_end: number | null,
  current_value: number | null,
  percent: number | null,
  suggestion_message_line_1: string | null,
  suggestion_message_line_2: string | null,
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAcceptTerms: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  closeWindow: () => void;
  getIdToken: () => Promise<string | null>;
  getAccessToken: () => Promise<string | null>;
}


