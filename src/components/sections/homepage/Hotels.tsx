import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { destinations } from "@/lib/data";
import TourCard from "@/components/cards/TourCard";

export default function HotelsSection() {
  const hotels = destinations
    .flatMap((d) =>
      (d.hotels || []).map((h) => ({
        ...h,
        location: d.title,
        currency: d.currency,
        slug: h.slug || h.id,
        duration: undefined,
        type: h.type || "Hotel",
        bio: h.bio,
        is_featured: h.is_featured,
      }))
    )
    .filter((h) => {
      const avg = h.reviews?.length
        ? h.reviews.reduce((s, r) => s + r.rating, 0) / h.reviews.length
        : 0;
      return avg >= 3;
    })
    .sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0))
    .slice(0, 3);

  return (
    <section className="py-16 bg-[var(--bg)]">
      <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
        <div className="sec-title">
          <div>
            <h2>Top Rated Hotels</h2>
            <p>Quality as judged by customers. Book at the ideal price!</p>
          </div>
          <Link href="/destinations" className="view-more-btn">
            View More <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.length === 0 ? (
            <p className="no-result">No top rated hotels available.</p>
          ) : (
            hotels.map((hotel) => (
              <TourCard
                key={hotel.id}
                data={hotel as Parameters<typeof TourCard>[0]["data"]}
                href={`/destinations/${
                  destinations.find((d) => d.hotels?.some((h) => h.id === hotel.id))?.id
                }-${
                  destinations.find((d) => d.hotels?.some((h) => h.id === hotel.id))?.slug
                }`}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
