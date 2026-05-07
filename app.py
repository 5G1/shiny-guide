import streamlit as st
import fitz
import pandas as pd
import re
from io import BytesIO
from PIL import Image
import pytesseract

st.set_page_config(
    page_title="论文关键词定位工具",
    layout="wide",
    page_icon="📚"
)

# =========================
# CSS
# =========================
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700;800;900&display=swap');

html, body, .stApp, [class*="css"] {
    font-family: 'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif !important;
}

.stApp {
    background:
        radial-gradient(circle at 88% 12%, rgba(157, 111, 255, 0.13), transparent 23%),
        radial-gradient(circle at 10% 8%, rgba(157, 111, 255, 0.10), transparent 20%),
        linear-gradient(180deg, #fbf9ff 0%, #f6f2ff 100%);
}

.block-container {
    max-width: 1040px;
    padding-top: 26px;
    padding-bottom: 40px;
    margin: auto;
}

[data-testid="stHeader"] {
    background: transparent;
}

#MainMenu, footer {
    visibility: hidden;
}

.hero {
    text-align: center;
    margin-bottom: 32px;
}

.nankai-logo {
    width: 82px;
    height: 82px;
    margin: 0 auto 16px auto;
    border: 3px solid #6f3cc3;
    border-radius: 50%;
    color: #6f3cc3;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 22px;
    line-height: 1.05;
    box-shadow: 0 10px 30px rgba(103, 58, 183, 0.14);
    background: rgba(255,255,255,0.65);
}

.main-title {
    font-size: 50px;
    font-weight: 900;
    color: #6039b3;
    letter-spacing: 6px;
    margin-bottom: 8px;
}

.sub-title {
    font-size: 18px;
    color: #6f6a86;
    font-weight: 500;
}

.divider {
    margin: 25px auto 28px auto;
    width: 360px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9d78e8;
}

.divider:before,
.divider:after {
    content: "";
    height: 1px;
    width: 150px;
    background: rgba(122, 79, 214, 0.25);
    display: block;
}

.divider span {
    padding: 0 16px;
    font-size: 18px;
}

.feature-row {
    display: flex;
    justify-content: center;
    gap: 34px;
    color: #7345c7;
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 42px;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 9px;
    white-space: nowrap;
}

.app-card {
    background: rgba(255,255,255,0.92);
    border-radius: 24px;
    padding: 28px 32px;
    margin: 0 auto 24px auto;
    box-shadow: 0 18px 45px rgba(90, 58, 160, 0.12);
    border: 1px solid rgba(130, 91, 210, 0.12);
}

.section-title {
    display: flex;
    align-items: center;
    gap: 16px;
    color: #6039b3;
    font-size: 23px;
    font-weight: 900;
    margin-bottom: 22px;
}

.step {
    width: 38px;
    height: 38px;
    border-radius: 11px;
    background: linear-gradient(135deg, #8e5be8 0%, #673ab7 100%);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    font-weight: 900;
    box-shadow: 0 10px 20px rgba(103,58,183,0.22);
}

.fake-upload {
    border: 2px dashed #9d78e8;
    border-radius: 18px;
    min-height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    background: linear-gradient(180deg, rgba(255,255,255,0.55), rgba(250,247,255,0.95));
    margin-bottom: 18px;
}

.upload-icon {
    color: #8a5be8;
    font-size: 58px;
    line-height: 1;
    margin-bottom: 16px;
}

.upload-title {
    color: #6f3cc3;
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 7px;
}

.upload-desc {
    color: #8b86a0;
    font-size: 14px;
    font-weight: 600;
}

.input-help {
    margin-top: 10px;
    color: #8a83a0;
    font-size: 15px;
    font-weight: 600;
}

.option-box {
    background: #fbfbff;
    border: 1px solid rgba(118, 82, 196, 0.16);
    border-radius: 16px;
    padding: 18px 20px;
    box-shadow: 0 8px 22px rgba(90, 58, 160, 0.06);
}

.tip {
    text-align: center;
    color: #8a83a0;
    font-size: 14px;
    font-weight: 600;
    margin: 14px 0 26px 0;
}

.footer-custom {
    text-align: center;
    color: #8a83a0;
    font-size: 13px;
    font-weight: 500;
    margin-top: 36px;
    padding-top: 22px;
    border-top: 1px solid rgba(111,67,194,0.12);
}

.result-card {
    background: #fff;
    border-radius: 18px;
    padding: 20px 22px;
    margin-bottom: 16px;
    border-left: 6px solid #7b4fd6;
    box-shadow: 0 10px 26px rgba(99, 68, 160, 0.08);
}

.result-meta {
    color: #6039b3;
    font-weight: 900;
    margin-bottom: 10px;
}

.highlight {
    background: #e8ddff;
    color: #5e35b1;
    padding: 2px 6px;
    border-radius: 6px;
    font-weight: 900;
}

/* Streamlit 기본 컴포넌트 커스텀 */
.stFileUploader label,
.stTextInput label {
    display: none !important;
}

.stFileUploader section {
    border: none !important;
    background: transparent !important;
    padding: 0 !important;
}

.stFileUploader section > div {
    display: flex;
    justify-content: center;
}

.stFileUploader button {
    background: linear-gradient(135deg, #9a6cf0 0%, #673ab7 100%) !important;
    color: white !important;
    border-radius: 12px !important;
    border: none !important;
    font-weight: 800 !important;
    padding: 0.65rem 1.4rem !important;
    box-shadow: 0 10px 24px rgba(103, 58, 183, 0.22);
}

.stFileUploader small {
    color: #8a83a0 !important;
    font-weight: 600 !important;
}

.stTextInput input {
    height: 56px !important;
    border: 1.8px solid #8c5be8 !important;
    border-radius: 13px !important;
    color: #3e3754 !important;
    background: #ffffff !important;
    font-size: 16px !important;
    font-weight: 500 !important;
    padding-left: 18px !important;
}

.stTextInput input:focus {
    border-color: #673ab7 !important;
    box-shadow: 0 0 0 3px rgba(124, 79, 214, 0.14) !important;
}

.stButton > button,
.stDownloadButton > button {
    width: 62%;
    min-width: 360px;
    height: 58px;
    display: block;
    margin: 0 auto;
    border-radius: 14px;
    border: none;
    background: linear-gradient(135deg, #9a6cf0 0%, #673ab7 100%);
    color: white;
    font-size: 18px;
    font-weight: 900;
    box-shadow: 0 14px 28px rgba(103, 58, 183, 0.26);
}

.stButton > button:hover,
.stDownloadButton > button:hover {
    background: linear-gradient(135deg, #8b5de8 0%, #5c2fb0 100%);
    color: white;
}

div[data-testid="stCheckbox"] {
    background: #fbfbff;
    border: 1px solid rgba(118, 82, 196, 0.16);
    border-radius: 16px;
    padding: 16px 18px;
    box-shadow: 0 8px 22px rgba(90, 58, 160, 0.06);
}

div[data-testid="stCheckbox"] label {
    font-weight: 800 !important;
    color: #4c4363 !important;
}

[data-testid="stMetric"] {
    background: white;
    border-radius: 18px;
    padding: 18px 20px;
    box-shadow: 0 10px 24px rgba(99, 68, 160, 0.08);
    border: 1px solid rgba(139, 105, 215, 0.12);
}

[data-testid="stDataFrame"] {
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 10px 24px rgba(99, 68, 160, 0.06);
}

@media (max-width: 768px) {
    .main-title {
        font-size: 34px;
        letter-spacing: 2px;
    }
    .feature-row {
        flex-wrap: wrap;
        gap: 16px;
    }
    .app-card {
        padding: 22px 20px;
    }
    .stButton > button,
    .stDownloadButton > button {
        width: 100%;
        min-width: auto;
    }
}
</style>
""", unsafe_allow_html=True)


# =========================
# Header
# =========================
st.markdown("""
<div class="hero">
    <div class="nankai-logo">南开<br>1919</div>
    <div class="main-title">论文关键词定位工具</div>
    <div class="sub-title">Academic PDF Research Tool · Nankai Inspired Edition</div>
    <div class="divider"><span>✾</span></div>
    <div class="feature-row">
        <div class="feature-item">◎ 精准定位关键词</div>
        <div class="feature-item">▣ 支持OCR识别</div>
        <div class="feature-item">▥ 可视化统计分析</div>
        <div class="feature-item">↓ 一键导出结果</div>
    </div>
</div>
""", unsafe_allow_html=True)


# =========================
# Functions
# =========================
def split_sentences(text):
    sentences = re.split(r'(?<=[。！？.!?])', text)
    return [s.strip() for s in sentences if s.strip()]


def clean_keywords(keyword_input):
    keywords = re.split(r'[,，\n]', keyword_input)
    return [k.strip() for k in keywords if k.strip()]


def clean_text_for_count(text):
    return text.replace(" ", "").replace("\n", "").replace("\t", "")


def highlight_keywords(sentence, keywords):
    highlighted = sentence
    for keyword in keywords:
        if keyword:
            highlighted = highlighted.replace(
                keyword,
                f"<span class='highlight'>{keyword}</span>"
            )
    return highlighted


def extract_text_with_ocr(page):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    img_data = pix.tobytes("png")
    image = Image.open(BytesIO(img_data))
    text = pytesseract.image_to_string(image, lang="chi_sim+eng")
    return text


def extract_page_text(page, use_ocr):
    text = page.get_text()

    if text.strip():
        return text, "文本提取"

    if use_ocr:
        ocr_text = extract_text_with_ocr(page)
        return ocr_text, "OCR识别"

    return "", "无文本"


def to_excel(df, stat_df, log_df):
    output = BytesIO()
    with pd.ExcelWriter(output, engine="openpyxl") as writer:
        df.to_excel(writer, index=False, sheet_name="搜索结果")
        stat_df.to_excel(writer, index=False, sheet_name="关键词统计")
        log_df.to_excel(writer, index=False, sheet_name="页面提取记录")
    return output.getvalue()


# =========================
# UI Inputs
# =========================

st.markdown("""
<div class="app-card">
    <div class="section-title"><span class="step">1</span> 上传 PDF 文件</div>
    <div class="fake-upload">
        <div class="upload-icon">☁</div>
        <div class="upload-title">点击或拖拽 PDF 文件到此处</div>
        <div class="upload-desc">支持单个文件上传，最大 200MB</div>
""", unsafe_allow_html=True)

uploaded_file = st.file_uploader(
    "上传 PDF",
    type=["pdf"],
    label_visibility="collapsed"
)

st.markdown("""
    </div>
</div>
""", unsafe_allow_html=True)


st.markdown("""
<div class="app-card">
    <div class="section-title"><span class="step">2</span> 输入关键词</div>
""", unsafe_allow_html=True)

keyword_input = st.text_input(
    "关键词",
    placeholder="请输入关键词（多个关键词请用逗号分隔）",
    label_visibility="collapsed"
)

st.markdown("""
    <div class="input-help">示例：社会资本, 女性主义, 民族认同</div>
</div>
""", unsafe_allow_html=True)


st.markdown("""
<div class="app-card">
    <div class="section-title"><span class="step">3</span> 搜索选项</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns(2)
with col1:
    use_ocr = st.checkbox("启用 OCR 识别扫描版 PDF", value=False)
    st.caption("适用于扫描版或图片版 PDF")
with col2:
    show_context = st.checkbox("显示前后句上下文", value=False)
    st.caption("展示匹配句子的上下文内容")

st.markdown("</div>", unsafe_allow_html=True)

search_clicked = st.button("🔍 开始搜索")
st.markdown('<div class="tip">💡 小贴士：关键词越精确，搜索结果越准确</div>', unsafe_allow_html=True)


# =========================
# Search Logic
# =========================
if search_clicked:
    if not uploaded_file:
        st.warning("请先上传 PDF 文件。")
    elif not keyword_input:
        st.warning("请输入至少一个关键词。")
    else:
        keywords = clean_keywords(keyword_input)
        pdf_bytes = uploaded_file.read()
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")

        results = []
        keyword_stats = {
            keyword: {
                "出现次数": 0,
                "关键词字数": len(keyword)
            }
            for keyword in keywords
        }

        total_text = ""
        extraction_logs = []

        progress_bar = st.progress(0)
        status_text = st.empty()

        for page_index in range(len(doc)):
            status_text.text(f"正在搜索第 {page_index + 1} / {len(doc)} 页...")

            page = doc[page_index]
            text, extraction_method = extract_page_text(page, use_ocr)

            total_text += text
            sentences = split_sentences(text)

            extraction_logs.append({
                "页码": page_index + 1,
                "提取方式": extraction_method,
                "提取字数": len(clean_text_for_count(text))
            })

            for keyword in keywords:
                keyword_stats[keyword]["出现次数"] += text.count(keyword)

            for sentence_index, sentence in enumerate(sentences):
                for keyword in keywords:
                    if keyword in sentence:
                        if show_context:
                            previous_sentence = sentences[sentence_index - 1] if sentence_index > 0 else ""
                            next_sentence = sentences[sentence_index + 1] if sentence_index < len(sentences) - 1 else ""
                            context = f"{previous_sentence} {sentence} {next_sentence}".strip()
                        else:
                            context = sentence

                        results.append({
                            "页码": page_index + 1,
                            "关键词": keyword,
                            "句子": sentence,
                            "上下文": context,
                            "提取方式": extraction_method
                        })

            progress_bar.progress((page_index + 1) / len(doc))

        status_text.text("搜索完成！")

        total_text_length = len(clean_text_for_count(total_text))

        stat_rows = []
        for keyword, stat in keyword_stats.items():
            total_keyword_chars = stat["出现次数"] * stat["关键词字数"]
            keyword_ratio = (total_keyword_chars / total_text_length * 100) if total_text_length > 0 else 0

            stat_rows.append({
                "关键词": keyword,
                "出现次数": stat["出现次数"],
                "关键词字数": stat["关键词字数"],
                "关键词总字数": total_keyword_chars,
                "PDF总字数": total_text_length,
                "关键词占比": f"{keyword_ratio:.4f}%"
            })

        df = pd.DataFrame(results)
        stat_df = pd.DataFrame(stat_rows)
        log_df = pd.DataFrame(extraction_logs)

        st.markdown('<div class="app-card">', unsafe_allow_html=True)
        st.markdown('<div class="section-title">📊 关键词统计</div>', unsafe_allow_html=True)

        m1, m2, m3 = st.columns(3)
        with m1:
            st.metric("关键词数量", len(keywords))
        with m2:
            st.metric("PDF 总字数", total_text_length)
        with m3:
            st.metric("匹配句子数量", len(results))

        st.dataframe(stat_df, use_container_width=True)
        st.markdown('</div>', unsafe_allow_html=True)

        st.markdown('<div class="app-card">', unsafe_allow_html=True)
        st.markdown('<div class="section-title">🔍 搜索结果</div>', unsafe_allow_html=True)

        if not df.empty:
            for _, row in df.iterrows():
                target_text = row["上下文"] if show_context else row["句子"]
                highlighted_text = highlight_keywords(target_text, keywords)

                st.markdown(
                    f"""
                    <div class="result-card">
                        <div class="result-meta">
                            第 {row['页码']} 页 ｜ 关键词：{row['关键词']} ｜ 方式：{row['提取方式']}
                        </div>
                        <div>{highlighted_text}</div>
                    </div>
                    """,
                    unsafe_allow_html=True
                )

            excel_file = to_excel(df, stat_df, log_df)

            st.download_button(
                label="📥 下载 Excel 结果",
                data=excel_file,
                file_name="pdf_keyword_results.xlsx",
                mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
        else:
            st.warning("没有找到相关关键词。请检查关键词是否准确，或确认 PDF 是否为可复制文本。")

        with st.expander("🧾 查看页面文本提取记录"):
            st.dataframe(log_df, use_container_width=True)

        st.markdown('</div>', unsafe_allow_html=True)


st.markdown("""
<div class="footer-custom">
    © 2024 Academic PDF Research Tool. All rights reserved.<br>
    Designed with 💜 for research.
</div>
""", unsafe_allow_html=True)