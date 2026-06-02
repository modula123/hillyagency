"use client";

import Image from "next/image";
import { brands } from "@/lib/data";

export default function Brands() {
  return (
    <section className="py-10 bg-[var(--bg)] border-y border-[var(--border)] overflow-hidden">
      <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
        <p className="text-center text-xs font-bold tracking-widest uppercase text-[var(--subtext)] mb-6">
          Trusted Partners
        </p>
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {brands.map((brand, i) => (
            <div
              key={brand.title}
              className={`flex items-center justify-center p-3 rounded-xl transition-all duration-300 ${
                i === Math.floor(brands.length / 2)
                  ? "bg-[var(--bg2)] opacity-100 scale-110"
                  : "opacity-50 hover:opacity-100 hover:bg-[var(--bg2)]"
              }`}
            >
              <Image
                src={brand.image}
                alt={brand.title}
                width={80}
                height={40}
                className="object-contain h-8 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
