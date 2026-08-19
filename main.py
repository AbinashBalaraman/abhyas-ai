import os
import glob
import json
import re
import time
import requests
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from fastapi import FastAPI, HTTPException, Body, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone

def get_current_ist_time():
    ist_tz = timezone(timedelta(hours=5, minutes=30))
    return datetime.now(ist_tz).strftime("%Y-%m-%d %H:%M:%S IST")


# Shared HTTP session with explicit connection pooling. Using a module-level
# Session (instead of the module-level `requests` shortcut) avoids stale/
# inherited connection state in uvicorn worker subprocesses.
_HTTP_SESSION = requests.Session()
_adapter = requests.adapters.HTTPAdapter(
    pool_connections=10,
    pool_maxsize=10,
    max_retries=requests.packages.urllib3.util.retry.Retry(
        total=1, backoff_factor=0.5, status_forcelist=[429, 500, 502, 503, 504]
    ),
)
_HTTP_SESSION.mount("https://", _adapter)
_HTTP_SESSION.mount("http://", _adapter)


# PostgreSQL connection configuration
DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")
DB_NAME = os.getenv("DB_NAME", "study_tutor")
DB_ENABLED = True  # becomes False if PostgreSQL is unreachable (graceful offline mode)
_MEM_CHAT = []      # in-memory chat history fallback
_MEM_PROGRESS = {"completed_chapters": [], "quiz_scores": {}}  # in-memory progress fallback

# Database Initialization
def init_db():
    try:
        # Connect to postgres server to check/create the tutor database
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            dbname="postgres"
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        cursor.execute("SELECT 1 FROM pg_database WHERE datname = 'study_tutor'")
        exists = cursor.fetchone()
        if not exists:
            cursor.execute("CREATE DATABASE study_tutor")
            print("PostgreSQL Database 'study_tutor' created.")
        
        cursor.close()
        conn.close()
        
        # Connect to the study_tutor database to initialize tables
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            dbname=DB_NAME
        )
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS chat_history (
                id SERIAL PRIMARY KEY,
                sender VARCHAR(50) NOT NULL,
                text TEXT NOT NULL,
                sources TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_progress (
                key VARCHAR(100) PRIMARY KEY,
                value TEXT NOT NULL
            )
        """)
        conn.commit()
        cursor.close()
        conn.close()
        print("PostgreSQL Database & Tables initialized successfully.")
    except Exception as e:
        global DB_ENABLED
        DB_ENABLED = False
        print(f"[OFFLINE MODE] PostgreSQL unavailable ({e}). Running without DB persistence.")

def save_chat_message(sender: str, text: str, sources: list = None):
    if not DB_ENABLED:
        _MEM_CHAT.append({"sender": sender, "text": text, "sources": sources or []})
        return
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            dbname=DB_NAME
        )
        conn.set_client_encoding('UTF8')
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO chat_history (sender, text, sources) VALUES (%s, %s, %s)",
            (
                sender,
                text.encode('ascii', 'xmlcharrefreplace').decode('ascii'),
                json.dumps(sources).encode('ascii', 'xmlcharrefreplace').decode('ascii') if sources else None
            )
        )
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Error saving chat message to PostgreSQL: {e}")


def get_recent_history(limit: int = 12):
    """Return the most recent chat turns (oldest first) for conversation memory."""
    if not DB_ENABLED:
        return list(_MEM_CHAT)
    try:
        conn = psycopg2.connect(
            host=DB_HOST, port=DB_PORT, user=DB_USER,
            password=DB_PASSWORD, dbname=DB_NAME
        )
        conn.set_client_encoding('UTF8')
        cursor = conn.cursor()
        # Fetch the last `limit*2` rows (user+system pairs) then keep the tail.
        cursor.execute(
            "SELECT sender, text FROM chat_history ORDER BY id DESC LIMIT %s",
            (limit * 2,)
        )
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        import html as _html
        turns = [{"sender": r[0], "text": _html.unescape(r[1]) if r[1] else ""} for r in reversed(rows)]
        return turns
    except Exception as e:
        print(f"Error reading chat history: {e}")
        return []

app = FastAPI(title="AI Tutor Web Server")

# Enable CORS for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Prevent browsers from heuristically caching API GET responses (e.g. /api/quiz),
# which previously caused stale/incorrect quiz data to be served.
@app.middleware("http")
async def no_cache_api(request: Request, call_next):
    response = await call_next(request)
    if request.url.path.startswith("/api/"):
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
        response.headers["Pragma"] = "no-cache"
    return response

# Configuration paths
DATA_DIR = "./books"
SYLLABUS_DIR = "./syllabus_db"
INDEX_FILE = "tutor_faiss.index"
METADATA_FILE = "tutor_metadata.json"
PROGRESS_FILE = "progress.json"

# OpenCode Zen API Configuration
API_URL = os.getenv("OPENCODE_API_URL", "https://opencode.ai/zen/v1/chat/completions")
API_KEY = os.getenv("OPENCODE_ZEN_API_KEY", os.getenv("OPENAI_API_KEY", ""))
DEFAULT_MODEL = "deepseek-v4-flash-free"

# Global flags and variables
RAG_ENABLED = False
embedder = None
index = None
documents = []

# Try importing ML dependencies for RAG
try:
    from sentence_transformers import SentenceTransformer
    import faiss
    import numpy as np
    RAG_ENABLED = True
except ImportError:
    print("WARNING: 'sentence-transformers' or 'faiss-cpu' not found. Local RAG will be disabled.")
    print("To enable RAG, run: pip install sentence-transformers faiss-cpu")

# --- INITIALIZE RAG INDEX ---
def build_index():
    global index, documents, RAG_ENABLED, embedder
    if not RAG_ENABLED:
        return
    
    print("Scanning books/ and syllabus_db/ to build/load vector index...")
    
    # Check if we can load existing index
    if os.path.exists(INDEX_FILE) and os.path.exists(METADATA_FILE):
        try:
            print("Loading existing FAISS index...")
            embedder = SentenceTransformer("all-MiniLM-L6-v2")
            index = faiss.read_index(INDEX_FILE)
            with open(METADATA_FILE, "r", encoding="utf-8") as f:
                documents = json.load(f)
            print(f"Loaded index with {len(documents)} chunks.")
            return
        except Exception as e:
            print(f"Error loading index: {e}. Rebuilding...")

    # Otherwise, rebuild it
    try:
        print("Initializing embedding model (all-MiniLM-L6-v2)...")
        embedder = SentenceTransformer("all-MiniLM-L6-v2")
        
        # Scan files
        files = glob.glob(os.path.join(DATA_DIR, "**/*.md"), recursive=True) + \
                glob.glob(os.path.join(SYLLABUS_DIR, "**/*.md"), recursive=True)
        
        temp_docs = []
        for file_path in files:
            # Skip build files, metadata, or indices
            if "README.md" in file_path or "MASTER_INDEX.md" in file_path:
                continue
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Simple paragraph chunking
                paragraphs = content.split("\n\n")
                for para in paragraphs:
                    para = para.strip()
                    if len(para) > 150: # Only index substantial chunks
                        temp_docs.append({
                            "text": para,
                            "source": os.path.basename(file_path),
                            "subject": os.path.basename(os.path.dirname(file_path))
                        })
            except Exception as e:
                print(f"Error reading {file_path}: {e}")

        if not temp_docs:
            print("No documents found to index.")
            return
        
        print(f"Embedding {len(temp_docs)} chunks...")
        texts = [doc["text"] for doc in temp_docs]
        embeddings = embedder.encode(texts, show_progress_bar=True)
        
        # Create FAISS Flat L2 index
        dimension = embeddings.shape[1]
        index = faiss.IndexFlatL2(dimension)
        index.add(np.array(embeddings).astype("float32"))
        
        # Save files
        faiss.write_index(index, INDEX_FILE)
        with open(METADATA_FILE, "w", encoding="utf-8") as f:
            json.dump(temp_docs, f, indent=4)
            
        documents = temp_docs
        print("FAISS vector index built and saved successfully!")
    except Exception as e:
        print(f"Failed to build FAISS index: {e}")
        RAG_ENABLED = False

@app.on_event("startup")
async def startup_event():
    init_db()
    build_index()

def load_api_keys():
    """Load LLM provider keys from env / .env files."""
    gemini_key = os.getenv("GEMINI_API_KEY", "")
    opencode_key = os.getenv("OPENCODE_ZEN_API_KEY", os.getenv("OPENCODE_API_KEY", API_KEY))
    openai_key = os.getenv("OPENAI_API_KEY", API_KEY)

    for path in [".env", ".env.local", "study-tutor/.env.local"]:
        if os.path.exists(path):
            try:
                with open(path, "r") as f:
                    for line in f:
                        line = line.strip()
                        if not line or line.startswith("#") or "=" not in line:
                            continue
                        k, v = line.split("=", 1)
                        k = k.strip().replace("export ", "")
                        v = v.strip().strip('"').strip("'")
                        if not v or v.endswith("...") or len(v) < 8:
                            continue
                        if k == "GEMINI_API_KEY":
                            gemini_key = v
                        elif k in ("OPENCODE_API_KEY", "OPENCODE_ZEN_API_KEY"):
                            opencode_key = v
                        elif k == "OPENAI_API_KEY":
                            openai_key = v
            except Exception:
                pass
    return gemini_key, opencode_key, openai_key


# Model registry: UI value -> (provider, real model id, healthy flag)
MODEL_REGISTRY = {
    "gemini-2.5-flash":      ("gemini", "gemini-2.5-flash", True),
    "gemini-2.5-pro":        ("gemini", "gemini-2.5-pro", True),
    "gemini-2.0-flash":      ("gemini", "gemini-2.0-flash", True),
    "gemini-3.5-flash":      ("gemini", "gemini-2.5-flash", True),
    "gemini-3.1-flash-lite": ("gemini", "gemini-2.0-flash", True),
    "deepseek-free":         ("opencode", "deepseek-v4-flash-free", False),
    "mimo-free":             ("opencode", "mimo-v2.5-free", False),
    "ollama":                ("ollama", "qwen2.5:3b", False),
    "mistral":               ("opencode", "mistral-large-latest", False),
}
FALLBACK_CHAIN = ["gemini-2.5-flash", "gemini-2.0-flash", "deepseek-free", "mimo-free"]


def _call_gemini(gemini_key, model_name, system_prompt, user_message, timeout=90, history=None):
    """Call Gemini. Retries briefly on HTTP 429 (rate-limit) with backoff so a
    short rate-limit window self-heals instead of failing the whole request."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={gemini_key}"
    # Build multi-turn contents from prior history (for conversation memory).
    contents = []
    for turn in (history or []):
        role = "user" if turn.get("sender") == "user" else "model"
        text = turn.get("text", "")
        if text:
            contents.append({"role": role, "parts": [{"text": text}]})
    contents.append({"role": "user", "parts": [{"text": user_message}]})
    payload = {
        "contents": contents,
        "systemInstruction": {"parts": [{"text": system_prompt}]},
        "generationConfig": {"temperature": 0.3, "maxOutputTokens": 4096},
    }
    last_exc = None
    # Up to 2 quick retries for rate-limit (429) only; other errors propagate.
    for attempt in range(3):
        try:
            res = _HTTP_SESSION.post(url, headers={"Content-Type": "application/json"}, json=payload, timeout=timeout)
            if res.status_code == 429 and attempt < 2:
                # Exponential backoff: 1.5s, then 3s.
                time.sleep(1.5 * (attempt + 1))
                continue
            res.raise_for_status()
            data = res.json()
            cand = data.get("candidates")
            if not cand:
                raise ValueError("Gemini returned no candidates (possibly blocked).")
            return cand[0]["content"]["parts"][0]["text"]
        except Exception as e:
            last_exc = e
            # Only retry on rate-limit; surface everything else immediately.
            if getattr(e, "response", None) is not None and getattr(e.response, "status_code", None) == 429 and attempt < 2:
                time.sleep(1.5 * (attempt + 1))
                continue
            raise
    if last_exc:
        raise last_exc
    raise RuntimeError("Gemini call failed without a response.")


def _call_opencode(opencode_key, model_name, system_prompt, user_message, timeout=90, history=None):
    headers = {"Authorization": f"Bearer {opencode_key}", "Content-Type": "application/json"}
    messages = [{"role": "system", "content": system_prompt}]
    for turn in (history or []):
        role = "user" if turn.get("sender") == "user" else "assistant"
        text = turn.get("text", "")
        if text:
            messages.append({"role": role, "content": text})
    messages.append({"role": "user", "content": user_message})
    payload = {
        "model": model_name,
        "messages": messages,
        "temperature": 0.3,
    }
    res = _HTTP_SESSION.post("https://opencode.ai/zen/v1/chat/completions", headers=headers, json=payload, timeout=timeout)
    res.raise_for_status()
    return res.json()["choices"][0]["message"]["content"]


def _call_ollama(model_name, system_prompt, user_message, timeout=90):
    res = _HTTP_SESSION.post("http://localhost:11434/api/generate", json={
        "model": model_name,
        "prompt": f"System: {system_prompt}\nUser: {user_message}\nResponse:",
        "stream": False,
    }, timeout=timeout)
    res.raise_for_status()
    return res.json()["response"]


# Per-provider timeout (seconds). Long generations (study plans, detailed
# answers) need more headroom than a short chat reply, so this is generous;
# the overall budget below still bounds total wait across the fallback chain.
LLM_PER_PROVIDER_TIMEOUT = int(os.environ.get("LLM_TIMEOUT", "90"))
# Hard cap on total time spent across all providers in the fallback chain.
LLM_TOTAL_TIMEOUT = int(os.environ.get("LLM_TOTAL_TIMEOUT", "150"))


def call_llm(model_key: str, system_prompt: str, user_message: str, timeout: int = None, history=None) -> str:
    """Robust multi-provider LLM router with graceful fallback.

    Bounds total wait time so a slow/rate-limited provider cannot hang the
    request (and, on a single-worker server, block every other endpoint).
    `history` is a list of prior {"sender", "text"} turns for conversation memory.
    """
    gemini_key, opencode_key, _ = load_api_keys()
    model_key = (model_key or "gemini-2.5-flash").lower().strip()
    per_timeout = timeout or LLM_PER_PROVIDER_TIMEOUT

    order = []
    if model_key in MODEL_REGISTRY:
        order.append(model_key)
    for m in FALLBACK_CHAIN:
        if m not in order:
            order.append(m)

    last_error = None
    deadline = time.monotonic() + LLM_TOTAL_TIMEOUT
    for attempt in order:
        # Stop trying more providers once the overall budget is exhausted.
        if time.monotonic() >= deadline:
            break
        provider, real_model, healthy = MODEL_REGISTRY[attempt]
        if provider == "gemini" and (not gemini_key or gemini_key.endswith("...")):
            continue
        if provider == "opencode" and (not opencode_key or opencode_key.endswith("...")):
            continue
        if provider == "ollama" and attempt != model_key:
            continue
        # Shrink the per-call timeout so we never exceed the overall budget.
        remaining = max(5, int(deadline - time.monotonic()))
        call_timeout = min(per_timeout, remaining)
        try:
            if provider == "gemini":
                return _call_gemini(gemini_key, real_model, system_prompt, user_message, call_timeout, history=history)
            if provider == "opencode":
                return _call_opencode(opencode_key, real_model, system_prompt, user_message, call_timeout, history=history)
            if provider == "ollama":
                return _call_ollama(real_model, system_prompt, user_message, call_timeout)
        except Exception as e:
            last_error = e
            print(f"[LLM] {attempt} ({provider}/{real_model}) failed: {e}")
            continue

    # Build a user-friendly error (avoid leaking internal provider URLs/keys).
    err_msg = ""
    if last_error is not None:
        err_str = str(last_error)
        # Redact any http(s) URLs that may contain provider endpoints/keys.
        err_str = re.sub(r"https?://[^\s)]+", "[provider-endpoint]", err_str)
        err_str = re.sub(r"sk-[A-Za-z0-9_\-]+", "[redacted-key]", err_str)
        err_msg = f" (Reason: {err_str})"
    return (f"\u26a0\ufe0f Sorry, I could not reach any AI model right now. "
            f"The primary provider may be temporarily busy or rate-limited. "
            f"Please try again in a moment.{err_msg}")


# --- HELPER: QUIZ PARSER ---
def parse_quiz_questions(content: str, max_questions: int = 15):
    """Extract MCQs from a chapter using several tolerant patterns.

    Handles the formats actually present in this dataset, e.g.:
      '**Q:** Rearrange: (A) ... (B) ... (C) ... (D) ...'
      '**Solution:** ... **Answer: (D) ...**'
    as well as the classic '1. Question\\nA) opt ... Answer: B' style.
    Scans the whole chapter rather than requiring a 'Practice' header.
    """
    if not content:
        return []

    questions = []

    # Pattern 1: inline MCQ — a question line containing options (A)..(D)
    # e.g. "**Q:** Which is the FIRST sentence?\n(A) ... (B) ... (C) ... (D) ..."
    inline_re = re.compile(
        r"(?im)"                                   # case-insensitive, multiline
        r"(?:\*\*Q:\*\*|Q[:.]|Question[:.]|^\s*(?:\d+\.|Q\d+)\s+)"  # question lead-in
        r"(?P<q>.*?)"                              # question text (non-greedy)
        r"(?=\n|\Z)"                               # up to end of line
    )

    # Find every option block: (A) text (B) text ... up to 4 options, possibly
    # spanning the same line or multiple lines, terminated by Solution/Answer.
    opt_block_re = re.compile(
        r"(?is)"                                   # dot matches newline
        r"(\([A-D]\))"                             # first option marker
        r".*?"                                     # options text
        r"(?=(?:\(?[A-D]\)|\*\*?(?:Solution|Answer)|$))"  # lookahead to next option/solution
    )

    # Split content into candidate regions that contain at least (A)..(D)
    # We scan line by line, grouping a question line with the following option run.
    lines = content.splitlines()
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]
        # Detect a question lead-in
        is_q = re.match(r"(?i)^\s*(?:\*\*Q:\*\*|Q[:.]|Question[:.]|(?:\d+\.|Q\d+)\s+)", line) is not None
        if not is_q:
            i += 1
            continue

        # Gather the question text (may continue until we hit an option marker)
        q_parts = [line]
        j = i + 1
        while j < n and not re.search(r"\([A-D]\)", lines[j]) and j - i < 6:
            q_parts.append(lines[j])
            j += 1
        question_text = re.sub(r"\s+", " ", " ".join(q_parts)).strip()
        # Strip the lead-in marker
        question_text = re.sub(r"(?i)^\s*(?:\*\*Q:\*\*|Q[:.]|Question[:.]|(?:\d+\.|Q\d+)\s+)", "", question_text).strip()
        if len(question_text) < 8:
            i = j
            continue

        # Now collect the option run starting at line j
        opt_lines = []
        while j < n:
            opt_lines.append(lines[j])
            # Stop when we see Solution/Answer (end of options) or a new question/heading
            if re.search(r"(?i)\*\*?(?:Solution|Answer)\b", lines[j]):
                break
            if j > i and re.match(r"(?i)^\s*(?:#{1,6}\s|###\s|PYQ|\*\*Q:\*\*|Q[:.]|Question[:.]|(?:\d+\.|Q\d+)\s+)", lines[j]):
                # a new block started without Solution/Answer — stop here
                opt_lines.pop()
                j -= 1
                break
            j += 1

        opt_text = "\n".join(opt_lines)
        opts = re.findall(r"(?im)\(?([A-D])\)\s*(.+?)(?=\s*(?:\([A-D]\)|\*\*?(?:Solution|Answer)|$))", opt_text, re.DOTALL)
        options = {}
        for letter, text in opts:
            options[letter.upper()] = re.sub(r"\s+", " ", text.strip()).strip()
        if len(options) < 2:
            i = j + 1
            continue

        # Answer: prefer explicit "Answer: (X)" or "Answer: X."; else first option
        ans_m = re.search(r"(?i)\*\*?Answer\s*[:=]?\s*\(?\s*([A-D])\s*\)?", opt_text)
        correct = ans_m.group(1).upper() if ans_m and ans_m.group(1).upper() in options else list(options.keys())[0]

        sol_m = re.search(r"(?i)\*\*?Solution\s*[:=]?\s*(.+?)(?=\n\n|\Z)", opt_text, re.DOTALL)
        solution = re.sub(r"\s+", " ", sol_m.group(1).strip()) if sol_m else "Refer to the chapter text for the detailed explanation."
        if len(solution) > 600:
            solution = solution[:600] + "..."

        questions.append({
            "question": question_text,
            "options": options,
            "answer": correct,
            "solution": solution
        })
        if len(questions) >= max_questions:
            break
        i = j + 1

    # Pattern 2 (fallback): classic numbered-question blocks with A) / A. options
    if not questions:
        blocks = re.split(r"(?=\n\s*(?:\d+\.|Q\d+\.|Q\.\d+)\s+)", "\n" + content)
        for block in blocks:
            block = block.strip()
            if len(block) < 15:
                continue
            qm = re.match(
                r"^(?:\d+\.|Q\d+\.|Q\.\d+)\s+(.*?)(?=\n\s*(?:\(?\[?\s*[A-D]\s*\)\.\]\]\s+|\*\*[A-D][\).]\*\*))",
                block, re.DOTALL)
            if not qm:
                continue
            question_text = re.sub(r"\s+", " ", qm.group(1).strip())
            if len(question_text) < 8:
                continue

            opts = re.findall(
                r"(?im)^\s*(?:\(|\[)?\s*([A-D])\s*(?:\)|\.|\])\s*(?:\*\*)?\s*(.+?)\s*$"
                r"(?=\n\s*(?:\(|\[)?\s*[A-D]\s*(?:\)|\.|\])\s+|\n\s*(?:Answer|Correct\s*Answer|Solution|Explanation)\s*[:=]|$)",
                block)
            if len(opts) < 2:
                opts = re.findall(
                    r"(?im)(?:^|\n)\s*(?:\(|\[)?\s*([A-D])\s*(?:\)|\.|\])\s+(.+?)(?=\n\s*(?:\(|\[)?\s*[A-D]\s*(?:\)|\.|\])\s+|\n\s*(?:Answer|Correct)|$)",
                    block)

            options = {}
            for letter, text in opts:
                options[letter.upper()] = re.sub(r"\s+", " ", text.strip()).strip()
            if len(options) < 2:
                continue

            ans_m = re.search(r"(?:Correct\s*Answer|Answer)\s*[:=]?\s*\(?\s*([A-D])\s*\)?", block, re.IGNORECASE)
            correct = ans_m.group(1).upper() if ans_m and ans_m.group(1).upper() in options else list(options.keys())[0]

            sol_m = re.search(r"(?:Solution|Explanation)\s*[:=]?\s*(.+)", block, re.DOTALL | re.IGNORECASE)
            solution = re.sub(r"\s+", " ", sol_m.group(1).strip()) if sol_m else "Refer to the chapter text for the detailed explanation."
            if len(solution) > 600:
                solution = solution[:600] + "..."

            questions.append({
                "question": question_text,
                "options": options,
                "answer": correct,
                "solution": solution
            })
            if len(questions) >= max_questions:
                break

    return questions


def generate_quiz_with_llm(chapter_text: str, title: str, model_key: str = "gemini-2.5-flash", max_q: int = 5):
    """Use the LLM to author MCQs grounded in the chapter when none are pre-written."""
    excerpt = chapter_text[:3500]
    system = (
        "You are an exam question writer for Indian competitive exams. "
        f"Given a chapter excerpt, produce ONLY valid JSON: a JSON array of exactly {max_q} objects. "
        "Each object MUST have keys: \"question\" (string), "
        "\"options\" (an object with exactly keys \"A\",\"B\",\"C\",\"D\" mapping to answer strings), "
        "\"answer\" (one of \"A\",\"B\",\"C\",\"D\"), and \"solution\" (string). "
        "Base questions strictly on the provided text. Respond with raw JSON only, no markdown code fences, no extra prose."
    )
    user = f"Chapter: {title}\n\nExcerpt:\n{excerpt}"
    raw = call_llm(model_key, system, user, timeout=90)
    try:
        cleaned = raw.strip()
        # Strip markdown code fences (```json ... ```) anywhere
        cleaned = re.sub(r"```(?:json)?", "", cleaned).strip()
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3].strip()
        # Repair truncated JSON (model cut off at token limit): close open array
        if cleaned.startswith("["):
            depth = 0
            in_str = False
            escaped = False
            last_quote_open = False
            for ch in cleaned:
                if escaped:
                    escaped = False
                    continue
                if ch == "\\":
                    escaped = True
                    continue
                if ch == '"':
                    in_str = not in_str
                    continue
                if not in_str:
                    if ch == "[":
                        depth += 1
                    elif ch == "]":
                        depth -= 1
            last_quote_open = in_str
            if depth > 0:
                if last_quote_open:
                    cleaned += '"'
                cleaned += "]" * depth
        data = json.loads(cleaned)
        out = []
        for q in data:
            norm = _norm_q(q)
            if norm:
                out.append(norm)
        return out
    except Exception as e:
        print(f"[QUIZ] LLM generation parse failed ({e}); trying salvage + retry")
        # Salvage: extract only fully-complete question objects from the raw text
        salvaged = _salvage_quiz_objects(raw)
        if salvaged:
            return salvaged
        # Retry once with fewer questions
        try:
            raw2 = call_llm(model_key, system, user + "\n\n(Keep it short. Return only 3 questions.)", timeout=90)
            cleaned2 = re.sub(r"```(?:json)?", "", raw2.strip()).strip()
            if cleaned2.endswith("```"):
                cleaned2 = cleaned2[:-3].strip()
            data2 = json.loads(cleaned2)
            objs = [_norm_q(q) for q in data2]
            return [o for o in objs if o]
        except Exception as e2:
            print(f"[QUIZ] retry also failed: {e2}")
            return []


def _norm_q(q):
    """Normalize a single quiz object dict into our schema, or None if invalid."""
    try:
        opts = _normalize_options(q.get("options", {}))
        if len(opts) < 2:
            return None
        ans = str(q.get("answer", "A"))
        if ans not in opts:
            matched = [k for k, v in opts.items() if v.strip() == ans.strip()]
            ans = matched[0] if matched else list(opts.keys())[0]
        return {
            "question": q.get("question", ""),
            "options": opts,
            "answer": ans.upper(),
            "solution": q.get("solution", ""),
            "generated": True,
        }
    except Exception:
        return None


def _salvage_quiz_objects(raw: str):
    """Grab complete {...} question objects from possibly truncated LLM output."""
    cleaned = re.sub(r"```(?:json)?", "", raw).strip()
    if cleaned.endswith("```"):
        cleaned = cleaned[:-3].strip()
    results = []
    depth = 0
    in_str = False
    escaped = False
    buf = ""
    for ch in cleaned:
        if escaped:
            escaped = False
            buf += ch
            continue
        if ch == "\\":
            escaped = True
            buf += ch
            continue
        if ch == '"':
            in_str = not in_str
            buf += ch
            continue
        if not in_str:
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
        buf += ch
        if depth == 0 and buf.strip().startswith("{"):
            candidate = buf.strip()
            buf = ""
            try:
                obj = json.loads(candidate)
                norm = _norm_q(obj)
                if norm:
                    results.append(norm)
            except Exception:
                pass
    return results

def get_flashcards_data():
    flashcards = []
    fallback_cards = [
        {"subject": "Quant", "question": "What is the formula for Compound Interest?", "answer": "CI = P(1 + R/100)^N - P, where P is principal, R is rate, and N is time period.", "difficulty": "Easy"},
        {"subject": "Quant", "question": "What is the Product Constancy rule for Speed & Time?", "answer": "If distance is constant, Speed and Time are inversely proportional. Speed ratio a:b implies Time ratio b:a.", "difficulty": "Medium"},
        {"subject": "Quant", "question": "Formula for sum of first 'n' natural numbers?", "answer": "Sum = n(n + 1) / 2", "difficulty": "Easy"},
        {"subject": "Quant", "question": "What is the divisibility rule for 11?", "answer": "The difference between the sum of digits at odd places and the sum of digits at even places is either 0 or divisible by 11.", "difficulty": "Medium"},
        {"subject": "Reasoning", "question": "Letter positioning trick for alphabetical series?", "answer": "Use EJOTY (5, 10, 15, 20, 25) to map letter offsets quickly.", "difficulty": "Easy"},
        {"subject": "Reasoning", "question": "Formula for finding angle between clock hands?", "answer": "Angle = |30H - 11/2 M|, where H is hours and M is minutes.", "difficulty": "Hard"},
        {"subject": "Reasoning", "question": "What is the maximum number of Sundays in any leap year?", "answer": "A leap year has 52 weeks and 2 extra days. Thus, there can be at most 53 Sundays.", "difficulty": "Medium"},
        {"subject": "Science", "question": "Formula for Ohm's Law?", "answer": "V = I * R, where V = Voltage, I = Current, and R = Resistance.", "difficulty": "Easy"},
        {"subject": "Science", "question": "Which organ secretes Insulin?", "answer": "Insulin is secreted by the beta cells of the islets of Langerhans in the Pancreas.", "difficulty": "Easy"},
        {"subject": "Science", "question": "What is the escape velocity of Earth?", "answer": "Approximately 11.2 km/s.", "difficulty": "Hard"},
        {"subject": "English", "question": "Define 'Gerund' vs 'Present Participle'.", "answer": "A Gerund acts as a noun (e.g., 'Swimming is fun'), while a Present Participle acts as a verb/adjective (e.g., 'He is swimming').", "difficulty": "Medium"},
        {"subject": "English", "question": "Rule for Subject-Verb agreement with 'Each' or 'Every'?", "answer": "Pronouns like 'Each', 'Everyone', 'Nobody' always take a singular verb.", "difficulty": "Easy"},
        {"subject": "Banking", "question": "What is CRR (Cash Reserve Ratio)?", "answer": "The percentage of total deposits that commercial banks must keep as cash reserves with the RBI.", "difficulty": "Easy"},
        {"subject": "Banking", "question": "What is Repo Rate?", "answer": "The rate at which the RBI lends money to commercial banks in the event of any shortfall of funds.", "difficulty": "Medium"},
        {"subject": "Computer", "question": "What does ROM stand for?", "answer": "Read-Only Memory. It is non-volatile memory storing boot instructions (BIOS).", "difficulty": "Easy"},
        {"subject": "Computer", "question": "What is the size of an IPv6 address?", "answer": "128 bits (represented in hexadecimal format).", "difficulty": "Hard"}
    ]
    try:
        if os.path.exists("./books"):
            files = glob.glob("./books/**/*.md", recursive=True)
            for file_path in files:
                subject_name = os.path.basename(os.path.dirname(file_path)).replace("_", " ").title()
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                matches = re.findall(r"\*\s+\*\*([^*]+)\*\*:\s*([^\n]+)", content)
                for term, definition in matches[:3]:
                    if len(definition.strip()) > 30:
                        flashcards.append({
                            "subject": subject_name,
                            "question": f"Define or explain: {term.strip()}",
                            "answer": definition.strip(),
                            "difficulty": "Medium"
                        })
    except Exception as e:
        print(f"Error scanning chapters for flashcards: {e}")
        
    return flashcards + fallback_cards

# --- Pydantic Schemas ---
class ChatMessage(BaseModel):
    message: str
    model: str = "gemini"

class StudyPlanRequest(BaseModel):
    exam: str
    weak_areas: str
    model: str = "gemini"

# --- API ENDPOINTS ---

@app.get("/api/status")
def get_status():
    gemini_key, opencode_key, _ = load_api_keys()
    brave_key = os.environ.get("BRAVE_API_KEY")
    if not brave_key:
        for path in [".env", ".env.local", "study-tutor/.env.local"]:
            if os.path.exists(path):
                try:
                    for line in open(path):
                        if line.strip().startswith("BRAVE_API_KEY="):
                            brave_key = line.strip().split("=", 1)[1].strip().strip('"').strip("'")
                except Exception:
                    pass
    providers = {
        "gemini": bool(gemini_key) and not gemini_key.endswith("..."),
        "opencode": bool(opencode_key) and not opencode_key.endswith("..."),
        "brave_search": bool(brave_key),
    }
    return {
        "rag_enabled": RAG_ENABLED,
        "index_loaded": index is not None,
        "total_chunks": len(documents),
        "db_enabled": DB_ENABLED,
        "providers": providers,
        "active_provider": "gemini" if providers["gemini"] else ("opencode" if providers["opencode"] else "none"),
        "web_search": "brave" if providers["brave_search"] else "duckduckgo",
        "default_model": DEFAULT_MODEL,
        "server_time": get_current_ist_time(),
    }

def _duckduckgo_html_search(query: str, max_results=3):
    """Key-free DuckDuckGo search via the public HTML endpoint (no API key,
    no external library — pure requests). Returns list of {title,url,snippet}."""
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                          "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
        }
        out = []
        # DDG HTML endpoint returns results across paginated 'dc' param.
        for start in (0, 10, 20):
            resp = _HTTP_SESSION.get("https://html.duckduckgo.com/html/",
                            params={"q": query, "dc": start},
                            headers=headers, timeout=10)
            resp.raise_for_status()
            html = resp.text
            # Each result: <a class="result__a" href="...">title</a> ... <a class="result__snippet">snip</a>
            titles = re.findall(r'class="result__a"[^>]*href="([^"]+)"[^>]*>(.*?)</a>', html, re.DOTALL)
            snippets = re.findall(r'class="result__snippet"[^>]*>(.*?)</a>', html, re.DOTALL)
            for i, (href, title) in enumerate(titles):
                if len(out) >= max_results:
                    break
                # Decode DDG redirect URLs (uddg=...) to real URLs
                m = re.search(r"uddg=([^&]+)", href)
                url = requests.utils.unquote(m.group(1)) if m else href
                title = re.sub(r"<[^>]+>", "", title).strip()
                snip = re.sub(r"<[^>]+>", "", snippets[i]) if i < len(snippets) else ""
                snip = re.sub(r"\s+", " ", snip).strip()
                if url and title:
                    out.append({"title": title, "url": url, "snippet": snip})
            if len(out) >= max_results or "result__a" not in html:
                break
        return out[:max_results]
    except Exception as e:
        print(f"[WEB] DuckDuckGo HTML failed: {e}")
        return []


def _wikipedia_search(query: str, max_results=3):
    """Key-free Wikipedia search + extract (no API key). Returns list of
    {title,url,snippet} with the article extract as the snippet."""
    try:
        headers = {"User-Agent": "StudyGuideTutor/1.0 (educational)"}
        # 1) search for matching article titles
        s = _HTTP_SESSION.get("https://en.wikipedia.org/w/api.php",
                     params={"action": "query", "list": "search", "srsearch": query,
                             "format": "json", "srlimit": max_results},
                     headers=headers, timeout=10)
        s.raise_for_status()
        hits = s.json().get("query", {}).get("search", [])
        out = []
        for hit in hits[:max_results]:
            title = hit.get("title", "")
            # 2) fetch the extract (plain text) for grounding
            e = _HTTP_SESSION.get("https://en.wikipedia.org/w/api.php",
                         params={"action": "query", "prop": "extracts",
                                 "exintro": 1, "explaintext": 1, "titles": title,
                                 "format": "json", "redirects": 1},
                         headers=headers, timeout=10)
            e.raise_for_status()
            pages = e.json().get("query", {}).get("pages", {})
            extract = ""
            for pid, pg in pages.items():
                extract = pg.get("extract", "")
                break
            out.append({
                "title": title,
                "url": f"https://en.wikipedia.org/wiki/{requests.utils.quote(title.replace(' ', '_'))}",
                "snippet": re.sub(r"\s+", " ", extract).strip()[:600]
            })
        return out
    except Exception as e:
        print(f"[WEB] Wikipedia failed: {e}")
        return []


def perform_web_search(query: str, max_results=3):
    # Dynamic year-based targeting for exam queries
    import datetime
    current_year = datetime.datetime.now().year
    exam_keywords = ["sbi po", "sbi clerk", "ssc cgl", "ssc chsl", "rrb ntpc", "ibps po", "ibps clerk", "rrb alp", "rbi grade b", "rbi assistant", "lic aao", "lic ado", "upsc", "ssc mts"]
    if any(k in query.lower() for k in exam_keywords) and str(current_year) not in query:
        query = f"{query} {current_year}"

    results = []

    # 1. PRIMARY (optional, best quality): Brave Search API. Activates only
    #    when BRAVE_API_KEY is set in the environment / .env. Otherwise skipped
    #    entirely — the tutor works fully key-free without it.
    brave_key = os.environ.get("BRAVE_API_KEY")
    if not brave_key:
        for path in [".env", ".env.local", "study-tutor/.env.local"]:
            if os.path.exists(path):
                try:
                    for line in open(path):
                        line = line.strip()
                        if line.startswith("BRAVE_API_KEY="):
                            brave_key = line.split("=", 1)[1].strip().strip('"').strip("'")
                except Exception:
                    pass
    if brave_key:
        try:
            params = {"q": query, "count": max_results, "freshness": "py"}
            headers = {"Accept": "application/json", "X-Subscription-Token": brave_key}
            resp = _HTTP_SESSION.get("https://api.search.brave.com/res/v1/web/search",
                            headers=headers, params=params, timeout=10)
            resp.raise_for_status()
            data = resp.json().get("web", {}).get("results", [])
            for item in data[:max_results]:
                results.append({
                    "title": item.get("title", ""),
                    "url": item.get("url", ""),
                    "snippet": item.get("description", "")
                })
            if results:
                print(f"[WEB] Brave returned {len(results)} results for '{query}'")
        except Exception as e:
            print(f"Brave search failed: {e}")

    # 2. KEY-FREE PRIMARY: DuckDuckGo HTML scraper (no library, no key).
    if not results:
        results = _duckduckgo_html_search(query, max_results)

    # 3. KEY-FREE FALLBACK: DDGS library (if still installed/working).
    if not results:
        try:
            from ddgs import DDGS
            with DDGS() as ddgs:
                res = list(ddgs.text(query, max_results=max_results, timelimit='y'))
                for r in res:
                    results.append({
                        "title": r.get("title", ""),
                        "url": r.get("href", ""),
                        "snippet": r.get("body", "")
                    })
        except Exception as e:
            print(f"DuckDuckGo (ddgs) failed: {e}")

    # 4. KEY-FREE FALLBACK: Google.
    if not results:
        try:
            from googlesearch import search
            res = list(search(query, num_results=max_results))
            for url in res:
                results.append({
                    "title": "Google Search Result",
                    "url": url,
                    "snippet": f"Web page result from Google search query for '{query}'."
                })
        except Exception as e:
            print(f"Google search failed: {e}")

    # 5. KEY-FREE FALLBACK: Wikipedia (great for concepts/definitions).
    if not results:
        results = _wikipedia_search(query, max_results)

    # 6. Enrich the top results with full page text so the tutor can answer
    #    with actual facts (e.g. section-wise marks) rather than just snippets.
    for r in results:
        page_text = _fetch_page_text(r.get("url", ""))
        if page_text:
            r["page_text"] = page_text
            if len(page_text) > len(r.get("snippet", "")):
                r["snippet"] = page_text[:600]

    return results


def _fetch_page_text(url: str, timeout: int = 8, max_chars: int = 4000) -> str:
    """Fetch and extract readable text from a web page for grounding answers.
    Returns '' on any failure (keeps web search resilient)."""
    if not url or not url.startswith("http"):
        return ""
    try:
        import requests
        from urllib.parse import urlparse
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                          "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
        }
        resp = _HTTP_SESSION.get(url, headers=headers, timeout=timeout)
        resp.raise_for_status()
        html = resp.text
        # Strip scripts/styles
        html = re.sub(r"<script[\s\S]*?</script>", " ", html, flags=re.IGNORECASE)
        html = re.sub(r"<style[\s\S]*?</style>", " ", html, flags=re.IGNORECASE)
        # Convert breaks/paragraphs to newlines
        html = re.sub(r"<(br|/p|/div|/li|/h[1-6])[^>]*>", "\n", html, flags=re.IGNORECASE)
        text = re.sub(r"<[^>]+>", " ", html)
        text = re.sub(r"&nbsp;", " ", text)
        text = re.sub(r"&amp;", "&", text)
        text = re.sub(r"&lt;", "<", text)
        text = re.sub(r"&gt;", ">", text)
        text = re.sub(r"[ \t]+", " ", text)
        text = re.sub(r"\n\s*\n+", "\n", text)
        text = text.strip()
        # Only keep lines that look informative (skip nav/footer noise)
        lines = [ln.strip() for ln in text.split("\n") if len(ln.strip()) > 40]
        return "\n".join(lines)[:max_chars]
    except Exception as e:
        print(f"[WEB-FETCH] failed for {url}: {e}")
        return ""


def _classify_web_search_need(query: str) -> bool | None:
    """Use a fast LLM to decide whether answering `query` requires live web data
    (recent notifications, current vacancies, latest syllabus/pattern changes,
    this-year dates, recently updated marks/weightage) versus static study
    material (concepts, formulas, solved examples, general theory).

    Returns True/False, or None if the classifier is unavailable (caller should
    fall back to the keyword heuristic). This replaces brittle keyword guessing
    with an actual understanding of the user's intent.
    """
    gemini_key, opencode_key, _ = load_api_keys()
    system_prompt = (
        "You are a routing classifier for an Indian competitive-exam prep tutor.\n"
        "Decide whether answering the user's question REQUIRES fresh/live web data "
        "rather than static study material.\n"
        "NEEDS live web data when the question is about ANY of: recent exam notifications, "
        "current year vacancies/seats, latest syllabus or exam-pattern changes, this-year "
        "application/exam dates, recently revised marks/sectional weightage, current cut-offs, "
        "or anything that may have changed since your training data.\n"
        "Does NOT need web data when the question is about stable concepts, formulas, "
        "shortcut tricks, solved examples, definitions, or general theory that does not change.\n"
        "Respond with ONLY a JSON object and nothing else: {\"needs_web\": true} or {\"needs_web\": false}."
    )
    user_msg = f"User question: {query}"
    # Try a fast model first, then a free fallback, so the classifier still works
    # even if one provider is rate-limited.
    attempts = []
    if gemini_key and not gemini_key.endswith("..."):
        attempts.append(("gemini", gemini_key, "gemini-2.0-flash"))
    if opencode_key and not opencode_key.endswith("..."):
        attempts.append(("opencode", opencode_key, "deepseek-v4-flash-free"))
    for provider, key, model in attempts:
        try:
            if provider == "gemini":
                raw = _call_gemini(key, model, system_prompt, user_msg, timeout=8)
            else:
                raw = _call_opencode(key, model, system_prompt, user_msg, timeout=8)
            m = re.search(r"\{.*\}", raw, re.DOTALL)
            if not m:
                continue
            data = json.loads(m.group(0))
            return bool(data.get("needs_web", False))
        except Exception as e:
            print(f"[WEB-CLASSIFIER] {provider}/{model} failed: {e}")
            continue
    return None

@app.post("/api/chat")
def post_chat(payload: ChatMessage):
    global index, documents, embedder
    user_query = payload.message
    selected_model = payload.model
    
    context = ""
    sources = []
    
    # Retrieve context if RAG is active
    if RAG_ENABLED and index is not None:
        try:
            query_vector = embedder.encode([user_query])
            distances, indices = index.search(np.array(query_vector).astype("float32"), k=3)
            
            retrieved_chunks = []
            for idx in indices[0]:
                if idx < len(documents):
                    doc = documents[idx]
                    retrieved_chunks.append(doc["text"])
                    sources.append({
                        "source": doc["source"],
                        "subject": doc["subject"],
                        "snippet": doc["text"][:150] + "..."
                    })
            context = "\n---\n".join(retrieved_chunks)
        except Exception as e:
            print(f"RAG Retrieval failed: {e}")

    # Live Web Search Integration
    web_context = ""
    # Intelligent trigger: ask an LLM whether this query needs fresh web data,
    # instead of brittle keyword guessing. Falls back to keywords if the
    # classifier is unavailable (e.g. all providers rate-limited).
    web_keywords = ["latest", "news", "current", "2025", "2026", "date", "notification", "schedule", "web", "search", "online", "live", "update", "when is",
                    "syllabus", "mark allocation", "marks allocation", "marking scheme", "exam pattern", "weightage", "section wise", "sectionwise", "section-wise", "sectional", "topic wise", "subject wise",
                    "vacancy", "eligibility", "cut off", "cutoff", "selection process", "phase", "prelims", "mains", "tier"]
    exam_keywords = ["sbi po", "sbi clerk", "ssc cgl", "ssc chsl", "rrb ntpc", "ibps po", "ibps clerk", "rrb alp", "rbi grade b", "rbi assistant", "lic aao", "lic ado", "upsc", "ssc mts"]
    classified = _classify_web_search_need(user_query)
    if classified is None:
        # Fallback heuristic only if the classifier could not run.
        needs_web = (
            any(k in user_query.lower() for k in web_keywords) or
            any(k in user_query.lower() for k in exam_keywords)
        )
    else:
        needs_web = classified

    if needs_web:
        print(f"Triggering Web Search for query: '{user_query}'...")
        web_results = perform_web_search(user_query, max_results=3)
        web_chunks = []
        for r in web_results:
            chunk = f"Title: {r['title']}\nURL: {r['url']}\nSnippet: {r['snippet']}"
            # Include full extracted page text so the tutor can answer with the
            # actual facts (e.g. section-wise marks) rather than just snippets.
            if r.get("page_text"):
                chunk += f"\nPage Content:\n{r['page_text']}"
            web_chunks.append(chunk)
            # Extract domain for citation
            from urllib.parse import urlparse
            try:
                domain = urlparse(r['url']).netloc or "web-search"
            except:
                domain = "web-search"
            sources.append({
                "source": domain,
                "subject": "Web Search Result",
                "snippet": r['snippet'][:150] + "..."
            })
        if web_chunks:
            web_context = "\n---\n".join(web_chunks)

    # Set up system instructions
    system_prompt = (
        f"You are Antigravity, a precise AI Exam Prep Tutor for Indian competitive exams (SSC CGL, RRB NTPC, Banking, Clerical).\n"
        f"Current Time (IST): {get_current_ist_time()}.\n\n"
        "OBJECTIVE: Give the student the exact answer they asked for — nothing more, nothing less.\n\n"
        "STRICT STYLE RULES:\n"
        "- NO preamble, NO greetings, NO 'Great question!', NO filler. Open with the answer or the core concept directly.\n"
        "- Be concise. Use short paragraphs, bold headers, bullet lists, and tables. Prefer scannable structure.\n"
        "- Mathematical Precision: format all equations/variables with LaTeX inline ($...$) or block ($$...$$) delimiters. Keep notation flawless.\n"
        "- Encouraging but terse. Do not restate the question back to the user.\n"
    )
    
    solving_keywords = ["solve", "calculate", "formula", "shortcut", "trick", "how to solve", "derivation", "method", "example", "show", "prove", "yes", "sure", "please"]
    is_solving_requested = any(k in user_query.lower() for k in solving_keywords)
    
    if is_solving_requested:
        system_prompt += (
            "\nDETAILED SOLVING INSTRUCTIONS:\n"
            "- The student has explicitly requested mathematical calculations, formulas, or solving shortcuts.\n"
            "- Show the conceptual formula, write down the step-by-step substitution, present the final calculation, and highlight time-saving shortcuts or mental math tips suitable for timed competitive exams.\n"
        )
    else:
        system_prompt += (
            "\nCONCISE EXPLANATION INSTRUCTIONS:\n"
            "- The student has NOT explicitly requested calculations or shortcuts yet. Keep answers direct, concise, and focused.\n"
            "- If the query is about a mathematical, quantitative aptitude, or reasoning topic, explain the concept briefly, state the core formula, and EXPLICITLY ask the student if they would like to see the step-by-step shortcut derivation, calculations, or a solved example (e.g., 'Would you like to see the step-by-step shortcut derivation or practice a sample problem?').\n"
            "- Do NOT generate unsolicited math examples, mock word problems, or long calculations unless explicitly prompted.\n"
        )
    
    user_prompt = ""
    if context:
        user_prompt += f"Local Book Context:\n{context}\n\n"
        system_prompt += (
            "\nGROUNDING GUIDELINES (Textbook Context):\n"
            "- Base your explanations on the provided 'Local Book Context'.\n"
            "- At the end of statements containing facts retrieved from the local chapters, cite the textbook file exactly using the format: [Source: filename.md].\n"
        )
        
    if web_context:
        user_prompt += f"Live Web Search Context:\n{web_context}\n\n"
        system_prompt += (
            "\nREAL-TIME SEARCH GUIDELINES (Web Context):\n"
            "- MANDATORY: When 'Live Web Search Context' is present, you MUST answer using ONLY that context for any factual claim about exam patterns, marks, vacancies, dates, or notifications. Do NOT use your training data for these facts — the web context is the source of truth and is more current.\n"
            "- Report EXACTLY what the web context states, including the precise section-wise marks, question counts, and durations. Do not substitute, 'correct', or override any numbers from the web context with values from your own knowledge — even if you think the web page is outdated. Your job is to faithfully relay the retrieved, cited information.\n"
            "- If different web sources disagree (e.g. one says 40 marks for a section and another says 60), present BOTH figures and cite each source domain, then note the discrepancy so the student can verify against the official notification.\n"
            "- If the query or context relates to a specific competitive examination (e.g. SBI PO, SSC CGL, RRB NTPC), prioritize presenting the latest notifications, patterns, application timelines, exam dates, and recent changes from the web search results.\n"
            "- Explicitly highlight the most recent / revised figures at the beginning of your response so the student gets the current information.\n"
            "- Cite the source domains of your web context inline or at the end of the statement exactly using the format: [Web: domain.com].\n"
            "- If the web context does not contain the answer, say so plainly — do not fill the gap with possibly-outdated training data.\n"
        )
    
    if not context and not web_context:
        system_prompt += (
            "\nGENERAL TUTORING INSTRUCTIONS:\n"
            "- Explain competitive exam syllabus topics with clean examples, formulas, and shortcut tricks.\n"
            "- Break down explanations step-by-step."
        )
        user_prompt = user_query
    else:
        system_prompt += (
            "\nFALLBACK RULES:\n"
            "- If the answer cannot be found in the provided contexts, you may draw upon your general training data to assist the student.\n"
            "- However, you MUST explicitly prefix such general paragraphs with: '[GENERAL KNOWLEDGE — not found in course chapters]'.\n"
            "- If you are completely unsure or if information (like exact dates or vacancies) is missing from both the contexts and your training data, state: 'Information not available' rather than guessing or hallucinating.\n"
        )
        user_prompt += f"Question: {user_query}\n\nAnswer:"

    # Save user query to database
    save_chat_message("user", user_query)

    # Load recent conversation history (for memory) — exclude the message we
    # just saved so the model doesn't see the current prompt twice.
    history = get_recent_history(limit=12)
    if history and history[-1].get("sender") == "user" and history[-1].get("text") == user_query:
        history = history[:-1]

    # Query LLM using router (with conversation memory)
    response_text = call_llm(selected_model, system_prompt, user_prompt, history=history)

    # Hard fallback: if every LLM provider failed but we DID retrieve fresh web
    # data, synthesize a direct answer from the web context so the student still
    # gets the updated, cited information instead of a generic error message.
    if response_text.startswith("\u26a0\ufe0f") and web_context:
        lines = []
        lines.append("Here is the latest information retrieved from the web (live search):\n")
        for r in web_chunks:
            lines.append(r)
        lines.append("\n(Note: the AI model was temporarily unavailable, so this is the raw web context. Please retry for a summarized answer.)")
        response_text = "\n".join(lines)

    # Save system response to database
    save_chat_message("system", response_text, sources)

    return {
        "response": response_text,
        "sources": sources,
        "rag_used": bool(context or web_context)
    }

@app.get("/api/chat")
def get_chat_history():
    if not DB_ENABLED:
        return _MEM_CHAT
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            dbname=DB_NAME
        )
        conn.set_client_encoding('UTF8')
        cursor = conn.cursor()
        cursor.execute("SELECT sender, text, sources FROM chat_history ORDER BY id ASC")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        
        import html
        history = []
        for row in rows:
            history.append({
                "sender": row[0],
                "text": html.unescape(row[1]) if row[1] else "",
                "sources": json.loads(html.unescape(row[2])) if row[2] else []
            })
        return history
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/chat")
def delete_chat_history():
    if not DB_ENABLED:
        _MEM_CHAT.clear()
        return {"status": "success"}
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            dbname=DB_NAME
        )
        cursor = conn.cursor()
        cursor.execute("TRUNCATE TABLE chat_history RESTART IDENTITY")
        conn.commit()
        cursor.close()
        conn.close()
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/subjects")
def get_subjects():
    if not os.path.exists(DATA_DIR):
        return []
    
    subjects = []
    folders = [f for f in os.listdir(DATA_DIR) if os.path.isdir(os.path.join(DATA_DIR, f)) and not f.startswith("_")]
    
    for folder in folders:
        subject_path = os.path.join(DATA_DIR, folder)
        chapters = glob.glob(os.path.join(subject_path, "*.md"))
        
        display_name = folder.replace("_", " ")
        subjects.append({
            "id": folder,
            "name": display_name,
            "total_chapters": len(chapters)
        })
    return subjects

@app.get("/api/chapters")
def get_chapters():
    if not os.path.exists(DATA_DIR):
        return []
        
    all_chapters = []
    folders = [f for f in os.listdir(DATA_DIR) if os.path.isdir(os.path.join(DATA_DIR, f)) and not f.startswith("_")]
    
    for folder in folders:
        subject_path = os.path.join(DATA_DIR, folder)
        files = glob.glob(os.path.join(subject_path, "*.md"))
        files.sort()
        
        for file_path in files:
            filename = os.path.basename(file_path)
            parts = filename.replace(".md", "").split("_")
            num = parts[0]
            title = " ".join(parts[1:])
            
            all_chapters.append({
                "subject_id": folder,
                "filename": filename,
                "number": num,
                "title": title,
            })
            
    return all_chapters

@app.get("/api/chapter/{subject_id}/{filename}")
def get_chapter_content(subject_id: str, filename: str):
    file_path = os.path.join(DATA_DIR, subject_id, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Chapter not found")
        
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        return {"content": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/quiz")
def get_chapter_quiz(subject: str, filename: str, use_ai: bool = True):
    file_path = os.path.join(DATA_DIR, subject, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Chapter file not found")
        
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        questions = parse_quiz_questions(content)
        
        # Fallback 1: LLM-generated MCQs grounded in the chapter text
        if not questions and use_ai:
            _title = filename.replace(".md", "").split("_", 1)[-1].replace("_", " ")
            questions = generate_quiz_with_llm(content, _title)
        
        # Fallback 2: safe generic conceptual questions
        if not questions:
            title = filename.replace(".md", "").split("_")[1:]
            title_text = " ".join(title)
            questions = [
                {
                    "question": f"Which of the following is a primary conceptual principle discussed in the chapter '{title_text}'?",
                    "options": {
                        "A": "Basic foundational definitions and classification parameters.",
                        "B": "Unrelated historical context from external disciplines.",
                        "C": "Experimental science measurements without mathematical formula models.",
                        "D": "Visual art layouts unrelated to competitive exam syllabus."
                    },
                    "answer": "A",
                    "solution": "The beginning of the chapter directly establishes the foundational theory, classifications, and definitions related to this subject."
                },
                {
                    "question": "What is the primary speed-solving shortcut technique recommended for solving problems of this category?",
                    "options": {
                        "A": "Writing out long multi-step equations without option elimination.",
                        "B": "Using approximation, product constancy, or Vedic math methods to eliminate options and solve in 2 steps.",
                        "C": "Guessing the answers blindly based on probability weightage.",
                        "D": "Converting all questions into descriptive long-form essays."
                    },
                    "answer": "B",
                    "solution": "Chapter Section 3 highlights shortcut methods (such as Vedic tricks or option elimination) to complete questions within the 30-60 second exam limit."
                }
            ]
        return {"questions": questions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/study-plan")
def post_study_plan(payload: StudyPlanRequest):
    exam = payload.exam
    weak_areas = payload.weak_areas
    selected_model = payload.model
    
    prompt = (
        f"You are an expert academic planner for Indian competitive exams.\n"
        f"Generate a customized, weekly study plan (for 4 weeks) for a student preparing for the '{exam}' exam.\n"
        f"The student specifically requested help in their weak areas: '{weak_areas}'.\n"
        f"Provide a structured, step-by-step timetable. Include which topics to read, "
        f"which formula sheets to memorize, and target quiz metrics.\n"
        f"Use clean markdown, tables, and bullet points."
    )
    
    system_prompt = "You are an expert academic planner for Indian competitive exams."
    plan_text = call_llm(selected_model, system_prompt, prompt, timeout=120)
        
    return {"plan": plan_text}

@app.get("/api/flashcards")
def get_flashcards():
    return get_flashcards_data()

@app.get("/api/progress")
def get_progress():
    if not DB_ENABLED:
        return _MEM_PROGRESS
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            dbname=DB_NAME
        )
        cursor = conn.cursor()
        cursor.execute("SELECT value FROM user_progress WHERE key = 'current_progress'")
        row = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if row:
            return json.loads(row[0])
    except Exception as e:
        print(f"Error fetching progress from PostgreSQL: {e}")
        
    return {"completed_chapters": [], "quiz_scores": {}}

@app.post("/api/progress")
def post_progress(data: dict = Body(...)):
    if not DB_ENABLED:
        _MEM_PROGRESS.update(data)
        return {"status": "success"}
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            dbname=DB_NAME
        )
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO user_progress (key, value) VALUES ('current_progress', %s)
            ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
        """, (json.dumps(data),))
        conn.commit()
        cursor.close()
        conn.close()
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/time")
def get_time():
    return {"current_time": get_current_ist_time()}


# --- ROUTING STATIC FILES ---
os.makedirs("./static", exist_ok=True)
app.mount("/static", StaticFiles(directory="./static"), name="static")

@app.get("/")
def read_root():
    index_path = "./static/index.html"
    if not os.path.exists(index_path):
        return {"message": "AI Tutor Server is running. Frontend files are being written. Please refresh in a moment."}
    from fastapi.responses import FileResponse
    return FileResponse(index_path)

if __name__ == "__main__":
    import uvicorn
    # Use multiple workers so a slow LLM call (chat/planner) cannot block every
    # other endpoint (Dashboard, Library, Quiz, Flashcards). `reload=True` is
    # single-process and incompatible with workers>1, so it is disabled when
    # more than one worker is requested. Override with STUDY_TUTOR_WORKERS /
    # STUDY_TUTOR_RELOAD env vars if needed.
    workers = int(os.environ.get("STUDY_TUTOR_WORKERS", "3"))
    use_reload = os.environ.get("STUDY_TUTOR_RELOAD", "false").lower() in ("1", "true", "yes")
    if workers > 1:
        use_reload = False
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=use_reload,
        workers=workers if not use_reload else 1,
    )
