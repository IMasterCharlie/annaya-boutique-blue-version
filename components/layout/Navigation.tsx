"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ShoppingBag, Heart, Search, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useSearch } from "./SearchPanel";

const ResultsPanel = dynamic(() => import("./SearchPanel"), { ssr: false });

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const itemCount = useCartStore((s) => s.getItemCount());
  const wishCount = useWishlistStore((s) => s.wishlist.length);
  const { query, setQuery, results, loading, open, setOpen, close, handleSubmit, handleProductClick, showPanel } = useSearch();
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const [searchNavActive, setSearchNavActive] = useState(false);

  const openSearchNav = () => { setSearchNavActive(true); setOpen(true); setTimeout(() => desktopInputRef.current?.focus(), 50); };
  const closeSearchNav = () => { setSearchNavActive(false); close(); };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-royal/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 grid lg:grid-cols-[auto_1fr_auto] grid-cols-[1fr_1fr] items-center gap-6">
          <Link href="/" className="flex flex-col shrink-0">
            <span className="font-serif text-2xl font-bold text-gold tracking-tight">Annaya</span>
            <span className="text-[10px] text-white tracking-[3px] -mt-1 uppercase">Boutique</span>
          </Link>

          <div className="hidden lg:flex items-center justify-center">
            {!searchNavActive ? (
              <div className="flex items-center gap-8 text-white/80 font-medium text-sm">
                <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                <Link href="/products" className="hover:text-gold transition-colors">Shop</Link>
                <button type="button" onClick={openSearchNav} className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />Search
                </button>
                <Link href="/about" className="hover:text-gold transition-colors">About</Link>
                <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
              </div>
            ) : (
              <form onSubmit={(e) => { handleSubmit(e); setSearchNavActive(false); }}
                className="flex items-center w-full max-w-md bg-white/15 border border-white/30 rounded-full px-4 py-1.5 gap-2 focus-within:bg-white/20 focus-within:border-white/40 transition-all">
                <Search className="w-4 h-4 text-white/60 shrink-0" />
                <input ref={desktopInputRef} type="text" value={query}
                  onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                  placeholder="Search by name, category or price…"
                  className="flex-1 bg-transparent text-white placeholder:text-white/50 text-sm outline-none min-w-0" />
                <button type="button" onClick={closeSearchNav} className="text-white/60 hover:text-white transition-colors shrink-0">
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          <div className="flex items-center justify-end gap-1">
            <button type="button" onClick={() => { setOpen(!open); setTimeout(() => mobileInputRef.current?.focus(), 50); }}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/wishlist" className="p-2 text-white hover:bg-white/10 rounded-full transition-colors relative">
              <Heart className="w-5 h-5" />
              {mounted && wishCount > 0 && <span className="absolute top-1 right-1 bg-gold text-royal text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{wishCount}</span>}
            </Link>
            <Link href="/cart" className="p-2 text-white hover:bg-white/10 rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {mounted && itemCount > 0 && <span className="absolute top-1 right-1 bg-gold text-royal text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{itemCount}</span>}
            </Link>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-white/10 px-4 py-2">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 focus-within:bg-white/20 transition-all">
              <Search className="w-4 h-4 text-white/60 shrink-0" />
              <input ref={mobileInputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…" className="flex-1 bg-transparent text-white placeholder:text-white/50 text-sm outline-none" autoFocus />
              {query && <button type="button" onClick={close} className="text-white/60 hover:text-white shrink-0"><X className="w-3.5 h-3.5" /></button>}
            </form>
          </div>
        )}
      </nav>
      <ResultsPanel query={query} results={results} loading={loading} showPanel={showPanel} onProductClick={handleProductClick} onViewAll={handleSubmit} onClose={close} />
    </>
  );
}
