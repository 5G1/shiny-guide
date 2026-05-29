import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://springtool.vercel.app"),
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
  openGraph: {
    title: "PDF Keyword Search Tool by springtool",
    description:
      "Upload multiple PDF files, search keywords, and extract matched sentences with PDF names and page numbers.",
    url: "https://springtool.vercel.app/en",
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
      <body>{children}</body>
    </html>
  );
}