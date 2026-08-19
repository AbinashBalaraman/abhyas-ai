# Chapter 16: Input-Output Machines

> **Chapter Overview:** **Input-Output (I/O)** is a critical reasoning chapter for **IBPS PO Mains**, **SBI PO Mains**, **IBPS Clerk Mains**, **RRB NTPC CBT-2**, and **SSC CGL Tier-II**. It typically carries **3-5 questions per IBPS PO Mains** (high-weightage, time-bound). The question type presents a sequence of steps (rearrangement, arithmetic, shifting, or arranging by size) applied to a given input; the candidate must identify the pattern and apply it to a new input. This chapter was previously missing from the project — now built from 2 source PDFs.
>
> **Comprehensive exam-aligned study material covering standard syllabi for SSC, RRB, Banking, and State PSC examinations.
> - `books_raw_text/OCR_extracted/25. Input & Output_Batch OCR.md` — 7-page detailed Input-Output guide with 4 operation types and worked examples
> - `books_raw_text/ocr2_extracted/29. Input Output.md` — Additional practice set

---

## 1. What is Input-Output?

**Input-Output (I/O)** questions present a **machine-style problem**: the candidate is given an initial input (a sequence of words, numbers, or both) and a series of rearrangement steps. Based on these steps, the candidate must determine the logic of the machine and apply it to a new input.

> **Definition:** "In this chapter of Input-Output, the student is given a combination of some words, numbers, word-numbers or in any other way, which is called input and its solution is given in several steps. The student has to identify the operations adopted in each step on the basis of the given input facts and on this basis a second input is given corresponding to the questions."

---

## 2. The 4 Basic Operation Types

Generally, the machine produces output on the given input using one of the following **four operations**:

### Type 1: Shifting

**Definition:** Elements of the given input are shifted (positions changed) as per some fixed logic.

**Example:**
- **Input:** Ram is a good boy.
- **Step I:** boy Ram is a good.

In this step, the **last word has been brought to the first place** (left-shift by 1 position).

### Type 2: Arranging (Dictionary Order)

**Definition:** Entries are arranged as per a particular order — typically the order in which they appear in the **dictionary** (alphabetical order).

**Example:**
- **Input:** Ram is a good boy.
- **Step I:** a Ram is good boy.
- **Step II:** a boy Ram is good.

The word "a" comes first in the dictionary (1st), "boy" comes second (2nd), "good" comes third, and so on.

### Type 3: Arithmetical Operations

**Definition:** The input consists of certain numbers. Subsequent steps are obtained by performing **arithmetic operations** (add, subtract, multiply, divide, or digit sum) on the numbers.

**Example:**
- **Input:** 18 16 11 173
- **Step I:** 9 7 2 8 3
- **Step II:** 20 18 13 19 5

- **Step I** is obtained by **adding the digits** of each number in the input:
  - 1+8=9, 1+6=7, 1+1=2, 1+7+3=11 → 1+1=2 (digit sum) or 1+7+3=11 (raw sum)
  - The pattern shows digit sums: 9, 7, 2, 11. Note: 11 may need further digit sum → 2
- **Step II** is obtained by **adding 2** to each original input number:
  - 18+2=20, 16+2=18, 11+2=13, 173+2=175 (or 19+2=21?)
  - More likely: each Step I digit (9, 7, 2, 8, 3) shows the digit sum, and Step II is original + 2

### Type 4: Arranging on the Basis of Size

**Definition:** Words are arranged on the basis of their **length** (number of letters) — typically 2-letter words first, then 3-letter, then 4-letter, etc.

**Example:**
- **Input:** wait and see me
- **Step I:** me wait and see
- **Step II:** me and wait see
- **Step III:** me and see wait

In **Step I**, the 2-letter word "me" occupies the first place. In **Step II**, the 3-letter word "and" moves to the second place. In **Step III**, "see" (3-letter) moves up.

---

## 3. Solving Strategy (Step-by-Step)

### Step 1: Identify the Operation Type
Look at the relationship between input and each subsequent step. Decide:
- **Type 1 (Shifting)?** Positions changing but content unchanged.
- **Type 2 (Arranging)?** Words being placed in dictionary order.
- **Type 3 (Arithmetic)?** Numbers changing by mathematical operations.
- **Type 4 (Size)?** Words rearranged by length.

### Step 2: Track Position-by-Position
Don't try to solve the whole step at once. Instead, track each word/number:
- Where was it in Step I?
- Where did it move to in Step II?
- Is the shift consistent (e.g., always one position to the right)?

### Step 3: Look for Patterns
Common patterns to watch for:
- **One-step shift:** Each step shifts one position.
- **Two-step shift:** Each step shifts two positions.
- **Multi-step shift with conditions:** Some elements shift one way, others stay.
- **Alternating patterns:** Odd positions go one way, even another.

### Step 4: Apply to New Input
Once you understand the pattern, apply it step-by-step to the new input asked in the question.

---

## 4. Solved Examples (Step-by-Step)

### Example 1: Type 1 Shifting
**Input:** cat dog bird fish ant
**Step I:** ant cat dog bird fish
**Step II:** fish ant cat dog bird

**Step-by-step solution:**
- Step I to Step II: Last element "fish" moves to first position; others shift right by 1.
- This is a **right-shift by 1** at each step.

**Test Input:** apple banana cherry date elder
- After Step I (right-shift by 1): elder apple banana cherry date
- After Step II: date elder apple banana cherry

### Example 2: Type 2 Dictionary Order
**Input:** zebra apple mango banana
**Step I:** apple banana mango zebra
**Step II:** apple banana mango zebra (no change in alphabetical already sorted)

**Test Input:** cat ant elephant dog
- After Step I: ant cat dog elephant (alphabetical)
- After Step II: ant cat dog elephant (already sorted)

### Example 3: Type 4 Size Order
**Input:** wait and see me
**Step I:** me wait and see
**Step II:** me and wait see
**Step III:** me and see wait

**Pattern:**
- 2-letter words ("me") go first
- 3-letter words ("and", "see") go next in original input order
- 4-letter+ words ("wait") go last in original input order

**Test Input:** be go come rest stay wait
- Step I: be go come rest stay wait (already grouped by length)
- Step II: be go come rest stay wait (3-letter "come", "rest", "stay" already alphabetical)
- Step III: be go come rest stay wait (no change)

---

## 5. Practice Set (10 Questions)

### Set A — Foundation (3 questions, single operation type)

**Q1.** Input: 24 35 17 42
- Step I: 6 8 8 6
- Step II: 30 43 25 48

What operation is performed in Step I and Step II?
(a) Step I = digit sum; Step II = add 6 (b) Step I = digit sum; Step II = add 6 to digit sum (c) Step I = subtract 18; Step II = add 18 (d) Cannot be determined

**Q2.** Input: car bus train bike auto
- Step I: auto car bus train bike
- Step II: bike auto car bus train

What is Step III?
(a) train bike auto car bus (b) bus train bike auto car (c) auto car bus train bike (d) car bus train bike auto

**Q3.** Input: please come here now
- Step I: now please come here
- Step II: now here please come
- Step III: now come here please

What is Step IV?
(a) please now come here (b) come please now here (c) now please come here (d) here now please come

### Set B — Intermediate (4 questions, mixed)

**Q4.** Input: 85 32 47 19 64
- Step I: 13 5 11 10 10
- Step II: 26 10 22 20 20

What is the operation in Step II?
(a) Double each number from Step I (b) Add 13 to each (c) Multiply digit sum by 2 (d) Square each

**Q5.** Input: tiger lion bear wolf fox
- Step I: fox tiger lion bear wolf
- Step II: fox wolf tiger lion bear
- Step III: bear fox wolf tiger lion

What pattern is this?
(a) Right-shift by 1 (b) Left-shift by 1 (c) Right-shift by 2 (d) Left-shift by 2

**Q6.** Input: 12 45 23 67 89
- Step I: 21 54 32 76 98
- Step II: 12 45 23 67 89

What operation?
(a) Reverse digits then reverse (b) Add 9 (c) Subtract 9 (d) Both (b) and (c) work

**Q7.** Input: 6789 4567 2345
- Step I: 9876 7654 5432
- Step II: 6789 4567 2345

Operation?
(a) Reverse each 4-digit number then reverse (b) Sort digits descending then reverse position (c) Add 3087 (d) Multiply by 1.456

### Set C — Advanced (3 questions, exam-style)

**Q8.** Input: 95 46 73 28 81
- Step I: 14 10 10 10 9
- Step II: 81 28 73 46 95

What is Step III?
(a) 81 28 73 46 95 (no change) (b) 95 46 73 28 81 (back to original) (c) 14 10 10 10 9 (digit sums) (d) 95 81 73 46 28

**Q9.** Input: A12 B23 C34 D45
- Step I: D45 A12 B23 C34
- Step II: D45 C34 A12 B23
- Step III: ?

What is Step III?
(a) D45 C34 B23 A12 (b) D45 B23 A12 C34 (c) D45 C34 B23 A12 (d) A12 B23 C34 D45

**Q10.** Input: 4 8 15 16 23 42
- Step I: 8 4 15 16 23 42
- Step II: 8 4 23 15 16 42
- Step III: 8 4 23 42 15 16

What is Step IV?
(a) 8 4 23 42 16 15 (b) 42 8 4 23 15 16 (c) 8 4 23 42 15 16 (no change) (d) 8 4 23 16 42 15

---

## 6. Answer Key

| Q | Ans | Q | Ans |
|---|---|---|---|
| 1 | (b) | 6 | (b) |
| 2 | (a) | 7 | (a) |
| 3 | (a) | 8 | (a) |
| 4 | (a) | 9 | (c) |
| 5 | (a) | 10 | (a) |

---

## 7. Common Traps

1. **Confusing shifting direction:** Left-shift vs right-shift — track position carefully.
2. **Missing multi-step pattern:** Some patterns shift by 2 or 3 each step, not 1.
3. **Ignoring arithmetic patterns:** If numbers change by ± constant, it's arithmetic.
4. **Mixing operation types:** A multi-step problem may use Shifting in Step I and Arranging in Step II.
5. **Time pressure:** I/O is time-bound. Set 90-120 sec per question maximum.

---

## 8. Quick Revision Card

### Decision Tree
```
Step I: Read input carefully (count elements).
        │
        ├── Step 1 vs Step 0
        │     │
        │     ├── Positions changed but values same? → Type 1 Shifting
        │     ├── Values same but positions alphabetical? → Type 2 Arranging
        │     ├── Numbers changed mathematically? → Type 3 Arithmetic
        │     └── Words grouped by length? → Type 4 Size Order
        │
        └── Test: Apply pattern to NEW input step-by-step.
```

### Time Targets
- **Per question:** 90-120 sec
- **IBPS PO Mains:** ~3-5 Qs = 6-10 min
- **SSC CGL Tier-II:** ~2-3 Qs = 4-6 min

---
