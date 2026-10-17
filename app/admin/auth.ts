import { env } from "cloudflare:workers";
import { cookies } from "next/headers";

const COOKIE_NAME = "hamrah_admin_session";

function configuredPassword(): string {
  return String((env as Record<string, unknown>).ADMIN_PASSWORD || "");
}

async function sessionToken(): Promise<string> {
  const source = `hamrahkhane-admin:${configuredPassword()}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(source));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function adminPasswordConfigured(): boolean {
  return configuredPassword().length >= 12;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  if (!adminPasswordConfigured()) return false;
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  return Boolean(value && value === (await sessionToken()));
}

export async function checkAdminPassword(password: string): Promise<boolean> {
  if (!adminPasswordConfigured()) return false;
  return password === configuredPassword();
}

export async function adminSessionCookie(): Promise<string> {
  return `${COOKIE_NAME}=${await sessionToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`;
}

export function expiredAdminCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
