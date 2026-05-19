import pytesseract
from pdf2image import convert_from_path
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List
from io import BytesIO
import pandas as pd
from docx import Document

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import fitz
import tempfile
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Springtool Backend Running"}

def split_sentences(text):
    sentences = re.split(r'(?<=[。！？.!?])', text)
    return [s.strip() for s in sentences if s.strip()]

def clean_keywords(keyword_input):
    keywords = re.split(r'[,，\n]', keyword_input)
    return [k.strip() for k in keywords if k.strip()]

def clean_text_for_count(text):
    return text.replace(" ", "").replace("\n", "").replace("\t", "")

@app.post("/search")
async def search_pdf(
    file: UploadFile = File(...),
    keywords: str = Form(...),
    use_ocr: str = Form("false"),
    show_context: str = Form("false")
):
    contents = await file.read()

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp:
        temp.write(contents)
        temp_path = temp.name

    doc = fitz.open(temp_path)

    keyword_list = clean_keywords(keywords)

    results = []
    keyword_stats = {
        keyword: {
            "count": 0,
            "keyword_length": len(keyword)
        }
        for keyword in keyword_list
    }

    total_text = ""
    extraction_logs = []

    for page_index in range(len(doc)):
        page = doc[page_index]
        text = page.get_text()

        extraction_method = "文本提取" if text.strip() else "无文本"
        total_text += text

        extraction_logs.append({
            "page": page_index + 1,
            "method": extraction_method,
            "text_length": len(clean_text_for_count(text))
        })

        sentences = split_sentences(text)

        for keyword in keyword_list:
            keyword_stats[keyword]["count"] += text.count(keyword)

        for sentence_index, sentence in enumerate(sentences):
            for keyword in keyword_list:
                if keyword in sentence:
                    if show_context == "true":
                        previous_sentence = sentences[sentence_index - 1] if sentence_index > 0 else ""
                        next_sentence = sentences[sentence_index + 1] if sentence_index < len(sentences) - 1 else ""
                        context = f"{previous_sentence} {sentence} {next_sentence}".strip()
                    else:
                        context = sentence

                    results.append({
                        "page": page_index + 1,
                        "keyword": keyword,
                        "sentence": sentence,
                        "context": context,
                        "method": extraction_method
                    })

    total_text_length = len(clean_text_for_count(total_text))

    stats = []
    for keyword, stat in keyword_stats.items():
        total_keyword_chars = stat["count"] * stat["keyword_length"]
        ratio = (total_keyword_chars / total_text_length * 100) if total_text_length > 0 else 0

        stats.append({
            "keyword": keyword,
            "count": stat["count"],
            "keyword_length": stat["keyword_length"],
            "total_keyword_chars": total_keyword_chars,
            "pdf_total_chars": total_text_length,
            "ratio": f"{ratio:.4f}%"
        })

    return {
        "filename": file.filename,
        "pages": len(doc),
        "keywords": keyword_list,
        "total_results": len(results),
        "stats": stats,
        "results": results,
        "logs": extraction_logs
    }
class ExportStat(BaseModel):
    keyword: str
    count: int
    keyword_length: int
    total_keyword_chars: int
    pdf_total_chars: int
    ratio: str


class ExportResult(BaseModel):
    page: int
    keyword: str
    sentence: str
    context: str
    method: str


class ExportPayload(BaseModel):
    filename: str
    pages: int
    total_results: int
    stats: List[ExportStat]
    results: List[ExportResult]


@app.post("/export/excel")
async def export_excel(payload: ExportPayload):
    output = BytesIO()

    stats_df = pd.DataFrame([item.dict() for item in payload.stats])
    results_df = pd.DataFrame([item.dict() for item in payload.results])

    with pd.ExcelWriter(output, engine="openpyxl") as writer:
        summary_df = pd.DataFrame([
            {"Item": "Filename", "Value": payload.filename},
            {"Item": "PDF Pages", "Value": payload.pages},
            {"Item": "Matched Results", "Value": payload.total_results},
            {"Item": "Developer", "Value": "springtool by 5G1"},
            {"Item": "Contact", "Value": "Please enter your email or contact here"},
        ])

        summary_df.to_excel(writer, index=False, sheet_name="Summary")
        stats_df.to_excel(writer, index=False, sheet_name="Keyword Statistics")
        results_df.to_excel(writer, index=False, sheet_name="Matched Sentences")

    output.seek(0)

    return StreamingResponse(
        output,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition": 'attachment; filename="springtool_results.xlsx"'
        },
    )


@app.post("/export/word")
async def export_word(payload: ExportPayload):
    document = Document()

    document.add_heading("springtool PDF Keyword Report", level=1)

    document.add_paragraph(f"Filename: {payload.filename}")
    document.add_paragraph(f"PDF Pages: {payload.pages}")
    document.add_paragraph(f"Matched Results: {payload.total_results}")
    document.add_paragraph("Developer: springtool by 5G1")
    document.add_paragraph("Contact: Please enter your email or contact here")

    document.add_heading("Keyword Statistics", level=2)

    for stat in payload.stats:
        document.add_paragraph(
            f"{stat.keyword} | Count: {stat.count} | "
            f"Keyword Characters: {stat.total_keyword_chars} | "
            f"PDF Total Characters: {stat.pdf_total_chars} | "
            f"Ratio: {stat.ratio}"
        )

    document.add_heading("Matched Sentences", level=2)

    for index, item in enumerate(payload.results, start=1):
        document.add_paragraph(f"{index}. Page {item.page} | Keyword: {item.keyword}")
        document.add_paragraph(item.context)
        document.add_paragraph("")

    output = BytesIO()
    document.save(output)
    output.seek(0)

    return StreamingResponse(
        output,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={
            "Content-Disposition": 'attachment; filename="springtool_results.docx"'
        },
    )