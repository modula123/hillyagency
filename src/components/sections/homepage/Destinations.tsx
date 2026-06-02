import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { destinations } from "@/lib/data";
import DestinationCard from "@/components/cards/DestinationCard";

export default function DestinationsSection() {
  const featured = destinations.filter((d) => d.is_featured);
  const rest = destinations.filter((d) => !d.is_featured).slice(0, 4);

  return (
    <section className="py-16 bg-[var(--bg)]">
      <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
        {/* Section title */}
        <div className="sec-title">
          <div>
            <h2>Top Destinations</h2>
            <p>Handpicked destinations across Rwanda and East Africa</p>
          </div>
          <Link href="/destinations" className="view-more-btn">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Featured grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>

        {/* Smaller grid for non-featured */}
        {rest.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {rest.map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.id}-${dest.slug}`}
                className="group relative overflow-hidden rounded-xl h-36 block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${dest.thumbnail})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-white font-bold text-sm">{dest.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
