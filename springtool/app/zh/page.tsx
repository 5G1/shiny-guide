import type { Metadata } from "next";
import PdfKeywordTool from "../components/PdfKeywordTool";

export const metadata: Metadata = {
  title: "PDF关键词搜索工具 | 批量搜索PDF关键词与页码",
  description:
    "上传多个PDF文件，输入关键词，快速查找PDF名称、页码和匹配句子。适合论文、研究资料和文档检索。",
  keywords: [
    "PDF关键词搜索",
    "PDF关键词搜索工具",
    "PDF文字搜索",
    "PDF内容搜索",
    "PDF批量搜索",
    "PDF页码查找",
  ],
  alternates: {
    canonical: "/zh",
    languages: {
      en: "/en",
      ko: "/ko",
      zh: "/zh",
      ja: "/ja",
    },
  },
};

export default function ChinesePage() {
  return <PdfKeywordTool defaultLang="zh" />;
}