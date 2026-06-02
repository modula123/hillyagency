import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, Mail, Instagram, Facebook, Linkedin, Youtube, Twitter } from "lucide-react";
import { contacts } from "@/lib/data";

const footerLinks = {
  Experiences: [
    { label: "Gorilla Trekking", href: "/tours/gorilla-trekking" },
    { label: "City Tours", href: "/tours" },
    { label: "Wildlife Safaris", href: "/tours" },
    { label: "Canopy Walk", href: "/tours/canopy-walk" },
    { label: "Chimp Tracking", href: "/tours/chimp-tracking" },
    { label: "Lake Kivu Tours", href: "/tours/kivu-island-tour" },
  ],
  Destinations: [
    { label: "Kigali", href: "/destinations/001-kigali-city" },
    { label: "Musanze / Volcanoes", href: "/destinations/002-musanze" },
    { label: "Nyungwe Forest", href: "/destinations/003-nyungwe" },
    { label: "Lake Kivu", href: "/destinations/004-lake-kivu" },
    { label: "Akagera Park", href: "/destinations/005-akagera" },
    { label: "All Destinations", href: "/destinations" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog & Guides", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
    { label: "Plan Your Trip", href: "/plan" },
    { label: "FAQ", href: "/faq" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund Policy", href: "/terms#refunds" },
    { label: "Cookie Policy", href: "/privacy-policy#cookies" },
  ],
};

const socials = [
  { icon: Instagram, href: `https://instagram.com/${contacts.socialsMedia.instagram}`, label: "Instagram" },
  { icon: Facebook, href: `https://facebook.com/${contacts.socialsMedia.facebook}`, label: "Facebook" },
  { icon: Twitter, href: "https://x.com/hillyagency", label: "Twitter/X" },
  { icon: Linkedin, href: `https://linkedin.com/company/${contacts.socialsMedia.linkedin}`, label: "LinkedIn" },
  { icon: Youtube, href: `https://youtube.com/@${contacts.socialsMedia.youtube}`, label: "YouTube" },
];

export default function Footer() {
  return (
    <>
      {/* Scoped CSS — footer always dark, no theme bleed */}
      <style>{`
        .hilly-footer { background: #12151e; color: #fff; }
        .hilly-footer a { color: rgba(255,255,255,0.45); transition: color 0.2s; }
        .hilly-footer a:hover { color: #fff; }
        .hilly-footer .foot-head { color: #fff; font-weight: 700; font-size: 13px; margin-bottom: 14px; display: block; }
        .hilly-footer .foot-border-b { border-bottom: 1px solid rgba(255,255,255,0.08); }
        .hilly-footer .foot-border-t { border-top: 1px solid rgba(255,255,255,0.08); }
        .hilly-footer .foot-meta { color: rgba(255,255,255,0.55); font-size: 13px; }
        .hilly-footer .foot-dim { color: rgba(255,255,255,0.3); font-size: 12px; }
        .hilly-footer .foot-social {
          display: inline-flex; align-items: center; justify-content: center;
          width: 30px; height: 30px; border-radius: 8px;
          background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.55);
          transition: background 0.2s, color 0.2s;
        }
        .hilly-footer .foot-social:hover { background: rgb(193,51,33); color: #fff; }
        .hilly-footer .foot-cta { color: #fff; font-weight: 700; font-size: 13px; }
        .hilly-footer .foot-cta:hover { color: rgb(193,51,33); }
      `}</style>

      <footer className="hilly-footer">
        {/* ─── TOP STRIP ─────────────────────────────────────── */}
        <div className="foot-border-b">
          <div className="container mx-auto px-5 xl:px-0 max-w-[1200px] py-4 flex items-center justify-between flex-wrap gap-4">
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/brand/wlogo.svg"
                alt="Hilly Agency"
                width={68}
                height={30}
                className="object-contain"
                style={{ height: 30, width: "auto" }}
              />
            </Link>
            <div className="flex items-center gap-2">
              <Phone size={15} style={{ color: "rgb(193,51,33)", flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", lineHeight: 1, marginBottom: 2 }}>Need help?</p>
                <Link href={`tel:+${contacts.phone}`} className="foot-cta">+{contacts.phone}</Link>
              </div>
            </div>
          </div>
        </div>

        {/* ─── MAIN GRID ──────────────────────────────────────── */}
        <div className="container mx-auto px-5 xl:px-0 max-w-[1200px] py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Contact col */}
            <div className="col-span-2">
              <span className="foot-head">Contact Us</span>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href={contacts.location} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-2 foot-meta">
                    <MapPin size={13} style={{ marginTop: 2, flexShrink: 0, color: "rgb(193,51,33)" }} />
                    {contacts.address}
                  </Link>
                </li>
                <li className="flex items-center gap-2 foot-meta">
                  <Clock size={13} style={{ flexShrink: 0, color: "rgb(193,51,33)" }} />
                  {contacts.hours}
                </li>
                <li>
                  <Link href={`mailto:${contacts.email}`} className="flex items-center gap-2 foot-meta">
                    <Mail size={13} style={{ flexShrink: 0, color: "rgb(193,51,33)" }} />
                    {contacts.email}
                  </Link>
                </li>
              </ul>

              <span className="foot-head" style={{ marginTop: 22, display: "block" }}>Follow us</span>
              <div className="flex items-center gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <Link key={label} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label} className="foot-social">
                    <Icon size={13} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <span className="foot-head">{heading}</span>
                <ul className="flex flex-col gap-2">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href} style={{ fontSize: 13 }}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ─── BOTTOM BAR ─────────────────────────────────────── */}
        <div className="foot-border-t">
          <div className="container mx-auto px-5 xl:px-0 max-w-[1200px] py-4 flex flex-wrap items-center justify-between gap-3">
            <p className="foot-dim">© {new Date().getFullYear()} Hilly Agency. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {[
                { label: "Terms", href: "/terms" },
                { label: "Privacy", href: "/privacy-policy" },
                { label: "Cookies", href: "/privacy-policy#cookies" },
              ].map(({ label, href }) => (
                <Link key={label} href={href} className="foot-dim">{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
