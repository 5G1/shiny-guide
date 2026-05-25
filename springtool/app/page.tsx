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
  pdf_name: string;
  keyword: string;
  page_number: number;
  matched_sentence: string;
  context: string;
  method: string;
};

type KeywordStat = {
  pdf_name: string;
  keyword: string;
  count: number;
  keyword_length: number;
  total_keyword_chars: number;
  pdf_total_chars: number;
  ratio: string;
};

type FileSummary = {
  pdf_name: string;
  pages: number;
  total_results: number;
  total_chars: number;
};

type ApiResponse = {
  pdf_names: string[];
  total_files: number;
  total_pages: number;
  keywords: string[];
  total_results: number;
  file_summaries: FileSummary[];
  stats: KeywordStat[];
  file_stats: KeywordStat[];
  results: SearchResult[];
  developer: string;
  contact: string;
};

const translations = {
  en: {
    badge: "Forest-inspired academic research tool",
    title: "springtool",
    description:
      "Upload multiple PDFs, search keywords, and extract matching sentences with PDF name and page number.",
    featureLocate: "Precise keyword locating",
    featureOcr: "OCR support",
    featureStats: "Keyword statistics",
    featureExport: "Export results",

    uploadTitle: "Upload PDF Files",
    uploadDesc: "Click or drag multiple PDF files here",
    uploadSubDesc:
      "Multiple PDF files supported. Recommended total size: up to 500MB",
    uploadButton: "Select PDF Files",
    selected: "Selected files",

    keywordTitle: "Enter Keywords",
    keywordPlaceholder: "Enter keywords, separated by commas",
    example: "Example: social capital, feminism, national identity",

    optionTitle: "Search Options",
    enableOcr: "Enable OCR for scanned PDFs",
    enableOcrDesc:
      "For scanned or image-based PDFs. Large scanned PDFs may take longer.",
    showContext: "Show surrounding context",
    showContextDesc: "Display context around matched sentences",

    startSearch: "Start Search",
    searching: "Searching...",
    tip: "Results show PDF name, keyword, page number, and matched sentence.",

    pdfAnalysis: "PDF Analysis Results",
    totalFiles: "Total Files",
    totalPages: "Total Pages",
    matchedResults: "Matched Results",
    fileSummary: "File Summary",

    exportTitle: "Export Results",
    downloadExcel: "Download Excel",
    downloadWord: "Download Word",

    keywordStats: "Keyword Statistics",
    appeared: "Appeared",
    times: "times",
    keywordChars: "Keyword characters",
    pdfTotalChars: "PDF total characters",
    ratio: "Ratio",

    matchedSentences: "Matched Sentences",
    pdfName: "PDF Name",
    keyword: "Keyword",
    pageNumber: "Page Number",
    sentence: "Matched Sentence",
    context: "Context",
    method: "Method",

    uploadAlert: "Please upload at least one PDF file.",
    keywordAlert: "Please enter at least one keyword.",
    backendAlert:
      "Backend connection failed. Please check if FastAPI is running.",
    excelFail: "Excel download failed. Please try again.",
    wordFail: "Word download failed. Please try again.",
    noResult: "No matched sentences found.",

    developer: "Developer",
    contact: "Contact",
  },

  zh: {
    badge: "森林风格学术研究工具",
    title: "springtool",
    description: "上传多个 PDF，输入关键词，输出 PDF 名称、页码与匹配句子。",
    featureLocate: "精准定位关键词",
    featureOcr: "支持 OCR 识别",
    featureStats: "关键词统计分析",
    featureExport: "一键导出结果",

    uploadTitle: "上传 PDF 文件",
    uploadDesc: "点击或拖拽多个 PDF 文件到此处",
    uploadSubDesc: "支持多个 PDF 文件上传，建议总大小不超过 500MB",
    uploadButton: "选择 PDF 文件",
    selected: "已选择文件",

    keywordTitle: "输入关键词",
    keywordPlaceholder: "请输入关键词，多个关键词请用逗号分隔",
    example: "示例：社会资本, 女性主义, 民族认同",

    optionTitle: "搜索选项",
    enableOcr: "启用 OCR 识别扫描版 PDF",
    enableOcrDesc: "适用于扫描版或图片版 PDF，大型扫描 PDF 可能需要更长时间。",
    showContext: "显示前后句上下文",
    showContextDesc: "展示匹配句子的上下文内容",

    startSearch: "开始搜索",
    searching: "分析中...",
    tip: "结果会显示 PDF 名称、关键词、页码与匹配句子。",

    pdfAnalysis: "PDF 分析结果",
    totalFiles: "文件数量",
    totalPages: "总页数",
    matchedResults: "匹配结果",
    fileSummary: "文件概览",

    exportTitle: "导出结果",
    downloadExcel: "下载 Excel",
    downloadWord: "下载 Word",

    keywordStats: "关键词统计",
    appeared: "出现",
    times: "次",
    keywordChars: "关键词总字数",
    pdfTotalChars: "PDF 总字数",
    ratio: "占比",

    matchedSentences: "匹配句子",
    pdfName: "PDF 名称",
    keyword: "关键词",
    pageNumber: "页码",
    sentence: "匹配句子",
    context: "上下文",
    method: "提取方式",

    uploadAlert: "请先上传至少一个 PDF 文件。",
    keywordAlert: "请输入至少一个关键词。",
    backendAlert: "后端连接失败，请确认 FastAPI 是否正在运行。",
    excelFail: "Excel 下载失败，请稍后再试。",
    wordFail: "Word 下载失败，请稍后再试。",
    noResult: "没有找到匹配句子。",

    developer: "开发者",
    contact: "联系方式",
  },

  ko: {
    badge: "숲 감성 학술 연구 도구",
    title: "springtool",
    description:
      "여러 PDF를 업로드하고 키워드를 검색하여 PDF명, 페이지 번호, 매칭 문장을 함께 확인합니다.",
    featureLocate: "키워드 정밀 검색",
    featureOcr: "OCR 지원",
    featureStats: "키워드 통계 분석",
    featureExport: "결과 내보내기",

    uploadTitle: "PDF 파일 업로드",
    uploadDesc: "여러 PDF 파일을 클릭하거나 드래그하세요",
    uploadSubDesc: "여러 개의 PDF 파일을 지원합니다. 권장 총 용량 최대 500MB",
    uploadButton: "PDF 파일 선택",
    selected: "선택된 파일",

    keywordTitle: "키워드 입력",
    keywordPlaceholder: "키워드를 입력하세요. 여러 개는 쉼표로 구분",
    example: "예시: 사회자본, 여성주의, 민족정체성",

    optionTitle: "검색 옵션",
    enableOcr: "스캔 PDF OCR 인식",
    enableOcrDesc:
      "스캔본 또는 이미지형 PDF에 사용합니다. 대용량 스캔 PDF는 시간이 오래 걸릴 수 있습니다.",
    showContext: "앞뒤 문장 표시",
    showContextDesc: "매칭 문장의 주변 문맥 표시",

    startSearch: "검색 시작",
    searching: "분석 중...",
    tip: "결과에는 PDF명, 키워드, 페이지 번호, 매칭 문장이 함께 표시됩니다.",

    pdfAnalysis: "PDF 분석 결과",
    totalFiles: "파일 수",
    totalPages: "총 페이지 수",
    matchedResults: "매칭 결과",
    fileSummary: "파일 요약",

    exportTitle: "결과 내보내기",
    downloadExcel: "Excel 다운로드",
    downloadWord: "Word 다운로드",

    keywordStats: "키워드 통계",
    appeared: "등장",
    times: "회",
    keywordChars: "키워드 총 글자 수",
    pdfTotalChars: "PDF 총 글자 수",
    ratio: "비율",

    matchedSentences: "매칭 문장",
    pdfName: "PDF명",
    keyword: "키워드",
    pageNumber: "페이지 번호",
    sentence: "매칭 문장",
    context: "문맥",
    method: "추출 방식",

    uploadAlert: "먼저 PDF 파일을 1개 이상 업로드해주세요.",
    keywordAlert: "키워드를 최소 1개 입력해주세요.",
    backendAlert: "백엔드 연결에 실패했습니다. FastAPI 실행 여부를 확인해주세요.",
    excelFail: "Excel 다운로드에 실패했습니다. 다시 시도해주세요.",
    wordFail: "Word 다운로드에 실패했습니다. 다시 시도해주세요.",
    noResult: "매칭된 문장이 없습니다.",

    developer: "개발자",
    contact: "연락처",
  },

  ja: {
    badge: "森を感じる学術研究ツール",
    title: "springtool",
    description:
      "複数のPDFからキーワードを検索し、PDF名・ページ番号・一致文章を表示します。",
    featureLocate: "キーワード精密検索",
    featureOcr: "OCR対応",
    featureStats: "キーワード統計分析",
    featureExport: "結果エクスポート",

    uploadTitle: "PDFファイルをアップロード",
    uploadDesc: "複数のPDFファイルをクリックまたはドラッグ",
    uploadSubDesc: "複数のPDFファイルに対応。推奨合計サイズは最大500MB",
    uploadButton: "PDFファイルを選択",
    selected: "選択済みファイル",

    keywordTitle: "キーワード入力",
    keywordPlaceholder: "キーワードを入力、複数の場合はカンマで区切る",
    example: "例：社会資本, フェミニズム, 民族認同",

    optionTitle: "検索オプション",
    enableOcr: "スキャンPDFのOCR認識",
    enableOcrDesc:
      "スキャン版または画像PDF向け。大容量のスキャンPDFは時間がかかる場合があります。",
    showContext: "前後の文脈を表示",
    showContextDesc: "一致した文の前後文脈を表示",

    startSearch: "検索開始",
    searching: "分析中...",
    tip: "結果にはPDF名、キーワード、ページ番号、一致文章が表示されます。",

    pdfAnalysis: "PDF分析結果",
    totalFiles: "ファイル数",
    totalPages: "総ページ数",
    matchedResults: "一致結果",
    fileSummary: "ファイル概要",

    exportTitle: "結果をエクスポート",
    downloadExcel: "Excelをダウンロード",
    downloadWord: "Wordをダウンロード",

    keywordStats: "キーワード統計",
    appeared: "出現",
    times: "回",
    keywordChars: "キーワード総文字数",
    pdfTotalChars: "PDF総文字数",
    ratio: "比率",

    matchedSentences: "一致した文",
    pdfName: "PDF名",
    keyword: "キーワード",
    pageNumber: "ページ番号",
    sentence: "一致文章",
    context: "文脈",
    method: "抽出方式",

    uploadAlert: "先にPDFファイルを1つ以上アップロードしてください。",
    keywordAlert: "キーワードを1つ以上入力してください。",
    backendAlert: "バックエンド接続に失敗しました。FastAPIの起動を確認してください。",
    excelFail: "Excelのダウンロードに失敗しました。もう一度お試しください。",
    wordFail: "Wordのダウンロードに失敗しました。もう一度お試しください。",
    noResult: "一致した文がありません。",

    developer: "開発者",
    contact: "連絡先",
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

  const [files, setFiles] = useState<File[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [useOcr, setUseOcr] = useState(false);
  const [showContext, setShowContext] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);

  const getApiUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  };

  const handleSearch = async () => {
    if (files.length === 0) {
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

    files.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("keywords", keywordInput);
    formData.append("use_ocr", String(useOcr));
    formData.append("show_context", String(showContext));

    try {
      const apiUrl = getApiUrl();

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

  const handleDownloadExcel = async () => {
    if (!data) return;

    try {
      const apiUrl = getApiUrl();

      const response = await fetch(`${apiUrl}/export/excel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Excel export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "springtool_results.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert(t.excelFail);
    }
  };

  const handleDownloadWord = async () => {
    if (!data) return;

    try {
      const apiUrl = getApiUrl();

      const response = await fetch(`${apiUrl}/export/word`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Word export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "springtool_results.docx";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert(t.wordFail);
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

          <h1 className="text-6xl font-black text-[#1f4f3a]">{t.title}</h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#6b7f71]">
            {t.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Feature
              text={t.featureLocate}
              icon={<Search className="h-4 w-4" />}
            />
            <Feature
              text={t.featureOcr}
              icon={<FileText className="h-4 w-4" />}
            />
            <Feature
              text={t.featureStats}
              icon={<BarChart3 className="h-4 w-4" />}
            />
            <Feature
              text={t.featureExport}
              icon={<Download className="h-4 w-4" />}
            />
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
                multiple
                className="hidden"
                onChange={(e) => {
                  const selected = Array.from(e.target.files || []);
                  setFiles(selected);
                }}
              />

              <div className="mt-7 rounded-2xl bg-gradient-to-r from-[#6fa26e] to-[#2f6b4f] px-8 py-3 font-bold text-white">
                {t.uploadButton}
              </div>

              {files.length > 0 && (
                <div className="mt-5 max-w-2xl rounded-3xl bg-[#edf7eb] px-5 py-3 text-sm font-bold text-[#2f6b4f]">
                  <div className="mb-2">
                    {t.selected}: {files.length}
                  </div>
                  <div className="space-y-1 text-left">
                    {files.slice(0, 8).map((file, index) => (
                      <div key={index}>• {file.name}</div>
                    ))}
                    {files.length > 8 && <div>• ...</div>}
                  </div>
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

            <p className="mt-3 text-sm text-[#7d8f82]">{t.example}</p>
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
                {t.exportTitle}
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <button
                  onClick={handleDownloadExcel}
                  className="rounded-2xl bg-gradient-to-r from-[#6fa26e] to-[#2f6b4f] px-6 py-4 text-lg font-extrabold text-white shadow-lg transition hover:-translate-y-0.5"
                >
                  {t.downloadExcel}
                </button>

                <button
                  onClick={handleDownloadWord}
                  className="rounded-2xl border border-[#8bb184] bg-[#fbfcf7] px-6 py-4 text-lg font-extrabold text-[#2f6b4f] shadow-sm transition hover:bg-[#edf7eb]"
                >
                  {t.downloadWord}
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h2 className="mb-6 text-3xl font-black text-[#2f6b4f]">
                {t.pdfAnalysis}
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <InfoBox title={t.totalFiles} value={String(data.total_files)} />
                <InfoBox title={t.totalPages} value={String(data.total_pages)} />
                <InfoBox
                  title={t.matchedResults}
                  value={String(data.total_results)}
                />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h2 className="mb-6 text-3xl font-black text-[#2f6b4f]">
                {t.fileSummary}
              </h2>

              <div className="space-y-4">
                {data.file_summaries.map((file, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#d8e7d3] bg-[#f9fcf7] p-5"
                  >
                    <div className="text-lg font-black text-[#2f6b4f]">
                      {file.pdf_name}
                    </div>
                    <div className="mt-3 text-sm leading-7 text-[#6b7f71]">
                      {t.totalPages}: <b>{file.pages}</b>
                      <br />
                      {t.matchedResults}: <b>{file.total_results}</b>
                      <br />
                      {t.pdfTotalChars}: <b>{file.total_chars}</b>
                    </div>
                  </div>
                ))}
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
                      <div className="mb-4 grid gap-3 md:grid-cols-4">
                        <InfoPill title={t.pdfName} value={item.pdf_name} />
                        <InfoPill title={t.keyword} value={item.keyword} />
                        <InfoPill
                          title={t.pageNumber}
                          value={String(item.page_number)}
                        />
                        <InfoPill title={t.method} value={item.method} />
                      </div>

                      <div className="rounded-2xl bg-white p-5">
                        <div className="mb-2 text-sm font-black text-[#2f6b4f]">
                          {t.sentence}
                        </div>
                        <div className="text-base leading-8 text-[#425347]">
                          {item.matched_sentence}
                        </div>
                      </div>

                      {showContext && (
                        <div className="mt-4 rounded-2xl bg-[#f3f8ef] p-5">
                          <div className="mb-2 text-sm font-black text-[#2f6b4f]">
                            {t.context}
                          </div>
                          <div className="text-base leading-8 text-[#425347]">
                            {item.context}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <footer className="mt-14 border-t border-[#8bb184]/25 pt-7 text-center text-sm text-[#7d8f82]">
          <div>© 2026 springtool. Designed with 🌿 for research.</div>
          <div className="mt-2">
            {t.developer}: 5G1 · {t.contact}: your-email@example.com
          </div>
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

        <h2 className="text-3xl font-black text-[#2f6b4f]">{title}</h2>
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
      <div className="font-black text-[#2f6b4f]">{title}</div>
      <div className="mt-2 text-sm text-[#6b7f71]">{desc}</div>
    </button>
  );
}

function InfoBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#f8fbf5] p-5">
      <div className="text-sm text-[#7d8f82]">{title}</div>

      <div className="mt-2 break-words text-2xl font-black text-[#2f6b4f]">
        {value}
      </div>
    </div>
  );
}

function InfoPill({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
      <div className="text-xs font-bold text-[#7d8f82]">{title}</div>
      <div className="mt-1 break-words text-sm font-black text-[#2f6b4f]">
        {value}
      </div>
    </div>
  );
}