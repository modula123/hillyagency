import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/PageUtils";
import PageHero from "@/components/ui/PageHero";
import PlanForm from "./PlanForm";

export const metadata: Metadata = {
  title: "Plan Your Rwanda Trip — Custom Itinerary",
  description: "Tell us your dream Rwanda experience. Our local experts will craft a fully customised itinerary — gorilla trekking, safaris, city breaks, or multi-country East Africa tours.",
  alternates: { canonical: "https://hillyagency.vercel.app/plan" },
};

export default function PlanPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="bg-[var(--bg)] min-h-screen">
        <PageHero
          eyebrow="Travel Concierge"
          title="Plan Your Perfect Trip"
          subtitle="Answer a few questions and our Rwanda travel experts will build a custom itinerary just for you — completely free."
        />
        <div className="container mx-auto px-5 xl:px-0 max-w-[780px] py-16">
          <PlanForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
