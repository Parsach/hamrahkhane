import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { campaigns } from "../../../../db/schema";
import { requireAdmin } from "../_auth";
const str = (v: unknown, fallback = "") => typeof v === "string" ? v.trim() : fallback;
const num = (v: unknown) => Number.isFinite(Number(v)) ? Math.round(Number(v)) : 0;
function values(body: Record<string, unknown>) { return { title: str(body.title), description: str(body.description), discountType: str(body.discountType, "percent"), discountValue: num(body.discountValue), startsAt: str(body.startsAt), endsAt: str(body.endsAt), active: body.active === false ? 0 : 1 }; }
export async function POST(request: Request) { const denied = await requireAdmin(request); if (denied) return denied; const item = values(await request.json()); if (!item.title) return Response.json({ error: "عنوان کمپین لازم است." }, { status: 400 }); await getDb().insert(campaigns).values(item); return Response.json({ ok: true }, { status: 201 }); }
export async function PATCH(request: Request) { const denied = await requireAdmin(request); if (denied) return denied; const body = await request.json() as Record<string, unknown>; const id = num(body.id); if (!id) return Response.json({ error: "شناسه لازم است." }, { status: 400 }); await getDb().update(campaigns).set(values(body)).where(eq(campaigns.id, id)); return Response.json({ ok: true }); }
export async function DELETE(request: Request) { const denied = await requireAdmin(request); if (denied) return denied; const body = await request.json() as { id?: unknown }; await getDb().delete(campaigns).where(eq(campaigns.id, num(body.id))); return Response.json({ ok: true }); }
