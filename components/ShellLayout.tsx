"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navigation";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import ScrollToTop from "@/components/ScrollToTop";

const Footer = dynamic(() => import("@/components/layout/Footer").then((mod) => mod.Footer), {
  ssr: false,
});

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main className={!isAdmin ? "pt-16" : ""}>
        {children}
      </main>
      {!isAdmin && <MobileBottomNav />}
      {!isAdmin && <Footer />}
    </>
  );
}
