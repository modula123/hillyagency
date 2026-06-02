import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Hilly Agency",
  description: "How Hilly Agency collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--bg)] min-h-screen">
        <section className="bg-[var(--dark)] py-16">
          <div className="container mx-auto px-5 xl:px-0 max-w-[800px] text-white">
            <h1 className="text-3xl lg:text-4xl font-black">Privacy Policy</h1>
            <p className="text-white/50 mt-2 text-sm">Last updated: January 2025</p>
          </div>
        </section>

        <div className="container mx-auto px-5 xl:px-0 max-w-[800px] py-14">
          <div className="prose prose-base max-w-none text-[var(--subtext)] [&_h2]:text-[var(--text)] [&_h3]:text-[var(--text)] [&_strong]:text-[var(--text)]">
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly: name, email, phone, travel preferences, and payment details. We also collect usage data automatically — pages visited, time spent, device information — via cookies and analytics tools.</p>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To process bookings and inquiries</li>
              <li>To communicate about your travel plans</li>
              <li>To personalise your experience on our platform</li>
              <li>To improve our services and platform</li>
              <li>To send travel updates (you can unsubscribe at any time)</li>
            </ul>

            <h2>3. Data Sharing</h2>
            <p>We do not sell your personal data. We share information only with service providers necessary to fulfil your booking (tour operators, accommodation providers, transport companies). All partners are contractually bound to protect your data.</p>

            <h2>4. Cookies</h2>
            <p id="cookies">We use essential cookies for platform functionality, analytics cookies (with your consent) to improve our service, and preference cookies to remember your theme and language settings. You can manage cookie preferences in your browser settings.</p>

            <h2>5. Data Retention</h2>
            <p>We retain your account data for as long as your account is active. Booking records are kept for 7 years for accounting purposes. You may request deletion of your personal data at any time.</p>

            <h2>6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:hillyagency0@gmail.com" className="text-[var(--accent)]">hillyagency0@gmail.com</a>.</p>

            <h2>7. Security</h2>
            <p>We use industry-standard encryption (TLS/HTTPS) and Supabase's enterprise-grade security to protect your data. We regularly review our security practices.</p>

            <h2>8. Contact</h2>
            <p>For privacy questions, email <a href="mailto:hillyagency0@gmail.com" className="text-[var(--accent)]">hillyagency0@gmail.com</a> or write to us at Hilly Agency, Kigali, Rwanda.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
