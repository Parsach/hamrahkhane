import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { coupons } from "../../../../db/schema";
import { requireAdmin } from "../_auth";

const str = (v: unknown, fallback = "") => typeof v === "string" ? v.trim() : fallback;
const num = (v: unknown) => Number.isFinite(Number(v)) ? Math.round(Number(v)) : 0;
function values(body: Record<string, unknown>) { const discountType = str(body.discountType, "percent") === "fixed" ? "fixed" : "percent"; return { code: str(body.code).toUpperCase(), title: str(body.title, "کد تخفیف همراه‌خانه"), discountType, discountValue: num(body.discountValue), usageLimit: Math.max(0, num(body.usageLimit)), startsAt: str(body.startsAt), endsAt: str(body.endsAt), active: body.active === false ? 0 : 1, campaignId: body.campaignId ? num(body.campaignId) : null }; }
function validate(item: ReturnType<typeof values>) { if (!item.code) return "کد تخفیف لازم است."; if (item.discountType === "percent" && (item.discountValue < 1 || item.discountValue > 100)) return "درصد تخفیف باید بین ۱ تا ۱۰۰ باشد."; if (item.discountType === "fixed" && item.discountValue < 1) return "مقدار تخفیف باید بیشتر از صفر باشد."; return ""; }
export async function POST(request: Request) { const denied = await requireAdmin(request); if (denied) return denied; const item = values(await request.json()); const error = validate(item); if (error) return Response.json({ error }, { status: 400 }); await getDb().insert(coupons).values(item); return Response.json({ ok: true }, { status: 201 }); }
export async function PATCH(request: Request) { const denied = await requireAdmin(request); if (denied) return denied; const body = await request.json() as Record<string, unknown>; const id = num(body.id); if (!id) return Response.json({ error: "شناسه لازم است." }, { status: 400 }); const item = values(body); const error = validate(item); if (error) return Response.json({ error }, { status: 400 }); await getDb().update(coupons).set(item).where(eq(coupons.id, id)); return Response.json({ ok: true }); }
export async function DELETE(request: Request) { const denied = await requireAdmin(request); if (denied) return denied; const body = await request.json() as { id?: unknown }; const id = num(body.id); await getDb().delete(coupons).where(eq(coupons.id, id)); return Response.json({ ok: true }); }
