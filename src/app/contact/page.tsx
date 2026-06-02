import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/PageUtils";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "./ContactForm";
import { contacts } from "@/lib/data";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — Plan Your Rwanda Trip",
  description: "Get in touch with Hilly Agency to plan your Rwanda safari, gorilla trekking, city tours, or custom itinerary. We respond within 24 hours.",
  alternates: { canonical: "https://hillyagency.vercel.app/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="bg-[var(--bg)] min-h-screen">
        <PageHero
          eyebrow="Talk to a Local Expert"
          title="Let's Plan Your Trip"
          subtitle="Tell us what you're dreaming of. Our Rwanda experts will craft the perfect experience."
        />

        <div className="container mx-auto px-5 xl:px-0 max-w-[1200px] py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
            <ContactForm />
            <aside className="flex flex-col gap-5">
              {[
                { icon: Phone, label: "Call Us",      value: `+${contacts.phone}`, href: `tel:+${contacts.phone}` },
                { icon: Mail,  label: "Email Us",     value: contacts.email, href: `mailto:${contacts.email}` },
                { icon: MapPin,label: "Visit Us",     value: contacts.address, href: contacts.location },
                { icon: Clock, label: "Working Hours",value: contacts.hours, href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg2)]">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(193,51,33,0.1)" }}>
                    <Icon size={18} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[var(--subtext)] uppercase tracking-wider mb-1">{label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--text)] hover:text-[var(--accent)] transition-colors text-sm">{value}</a>
                    ) : (
                      <p className="font-semibold text-[var(--text)] text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <a
                href={`https://wa.me/${contacts.phone}?text=Hi Hilly Agency, I'd like to plan a trip to Rwanda!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 rounded-2xl border-2 transition-all"
                style={{ borderColor: "#22c55e", background: "rgba(34,197,94,0.05)" }}
              >
                <MessageCircle size={22} style={{ color: "#22c55e" }} />
                <div>
                  <p className="font-bold text-[var(--text)] text-sm">Chat on WhatsApp</p>
                  <p className="text-xs text-[var(--subtext)]">Fastest — usually within 1 hour</p>
                </div>
              </a>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
