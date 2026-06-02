"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-5 py-20" style={{ background: "var(--bg, #fff)", color: "var(--text, #12151e)" }}>
          <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mb-5">
            <AlertTriangle size={26} className="text-red-600" />
          </div>
          <h1 className="text-2xl font-black mb-3">Something went wrong</h1>
          <p className="text-sm max-w-sm mb-2" style={{ color: "var(--subtext, #666)" }}>
            An unexpected error occurred. Our team has been notified.
          </p>
          {error.digest && (
            <p className="text-xs mb-6" style={{ color: "var(--subtext, #666)" }}>Error ID: {error.digest}</p>
          )}
          <div className="flex gap-3">
            <button
              onClick={reset}
              className="px-5 py-3 rounded-xl font-semibold text-sm"
              style={{ background: "rgb(193,51,33)", color: "#fff" }}
            >
              Try Again
            </button>
            <Link href="/" className="px-5 py-3 rounded-xl border font-semibold text-sm">
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
