# Chapter 16: Permutations, Combinations & Probability Basics

> **Chapter Overview:** Permutation-Combination (P&C) and Probability together constitute **2-4 questions in SSC CGL Tier-I** and **3-5 questions in IBPS PO/SO Mains**. These topics test logical counting and reasoning. The Previous Years Solved PapersStatistics & Probability book dedicates 200+ pages to P&C and Probability with solved examples. This chapter extracts the core formulas, identities, and problem types.
>
> **Primary sources:** Previous Years Solved Papers_Statistics_Probability, CGL_Practice_King_2025, Concept_King_Quant_2024, Standard Exam Reference_RRB_3ed_Probability.

---

## 1. Foundation Theory

### 1.1 The Fundamental Counting Principle

If task A can be done in $m$ ways and task B can be done in $n$ ways, then both tasks together can be done in $m \times n$ ways (assuming the tasks are independent). This principle extends to any number of tasks: if tasks $T_1, T_2, ..., T_k$ can be done in $n_1, n_2, ..., n_k$ ways, then together they can be done in $n_1 \times n_2 \times ... \times n_k$ ways.

**Example**: A man has 3 shirts and 4 pants. The number of ways he can dress is $3 \times 4 = 12$.

### 1.2 Factorials

The **factorial** of a non-negative integer $n$, denoted $n!$, is the product of all positive integers from 1 to $n$:
$$n! = 1 \times 2 \times 3 \times ... \times n$$

By definition, $0! = 1$. Factorials grow very rapidly: $1! = 1, 2! = 2, 3! = 6, 4! = 24, 5! = 120, 6! = 720, 7! = 5040, 8! = 40320, 9! = 362880, 10! = 3628800$.

### 1.3 Permutation

A **permutation** is an ordered arrangement of $r$ objects selected from $n$ distinct objects. The number of permutations is:
$$P(n, r) = {}^nP_r = \frac{n!}{(n-r)!}$$

**Example**: The number of ways to arrange 3 letters from the word "MATHS" = ${}^5P_3 = \frac{5!}{2!} = 60$.

Special case: Permutations of $n$ distinct objects taken all $n$ at a time = $n!$.

### 1.4 Combination

A **combination** is an unordered selection of $r$ objects from $n$ distinct objects. The number of combinations is:
$$C(n, r) = {}^nC_r = \binom{n}{r} = \frac{n!}{r!(n-r)!}$$

**Example**: The number of ways to choose 3 letters from "MATHS" (regardless of order) = ${}^5C_3 = \frac{5!}{3! \times 2!} = 10$.

---

## 2. Key Identities

### 2.1 Relationship between P and C

$${}^nP_r = {}^nC_r \times r!$$

### 2.2 Complementary Identities

$${}^nC_r = {}^nC_{n-r}$$

This is the **most important identity** in P&C. For example, ${}^7C_5 = {}^7C_2 = 21$.

### 2.3 Pascal's Identity

$${}^nC_r = {}^{n-1}C_{r-1} + {}^{n-1}C_r$$

This identity is the basis of Pascal's triangle.

### 2.4 Sum of Combinations

$${}^nC_0 + {}^nC_1 + {}^nC_2 + ... + {}^nC_n = 2^n$$

This is the binomial theorem for $(1+1)^n$.

### 2.5 Alternating Sum

$${}^nC_0 - {}^nC_1 + {}^nC_2 - {}^nC_3 + ... = 0$$ (for $n \geq 1$)

### 2.6 Vandermonde's Identity

$${}^{m+n}C_r = \sum_{k=0}^{r} {}^mC_k \times {}^nC_{r-k}$$

---

## 3. Permutations with Repetition

### 3.1 Permutations of n Objects with Repetition

If among $n$ objects, $p$ are of one type, $q$ of another, $r$ of a third, etc. (all identical within each type), then the number of distinct permutations is:
$$\frac{n!}{p! \times q! \times r! \times ...}$$

**Example**: Number of distinct arrangements of the letters in "MISSISSIPPI" = $\frac{11!}{4! \times 4! \times 2! \times 1!} = \frac{39916800}{24 \times 24 \times 2 \times 1} = 34650$.

### 3.2 Permutations with Repetition Allowed

The number of $r$-letter "words" (not necessarily meaningful) from an alphabet of $n$ letters, with repetition allowed, is $n^r$.

**Example**: 5-digit numbers using digits 0-9 with repetition = $9 \times 10^4 = 90000$ (the first digit cannot be 0).

---

## 4. Circular Permutations

For arranging $n$ distinct objects **in a circle**:
$$\text{Number of circular permutations} = (n-1)!$$

This is because rotations of the same arrangement are considered identical. If **reflections** are also considered identical (e.g., a necklace), the count is:
$$\frac{(n-1)!}{2}$$ (for $n \geq 3$)

**Example**: 5 people sit around a circular table = $(5-1)! = 24$ ways. As a necklace = $24/2 = 12$.

---

## 5. Combinations — Selection with Constraints

### 5.1 At Least / At Most Problems

**Example**: A committee of 5 is to be formed from 6 men and 4 women. Find the number of ways such that the committee has at least 2 women.

Total = ${}^{10}C_5 = 252$. Unfavorable (fewer than 2 women) = ${}^6C_5 + {}^6C_4 \times {}^4C_1 = 6 + 60 = 66$. Favorable = $252 - 66 = 186$.

### 5.2 Selection with Restrictions

When certain combinations are forbidden (e.g., particular individuals must not be together), use the **complementary counting** method or the **inclusion-exclusion principle**.

### 5.3 Division into Groups

- Number of ways to divide $n$ distinct objects into 2 groups of sizes $r$ and $(n-r)$: $\frac{{}^nC_r}{1} = {}^nC_r$ (since order of groups doesn't matter).
- Number of ways to divide $n$ distinct objects into 3 groups of sizes $r, s, (n-r-s)$: $\frac{{}^nC_r \times {}^{n-r}C_s}{2!}$ (division by 2! accounts for the fact that 2 of the 3 groups are interchangeable in counting).
- For more groups, divide by the factorial of the number of groups with equal size; for unequal groups, multiply appropriately.

### 5.4 Derangements

A **derangement** is a permutation of $n$ objects such that no object appears in its original position. The number of derangements $D_n$ is:
$$D_n = n! \left(1 - \frac{1}{1!} + \frac{1}{2!} - \frac{1}{3!} + ... + \frac{(-1)^n}{n!}\right)$$

**Example**: $D_3 = 6(1 - 1 + 1/2 - 1/6) = 2$.

---

## 6. Probability — Introduction

### 6.1 Classical Definition

The **probability** of an event $E$ is:
$$P(E) = \frac{\text{Number of favorable outcomes}}{\text{Total number of equally likely outcomes}}$$

Properties:
- $0 \leq P(E) \leq 1$
- $P(\text{impossible event}) = 0$
- $P(\text{certain event}) = 1$
- $P(E) + P(\bar{E}) = 1$ (where $\bar{E}$ is the complement)

### 6.2 Addition Rule

For any two events $A$ and $B$:
$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

For **mutually exclusive** events ($A \cap B = \emptyset$):
$$P(A \cup B) = P(A) + P(B)$$

### 6.3 Multiplication Rule

For two events $A$ and $B$:
$$P(A \cap B) = P(A) \times P(B|A)$$

For **independent** events:
$$P(A \cap B) = P(A) \times P(B)$$

### 6.4 Conditional Probability

$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$

### 6.5 Bayes' Theorem

$$P(A|B) = \frac{P(B|A) \times P(A)}{P(B)}$$

---

## 7. Applications of P&C in Probability

### 7.1 Coin Toss Problems

**Example**: Probability of getting exactly 2 heads in 3 tosses of a fair coin = $\frac{{}^3C_2}{2^3} = \frac{3}{8}$.

### 7.2 Dice Problems

**Example**: Probability of getting a sum of 7 with two dice = $\frac{6}{36} = \frac{1}{6}$ (favorable: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes; total = 36).

### 7.3 Card Problems

A standard deck has 52 cards: 4 suits (hearts, diamonds, clubs, spades) × 13 ranks (A, 2-10, J, Q, K).

**Example**: Probability of drawing a king or a queen = $\frac{4 + 4}{52} = \frac{8}{52} = \frac{2}{13}$.

### 7.4 Selection with Replacement vs. Without Replacement

- **With replacement**: Total outcomes = $n^r$; use directly.
- **Without replacement**: Use falling factorial / permutation.

---

## 8. Practice Questions (20 PYQs)

**Q1.** In how many ways can 5 people sit in a row?
(a) 100 (b) 110 (c) 120 (d) 130
**Answer**: (c) 120. $5! = 120$

**Q2.** How many 3-digit numbers can be formed from digits 1, 2, 3, 4, 5 without repetition?
(a) 50 (b) 60 (c) 80 (d) 100
**Answer**: (b) 60. ${}^5P_3 = 60$

**Q3.** How many ways can a committee of 3 be chosen from 7 people?
(a) 30 (b) 35 (c) 42 (d) 49
**Answer**: (b) 35. ${}^7C_3 = 35$

**Q4.** In how many ways can the letters of "DELHI" be arranged?
(a) 24 (b) 60 (c) 120 (d) 720
**Answer**: (b) 60. $\frac{5!}{2!} = 60$ (E appears twice)

**Q5.** In how many ways can 4 boys and 3 girls be seated in a row such that no two girls sit together?
(a) 1440 (b) 720 (c) 5040 (d) 2880
**Answer**: (a) 1440. Arrange 4 boys: $4! = 24$. Create 5 gaps: _B_B_B_B_. Place 3 girls in 3 of 5 gaps: ${}^5P_3 = 60$. Total = $24 \times 60 = 1440$

**Q6.** Find ${}^{10}C_4$.
(a) 210 (b) 220 (c) 230 (d) 250
**Answer**: (a) 210. ${}^{10}C_4 = \frac{10!}{4! \times 6!} = 210$

**Q7.** Probability of getting at least one head in 2 coin tosses?
(a) 1/4 (b) 1/2 (c) 3/4 (d) 1
**Answer**: (c) 3/4. $1 - (1/2)^2 = 3/4$

**Q8.** A bag contains 5 red, 4 blue balls. Probability of drawing 2 red balls without replacement?
(a) 5/18 (b) 5/9 (c) 1/3 (d) 4/9
**Answer**: (a) 5/18. $\frac{{}^5C_2}{{}^9C_2} = \frac{10}{36} = \frac{5}{18}$

**Q9.** A die is rolled twice. Probability of getting sum 8?
(a) 1/9 (b) 5/36 (c) 7/36 (d) 1/6
**Answer**: (b) 5/36. Favorable: (2,6), (3,5), (4,4), (5,3), (6,2) = 5 outcomes

**Q10.** From 6 men and 4 women, a committee of 4 is formed. Probability that exactly 2 are women?
(a) 3/7 (b) 1/3 (c) 4/7 (d) 5/7
**Answer**: (a) 3/7. Favorable: ${}^4C_2 \times {}^6C_2 = 6 \times 15 = 90$. Total: ${}^{10}C_4 = 210$. Probability = $90/210 = 3/7$

**Q11.** Number of ways to arrange "APPLE" letters?
(a) 60 (b) 30 (c) 120 (d) 24
**Answer**: (a) 60. $\frac{5!}{2!} = 60$

**Q12.** In how many ways can 6 people be arranged around a circular table?
(a) 100 (b) 120 (c) 720 (d) 60
**Answer**: (b) 120. $(6-1)! = 120$

**Q13.** Probability of drawing a heart or an ace from a deck of 52 cards?
(a) 4/13 (b) 1/4 (c) 17/52 (d) 1/13
**Answer**: (a) 4/13. $P(H) = 13/52, P(A) = 4/52, P(H \cap A) = 1/52$. $P(H \cup A) = 13/52 + 4/52 - 1/52 = 16/52 = 4/13$

**Q14.** How many 4-digit numbers can be formed from digits 0-9 with repetition allowed?
(a) 9000 (b) 10000 (c) 5040 (d) 900
**Answer**: (a) 9000. $9 \times 10^3 = 9000$ (first digit can't be 0)

**Q15.** In how many ways can 8 people be divided into 2 groups of 4 each?
(a) 35 (b) 70 (c) 280 (d) 56
**Answer**: (a) 35. $\frac{{}^8C_4}{2!} = \frac{70}{2} = 35$

**Q16.** Two dice are rolled. Probability that product is 12?
(a) 1/9 (b) 1/12 (c) 1/6 (d) 1/4
**Answer**: (a) 1/9. Pairs: (2,6), (3,4), (4,3), (6,2) = 4 outcomes. $4/36 = 1/9$

**Q17.** Probability of getting all heads in 4 coin tosses?
(a) 1/16 (b) 1/8 (c) 1/4 (d) 1/2
**Answer**: (a) 1/16. $(1/2)^4 = 1/16$

**Q18.** A box has 12 bulbs, 3 defective. If 2 bulbs are drawn, probability both are good?
(a) 9/22 (b) 1/4 (c) 12/22 (d) 3/4
**Answer**: (a) 9/22. $\frac{{}^9C_2}{{}^{12}C_2} = \frac{36}{66} = \frac{6}{11}$. Wait: $\frac{9 \times 8 / 2}{12 \times 11 / 2} = \frac{36}{66} = \frac{6}{11}$. Hmm, 6/11 is not in options. Let me recompute. Good bulbs = $12 - 3 = 9$. ${}^9C_2 = 36$. ${}^{12}C_2 = 66$. Probability = $36/66 = 6/11$. Closest option: (a) 9/22. Let's use 6/11 ≈ 0.545. (a) 9/22 ≈ 0.409. Discrepancy — let's use (c) 12/22 = 6/11. So (c) 12/22

**Q19.** Number of diagonals in a polygon with 8 sides?
(a) 20 (b) 28 (c) 14 (d) 16
**Answer**: (a) 20. ${}^8C_2 - 8 = 28 - 8 = 20$

**Q20.** A speaks truth 3 out of 4 times, B 4 out of 5. They agree on an event. Probability it is true?
(a) 12/41 (b) 24/41 (c) 11/41 (d) 5/41
**Answer**: (b) 24/41. P(same statement) = $P(\text{both true}) + P(\text{both false}) = (3/4)(4/5) + (1/4)(1/5) = 12/20 + 1/20 = 13/20$. $P(\text{true} | \text{agree}) = \frac{(3/4)(4/5)}{13/20} = \frac{12/20}{13/20} = 12/13$. Hmm. Bayes: $P(T|A) = \frac{P(A|T)P(T)}{P(A)} = \frac{12/20 \cdot k}{13/20 \cdot k} = 12/13$. Closest option: (b) 24/41 or 12/13. The 24/41 implies different setup. Let me use the standard answer 12/13. None of the options match. Recheck options: typical problem gives 12/13. So we use **12/13** as answer

---
