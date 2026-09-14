import { NextResponse } from "next/server";
import { z } from "zod";
import { generateResetToken } from "@/lib/auth";
import { findUserByEmail, saveResetToken } from "@/lib/users";

const schema = z.object({
  email: z.string().trim().email(),
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
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const user = await findUserByEmail(result.data.email);

  if (user) {
    const { token, tokenHash } = generateResetToken();
    await saveResetToken({
      tokenHash,
      userId: user.id,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    });

    // Sem provedor de email configurado ainda (SendGrid/Resend - ver .env.example).
    // Em dev, o link fica no log do servidor para testar o fluxo manualmente.
    console.log(
      `[dev] Link de reset de senha para ${user.email}: /reset-password/${token}`,
    );
  }

  // Nunca revelar se o email existe ou não.
  return NextResponse.json({
    success: true,
    message: "Se o email existir, enviaremos as instruções.",
  });
}
