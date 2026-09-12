import { getChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { orders } from "../../../db/schema";

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "برای ثبت سفارش وارد حساب کاربری شوید." }, { status: 401 });
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
    const city = typeof payload.city === "string" ? payload.city.trim() : "";
    const address = typeof payload.address === "string" ? payload.address.trim() : "";
    const note = typeof payload.note === "string" ? payload.note.trim() : "";
    const couponCode = typeof payload.couponCode === "string" ? payload.couponCode.trim() : "";
    const items = Array.isArray(payload.items) ? payload.items : [];
    if (!name || !phone || !city || !address || items.length === 0) return Response.json({ error: "لطفاً اطلاعات تماس و حداقل یک محصول را وارد کنید." }, { status: 400 });
    const db = getDb();
    const [order] = await db.insert(orders).values({ userId: user.userId, customerName: name, phone, city, address, note, couponCode, items: JSON.stringify(items) }).returning({ id: orders.id, createdAt: orders.createdAt });
    return Response.json({ order }, { status: 201 });
  } catch (error) {
    console.error("order creation failed", error);
    return Response.json({ error: "ثبت سفارش موقتاً در دسترس نیست. لطفاً دوباره تلاش کنید." }, { status: 500 });
  }
}
