import type { Metadata } from "next";
import Script from "next/script";
import GoogleAnalytics from "./components/GoogleAnalytics";
import "./globals.css";

const siteUrl = "https://springtool.vercel.app";
const gaMeasurementId = "G-YSSDVEX42E";
const adsensePublisherId = "ca-pub-5695613713640441";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  ],
  verification: {
    google: "YVhBUPtcbOHfC297IDpTwl5AEoXu5IQaqXf7RvJoa70",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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