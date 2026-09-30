"use server";

// This file must NOT import axiosClient — token reading only
import { cookies } from "next/headers";

export async function getServerAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}
