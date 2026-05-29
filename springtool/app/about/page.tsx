import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | PDF Keyword Search Tool by springtool",
  description:
    "Learn about springtool, a PDF keyword search tool for researchers, students, and professionals.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f4f7ef] px-5 py-12 text-[#24382d]">
      <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
        <Link href="/en" className="text-sm font-bold text-[#2f6b4f]">
          ← Back to PDF Keyword Search Tool
        </Link>

        <h1 className="mt-6 text-4xl font-black text-[#1f4f3a]">
          About springtool
        </h1>

        <p className="mt-6 text-lg leading-8 text-[#52695a]">
          springtool is a simple PDF keyword search tool designed for students,
          researchers, writers, and professionals who need to search through PDF
          documents quickly.
        </p>

        <p className="mt-4 text-lg leading-8 text-[#52695a]">
          You can upload multiple PDF files, enter keywords, and find matched
          sentences together with the PDF name and page number. This makes it
          easier to review academic papers, manuals, reports, and research
          materials.
        </p>

        <h2 className="mt-10 text-2xl font-black text-[#2f6b4f]">
          Main Features
        </h2>

        <ul className="mt-4 list-disc space-y-3 pl-6 text-[#52695a]">
          <li>Search keywords across multiple PDF files</li>
          <li>Find the PDF name and page number of matched sentences</li>
          <li>Extract matched sentences and surrounding context</li>
          <li>Support OCR for scanned PDFs</li>
          <li>Export results to Excel and Word</li>
        </ul>

        <h2 className="mt-10 text-2xl font-black text-[#2f6b4f]">
          Developer
        </h2>

        <p className="mt-4 text-lg leading-8 text-[#52695a]">
          Developer: 5G1
          <br />
          Contact: your-email@example.com
        </p>
      </section>
    </main>
  );
}