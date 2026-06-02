import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Create Account — Hilly Agency",
  description: "Create your free Hilly Agency account to book tours, save favourites, and manage your Rwanda travel plans.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--bg)] flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/">
              <Image src="/images/brand/blogo.svg" alt="Hilly Agency" width={100} height={50} className="mx-auto dark:hidden" />
              <Image src="/images/brand/wlogo.svg" alt="Hilly Agency" width={100} height={50} className="mx-auto hidden dark:block" />
            </Link>
            <h1 className="text-2xl font-black text-[var(--text)] mt-5 mb-1">Create your account</h1>
            <p className="text-sm text-[var(--subtext)]">Start planning your Rwanda adventure</p>
          </div>
          <RegisterForm />
          <p className="text-center text-sm text-[var(--subtext)] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--accent)] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
