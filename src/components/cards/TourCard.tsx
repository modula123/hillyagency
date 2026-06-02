import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Star } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CardData = Record<string, any>;

interface TourCardProps {
  data: CardData;
  href?: string;
}

function getAvgRating(reviews: { rating: number }[]) {
  if (!reviews || reviews.length === 0) return null;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

export default function TourCard({ data, href }: TourCardProps) {
  const avg = getAvgRating(data.reviews || []);
  const img = data.images?.[0] || data.thumbnail || "/images/img/placeholder.jpg";
  const price = data.price ?? 0;
  const currency = data.currency || "$";
  const link = href || `/tours/${data.slug || data.id}`;

  return (
    <div className="hilly-card group flex flex-col h-full">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <Image
          src={img}
          alt={data.title || "Tour"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {data.is_featured && (
          <div className="absolute top-3 left-3 bg-[var(--accent)] text-white text-xs font-bold px-2.5 py-1 rounded-lg">
            Featured
          </div>
        )}
        {avg && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-lg">
            <Star size={11} fill="currentColor" className="text-[var(--gold)]" />
            {avg.toFixed(1)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {avg && (
          <div className="flex items-center gap-1 text-xs text-[var(--subtext)]">
            <Star size={12} fill="currentColor" className="text-[var(--gold)]" />
            <span className="font-semibold text-[var(--text)]">{avg.toFixed(1)}</span>
            <span>({(data.reviews || []).length} reviews)</span>
          </div>
        )}

        <h3 className="font-bold text-[var(--text)] line-clamp-2 leading-tight">
          {data.title}
        </h3>

        <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-[var(--subtext)]">
          {data.location && (
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              <span>{data.location}</span>
            </div>
          )}
          {data.duration && (
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{data.duration}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--border)]">
          <div className="text-[var(--text)]">
            {price > 0 ? (
              <>
                <span className="text-lg font-black text-[var(--accent)]">
                  {currency}{price.toFixed(0)}
                </span>
                <span className="text-xs text-[var(--subtext)] ml-1">/ person</span>
              </>
            ) : (
              <span className="text-sm font-semibold text-[var(--subtext)]">Price on request</span>
            )}
          </div>
          <Link href={link} className="btn-primary text-xs py-2 px-4 rounded-xl">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
