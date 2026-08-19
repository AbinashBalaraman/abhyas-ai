# Design Spec: AI Tutor Sizing, Memory, & Formatting Upgrades

- **Date**: 2026-07-02
- **Status**: Approved (Approach 1)
- **Author**: Antigravity AI

---

## 1. Problem Statement
The AI Tutor application has three critical areas of improvement:
1. **Model Output Bloat**: The system prompt forces mathematical calculations and shortcut tricks into *every* response, leading to bloated answers and vertical clutter for general inquiries (notifications, exam syllabi, GK).
2. **Memory Persistence Crash**: Unicode symbols (arrows, math operators) and emojis cause PostgreSQL save operations to crash with a `'charmap' codec can't encode` error, preventing chat memory from saving correctly.
3. **Scrambled LaTeX Rendering**: Inline KaTeX math equations display duplicated text layers (MathML screen-reader tags + HTML blocks) and stack symbols vertically when external stylesheets are slow or blocked.

---

## 2. Selected Design (Approach 1)

### 2.1. Model Prompt Refinement
Refactor prompt generation in `main.py` to make mathematical explanations and speed-solving shortcuts conditional:
- **Concise Mode**: Answers queries like syllabus structures, vacancy updates, or general news concisely, without adding unrelated mathematical formulas.
- **Conceptual Mode (Trigger)**: For initial math/reasoning topics, explain the concept briefly, show the main equation, and ask: *"Would you like to see the step-by-step shortcut derivation, or practice a sample problem?"*.
- **Solve Mode**: Execute full step-by-step calculations and LaTeX derivations *only* when the user explicitly requests them (using keywords: `solve`, `calculate`, `shortcut`, `formula`, `trick`, `how to solve`) or responds "yes" to see the shortcut.

### 2.2. PostgreSQL UTF-8 Client Encoding
Ensure database operations are safe from character mapping errors:
- Explicitly set `conn.set_client_encoding('UTF8')` immediately after creating any connection.
- This ensures Python communicates with PostgreSQL using UTF-8, supporting all emojis, arrows, and LaTeX operators.

### 2.3. KaTeX Layout Fallback
Ensure math equations are clean and layout-stable:
- Add a `.katex-mathml { display: none !important; }` rule to `static/style.css`.
- Force math characters to remain in standard horizontal text flows using `.katex-html { display: inline-block; }`.

---

## 3. Verification Plan
1. **TDD / Unit Tests**: Create a test suite verifying `save_chat_message` saves text containing math operators (e.g. `→`, `\frac{a}{b}`) and emojis without throwing encoding errors.
2. **Manual Chat Test**: Run a general inquiry (e.g. "latest sbi po notification") and confirm the AI responds concisely without CI/SI math calculations.
3. **LaTeX Render Check**: Confirm math formulas (e.g. successive percentage formula) do not display duplicate vertical text characters.
