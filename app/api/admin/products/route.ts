import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { products } from "../../../../db/schema";
import { requireAdmin } from "../_auth";

const text = (value: unknown, fallback = "") => typeof value === "string" ? value.trim() : fallback;
const integer = (value: unknown, fallback = 0) => Number.isFinite(Number(value)) ? Math.round(Number(value)) : fallback;
const gallery = (value: unknown) => {
  if (typeof value !== "string") return "[]";
  try {
    const items = JSON.parse(value) as unknown;
    if (!Array.isArray(items)) return "[]";
    const safe = items.filter((item): item is string => typeof item === "string" && (item.startsWith("/") || item.startsWith("https://") || item.startsWith("data:image/"))).slice(0, 6);
    const serialized = JSON.stringify(safe);
    return serialized.length <= 1800000 ? serialized : "[]";
  } catch { return "[]"; }
};

function values(payload: Record<string, unknown>) {
  return {
    id: text(payload.id), name: text(payload.name), category: text(payload.category, "آشپزخانه"), price: integer(payload.price), oldPrice: payload.oldPrice ? integer(payload.oldPrice) : null,
    rating: text(payload.rating, "۴.۵"), badge: text(payload.badge), icon: text(payload.icon, "PackageCheck"), tone: text(payload.tone, "blue"), image: text(payload.image), gallery: gallery(payload.gallery), description: text(payload.description), slug: text(payload.slug), seoTitle: text(payload.seoTitle), seoDescription: text(payload.seoDescription), seoKeywords: text(payload.seoKeywords), imageAlt: text(payload.imageAlt), active: payload.active === false ? 0 : 1, sortOrder: integer(payload.sortOrder),
  };
}

export async function POST(request: Request) {
  const denied = await requireAdmin(request); if (denied) return denied;
  const body = (await request.json()) as Record<string, unknown>; const item = values(body);
  if (!item.id || !item.name) return Response.json({ error: "شناسه و نام محصول لازم است." }, { status: 400 });
  await getDb().insert(products).values(item); return Response.json({ ok: true }, { status: 201 });
}
export async function PATCH(request: Request) {
  const denied = await requireAdmin(request); if (denied) return denied;
  const body = (await request.json()) as Record<string, unknown>; const id = text(body.id); if (!id) return Response.json({ error: "شناسه محصول لازم است." }, { status: 400 });
  const item = values({ ...body, id }); delete (item as Partial<typeof item>).id;
  await getDb().update(products).set({ ...item, updatedAt: new Date().toISOString() }).where(eq(products.id, id)); return Response.json({ ok: true });
}
export async function DELETE(request: Request) {
  const denied = await requireAdmin(request); if (denied) return denied;
  const body = (await request.json()) as { id?: unknown }; const id = text(body.id); if (!id) return Response.json({ error: "شناسه محصول لازم است." }, { status: 400 });
  await getDb().delete(products).where(eq(products.id, id)); return Response.json({ ok: true });
}
