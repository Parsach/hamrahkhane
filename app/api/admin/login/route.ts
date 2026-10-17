import { adminSessionCookie, checkAdminPassword, adminPasswordConfigured } from "../../../admin/auth";

export async function POST(request: Request) {
  if (!adminPasswordConfigured()) return Response.json({ error: "رمز ادمین روی سرور تنظیم نشده است." }, { status: 503 });
  const payload = (await request.json().catch(() => ({}))) as { password?: unknown };
  if (typeof payload.password !== "string" || !(await checkAdminPassword(payload.password))) {
    return Response.json({ error: "رمز ادمین نادرست است." }, { status: 401 });
  }
  return Response.json({ ok: true }, { headers: { "Set-Cookie": await adminSessionCookie() } });
}
