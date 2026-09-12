"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, BadgePercent, ChefHat, Check, ChevronDown, Clock3, Coffee, Fan, Flame, Gift, Headphones, IceCreamBowl, LogIn, Mail, MapPin, Menu, Minus, PackageCheck, Phone, Plus, Refrigerator, RotateCw, Search, ShieldCheck, Sparkles, Star, Trash2, WashingMachine, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type User = { displayName: string; email: string } | null;
type Product = { id: string; name: string; category: string; price: number; oldPrice?: number; rating: string; badge?: string; icon: LucideIcon; tone: string; description: string };

const products: Product[] = [
  { id: "air-fryer", name: "هواپز دوقلو نوا", category: "آشپزخانه", price: 4890000, oldPrice: 5550000, rating: "۴.۹", badge: "پرفروش", icon: Flame, tone: "orange", description: "دو سبد مستقل، پخت کم‌روغن" },
  { id: "espresso", name: "اسپرسوساز رومیزی رُست", category: "نوشیدنی", price: 6290000, oldPrice: 6990000, rating: "۴.۸", badge: "پیشنهاد امروز", icon: Coffee, tone: "coffee", description: "نوشیدنی حرفه‌ای در خانه" },
  { id: "fridge", name: "یخچال فریزر کم‌مصرف", category: "سرمایش", price: 38500000, rating: "۴.۷", icon: Refrigerator, tone: "blue", description: "فضای جادار با مصرف بهینه" },
  { id: "washer", name: "ماشین لباسشویی ۹ کیلویی", category: "شست‌وشو", price: 24900000, oldPrice: 26800000, rating: "۴.۸", icon: WashingMachine, tone: "indigo", description: "شست‌وشوی آرام و عمیق" },
  { id: "dishwasher", name: "ماشین ظرفشویی ۱۴ نفره", category: "شست‌وشو", price: 21900000, rating: "۴.۶", icon: PackageCheck, tone: "sky", description: "تمیزی بی‌صدا برای هر شب" },
  { id: "vacuum", name: "جاروبرقی توربوپلاس", category: "نظافت", price: 8950000, oldPrice: 9650000, rating: "۴.۷", icon: Fan, tone: "mint", description: "قدرت مکش بالا، صدای کم" },
  { id: "mixer", name: "همزن کاسه‌دار استیل", category: "آشپزخانه", price: 5790000, rating: "۴.۸", icon: ChefHat, tone: "rose", description: "برای خمیر و شیرینی خانگی" },
  { id: "microwave", name: "مایکروویو گریل‌دار", category: "آشپزخانه", price: 11900000, rating: "۴.۵", icon: Sparkles, tone: "purple", description: "گرم‌کردن سریع و یکنواخت" },
  { id: "air-conditioner", name: "کولر گازی ۱۸ هزار", category: "تهویه", price: 29800000, oldPrice: 31900000, rating: "۴.۶", icon: Fan, tone: "cyan", description: "خنکای مطمئن برای تابستان" },
  { id: "ice-maker", name: "یخ‌ساز رومیزی کوچک", category: "نوشیدنی", price: 4680000, rating: "۴.۴", icon: IceCreamBowl, tone: "teal", description: "یخ تازه در چند دقیقه" },
  { id: "sandwich-maker", name: "ساندویچ‌ساز گریل", category: "آشپزخانه", price: 2390000, rating: "۴.۵", icon: BadgePercent, tone: "yellow", description: "صبحانه‌های ترد و سریع" },
  { id: "heater", name: "بخاری برقی سرامیکی", category: "گرمایشی", price: 3270000, rating: "۴.۶", icon: Clock3, tone: "red", description: "گرمای فوری با ایمنی بیشتر" },
];

const formatPrice = (price: number) => `${new Intl.NumberFormat("fa-IR").format(price)} تومان`;

export default function Home() {
  const [user] = useState<User>(() => {
    if (typeof document === "undefined") return null;
    const rawUser = document.querySelector("[data-user]")?.getAttribute("data-user");
    if (!rawUser) return null;
    try { return JSON.parse(rawUser) as User; } catch { return null; }
  });
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [orderOpen, setOrderOpen] = useState(false);
  const [wheelOpen, setWheelOpen] = useState(false);
  const [wheelState, setWheelState] = useState<"ready" | "spinning" | "won" | "error">("ready");
  const [prize, setPrize] = useState("");
  const [coupon, setCoupon] = useState("");
  const [notice, setNotice] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    type ModelContext = { registerTool: (tool: { name: string; title?: string; description: string; inputSchema: object; annotations?: object; execute: (input: unknown) => unknown | Promise<unknown> }, options?: { signal?: AbortSignal }) => void | Promise<void> };
    const modelContext = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!modelContext?.registerTool) return;
    const lifecycle = new AbortController();
    const reportError = (error: unknown) => console.error("WebMCP registration failed", error);
    try {
      void Promise.resolve(modelContext.registerTool({
        name: "add_product_to_order",
        title: "Add product to order",
        description: "Add a requested home appliance to the visible phone-order form and update its quantity.",
        inputSchema: { type: "object", properties: { productId: { type: "string" }, quantity: { type: "number", minimum: 1 } }, required: ["productId"], additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input) {
          const data = input as { productId?: string; quantity?: number };
          const product = products.find((item) => item.id === data.productId);
          if (!product) throw new Error("این محصول در همراه‌خانه پیدا نشد.");
          const quantity = Math.max(1, Math.floor(data.quantity || 1));
          setSelected((current) => ({ ...current, [product.id]: (current[product.id] || 0) + quantity }));
          return { productId: product.id, productName: product.name, quantityAdded: quantity, status: "added" };
        },
      }, { signal: lifecycle.signal }));
      void Promise.resolve(modelContext.registerTool({
        name: "open_phone_order_form",
        title: "Open phone order form",
        description: "Open the visible phone-order form so the signed-in customer can review products and submit contact details.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute() { setOrderOpen(true); return { status: "opened" }; },
      }, { signal: lifecycle.signal }));
    } catch (error) { reportError(error); }
    return () => lifecycle.abort();
  }, [user]);
  const selectedItems = useMemo(() => products.filter((product) => selected[product.id]), [selected]);
  const totalCount = Object.values(selected).reduce((sum, count) => sum + count, 0);
  const totalPrice = selectedItems.reduce((sum, product) => sum + product.price * (selected[product.id] || 0), 0);
  const toggleProduct = (product: Product) => { setSelected((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 })); setNotice(`${product.name} به فرم سفارش اضافه شد`); window.setTimeout(() => setNotice(""), 2800); };
  const setCount = (id: string, count: number) => { setSelected((current) => { const next = { ...current }; if (count <= 0) delete next[id]; else next[id] = count; return next; }); };
  const startWheel = async () => {
    if (!user) { setNotice("برای چرخاندن گردونه ابتدا وارد حساب کاربری شوید"); return; }
    setWheelState("spinning");
    try { const response = await fetch("/api/wheel", { method: "POST" }); const result = await response.json(); if (!response.ok) throw new Error(result.error || "خطا در دریافت جایزه"); window.setTimeout(() => { setPrize(result.prize); setCoupon(result.couponCode); setWheelState("won"); }, 2300); } catch { setWheelState("error"); }
  };
  const submitOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    const payload = { name: String(form.get("name") || "").trim(), phone: String(form.get("phone") || "").trim(), city: String(form.get("city") || "").trim(), address: String(form.get("address") || "").trim(), note: String(form.get("note") || "").trim(), couponCode: String(form.get("couponCode") || "").trim(), items: selectedItems.map((product) => ({ id: product.id, name: product.name, quantity: selected[product.id] })) };
    try { const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || "خطا در ثبت سفارش"); setNotice("سفارش شما ثبت شد؛ برای هماهنگی با شما تماس می‌گیریم"); setSelected({}); setOrderOpen(false); window.setTimeout(() => setNotice(""), 5000); } catch (error) { setNotice(error instanceof Error ? error.message : "ثبت سفارش انجام نشد"); }
  };
  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-[#f7f7f5] text-[#202a25]">
      <div className="announcement"><Sparkles size={16} /> ارسال رایگان برای خریدهای بالای ۱۰ میلیون تومان <span>·</span> مشاوره خرید: ۰۲۱-۷۷۸۸۸۸۸۸</div>
      <header className="site-header"><div className="header-inner"><button className="icon-button mobile-only" aria-label="باز کردن منو" onClick={() => setMobileMenu((open) => !open)}><Menu size={21} /></button><a href="#top" className="brand" aria-label="همراه‌خانه، صفحه اصلی"><span className="brand-mark"><HouseMark /></span><span><b>همراه‌خانه</b><small>لوازم خانه، با خیال راحت</small></span></a><nav className={`main-nav ${mobileMenu ? "is-open" : ""}`}><a href="#products" onClick={() => setMobileMenu(false)}>فروشگاه</a><a href="#wheel" onClick={() => setMobileMenu(false)}>گردونه شانس</a><a href="#how" onClick={() => setMobileMenu(false)}>راهنمای خرید</a><a href="#contact" onClick={() => setMobileMenu(false)}>تماس با ما</a></nav><div className="header-actions"><button className="icon-button" aria-label="جست‌وجو" onClick={() => setSearchOpen((open) => !open)}><Search size={19} /></button>{user ? <span className="user-chip"><span>{user.displayName.slice(0, 1)}</span>{user.displayName}</span> : <a className="login-link" href="/signin-with-chatgpt?return_to=%2F"><LogIn size={18} /> ورود</a>}<button className="cart-button" onClick={() => setOrderOpen(true)} aria-label="فرم سفارش"><PackageCheck size={19} /><span>سفارش من</span>{totalCount > 0 && <em>{totalCount}</em>}</button></div></div>{searchOpen && <div className="search-panel"><Search size={18} /><input autoFocus placeholder="مثلاً اسپرسوساز یا جاروبرقی" aria-label="جست‌وجوی محصول" /><button onClick={() => setSearchOpen(false)} aria-label="بستن جست‌وجو"><X size={18} /></button></div>}</header>
      <section id="top" className="hero-section shell"><div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot" /> پیشنهادهای منتخب برای خانه‌ی شما</span><h1>انتخاب بهتر،<br /><span>زندگی راحت‌تر.</span></h1><p>۱۲ محصول کاربردی را با قیمت منصفانه ببینید، مشاوره بگیرید و سفارشتان را تلفنی نهایی کنید.</p><div className="hero-cta-row"><a className="primary-button" href="#products">دیدن محصولات <ArrowLeft size={18} /></a><button className="text-button" onClick={() => setWheelOpen(true)}><Gift size={18} /> شانس امروزت را امتحان کن</button></div><div className="trust-row"><div><span className="avatar-stack"><i>م</i><i>س</i><i>ن</i></span><strong>+۲۴۰۰</strong><small>خریدار راضی</small></div><div className="rating"><Star size={17} fill="currentColor" /><strong>۴.۸</strong><small>رضایت از خرید</small></div></div></div><div className="hero-visual"><img src="/kitchen-hero.png" alt="هواپز و اسپرسوساز روی کابینت آشپزخانه" /><div className="hero-badge"><span>تخفیف ویژه</span><b>تا ۱۵٪</b><small>برای کاربران همراه‌خانه</small></div><div className="hero-float"><span className="float-icon"><Phone size={17} /></span><span><b>خرید تلفنی آسان</b><small>مشاوره رایگان قبل از ثبت سفارش</small></span></div></div></section>
      <section className="benefit-strip shell"><div><span><ShieldCheck size={19} /></span><b>ضمانت اصالت کالا</b><small>با فاکتور معتبر</small></div><div><span><Headphones size={19} /></span><b>مشاوره قبل از خرید</b><small>پاسخ‌گوی سوالات شما</small></div><div><span><RotateCw size={19} /></span><b>پیگیری تا تحویل</b><small>همراه شما می‌مانیم</small></div><div><span><MapPin size={19} /></span><b>ارسال به سراسر کشور</b><small>بسته‌بندی امن</small></div></section>
      <section id="products" className="products-section shell"><div className="section-heading"><div><span className="eyebrow">انتخاب‌های محبوب این هفته</span><h2>برای خانه‌ای که دوستش دارید</h2></div><a className="view-all" href="#products">مشاهده همه <ArrowLeft size={17} /></a></div><div className="category-tabs"><button className="active">همه محصولات</button><button>آشپزخانه</button><button>شست‌وشو</button><button>تهویه و گرمایش</button><button>نظافت</button></div><div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} count={selected[product.id] || 0} onAdd={() => toggleProduct(product)} />)}</div></section>
      <section id="wheel" className="wheel-section shell"><div className="wheel-card"><div className="wheel-copy"><span className="eyebrow light"><Gift size={16} /> جایزه‌ی مخصوص تو</span><h2>هر خرید، یک شانس تازه</h2><p>وارد حساب کاربری‌ات شو و هر هفته یک بار گردونه را بچرخان؛ شاید کد تخفیف خرید بعدی‌ات همین‌جا منتظرت باشد.</p><button className="cream-button" onClick={() => setWheelOpen(true)}>چرخاندن گردونه <RotateCw size={17} /></button><small className="wheel-note"><ShieldCheck size={14} /> کدها اختصاصی و فقط برای حساب شما هستند</small></div><div className="wheel-visual"><div className="wheel-orbit orbit-one" /><div className="wheel-orbit orbit-two" /><div className="wheel-disc"><div className="wheel-center"><Gift size={23} /><small>بچرخون</small></div><span>۱۰٪</span><span>۱۵٪</span><span>شانس بعدی</span><span>رایگان</span></div><div className="wheel-pointer"><ChevronDown size={30} fill="currentColor" /></div></div></div></section>
      <section id="how" className="how-section shell"><div className="section-heading"><div><span className="eyebrow">ساده و مطمئن</span><h2>خرید از همراه‌خانه چطور است؟</h2></div></div><div className="steps"><div><span>۰۱</span><h3>محصولت را انتخاب کن</h3><p>محصول مناسب را از بین ۱۲ انتخاب کاربردی پیدا کن و به فرم سفارش اضافه کن.</p></div><div><span>۰۲</span><h3>فرم سفارش را پر کن</h3><p>شماره تماس و آدرس را بفرست تا کارشناسان ما برای هماهنگی تماس بگیرند.</p></div><div><span>۰۳</span><h3>تلفنی نهایی کن</h3><p>مشاوره بگیر، روش ارسال را انتخاب کن و خریدت را با خیال راحت کامل کن.</p></div></div></section>
      <footer id="contact" className="footer"><div className="shell footer-grid"><div><a className="brand footer-brand" href="#top"><span className="brand-mark"><HouseMark /></span><span><b>همراه‌خانه</b><small>لوازم خانه، با خیال راحت</small></span></a><p>انتخاب‌های درست برای خانه‌ی امروز؛ با مشاوره‌ی انسانی و خریدی که قابل اعتماد باشد.</p></div><div><h4>همراه شما هستیم</h4><a href="tel:02177888888"><Phone size={16} /> ۰۲۱-۷۷۸۸۸۸۸۸</a><a href="mailto:hello@hamrahkhane.ir"><Mail size={16} /> hello@hamrahkhane.ir</a></div><div><h4>ساعات پاسخ‌گویی</h4><p><Clock3 size={16} /> شنبه تا پنج‌شنبه، ۹ تا ۲۰</p><p>جمعه‌ها، ۱۰ تا ۱۶</p></div></div><div className="footer-bottom shell"><span>© ۱۴۰۳ همراه‌خانه</span><span>اعتماد شما، سرمایه‌ی ماست.</span></div></footer>
      {totalCount > 0 && <button className="floating-order" onClick={() => setOrderOpen(true)}><PackageCheck size={18} /><span>{totalCount} محصول برای سفارش</span><b>{formatPrice(totalPrice)}</b></button>}{notice && <div className="toast" role="status"><Check size={17} /> {notice}</div>}
      {orderOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOrderOpen(false); }}><section className="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-title"><button className="modal-close" onClick={() => setOrderOpen(false)} aria-label="بستن"><X size={20} /></button><div className="modal-heading"><span className="modal-icon"><Phone size={20} /></span><div><span className="eyebrow">ثبت سفارش تلفنی</span><h2 id="order-title">بگذارید با شما تماس بگیریم</h2></div></div>{!user ? <div className="login-required"><LogIn size={28} /><h3>برای ثبت سفارش وارد شوید</h3><p>سفارش‌ها و کدهای تخفیف اختصاصی شما به حساب کاربری‌تان متصل می‌شوند.</p><a className="primary-button" href="/signin-with-chatgpt?return_to=%2F">ورود با حساب کاربری <ArrowLeft size={18} /></a></div> : <form onSubmit={submitOrder}><div className="order-items">{selectedItems.length === 0 ? <div className="empty-order"><PackageCheck size={27} /><p>هنوز محصولی انتخاب نکرده‌اید.</p><a href="#products" onClick={() => setOrderOpen(false)}>انتخاب محصول</a></div> : selectedItems.map((product) => <div className="order-item" key={product.id}><span className={`item-icon ${product.tone}`}><product.icon size={19} /></span><div><b>{product.name}</b><small>{formatPrice(product.price)}</small></div><div className="quantity"><button type="button" onClick={() => setCount(product.id, (selected[product.id] || 1) - 1)}><Minus size={14} /></button><span>{selected[product.id]}</span><button type="button" onClick={() => setCount(product.id, (selected[product.id] || 0) + 1)}><Plus size={14} /></button></div><button type="button" className="remove-item" onClick={() => setCount(product.id, 0)} aria-label={`حذف ${product.name}`}><Trash2 size={16} /></button></div>)}</div>{selectedItems.length > 0 && <><div className="order-total"><span>مجموع تقریبی</span><b>{formatPrice(totalPrice)}</b></div><div className="form-grid"><label>نام و نام خانوادگی<input name="name" required placeholder="مثلاً سارا احمدی" /></label><label>شماره تماس<input name="phone" required inputMode="tel" placeholder="۰۹۱۲۱۲۳۴۵۶۷" /></label><label>شهر<input name="city" required placeholder="تهران" /></label><label>کد تخفیف<input name="couponCode" defaultValue={coupon} placeholder="اگر کد داری وارد کن" /></label><label className="full">آدرس کامل<textarea name="address" required rows={2} placeholder="خیابان، کوچه، پلاک، واحد" /></label><label className="full">یادداشت برای کارشناس<textarea name="note" rows={2} placeholder="رنگ یا زمان تماس دلخواه..." /></label></div><button className="primary-button submit-order" type="submit">ثبت درخواست تماس <Phone size={18} /></button><small className="form-hint"><ShieldCheck size={14} /> اطلاعات شما فقط برای پیگیری همین سفارش استفاده می‌شود.</small></>}</form>}</section></div>}
      {wheelOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setWheelOpen(false); }}><section className="wheel-modal" role="dialog" aria-modal="true" aria-labelledby="wheel-title"><button className="modal-close" onClick={() => setWheelOpen(false)} aria-label="بستن"><X size={20} /></button>{wheelState === "won" ? <div className="prize-state"><div className="prize-confetti"><Gift size={34} /></div><span className="eyebrow">تبریک می‌گوییم</span><h2>{prize}</h2><p>این کد فقط برای حساب شما فعال شده است.</p><code>{coupon}</code><button className="primary-button" onClick={() => { setWheelOpen(false); setOrderOpen(true); }}>استفاده در سفارش <ArrowLeft size={18} /></button></div> : <><div className="modal-heading"><span className="modal-icon gold"><Gift size={20} /></span><div><span className="eyebrow">گردونه شانس</span><h2 id="wheel-title">جایزه‌ات را بردار</h2></div></div><div className={`mini-wheel ${wheelState === "spinning" ? "is-spinning" : ""}`}><div className="mini-pointer" /><div className="mini-disc"><span>۱۰٪</span><span>۱۵٪</span><span>شانس بعدی</span><span>رایگان</span><div><Gift size={22} /></div></div></div>{wheelState === "error" && <p className="error-text">برای دریافت جایزه مشکلی پیش آمد؛ دوباره تلاش کن.</p>}{!user ? <div className="login-required compact"><p>برای چرخاندن گردونه وارد حساب کاربری شوید.</p><a className="primary-button" href="/signin-with-chatgpt?return_to=%2F">ورود به حساب <LogIn size={17} /></a></div> : <button className="primary-button spin-button" onClick={startWheel} disabled={wheelState === "spinning"}>{wheelState === "spinning" ? "در حال چرخیدن..." : "بچرخان و جایزه بگیر"}<RotateCw size={18} /></button>}</>}</section></div>}
    </main>
  );
}

function ProductCard({ product, count, onAdd }: { product: Product; count: number; onAdd: () => void }) { const Icon = product.icon; return <article className="product-card"><div className={`product-art ${product.tone}`}><Icon size={47} strokeWidth={1.45} />{product.badge && <span className="product-badge">{product.badge}</span>}<span className="art-shape" /></div><div className="product-meta"><span>{product.category}</span><span className="product-rating"><Star size={13} fill="currentColor" /> {product.rating}</span></div><h3>{product.name}</h3><p>{product.description}</p><div className="product-footer"><div><b>{formatPrice(product.price)}</b>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div><button className={`add-button ${count ? "added" : ""}`} onClick={onAdd}>{count ? <><Check size={16} /> {count} عدد</> : <><Plus size={17} /> افزودن</>}</button></div></article>; }
function HouseMark() { return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 15.1 16 6l11 9.1v10.2a1.7 1.7 0 0 1-1.7 1.7H6.7A1.7 1.7 0 0 1 5 25.3V15.1Z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" /><path d="M12 27v-7.4h8V27M3.8 15.7 16 5.6l12.2 10.1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
