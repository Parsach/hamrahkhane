import type { Metadata } from "next";
import { asc, eq, or } from "drizzle-orm";
import { getDb } from "../../../db";
import { products } from "../../../db/schema";

type ProductPageProps = { params: Promise<{ slug: string }> | { slug: string } };

async function getProduct(params: ProductPageProps["params"]) {
  const { slug } = await params;
  const [product] = await getDb().select().from(products).where(or(eq(products.slug, slug), eq(products.id, slug))).orderBy(asc(products.sortOrder)).limit(1);
  return product;
}

function galleryOf(product: NonNullable<Awaited<ReturnType<typeof getProduct>>>) {
  try { const parsed = JSON.parse(product.gallery || "[]"); return Array.isArray(parsed) && parsed.length ? parsed.filter((item): item is string => typeof item === "string") : [product.image]; } catch { return [product.image]; }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params);
  if (!product) return { title: "محصول پیدا نشد | همراه‌خانه" };
  const title = product.seoTitle || `${product.name} | همراه‌خانه`;
  const description = product.seoDescription || product.description;
  const images = galleryOf(product).filter(Boolean).slice(0, 3);
  return { title, description, keywords: product.seoKeywords || undefined, alternates: { canonical: `/products/${product.slug || product.id}` }, openGraph: { title, description, type: "website", images } };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params);
  if (!product) return <main className="product-page" dir="rtl"><div className="product-page-empty"><h1>محصول پیدا نشد</h1><a href="/">بازگشت به فروشگاه</a></div></main>;
  const gallery = galleryOf(product);
  const title = product.seoTitle || `${product.name} | همراه‌خانه`;
  const description = product.seoDescription || product.description;
  const jsonLd = { "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.description, image: gallery, sku: product.id, brand: { "@type": "Brand", name: product.name.split(" ")[0] }, offers: { "@type": "Offer", priceCurrency: "IRR", availability: "https://schema.org/InStock", url: `/products/${product.slug || product.id}` } };
  return <main className="product-page" dir="rtl"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><header className="product-page-header"><a href="/" className="product-page-brand"><img src="/hamrahkhane-logo.png" alt="همراه‌خانه" /></a><a href="/">بازگشت به فروشگاه</a></header><article className="product-page-card"><div className="product-page-gallery"><div className="product-page-main-image"><img src={gallery[0]} alt={product.imageAlt || product.name} /></div><div className="product-page-thumbs">{gallery.map((image, index) => <img key={`${image}-${index}`} src={image} alt={`${product.imageAlt || product.name} تصویر ${index + 1}`} />)}</div></div><div className="product-page-copy"><span className="product-page-category">{product.category}</span><h1>{product.name}</h1><p className="product-page-description">{product.description}</p><div className="product-page-specs"><div><span>امتیاز</span><b>{product.rating}</b></div><div><span>وضعیت قیمت</span><b>تماس برای استعلام</b></div><div><span>مشاوره و سفارش</span><b>تلفنی</b></div></div><a className="product-page-order" href="/#products">افزودن به فرم سفارش</a><p className="product-page-seo-note">{title}</p></div></article><section className="product-page-content"><h2>توضیحات و راهنمای خرید</h2><p>{description}</p><a href="/#contact">تماس با کارشناسان همراه‌خانه</a></section></main>;
}
