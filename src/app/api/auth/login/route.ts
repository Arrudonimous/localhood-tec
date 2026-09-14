import { NextResponse } from "next/server";
import { z } from "zod";
import {
  AUTH_COOKIE,
  clearAttempts,
  isRateLimited,
  registerFailedAttempt,
  signSessionToken,
  verifyPassword,
} from "@/lib/auth";
import { findUserByEmail } from "@/lib/users";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em alguns minutos." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const result = loginSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { email, password } = result.data;
  const user = await findUserByEmail(email);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    registerFailedAttempt(ip);
    return NextResponse.json(
      { error: "Email ou senha inválidos" },
      { status: 401 },
    );
  }

  clearAttempts(ip);

  const token = await signSessionToken({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  const response = NextResponse.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email },
  });
  response.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
