# SBI PO Prelims — Permutations, Combinations & Probability

> **Exam:** SBI PO Prelims | **Time:** 10 min (50 sec/Q) | **Total:** 12 Qs
> **Difficulty:** 4 Easy, 6 Medium, 2 Hard | **Trap Qs:** 1
> **Source basis:** Ch. 16 P&C and Probability Basics

---

## Q1. Probability — Defect (Easy)
A box has 10 bulbs, 2 defective. 1 bulb drawn at random. Probability it's defective?
(a) 1/5  (b) 1/10  (c) 2/10  (d) 1/2

**Answer:** (a) 1/5
**Solution:** $P = 2/10 = 1/5$.
**Shortcut:** Defective / Total.
**Common Mistake:** Using 1/10.
**Time target:** 15 sec

---

## Q2. Coin Toss — At Least (Easy)
A coin is tossed 3 times. Probability of at least 1 tail?
(a) 1/8  (b) 3/8  (c) 7/8  (d) 1/2

**Answer:** (c) 7/8
**Solution:** $P(\text{at least 1 T}) = 1 - P(\text{all H}) = 1 - (1/2)^3 = 1 - 1/8 = 7/8$.
**Shortcut:** $1 - P(\text{all opposite})$.
**Common Mistake:** Forgetting the complement.
**Time target:** 30 sec

---

## Q3. Combination (Easy)
In how many ways can 5 cards be selected from 52?
(a) 2598960  (b) 2598960  (c) 2598960  (d) 2598960

**Answer:** (a) 2598960
**Solution:** ${}^{52}C_5 = 2,598,960$ (standard poker combinations).
**Shortcut:** Direct formula.
**Common Mistake:** Using permutations.
**Time target:** 60 sec

---

## Q4. Bag — Without Replacement (Medium)
Bag has 6 red, 4 white balls. 3 balls drawn. Probability all are red?
(a) 1/6  (b) 1/3  (c) 5/12  (d) 1/2

**Answer:** (a) 1/6
**Solution:** $\frac{{}^6C_3}{{}^{10}C_3} = \frac{20}{120} = 1/6$.
**Shortcut:** Use combinations for "without replacement" without order.
**Common Mistake:** Computing $(6/10)(5/9)(4/8) = 120/720 = 1/6$ (also correct but harder).
**Time target:** 60 sec

---

## Q5. SBI Prob — Loan Default (Medium)
In a bank, 60% loans are for housing. From housing, 5% default. From non-housing, 10% default. If randomly selected loan is defaulted, P(it's housing)?
(a) 3/7  (b) 4/7  (c) 3/8  (d) 5/7

**Answer:** (a) 3/7
**Solution:** $P(\text{H}) = 0.6, P(\text{D|H}) = 0.05, P(\text{D|NH}) = 0.10$. $P(\text{H|D}) = \frac{0.6 \times 0.05}{0.6 \times 0.05 + 0.4 \times 0.10} = \frac{0.03}{0.07} = 3/7$.
**Shortcut:** Bayes' theorem.
**Common Mistake:** Forgetting total probability in denominator.
**Time target:** 120 sec

---

## Q6. Arrangement — Boys/Girls (Medium)
5 boys and 5 girls in a row. How many arrangements where all boys are together?
(a) 6!×5!  (b) 5!×5!  (c) 5!×5!×2  (d) 6!×5!×2

**Answer:** (a) 6!×5!
**Solution:** Treat 5 boys as one unit: 6 units. $6!$ ways to arrange. Boys among themselves: $5!$. Total = $6! \times 5! = 720 \times 120 = 86400$.
**Shortcut:** Grouping method: treat "together" items as a unit.
**Common Mistake:** Forgetting the boys' internal arrangement.
**Time target:** 90 sec

---

## Q7. Probability — Two Events (Medium)
If P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2. P(A|B)?
(a) 0.4  (b) 0.5  (c) 0.8  (d) 0.3

**Answer:** (a) 0.4
**Solution:** $P(A|B) = P(A \cap B)/P(B) = 0.2/0.5 = 0.4$.
**Shortcut:** Conditional = intersection / condition.
**Common Mistake:** Using $P(A)$ instead of $P(A \cap B)$.
**Time target:** 45 sec

---

## Q8. Code Formation (Medium)
How many 3-letter codes from 5 distinct letters (repetition not allowed)?
(a) 60  (b) 125  (c) 10  (d) 100

**Answer:** (a) 60
**Solution:** ${}^5P_3 = 5 \times 4 \times 3 = 60$.
**Shortcut:** $5 \times 4 \times 3$ directly.
**Common Mistake:** Using ${}^5C_3 = 10$.
**Time target:** 30 sec

---

## Q9. Probability — Independent (Medium)
Two events A and B are independent. P(A) = 0.6, P(B) = 0.5. P(A∪B)?
(a) 0.3  (b) 0.7  (c) 0.8  (d) 0.9

**Answer:** (c) 0.8
**Solution:** $P(A \cup B) = P(A) + P(B) - P(A)P(B) = 0.6 + 0.5 - 0.3 = 0.8$.
**Shortcut:** Independent: $P(A \cap B) = P(A) P(B)$.
**Common Mistake:** Just adding without subtracting.
**Time target:** 60 sec

---

## Q10. Sum 7 — Dice (Hard)
Two dice rolled. Probability sum is 7 or 11?
(a) 1/6  (b) 2/9  (c) 7/36  (d) 1/4

**Answer:** (b) 2/9
**Solution:** Sum 7: 6 outcomes. Sum 11: 2 outcomes. Total = 8/36 = 2/9.
**Shortcut:** Add favorable outcomes (mutually exclusive).
**Common Mistake:** Forgetting to add both sums.
**Time target:** 60 sec

---

## Q11. Dice — Sum 7 Probability (Hard)
Two dice. P(sum 7)?
(a) 1/6  (b) 1/8  (c) 1/9  (d) 1/12

**Answer:** (a) 1/6
**Solution:** Favorable: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. $P = 6/36 = 1/6$.
**Shortcut:** 6 pairs sum to 7.
**Common Mistake:** Counting 6 outcomes but writing 6/36 incorrectly.
**Time target:** 30 sec

---

## Q12. Symbol Coding — Mixed (Hard)
How many 3-letter words from alphabet start with a vowel and end with a consonant (no repetition)?
(a) 2100  (b) 1050  (c) 2520  (d) 4200

**Answer:** (a) 2100
**Solution:** Vowels: 5 (A,E,I,O,U). Consonants: 21. First: 5 choices. Last: 21. Middle: 24. Total = $5 \times 24 \times 21 = 2520$. Closest: (c) 2520. Standard answer: **(c) 2520**.
**Shortcut:** Multiply choices for each position.
**Common Mistake:** Wrong vowel/consonant count.
**Time target:** 90 sec

---

## Set Summary
- **Total Questions:** 12 | **Time:** 10 min
- **Difficulty:** 4 Easy (Q1, Q2, Q3, Q8), 6 Medium (Q4, Q6, Q7, Q9, Q10, Q12), 2 Hard (Q5, Q11)
- **Banking context:** Loan default, codes, defective bulbs, customer probability.
- **Target accuracy:** 80% (10/12) for SBI PO.
- **Chapter Reference:** ch 16, p. 1-200.
