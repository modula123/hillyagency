import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/PageUtils";
import { Shield, Heart, Star, Globe, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Hilly Agency — Rwanda's Travel Intelligence Platform",
  description:
    "Hilly Agency is Rwanda's most trusted travel platform — connecting travelers with authentic local experiences, expert guides, and curated East Africa journeys.",
  alternates: { canonical: "https://hillyagency.vercel.app/about" },
};

const pillars = [
  { icon: Globe, title: "Explore", desc: "We help travelers discover Rwanda and East Africa deeply — not surface-level tourism." },
  { icon: Shield, title: "Trust", desc: "Trust beats features. Trust beats design. We're the most trusted local source in Rwanda travel." },
  { icon: Star, title: "Curate", desc: "Every experience on Hilly is intentional — handpicked, verified, and designed to delight." },
  { icon: Heart, title: "Preserve", desc: "We promote sustainable tourism and actively support local communities and conservation." },
];

export default function AboutPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="bg-[var(--bg)]">
        {/* Hero */}
        <section className="relative bg-[var(--dark)] py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/destination/kigali.jpg)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--dark)] via-[var(--dark)]/80 to-transparent" />
          <div className="container mx-auto px-5 xl:px-0 max-w-[1200px] relative z-10 text-white">
            <div className="max-w-2xl">
              <p className="text-[var(--gold)] text-sm font-bold uppercase tracking-widest mb-4">Our Story</p>
              <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-6">
                The Digital Gateway<br />to Rwanda & East Africa
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                Hilly was built in Kigali with one mission — to help travelers experience Rwanda and
                East Africa with clarity, confidence, and genuine local expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-[var(--bg)]">
          <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[var(--accent)] text-sm font-bold uppercase tracking-widest mb-3">Who We Are</p>
                <h2 className="text-3xl lg:text-4xl font-black text-[var(--text)] leading-tight mb-6">
                  We&apos;re Not a Travel Agency.<br />We&apos;re a Travel Platform.
                </h2>
                <p className="text-[var(--subtext)] text-base leading-relaxed mb-4">
                  Hilly is Rwanda&apos;s first travel intelligence platform — combining destination discovery,
                  curated experiences, local expertise, and concierge support into one trusted place.
                </p>
                <p className="text-[var(--subtext)] text-base leading-relaxed mb-8">
                  We believe the best travel starts with the best information. When you plan with Hilly,
                  you&apos;re tapping into local knowledge built on the ground — not copied from a guidebook.
                </p>
                <Link href="/contact" className="btn-primary inline-flex gap-2">
                  Plan With Us <ArrowRight size={16} />
                </Link>
              </div>
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
                <Image src="/images/destination/kigali.jpg" alt="Kigali Rwanda" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-20 bg-[var(--bg2)]">
          <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
            <div className="text-center mb-12">
              <p className="text-[var(--accent)] text-sm font-bold uppercase tracking-widest mb-3">What We Stand For</p>
              <h2 className="text-3xl font-black text-[var(--text)]">Our Brand Pillars</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-6 rounded-2xl bg-[var(--bg)] border border-[var(--border)]">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[var(--accent)]" />
                  </div>
                  <h3 className="font-bold text-[var(--text)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--subtext)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-20 bg-[var(--dark)] text-white">
          <div className="container mx-auto px-5 xl:px-0 max-w-[800px] text-center">
            <p className="text-[var(--gold)] text-sm font-bold uppercase tracking-widest mb-4">Our Vision</p>
            <h2 className="text-3xl lg:text-4xl font-black mb-6">
              Become the Definitive Digital Gateway<br />to Rwanda and East Africa
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              When someone thinks &ldquo;Rwanda travel&rdquo; — whether for gorilla trekking, a conference,
              a family trip, or a solo adventure — the answer should be Hilly.
            </p>
            <Link href="/tours" className="btn-primary inline-flex gap-2">
              Explore Tours <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
