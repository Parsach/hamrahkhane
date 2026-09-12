import { eq } from "drizzle-orm";
import { getChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { wheelSpins } from "../../../db/schema";

const prizes = ["کد تخفیف ۱۰٪", "کد تخفیف ۱۵٪", "ارسال رایگان", "شانس دوباره در هفته بعد"];

export async function POST() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "برای چرخاندن گردونه وارد حساب کاربری شوید." }, { status: 401 });
  try {
    const db = getDb();
    const [previous] = await db.select().from(wheelSpins).where(eq(wheelSpins.userId, user.userId)).limit(1);
    if (previous) return Response.json({ prize: previous.prize, couponCode: previous.couponCode, reused: true });
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    const couponCode = `HAMRAH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const [spin] = await db.insert(wheelSpins).values({ userId: user.userId, prize, couponCode }).returning({ prize: wheelSpins.prize, couponCode: wheelSpins.couponCode });
    return Response.json(spin, { status: 201 });
  } catch (error) {
    console.error("wheel spin failed", error);
    return Response.json({ error: "دریافت جایزه موقتاً در دسترس نیست." }, { status: 500 });
  }
}
