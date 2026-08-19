# SSC CGL Tier 1 — Number System & Simplification

> **Exam:** SSC CGL Tier 1 | **Time:** 15 min (60 sec/Q) | **Total:** 15 Qs
> **Difficulty:** 5 Easy, 7 Medium, 3 Hard | **Trap Qs:** 2
> **Source basis:** Ch. 1 Number System & Simplification (24-fraction table, divisibility rules, HCF/LCM, surds, BODMAS)

---

## Q1. Divisibility by 9 (Easy)
Find the smallest digit in place of * so that **5*832** is divisible by 9.
(a) 0  (b) 1  (c) 2  (d) 3

**Answer:** (b) 1
**Solution:** Digit sum = 5 + * + 8 + 3 + 2 = 18 + *. For divisibility by 9, need 18 + * ≡ 0 (mod 9) ⇒ * = 0. Wait, 18 is already divisible by 9, so * = 0 also works. Smallest positive non-zero digit: * = 1 makes sum 19, not divisible. The smallest * that makes the sum a multiple of 9 is * = 0 (sum = 18) or * = 9 (sum = 27). Among the choices, * = 0 works. **Answer: (a) 0** → use option (a). Re-check: the question says "smallest digit", and 0 is allowed.
**Final Answer:** (a) 0
**Shortcut:** Compute digit sum excluding the unknown, then find the smallest non-negative digit to make it a multiple of 9.
**Common Mistake:** Forgetting that * = 0 is a valid digit for divisibility.
**Time target:** 30 sec

---

## Q2. Divisibility by 11 (Easy)
If digit P satisfies **P7538** divisible by 11, find P.
(a) 3  (b) 4  (c) 5  (d) 6

**Answer:** (b) 4
**Solution:** Alternating sum (from right) = (8 + 3) − (5 + P) = 11 − P − 5 = 6 − P. For divisibility by 11: 6 − P ≡ 0 (mod 11). For digit P (0–9), 6 − P = 0 gives P = 6. 6 − P = −11 gives P = 17 (invalid). So P = 6. **Answer: (d) 6**
**Shortcut:** Use right-to-left alternating sum (most reliable for divisibility by 11).
**Common Mistake:** Using left-to-right sign pattern instead of right-to-left.
**Time target:** 30 sec

---

## Q3. Largest number divisible by 8 (Easy)
Largest 4-digit number divisible by 8.
(a) 9992  (b) 9996  (c) 9998  (d) 9999

**Answer:** (a) 9992
**Solution:** 9999 mod 8 = 9999 − 1249 × 8 = 9999 − 9992 = 7. Largest divisible = 9999 − 7 = 9992. Verify: 9992/8 = 1249. ✓
**Shortcut:** 1000 = 8 × 125, so divisibility by 8 depends only on the last 3 digits. Find largest 3-digit multiple of 8 ≤ 992 = 992 itself (992/8 = 124). So 9992.
**Common Mistake:** Confusing divisibility rules for 4 (last 2 digits) and 8 (last 3 digits).
**Time target:** 30 sec

---

## Q4. HCF of three numbers (Medium)
HCF of **324, 432, 540**:
(a) 108  (b) 54  (c) 72  (d) 36

**Answer:** (a) 108
**Solution:** Prime factorization: 324 = 2² · 3⁴, 432 = 2⁴ · 3³, 540 = 2² · 3³ · 5. Common primes with min power: 2² · 3³ = 4 · 27 = 108. ✓
**Shortcut:** Take the minimum power of each prime that appears in ALL factorizations.
**Common Mistake:** Picking max power (that's LCM, not HCF).
**Time target:** 60 sec

---

## Q5. LCM of three numbers (Medium)
LCM of **48, 72, 96**:
(a) 192  (b) 144  (c) 288  (d) 384

**Answer:** (c) 288
**Solution:** 48 = 2⁴ · 3, 72 = 2³ · 3², 96 = 2⁵ · 3. LCM = 2⁵ · 3² = 32 · 9 = 288. ✓
**Shortcut:** Use prime factorization; take max power of each prime.
**Common Mistake:** Using long division and making an arithmetic slip.
**Time target:** 75 sec

---

## Q6. HCF × LCM (Medium — Trap)
Two numbers have HCF = 12 and LCM = 504. One number is 84. The other is:
(a) 72  (b) 96  (c) 108  (d) 144

**Answer:** (a) 72
**Solution:** HCF × LCM = product of two numbers. 12 × 504 = 6048. Other number = 6048 / 84 = 72. Verify: HCF(72, 84) = 12, LCM(72, 84) = 504. ✓
**Shortcut:** Use the identity: H × L = a × b. Solve for unknown in one step.
**Common Mistake:** Trying to compute GCD and LCM separately — wastes time.
**Time target:** 45 sec

---

## Q7. Mean proportional (Medium)
The mean proportional of 18 and 32 is:
(a) 24  (b) 25  (c) 26  (d) 28

**Answer:** (a) 24
**Solution:** Mean proportional = √(a · b) = √(18 × 32) = √576 = 24. ✓
**Shortcut:** Check if a · b is a perfect square. 576 = 24².
**Common Mistake:** Taking the arithmetic mean (25) instead of geometric mean (24).
**Time target:** 30 sec

---

## Q8. 24-Fraction Table (Medium — Trap)
The fraction equivalent of **16⅔%** is:
(a) 1/7  (b) 1/6  (c) 1/5  (d) 1/8

**Answer:** (b) 1/6
**Solution:** 16.67% = 16⅔% = 1/6. From the 24-fraction table: 1/6 = 16.67%. ✓
**Shortcut:** Memorize the 24-fraction table backward (percentage → fraction).
**Common Mistake:** Confusing 1/6 = 16.67% with 1/7 = 14.28%.
**Time target:** 15 sec

---

## Q9. Reverse % (Medium)
If P is **25% more** than Q, then Q is what % less than P?
(a) 20%  (b) 22%  (c) 25%  (d) 18%

**Answer:** (a) 20%
**Solution:** P/Q = 1.25 = 5/4. So Q/P = 4/5. Q is (1 − 4/5) × 100% = 20% less than P. **Answer: 20%.**
**Shortcut:** If P is R% more than Q, then Q is R/(100+R) × 100% less than P = 25/125 × 100% = 20%.
**Common Mistake:** Saying Q is 25% less than P (reversing is not symmetric!).
**Time target:** 30 sec

---

## Q10. Successive % change (Hard)
A number is increased by 20%, then decreased by 20%, then increased by 10%. Net % change:
(a) 5.6% increase  (b) 4.6% increase  (c) 5.6% decrease  (d) No change

**Answer:** (a) 5.6% increase
**Solution:** Multiplier = 1.20 × 0.80 × 1.10 = 1.056. Net = +5.6% increase. ✓
**Shortcut:** Always convert successive % to multipliers, then multiply.
**Common Mistake:** Adding up the percentages (20 − 20 + 10 = 10%) — wrong for successive change.
**Time target:** 60 sec

---

## Q11. Surd simplification (Hard)
Simplify: $\sqrt{(7 + 4\sqrt{3})}$.
(a) 2 + √3  (b) 3 + √3  (c) 2 − √3  (d) 3 − √3

**Answer:** (a) 2 + √3
**Solution:** Let √(7 + 4√3) = √a + √b. Then a + b = 7 and 2√(ab) = 4√3 ⇒ ab = 12. So a, b are roots of x² − 7x + 12 = 0 ⇒ (x − 3)(x − 4) = 0 ⇒ a = 4, b = 3. So √(7 + 4√3) = √4 + √3 = 2 + √3. Verify: (2 + √3)² = 4 + 4√3 + 3 = 7 + 4√3. ✓
**Shortcut:** Assume the form (√a + √b)² and solve for a, b.
**Common Mistake:** Trying to factor 7 + 4√3 directly.
**Time target:** 90 sec

---

## Q12. Polynomial remainder (Hard)
If n when divided by 7 leaves remainder 3, find remainder when (n² + 4n + 11) is divided by 7.
(a) 0  (b) 1  (c) 2  (d) 4

**Answer:** (d) 4
**Solution:** Let n = 3 (smallest value giving remainder 3). n² + 4n + 11 = 9 + 12 + 11 = 32. 32 mod 7 = 32 − 4 × 7 = 4. **Answer: 4.** ✓
**Shortcut:** Substitute the smallest valid n (the remainder itself) for any polynomial modulo problem.
**Common Mistake:** Doing long polynomial division — unnecessary.
**Time target:** 60 sec

---

## Q13. Smallest k for divisibility (Medium)
Smallest digit k so that **234k5** is divisible by **3** but not by **2**.
(a) 1  (b) 3  (c) 5  (d) 7

**Answer:** (a) 1
**Solution:** For NOT div by 2, last digit (5) must be odd ✓. For div by 3: digit sum = 2+3+4+k+5 = 14+k. Need 14+k div by 3 ⇒ k = 1 (sum 15) or k = 4 (sum 18) or k = 7 (sum 21). Among options: k = 1, 3, 5, 7. k = 1 works (15 is divisible by 3). But check: k = 3 also works (17 not div by 3). So k = 1. ✓
**Answer: (a) 1**
**Shortcut:** Use digit-sum test for 3; check parity for 2.
**Common Mistake:** Testing divisibility by 6 when only 3 is required.
**Time target:** 45 sec

---

## Q14. BODMAS simplification (Medium)
Value of: $15 - 6 \div 2 \times 3 + 4 - 2 \times 5 \div 10$
(a) 9  (b) 10  (c) 7  (d) 8

**Answer:** (a) 9
**Solution:** BODMAS: 15 − (6÷2×3) + 4 − (2×5÷10) = 15 − 9 + 4 − 1 = 9. ✓
**Shortcut:** Strict left-to-right for ÷ and × (same precedence).
**Common Mistake:** Doing × before ÷ in any order — they have the same priority; evaluate left to right.
**Time target:** 45 sec

---

## Q15. Cyclic power (Hard)
The last digit of **7²⁰²⁴** is:
(a) 1  (b) 3  (c) 7  (d) 9

**Answer:** (a) 1
**Solution:** Powers of 7 cycle: 7, 9, 3, 1 (period 4). 2024 mod 4 = 0. When exponent is multiple of 4, the last digit = 1. ✓
**Shortcut:** Memorize cycles: 2(2,4,8,6), 3(3,9,7,1), 4(4,6), 7(7,9,3,1), 8(8,4,2,6), 9(9,1).
**Common Mistake:** Using 7² = 49, last digit 9, and assuming all powers end in 9.
**Time target:** 30 sec

---

## Set Summary
- **Total Questions:** 15 | **Time:** 15 min
- **Difficulty:** 5 Easy (Q1–Q3, Q8, Q9) | 7 Medium (Q4–Q7, Q10, Q13, Q14) | 3 Hard (Q11, Q12, Q15)
- **Key concepts tested:** Divisibility (Q1, Q2, Q3, Q13), HCF/LCM (Q4, Q5, Q6), 24-fraction table (Q8, Q9), Surds (Q11), Polynomials (Q12), BODMAS (Q14), Cyclic powers (Q15), Mean proportional (Q7).
- **Target accuracy:** 80% (12/15) for safe attempt in exam.
- **Chapter Reference:** ch 1, p. 1-32 — concepts from Number System & Simplification.
