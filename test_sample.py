"""Quick diagnostic - test 10 PDFs to see what % are text vs scanned."""
import os
import sys
import time
import warnings
from pathlib import Path

warnings.filterwarnings("ignore")
os.environ.setdefault("PYTHONWARNINGS", "ignore")

SRC = Path(r"C:\Users\SATHYA TRADERS\Documents\Abi\Projects\Study guide\boooks")
pdfs = sorted(SRC.rglob("*.pdf"))[:10]

def try_pypdf(p):
    from pypdf import PdfReader
    r = PdfReader(str(p), strict=False)
    out = []
    for pg in r.pages:
        try: out.append(pg.extract_text() or "")
        except: pass
    return "\n".join(out)

def try_pdfplumber(p):
    import pdfplumber
    out = []
    with pdfplumber.open(str(p)) as pdf:
        for pg in pdf.pages:
            try: out.append(pg.extract_text() or "")
            except: pass
    return "\n".join(out)

def try_pdfium(p):
    import pypdfium2 as pdfium
    pdf = pdfium.PdfDocument(str(p))
    out = []
    for i in range(len(pdf)):
        pg = pdf[i]
        try: out.append(pg.get_textpage().get_text_range() or "")
        except: pass
        finally: pg.close()
    return "\n".join(out)

for i, p in enumerate(pdfs, 1):
    print(f"\n[{i}] {p.name}  ({p.stat().st_size//1024} KB)")
    t0 = time.time()
    txt = None
    src = None
    for name, fn in [("pypdf", try_pypdf), ("pdfplumber", try_pdfplumber), ("pdfium", try_pdfium)]:
        try:
            t = fn(p)
            n = len((t or "").strip())
            print(f"    {name:>10}: {n:>7} chars  ({time.time()-t0:.1f}s)")
            if t and n > 20 and txt is None:
                txt, src = t, name
        except Exception as e:
            print(f"    {name:>10}: ERROR {e}")
    if txt:
        print(f"  --> TEXT FOUND via {src}  (preview: {txt[:80]!r})")
    else:
        print(f"  --> SCANNED / NO TEXT EXTRACTABLE")
