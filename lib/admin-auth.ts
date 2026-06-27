import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "rawmina-admin-session";
const SESSION_LIFETIME_SECONDS = 60 * 60 * 8;

function getAdminSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "rawmina-local-admin-secret";
}

function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL ?? "admin@rawmina.ro",
    password: process.env.ADMIN_PASSWORD ?? "rawmina-admin",
  };
}

function sign(value: string) {
  return createHmac("sha256", getAdminSecret()).update(value).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyAdminCredentials(email: string, password: string) {
  const credentials = getAdminCredentials();

  return safeEqual(email, credentials.email) && safeEqual(password, credentials.password);
}

export function createAdminSession(email: string) {
  const expiresAt = Date.now() + SESSION_LIFETIME_SECONDS * 1000;
  const payload = Buffer.from(JSON.stringify({ email, expiresAt })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(session: string | undefined) {
  if (!session) return null;

  const parts = session.split(".");
  if (parts.length !== 2) return null;

  const [payload, signature] = parts;

  if (!safeEqual(sign(payload), signature)) return null;

  let decoded: { email?: string; expiresAt?: number };

  try {
    decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      email?: string;
      expiresAt?: number;
    };
  } catch {
    return null;
  }

  if (!decoded.email || !decoded.expiresAt) return null;
  if (decoded.expiresAt < Date.now()) return null;

  return { email: decoded.email };
}

export function getAdminCookieMaxAge() {
  return SESSION_LIFETIME_SECONDS;
}
