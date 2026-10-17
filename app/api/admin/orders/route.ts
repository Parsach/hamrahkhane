import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { orders } from "../../../../db/schema";
import { requireAdmin } from "../_auth";

export async function PATCH(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const payload = (await request.json().catch(() => ({}))) as { id?: unknown; status?: unknown };
  const id = Number(payload.id);
  const status = typeof payload.status === "string" ? payload.status : "new";
  if (!Number.isInteger(id) || !["new", "contacted", "confirmed", "completed", "cancelled"].includes(status)) return Response.json({ error: "اطلاعات سفارش نامعتبر است." }, { status: 400 });
  await getDb().update(orders).set({ status }).where(eq(orders.id, id));
  return Response.json({ ok: true });
}
