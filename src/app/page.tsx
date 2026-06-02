import type { Metadata } from "next";
import { ScrollProgress, PageLoader } from "@/components/ui/PageUtils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/homepage/Hero";
import DestinationsSection from "@/components/sections/homepage/Destinations";
import ToursSection from "@/components/sections/homepage/Tours";
import Cta1 from "@/components/sections/homepage/Cta1";
import HotelsSection from "@/components/sections/homepage/Hotels";
import Cta2 from "@/components/sections/homepage/Cta2";
import Recommended from "@/components/sections/homepage/Recommended";
import Testimonials from "@/components/sections/homepage/Testimonials";
import Brands from "@/components/sections/homepage/Brands";
import BlogSection from "@/components/sections/homepage/Blog";
import Cta3 from "@/components/sections/homepage/Cta3";

export const metadata: Metadata = {
  title: "Hilly Agency — The Digital Gateway to Rwanda & East Africa",
  description:
    "Discover Rwanda and East Africa through trusted local expertise. Gorilla trekking, city tours, safaris, and curated experiences — all in one place.",
  alternates: { canonical: "https://hillyagency.vercel.app" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Hilly Agency",
  url: "https://hillyagency.vercel.app",
  logo: "https://hillyagency.vercel.app/images/brand/wlogo.svg",
  description:
    "Rwanda's premier travel intelligence platform offering gorilla trekking, city tours, safaris and curated East Africa experiences.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kigali",
    addressCountry: "RW",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+250785450266",
    email: "hillyagency0@gmail.com",
    contactType: "customer service",
    availableLanguage: ["English", "French", "Kinyarwanda"],
  },
  areaServed: ["Rwanda", "Uganda", "Tanzania", "Kenya", "East Africa"],
  sameAs: [
    "https://instagram.com/hillyagency",
    "https://facebook.com/hillyagency",
    "https://linkedin.com/company/hillyagency",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <PageLoader />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Cta1 />
        <DestinationsSection />
        <ToursSection />
        <HotelsSection />
        <Cta2 />
        <Recommended />
        <Testimonials />
        <Brands />
        <BlogSection />
        <Cta3 />
      </main>
      <Footer />
    </>
  );
}
