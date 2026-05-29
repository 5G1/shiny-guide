import type { Metadata } from "next";
import PdfKeywordTool from "../components/PdfKeywordTool";

export const metadata: Metadata = {
  title: "PDF Keyword Search Tool | Search Keywords Across Multiple PDFs",
  description:
    "Upload multiple PDF files, search keywords, and extract matched sentences with PDF names and page numbers. A simple PDF keyword search tool for researchers and students.",
  keywords: [
    "PDF keyword search tool",
    "PDF keyword finder",
    "search keywords in PDF",
    "multiple PDF search",
    "PDF sentence extractor",
    "PDF page finder",
  ],
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

export default function EnglishPage() {
  return <PdfKeywordTool defaultLang="en" />;
}