"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Menu,
  X,
} from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { contacts } from "@/lib/data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Tours" },
  { href: "/experiences", label: "Experiences" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { icon: Instagram, href: `https://instagram.com/${contacts.socialsMedia.instagram}`, label: "Instagram" },
  { icon: Facebook, href: `https://facebook.com/${contacts.socialsMedia.facebook}`, label: "Facebook" },
  { icon: Linkedin, href: `https://linkedin.com/company/${contacts.socialsMedia.linkedin}`, label: "LinkedIn" },
  { icon: Youtube, href: `https://youtube.com/@${contacts.socialsMedia.youtube}`, label: "YouTube" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 left-0 w-full z-[99999] bg-[var(--bg)] transition-shadow duration-300 ${
        scrolled ? "shadow-md shadow-black/10" : ""
      }`}
    >
      {/* ─── TOP BAR ─────────────────────────────────────────── */}
      <div className="border-b border-[var(--border)] hidden lg:block">
        <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
          <div className="flex items-center justify-between gap-8 py-1.5">
            {/* Left: contact info */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[var(--bg2)] text-[var(--text)]">
                  <Phone size={14} />
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[var(--subtext)] leading-none">Call Us</span>
                  <Link
                    href={`tel:+${contacts.phone}`}
                    className="text-xs font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                  >
                    +{contacts.phone.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4")}
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[var(--bg2)] text-[var(--text)]">
                  <Mail size={14} />
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[var(--subtext)] leading-none">Email Us</span>
                  <Link
                    href={`mailto:${contacts.email}`}
                    className="text-xs font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                  >
                    {contacts.email}
                  </Link>
                </div>
              </div>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/brand/blogo.svg"
                alt="Hilly Agency"
                width={90}
                height={45}
                className="dark:hidden"
                priority
              />
              <Image
                src="/images/brand/wlogo.svg"
                alt="Hilly Agency"
                width={90}
                height={45}
                className="hidden dark:block"
                priority
              />
            </Link>

            {/* Right: location + socials */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[var(--bg2)] text-[var(--text)]">
                  <MapPin size={14} />
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[var(--subtext)] leading-none">Location</span>
                  <Link
                    href={contacts.location}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                  >
                    {contacts.address}
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-[var(--subtext)]">Follow Us</span>
                <div className="flex items-center gap-1">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-[var(--subtext)] hover:text-[var(--accent)] transition-colors"
                    >
                      <Icon size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN NAV (desktop) ─────────────────────────────── */}
      <nav className="hidden lg:block border-b border-[var(--border)]">
        <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
          <div className="flex items-center justify-between gap-8">
            <ul className="flex items-center gap-1">
              {navLinks.map(({ href, label }) => {
                const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`relative px-3 py-5 font-medium text-sm flex items-center transition-colors duration-300 group ${
                        active ? "text-[var(--accent)]" : "text-[var(--text)] hover:text-[var(--accent)]"
                      }`}
                    >
                      {label}
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-[var(--accent)] rounded-full transition-all duration-300 ${
                          active ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link href="/login" className="btn-outline text-sm py-2 px-4 rounded-xl">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary text-sm py-2 px-4 rounded-xl">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── MOBILE NAV BAR ─────────────────────────────────── */}
      <div className="lg:hidden flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
        <Link href="/">
          <Image
            src="/images/brand/blogo.svg"
            alt="Hilly Agency"
            width={80}
            height={40}
            className="dark:hidden"
          />
          <Image
            src="/images/brand/wlogo.svg"
            alt="Hilly Agency"
            width={80}
            height={40}
            className="hidden dark:block"
          />
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-xl text-[var(--text)] hover:bg-[var(--bg2)] transition-all"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ─── MOBILE DRAWER ──────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[57px] z-[99998] bg-[var(--bg)] overflow-y-auto">
          <div className="flex flex-col px-5 py-6 gap-1">
            {navLinks.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`py-3 px-4 rounded-xl font-semibold text-base transition-all ${
                    active
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--text)] hover:bg-[var(--bg2)]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[var(--border)]">
              <Link href="/login" className="btn-outline text-center py-3">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary text-center py-3">
                Create Account
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[var(--border)]">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-xl bg-[var(--bg2)] text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>

            <p className="text-xs text-[var(--subtext)] mt-2">{contacts.hours}</p>
          </div>
        </div>
      )}
    </header>
  );
}
