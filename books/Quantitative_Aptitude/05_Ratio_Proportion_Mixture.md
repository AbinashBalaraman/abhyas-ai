# Chapter 5: Ratio, Proportion & Mixture/Alligation

> **Chapter Overview:** Ratio, Proportion, and Mixture/Alligation form the **mathematical backbone** of Quant. Standard Practice Question Bank dedicates 65 Qs to Ratio & Proportion (Ch.9) and 20 Qs to Mixture & Alligation (Ch.10). This chapter covers simple/compound ratios, partnership, mixtures, and the alligation method.
>
> **Primary sources:** CGL_Practice_King_2025 (Ch.9 R&P = 65 Qs; Ch.10 M&A = 20 Qs), Expert Method Ratio Notes, Expert Method Mixture & Alligation Notes, Previous Years Solved PapersSSC Maths PYQ. Target: 6,000+ words, 5+ types, 20 practice Qs.

---

## 1. Foundation Theory

### 1.1 What is a Ratio?

A **ratio** compares two quantities of the same kind. The ratio of $a$ to $b$ is $a:b$ or $\frac{a}{b}$. Ratios can be expressed as fractions, decimals, or percentages.

**Key Rule:** Ratios are **dimensionless**. $a:b$ can be simplified by dividing by their HCF.

### 1.2 Types of Ratios

For $a:b$:

| Type | Formula | Example |
|------|---------|---------|
| **Inverse ratio** | $b:a$ | $3:5 \to 5:3$ |
| **Duplicate ratio** | $a^2: b^2$ | $3:5 \to 9:25$ |
| **Triplicate ratio** | $a^3: b^3$ | $3:5 \to 27:125$ |
| **Sub-duplicate** | $\sqrt{a}: \sqrt{b}$ | $9:25 \to 3:5$ |
| **Sub-triplicate** | $\sqrt[3]{a}: \sqrt[3]{b}$ | $27:125 \to 3:5$ |
| **Compound ratio** | Product of two ratios | $(a:b) \times (c:d) = ac:bd$ |

### 1.3 Componendo and Dividendo

For $\frac{a}{b} = \frac{c}{d}$:
$$\text{Componendo: } \frac{a+b}{b} = \frac{c+d}{d}$$
$$\text{Dividendo: } \frac{a-b}{b} = \frac{c-d}{d}$$
$$\text{Componendo-Dividendo: } \frac{a+b}{a-b} = \frac{c+d}{c-d}$$

This is one of the most useful tricks in ratio problems.

### 1.4 Proportion

Four quantities $a, b, c, d$ are in proportion if $\frac{a}{b} = \frac{c}{d}$, written as $a:b:: c:d$.

- **Continued proportion:** $a:b = b:c$ (i.e., $b^2 = ac$).
- **Mean proportional:** $b = \sqrt{ac}$.
- **Third proportional:** $c = \frac{b^2}{a}$.

### 1.5 Mixture (Alligation)

The **rule of alligation** gives the ratio in which two or more ingredients at different prices should be mixed to obtain a mixture at a given price.

For two ingredients at prices $C_1$ and $C_2$ mixed to get mean price $C_m$:
$$\frac{\text{Quantity of } C_1}{\text{Quantity of } C_2} = \frac{C_2 - C_m}{C_m - C_1}$$

The cheaper ingredient is mixed in the ratio equal to the **dearer price minus mean price** to the **mean price minus cheaper price**.

### 1.6 Mixture Replacement Problems

When a vessel contains a mixture and some quantity is taken out and replaced with another ingredient, the formula for the quantity remaining after $n$ replacements:
$$Q_n = Q_0 \left(1 - \frac{r}{V}\right)^n$$
where $r$ is the quantity replaced each time, $V$ is the total volume, $Q_0$ is the initial quantity of the ingredient.

---

## 2. Complete Formula Repository

### 2.1 Basic Ratio Formulas

$$\frac{a}{b} = \frac{ka}{kb} = \frac{a/c}{b/c}$$

$$\text{If } a:b = c:d = e:f =..., \text{ then } (a+c+e):(b+d+f) = a:b$$

$$\text{If } a:b = c:d, \text{ then } \frac{a+b}{a-b} = \frac{c+d}{c-d}$$

### 2.2 Proportion Identities

$$a:b = c:d \Leftrightarrow ad = bc$$

$$\text{Continued proportion: } a:b = b:c \Rightarrow b^2 = ac$$

$$\text{Mean proportional of } a, c: b = \sqrt{ac}$$

### 2.3 Alligation Master Formula

For two ingredients at $C_1 < C_2$ mixed to mean $C_m$:
$$\frac{Q_1}{Q_2} = \frac{C_2 - C_m}{C_m - C_1}$$

**Generalized for $n$ ingredients:** Use pairwise alligation or weighted average.

### 2.4 Mixture Replacement

After $n$ replacements of quantity $r$ from total volume $V$:
$$Q_n = Q_0 \left(1 - \frac{r}{V}\right)^n$$

After $n$ replacements where $r = V$ (full replacement):
$$Q_n = Q_0 \left(1 - \frac{1}{V}\right)^n$$

### 2.5 Partnership (Extension of Ratio)

If partners $A, B$ invest $x, y$ for time $t_1, t_2$:
$$\text{Profit share ratio} = (x \cdot t_1): (y \cdot t_2)$$

If investments change over the period, sum the products.

### 2.6 Age Problems (Ratio Application)

For ages, set up ratio at the required time and solve.

If $A$ and $B$ ages are in ratio $a:b$ now, and in $n$ years will be in ratio $c:d$:
$$\frac{A + n}{B + n} = \frac{c}{d}$$

### 2.7 Income-Expenditure-Saving as Ratio

If $I, E, S$ are in ratio $p:q:r$ with $p = q + r$:
- After $I$ changes by $a\%$ and $E$ by $b\%$, recompute and find new ratio.

---

## 3. Speed-Solving Shortcuts & Vedic Methods

### 3.1 The "Multiply to Common Factor" Trick

For ratios $A:B = 2:3$ and $B:C = 4:5$, find $A:B:C$.
- $A:B = 2:3 = 8:12$, $B:C = 4:5 = 12:15$. So $A:B:C = 8:12:15$. **Time: 15 sec.**

### 3.2 The "Sum of Ratio" Trick for Shares

If ratio is $a:b$ and total is $T$:
- $A$'s share = $T \cdot \frac{a}{a+b}$
- $B$'s share = $T \cdot \frac{b}{a+b}$

### 3.3 The Componendo-Dividendo Shortcut

For "If $a:b = c:d$, find $(a+b):(a-b)$":
$$\frac{a+b}{a-b} = \frac{c+d}{c-d}$$

**Example:** *If $a:b = 3:5$, find $(a+b):(a-b)$.*
- $(3+5):(3-5) = 8:(-2) = -4:1$. **Time: 10 sec.**

### 3.4 The Alligation "Cross Subtraction" Method

For mixing two at $C_1, C_2$ to get $C_m$ where $C_1 < C_m < C_2$:

$$C_1 \quad C_2$$
$$\quad \searrow \quad \nearrow$$
$$(C_2 - C_m) \quad (C_m - C_1)$$

Then $Q_1:Q_2 = (C_2 - C_m):(C_m - C_1)$.

**Example (Manoj Q.2):** *30L mixture, acid:water = 2:3. Add water to make 2:5.*
- Acid = 12L, water = 18L. Let $x$L water added. $12:(18+x) = 2:5$. $60 = 36 + 2x$. $x = 12$. **Answer: 12L.** *Time: 45 sec.*

### 3.5 The "Mean Price" Alligation Shortcut

For mixing two qualities at $P_1$ and $P_2$ to get $P_m$ per unit:
- Mix in ratio $(P_2 - P_m):(P_m - P_1)$.

**Example (Manoj style):** *Mix 1 kg of Rs.40 rice and Rs.60 rice to get Rs.50/kg.*
- Ratio = (60-50):(50-40) = 10:10 = 1:1. So 1 kg each. **Time: 15 sec.**

### 3.6 The "Replace and Find" Trick

After $n$ replacements of $r$ from $V$:
$$Q_n = Q_0 \left(1 - \frac{r}{V}\right)^n$$

**Example (CGL PK style):** *Vessel has 40L of milk. Remove 8L and add water. Repeat 3 times. Milk remaining?*
- $Q_3 = 40 \times (1 - 0.2)^3 = 40 \times 0.512 = 20.48L$. **Time: 60 sec.**

### 3.7 The "Three-Container Mix" Trick

For 3 (or more) containers with different ratios, find the **overall ratio** by weighted average.

**Example (Manoj Q.1):** *Containers 1, 2, 3, 4 have milk:water in 5:3, 2:1, 3:2, 7:4. Which has least milk relative to water?*
- Convert to milk fraction: 5/8, 2/3, 3/5, 7/11. 5/8 = 0.625, 2/3 = 0.667, 3/5 = 0.6, 7/11 = 0.636. Least = 3/5 = 0.6 = Third container. **Answer: Third.** *Time: 60 sec.*

### 3.8 The "Income and Expenditure Ratio" Trick

If $I$ and $E$ are in some ratio and $I$ changes by $a\%$ while $E$ by $b\%$, recompute and find new ratio.

### 3.9 The "Componendo Cross-Sum" Trick

For $A:B = a:b$ and $B:C = c:d$, $A:C = ac:bd$.

### 3.10 The "Reverse Ratio" Trick

If $A:B = 3:5$, then $B:A = 5:3$. This is the **inverse ratio** — used in problems where quantities are exchanged.

### 3.11 The "Fraction Conversion" Speed Move

For 3:5 = 0.6, 4:7 ≈ 0.571, etc. Convert ratios to decimals for quick comparison.

### 3.12 The "Partnership Shortcut"

For investment ratio $I_1:I_2$ and time ratio $T_1:T_2$:
$$\text{Profit ratio} = I_1 T_1: I_2 T_2$$

**Example:** *A invests Rs.10,000 for 6 months. B invests Rs.15,000 for 4 months. Profit ratio?*
- $A:B = 60000: 60000 = 1:1$. Equal profits.

### 3.13 The "Sum of Multiple Ratios" Method

For $A:B = 2:3$, $B:C = 4:5$, $C:D = 5:7$. Find $A:B:C:D$.
- LCM of "second" terms: LCM(3, 5, 5) = 15.
- $A:B = 10:15$, $B:C = 12:15$, $C:D = 15:21$. Common $B = 15, C = 15$. $A:B:C:D = 10:15:15:21$. **Time: 30 sec.**

### 3.14 The "Mixture Alligation Direct" Method

For "Mix $x$ kg at $C_1$ and $y$ kg at $C_2$. Mean price?"
- Mean = $\frac{x C_1 + y C_2}{x + y}$.

### 3.15 The "Alligation with Three Ingredients" Method

For 3 ingredients at $C_1, C_2, C_3$ and mean $C_m$:
- First, find ratio of $C_1$ to $C_2$ using $(C_2 - C_m):(C_m - C_1)$.
- Then, mix this "combined" with $C_3$ using same formula.
- The final ratio gives the proportion of all three.

---

## 4. Classification of Question Types

### 4.1 Type 1 — Basic Ratio Simplification

**Example 1:** *Divide Rs.560 in ratio 3:5.*
- $560 \times 3/8 = 210$, $560 \times 5/8 = 350$. **Answer: ₹210, ₹350.**

**Example 2 (CGL PK style):** *If $A:B = 2:3$ and $B:C = 4:5$, find $A:C$.*
- $A:B = 2:3 = 8:12$, $B:C = 4:5 = 12:15$. $A:C = 8:15$. **Answer: 8:15.**

**Example 3:** *If $a:b = 3:4$ and $b:c = 5:6$, find $a:b:c$.*
- LCM(4, 5) = 20. $a:b = 15:20$, $b:c = 20:24$. $a:b:c = 15:20:24$.

### 4.2 Type 2 — Componendo-Dividendo

**Example 1 (CGL PK style):** *If $\frac{x}{y} = \frac{2}{3}$, find $\frac{3x+4y}{3x-4y}$.*
- $(3(2) + 4(3))/(3(2) - 4(3)) = (6+12)/(6-12) = 18/(-6) = -3$.

**Example 2 (Manoj style):** *If $\frac{a}{b} = \frac{c}{d}$, prove $\frac{a+b}{a-b} = \frac{c+d}{c-d}$.*

### 4.3 Type 3 — Income-Expenditure Ratio (P&L in Ratio Form)

**Example 1 (CGL PK style):** *Income and expenditure in ratio 11:10. Saving 1/11 of income. Income ↑22%, expenditure ↑10%. New ratio?*
- Let $I = 1100$, $E = 1000$, $S = 100$. New $I = 1342$, new $E = 1100$, new $S = 242$. Ratio = 1342:1100 = 671:550.

### 4.4 Type 4 — Alligation (Mean Price)

**Example 1 (Manoj Q.5):** *240 cc mixture water:glycerin = 1:3. Add water to make 2:3. Water added?*
- Water = 60, glycerin = 180. New water = 60+x. $60+x: 180 = 2:3$. $180 + 3x = 360$. $x = 60$. **Answer: 60 cc.**

**Example 2 (Manoj Q.3):** *200g alloy zinc:copper = 5:3. Add copper to make 3:5. Copper added?*
- Zinc = 125, copper = 75. Let $x$ copper added. $125: 75+x = 3:5$. $625 = 225 + 3x$. $x = 400/3$ ≈ 133.3. **Answer: 400/3 g.**

### 4.5 Type 5 — Mixture Replacement

**Example 1 (CGL PK style):** *Vessel 40L milk. Remove 10L, add water. After 2 operations, milk remaining?*
- $Q_2 = 40 \times (1 - 10/40)^2 = 40 \times 0.5625 = 22.5L$. **Time: 60 sec.**

**Example 2 (CGL PK style):** *Container has 60L wine. 12L removed, water added. Repeat 3 times. Wine remaining?*
- $Q_3 = 60 \times (1 - 0.2)^3 = 60 \times 0.512 = 30.72L$. **Time: 60 sec.**

### 4.6 Type 6 — Age Problems (Ratio)

**Example (CGL PK style):** *Ratio of A's age to B's age = 4:5. After 5 years, ratio = 5:6. Present ages?*
- $A = 4k, B = 5k$. $(4k+5)/(5k+5) = 5/6$. $24k + 30 = 25k + 25$. $k = 5$. A = 20, B = 25.

### 4.7 Type 7 — Partnership

**Example (CGL PK Q.1):** *A invests Rs.10,000 for 6 months. B invests Rs.15,000 for 4 months. C invests Rs.20,000 for 2 months. Total profit Rs.27,000. Each?*
- $A:B:C = (10,000 \times 6): (15,000 \times 4): (20,000 \times 2) = 60,000: 60,000: 40,000 = 3:3:2$. Total = 8.
- A = 27000 × 3/8 = 10,125. B = 10,125. C = 6,750.

### 4.8 Type 8 — "In What Ratio Should Two be Mixed"

**Example (CGL PK style):** *Mix water and milk priced at Rs.20/L and Rs.50/L to get mixture at Rs.32/L. Ratio?*
- Alligation: $20 \to 50$, mean = 32. Ratio = (50-32):(32-20) = 18:12 = 3:2. **Time: 30 sec.**

---

## 5. Previous Year Questions Analysis (5 PYQs)

### PYQ 1: SSC CGL 2024 (13/09/2025 Shift 1) — Q.67
**Q:** Construction project budget allocated to land, materials, labor in 4:3:3. Land ↑8%, materials ↑12%, labor ↓15%. Total % change?
(a) 1.5% increase (b) 2.3% decrease (c) 2.3% increase (d) 1.5% decrease

**Solution:** Initial: 4+3+3 = 10. New = 4×1.08 + 3×1.12 + 3×0.85 = 4.32 + 3.36 + 2.55 = 10.23. Increase = 2.3%. **Answer: (c) 2.3% increase.**

### PYQ 2: SSC CGL 2024 — Q.69
**Q:** Baker ordered 10 kg premium + standard flour. Premium = 2x standard. Quantities swapped, total cost ↓ 20%. Find original ratio.
(a) 2:1 (b) 5:2 (c) 3:4 (d) 4:5

**Solution:** Original cost: 10P + xS = 20S + 10S = 30S (if P = 2S). After swap: xP + 10S = 2xS + 10S = 2xS + 10S. So $(2xS + 10S) = 0.8 \times 30S = 24S$. $2xS = 14S$, $x = 7$. So 10 kg premium + 7 kg standard. Ratio = 10:7. **Answer: 10:7** (none of the options — likely 2:1, 5:2, 3:4, 4:5 refers to standard:premium = 7:10 ≈ 7:10). Let me re-interpret: if standard = S, premium = 2S. Original: 10(2S) + xS = 20S + xS. New: x(2S) + 10S = 2xS + 10S. After swap, cost ↓ 20%, so new = 0.8 × original. $2xS + 10S = 0.8(20S + xS) = 16S + 0.8xS$. $1.2xS = 6S$. $x = 5$. Ratio premium:standard = 10:5 = 2:1. **Answer: (a) 2:1.** *Time: 60 sec.*

### PYQ 3: IBPS PO 2023 — Q.74
**Q:** Salaries B, C, D, E in ratio 2:3:4:5. Increased 20%, 30%, 40%, 50%. D's new salary = Rs.560. Sum of original B, C, D, E?
(a) 1400 (b) 1560 (c) 1820 (d) 1260

**Solution:** D's new = $4k \times 1.4 = 5.6k = 560$. $k = 100$. Sum = $(2+3+4+5)k = 14 \times 100 = 1400$. **Answer: (a) Rs.1400.**

### PYQ 4: SSC CGL 2023 — Q.85
**Q:** Q.108 (Expert Method): Alloy Copper:Zinc = 5:2. 1.25 kg zinc added to 17.5 kg alloy. New ratio?
(a) 1:1 (b) 5:2 (c) 5:3 (d) 2:1

**Solution:** Alloy: 17.5 kg. Copper = 12.5 kg, Zinc = 5 kg. New Zinc = 5 + 1.25 = 6.25. New ratio = 12.5: 6.25 = 2:1. **Answer: (d) 2:1.**

### PYQ 5: SSC CGL Mains 2024 — Q.86
**Q:** Vessel 32L acid:water = 5:3. Remove 12L, add 7L water. New ratio?
(a) 8:11 (b) 4:9 (c) 4:7 (d) 5:6

**Solution:** Acid = 20L, water = 12L. Remove 12L mixture: acid = 20×12/32 = 7.5L, water = 4.5L. New acid = 20 - 7.5 = 12.5L, water = 12 - 4.5 + 7 = 14.5L. Ratio = 12.5:14.5 = 25:29. **Answer: 25:29** (none match). Book says (a) 8:11. Hmm. Let me recheck: 32L total, acid:water = 5:3, so acid = 20L, water = 12L. Remove 12L (which has acid:water = 5:3). So removed acid = 7.5L, water = 4.5L. Remaining: acid = 12.5L, water = 7.5L. Add 7L water: water = 14.5L. New ratio = 12.5:14.5 = 25:29. Not matching. The book's answer (a) 8:11 would mean 16:22. Maybe interpretation: remove 12L, replace with 7L water. Acid remains same as before removal. Then new water = 7+ water removed = 7+4.5 = 11.5. New acid = 20 (since 12L mixture was removed but acid fraction changes). Hmm, that's not right either. Try: replace 12L with 7L water. Acid = 20 (same), water = 7L new. Ratio = 20:7. Not 8:11. Book's answer of 8:11 likely uses different reading.

---

## 6. Comprehensive Practice Set (20 Questions)

### Set A — Foundation (Q1–Q5)

**Q1.** Divide Rs.1,200 in ratio 3:5.
**Solution:** $1200 \times 3/8 = 450$, $1200 \times 5/8 = 750$. **Answer: Rs.450, Rs.750.** *Time: 15 sec.*

**Q2.** If $A:B = 2:3$ and $B:C = 4:5$, find $A:B:C$.
**Solution:** $A:B = 8:12$, $B:C = 12:15$. $A:B:C = 8:12:15$. **Answer: 8:12:15.** *Time: 15 sec.*

**Q3.** If $a:b = 3:4$, find $(a+b):(a-b)$.
**Solution:** $(3+4):(3-4) = 7:(-1) = -7:1$. **Answer: -7:1.** *Time: 10 sec.*

**Q4.** In 30L mixture, milk:water = 2:3. Add water to make 2:5. Water added?
**Solution:** Milk = 12L. New: $12:(18+x) = 2:5$. $60 = 36 + 2x$. $x = 12$. **Answer: 12L.** *Time: 45 sec.*

**Q5.** 240 cc mixture water:glycerin = 1:3. Add water to make 2:3. Water added?
**Solution:** Water = 60. $60+x: 180 = 2:3$. $180+3x = 360$. $x = 60$. **Answer: 60 cc.** *Time: 45 sec.*

### Set B — Intermediate (Q6–Q13)

**Q6.** Mixture 25L, acid:water = 4:1. Add 3L water. New ratio?
**Solution:** Acid = 20, water = 5. New water = 8. Ratio = 20:8 = 5:2. **Answer: 5:2.** *Time: 30 sec.*

**Q7.** 30L milk. Remove 6L, add water. After 2 operations, milk?
**Solution:** $Q_2 = 30 \times (0.8)^2 = 30 \times 0.64 = 19.2L$. **Answer: 19.2L.** *Time: 60 sec.**

**Q8.** Three ingredients at Rs.20, Rs.30, Rs.50. Mixed in equal quantities. Mean price?
**Solution:** $(20+30+50)/3 = 33.33$. **Answer: Rs.33.33/kg.**

**Q9.** Mix water and milk (Rs.20, Rs.50) to get Rs.32. Ratio?
**Solution:** Alligation: (50-32):(32-20) = 18:12 = 3:2. **Answer: 3:2.** *Time: 30 sec.*

**Q10.** A invests Rs.10,000 for 6 months, B Rs.15,000 for 4 months. Profit ratio?
**Solution:** A:B = 60000:60000 = 1:1. **Answer: 1:1.** *Time: 30 sec.*

**Q11.** A:B:C = 2:3:4. Sum = 18,000. Each share?
**Solution:** Total parts = 9. A = 4,000, B = 6,000, C = 8,000. **Answer: 4000, 6000, 8000.** *Time: 30 sec.*

**Q12.** 4 containers, milk:water = 5:3, 2:1, 3:2, 7:4. Which has least milk?
**Solution:** Convert to fraction: 0.625, 0.667, 0.6, 0.636. Least = 3/5 = 0.6 = 3rd. **Answer: Third.** *Time: 60 sec.*

**Q13.** 17.5 kg alloy Cu:Zn = 5:2. Add 1.25 kg Zn. New ratio?
**Solution:** Cu = 12.5, Zn = 5. New Zn = 6.25. New ratio = 12.5:6.25 = 2:1. **Answer: 2:1.** *Time: 45 sec.*

### Set C — Advanced (Q14–Q18)

**Q14.** A's age: B's age = 4:5. After 5 years, 5:6. Present ages?
**Solution:** $4k+5: 5k+5 = 5:6$. $24k+30 = 25k+25$. $k = 5$. A=20, B=25. **Answer: 20, 25.** *Time: 60 sec.*

**Q15.** 40L mixture, replaced 8L with water twice. Final milk quantity?
**Solution:** $Q_2 = 40 \times (0.8)^2 = 25.6L$. **Answer: 25.6L.** *Time: 60 sec.*

**Q16.** 60L wine, 10L removed, water added, twice. Wine remaining?
**Solution:** $Q_2 = 60 \times (5/6)^2 = 60 \times 25/36 = 41.67L$. **Answer: 41.67L.**

**Q17.** 3 ingredients at Rs.40, Rs.50, Rs.60. Mix to get mean Rs.50. Equal ratio of 1st two, then with 3rd?
**Solution:** Mean of 40, 50 = 45. Mix 1:1 of these. Then alligation with 60 to get 50: ratio = (60-50):(50-45) = 10:5 = 2:1. So mix 1:1 mixture with 3rd in 2:1 → 1:1:1. **Answer: 1:1:1.** *Time: 90 sec.*

**Q18.** Salaries in ratio 2:3:4:5. Increased 20%, 30%, 40%, 50%. D's new = 560. Sum of original?
**Solution:** D_new = $4k \times 1.4 = 5.6k = 560$. $k = 100$. Sum = 14k = 1400. **Answer: Rs.1,400.** *Time: 60 sec.*

### Set D — Challenge (Q19–Q20)

**Q19.** Construction budget 4:3:3 for land:material:labor. Changes 8%, 12%, -15%. Total change?
**Solution:** Initial 10. New = 4.32+3.36+2.55 = 10.23. +2.3%. **Answer: 2.3% increase.** *Time: 60 sec.*

**Q20.** 32L vessel acid:water = 5:3. Remove 12L, add 7L water. New ratio?
**Solution:** Acid = 20, water = 12. Remove 12L (3/8 = acid, 9/24 = water → 7.5L acid, 4.5L water). New acid = 12.5, water = 7.5 + 7 = 14.5. Ratio = 25:29. **Answer: 25:29** (book says 8:11 due to different interpretation). *Time: 90 sec.*

---

## 7. Chapter Summary & Revision Card

### 7.1 Formula Table

| Concept | Formula |
|---------|---------|
| Ratio simplification | Divide by HCF |
| Compound ratio | $(a:b)(c:d) = ac:bd$ |
| Componendo | $(a+b)/b = (c+d)/d$ |
| Dividendo | $(a-b)/b = (c-d)/d$ |
| Alligation | $(C_2 - C_m): (C_m - C_1)$ |
| Replacement | $Q_n = Q_0(1 - r/V)^n$ |
| Partnership | $I_1 T_1: I_2 T_2$ |

### 7.2 Top 5 Shortcuts

1. **Componendo-Dividendo** for fraction-to-ratio conversion.
2. **Alligation cross-subtraction** for mean price.
3. **Replacement formula** for successive dilution.
4. **Multiply to common factor** for chaining ratios.
5. **Sum of ratio × share** for direct division.

### 7.3 5 Common Mistakes

1. **Compound ratio uses multiplication** — easy to confuse with addition.
2. **Alligation means means means** — quantity ratio = price diff, not prices themselves.
3. **Replacement assumes UNIFORM mixture** before each removal.
4. **Componendo ≠ Dividendo** — different formulas.
5. **Partnership time is in months** if monthly investment given.

### 7.4 Decision Rules

| If You See... | Use... |
|---------------|--------|
| "Mix X and Y to get Z" | Alligation: $(Y-Z):(Z-X)$ |
| "Replace and find" | $Q_n = Q_0(1 - r/V)^n$ |
| "A:B and B:C, find A:C" | Multiply to common B |
| "Profit share of partners" | Investment × Time |
| "Mean proportional of a, c" | $\sqrt{ac}$ |

---
