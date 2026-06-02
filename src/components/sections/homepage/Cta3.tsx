"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Phone, ArrowRight, X } from "lucide-react";
import QuickBookModal from "@/components/ui/QuickBookModal";

export default function Cta3() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="py-16 bg-[var(--bg)]">
      <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
        <div className="flex flex-wrap items-center gap-0 rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg2)]">
          <div className="flex-1 min-w-[280px] h-72 relative">
            <Image src="/images/img/canopy.jpg" alt="Rwanda canopy walk" fill className="h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--bg2)] hidden lg:block" />
          </div>

          <div className="flex-1 min-w-[280px] p-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--accent)] mb-4">
              <span className="w-8 h-0.5 bg-[var(--accent)]" />
              Travel With Confidence
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-[var(--text)] leading-tight mb-4">
              Travel to Make Memories<br />That Last a Lifetime
            </h2>
            <p className="text-[var(--subtext)] mb-8 leading-relaxed">
              Every journey is a story — allow us to craft extraordinary experiences
              across Rwanda and East Africa, tailored to you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/plan" className="btn-primary inline-flex gap-2">
                <ArrowRight size={16} />
                Plan My Trip
              </Link>
              <button
                onClick={() => setShowModal(true)}
                className="btn-outline inline-flex gap-2"
              >
                <Phone size={16} />
                Quick Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <QuickBookModal
          title="Quick Enquiry"
          subtitle="Hilly Agency — Rwanda & East Africa"
          type="general"
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}
