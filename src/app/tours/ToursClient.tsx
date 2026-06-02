"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import TourCard from "@/components/cards/TourCard";
import type { TourWithMeta } from "./page";

interface Props {
  tours: TourWithMeta[];
  types: string[];
  locations: string[];
}

export default function ToursClient({ tours, types, locations }: Props) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [showFilters, setShowFilters] = useState(false);

  const maxAvailablePrice = Math.max(...tours.map((t) => t.price || 0), 5000);

  const filtered = useMemo(() => {
    return tours.filter((t) => {
      const matchSearch =
        !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.bio.toLowerCase().includes(search.toLowerCase());
      const matchType = selectedType === "all" || t.type === selectedType;
      const matchLoc = selectedLocation === "all" || t.location === selectedLocation;
      const matchPrice = (t.price || 0) <= maxPrice;
      return matchSearch && matchType && matchLoc && matchPrice;
    });
  }, [tours, search, selectedType, selectedLocation, maxPrice]);

  const resetFilters = () => {
    setSearch("");
    setSelectedType("all");
    setSelectedLocation("all");
    setMaxPrice(maxAvailablePrice);
  };

  const isFiltered =
    search || selectedType !== "all" || selectedLocation !== "all" || maxPrice < maxAvailablePrice;

  return (
    <div className="container mx-auto px-5 xl:px-0 max-w-[1200px] py-10">
      {/* Search + filter toggle */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--subtext)]" />
          <input
            type="text"
            placeholder="Search tours…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border transition-all ${
            showFilters
              ? "bg-[var(--accent)] text-white border-[var(--accent)]"
              : "bg-[var(--bg2)] text-[var(--text)] border-[var(--border)]"
          }`}
        >
          <SlidersHorizontal size={15} />
          Filters
        </button>
        {isFiltered && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium text-[var(--subtext)] hover:text-[var(--accent)] border border-[var(--border)] bg-[var(--bg2)] transition-colors"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="mb-8 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Type */}
          <div>
            <label className="text-xs font-bold text-[var(--subtext)] uppercase tracking-wider mb-2 block">
              Tour Type
            </label>
            <div className="flex flex-wrap gap-2">
              {["all", ...types].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedType === t
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--bg)] border border-[var(--border)] text-[var(--subtext)] hover:text-[var(--text)]"
                  }`}
                >
                  {t === "all" ? "All Types" : t}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-xs font-bold text-[var(--subtext)] uppercase tracking-wider mb-2 block">
              Destination
            </label>
            <div className="flex flex-wrap gap-2">
              {["all", ...locations].map((l) => (
                <button
                  key={l}
                  onClick={() => setSelectedLocation(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedLocation === l
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--bg)] border border-[var(--border)] text-[var(--subtext)] hover:text-[var(--text)]"
                  }`}
                >
                  {l === "all" ? "All Destinations" : l}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-xs font-bold text-[var(--subtext)] uppercase tracking-wider mb-2 block">
              Max Price: ${maxPrice.toLocaleString()}
            </label>
            <input
              type="range"
              min={0}
              max={maxAvailablePrice}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <div className="flex justify-between text-xs text-[var(--subtext)] mt-1">
              <span>$0</span>
              <span>${maxAvailablePrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-[var(--subtext)] mb-6">
        Showing <strong className="text-[var(--text)]">{filtered.length}</strong> of {tours.length} tours
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="no-result py-20">
          <p>No tours match your filters.</p>
          <button onClick={resetFilters} className="mt-4 btn-primary text-sm">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tour) => (
            <TourCard key={tour.id} data={tour} />
          ))}
        </div>
      )}
    </div>
  );
}
