import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | springtool",
  description:
    "Privacy Policy for springtool PDF Keyword Search Tool.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f4f7ef] px-5 py-12 text-[#24382d]">
      <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
        <Link href="/en" className="text-sm font-bold text-[#2f6b4f]">
          ← Back to PDF Keyword Search Tool
        </Link>

        <h1 className="mt-6 text-4xl font-black text-[#1f4f3a]">
          Privacy Policy
        </h1>

        <p className="mt-6 text-sm text-[#7d8f82]">
          Last updated: May 29, 2026
        </p>

        <h2 className="mt-8 text-2xl font-black text-[#2f6b4f]">
          1. Overview
        </h2>
        <p className="mt-3 leading-8 text-[#52695a]">
          springtool is a PDF keyword search tool. Users can upload PDF files,
          search keywords, and export search results. We aim to keep the service
          simple and transparent.
        </p>

        <h2 className="mt-8 text-2xl font-black text-[#2f6b4f]">
          2. Uploaded Files
        </h2>
        <p className="mt-3 leading-8 text-[#52695a]">
          Uploaded PDF files are processed for keyword search and result
          extraction. The service does not intentionally provide a public file
          storage feature. However, files may be temporarily processed by the
          backend server while the search request is being handled.
        </p>

        <h2 className="mt-8 text-2xl font-black text-[#2f6b4f]">
          3. Information We May Process
        </h2>
        <ul className="mt-3 list-disc space-y-3 pl-6 text-[#52695a]">
          <li>PDF file names and content required for keyword search</li>
          <li>Keywords entered by users</li>
          <li>Search results generated from uploaded files</li>
          <li>Basic technical information such as request logs</li>
        </ul>

        <h2 className="mt-8 text-2xl font-black text-[#2f6b4f]">
          4. Cookies and Advertising
        </h2>
        <p className="mt-3 leading-8 text-[#52695a]">
          If advertisements are enabled in the future, third-party vendors,
          including Google, may use cookies to serve ads based on users’ visits
          to this or other websites. Users may be able to manage personalized ad
          settings through Google’s advertising settings.
        </p>

        <h2 className="mt-8 text-2xl font-black text-[#2f6b4f]">
          5. Contact
        </h2>
        <p className="mt-3 leading-8 text-[#52695a]">
          If you have questions about this Privacy Policy, please contact:
          <br />
          your-email@example.com
        </p>
      </section>
    </main>
  );
}