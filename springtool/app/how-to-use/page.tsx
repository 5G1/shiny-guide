import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Use | PDF Keyword Search Tool",
  description:
    "Learn how to upload PDFs, search keywords, find page numbers, and export results with springtool.",
};

export default function HowToUsePage() {
  return (
    <main className="min-h-screen bg-[#f4f7ef] px-5 py-12 text-[#24382d]">
      <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
        <Link href="/en" className="text-sm font-bold text-[#2f6b4f]">
          ← Back to PDF Keyword Search Tool
        </Link>

        <h1 className="mt-6 text-4xl font-black text-[#1f4f3a]">
          How to Use springtool
        </h1>

        <p className="mt-6 text-lg leading-8 text-[#52695a]">
          springtool helps you search keywords inside multiple PDF files and
          extract matched sentences with page numbers.
        </p>

        <div className="mt-8 space-y-6">
          <Step
            number="1"
            title="Upload PDF files"
            desc="Select one or more PDF files from your computer. For large scanned PDFs, processing may take longer."
          />
          <Step
            number="2"
            title="Enter keywords"
            desc="Enter one or more keywords. Separate multiple keywords with commas."
          />
          <Step
            number="3"
            title="Choose search options"
            desc="Enable OCR if your PDFs are scanned or image-based. Enable context if you want to see surrounding sentences."
          />
          <Step
            number="4"
            title="Start search"
            desc="Click the search button. Results will show the PDF name, keyword, page number, and matched sentence."
          />
          <Step
            number="5"
            title="Export results"
            desc="Download results as Excel or Word files for research notes, reports, or documentation."
          />
        </div>
      </section>
    </main>
  );
}

function Step({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-[#d8e7d3] bg-[#fbfcf7] p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2f6b4f] font-black text-white">
          {number}
        </div>
        <h2 className="text-xl font-black text-[#2f6b4f]">{title}</h2>
      </div>
      <p className="mt-3 leading-7 text-[#52695a]">{desc}</p>
    </div>
  );
}