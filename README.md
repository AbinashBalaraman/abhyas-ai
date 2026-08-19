# 🎓 Abhyas AI — Competitive Exams Prep Platform & Intelligent Tutor

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

An open-source, full-stack AI-powered learning platform and comprehensive textbook repository tailored for 60+ Indian competitive examinations (SSC, RRB, Banking, UPSC, Defence, State PSCs, Teaching, Insurance).

Built with **Next.js 16 + React 19**, a **PostgreSQL** persistence layer, a multi-model **RAG knowledge engine**, and **87 comprehensive subject chapters** (~365,000+ words) covering Quantitative Aptitude, Reasoning, General Science, English, and General Awareness.

---

## 🌟 Key Features

* 🤖 **Context-Aware AI Tutor (`/chat`)**: Multi-LLM chat tutor with semantic RAG over textbook chapters, live web search grounding fallback, and LaTeX/KaTeX mathematical typesetting.
* 📖 **Interactive Chapter Browser (`/chapters`)**: Subject filters, real-time search, and full-featured Markdown reader for comprehensive theory, formula cards, and worked examples.
* 🃏 **3D Interactive Flashcards (`/flashcards`)**: Flip-card revision decks organized by subject with mastery tracking.
* 🗺️ **Adaptive Study Planner (`/study-plan`)**: Generates personalized preparation roadmaps based on target exams, daily study hours, and diagnosed weak areas.
* 📊 **Gamified Analytics Dashboard (`/dashboard`)**: Track completed chapters, weekly study activity, quiz performance, and subject mastery.
* 🔀 **Multi-Model LLM Routing**: Seamless switching between **Google Gemini 2.5 Flash**, **OpenCode Zen / DeepSeek**, and **Local Ollama (Qwen2.5)**.

---

## 📚 Content Library & Exam Coverage

The repository includes structured, exam-mapped study material:

### 📖 87 Comprehensive Subject Chapters (`books/`)
* **Quantitative Aptitude (22 Chapters, ~88,200 words)**: Number System, Arithmetic, Algebra, Geometry, Trigonometry, Coordinate Geometry, Permutations & Combinations, Data Interpretation, Data Sufficiency.
* **Reasoning Ability (15 Chapters, ~78,100 words)**: Analogy, Syllogisms, Seating Arrangements, Puzzles, Machine Input-Output, Critical & Analytical Reasoning.
* **General Science (15 Chapters, ~70,200 words)**: NCERT Class 9-12 Physics, Chemistry, Biology, Environmental Ecology, and Modern Science.
* **English Language (12 Chapters, ~54,800 words)**: Grammar Rules, Error Spotting, Reading Comprehension, Cloze Test, Para Jumbles, Active/Passive Voice, Vocabulary.
* **General Awareness (8 Chapters, ~37,300 words)**: Indian History (Ancient/Medieval/Modern), Polity & Constitution, Geography, Economy, Static GK, and Current Affairs.
* **Banking & Financial Awareness (10 Chapters, ~22,200 words)**: RBI Structure, Monetary Policy, Digital Banking, Basel Accords, NPAs, Financial Regulators, Government Schemes.
* **Computer Aptitude (5 Chapters, ~14,700 words)**: Computer Architecture, Hardware/Software, Networking & Internet, Cyber Security, Emerging Tech (AI, Cloud, 5G).

### 🎯 63 Exam Syllabi Database (`syllabus_db/`)
* **SSC Family**: CGL, CHSL, MTS, CPO, GD, JE, Stenographer, Selection Posts, Delhi Police.
* **RRB Family**: NTPC, Group D, JE, ALP, Technician, RPF Constable/SI, Section Controller.
* **Banking & Insurance**: IBPS PO/Clerk/SO/RRB, SBI PO/Clerk, RBI Grade B/Assistant, NABARD, SEBI, LIC AAO/ADO, NIACL.
* **UPSC & Defence**: CSE (Prelims/CSAT), CAPF, CDS, NDA, Army, Navy, Air Force.
* **State & Teaching**: State PSCs, Police/Patwari, CTET, KVS, NVS, DSSSB.

---

## 🏗️ System Architecture

```
                               ┌─────────────────────────────┐
                               │   Next.js 16 Client App     │
                               │  (React 19 + Tailwind v4)   │
                               └──────────────┬──────────────┘
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      ▼                                               ▼
       ┌────────────────────────────┐                  ┌────────────────────────────┐
       │   Next.js Server API       │                  │   PostgreSQL Database      │
       │   Routes (/api/chat, etc.) │                  │   (chat_history, progress) │
       └──────────────┬─────────────┘                  └────────────────────────────┘
                      │
     ┌────────────────┼──────────────────────────────┐
     ▼                ▼                              ▼
┌───────────┐  ┌───────────────┐              ┌───────────────┐
│ Gemini    │  │ OpenCode Zen  │              │ Local Ollama  │
│ 2.5 Flash │  │ (DeepSeek/    │              │ (Qwen2.5:3b)  │
│ + Search  │  │  Mimo Free)   │              │               │
└───────────┘  └───────────────┘              └───────────────┘
```

---

## 🚀 Quick Start Guide

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.0 or higher, v20+ recommended)
* [PostgreSQL](https://www.postgresql.org/) (v14 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/abhyas-ai.git
cd abhyas-ai
```

### 2. Configure Environment Variables
```bash
cd study-tutor
cp .env.example .env.local
```

Edit `study-tutor/.env.local` with your configuration:
```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/study_tutor"
GEMINI_API_KEY="your_gemini_api_key"
OPENCODE_ZEN_API_KEY="your_opencode_zen_api_key"
```

### 3. Install Dependencies & Launch
```bash
# In the study-tutor directory
npm install
npm run dev
```

Open [http://localhost:8000](http://localhost:8000) (or [http://localhost:3000](http://localhost:3000)) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📂 Directory Structure

```
abhyas-ai/
├── books/                           # Synthesized Study Guide Chapters (Markdown)
│   ├── Quantitative_Aptitude/       # 22 Chapters
│   ├── Reasoning_Ability/           # 15 Chapters
│   ├── General_Science/             # 15 Chapters
│   ├── English_Language/            # 12 Chapters
│   ├── General_Awareness/           # 8 Chapters
│   ├── Banking_Financial_Awareness/ # 10 Chapters
│   ├── Computer_Aptitude/           # 5 Chapters
│   └── _practice_sets/              # 233 Curated Practice Question Sets
├── syllabus_db/                     # 63 Exam Syllabus Documents
├── study-tutor/                     # Primary Next.js 16 + React 19 Application
│   ├── src/
│   │   ├── app/                     # Next.js App Router (chat, chapters, dashboard, flashcards, study-plan, api)
│   │   ├── components/              # Reusable UI Components (Sidebar, Header)
│   │   └── lib/                     # Multi-LLM Router (llm.ts), RAG Pipeline (rag.ts), DB Pool (index.ts)
│   ├── public/                      # Static Assets & Icons
│   └── .env.example                 # Environment Variables Template
├── static/                          # Static Frontend UI Assets
├── main.py                          # Fast Python Microservice / Utility API
├── .gitignore                       # Production Multi-layer Git Ignore Rules
├── CONTRIBUTING.md                  # Contributor Guidelines
├── LICENSE                          # MIT Open Source License
└── README.md                        # Master Project Documentation
```

---

## 🔒 Security & Best Practices

* **Zero Secret Policy**: No API keys or connection strings are tracked in Git. All credentials are injected via environment variables.
* **Curated Content Standards**: Mathematical equations, chemical formulas, and historical chronologies are standard open educational knowledge.
* **Graceful Degradation**: If an external AI model or the PostgreSQL database is unavailable, the application gracefully falls back to local study materials.

---

## 🤝 Contributing & Community

Contributions are welcome! Please check out [CONTRIBUTING.md](CONTRIBUTING.md) for details on contributing to the Next.js app or adding syllabus updates.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
