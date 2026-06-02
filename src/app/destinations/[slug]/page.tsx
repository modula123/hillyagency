import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/PageUtils";
import DestinationTabs from "./DestinationTabs";
import { destinations } from "@/lib/data";
import { MapPin } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: `${d.id}-${d.slug}` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [id] = slug.split("-");
  const dest = destinations.find((d) => d.id === id);
  if (!dest) return {};
  return {
    title: `${dest.title} — Rwanda Travel Guide`,
    description: dest.bio,
    openGraph: { title: `${dest.title} — Hilly Agency`, description: dest.bio, images: [{ url: dest.thumbnail }] },
    alternates: { canonical: `https://hillyagency.vercel.app/destinations/${slug}` },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const [id] = slug.split("-");
  const dest = destinations.find((d) => d.id === id);
  if (!dest) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: dest.title,
    description: dest.bio,
    url: `https://hillyagency.vercel.app/destinations/${slug}`,
    image: `https://hillyagency.vercel.app${dest.thumbnail}`,
    touristType: ["Adventure", "Cultural", "Wildlife"],
    containedInPlace: { "@type": "Country", name: "Rwanda" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ScrollProgress />
      <Header />
      <main className="bg-[var(--bg)]">
        {/* Hero — always dark, inline styles */}
        <div
          className="relative h-72 lg:h-80 overflow-hidden"
          style={{ background: "#12151e" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dest.thumbnail})`, opacity: 0.45 }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(18,21,30,0.9) 0%, rgba(18,21,30,0.3) 60%, transparent 100%)" }}
          />
          <div className="absolute bottom-10 left-0 right-0">
            <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
              <div className="flex items-center gap-1.5 mb-2" style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
                <span>/</span>
                <span style={{ color: "#fff" }}>{dest.title}</span>
              </div>
              <h1 className="font-black leading-tight mb-2" style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.75rem)" }}>
                {dest.title}
              </h1>
              <div className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
                <MapPin size={13} />
                <span>Rwanda</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-5 xl:px-0 max-w-[1200px] py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
            <div className="flex flex-col gap-8">
              <div
                className="prose prose-sm max-w-none text-[var(--subtext)] [&_h3]:text-[var(--text)] [&_h4]:text-[var(--text)] [&_p]:text-[var(--subtext)]"
                dangerouslySetInnerHTML={{ __html: dest.description }}
              />
              <DestinationTabs destination={dest} />
            </div>

            <aside className="sticky top-28">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg2)] p-5">
                <h3 className="font-bold text-[var(--text)] mb-4">What&apos;s Here</h3>
                <ul className="flex flex-col gap-2">
                  {[
                    { label: "Tours",       count: dest.tours?.length || 0 },
                    { label: "Activities",  count: dest.activities?.length || 0 },
                    { label: "Hotels",      count: dest.hotels?.length || 0 },
                    { label: "Restaurants", count: dest.restaurants?.length || 0 },
                    { label: "Transport",   count: dest.transport?.length || 0 },
                  ].map(({ label, count }) => (
                    <li key={label} className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-sm">
                      <span className="text-[var(--text)] font-medium">{label}</span>
                      <span className="font-bold text-[var(--accent)]">{count}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-[var(--border)]">
                  <Link href="/plan" className="btn-primary w-full justify-center py-3 text-sm rounded-xl">
                    Plan This Trip
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
