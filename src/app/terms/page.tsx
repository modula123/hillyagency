import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Hilly Agency",
  description: "Terms and conditions for using Hilly Agency's travel platform and services.",
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--bg)] min-h-screen">
        <section className="bg-[var(--dark)] py-16">
          <div className="container mx-auto px-5 xl:px-0 max-w-[800px] text-white">
            <h1 className="text-3xl lg:text-4xl font-black">Terms of Service</h1>
            <p className="text-white/50 mt-2 text-sm">Last updated: January 2025</p>
          </div>
        </section>

        <div className="container mx-auto px-5 xl:px-0 max-w-[800px] py-14">
          <div className="prose prose-base max-w-none text-[var(--subtext)] [&_h2]:text-[var(--text)] [&_h3]:text-[var(--text)] [&_strong]:text-[var(--text)]">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using the Hilly Agency platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>

            <h2>2. Services</h2>
            <p>Hilly Agency provides a travel intelligence and experience booking platform for Rwanda and East Africa. We connect travelers with local tours, accommodations, transport, and travel planning services.</p>

            <h2>3. Bookings and Payments</h2>
            <p>All bookings are subject to availability. Booking requests are confirmed only upon written confirmation from Hilly Agency. Payment terms are specified per booking. We reserve the right to cancel bookings in extraordinary circumstances.</p>

            <h2>4. Cancellations and Refunds</h2>
            <p><strong>More than 30 days before travel:</strong> Full refund minus administrative fees.<br />
            <strong>15–30 days before travel:</strong> 50% refund.<br />
            <strong>Less than 15 days before travel:</strong> No refund. We strongly recommend travel insurance.</p>

            <h2>5. User Responsibilities</h2>
            <p>You are responsible for ensuring you hold valid travel documents (passport, visa) and comply with all entry requirements for Rwanda and any other country you visit.</p>

            <h2>6. Limitation of Liability</h2>
            <p>Hilly Agency acts as an intermediary between travelers and service providers. We are not liable for any injury, loss, damage, accident, delay, or irregularity caused by third-party service providers.</p>

            <h2>7. Intellectual Property</h2>
            <p>All content on this platform — including text, photos, logos, and design — is the property of Hilly Agency and protected by copyright law. Unauthorised use is strictly prohibited.</p>

            <h2>8. Governing Law</h2>
            <p>These terms are governed by the laws of the Republic of Rwanda. Any disputes shall be resolved in Kigali courts.</p>

            <h2>9. Contact</h2>
            <p>For any questions about these terms, email us at <a href="mailto:hillyagency0@gmail.com" className="text-[var(--accent)]">hillyagency0@gmail.com</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
