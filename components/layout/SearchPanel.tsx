"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import api from "@/lib/api";

export function useSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 3) { setResults([]); setLoading(false); return; }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await api.get(`/api/products?search=${encodeURIComponent(query.trim())}`);
        setResults(res.data.slice(0, 10));
      } catch { setResults([]); }
      finally { setLoading(false); }
    }, 300);
  }, [query]);

  const close = () => { setOpen(false); setQuery(""); setResults([]); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    close();
    router.push(`/products?search=${encodeURIComponent(q)}`);
  };

  const handleProductClick = (slug: string) => {
    close();
    router.push(`/product/${slug}`);
  };

  return { query, setQuery, results, loading, open, setOpen, close, handleSubmit, handleProductClick, showPanel: open && query.trim().length >= 3 };
}

export default function ResultsPanel({ query, results, loading, showPanel, onProductClick, onViewAll, onClose }: {
  query: string; results: Record<string, unknown>[]; loading: boolean; showPanel: boolean;
  onProductClick: (slug: string) => void; onViewAll: (e: React.FormEvent) => void; onClose: () => void;
}) {
  if (!showPanel) return null;
  return (
    <div className="fixed z-[190] left-1/2 -translate-x-1/2 top-[80px] w-[50vw] max-w-[600px] min-w-[320px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[50vh]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 shrink-0">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {loading ? "Searching…" : results.length > 0 ? `${results.length} results for "${query}"` : `No results for "${query}"`}
        </p>
        <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-400"><X className="w-4 h-4" /></button>
      </div>
      <div className="overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-10 text-slate-400 text-sm"><Loader2 className="w-5 h-5 animate-spin" />Searching…</div>
        ) : results.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            <Search className="w-10 h-10 mx-auto mb-3 text-slate-200" />
            No products found for <span className="font-semibold text-slate-600">"{query}"</span>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {results.map((product) => (
              <button key={product._id as string} type="button" onClick={() => onProductClick(product.slug as string)}
                className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-slate-50 transition-colors group text-left focus:outline-none">
                <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 group-hover:border-royal/30 transition-colors">
                  {(product.images as string[])?.[0] ? (
                    <Image src={(product.images as string[])[0]} alt={product.name as string} width={56} height={56} className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px]">No img</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 leading-tight group-hover:text-royal transition-colors truncate">{product.name as string}</p>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{product.description as string}</p>
                  <span className="inline-block mt-1 text-[10px] text-white bg-royal/80 rounded-full px-2 py-0.5">{product.category as string}</span>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-royal">₹{product.price as number}</p>
                  {(product.originalPrice as number) > (product.price as number) && (
                    <p className="text-[10px] text-slate-400 line-through">₹{product.originalPrice as number}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {results.length > 0 && (
        <div className="border-t border-slate-100 px-4 py-3 shrink-0">
          <button onClick={onViewAll as React.MouseEventHandler} className="w-full text-center text-sm text-royal font-semibold hover:underline">
            View all results for "{query}" →
          </button>
        </div>
      )}
    </div>
  );
}
