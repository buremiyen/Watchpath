import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import "./editorial.css";
import AdSlots from "./ad-slots";
import SiteFooter from "./site-footer";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-5750786390629221";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Watchpath | Avengers: Doomsday Maraton Planlayıcısı";
  const description =
    "Doomsday'e kadar kalan zamanda Marvel maratonunu planla, izlediklerini işaretle ve akıllı takvimini otomatik güncelle.";

  return {
    metadataBase: new URL(origin),
    title,
    description,
    applicationName: "Watchpath",
    manifest: "/manifest.webmanifest",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/favicon.svg" },
    appleWebApp: { capable: true, title: "Watchpath", statusBarStyle: "black-translucent" },
    openGraph: {
      type: "website",
      url: origin,
      siteName: "Watchpath",
      title,
      description,
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Watchpath Doomsday maraton planlayıcısı" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
    other: { "google-adsense-account": adsenseClient },
  };
}

export const viewport: Viewport = {
  themeColor: "#111315",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        <Script
          id="adsense"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
        />
        <AdSlots />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
