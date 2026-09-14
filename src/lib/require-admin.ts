import { cookies } from "next/headers";
import { AUTH_COOKIE, verifySessionToken, type SessionPayload } from "@/lib/session";

export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(AUTH_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function requireAdmin(): Promise<SessionPayload | null> {
  const session = await getSession();
  if (!session || session.role !== "admin") return null;
  return session;
}
