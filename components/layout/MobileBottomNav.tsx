"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, Home, Grid, Info } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());
  const wishCount = useWishlistStore((s) => s.wishlist.length);

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Grid, label: "Shop", path: "/products" },
    { icon: ShoppingBag, label: "Cart", path: "/cart", badge: itemCount },
    { icon: Heart, label: "Wishlist", path: "/wishlist", badge: wishCount },
    { icon: Info, label: "About", path: "/about" },
  ];

  return (
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[440px] z-50 bg-white/70 backdrop-blur-xl border border-white/20 px-3 py-2 flex justify-around items-center rounded-full shadow-xl">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link key={item.path} href={item.path}
            className={cn(
              "group relative flex flex-col items-center p-2 min-w-[64px] transition-all duration-300",
              isActive ? "text-gold" : "text-sapphire hover:text-gold"
            )}>
            <div className="relative">
              <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isActive ? "" : "")} />
              {mounted && item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-royal text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center ring-2 ring-white">
                  {item.badge}
                </span>
              )}
            </div>
            <div className={cn(
              "absolute -bottom-1 w-1 h-1 rounded-full transition-all duration-300",
              isActive ? "bg-gold scale-100 opacity-100" : "bg-sapphire scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            )} />
            <span className="text-[10px] mt-1 font-medium tracking-wide opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
