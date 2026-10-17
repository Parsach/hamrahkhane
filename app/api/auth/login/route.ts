import { eq, or } from "drizzle-orm";
import { getDb } from "../../../../db";
import { users } from "../../../../db/schema";
import { createUserSession, hashPassword, sessionCookie } from "../../../chatgpt-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { identifier?: unknown; password?: unknown };
  const identifier = typeof body.identifier === "string" ? body.identifier.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!identifier || !password) return Response.json({ error: "ایمیل یا موبایل و رمز عبور را وارد کنید." }, { status: 400 });
  const [user] = await getDb().select().from(users).where(or(eq(users.email, identifier), eq(users.phone, identifier))).limit(1);
  if (!user || (await hashPassword(password, user.passwordSalt)) !== user.passwordHash) return Response.json({ error: "اطلاعات ورود نادرست است." }, { status: 401 });
  const token = await createUserSession(user.id);
  return Response.json({ ok: true }, { headers: { "Set-Cookie": sessionCookie(token) } });
}
