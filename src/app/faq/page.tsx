import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/PageUtils";
import PageHero from "@/components/ui/PageHero";
import FaqAccordion from "./FaqAccordion";
import { faqs } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "FAQ — Rwanda Travel Questions Answered",
  description: "Everything you need to know about travelling to Rwanda — visas, gorilla trekking permits, best time to visit, safety, packing lists, and more.",
  alternates: { canonical: "https://hillyagency.vercel.app/faq" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ScrollProgress />
      <Header />
      <main className="bg-[var(--bg)] min-h-screen">
        <PageHero
          eyebrow="Help Centre"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about travelling to Rwanda — answered by local experts."
        />
        <section className="container mx-auto px-5 xl:px-0 max-w-[760px] py-16">
          <FaqAccordion faqs={faqs} />
        </section>
      </main>
      <Footer />
    </>
  );
}
