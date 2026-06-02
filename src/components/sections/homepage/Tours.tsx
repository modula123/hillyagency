import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { destinations } from "@/lib/data";
import TourCard from "@/components/cards/TourCard";

export default function ToursSection() {
  const allTours = destinations
    .flatMap((d) =>
      (d.tours || []).map((t) => ({
        ...t,
        location: d.title,
        currency: d.currency,
      }))
    )
    .filter((t) => t.is_featured)
    .slice(0, 3);

  return (
    <section className="py-16 bg-[var(--bg2)]">
      <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
        <div className="sec-title">
          <div>
            <h2>Popular Tours</h2>
            <p>Curated experiences trusted by thousands of travellers</p>
          </div>
          <Link href="/tours" className="view-more-btn">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTours.length === 0 ? (
            <p className="no-result">No featured tours available.</p>
          ) : (
            allTours.map((tour) => (
              <TourCard key={tour.id} data={tour} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
