"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  faqs: { q: string; a: string }[];
}

export default function FaqAccordion({ faqs }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map(({ q, a }, i) => (
        <div
          key={i}
          className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
            open === i ? "border-[var(--accent)] bg-[var(--bg2)]" : "border-[var(--border)] bg-[var(--bg2)]"
          }`}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
          >
            <span className="font-bold text-[var(--text)] text-sm leading-snug">{q}</span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-[var(--subtext)] transition-transform duration-300 ${
                open === i ? "rotate-180 text-[var(--accent)]" : ""
              }`}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-5">
              <p className="text-sm text-[var(--subtext)] leading-relaxed">{a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
