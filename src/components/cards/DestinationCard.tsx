import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronRight } from "lucide-react";
import type { Destination } from "@/lib/types";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const tourCount = destination.tours?.length || 0;
  const hotelCount = destination.hotels?.length || 0;

  return (
    <Link
      href={`/destinations/${destination.id}-${destination.slug}`}
      className="group relative overflow-hidden rounded-2xl block h-72 hover:no-underline"
    >
      {/* Background image */}
      <Image
        src={destination.thumbnail}
        alt={destination.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/20 transition-all duration-500" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1 text-white/70 text-xs mb-1">
              <MapPin size={11} />
              Rwanda
            </div>
            <h3 className="font-black text-xl leading-tight">{destination.title}</h3>
            <p className="text-white/70 text-xs mt-1 line-clamp-1">{destination.bio}</p>
          </div>
          <div className="shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20 group-hover:bg-[var(--accent)] transition-colors">
            <ChevronRight size={16} />
          </div>
        </div>

        {(tourCount > 0 || hotelCount > 0) && (
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/20 text-xs text-white/60">
            {tourCount > 0 && <span>{tourCount} tour{tourCount !== 1 ? "s" : ""}</span>}
            {hotelCount > 0 && <span>{hotelCount} hotel{hotelCount !== 1 ? "s" : ""}</span>}
          </div>
        )}
      </div>
    </Link>
  );
}
