"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import ShellLayout from "@/components/ShellLayout";

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: false,
  loading: () => <div className="py-20 bg-slate-50 flex justify-center text-slate-400">Loading reviews...</div>
});

const categories = [
  { name: "Lehenga", img: "https://res.cloudinary.com/douvhybil/image/upload/v1773507187/annaya-boutique/lehengas/ydg4qczdt7hi8cxor4nj.jpg", path: "/category/Lehenga" },
  { name: "Saree", img: "https://res.cloudinary.com/douvhybil/image/upload/v1773508585/annaya-boutique/sarees/utyyz0gnnwmfxwgsqhq3.webp", path: "/category/Saree" },
  { name: "Frock", img: "https://res.cloudinary.com/douvhybil/image/upload/v1772313689/AWP%20Shopping-products/gwgpp5mk9y5pfh174app.jpg", path: "/category/Frock" },
  { name: "Kurti", img: "https://res.cloudinary.com/douvhybil/image/upload/v1773516396/annaya-boutique/kurties/tcyskaimbs9pk3lfmjt9.jpg", path: "/category/Kurti" },
  { name: "Kids Wear", img: "https://res.cloudinary.com/douvhybil/image/upload/v1773541163/annaya-boutique/products/zy0yeykgaukwggjrvfmz.jpg", path: "/products?category=Kids+Wear" },
  { name: "Ready to Wear", img: "https://res.cloudinary.com/douvhybil/image/upload/v1773516363/annaya-boutique/readytowears/vpr1otjdvznug2yoejnb.jpg", path: "/products?category=Ready+to+Wear" },
];

export default function HomePageClient({ bestSellers, newArrivals }: { bestSellers: Record<string, unknown>[]; newArrivals: Record<string, unknown>[]; }) {

  return (
    <ShellLayout>
      <div className="pb-20 lg:pb-0">
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-royal">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="absolute top-[-10%] right-[-10%] w-[50%] aspect-square bg-gold/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] aspect-square bg-sky/20 rounded-full blur-[100px]" />
          <div className="relative z-10 max-w-4xl mx-auto py-10 px-4 text-center anim-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold tracking-[3px] uppercase mb-8">
              New Collection 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-6">
              Elegance <span className="text-gold">Redefined.</span><br />Crafted for You.
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
              Discover our curated collection of ethnic and western wear — where tradition meets modern luxury.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products" className="w-full sm:w-auto px-8 py-4 bg-gold text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/products" className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-bold rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-center">
                Explore Collections
              </Link>
            </div>
            <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="flex items-center gap-3 text-white/60 text-sm"><ShieldCheck className="w-5 h-5 text-gold" /> 3-4 Days Delivery</div>
              <div className="flex items-center gap-3 text-white/60 text-sm"><ShieldCheck className="w-5 h-5 text-gold" /> 100% Safe &amp; Secure</div>
              <div className="flex items-center gap-3 text-white/60 text-sm"><RefreshCw className="w-5 h-5 text-gold" /> Easy Returns</div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal mb-4">Shop by Category</h2>
            <div className="w-16 h-1 bg-gold rounded-full" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.path} className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
                <Image src={cat.img} alt={cat.name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-royal/90 via-transparent to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-serif font-bold text-lg">{cat.name}</h3>
                  <span className="text-white/60 text-[10px] uppercase tracking-widest">Explore</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-20 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal mb-4">New Arrivals</h2>
                <div className="w-16 h-1 bg-gold rounded-full" />
              </div>
              <Link href="/products" className="text-royal font-bold text-sm flex items-center gap-2 hover:text-sapphire transition-colors">View All <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
              {newArrivals.map((product) => (
                <div key={product._id as string} className="min-w-[280px] md:min-w-[300px] snap-start">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal mb-4">Best Sellers</h2>
            <div className="w-16 h-1 bg-gold rounded-full" />
            <p className="text-slate-500 mt-4 text-center max-w-md">Our most-loved Lehengas &amp; Frocks — chosen by thousands of women across India.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => <ProductCard key={product._id as string} product={product} />)}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3 bg-royal text-white font-bold rounded-full hover:bg-royal/90 transition-all">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Testimonials />
      </div>
    </ShellLayout>
  );
}
