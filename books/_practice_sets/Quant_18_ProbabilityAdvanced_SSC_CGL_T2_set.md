# SSC CGL Tier 2 — Probability Advanced

> **Exam:** SSC CGL Tier 2 | **Time:** 18 min (75 sec/Q) | **Total:** 14 Qs
> **Difficulty:** 3 Easy, 7 Medium, 4 Hard | **Trap Qs:** 2
> **Source basis:** Ch. 18 Probability Advanced

---

## Q1. Binomial Mean (Easy)
If $X \sim B(10, 0.3)$, find E(X).
(a) 3  (b) 0.3  (c) 2.1  (d) 7

**Answer:** (a) 3
**Solution:** $np = 10 \times 0.3 = 3$
**Shortcut:** For binomial: $E = np$.
**Common Mistake:** Confusing with $n(1-p)$.
**Time target:** 30 sec

---

## Q2. Discrete EV (Easy)
X takes values 1, 2, 3 with probabilities 0.2, 0.5, 0.3. E(X)?
(a) 1.8  (b) 2.0  (c) 2.1  (d) 2.5

**Answer:** (c) 2.1
**Solution:** $1(0.2) + 2(0.5) + 3(0.3) = 0.2 + 1.0 + 0.9 = 2.1$
**Shortcut:** $\sum x \cdot p(x)$.
**Common Mistake:** Adding without weights.
**Time target:** 60 sec

---

## Q3. Bayes' Hospital (Medium)
60% male, 40% female. 50% male, 30% female smokers. P(smoker is male)?
(a) 5/7  (b) 4/7  (c) 3/7  (d) 6/7

**Answer:** (a) 5/7
**Solution:** $P(M|S) = \frac{0.6 \times 0.5}{0.6 \times 0.5 + 0.4 \times 0.3} = \frac{0.30}{0.42} = 5/7$
**Shortcut:** Bayes with two groups.
**Common Mistake:** Forgetting denominator.
**Time target:** 120 sec

---

## Q4. Biased Coin (Medium)
P(H) = 2/3. Coin tossed 3 times. P(exactly 2 heads)?
(a) 4/9  (b) 2/9  (c) 8/27  (d) 4/27

**Answer:** (a) 4/9
**Solution:** $\binom{3}{2} (2/3)^2 (1/3)^1 = 3 \times 4/9 \times 1/3 = 4/9$
**Shortcut:** Binomial formula.
**Common Mistake:** Using P = 1/2.
**Time target:** 60 sec

---

## Q5. White Balls (Medium)
Bag: 6 white, 4 black. 3 balls drawn. P(all white)?
(a) 1/6  (b) 1/5  (c) 1/4  (d) 1/3

**Answer:** (a) 1/6
**Solution:** $\frac{{}^6C_3}{{}^{10}C_3} = \frac{20}{120} = 1/6$
**Shortcut:** Combinations.
**Common Mistake:** Using permutations.
**Time target:** 60 sec

---

## Q6. Family Problem (Hard)
Family with 2 children. P(both girls | first is girl)?
(a) 1/2  (b) 1/3  (c) 1/4  (d) 2/3

**Answer:** (a) 1/2
**Solution:** Given first is girl, second is independent → P(girl) = 1/2.
**Shortcut:** Conditional independence.
**Common Mistake:** Using 1/3 (Bayes' fallacy).
**Time target:** 90 sec

---

## Q7. Coin Toss Game (Hard)
P(H) = p, coin tossed until H or 3 T's. P(game ends in ≤ 2 tosses)?
(a) $p + (1-p)p$  (b) $p^2$  (c) $1 - (1-p)^3$  (d) $p^3$

**Answer:** (a) $p + (1-p)p$
**Solution:** Ends in 1 toss: p. Ends in 2 tosses: (1-p)p. Total = $p + (1-p)p = p(2-p)$.
**Shortcut:** Add disjoint cases.
**Common Mistake:** Forgetting second case.
**Time target:** 90 sec

---

## Q8. Geometric Distribution (Hard)
P(success) = 0.2. Find P(first success on 3rd trial).
(a) 0.128  (b) 0.08  (c) 0.04  (d) 0.2

**Answer:** (a) 0.128
**Solution:** $(0.8)^2 \times 0.2 = 0.64 \times 0.2 = 0.128$
**Shortcut:** Geometric: $(1-p)^{k-1} p$.
**Common Mistake:** Forgetting the (1-p)² factor.
**Time target:** 90 sec

---

## Q9. Variance Property (Medium)
Var(X) = 9. Find Var(2X + 3).
(a) 9  (b) 18  (c) 36  (d) 21

**Answer:** (c) 36
**Solution:** $a^2 \text{Var}(X) = 4 \times 9 = 36$. Constant doesn't affect variance.
**Shortcut:** $\text{Var}(aX+b) = a^2 \text{Var}(X)$.
**Common Mistake:** Just using Var(X).
**Time target:** 60 sec

---

## Q10. Poisson Mean (Medium)
$X \sim P(4)$. E(X) = ?
(a) 2  (b) 4  (c) 16  (d) 8

**Answer:** (b) 4
**Solution:** For Poisson, E = λ.
**Shortcut:** Poisson: E = Var = λ.
**Common Mistake:** Squaring λ.
**Time target:** 30 sec

---

## Q11. Standard Deviation (Hard)
Data: 2, 4, 6, 8, 10. Find variance.
(a) 6  (b) 8  (c) 10  (d) 4

**Answer:** (b) 8
**Solution:** Mean = 6. Deviations²: 16, 4, 0, 4, 16. Sum = 40. Variance = 40/5 = 8.
**Shortcut:** $\sigma^2 = E(X^2) - (E(X))^2$.
**Common Mistake:** Computing std dev.
**Time target:** 120 sec

---

## Q12. Binomial Variance (Hard)
$X \sim B(20, 0.4)$. Var(X)?
(a) 8  (b) 4.8  (c) 12  (d) 6

**Answer:** (b) 4.8
**Solution:** $np(1-p) = 20 \times 0.4 \times 0.6 = 4.8$
**Shortcut:** Binomial variance = np(1-p).
**Common Mistake:** Using $np^2$.
**Time target:** 60 sec

---

## Q13. Conditional Probability Advanced (Hard)
P(A) = 0.4, P(B|A) = 0.5, P(B|A') = 0.3. P(A|B)?
(a) 0.5  (b) 0.4  (c) 0.5  (d) 0.526

**Answer:** (d) 0.526
**Solution:** $P(A \cap B) = 0.4 \times 0.5 = 0.2$. $P(B) = 0.2 + 0.6 \times 0.3 = 0.2 + 0.18 = 0.38$. $P(A|B) = 0.2/0.38 = 20/38 = 10/19 ≈ 0.526$.
**Shortcut:** Bayes with conditional.
**Common Mistake:** Forgetting P(B|A') term.
**Time target:** 150 sec

---

## Q14. Independent Trials (Hard)
Two independent tosses of a fair coin. P(same result)?
(a) 1/2  (b) 1/4  (c) 3/4  (d) 1

**Answer:** (a) 1/2
**Solution:** P(HH) + P(TT) = 1/4 + 1/4 = 1/2.
**Shortcut:** P(HH or TT).
**Common Mistake:** Missing TT case.
**Time target:** 30 sec

---

## Set Summary
- **Total Questions:** 14 | **Time:** 18 min
- **Difficulty:** 3 Easy (Q1, Q2, Q10), 7 Medium (Q3, Q4, Q5, Q6, Q9, Q12), 4 Hard (Q7, Q8, Q11, Q13, Q14)
- **Key concepts tested:** Binomial (Q1, Q4, Q12), Poisson (Q10), geometric (Q8), Bayes (Q3, Q13), expectation/variance (Q2, Q9, Q11).
- **Target accuracy:** 75% (10/14) for safe attempt.
- **Chapter Reference:** ch 18, p. 1-200 — Probability Advanced.
