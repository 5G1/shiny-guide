import type { Metadata, Viewport } from "next";
import Script from "next/script";
import GoogleAnalytics from "./components/GoogleAnalytics";
import PwaRegister from "./components/PwaRegister";
import "./globals.css";

const siteUrl = "https://springtool.vercel.app";
const gaMeasurementId = "G-YSSDVEX42E";
const adsensePublisherId = "ca-pub-5695613713640441";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2f6b4f",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "springtool",
  manifest: "/manifest.json",
  title: {
    default: "PDF Keyword Search Tool by springtool",
    template: "%s | springtool",
  },
  description:
    "Search keywords across multiple PDF files and extract matched sentences with PDF names and page numbers.",
  keywords: [
    "PDF keyword search",
    "PDF keyword search tool",
    "PDF keyword finder",
    "multiple PDF search",
    "search keywords in PDF",
    "PDF sentence extractor",
    "PDF page finder",
    "PDF research tool",
    "PDF page number finder",
  ],
  verification: {
    google: "YVhBUPtcbOHfC297IDpTwl5AEoXu5IQaqXf7RvJoa70",
  },
  icons: {
    icon: [
      {
        url: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "springtool",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "PDF Keyword Search Tool by springtool",
    description:
      "Upload multiple PDF files, search keywords, and extract matched sentences with PDF names and page numbers.",
    url: `${siteUrl}/en`,
    siteName: "springtool",
    type: "website",
  },
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      ko: "/ko",
      zh: "/zh",
      ja: "/ja",
    },
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": "springtool",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PwaRegister />

        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <GoogleAnalytics measurementId={gaMeasurementId} />

        {children}
      </body>
    </html>
  );
}