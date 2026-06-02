import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In — Hilly Agency",
  description: "Sign in to your Hilly Agency account to manage bookings, save favourites, and access your travel history.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--bg)] flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/">
              <Image
                src="/images/brand/blogo.svg"
                alt="Hilly Agency"
                width={100}
                height={50}
                className="mx-auto dark:hidden"
              />
              <Image
                src="/images/brand/wlogo.svg"
                alt="Hilly Agency"
                width={100}
                height={50}
                className="mx-auto hidden dark:block"
              />
            </Link>
            <h1 className="text-2xl font-black text-[var(--text)] mt-5 mb-1">Welcome back</h1>
            <p className="text-sm text-[var(--subtext)]">Sign in to your account</p>
          </div>
          <LoginForm />
          <p className="text-center text-sm text-[var(--subtext)] mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[var(--accent)] font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
