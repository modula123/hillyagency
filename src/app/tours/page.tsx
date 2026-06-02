import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/PageUtils";
import PageHero from "@/components/ui/PageHero";
import ToursClient from "./ToursClient";
import { destinations } from "@/lib/data";
import type { Tour } from "@/lib/types";

export const metadata: Metadata = {
  title: "Tours in Rwanda & East Africa",
  description: "Browse all Rwanda tours — gorilla trekking, city tours, safaris, canopy walks, chimpanzee tracking, and more. Book with local experts at Hilly Agency.",
  alternates: { canonical: "https://hillyagency.vercel.app/tours" },
  openGraph: {
    title: "Rwanda Tours — Hilly Agency",
    description: "Gorilla trekking, safaris, city tours and more. All in Rwanda.",
    images: [{ url: "/images/destination/musanze.jpg" }],
  },
};

export type TourWithMeta = Tour & { location: string; currency: string };

export default function ToursPage() {
  const allTours: TourWithMeta[] = destinations.flatMap((d) =>
    (d.tours || []).map((t) => ({ ...t, location: d.title, currency: d.currency }))
  );
  const types = [...new Set(allTours.map((t) => t.type).filter(Boolean))];
  const locs  = [...new Set(allTours.map((t) => t.location).filter(Boolean))];

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="bg-[var(--bg)] min-h-screen">
        <PageHero
          title="Explore Rwanda's Best Tours"
          subtitle={`${allTours.length} curated tours — gorilla trekking, city tours, wildlife safaris, nature walks, and cultural experiences.`}
          backgroundImage="/images/destination/musanze.jpg"
        />
        <ToursClient tours={allTours} types={types} locations={locs} />
      </main>
      <Footer />
    </>
  );
}
