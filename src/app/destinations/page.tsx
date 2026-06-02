import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/PageUtils";
import PageHero from "@/components/ui/PageHero";
import DestinationCard from "@/components/cards/DestinationCard";
import { destinations } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Destinations in Rwanda & East Africa",
  description: "Explore Rwanda's most captivating destinations — from Kigali city to gorilla country, lake shores and ancient forests.",
  alternates: { canonical: "https://hillyagency.vercel.app/destinations" },
};

export default function DestinationsPage() {
  const featured = destinations.filter((d) => d.is_featured);
  const others   = destinations.filter((d) => !d.is_featured);

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="bg-[var(--bg)] min-h-screen">
        <PageHero
          title="All Destinations"
          subtitle="10 handpicked destinations across Rwanda — each with curated tours, trusted accommodations, and local expertise."
          backgroundImage="/images/destination/kigali.jpg"
          eyebrow="Rwanda & East Africa"
        />

        <section className="py-16 bg-[var(--bg)]">
          <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
            <h2 className="text-xl font-black text-[var(--text)] mb-6">Featured Destinations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          </div>
        </section>

        {others.length > 0 && (
          <section className="py-10 pb-20 bg-[var(--bg2)]">
            <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
              <h2 className="text-xl font-black text-[var(--text)] mb-6">More Destinations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {others.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
