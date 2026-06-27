import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSession,
  getAdminCookieMaxAge,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const payload = loginSchema.safeParse(await request.json());

  if (!payload.success || !verifyAdminCredentials(payload.data.email, payload.data.password)) {
    return NextResponse.json({ error: "Datele de autentificare nu sunt valide." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, createAdminSession(payload.data.email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getAdminCookieMaxAge(),
  });

  return NextResponse.json({ ok: true, email: payload.data.email });
}
