import streamlit as st
import fitz
import pandas as pd
import re
from io import BytesIO

st.set_page_config(page_title="论文关键词定位工具", layout="wide")

st.title("📄 论文关键词定位工具")
st.write("上传PDF文件，输入关键词后，系统会自动定位关键词所在页码，并提取包含关键词的句子。")

uploaded_file = st.file_uploader("请上传PDF文件", type=["pdf"])

keyword_input = st.text_input(
    "请输入关键词（多个关键词请用逗号分隔）",
    placeholder="例如：社会资本, 女性主义, 民族认同"
)

show_context = st.checkbox("显示前后句上下文", value=False)

def split_sentences(text):
    sentences = re.split(r'(?<=[。！？.!?])', text)
    return [s.strip() for s in sentences if s.strip()]

def highlight_keywords(sentence, keywords):
    highlighted = sentence
    for keyword in keywords:
        if keyword:
            highlighted = highlighted.replace(
                keyword,
                f"**{keyword}**"
            )
    return highlighted

def to_excel(df):
    output = BytesIO()
    with pd.ExcelWriter(output, engine="openpyxl") as writer:
        df.to_excel(writer, index=False, sheet_name="搜索结果")
    return output.getvalue()

def clean_keywords(keyword_input):
    keywords = re.split(r'[,，\n]', keyword_input)
    return [k.strip() for k in keywords if k.strip()]

if uploaded_file and keyword_input:
    keywords = clean_keywords(keyword_input)

    if not keywords:
        st.warning("请输入至少一个关键词。")
    else:
        pdf_bytes = uploaded_file.read()
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")

        results = []
        progress_bar = st.progress(0)
        status_text = st.empty()

        for page_index in range(len(doc)):
            status_text.text(f"正在搜索第 {page_index + 1} / {len(doc)} 页...")
            text = doc[page_index].get_text()
            sentences = split_sentences(text)

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
                            "上下文": context
                        })

            progress_bar.progress((page_index + 1) / len(doc))

        status_text.text("搜索完成！")

        df = pd.DataFrame(results)

        st.subheader("🔍 搜索结果")
        st.write(f"共找到 {len(results)} 条结果。")

        if not df.empty:
            st.dataframe(df, use_container_width=True)

            st.subheader("✨ 高亮预览")

            for index, row in df.iterrows():
                highlighted_sentence = highlight_keywords(row["句子"], keywords)
                st.markdown(
                    f"**第 {row['页码']} 页｜关键词：{row['关键词']}**  \n"
                    f"{highlighted_sentence}"
                )
                st.divider()

            excel_file = to_excel(df)

            st.download_button(
                label="下载Excel结果",
                data=excel_file,
                file_name="pdf_keyword_results.xlsx",
                mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
        else:
            st.warning("没有找到相关关键词。请检查关键词是否准确，或确认PDF是否为可复制文本。")