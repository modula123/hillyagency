import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-[var(--bg)] min-h-[70vh] flex flex-col items-center justify-center text-center px-5 py-20">
        <div className="mb-6 relative w-24 h-24 opacity-40">
          <Image src="/images/brand/blogo.svg" alt="Hilly" fill className="object-contain dark:hidden" />
          <Image src="/images/brand/wlogo.svg" alt="Hilly" fill className="object-contain hidden dark:block" />
        </div>
        <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mb-6">
          <Compass size={28} className="text-[var(--accent)]" />
        </div>
        <h1 className="text-5xl font-black text-[var(--text)] mb-3">404</h1>
        <h2 className="text-xl font-bold text-[var(--text)] mb-3">Page Not Found</h2>
        <p className="text-[var(--subtext)] max-w-sm mb-8">
          Looks like you&apos;ve ventured off the beaten path. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary inline-flex gap-2">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <Link href="/destinations" className="btn-outline inline-flex gap-2">
            Explore Destinations
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
