import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword, signSessionToken, AUTH_COOKIE } from "@/lib/auth";
import { createUser, findUserByEmail } from "@/lib/users";

const registerSchema = z
  .object({
    name: z.string().trim().min(3).max(120),
    email: z.string().trim().email().max(200),
    company: z.string().trim().max(120).optional().or(z.literal("")),
    phone: z.string().trim().max(30).optional().or(z.literal("")),
    password: z
      .string()
      .min(8)
      .regex(/[A-Za-z]/, "Deve conter letras")
      .regex(/[0-9]/, "Deve conter números"),
    confirmPassword: z.string(),
    acceptedTerms: z.literal(true),
    locale: z.enum(["pt-BR", "en-US"]).default("pt-BR"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const result = registerSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Invalid data" },
      { status: 400 },
    );
  }

  const data = result.data;

  const existing = await findUserByEmail(data.email);
  if (existing) {
    return NextResponse.json(
      { error: "Este email já está cadastrado" },
      { status: 409 },
    );
  }

  const passwordHash = await hashPassword(data.password);
  const user = await createUser({
    email: data.email,
    passwordHash,
    name: data.name,
    company: data.company || undefined,
    phone: data.phone || undefined,
    locale: data.locale,
  });

  const token = await signSessionToken({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  const response = NextResponse.json(
    { success: true, user: { id: user.id, name: user.name, email: user.email } },
    { status: 201 },
  );
  response.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
