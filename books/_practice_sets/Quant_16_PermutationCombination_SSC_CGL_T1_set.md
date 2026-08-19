# SSC CGL Tier 1 — Permutations, Combinations & Probability

> **Exam:** SSC CGL Tier 1 | **Time:** 15 min (60 sec/Q) | **Total:** 15 Qs
> **Difficulty:** 5 Easy, 7 Medium, 3 Hard | **Trap Qs:** 2
> **Source basis:** Ch. 16 P&C and Probability Basics

---

## Q1. Basic Permutation (Easy)
In how many ways can 5 people sit in a row?
(a) 100  (b) 110  (c) 120  (d) 130

**Answer:** (c) 120
**Solution:** $5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$
**Shortcut:** Just compute $5!$ directly.
**Common Mistake:** Computing $5^5 = 3125$ (power, not factorial).
**Time target:** 20 sec

---

## Q2. Permutation with Selection (Easy)
How many 3-digit numbers can be formed from digits 1, 2, 3, 4, 5 without repetition?
(a) 50  (b) 60  (c) 80  (d) 100

**Answer:** (b) 60
**Solution:** ${}^5P_3 = \frac{5!}{2!} = \frac{120}{2} = 60$
**Shortcut:** $5 \times 4 \times 3 = 60$.
**Common Mistake:** Using combination ${}^5C_3 = 10$ (order doesn't matter in C).
**Time target:** 30 sec

---

## Q3. Combination (Easy)
How many ways can a committee of 3 be chosen from 7 people?
(a) 30  (b) 35  (c) 42  (d) 49

**Answer:** (b) 35
**Solution:** ${}^7C_3 = \frac{7!}{3! \cdot 4!} = \frac{7 \times 6 \times 5}{3 \times 2 \times 1} = 35$
**Shortcut:** $\frac{7 \times 6 \times 5}{6} = 35$.
**Common Mistake:** Using permutation (order doesn't matter in committees).
**Time target:** 30 sec

---

## Q4. Word Arrangement (Easy — Trap)
In how many ways can the letters of "DELHI" be arranged?
(a) 24  (b) 60  (c) 120  (d) 720

**Answer:** (b) 60
**Solution:** $\frac{5!}{2!} = \frac{120}{2} = 60$ (E appears twice).
**Shortcut:** Divide by factorial of repeated letter count.
**Common Mistake:** Using $5! = 120$ (not accounting for repeated E).
**Time target:** 30 sec

---

## Q5. Seating Constraint (Medium)
4 boys and 3 girls in a row such that no two girls sit together. Number of ways?
(a) 1440  (b) 720  (c) 5040  (d) 2880

**Answer:** (a) 1440
**Solution:** Arrange 4 boys: $4! = 24$. Create 5 gaps: _B_B_B_B_. Place 3 girls in 3 of 5 gaps: ${}^5P_3 = 60$. Total = $24 \times 60 = 1440$.
**Shortcut:** "Gap method" — arrange the boys, then place girls in gaps.
**Common Mistake:** Forgetting to create 5 gaps (n+1) not 4.
**Time target:** 90 sec

---

## Q6. Combination Value (Medium)
Find ${}^{10}C_4$.
(a) 210  (b) 220  (c) 230  (d) 250

**Answer:** (a) 210
**Solution:** ${}^{10}C_4 = \frac{10!}{4! \times 6!} = \frac{10 \times 9 \times 8 \times 7}{24} = 210$
**Shortcut:** Use ${}^nC_r = {}^nC_{n-r}$. ${}^{10}C_4 = {}^{10}C_6$.
**Common Mistake:** Computing $10 \times 9 \times 8 \times 7$ without dividing by $4!$.
**Time target:** 60 sec

---

## Q7. Probability — Coin Toss (Medium)
Probability of getting at least one head in 2 coin tosses?
(a) 1/4  (b) 1/2  (c) 3/4  (d) 1

**Answer:** (c) 3/4
**Solution:** $P(\text{at least 1 H}) = 1 - P(\text{no H}) = 1 - (1/2)^2 = 1 - 1/4 = 3/4$
**Shortcut:** "At least one" → use complement: $1 - P(\text{none})$.
**Common Mistake:** Counting only the cases with exactly 1 head (= 1/2).
**Time target:** 30 sec

---

## Q8. Probability — Bag (Medium)
A bag contains 5 red, 4 blue balls. Probability of drawing 2 red balls without replacement?
(a) 5/18  (b) 5/9  (c) 1/3  (d) 4/9

**Answer:** (a) 5/18
**Solution:** $\frac{{}^5C_2}{{}^9C_2} = \frac{10}{36} = \frac{5}{18}$
**Shortcut:** Use combinations for "without replacement" problems.
**Common Mistake:** Computing $(5/9) \times (4/8) = 20/72 = 5/18$ (correct, but use combinations for clarity).
**Time target:** 60 sec

---

## Q9. Probability — Dice Sum (Medium)
A die is rolled twice. Probability of getting sum 8?
(a) 1/9  (b) 5/36  (c) 7/36  (d) 1/6

**Answer:** (b) 5/36
**Solution:** Favorable: (2,6), (3,5), (4,4), (5,3), (6,2) = 5 outcomes. $\frac{5}{36}$.
**Shortcut:** List all pairs that sum to 8.
**Common Mistake:** Missing (4,4) which is one outcome.
**Time target:** 60 sec

---

## Q10. Committee Selection (Medium)
From 6 men and 4 women, a committee of 4 is formed. Probability that exactly 2 are women?
(a) 3/7  (b) 1/3  (c) 4/7  (d) 5/7

**Answer:** (a) 3/7
**Solution:** Favorable: ${}^4C_2 \times {}^6C_2 = 6 \times 15 = 90$. Total: ${}^{10}C_4 = 210$. Probability = $90/210 = 3/7$.
**Shortcut:** Use combinations to count both.
**Common Mistake:** Using permutations (order doesn't matter in selection).
**Time target:** 90 sec

---

## Q11. Word Arrangement (Medium)
Number of ways to arrange "APPLE" letters?
(a) 60  (b) 30  (c) 120  (d) 24

**Answer:** (a) 60
**Solution:** $\frac{5!}{2!} = 60$ (P appears twice).
**Shortcut:** Identify repeated letters, divide by their factorials.
**Common Mistake:** Not accounting for repeated P.
**Time target:** 30 sec

---

## Q12. Circular Permutation (Medium)
In how many ways can 6 people be arranged around a circular table?
(a) 100  (b) 120  (c) 720  (d) 60

**Answer:** (b) 120
**Solution:** $(6-1)! = 5! = 120$
**Shortcut:** Circular = $(n-1)!$ not $n!$.
**Common Mistake:** Using $6! = 720$ (linear, not circular).
**Time target:** 30 sec

---

## Q13. Cards — Union (Medium)
Probability of drawing a heart or an ace from a deck of 52 cards?
(a) 4/13  (b) 1/4  (c) 17/52  (d) 1/13

**Answer:** (a) 4/13
**Solution:** $P(H) = 13/52, P(A) = 4/52, P(H \cap A) = 1/52$. $P(H \cup A) = 13/52 + 4/52 - 1/52 = 16/52 = 4/13$.
**Shortcut:** Inclusion-exclusion: add, then subtract intersection.
**Common Mistake:** Adding without subtracting the common ace of hearts.
**Time target:** 60 sec

---

## Q14. 4-Digit Numbers (Hard)
How many 4-digit numbers can be formed from digits 0-9 with repetition allowed?
(a) 9000  (b) 10000  (c) 5040  (d) 900

**Answer:** (a) 9000
**Solution:** First digit: 1-9 (9 choices), other 3: 10 each. $9 \times 10^3 = 9000$.
**Shortcut:** First digit cannot be 0.
**Common Mistake:** Using $10^4 = 10000$ (includes 0000 which is not 4-digit).
**Time target:** 45 sec

---

## Q15. Group Division (Hard)
In how many ways can 8 people be divided into 2 groups of 4 each?
(a) 35  (b) 70  (c) 280  (d) 56

**Answer:** (a) 35
**Solution:** $\frac{{}^8C_4}{2!} = \frac{70}{2} = 35$ (divide by 2 because the two groups are interchangeable).
**Shortcut:** Divide by $k!$ for $k$ equal groups.
**Common Mistake:** Using ${}^8C_4 = 70$ (double-counts since groups are interchangeable).
**Time target:** 90 sec

---

## Set Summary
- **Total Questions:** 15 | **Time:** 15 min
- **Difficulty:** 5 Easy (Q1–Q4, Q8), 7 Medium (Q6, Q7, Q9–Q14), 3 Hard (Q5, Q15)
- **Key concepts tested:** Basic permutations (Q1, Q2), combinations (Q3, Q6), word arrangements (Q4, Q11), circular permutation (Q12), probability (Q7–Q10, Q13), 4-digit numbers (Q14), group division (Q15).
- **Target accuracy:** 80% (12/15) for safe attempt.
- **Chapter Reference:** ch 16, p. 1-200 — Permutation, Combination, Probability Basics.
