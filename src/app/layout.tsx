import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hillyagency.vercel.app"),
  title: {
    default: "Hilly Agency — The Digital Gateway to Rwanda & East Africa",
    template: "%s | Hilly Agency",
  },
  description:
    "Discover Rwanda and East Africa through trusted local expertise. Gorilla trekking, city tours, safaris, accommodations, and curated travel experiences — all in one place.",
  keywords: ["Rwanda travel","gorilla trekking","Kigali tours","East Africa safari","Rwanda tourism","Volcanoes National Park","Hilly Agency"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hillyagency.vercel.app",
    siteName: "Hilly Agency",
    title: "Hilly Agency — The Digital Gateway to Rwanda & East Africa",
    description: "Travel Rwanda and East Africa with clarity, confidence, and local expertise.",
    images: [{ url: "/images/brand/og.jpg", width: 1200, height: 630, alt: "Hilly Agency — Rwanda Travel Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hilly Agency — Rwanda & East Africa Travel Platform",
    description: "Travel East Africa with clarity, confidence, and local expertise.",
    images: ["/images/brand/og.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: { icon: "/images/brand/favicon.jpg", apple: "/images/brand/favicon.jpg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Detect system theme first, then check localStorage override — no flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    var stored = localStorage.getItem('hilly-theme');
    var theme = stored
      ? stored
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.className = theme;
  } catch(e) {
    document.documentElement.className = 'light';
  }
})();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
