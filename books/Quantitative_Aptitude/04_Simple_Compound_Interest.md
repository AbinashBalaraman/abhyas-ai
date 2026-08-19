# Chapter 4: Simple Interest & Compound Interest

> **Chapter Overview:** SI and CI are the **most calculation-heavy** topics in the Quant section. SSC CGL tests 1-2 questions directly and 2-3 in DI form. IBPS PO includes these in Data Interpretation. Standard Practice Question Bank dedicates 83 Qs to Simple Interest (Chapter 7) and 16 Qs to Compound Interest (Chapter 8). This chapter covers all the key formulas, installment problems, and the effective rate equivalence.
>
> **Primary sources:** CGL_Practice_King_2025 (Ch.7 SI = 83 Qs; Ch.8 CI = 16 Qs), Standard Exam Reference (Q.148-160 covers SI/CI variants), Previous Years Solved PapersSSC Maths PYQ, NCERT Class 8 Comparing Quantities. Target: 6,000+ words.

---

## 1. Foundation Theory

### 1.1 The Concept of Interest

When money is **borrowed** or **lent**, the borrower pays the lender an extra amount called **interest**. There are two principal methods:

- **Simple Interest (SI):** Interest is calculated only on the **original principal** for every year.
- **Compound Interest (CI):** Interest is calculated on the **principal + accumulated interest** (i.e., on the new amount) for each year.

### 1.2 The Principal, Rate, and Time

- **Principal (P):** The original sum borrowed or lent.
- **Rate (R):** The annual rate as a percentage.
- **Time (T):** The duration in years.

For SI:
$$\text{SI} = \frac{P \times R \times T}{100}$$

$$\text{Amount} = P + \text{SI} = P\left(1 + \frac{RT}{100}\right)$$

For CI (compounded annually):
$$\text{Amount} = P\left(1 + \frac{R}{100}\right)^T$$

$$\text{CI} = A - P = P\left[\left(1 + \frac{R}{100}\right)^T - 1\right]$$

### 1.3 When Interest is Compounded Half-Yearly / Quarterly

If $R$ is annual rate and interest is compounded $n$ times per year:
$$A = P\left(1 + \frac{R}{100n}\right)^{nT}$$

For half-yearly: $n=2$. For quarterly: $n=4$.

### 1.4 SI vs CI — The Universal Truth

For any principal, rate, and time, **CI > SI** (for $T > 1$ year). The difference:
$$\text{CI} - \text{SI} = P\left[\left(1 + \frac{R}{100}\right)^T - 1 - \frac{RT}{100}\right]$$

For 2 years, the difference simplifies to $P \cdot \frac{R^2}{100^2}$:
$$\text{Difference for 2 years} = P \cdot \left(\frac{R}{100}\right)^2$$

For 3 years:
$$\text{Difference} = P \cdot \left(\frac{R}{100}\right)^2 \cdot \left(3 + \frac{R}{100}\right)$$

### 1.5 Effective Rate of CI

If rate is $R$ compounded half-yearly, the **effective annual rate** is:
$$R_{eff} = \left(1 + \frac{R}{200}\right)^2 - 1 \approx R + \frac{R^2}{200}$$

For quarterly: $R_{eff} = \left(1 + \frac{R}{400}\right)^4 - 1 \approx R + \frac{3R^2}{800}$

### 1.6 Installment Framework

When a sum is paid in $n$ equal annual installments at CI rate $R$:
- Each installment = $\frac{P \times R/100}{1 - (1 + R/100)^{-n}}$

**Shortcut for 2 installments:** Each installment $A = \frac{P}{2} + \frac{SI \text{ on P for 1 year}}{2}$

For 3 installments: Apply this iteratively.

### 1.7 Population / Depreciation as CI

Population growth, depreciation, and any "growing/shrinking quantity" follow the CI formula. If initial is $P$ and rate is $r$%:
- After $n$ years: $P(1 + r/100)^n$
- After $n$ years at half-yearly compounding: $P(1 + r/200)^{2n}$

---

## 2. Complete Formula Repository

### 2.1 Simple Interest Master Formulas

$$\text{SI} = \frac{P \times R \times T}{100}$$

$$P = \frac{\text{SI} \times 100}{R \times T}$$

$$R = \frac{\text{SI} \times 100}{P \times T}$$

$$T = \frac{\text{SI} \times 100}{P \times R}$$

$$\text{Amount} = P + \text{SI} = P\left(1 + \frac{RT}{100}\right)$$

### 2.2 Compound Interest Master Formulas

**Compounded Annually:**
$$A = P\left(1 + \frac{R}{100}\right)^T$$
$$\text{CI} = A - P = P\left[\left(1 + \frac{R}{100}\right)^T - 1\right]$$

**Compounded Half-Yearly:**
$$A = P\left(1 + \frac{R}{200}\right)^{2T}$$

**Compounded Quarterly:**
$$A = P\left(1 + \frac{R}{400}\right)^{4T}$$

### 2.3 The CI-SI Difference (Master Formula)

For $T$ years:
$$\text{CI} - \text{SI} = P\left[\left(1 + \frac{R}{100}\right)^T - 1 - \frac{RT}{100}\right]$$

**Simplified for 2 years:**
$$\text{CI} - \text{SI} = P\left(\frac{R}{100}\right)^2$$

**Simplified for 3 years:**
$$\text{CI} - \text{SI} = P\left(\frac{R}{100}\right)^2 \left(3 + \frac{R}{100}\right)$$

### 2.4 Population / Depreciation (CI Form)

If $P_0$ is initial, $r$% rate, $n$ years:
$$P_n = P_0 \left(1 \pm \frac{r}{100}\right)^n$$

For growth: use $+$. For depreciation: use $-$.

### 2.5 Installment Formulas

**2 equal annual installments at rate $R$% (CI):**
$$\text{Installment} = \frac{P}{2} + \frac{\text{SI on P for 1 year}}{2} = \frac{P}{2}\left(1 + \frac{R}{200}\right)$$

**3 equal annual installments at rate $R$% (CI):**
$$\text{Installment} = \frac{P \times (R/100)}{1 - (1 + R/100)^{-3}}$$

**n equal annual installments at rate $R$% (CI):**
$$\text{Installment} = \frac{P \times (R/100)}{1 - (1 + R/100)^{-n}}$$

### 2.6 Rate Doubling / Tripling

If sum becomes $n$ times in $T$ years at CI:
$$n = \left(1 + \frac{R}{100}\right)^T$$

If sum doubles in $T$ years at SI rate $R$:
$$R = \frac{100}{T}$$

### 2.7 Ratio of SI and CI

For 2 years at rate $R$:
$$\frac{\text{SI}}{\text{CI}} = \frac{2R}{2R + R^2/100} = \frac{200}{200 + R}$$

---

## 3. Speed-Solving Shortcuts & Vedic Methods

### 3.1 The "$P \times RT/100$" Mental Arithmetic Trick

For SI, compute $PRT/100$ using $\frac{P}{100} \times R \times T$. This makes calculation faster.

**Example (CGL PK style):** *P = 5000, R = 8%, T = 3 years. SI?*
- $5000 \times 8 \times 3 / 100 = 50 \times 8 \times 3 = 50 \times 24 = 1200$. **Time: 15 sec.**

### 3.2 The CI "1.05^n" Table

For common rates and years, memorize the multipliers:

| Years | 5% | 10% | 20% | 25% |
|-------|-----|------|------|------|
| 1 | 1.05 | 1.10 | 1.20 | 1.25 |
| 2 | 1.1025 | 1.21 | 1.44 | 1.5625 |
| 3 | 1.1576 | 1.331 | 1.728 | 1.9531 |
| 4 | 1.2155 | 1.4641 | 2.0736 | 2.4414 |

### 3.3 The "Find Rate from Doubling Time" Trick

**For SI:** If a sum doubles in $T$ years, then $R = 100/T$.

**For CI:** If a sum doubles in $T$ years, then $R = 100 \times (2^{1/T} - 1)$.

Quick values: doubles in 2 years → R ≈ 41.4% (CI), 50% (SI). Doubles in 3 years → R ≈ 26% (CI), 33.3% (SI).

### 3.4 The "Effective Rate" Conversion

**SI rate = CI rate:** They are NOT the same. To find equivalent rates:
- SI rate $R$ for 1 year = CI rate $R$ for 1 year.
- For 2 years: SI rate $R$ for 2 years = CI rate $R'$ where $(1 + R'/100)^2 = 1 + 2R/100$. So $R' = 100(\sqrt{1 + 2R/100} - 1)$.

**Example:** SI 10% for 2 years = CI 7.47% for 2 years (since $\sqrt{1.2} = 1.0954$, $R' = 9.54\%$ for 1 year effective).

### 3.5 The "CI-SI Difference" Direct Formula

For 2 years:
$$\text{Diff} = P \times \frac{R^2}{10000}$$

**Example:** *P = 10000, R = 10%, T = 2 years. CI - SI?*
- Diff = $10000 \times 100/10000 = 100$. Direct! **Time: 5 sec.**

### 3.6 The "$n$-th Year Interest" Trick

In CI, the interest earned in the $n$-th year = $P(1+R/100)^{n-1} \times R/100$.

**Example:** *P = 10000, R = 10%. Interest in 3rd year?*
- Year 1 interest = 1000. Year 2 interest = 1100. Year 3 interest = 1210. **Answer: 1210.** *Time: 20 sec.*

### 3.7 The Installment Shortcut for 2 Years

For a sum $P$ paid in 2 equal annual installments at SI rate $R$%:
$$\text{Installment} = \frac{P(200 + R)}{200}$$

**Example:** *P = 12000, R = 10%, T = 2 yrs. Each installment?*
- $= 12000 \times 210/200 = 12600$. **Answer: ₹12,600.** *Time: 30 sec.*

### 3.8 The "Population as CI" Trick

Treat population growth/decline as CI directly.

**Standard Exam ReferenceQ.121 (recast):** *Pop 2,00,000. ↑20% Y1, ↓10% Y2, ↑5% Y3. Final?*
- Multiplier: $1.20 \times 0.90 \times 1.05 = 1.134$. Final = 2,26,800. **Time: 30 sec.**

### 3.9 The "Find Principal from CI" Trick

If amount is $A$ after $n$ years at rate $R$:
$$P = \frac{A}{(1 + R/100)^n}$$

**Example (CGL PK style):** *A = 1331, n = 3, R = 10%. P?*
- $P = 1331/1.331 = 1000$. **Time: 10 sec.**

### 3.10 The "Amount After 'n' Years at Given Rate" Reverse

**Example:** *P = 8000, after 2 years becomes 10580. Find R.*
- $1 + 2R/100 + R^2/10000 = 10580/8000 = 1.3225$. So $2R/100 + R^2/10000 = 0.3225$. If R = 10: $0.2 + 0.01 = 0.21$. If R = 15: $0.3 + 0.0225 = 0.3225$. ✓. **Answer: 15%.** *Time: 60 sec.*

### 3.11 The "Population Becomes n Times" Trick

For population doubling/tripling in $n$ years:
- Doubles: $R \approx 72/n$ (Rule of 72 for continuous; for discrete: $R = 100(2^{1/n} - 1)$).
- Triples: $R = 100(3^{1/n} - 1)$.

**Example (CGL PK style):** *At what rate does population double in 10 years (CI)?*
- $R = 100(\sqrt[10]{2} - 1) \approx 7.18\%$. **Time: 60 sec.**

### 3.12 The "Depreciation" Method

For CI-style depreciation, use the same formula with negative sign.

**Example (CGL PK Q.1):** *Machine depreciates 10%, 20%, 33.33% over 3 years. From Rs.20,000, value?*
- Multiplier: $0.9 \times 0.8 \times (1 - 1/3) = 0.48$. Value = 9,600.

### 3.13 The "Effective Rate for Half-Yearly" Method

**For half-yearly:** Effective rate = $2[(1 + R/200)^2 - 1] \approx R + R^2/200$ for small R.

**Example:** *10% half-yearly. Effective annual rate?*
- $(1 + 0.05)^2 - 1 = 0.1025 = 10.25\%$. **Time: 20 sec.**

### 3.14 The "When SI = CI" Special Case

For 1 year at any rate, SI = CI (since there's no compounding in 1 year). Beyond 1 year, CI > SI.

**For 0 years or fractional first year:** SI applies.

### 3.15 The "Setoff Method" for Installment

For 3 installments at SI:
- 3rd installment pays off 1 year's interest on full principal
- 2nd installment pays off 1 year's interest on (principal - 1st installment)
- 1st installment is the residual

---

## 4. Classification of Question Types

### 4.1 Type 1 — Basic SI Calculation

**Concept:** Direct application of $\text{SI} = PRT/100$.

**Formula:** $\text{SI} = \frac{P \times R \times T}{100}$

**Exam Frequency:** 1 per SSC CGL; 1 per IBPS.

**Example 1 (CGL PK style):** *P = 5000, R = 8%, T = 3 years. SI?*
- SI = 5000 × 8 × 3/100 = 1200. **Answer: ₹1,200.**

**Example 2 (CGL PK style):** *SI = 800, P = 4000, T = 2 years. R?*
- $800 = 4000 \times R \times 2/100 \Rightarrow R = 10\%$. **Answer: 10%.**

**Example 3 (CGL PK style):** *SI = 1200, R = 6%, T = 4 years. P?*
- $1200 = P \times 6 \times 4/100 \Rightarrow P = 5000$. **Answer: ₹5,000.**

### 4.2 Type 2 — Basic CI Calculation

**Concept:** Apply $(1+R/100)^T$ multiplier.

**Formula:** $A = P(1 + R/100)^T$, $\text{CI} = A - P$.

**Example 1 (CGL PK style):** *P = 10000, R = 10%, T = 3 years. CI?*
- $A = 10000 \times 1.331 = 13310$. CI = 3310. **Answer: ₹3,310.**

**Example 2 (CGL PK style):** *A = 1331, T = 3, R = 10%. P?*
- $P = 1331/1.331 = 1000$. **Answer: ₹1,000.**

**Example 3 (CGL PK style):** *P doubles in 6 years (CI). Rate?*
- $2 = (1 + R/100)^6 \Rightarrow 1 + R/100 = 2^{1/6} \approx 1.1225 \Rightarrow R \approx 12.25\%$. **Answer: 12.25%.**

### 4.3 Type 3 — Difference CI - SI

**Concept:** For 2 years, difference is simple: $P \times (R/100)^2$.

**Example 1:** *P = 10000, R = 10%, T = 2 years. CI - SI?*
- CI - SI = 10000 × (10/100)² = 100. **Answer: ₹100.**

**Example 2 (CGL PK style):** *P = 5000, R = 20%, T = 2 years. CI - SI?*
- = 5000 × (20/100)² = 5000 × 0.04 = 200. **Answer: ₹200.**

### 4.4 Type 4 — Installment Problems

**Concept:** Loan paid in equal annual installments.

**Example (CGL PK style):** *A loan of Rs.1,05,000 at 10% CI to be paid in 2 equal annual installments. Each installment?*
- Installment = $\frac{P(200 + R)}{200} = \frac{105000 \times 210}{200} = 110250$. **Answer: ₹1,10,250.**

### 4.5 Type 5 — Population / Depreciation as CI

**Example (Standard Exam ReferenceQ.39):** *Pop grows at 19.96% due to migration. All return. Decline %?*
- Decline = 19.96/(100 + 19.96) × 100 = 19.96/119.96 × 100 = 16.64%. **Answer: 16.64%.**

### 4.6 Type 6 — "Sum Becomes n Times"

**Example (CGL PK style):** *Sum triples in 6 years at CI. Rate?*
- $3 = (1 + R/100)^6$. $1 + R/100 = 3^{1/6} \approx 1.201$. R ≈ 20.1%. **Answer: 20.1%.**

### 4.7 Type 7 — Half-Yearly / Quarterly Compounding

**Example (CGL PK style):** *P = 10000, R = 20% half-yearly, T = 1 year. CI?*
- $A = 10000(1 + 0.1)^2 = 12100$. CI = 2100. **Answer: ₹2,100.**

### 4.8 Type 8 — "When CI = SI × n"

**Example (CGL PK style):** *At what rate for 2 years is CI = 1.21 × SI?*
- $\text{CI} - \text{SI} = P(R/100)^2 = 0.21 \times P \times 2R/100$. So $R/100 = 0.42 \Rightarrow R = 42\%$. **Answer: 42%.**

---

## 5. Previous Year Questions Analysis (5 PYQs)

### PYQ 1: SSC CGL 2024 (12/09/2025 Shift 1) — Q.63
**Q:** Landlord bought flat for Rs.12,00,000. Wants 9% annual return after Rs.2,500/month maintenance. Monthly rent?
(a) Rs.11,800 (b) Rs.10,500 (c) Rs.11,500 (d) Rs.11,700

**Solution:** Annual target = 12,00,000 × 0.09 = 1,08,000. Annual maintenance = 30,000. Total needed = 1,38,000. Monthly = 11,500. **Answer: (c) Rs.11,500.**

### PYQ 2: SSC CGL 2024 — Q.65
**Q:** A sum of Rs.2,380 lent in two parts at 25% and 20% p.a. Total annual income = Rs.500. Money at 25% rate?
(a) 320 (b) 240 (c) 480 (d) 560

**Solution:** Let x at 25%, (2380-x) at 20%. $0.25x + 0.20(2380-x) = 500 \Rightarrow 0.05x = 500 - 476 = 24 \Rightarrow x = 480$. **Answer: (c) Rs.480.**

### PYQ 3: IBPS PO 2023 — Q on Population
**Q:** Village pop 12,000 after 20% died, 30% of remaining left. Initial pop?
(a) 21000 (b) 21428 (c) 30428 (d) 21500

**Solution:** Pop after 20% died = 0.8P. After 30% left = 0.7 × 0.8P = 0.56P = 12,000. P = 12,000/0.56 = 21,428.57. **Answer: (b) 21,428.**

### PYQ 4: SSC CGL 2022 — Q.149
**Q:** Cost of raw material ↑ equal % in 2 years from 120 to 145.20. Annual % increase?
(a) 10.5% (b) 10% (c) 11.5% (d) 11%

**Solution:** $145.20 = 120(1 + r/100)^2$. $(1 + r/100)^2 = 1.21$. $1 + r/100 = 1.1$. r = 10%. **Answer: (b) 10%.**

### PYQ 5: SSC CGL 2024 — Q.151
**Q:** Aniruddh invested Rs.15,000 in shares. Rose 15% on day 1, fell 10% on day 2. Current value?
(a) 15450 (b) 15525 (c) 15750 (d) 15500

**Solution:** 15000 × 1.15 × 0.9 = 15000 × 1.035 = 15,525. **Answer: (b) Rs.15,525.**

---

## 6. Comprehensive Practice Set (20 Questions)

### Set A — Foundation (Q1–Q5)

**Q1.** A sum of Rs.5000 at 8% SI for 3 years. Find SI and Amount.
**Solution:** SI = 5000 × 8 × 3/100 = 1200. Amount = 6200. **Answer: SI = ₹1,200, A = ₹6,200.** *Time: 20 sec.*

**Q2.** SI = Rs.800, P = Rs.4000, T = 2 years. Find R.
**Solution:** $R = 800 \times 100 / (4000 \times 2) = 10\%$. **Answer: 10%.** *Time: 30 sec.*

**Q3.** P = Rs.10,000, R = 10% p.a. CI for 3 years. Find CI.
**Solution:** $A = 10000 \times 1.1^3 = 10000 \times 1.331 = 13,310$. CI = 3,310. **Answer: ₹3,310.** *Time: 30 sec.*

**Q4.** A sum doubles itself in 8 years at SI. Find R.
**Solution:** $R = 100/T = 100/8 = 12.5\%$. **Answer: 12.5%.** *Time: 10 sec.*

**Q5.** A sum of Rs.5000 at 10% CI for 2 years. Find Amount.
**Solution:** $A = 5000 \times 1.1^2 = 5000 \times 1.21 = 6050$. **Answer: ₹6,050.** *Time: 20 sec.*

### Set B — Intermediate (Q6–Q13)

**Q6.** P = Rs.10,000, R = 10% p.a. CI for 3 years.
**Solution:** $A = 10000 \times 1.331 = 13,310$. CI = 3,310. **Answer: ₹3,310.**

**Q7.** The difference between CI and SI on Rs.10,000 for 2 years at 10% is:
**Solution:** Diff = $P \times (R/100)^2 = 10000 \times 0.01 = 100$. **Answer: ₹100.** *Time: 10 sec.*

**Q8.** P = Rs.20,000, R = 10% p.a. half-yearly, T = 1 year. CI?
**Solution:** $A = 20000 \times 1.05^2 = 20000 \times 1.1025 = 22,050$. CI = 2,050. **Answer: ₹2,050.** *Time: 45 sec.*

**Q9.** At what rate of SI will Rs.1000 amount to Rs.1500 in 5 years?
**Solution:** SI = 500. $500 = 1000 \times R \times 5/100 \Rightarrow R = 10\%$. **Answer: 10%.** *Time: 20 sec.*

**Q10.** P = Rs.8000, R = 10%, T = 2 years (CI). Difference between CI and SI?
**Solution:** Diff = $8000 \times (10/100)^2 = 8000 \times 0.01 = 80$. **Answer: ₹80.** *Time: 10 sec.*

**Q11.** A sum becomes Rs.4840 in 2 years at 10% CI. Find P.
**Solution:** $P = 4840/1.21 = 4000$. **Answer: ₹4,000.** *Time: 20 sec.*

**Q12.** The CI on Rs.20,000 for 2 years at 10% p.a. is:
**Solution:** $A = 20000 \times 1.21 = 24,200$. CI = 4,200. **Answer: ₹4,200.** *Time: 30 sec.*

**Q13.** The SI on Rs.5000 for 4 years at 5% p.a. is:
**Solution:** SI = 5000 × 5 × 4/100 = 1000. **Answer: ₹1,000.** *Time: 20 sec.*

### Set C — Advanced (Q14–Q18)

**Q14.** A loan of Rs.1,00,000 at 20% CI to be paid in 2 equal annual installments. Each installment?
**Solution:** Installment = $\frac{P(200 + R)}{200} = \frac{100000 \times 220}{200} = 1,10,000$. **Answer: ₹1,10,000.** *Time: 45 sec.*

**Q15.** A sum of money triples itself in 10 years at SI. Find R.
**Solution:** Amount = 3P, SI = 2P. $2P = P \times R \times 10/100 \Rightarrow R = 20\%$. **Answer: 20%.** *Time: 30 sec.*

**Q16.** A sum becomes Rs.2662 in 3 years at 10% CI. Find P.
**Solution:** $P = 2662/1.331 = 2000$. **Answer: ₹2,000.** *Time: 30 sec.*

**Q17.** P = Rs.1,00,000, R = 10% p.a. half-yearly, T = 1.5 years. CI?
**Solution:** Periods = 3. $A = 100000 \times 1.05^3 = 100000 \times 1.157625 = 1,15,762.50$. CI = 15,762.50. **Answer: ₹15,762.50.** *Time: 60 sec.*

**Q18.** A sum becomes 4 times in 12 years at SI. Find R.
**Solution:** SI = 3P. $3P = P \times R \times 12/100 \Rightarrow R = 25\%$. **Answer: 25%.** *Time: 30 sec.*

### Set D — Challenge (Q19–Q20)

**Q19.** A sum of Rs.10,000 at 10% CI for 2 years. If interest is paid half-yearly, find CI.
**Solution:** $A = 10000 \times 1.05^4 = 10000 \times 1.2155 = 12,155$. CI = 2,155. **Answer: ₹2,155.** *Time: 60 sec.*

**Q20.** The CI on Rs.16,000 for 1.5 years at 20% p.a. compounded half-yearly is:
**Solution:** Periods = 3. $A = 16000 \times 1.1^3 = 16000 \times 1.331 = 21,296$. CI = 5,296. **Answer: ₹5,296.** *Time: 60 sec.*

---

## 7. Chapter Summary & Revision Card

### 7.1 Formula Table

| Formula | Application |
|---------|-------------|
| $\text{SI} = PRT/100$ | Simple interest |
| $A = P(1 + RT/100)$ | SI amount |
| $A = P(1 + R/100)^T$ | CI amount (annual) |
| $A = P(1 + R/200)^{2T}$ | CI amount (half-yearly) |
| $\text{Diff}_{2yr} = P(R/100)^2$ | CI - SI for 2 yrs |
| $\text{Installment}_2 = P(200+R)/200$ | 2-installment at SI |
| $\text{Pop}_n = P(1+r/100)^n$ | Population/depreciation |

### 7.2 Top 5 Shortcuts

1. **$P \times RT/100$ for SI** — fastest mental math.
2. **$P \times (R/100)^2$ for 2-year CI-SI difference** — direct formula.
3. **Effective rate for half-yearly** — $(1 + R/200)^2 - 1$.
4. **Installment shortcut for 2 yrs** — $P(200+R)/200$.
5. **Population = CI directly** — same formula with $\pm$ sign.

### 7.3 5 Common Mistakes

1. **Confusing R for SI vs CI** — same R, but effect is different.
2. **Half-yearly uses R/200, not R/2** — must divide by 2.
3. **CI-SI difference for 3 years is NOT $P(R/100)^2$** — includes $(3 + R/100)$ factor.
4. **Time in years only** — for half-yearly, time is in half-years.
5. **"Doubles in n years"** — use $(2)^{1/n} - 1$ for CI, $100/n$ for SI.

### 7.4 Decision Rules

| If You See... | Use... |
|---------------|--------|
| "SI for T years" | $PRT/100$ |
| "CI annually for T years" | $P(1+R/100)^T - P$ |
| "CI - SI for 2 years" | $P(R/100)^2$ |
| "Half-yearly compounding" | $P(1 + R/200)^{2T}$ |
| "Doubles in n years SI" | $R = 100/n$ |
| "Doubles in n years CI" | $R = 100(2^{1/n} - 1)$ |
| "Equal installments 2 yrs" | $P(200+R)/200$ |

---
