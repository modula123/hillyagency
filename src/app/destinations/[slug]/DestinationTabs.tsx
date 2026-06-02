"use client";

import { useState } from "react";
import GeneralCard from "@/components/cards/GeneralCard";
import type { Destination } from "@/lib/types";

type Tab = "tours" | "activities" | "hotels" | "restaurants" | "transport" | "rentals";

const TABS: { key: Tab; label: string }[] = [
  { key: "tours", label: "Tours" },
  { key: "activities", label: "Activities" },
  { key: "hotels", label: "Hotels" },
  { key: "restaurants", label: "Restaurants" },
  { key: "transport", label: "Transport" },
  { key: "rentals", label: "Rentals" },
];

export default function DestinationTabs({ destination }: { destination: Destination }) {
  const [active, setActive] = useState<Tab>("tours");

  const items = ((destination[active] as unknown[]) || []) as Record<string, unknown>[];

  return (
    <div className="flex flex-col gap-6">
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(({ key, label }) => {
          const count = ((destination[key] as unknown[]) || []).length;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                active === key
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--bg2)] text-[var(--subtext)] hover:text-[var(--text)]"
              }`}
            >
              {label}
              {count > 0 && (
                <span className={`ml-1.5 text-xs ${active === key ? "opacity-70" : "opacity-50"}`}>
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div>
        <h2 className="text-2xl font-black text-[var(--text)] mb-5">
          {TABS.find((t) => t.key === active)?.label} in {destination.title}
        </h2>

        {items.length === 0 ? (
          <div className="no_tab_content flex flex-col items-center py-12 text-[var(--subtext)]">
            <p>No {active} listed for {destination.title} yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {items.map((item, i) => (
              <GeneralCard
                key={i}
                type={active}
                data={{ ...item, location: destination.title, currency: destination.currency }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
