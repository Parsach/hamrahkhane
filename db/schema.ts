import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  address: text("address").notNull(),
  note: text("note").notNull().default(""),
  couponCode: text("coupon_code").notNull().default(""),
  items: text("items").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const wheelSpins = sqliteTable("wheel_spins", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull().unique(),
  prize: text("prize").notNull(),
  couponCode: text("coupon_code").notNull().unique(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
