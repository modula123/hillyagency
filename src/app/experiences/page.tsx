import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/PageUtils";
import PageHero from "@/components/ui/PageHero";
import GeneralCard from "@/components/cards/GeneralCard";
import { destinations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Experiences in Rwanda — Activities & Adventures",
  description: "Discover unique experiences across Rwanda — gorilla encounters, canopy walks, cultural visits, bird watching, and more.",
  alternates: { canonical: "https://hillyagency.vercel.app/experiences" },
};

export default function ExperiencesPage() {
  const allActivities = destinations.flatMap((d) =>
    (d.activities || []).map((a) => ({ ...a, location: d.title, currency: d.currency }))
  );

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="bg-[var(--bg)] min-h-screen">
        <PageHero
          eyebrow="Curated Activities"
          title="Experiences"
          subtitle="Authentic, local, curated — activities and adventures across all Rwanda destinations."
          backgroundImage="/images/img/canopy.jpg"
        />
        <section className="py-14 container mx-auto px-5 xl:px-0 max-w-[1200px]">
          {allActivities.length === 0 ? (
            <p className="no-result">No experiences available yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allActivities.map((act, i) => (
                <GeneralCard key={i} type="activities" data={act} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
