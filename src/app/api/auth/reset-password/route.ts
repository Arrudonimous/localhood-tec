import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword, hashResetToken } from "@/lib/auth";
import { consumeResetToken, updateUserPassword } from "@/lib/users";

const schema = z
  .object({
    token: z.string().min(1),
    password: z
      .string()
      .min(8)
      .regex(/[A-Za-z]/)
      .regex(/[0-9]/),
    confirmPassword: z.string(),
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

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Invalid data" },
      { status: 400 },
    );
  }

  const tokenHash = hashResetToken(result.data.token);
  const resetEntry = await consumeResetToken(tokenHash);

  if (!resetEntry) {
    return NextResponse.json(
      { error: "Token inválido ou expirado" },
      { status: 400 },
    );
  }

  const passwordHash = await hashPassword(result.data.password);
  await updateUserPassword(resetEntry.userId, passwordHash);

  return NextResponse.json({ success: true });
}
