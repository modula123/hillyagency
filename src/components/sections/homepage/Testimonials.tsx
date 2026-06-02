"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonies, userList } from "@/lib/data";

export default function Testimonials() {
  const featured = testimonies.filter((t) => t.is_featured);
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % featured.length), [featured.length]);
  const prev = () => setCurrent((c) => (c - 1 + featured.length) % featured.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = featured[current];
  if (!t) return null;

  const author = userList.find((u) => u.userId === t.userId);

  return (
    <section className="py-16 bg-[var(--dark)] text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--accent)]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="container mx-auto px-5 xl:px-0 max-w-[1200px] relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white">What Travelers Say</h2>
          <p className="text-white/50 mt-2">Real experiences from real people</p>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                fill={i < t.rating ? "currentColor" : "none"}
                className={i < t.rating ? "text-[var(--gold)]" : "text-white/20"}
              />
            ))}
          </div>

          {/* Message */}
          <blockquote className="text-white/90 text-lg leading-relaxed italic mb-8 transition-all duration-500">
            &ldquo;{t.message}&rdquo;
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--gold)]">
              <Image
                src={author?.profilePicture || "/images/img/profile.png"}
                alt={author?.fullName || "Traveler"}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <p className="font-bold text-white text-sm">{author?.fullName || "Anonymous Traveler"}</p>
              <p className="text-white/40 text-xs">{author?.role || "Traveler"}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-white hover:text-white transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "w-6 h-2 bg-[var(--accent)]" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-white hover:text-white transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
