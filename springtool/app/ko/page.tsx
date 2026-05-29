import type { Metadata } from "next";
import PdfKeywordTool from "../components/PdfKeywordTool";

export const metadata: Metadata = {
  title: "PDF 키워드 검색 도구 | 여러 PDF에서 키워드와 페이지 찾기",
  description:
    "여러 PDF 파일을 업로드하고 키워드를 검색하여 PDF명, 페이지 번호, 매칭 문장을 빠르게 추출하는 PDF 키워드 검색 도구입니다.",
  keywords: [
    "PDF 키워드 검색",
    "PDF 단어 검색",
    "PDF 검색 도구",
    "PDF 문장 추출",
    "PDF 페이지 찾기",
    "여러 PDF 검색",
  ],
  alternates: {
    canonical: "/ko",
    languages: {
      en: "/en",
      ko: "/ko",
      zh: "/zh",
      ja: "/ja",
    },
  },
};

export default function KoreanPage() {
  return <PdfKeywordTool defaultLang="ko" />;
}