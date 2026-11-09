import { adminSessionCookie, checkAdminCredentials, adminPasswordConfigured, adminUsernameConfigured } from "../../../admin/auth";

export async function POST(request: Request) {
  if (!adminPasswordConfigured() || !adminUsernameConfigured()) return Response.json({ error: "نام کاربری و رمز ادمین روی سرور تنظیم نشده است." }, { status: 503 });
  const payload = (await request.json().catch(() => ({}))) as { username?: unknown; password?: unknown };
  if (typeof payload.username !== "string" || typeof payload.password !== "string" || !(await checkAdminCredentials(payload.username.trim(), payload.password))) {
    return Response.json({ error: "نام کاربری یا رمز ادمین نادرست است." }, { status: 401 });
  }
  return Response.json({ ok: true }, { headers: { "Set-Cookie": await adminSessionCookie() } });
}
