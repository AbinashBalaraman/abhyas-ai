# 🤝 Contributing to Abhyas AI

Thank you for your interest in contributing to **Abhyas AI**! We welcome contributions to our study material library, AI tutoring pipelines, and Next.js web application.

---

## 📜 Content Integrity & Standards

All study guide content (definitions, mathematical formulas, historical dates, scientific facts, banking regulations, and exam questions) must strictly adhere to educational standards:

1. **Factual Accuracy**: Every formula, theorem, rule, and question must align with standard published educational syllabi and official examination patterns.
2. **Clarity & Structure**: Chapters should be logically structured with Core Theory, Formulas/Rules, Speed Shortcuts, Question Classifications, and Practice Sets.
3. **No Commercial Branding**: Avoid commercial publisher and proprietary branding in study chapters. Content should represent universal educational principles and verified general knowledge.

---

## 🛠️ Code Contributions

### Prerequisites
- **Node.js**: v18.0 or higher (v20+ recommended)
- **PostgreSQL**: v14 or higher
- **Python**: 3.10+ (for backend services / utilities)

### Development Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/abhyas-ai.git
   cd abhyas-ai
   ```

2. **Configure Environment Variables**:
   ```bash
   cd study-tutor
   cp .env.example .env.local
   # Populate DATABASE_URL, GEMINI_API_KEY, and OPENCODE_ZEN_API_KEY
   ```

3. **Install Dependencies & Start the Next.js App**:
   ```bash
   npm install
   npm run dev
   ```
   Open `http://localhost:8000` (or `http://localhost:3000`) in your browser.

4. **Verify TypeScript & Production Build**:
   ```bash
   npm run build
   ```

---

## 🔀 Branching & Pull Requests

1. Fork the repository and create a feature branch (`git checkout -b feature/amazing-feature` or `content/quant-trigonometry`).
2. Keep commits atomic and use clear, conventional commit messages:
   - `feat(tutor): add adaptive quiz generation endpoint`
   - `fix(rag): improve chunk retrieval precision for multi-word queries`
   - `docs(quant): add coordinate geometry section to chapter 19`
3. Ensure `npm run build` succeeds with 0 TypeScript/ESLint errors before opening a Pull Request.

---

## 📄 License
By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
