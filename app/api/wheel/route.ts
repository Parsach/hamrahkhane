import { eq } from "drizzle-orm";
import { getChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { wheelPrizes, wheelSpins } from "../../../db/schema";

const fallbackPrizes = [
  { label: "کد تخفیف ۱۰٪", couponCode: "HAMRAH10", weight: 4 },
  { label: "کد تخفیف ۱۵٪", couponCode: "HAMRAH15", weight: 3 },
  { label: "ارسال رایگان", couponCode: "HAMRAH-FREE", weight: 2 },
  { label: "شانس دوباره در هفته بعد", couponCode: "NEXT-WEEK", weight: 1 },
];

export async function POST() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "برای چرخاندن گردونه وارد حساب کاربری شوید." }, { status: 401 });
  try {
    const db = getDb();
    const [previous] = await db.select().from(wheelSpins).where(eq(wheelSpins.userId, user.userId)).limit(1);
    if (previous) return Response.json({ prize: previous.prize, couponCode: previous.couponCode, reused: true });
    const configured = await db.select().from(wheelPrizes).where(eq(wheelPrizes.active, 1));
    const prizes = configured.length > 0 ? configured : fallbackPrizes;
    const totalWeight = prizes.reduce((sum, item) => sum + Math.max(1, item.weight), 0);
    let cursor = Math.random() * totalWeight;
    const selected = prizes.find((item) => { cursor -= Math.max(1, item.weight); return cursor <= 0; }) || prizes[0];
    const prize = "label" in selected ? selected.label : "جایزه همراه‌خانه";
    const baseCouponCode = selected.couponCode || "HAMRAH";
    let couponCode = `${baseCouponCode}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const [collision] = await db.select({ id: wheelSpins.id }).from(wheelSpins).where(eq(wheelSpins.couponCode, couponCode)).limit(1);
      if (!collision) break;
      couponCode = `${baseCouponCode}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    }
    const [spin] = await db.insert(wheelSpins).values({ userId: user.userId, prize, couponCode }).returning({ prize: wheelSpins.prize, couponCode: wheelSpins.couponCode });
    return Response.json(spin, { status: 201 });
  } catch (error) {
    console.error("wheel spin failed", error);
    return Response.json({ error: "دریافت جایزه موقتاً در دسترس نیست." }, { status: 500 });
  }
}
