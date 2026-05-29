import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | springtool",
  description:
    "Contact the developer of springtool PDF Keyword Search Tool.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f4f7ef] px-5 py-12 text-[#24382d]">
      <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
        <Link href="/en" className="text-sm font-bold text-[#2f6b4f]">
          ← Back to PDF Keyword Search Tool
        </Link>

        <h1 className="mt-6 text-4xl font-black text-[#1f4f3a]">
          Contact
        </h1>

        <p className="mt-6 text-lg leading-8 text-[#52695a]">
          If you have feedback, bug reports, feature requests, or collaboration
          ideas, please contact the developer.
        </p>

        <div className="mt-8 rounded-2xl border border-[#d8e7d3] bg-[#fbfcf7] p-6">
          <h2 className="text-2xl font-black text-[#2f6b4f]">
            Developer Information
          </h2>

          <p className="mt-4 leading-8 text-[#52695a]">
            Developer: 5G1
            <br />
            Email: your-email@example.com
          </p>
        </div>

        <p className="mt-6 text-sm leading-7 text-[#7d8f82]">
          Please replace the email address with your real contact email before
          public promotion or AdSense application.
        </p>
      </section>
    </main>
  );
}