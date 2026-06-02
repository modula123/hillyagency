"use client";

import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-[var(--dark)]">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero/1.jpg"
        preload="none"
      >
        {/* Video served from CDN — swap src for your Supabase Storage URL */}
        <source src="/images/video/travel1.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 xl:px-0 max-w-[1200px] py-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              Rwanda&apos;s #1 Travel Intelligence Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-white font-black leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            Discover Rwanda.<br />
            <span className="text-[var(--gold)]">Experience East Africa.</span>
          </h1>

          {/* Subline */}
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl">
            Gorilla trekking, city tours, wildlife safaris, and curated local experiences —
            planned and delivered by trusted Rwanda experts.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white font-bold px-7 py-4 rounded-2xl transition-all duration-300 text-base shadow-lg shadow-[var(--accent)]/30"
            >
              Explore Tours
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-bold px-7 py-4 rounded-2xl transition-all duration-300 text-base"
            >
              <Play size={16} fill="currentColor" />
              Talk to Us
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-8 mt-14 pt-10 border-t border-white/20">
            {[
              { val: "1K+", label: "Happy Travelers" },
              { val: "25+", label: "Guided Tours" },
              { val: "10", label: "Destinations" },
              { val: "95%", label: "Satisfaction Rate" },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-[var(--gold)] font-black text-2xl leading-none">{val}</span>
                <span className="text-white/60 text-xs mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
