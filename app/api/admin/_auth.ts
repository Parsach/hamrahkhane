import { isAdminAuthenticated } from "../../admin/auth";

export async function requireAdmin(request: Request): Promise<Response | null> {
  if (await isAdminAuthenticated()) return null;
  return Response.json({ error: "دسترسی پنل مدیریت نیاز به ورود دارد." }, { status: 401 });
}
