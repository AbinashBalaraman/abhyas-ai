# Chapter 23: Data Sufficiency

> **Chapter Overview:** **Data Sufficiency (DS)** is a critical reasoning-type question that appears across **all major Indian competitive exams**. It contributes **3-5 questions per SSC CGL Tier-I**, **5-8 questions per IBPS PO Prelims/Mains**, **5-10 per SBI PO**, and **3-5 per RRB NTPC CBT-1**. The Standard Exam ReferenceData Sufficiency chapter (Day 41) defines DS as: "In questions based on Data Sufficiency, candidates are given a piece of information followed by a few conditions and then a few options where they have to answer which of the given conditions shall be necessary to answer the question". This chapter was previously missing from the study guide — now built from 3 source PDFs.
>
> **Comprehensive exam-aligned study material covering standard syllabi for SSC, RRB, Banking, and State PSC examinations.
> - `books_raw_text/ocr2_extracted/8.Data Sufficiency.md` — Standard Exam ReferenceDay 41 (concept, 5-step trick, 3 practice Qs)
> - `books_raw_text/OCR_extracted/15. Data Sufficiency_Batch OCR.md` — 28-page RRB-NTPC DS compilation (with 50+ solved PYQs, RRB NTPC 04.01.2021, RRB Group-D 24/09/2018 references)
> - `books_raw_text/OCR_extracted/26. Data Sufficiency_Batch OCR.md` — Additional DS practice set

---

## 1. What is Data Sufficiency?

**Data Sufficiency (DS)** is a special reasoning question type where:
- A **question** is given
- Followed by **two or three statements** (labelled I, II, sometimes III)
- Each statement provides a piece of information
- The candidate must decide whether the information given is **sufficient** to answer the question

### 1.1 The Five Standard Answer Options

In DS problems, the typical answer options are:

| Option | Meaning |
|---|---|
| **(a)** | Both statements I and II are sufficient to answer the question |
| **(b)** | Statement II alone is sufficient while statement I alone is insufficient |
| **(c)** | Statement I alone is sufficient while statement II alone is insufficient |
| **(d)** | Either statement I or II is sufficient (each alone is sufficient) |
| **(e)** | Neither statement I nor II is sufficient to answer the question |

---

## 2. The 3-Step Solving Strategy

Standard Exam Reference's recommended approach:

### Step 1 — Examine the Question
- **What is asked?** Do we need to find a value, or check a relationship?
- **Do NOT look for the final answer** (if not asked).
- You mostly have to only answer which conditions will satisfy your requirements to meet the answer.

### Step 2 — Consider Each Statement Individually
- **First look at Statement I alone.** Does it provide enough information to answer?
  - If YES → check Statement II. If II also sufficient → answer (d) "Either statement is sufficient"
  - If YES (I alone) but II insufficient → answer (c) "Statement I alone is sufficient"
  - If I is insufficient but II is sufficient → answer (b) "Statement II alone is sufficient"
- **Do not jump to combining the statements** until you've tested each one alone.

### Step 3 — Combine Both Statements (if neither alone is sufficient)
- If neither statement alone is sufficient, **consider whether combining both gives enough info**.
- If YES → answer (a) "Both statements together are sufficient"
- If NO → answer (e) "Neither statement nor both together are sufficient"

---

## 3. Solved Examples (with step-by-step)

### Example 1 (Type 1: 3 statements, 5 options)
**Question:** Who is the shortest among A, B, C, D and E?

**Statements:**
- **I.** A is taller than E but shorter than D.
- **II.** B is shorter than C but taller than E.
- **III.** D is taller than C and A is taller than B.

**Step-by-step solution:**
- From Statement I: **D > A > E**
- From Statement II: **C > B > E**
- From Statement III: **D > C** and **A > B**

Combining all three: **D > C / A > B > E**

Since **E** is shorter than everyone else, E is the shortest.

**Answer: (d) Statements I, II and III together are sufficient** (RRB NTPC 04.01.2021 Shift-II Stage 1st)

---

### Example 2 (Type 2: 4 statements, balls ordering)
**Question:** There are 10 balls of different sizes and colors (green, yellow, blue, red, pink). Balls of same color are same in size. Find the sequence from largest to smallest.

**Statements:**
1. 3 red balls are larger than 2 green balls.
2. There are 2 pink balls which are smallest.
3. Two blue balls are largest.
4. Green is larger than yellow.

**Step-by-step solution:**
- (1) 3 red > 2 green
- (2) 2 pink are smallest
- (3) 2 blue are largest
- (4) green > yellow

Combining all four: **2 blue > 3 red > 2 green > yellow > 2 pink**

Total balls = 2 + 3 + 2 + 1 + 2 = 10 ✓

**Answer: (a) All statements together are sufficient** (RRB Group-D 24/09/2018 Shift-II)

---

### Example 3 (Type 3: Circular seating arrangement)
**Question:** A, B, C, D, E and F are sitting around a circular table. Each faces either the centre or outside. In which direction is D facing?

**Statements:**
- **I.** B sits second to the right of F and both are facing the centre. Only two people are sitting between A and E from either sides. Both A and E are facing the same direction. A is not an immediate neighbour of B.
- **II.** C is facing the opposite direction of B. D is sitting second to the left of C.

**Solution pattern (from Standard Exam ReferenceDay 41):**
- Draw a circular diagram with 6 positions
- Apply Statement I: fix B and F (centre-facing), then place A and E (same direction, not adjacent to B)
- Statement II alone gives partial info: C opposite to B (so C faces outside if B faces centre), and D is 2 left of C
- Combining both statements uniquely determines D's direction

**Answer:** (d) Statements I and II together are sufficient

---

## 4. Common Question Types in DS

Based on the 50+ PYQs in the source PDFs:

| Type | Pattern | Example Topic |
|---|---|---|
| **1. Ordering/Ranking** | "Who is shortest/oldest?" | Heights, ages, ranks |
| **2. Arrangement** | "Who sits where?" | Linear/circular seating |
| **3. Comparison** | "Which is greater?" | Numbers, distances, weights |
| **4. Coding** | "What is code for X?" | Letter-number codes |
| **5. Direction Sense** | "Which direction?" | North/South/East/West |
| **6. Blood Relations** | "How is X related to Y?" | Family tree logic |
| **7. Scheduling** | "On which day?" | Day-Month scheduling |
| **8. Equations** | "What is X+Y?" | Multi-variable math |

---

## 5. Common Traps and Pitfalls

### Trap 1: Jumping to Combine
- **Mistake:** Going straight to "Both together" without testing each alone.
- **Fix:** Always test Statement I alone first, then Statement II alone, then combine.

### Trap 2: Over-Solving
- **Mistake:** Trying to find the actual answer when only sufficiency is asked.
- **Fix:** Stop as soon as you determine sufficiency.

### Trap 3: Missing "Either" Option
- **Mistake:** When both I and II alone are sufficient, picking (a) "Both together" instead of (d) "Either".
- **Fix:** When both alone are sufficient, the answer is "Either statement is sufficient".

### Trap 4: Confusing "Sufficient" with "True"
- **Mistake:** A statement can give a value (true/false enough) but not uniquely determine the answer.
- **Fix:** Check if the answer is UNIQUE — e.g., Statement I "A is taller than B" is not sufficient to determine the exact height.

---

## 6. Practice Set (15 Questions)

### Set A — Foundation (5 questions, direct sufficiency)

**Q1.** Question: What is the value of X?
- I. X² = 25
- II. X is positive
- (a) Both I and II together sufficient (b) II alone sufficient (c) I alone sufficient (d) Either I or II sufficient (e) Neither

**Q2.** Question: Who is the oldest among A, B, C?
- I. A is older than B. (c) I alone sufficient
- II. B is older than C.
- (a) Both together (b) II alone (c) I alone (d) Either (e) Neither

**Q3.** Question: Is the number N even?
- I. N is divisible by 4
- II. N is divisible by 2
- (a) Both together (b) II alone (c) I alone (d) Either (e) Neither

**Q4.** Question: What day is today?
- I. Yesterday was Tuesday
- II. Tomorrow will be Thursday
- (a) Both together (b) II alone (c) I alone (d) Either (e) Neither

**Q5.** Question: Is X greater than Y?
- I. X + 5 > Y + 5
- II. X - 5 > Y - 5
- (a) Both together (b) II alone (c) I alone (d) Either (e) Neither

### Set B — Intermediate (5 questions, multi-statement)

**Q6.** Question: In which direction is A facing?
- I. A is facing North. B is to the right of A.
- II. C is facing South. A is to the left of C.
- (a) Both together (b) II alone (c) I alone (d) Either (e) Neither

**Q7.** Question: Who is the heaviest among P, Q, R, S?
- I. P is heavier than Q.
- II. R is heavier than P. S is lighter than Q.
- (a) Both together (b) II alone (c) I alone (d) Either (e) Neither

**Q8.** Question: How many boys are there in the class?
- I. The number of girls is 20.
- II. The ratio of boys to girls is 3:2.
- (a) Both together (b) II alone (c) I alone (d) Either (e) Neither

**Q9.** Question: On which day of the week did Ramesh visit the temple?
- I. Ramesh visited the temple exactly after two days of his visit to the market.
- II. Ramesh visited the market on Friday.
- (a) Both together (b) II alone (c) I alone (d) Either (e) Neither

**Q10.** Question: What is the code for 'sky' in the code language?
- I. In that code language, 'sky' is coded as 'green'.
- II. In that code language, 'green' is coded as 'red'.
- (a) Both together (b) II alone (c) I alone (d) Either (e) Neither

### Set C — Advanced (5 questions, exam-style)

**Q11.** Question: How is A related to B?
- I. A is the brother of C. C is the daughter of B.
- II. B is the son of D. A is the son of D.
- (a) Both together (b) II alone (c) I alone (d) Either (e) Neither

**Q12.** Question: What is the colour of the flower?
- I. The flower is either red or blue.
- II. The flower is not red.
- (a) Both together (b) II alone (c) I alone (d) Either (e) Neither

**Q13.** Question: What is the position of A from the left end of a row?
- I. There are 30 students in the row.
- II. B is 18th from the left and A is 8 positions to the right of B.
- (a) Both together (b) II alone (c) I alone (d) Either (e) Neither

**Q14.** Question: What is the speed of the train?
- I. The train crosses a pole in 10 seconds.
- II. The length of the train is 200 metres.
- (a) Both together (b) II alone (c) I alone (d) Either (e) Neither

**Q15.** Question: Who among A, B, C, D, E is the shortest?
- I. A is taller than E but shorter than D.
- II. B is shorter than C but taller than E.
- III. D is taller than C and A is taller than B.
- (a) All three insufficient (b) I and II together (c) I and III together (d) All three together

---

## 7. Answer Key

| Q | Ans | Q | Ans | Q | Ans |
|---|---|---|---|---|---|
| 1 | (d) | 6 | (e) | 11 | (a) |
| 2 | (a) | 7 | (a) | 12 | (a) |
| 3 | (b) | 8 | (a) | 13 | (a) |
| 4 | (d) | 9 | (a) | 14 | (a) |
| 5 | (d) | 10 | (c) | 15 | (d) |

---

## 8. Quick Revision Card

### Decision Tree

```
START: Read question carefully.
  │
  ├── Test Statement I ALONE
  │     │
  │     ├── Sufficient? ─── Yes ──→ Test Statement II ALONE
  │     │                              │
  │     │                              ├── Sufficient? ── Yes ──→ (d) Either
  │     │                              │                              │
  │     │                              │                              └→ Also: (a) Both together
  │     │                              │
  │     │                              └── Insufficient ───────────→ (c) I alone is sufficient
  │     │
  │     └── Insufficient ──→ Test Statement II ALONE
  │                              │
  │                              ├── Sufficient? ──── Yes ──→ (b) II alone is sufficient
  │                              │
  │                              └── Insufficient ──→ COMBINE BOTH
  │                                                          │
  │                                                          ├── Sufficient? ──→ (a) Both together
  │                                                          │
  │                                                          └── Insufficient ──→ (e) Neither
```

### Top 5 Rules

1. **Test EACH statement ALONE first.** Never combine before testing alone.
2. **"Either" = both alone sufficient.** Don't pick (a) in this case.
3. **Sufficiency ≠ Correctness.** Statement can be true but insufficient.
4. **Look for the UNIQUE answer.** Multiple possible answers = insufficient.
5. **Time target: 60-90 sec per DS question** (don't over-solve).

---
