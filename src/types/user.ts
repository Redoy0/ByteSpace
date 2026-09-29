export const USER_ROLES = ["student", "creator", "admin"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const isUserRole = (value: unknown): value is UserRole =>
  typeof value === "string" && USER_ROLES.includes(value as UserRole);

export interface User {
  _id: string;
  email: string;
  role: UserRole;
  name?: string;
  profileImage?: string;
  [key: string]: string | number | boolean | null | undefined;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
