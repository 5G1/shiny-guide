"use client";

import { useState } from "react";
import {
  UploadCloud,
  Search,
  FileText,
  BarChart3,
  Download,
  Leaf,
  Sparkles,
} from "lucide-react";

type Lang = "en" | "zh" | "ko" | "ja";

type SearchResult = {
  page: number;
  keyword: string;
  sentence: string;
  context: string;
  method: string;
};

type KeywordStat = {
  keyword: string;
  count: number;
  keyword_length: number;
  total_keyword_chars: number;
  pdf_total_chars: number;
  ratio: string;
};

type ApiResponse = {
  filename: string;
  pages: number;
  keywords: string[];
  total_results: number;
  stats: KeywordStat[];
  results: SearchResult[];
};

const translations = {
  en: {
    badge: "Forest-inspired academic research tool",
    title: "springtool",
    description:
      "Upload PDFs, search keywords, and instantly extract matching sentences.",
    featureLocate: "Precise keyword locating",
    featureOcr: "OCR support",
    featureStats: "Keyword statistics",
    featureExport: "Export results",

    uploadTitle: "Upload PDF File",
    uploadDesc: "Click or drag your PDF file here",
    uploadSubDesc: "Single PDF file supported, max 200MB",
    uploadButton: "Select PDF File",
    selected: "Selected",

    keywordTitle: "Enter Keywords",
    keywordPlaceholder: "Enter keywords, separated by commas",
    example: "Example: social capital, feminism, national identity",

    optionTitle: "Search Options",
    enableOcr: "Enable OCR for scanned PDFs",
    enableOcrDesc: "For scanned or image-based PDFs",
    showContext: "Show surrounding context",
    showContextDesc: "Display context around matched sentences",

    startSearch: "Start Search",
    searching: "Searching...",
    tip: "The more precise the keyword, the more accurate the result.",

    pdfAnalysis: "PDF Analysis Results",
    filename: "Filename",
    pages: "PDF Pages",
    matchedResults: "Matched Results",

    keywordStats: "Keyword Statistics",
    appeared: "Appeared",
    times: "times",
    keywordChars: "Keyword characters",
    pdfTotalChars: "PDF total characters",
    ratio: "Ratio",

    matchedSentences: "Matched Sentences",
    page: "Page",
    method: "Method",

    uploadAlert: "Please upload a PDF file first.",
    keywordAlert: "Please enter at least one keyword.",
    backendAlert: "Backend connection failed. Please check if FastAPI is running.",
    noResult: "No matched sentences found.",
  },

  zh: {
    badge: "森林风格学术研究工具",
    title: "springtool",
    description: "上传 PDF，输入关键词，快速定位页码并提取相关句子。",
    featureLocate: "精准定位关键词",
    featureOcr: "支持 OCR 识别",
    featureStats: "关键词统计分析",
    featureExport: "一键导出结果",

    uploadTitle: "上传 PDF 文件",
    uploadDesc: "点击或拖拽 PDF 文件到此处",
    uploadSubDesc: "支持单个 PDF 文件上传，最大 200MB",
    uploadButton: "选择 PDF 文件",
    selected: "已选择",

    keywordTitle: "输入关键词",
    keywordPlaceholder: "请输入关键词，多个关键词请用逗号分隔",
    example: "示例：社会资本, 女性主义, 民族认同",

    optionTitle: "搜索选项",
    enableOcr: "启用 OCR 识别扫描版 PDF",
    enableOcrDesc: "适用于扫描版或图片版 PDF",
    showContext: "显示前后句上下文",
    showContextDesc: "展示匹配句子的上下文内容",

    startSearch: "开始搜索",
    searching: "分析中...",
    tip: "关键词越精确，搜索结果越准确。",

    pdfAnalysis: "PDF 分析结果",
    filename: "文件名",
    pages: "PDF 页数",
    matchedResults: "匹配结果",

    keywordStats: "关键词统计",
    appeared: "出现",
    times: "次",
    keywordChars: "关键词总字数",
    pdfTotalChars: "PDF 总字数",
    ratio: "占比",

    matchedSentences: "匹配句子",
    page: "第",
    method: "提取方式",

    uploadAlert: "请先上传 PDF 文件。",
    keywordAlert: "请输入至少一个关键词。",
    backendAlert: "后端连接失败，请确认 FastAPI 是否正在运行。",
    noResult: "没有找到匹配句子。",
  },

  ko: {
    badge: "숲 감성 학술 연구 도구",
    title: "springtool",
    description:
      "PDF를 업로드하고 키워드를 검색하여 관련 문장을 빠르게 추출합니다.",
    featureLocate: "키워드 정밀 검색",
    featureOcr: "OCR 지원",
    featureStats: "키워드 통계 분석",
    featureExport: "결과 내보내기",

    uploadTitle: "PDF 파일 업로드",
    uploadDesc: "PDF 파일을 클릭하거나 드래그하세요",
    uploadSubDesc: "단일 PDF 파일 지원, 최대 200MB",
    uploadButton: "PDF 파일 선택",
    selected: "선택됨",

    keywordTitle: "키워드 입력",
    keywordPlaceholder: "키워드를 입력하세요. 여러 개는 쉼표로 구분",
    example: "예시: 사회자본, 여성주의, 민족정체성",

    optionTitle: "검색 옵션",
    enableOcr: "스캔 PDF OCR 인식",
    enableOcrDesc: "스캔본 또는 이미지형 PDF에 사용",
    showContext: "앞뒤 문장 표시",
    showContextDesc: "매칭 문장의 주변 문맥 표시",

    startSearch: "검색 시작",
    searching: "분석 중...",
    tip: "키워드가 정확할수록 검색 결과도 정확해집니다.",

    pdfAnalysis: "PDF 분석 결과",
    filename: "파일명",
    pages: "PDF 페이지 수",
    matchedResults: "매칭 결과",

    keywordStats: "키워드 통계",
    appeared: "등장",
    times: "회",
    keywordChars: "키워드 총 글자 수",
    pdfTotalChars: "PDF 총 글자 수",
    ratio: "비율",

    matchedSentences: "매칭 문장",
    page: "페이지",
    method: "추출 방식",

    uploadAlert: "먼저 PDF 파일을 업로드해주세요.",
    keywordAlert: "키워드를 최소 1개 입력해주세요.",
    backendAlert: "백엔드 연결에 실패했습니다. FastAPI 실행 여부를 확인해주세요.",
    noResult: "매칭된 문장이 없습니다.",
  },

  ja: {
    badge: "森を感じる学術研究ツール",
    title: "springtool",
    description:
      "PDFをアップロードし、キーワード検索で関連文章を素早く抽出します。",
    featureLocate: "キーワード精密検索",
    featureOcr: "OCR対応",
    featureStats: "キーワード統計分析",
    featureExport: "結果エクスポート",

    uploadTitle: "PDFファイルをアップロード",
    uploadDesc: "PDFファイルをクリックまたはドラッグ",
    uploadSubDesc: "単一PDFファイル対応、最大200MB",
    uploadButton: "PDFファイルを選択",
    selected: "選択済み",

    keywordTitle: "キーワード入力",
    keywordPlaceholder: "キーワードを入力、複数の場合はカンマで区切る",
    example: "例：社会資本, フェミニズム, 民族認同",

    optionTitle: "検索オプション",
    enableOcr: "スキャンPDFのOCR認識",
    enableOcrDesc: "スキャン版または画像PDF向け",
    showContext: "前後の文脈を表示",
    showContextDesc: "一致した文の前後文脈を表示",

    startSearch: "検索開始",
    searching: "分析中...",
    tip: "キーワードが正確なほど、検索結果も正確になります。",

    pdfAnalysis: "PDF分析結果",
    filename: "ファイル名",
    pages: "PDFページ数",
    matchedResults: "一致結果",

    keywordStats: "キーワード統計",
    appeared: "出現",
    times: "回",
    keywordChars: "キーワード総文字数",
    pdfTotalChars: "PDF総文字数",
    ratio: "比率",

    matchedSentences: "一致した文",
    page: "ページ",
    method: "抽出方式",

    uploadAlert: "先にPDFファイルをアップロードしてください。",
    keywordAlert: "キーワードを1つ以上入力してください。",
    backendAlert: "バックエンド接続に失敗しました。FastAPIの起動を確認してください。",
    noResult: "一致した文がありません。",
  },
};

const fontStacks = {
  en: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  zh: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
  ko: "'Pretendard', 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
  ja: "'Hiragino Sans', 'Yu Gothic', 'Noto Sans JP', 'Meiryo', sans-serif",
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];
  const currentFont = fontStacks[lang];

  const [file, setFile] = useState<File | null>(null);
  const [keywordInput, setKeywordInput] = useState("");
  const [useOcr, setUseOcr] = useState(false);
  const [showContext, setShowContext] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);

  const handleSearch = async () => {
    if (!file) {
      alert(t.uploadAlert);
      return;
    }

    if (!keywordInput.trim()) {
      alert(t.keywordAlert);
      return;
    }

    setLoading(true);
    setData(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("keywords", keywordInput);
    formData.append("use_ocr", String(useOcr));
    formData.append("show_context", String(showContext));

    try {const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  alert("API URL is not configured.");
  setLoading(false);
  return;
}

const response = await fetch(`${apiUrl}/search`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
      alert(t.backendAlert);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{ fontFamily: currentFont }}
      className="min-h-screen bg-[#f4f7ef] text-[#24382d]"
    >
      <section className="mx-auto max-w-6xl px-5 py-12">
        <header className="mb-12 text-center">
          <div className="mb-6 flex justify-center gap-2">
            {[
              { key: "en", label: "English" },
              { key: "zh", label: "中文" },
              { key: "ko", label: "한국어" },
              { key: "ja", label: "日本語" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setLang(item.key as Lang)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  lang === item.key
                    ? "bg-[#2f6b4f] text-white shadow-md"
                    : "border border-[#cfe0ca] bg-white text-[#2f6b4f] hover:bg-[#edf7eb]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl">
            <Leaf className="h-12 w-12 text-[#2f6b4f]" />
          </div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#a7c1a4] bg-white px-4 py-2 text-sm text-[#53765b]">
            <Sparkles className="h-4 w-4" />
            {t.badge}
          </div>

          <h1 className="text-6xl font-black text-[#1f4f3a]">
            {t.title}
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#6b7f71]">
            {t.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Feature text={t.featureLocate} icon={<Search className="h-4 w-4" />} />
            <Feature text={t.featureOcr} icon={<FileText className="h-4 w-4" />} />
            <Feature text={t.featureStats} icon={<BarChart3 className="h-4 w-4" />} />
            <Feature text={t.featureExport} icon={<Download className="h-4 w-4" />} />
          </div>
        </header>

        <div className="space-y-6">
          <Card title={t.uploadTitle} step="1">
            <label className="flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#8bb184] bg-[#fbfcf7] text-center transition hover:border-[#2f6b4f] hover:bg-white">
              <UploadCloud className="mb-5 h-16 w-16 text-[#6fa26e]" />

              <div className="text-xl font-bold text-[#2f6b4f]">
                {t.uploadDesc}
              </div>

              <div className="mt-2 text-sm text-[#7d8f82]">
                {t.uploadSubDesc}
              </div>

              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) {
                    setFile(selected);
                  }
                }}
              />

              <div className="mt-7 rounded-2xl bg-gradient-to-r from-[#6fa26e] to-[#2f6b4f] px-8 py-3 font-bold text-white">
                {t.uploadButton}
              </div>

              {file && (
                <div className="mt-5 rounded-full bg-[#edf7eb] px-5 py-2 text-sm font-bold text-[#2f6b4f]">
                  {t.selected}: {file.name}
                </div>
              )}
            </label>
          </Card>

          <Card title={t.keywordTitle} step="2">
            <div className="relative">
              <input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder={t.keywordPlaceholder}
                className="h-14 w-full rounded-2xl border border-[#8bb184] bg-white px-5 pr-14 outline-none focus:border-[#2f6b4f] focus:ring-4 focus:ring-[#6fa26e]/15"
              />

              <Search className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#2f6b4f]" />
            </div>

            <p className="mt-3 text-sm text-[#7d8f82]">
              {t.example}
            </p>
          </Card>

          <Card title={t.optionTitle} step="3">
            <div className="grid gap-4 md:grid-cols-2">
              <OptionCard
                title={t.enableOcr}
                desc={t.enableOcrDesc}
                active={useOcr}
                onClick={() => setUseOcr(!useOcr)}
              />

              <OptionCard
                title={t.showContext}
                desc={t.showContextDesc}
                active={showContext}
                onClick={() => setShowContext(!showContext)}
              />
            </div>
          </Card>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="mx-auto flex h-16 w-full max-w-xl items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#6fa26e] to-[#2f6b4f] text-lg font-extrabold text-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Search className="h-6 w-6" />
            {loading ? t.searching : t.startSearch}
          </button>

          <p className="text-center text-sm font-medium text-[#7d8f82]">
            🌿 {t.tip}
          </p>
        </div>

        {data && (
          <section className="mt-12 space-y-8">
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h2 className="mb-6 text-3xl font-black text-[#2f6b4f]">
                {t.pdfAnalysis}
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <InfoBox title={t.filename} value={data.filename} />
                <InfoBox title={t.pages} value={String(data.pages)} />
                <InfoBox title={t.matchedResults} value={String(data.total_results)} />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h2 className="mb-6 text-3xl font-black text-[#2f6b4f]">
                {t.keywordStats}
              </h2>

              <div className="space-y-4">
                {data.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#d8e7d3] bg-[#f9fcf7] p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xl font-black text-[#2f6b4f]">
                        {stat.keyword}
                      </div>

                      <div className="rounded-full bg-[#edf7eb] px-4 py-2 text-sm font-bold text-[#2f6b4f]">
                        {t.appeared} {stat.count} {t.times}
                      </div>
                    </div>

                    <div className="mt-4 text-sm leading-7 text-[#6b7f71]">
                      {t.keywordChars}: <b>{stat.total_keyword_chars}</b>
                      <br />
                      {t.pdfTotalChars}: <b>{stat.pdf_total_chars}</b>
                      <br />
                      {t.ratio}: <b>{stat.ratio}</b>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h2 className="mb-6 text-3xl font-black text-[#2f6b4f]">
                {t.matchedSentences}
              </h2>

              {data.results.length === 0 ? (
                <div className="rounded-2xl border border-[#d8e7d3] bg-[#f9fcf7] p-6 text-[#6b7f71]">
                  {t.noResult}
                </div>
              ) : (
                <div className="space-y-5">
                  {data.results.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-[#dce8d7] bg-[#fbfcf7] p-6"
                    >
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-[#edf7eb] px-4 py-2 text-sm font-bold text-[#2f6b4f]">
                          {t.page} {item.page}
                        </span>

                        <span className="rounded-full bg-[#dff0dc] px-4 py-2 text-sm font-bold text-[#2f6b4f]">
                          {item.keyword}
                        </span>

                        <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#6b7f71]">
                          {t.method}: {item.method}
                        </span>
                      </div>

                      <div className="text-base leading-8 text-[#425347]">
                        {item.context}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <footer className="mt-14 border-t border-[#8bb184]/25 pt-7 text-center text-sm text-[#7d8f82]">
          © 2026 springtool. Designed with 🌿 for research.
        </footer>
      </section>
    </main>
  );
}

function Feature({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-[#cfe0ca] bg-white px-4 py-2 text-sm font-bold text-[#38654b] shadow-sm">
      {icon}
      {text}
    </div>
  );
}

function Card({
  title,
  step,
  children,
}: {
  title: string;
  step: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-[#7caf7b] to-[#2f6b4f] text-lg font-black text-white">
          {step}
        </div>

        <h2 className="text-3xl font-black text-[#2f6b4f]">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}

function OptionCard({
  title,
  desc,
  active,
  onClick,
}: {
  title: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition ${
        active
          ? "border-[#2f6b4f] bg-[#edf7eb]"
          : "border-[#d7e5d4] bg-[#fbfcf7] hover:border-[#8bb184]"
      }`}
    >
      <div className="font-black text-[#2f6b4f]">
        {title}
      </div>

      <div className="mt-2 text-sm text-[#6b7f71]">
        {desc}
      </div>
    </button>
  );
}

function InfoBox({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-[#f8fbf5] p-5">
      <div className="text-sm text-[#7d8f82]">
        {title}
      </div>

      <div className="mt-2 break-words text-2xl font-black text-[#2f6b4f]">
        {value}
      </div>
    </div>
  );
}