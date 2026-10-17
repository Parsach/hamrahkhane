import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { wheelPrizes } from "../../../../db/schema";
import { requireAdmin } from "../_auth";
const str = (v: unknown) => typeof v === "string" ? v.trim() : "";
const num = (v: unknown) => Number.isFinite(Number(v)) ? Math.max(1, Math.round(Number(v))) : 1;
export async function POST(request: Request) { const denied = await requireAdmin(request); if (denied) return denied; const body = await request.json() as Record<string, unknown>; const item = { label: str(body.label), couponCode: str(body.couponCode), weight: num(body.weight), active: body.active === false ? 0 : 1 }; if (!item.label) return Response.json({ error: "عنوان جایزه لازم است." }, { status: 400 }); await getDb().insert(wheelPrizes).values(item); return Response.json({ ok: true }, { status: 201 }); }
export async function PATCH(request: Request) { const denied = await requireAdmin(request); if (denied) return denied; const body = await request.json() as Record<string, unknown>; const id = num(body.id); await getDb().update(wheelPrizes).set({ label: str(body.label), couponCode: str(body.couponCode), weight: num(body.weight), active: body.active === false ? 0 : 1 }).where(eq(wheelPrizes.id, id)); return Response.json({ ok: true }); }
export async function DELETE(request: Request) { const denied = await requireAdmin(request); if (denied) return denied; const body = await request.json() as { id?: unknown }; await getDb().delete(wheelPrizes).where(eq(wheelPrizes.id, num(body.id))); return Response.json({ ok: true }); }
