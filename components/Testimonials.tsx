"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  { name: "Lavanya", duration: "One Year With Us", avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Lavanya&backgroundColor=b6e3f4", review: "The kurti I ordered arrived on time, looked exactly like the picture — and was even more beautiful in person! The quality is high and the fit is perfect. Thank you, Annaya Boutique!" },
  { name: "Sravani", duration: "One Year With Us", avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sravani&backgroundColor=c0aede", review: "This is my 6th order from Annaya! After seeing and using your outfits, I've completely stopped visiting shops. The quality is amazing and your response is always awesome. Thank you so much!" },
  { name: "Sukanya", duration: "Happy Customer", avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sukanya&backgroundColor=ffd5dc", review: "The product looks exactly like the picture. I'm completely satisfied with it. The fabric quality is outstanding and delivery was super fast. Thanks, Annaya Boutique!" },
  { name: "Priya Sharma", duration: "Regular Customer", avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Priya&backgroundColor=d1f4cc", review: "Absolutely love the lehenga I ordered for my cousin's wedding! Got so many compliments. The embroidery work is exquisite and packaging was beautiful. Will definitely order again!" },
  { name: "Meena Reddy", duration: "Two Years With Us", avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Meena&backgroundColor=ffdfbf", review: "I've been shopping here for two years and never once been disappointed. The customer service is warm and helpful, and every outfit is exactly as shown. Truly a boutique that cares!" },
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const prevT = () => setCurrentTestimonial((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  const nextT = () => setCurrentTestimonial((p) => (p === testimonials.length - 1 ? 0 : p + 1));

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-start justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal leading-tight">Client&apos;s Feedback <br />&amp; Trust</h2>
          <div className="flex gap-2 mt-2 shrink-0">
            <button onClick={prevT} className="w-10 h-10 rounded-full bg-royal text-white flex items-center justify-center hover:bg-royal/80 transition-colors shadow-md transition-transform active:scale-95" aria-label="Previous testimonial"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={nextT} className="w-10 h-10 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center hover:border-royal hover:text-royal transition-colors transition-transform active:scale-95" aria-label="Next testimonial"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="space-y-4">
          {[0, 1, 2].map((offset) => {
            const idx = (currentTestimonial + offset) % testimonials.length;
            const t = testimonials[idx];
            return (
              <div key={`${idx}-${offset}`}
                className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 anim-fade-up ${offset === 0 ? "ring-1 ring-royal/10" : ""}`}
                style={{ animationDelay: `${offset * 0.1}s` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Image src={t.avatar} alt={t.name} width={44} height={44} unoptimized className="rounded-full border-2 border-slate-100 bg-slate-50" />
                    <div><p className="font-bold text-slate-800 text-sm">{t.name}</p><p className="text-xs text-slate-400">{t.duration}</p></div>
                  </div>
                  <div className="text-4xl font-serif font-black text-gold/30 leading-none select-none">❝</div>
                </div>
                <div className="flex gap-0.5 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />)}</div>
                <p className="text-slate-600 text-sm leading-relaxed">&quot;{t.review}&quot;</p>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrentTestimonial(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentTestimonial ? "bg-royal w-5" : "bg-slate-300"}`} aria-label={`Go to testimonial ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
