import { eq, or } from "drizzle-orm";
import { getDb } from "../../../../db";
import { users } from "../../../../db/schema";
import { createUserSession, hashPassword, sessionCookie } from "../../../chatgpt-auth";

const clean = (value: unknown) => typeof value === "string" ? value.trim() : "";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const displayName = clean(body.displayName);
  const email = clean(body.email).toLowerCase();
  const phone = clean(body.phone);
  const password = typeof body.password === "string" ? body.password : "";
  if (displayName.length < 2 || (!email && !phone) || password.length < 8) return Response.json({ error: "نام، ایمیل یا موبایل و رمز حداقل ۸ کاراکتری لازم است." }, { status: 400 });
  const db = getDb();
  const existing = await db.select({ id: users.id }).from(users).where(or(email ? eq(users.email, email) : eq(users.email, "__empty__"), phone ? eq(users.phone, phone) : eq(users.phone, "__empty__"))).limit(1);
  if (existing.length) return Response.json({ error: "این ایمیل یا شماره موبایل قبلاً ثبت شده است." }, { status: 409 });
  const salt = crypto.randomUUID();
  const passwordHash = await hashPassword(password, salt);
  const [user] = await db.insert(users).values({ displayName, email, phone, passwordHash, passwordSalt: salt }).returning({ id: users.id });
  const token = await createUserSession(user.id);
  return Response.json({ ok: true }, { headers: { "Set-Cookie": sessionCookie(token) } });
}
