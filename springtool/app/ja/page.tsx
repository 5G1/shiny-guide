import type { Metadata } from "next";
import PdfKeywordTool from "../components/PdfKeywordTool";

export const metadata: Metadata = {
  title: "PDFキーワード検索ツール | 複数PDFからキーワードとページ番号を検索",
  description:
    "複数のPDFファイルをアップロードし、キーワードを検索してPDF名、ページ番号、一致文章を抽出できるPDF検索ツールです。",
  keywords: [
    "PDF キーワード検索",
    "PDF 検索ツール",
    "PDF 文字検索",
    "PDF 複数検索",
    "PDF ページ検索",
    "PDF 文章抽出",
  ],
  alternates: {
    canonical: "/ja",
    languages: {
      en: "/en",
      ko: "/ko",
      zh: "/zh",
      ja: "/ja",
    },
  },
};

export default function JapanesePage() {
  return <PdfKeywordTool defaultLang="ja" />;
}