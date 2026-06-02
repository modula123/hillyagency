import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/PageUtils";
import PageHero from "@/components/ui/PageHero";
import StarRating from "@/components/ui/StarRating";
import ActivityBookingPanel from "./ActivityBookingPanel";
import { destinations } from "@/lib/data";
import { MapPin, Tag } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return destinations.flatMap((d) =>
    (d.activities || []).map((a) => ({ slug: a.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let act = null;
  for (const d of destinations) {
    const found = d.activities?.find((a) => a.slug === slug);
    if (found) { act = found; break; }
  }
  if (!act) return {};
  return {
    title: `${act.title} — Rwanda Experience`,
    description: act.bio,
    openGraph: { title: act.title, images: [{ url: act.images?.[0] || "/images/hero/1.jpg" }] },
    alternates: { canonical: `https://hillyagency.vercel.app/activities/${slug}` },
  };
}

export default async function ActivityPage({ params }: Props) {
  const { slug } = await params;

  let activity = null;
  let destTitle = "";
  let destId = "";
  let destSlug = "";

  for (const d of destinations) {
    const found = d.activities?.find((a) => a.slug === slug);
    if (found) {
      activity = { ...found, currency: d.currency };
      destTitle = d.title;
      destId = d.id;
      destSlug = d.slug;
      break;
    }
  }

  if (!activity) notFound();

  const avg = activity.reviews?.length
    ? activity.reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0) / activity.reviews.length
    : null;

  const image = activity.images?.[0] || "/images/img/placeholder.jpg";

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="bg-[var(--bg)] min-h-screen">
        {/* Hero */}
        <div className="relative h-72 lg:h-96 overflow-hidden">
          <Image src={image} alt={activity.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <div className="absolute bottom-8 left-0 right-0">
            <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
              {/* Breadcrumb */}
              <div className="text-xs flex items-center gap-1 mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
                <span>/</span>
                <Link href={`/destinations/${destId}-${destSlug}`} className="hover:text-white transition-colors">{destTitle}</Link>
                <span>/</span>
                <span style={{ color: "#fff" }}>{activity.title}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black" style={{ color: "#fff" }}>{activity.title}</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5 xl:px-0 max-w-[1200px] py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
            {/* Left */}
            <div className="flex flex-col gap-8">
              {/* Meta chips */}
              <div className="flex flex-wrap gap-3">
                {avg && (
                  <div className="flex items-center gap-2 bg-[var(--bg2)] rounded-xl px-4 py-2.5">
                    <StarRating rating={avg} showValue count={activity.reviews.length} />
                  </div>
                )}
                <div className="flex items-center gap-2 bg-[var(--bg2)] rounded-xl px-4 py-2.5 text-sm text-[var(--subtext)]">
                  <MapPin size={14} />
                  {destTitle}
                </div>
                <div className="flex items-center gap-2 bg-[var(--bg2)] rounded-xl px-4 py-2.5 text-sm text-[var(--subtext)]">
                  <Tag size={14} />
                  {activity.type} · {activity.category}
                </div>
              </div>

              {/* Intro bio */}
              {activity.bio && (
                <p className="text-base text-[var(--subtext)] leading-relaxed">{activity.bio}</p>
              )}

              {/* Description */}
              {activity.description && (
                <div>
                  <h2 className="text-xl font-black text-[var(--text)] mb-4">About This Experience</h2>
                  <div
                    className="prose prose-sm max-w-none text-[var(--subtext)] leading-relaxed [&_h4]:text-[var(--text)] [&_h3]:text-[var(--text)] [&_h2]:text-[var(--text)]"
                    dangerouslySetInnerHTML={{ __html: activity.description }}
                  />
                </div>
              )}

              {/* Reviews */}
              {activity.reviews && activity.reviews.length > 0 && (
                <div>
                  <h2 className="text-xl font-black text-[var(--text)] mb-4">Reviews ({activity.reviews.length})</h2>
                  <div className="flex flex-col gap-4">
                    {activity.reviews.map((r: { userId: string; rating: number; message: string }, i: number) => (
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

              {/* Back link */}
              <Link
                href={`/destinations/${destId}-${destSlug}`}
                className="inline-flex items-center gap-2 text-sm text-[var(--subtext)] hover:text-[var(--accent)] transition-colors"
              >
                ← Back to {destTitle}
              </Link>
            </div>

            {/* Right: Booking panel */}
            <aside className="sticky top-24">
              <ActivityBookingPanel
                activityTitle={activity.title}
                activitySlug={slug}
                destTitle={destTitle}
                type={activity.type}
              />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
