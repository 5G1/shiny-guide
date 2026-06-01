import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | springtool",
  description: "Terms of Use for springtool PDF Keyword Search Tool.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f4f7ef] px-5 py-12 text-[#24382d]">
      <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
        <Link href="/en" className="text-sm font-bold text-[#2f6b4f]">
          ← Back to PDF Keyword Search Tool
        </Link>

        <h1 className="mt-6 text-4xl font-black text-[#1f4f3a]">
          Terms of Use
        </h1>

        <p className="mt-6 text-sm text-[#7d8f82]">
          Last updated: June 1, 2026
        </p>

        <h2 className="mt-8 text-2xl font-black text-[#2f6b4f]">
          1. Acceptance of Terms
        </h2>
        <p className="mt-3 leading-8 text-[#52695a]">
          By using springtool, you agree to these Terms of Use. If you do not
          agree, please do not use the service.
        </p>

        <h2 className="mt-8 text-2xl font-black text-[#2f6b4f]">
          2. Service Description
        </h2>
        <p className="mt-3 leading-8 text-[#52695a]">
          springtool provides PDF keyword search, page number locating, matched
          sentence extraction, OCR support, and export functions.
        </p>

        <h2 className="mt-8 text-2xl font-black text-[#2f6b4f]">
          3. User Responsibility
        </h2>
        <p className="mt-3 leading-8 text-[#52695a]">
          Users are responsible for ensuring that they have the right to upload
          and process any PDF files used with the service. Users should not
          upload confidential, illegal, or unauthorized content.
        </p>

        <h2 className="mt-8 text-2xl font-black text-[#2f6b4f]">
          4. Accuracy of Results
        </h2>
        <p className="mt-3 leading-8 text-[#52695a]">
          Search and OCR results may not always be perfect. Users should verify
          important results manually, especially for academic, legal, business,
          or official use.
        </p>

        <h2 className="mt-8 text-2xl font-black text-[#2f6b4f]">
          5. Limitation of Liability
        </h2>
        <p className="mt-3 leading-8 text-[#52695a]">
          springtool is provided as a helpful tool, but we do not guarantee
          uninterrupted availability or error-free results. We are not liable
          for losses caused by use of the service.
        </p>

        <h2 className="mt-8 text-2xl font-black text-[#2f6b4f]">
          6. Operator
        </h2>
        <p className="mt-3 leading-8 text-[#52695a]">
          Operator / Developer: 스프링툴바
          <br />
          Contact: springtoolbar@gmail.com
        </p>
      </section>
    </main>
  );
}