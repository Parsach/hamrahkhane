import type { Metadata } from "next";
import { getChatGPTUser } from "./chatgpt-auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "همراه‌خانه | لوازم خانه، با خیال راحت",
  description: "فروشگاه لوازم خانگی همراه‌خانه؛ انتخاب محصول، کد تخفیف اختصاصی و ثبت سفارش تلفنی.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getChatGPTUser();
  const userData = user ? JSON.stringify({ displayName: user.displayName, email: user.email }) : "";
  return <html lang="fa" dir="rtl"><body className="antialiased"><div data-user={userData}>{children}</div></body></html>;
}
