import { asc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { products } from "../../../db/schema";

export async function GET() {
  try {
    const rows = await getDb().select().from(products).where(eq(products.active, 1)).orderBy(asc(products.sortOrder), asc(products.name));
    return Response.json({ products: rows });
  } catch (error) {
    console.error("catalog read failed", error);
    return Response.json({ products: [] });
  }
}
