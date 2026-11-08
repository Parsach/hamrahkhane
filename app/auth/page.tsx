"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, KeyRound, LogIn, Mail, Phone, UserRound } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ displayName: "", identifier: "", email: "", phone: "", password: "" });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const returnTo = typeof window === "undefined" ? "/" : new URLSearchParams(window.location.search).get("return_to") || "/";
  const [vipMode, setVipMode] = useState(false);
  useEffect(() => { setVipMode(new URLSearchParams(window.location.search).get("mode") === "vip"); }, []);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true); setMessage("");
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const body = mode === "login" ? { identifier: form.identifier, password: form.password } : { displayName: form.displayName, email: form.email, phone: form.phone, password: form.password };
    try { const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || "عملیات انجام نشد"); window.location.href = returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/"; } catch (error) { setMessage(error instanceof Error ? error.message : "عملیات انجام نشد"); } finally { setBusy(false); }
  };
  return <main className={`auth-page ${vipMode ? "vip-auth-page" : ""}`} dir="rtl"><div className="auth-card"><a className="auth-brand" href="/"><img src="/hamrahkhane-logo.png" alt="همراه‌خانه" /></a><span className={`auth-kicker ${vipMode ? "vip-kicker" : ""}`}>{vipMode ? "ورود ویژه کاربران VIP" : "حساب کاربری همراه‌خانه"}</span>{vipMode && <div className="vip-auth-badge">دسترسی سریع به تخفیف‌ها و پیشنهادهای اختصاصی</div>}<h1>{mode === "login" ? vipMode ? "خوش آمدی، همراه VIP!" : "خوش برگشتی!" : "حساب خودت را بساز"}</h1><p className="auth-intro">{mode === "login" ? "برای ادامه شماره موبایل یا ایمیل و رمز عبور را وارد کن." : "با ساخت حساب، سفارش‌ها و کدهای تخفیف اختصاصی‌ات همیشه در دسترس هستند."}</p><form onSubmit={submit} className="auth-form">{mode === "register" && <label><span><UserRound size={16} /> نام و نام خانوادگی</span><input required value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} placeholder="مثلاً سارا احمدی" /></label>}{mode === "login" ? <label><span><Mail size={16} /> ایمیل یا شماره موبایل</span><input required value={form.identifier} onChange={(e) => setForm({ ...form, identifier: e.target.value })} placeholder="۰۹۱۲۱۲۳۴۵۶۷ یا email@example.com" /></label> : <><label><span><Phone size={16} /> شماره موبایل</span><input inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="۰۹۱۲۱۲۳۴۵۶۷" /></label><label><span><Mail size={16} /> ایمیل <small>(اختیاری)</small></span><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" /></label></>}<label><span><KeyRound size={16} /> رمز عبور</span><input type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="حداقل ۸ کاراکتر" /></label><button className={`primary-button auth-submit ${vipMode ? "vip-submit" : ""}`} disabled={busy}>{busy ? "در حال بررسی..." : mode === "login" ? <><LogIn size={18} /> {vipMode ? "ورود VIP" : "ورود به حساب"}</> : "ثبت‌نام و ورود"}</button></form>{message && <div className="auth-error">{message}</div>}<button className="auth-switch" onClick={() => { setMode(mode === "login" ? "register" : "login"); setMessage(""); }}>{mode === "login" ? "حساب کاربری نداری؟ ثبت‌نام کن" : "قبلاً حساب ساخته‌ای؟ وارد شو"}</button><a className="auth-back" href="/"><ArrowRight size={15} /> بازگشت به فروشگاه</a></div></main>;
}
