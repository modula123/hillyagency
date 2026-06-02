"use client";

import { useState } from "react";
import { destinations } from "@/lib/data";
import GeneralCard from "@/components/cards/GeneralCard";

type TabKey = "tours" | "activities" | "hotels" | "restaurants" | "transport" | "rentals";

const tabs: { key: TabKey; label: string }[] = [
  { key: "tours", label: "Tours" },
  { key: "activities", label: "Activities" },
  { key: "hotels", label: "Hotels" },
  { key: "restaurants", label: "Restaurants" },
  { key: "transport", label: "Transport" },
  { key: "rentals", label: "Rentals" },
];

export default function Recommended() {
  const [activeTab, setActiveTab] = useState<TabKey>("tours");

  // Flatten all items for the active tab across all destinations
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: any[] = destinations
    .flatMap((d) => {
      const list = (d[activeTab] as unknown[]) || [];
      return list.map((item) => ({
        ...(item as object),
        location: d.title,
        currency: d.currency,
      }));
    })
    .slice(0, 6);

  return (
    <section className="py-16 bg-[var(--bg)]">
      <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
        <div className="sec-title">
          <div>
            <h2>Recommended for You</h2>
            <p>Explore top picks across all categories</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === key
                  ? "bg-[var(--accent)] text-white shadow-lg"
                  : "bg-[var(--bg2)] text-[var(--subtext)] hover:text-[var(--text)] hover:bg-[var(--border)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length === 0 ? (
            <div className="no-result col-span-3">
              <p>No {activeTab} available yet.</p>
            </div>
          ) : (
            items.map((item, i) => (
              <GeneralCard key={i} type={activeTab} data={item} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
