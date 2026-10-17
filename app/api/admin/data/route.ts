import { desc, asc } from "drizzle-orm";
import { getDb } from "../../../../db";
import { campaigns, coupons, orders, products, wheelPrizes } from "../../../../db/schema";
import { requireAdmin } from "../_auth";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  try {
    const db = getDb();
    const [ordersRows, productRows, couponRows, campaignRows, prizeRows] = await Promise.all([
      db.select().from(orders).orderBy(desc(orders.id)),
      db.select().from(products).orderBy(asc(products.sortOrder), asc(products.name)),
      db.select().from(coupons).orderBy(desc(coupons.id)),
      db.select().from(campaigns).orderBy(desc(campaigns.id)),
      db.select().from(wheelPrizes).orderBy(desc(wheelPrizes.id)),
    ]);
    return Response.json({ orders: ordersRows, products: productRows, coupons: couponRows, campaigns: campaignRows, wheelPrizes: prizeRows });
  } catch (error) {
    console.error("admin data failed", error);
    return Response.json({ error: "خواندن اطلاعات پنل انجام نشد. ابتدا migration دیتابیس را اجرا کنید." }, { status: 500 });
  }
}
