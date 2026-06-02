import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/PageUtils";
import StarRating from "@/components/ui/StarRating";
import BookingForm from "./BookingForm";
import { destinations } from "@/lib/data";
import { Clock, MapPin, Users, Check, X } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return destinations.flatMap((d) =>
    (d.tours || []).map((t) => ({ slug: t.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let tour = null;
  for (const d of destinations) {
    const found = d.tours?.find((t) => t.slug === slug);
    if (found) { tour = found; break; }
  }
  if (!tour) return {};
  return {
    title: `${tour.title} — Rwanda Tour`,
    description: tour.bio,
    openGraph: {
      title: `${tour.title} — Hilly Agency`,
      images: [{ url: tour.images?.[0] || "/images/hero/1.jpg" }],
    },
    alternates: { canonical: `https://hillyagency.vercel.app/tours/${slug}` },
  };
}

export default async function TourPage({ params }: Props) {
  const { slug } = await params;

  let tour = null;
  let destTitle = "";
  let destSlug = "";
  let destId = "";

  for (const d of destinations) {
    const found = d.tours?.find((t) => t.slug === slug);
    if (found) {
      tour = { ...found, currency: d.currency };
      destTitle = d.title;
      destSlug = d.slug;
      destId = d.id;
      break;
    }
  }

  if (!tour) notFound();

  const avg = tour.reviews?.length
    ? tour.reviews.reduce((s: number, r: {rating: number}) => s + r.rating, 0) / tour.reviews.length
    : null;

  const tourSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: tour.title,
    description: tour.bio,
    url: `https://hillyagency.vercel.app/tours/${slug}`,
    image: tour.images?.[0],
    offers: tour.price
      ? {
          "@type": "Offer",
          price: tour.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        }
      : undefined,
    aggregateRating: avg
      ? {
          "@type": "AggregateRating",
          ratingValue: avg.toFixed(1),
          reviewCount: tour.reviews.length,
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourSchema) }}
      />
      <ScrollProgress />
      <Header />
      <main className="bg-[var(--bg)] min-h-screen">
        {/* Hero image */}
        <div className="relative h-72 lg:h-96 overflow-hidden">
          <Image
            src={tour.images?.[0] || "/images/hero/1.jpg"}
            alt={tour.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-0 right-0">
            <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
              <div className="text-xs text-white/60 flex items-center gap-1 mb-2">
                <Link href="/destinations" className="hover:text-white">Destinations</Link>
                <span>/</span>
                <Link href={`/destinations/${destId}-${destSlug}`} className="hover:text-white">{destTitle}</Link>
                <span>/</span>
                <span className="text-white">{tour.title}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-white">{tour.title}</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-5 xl:px-0 max-w-[1200px] py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
            {/* Left */}
            <div className="flex flex-col gap-8">
              {/* Meta row */}
              <div className="flex flex-wrap gap-4">
                {avg && (
                  <div className="flex items-center gap-2 bg-[var(--bg2)] rounded-xl px-4 py-2.5">
                    <StarRating rating={avg} showValue count={tour.reviews.length} />
                  </div>
                )}
                <div className="flex items-center gap-2 bg-[var(--bg2)] rounded-xl px-4 py-2.5 text-sm text-[var(--subtext)]">
                  <Clock size={14} />
                  {tour.duration}
                </div>
                <div className="flex items-center gap-2 bg-[var(--bg2)] rounded-xl px-4 py-2.5 text-sm text-[var(--subtext)]">
                  <MapPin size={14} />
                  {destTitle}
                </div>
                {tour.max_group_size && (
                  <div className="flex items-center gap-2 bg-[var(--bg2)] rounded-xl px-4 py-2.5 text-sm text-[var(--subtext)]">
                    <Users size={14} />
                    Max {tour.max_group_size} people
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-black text-[var(--text)] mb-4">About This Tour</h2>
                <div
                  className="prose prose-sm max-w-none text-[var(--subtext)] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: tour.description }}
                />
              </div>

              {/* Includes/Excludes */}
              {((tour.includes?.length ?? 0) > 0 || (tour.excludes?.length ?? 0) > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {tour.includes && tour.includes.length > 0 && (
                    <div className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--bg2)]">
                      <h3 className="font-bold text-[var(--text)] mb-3">What&apos;s Included</h3>
                      <ul className="flex flex-col gap-2">
                        {tour.includes.map((item: string) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-[var(--subtext)]">
                            <Check size={14} className="text-green-500 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tour.excludes && tour.excludes.length > 0 && (
                    <div className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--bg2)]">
                      <h3 className="font-bold text-[var(--text)] mb-3">Not Included</h3>
                      <ul className="flex flex-col gap-2">
                        {tour.excludes.map((item: string) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-[var(--subtext)]">
                            <X size={14} className="text-[var(--accent)] shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Reviews */}
              {tour.reviews && tour.reviews.length > 0 && (
                <div>
                  <h2 className="text-xl font-black text-[var(--text)] mb-4">
                    Reviews ({tour.reviews.length})
                  </h2>
                  <div className="flex flex-col gap-4">
                    {tour.reviews.map((r: {userId: string; rating: number; message: string}, i: number) => (
                      <div key={i} className="rounded-2xl border border-[var(--border)] p-5 bg-[var(--bg2)]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-[var(--text)] text-sm">{r.userId}</span>
                          <StarRating rating={r.rating} size={12} />
                        </div>
                        <p className="text-sm text-[var(--subtext)]">{r.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking sidebar */}
            <aside className="sticky top-24">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] p-6">
                <div className="flex items-baseline justify-between mb-5">
                  <div>
                    {tour.price > 0 ? (
                      <>
                        <span className="text-3xl font-black text-[var(--accent)]">
                          {tour.currency}{tour.price}
                        </span>
                        <span className="text-sm text-[var(--subtext)] ml-1">/ person</span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-[var(--subtext)]">Price on request</span>
                    )}
                  </div>
                  <span className="text-xs bg-[var(--bg)] border border-[var(--border)] text-[var(--subtext)] px-2 py-1 rounded-lg">
                    {tour.duration}
                  </span>
                </div>

                <BookingForm tourSlug={slug} tourTitle={tour.title} price={tour.price} />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
