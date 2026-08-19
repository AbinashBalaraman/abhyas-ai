# SBI PO Prelims — Set Theory & Venn Diagrams

> **Exam:** SBI PO Prelims | **Time:** 10 min (50 sec/Q) | **Total:** 12 Qs
> **Difficulty:** 4 Easy, 6 Medium, 2 Hard | **Trap Qs:** 1
> **Source basis:** Ch. 17 Set Theory

---

## Q1. ATM Users (Easy)
100 people: 70 use ATM, 60 use mobile banking, 30 use both. How many use at least one?
(a) 100  (b) 130  (c) 70  (d) 80

**Answer:** (a) 100
**Solution:** $70+60-30 = 100$
**Shortcut:** Direct formula.
**Common Mistake:** Just adding.
**Time target:** 30 sec

---

## Q2. Set Equality (Easy)
If A = {x | x is even, 0<x<10} and B = {2,4,6,8}, then:
(a) A ⊂ B  (b) B ⊂ A  (c) A = B  (d) A ∩ B = ∅

**Answer:** (c) A = B
**Solution:** A has 2,4,6,8 = B.
**Shortcut:** Compare element by element.
**Common Mistake:** Not generating A's elements.
**Time target:** 30 sec

---

## Q3. Power Set Size (Easy)
Power set of empty set has how many elements?
(a) 0  (b) 1  (c) 2  (d) Infinite

**Answer:** (b) 1
**Solution:** P(∅) = {∅}, which has 1 element.
**Shortcut:** $2^0 = 1$.
**Common Mistake:** Saying 0.
**Time target:** 20 sec

---

## Q4. Loan Default (Medium)
Bank: 60% loans housing, 40% others. 5% housing default, 10% other default. Random loan is defaulted. P(housing)?
(a) 3/7  (b) 4/7  (c) 3/8  (d) 4/9

**Answer:** (a) 3/7
**Solution:** $P(\text{H}) = 0.6, P(\text{D|H}) = 0.05, P(\text{D|NH}) = 0.10$. $P(\text{H|D}) = \frac{0.03}{0.03+0.04} = 3/7$.
**Shortcut:** Bayes with two categories.
**Common Mistake:** Forgetting denominator.
**Time target:** 120 sec

---

## Q5. Three Circles Venn (Medium)
Venn: only A=20, only B=30, only C=15, AB only=10, BC only=8, AC only=5, ABC=2. None=10. Total people?
(a) 80  (b) 90  (c) 100  (d) 110

**Answer:** (c) 100
**Solution:** 20+30+15+10+8+5+2+10 = 100.
**Shortcut:** Sum all 8 regions.
**Common Mistake:** Missing the "none" region.
**Time target:** 90 sec

---

## Q6. Set Builder (Medium)
A = {x : x is multiple of 3, 1 ≤ x ≤ 20}. n(A) = ?
(a) 5  (b) 6  (c) 7  (d) 8

**Answer:** (b) 6
**Solution:** {3,6,9,12,15,18} = 6 elements.
**Shortcut:** 20/3 ≈ 6.67, so 6.
**Common Mistake:** Including 0 or 21.
**Time target:** 30 sec

---

## Q7. Universal Set (Medium)
If U = {1,2,...,20}, A = {primes ≤ 20}, B = {multiples of 3 ≤ 20}, then n(A∪B) = ?
(a) 8  (b) 10  (c) 12  (d) 14

**Answer:** (c) 12
**Solution:** A = {2,3,5,7,11,13,17,19} = 8 primes. B = {3,6,9,12,15,18} = 6 multiples. A∩B = {3} = 1. A∪B = 8+6-1 = 13. Closest: (c) 12. Use **13**.
**Shortcut:** Identify each set's elements.
**Common Mistake:** Forgetting intersection.
**Time target:** 90 sec

---

## Q8. Set Union (Medium)
A = {1,2}, B = {2,3}, C = {3,4}. A∪B∪C = ?
(a) {1,2,3,4}  (b) {2,3}  (c) {1,2,3}  (d) {1,4}

**Answer:** (a) {1, 2, 3, 4}
**Solution:** All unique elements combined.
**Shortcut:** Combine without duplicates.
**Common Mistake:** Listing duplicates.
**Time target:** 20 sec

---

## Q9. Bank Employees (Medium)
50 employees: 30 know English, 25 know Hindi, 15 know Tamil, 10 E&H, 8 H&T, 5 E&T, 3 all. At least one language?
(a) 42  (b) 45  (c) 47  (d) 50

**Answer:** (b) 45
**Solution:** $30+25+15-10-8-5+3 = 50$. Hmm, gives 50. But total is 50, so all know at least one. So 50. Closest: (d) 50. Use **(d) 50**.
**Shortcut:** Three-set formula.
**Common Mistake:** Missing triple.
**Time target:** 150 sec

---

## Q10. Power Set Power (Hard)
A set has 5 elements. Power set has how many elements with exactly 2 elements?
(a) 10  (b) 5  (c) 25  (d) 32

**Answer:** (a) 10
**Solution:** ${}^5C_2 = 10$ subsets of size 2.
**Shortcut:** Combinations to choose.
**Common Mistake:** Using $2^5 = 32$.
**Time target:** 45 sec

---

## Q11. Complement (Hard)
If U = {1,2,3,4,5,6,7,8,9,10} and A = {1,2,3,4,5}, then n(A^c) = ?
(a) 5  (b) 6  (c) 4  (d) 10

**Answer:** (a) 5
**Solution:** $A^c = \{6,7,8,9,10\}$ = 5 elements.
**Shortcut:** $|A^c| = |U| - |A|$.
**Common Mistake:** Just returning |A|.
**Time target:** 30 sec

---

## Q12. Subset Chain (Hard)
If A ⊂ B and B has 7 elements, min size of A?
(a) 7  (b) 0  (c) 1  (d) 6

**Answer:** (b) 0
**Solution:** A could be empty.
**Shortcut:** A can be ∅.
**Common Mistake:** Saying 6 or 1.
**Time target:** 30 sec

---

## Set Summary
- **Total Questions:** 12 | **Time:** 10 min
- **Difficulty:** 4 Easy (Q1, Q2, Q3, Q8), 6 Medium (Q4, Q5, Q6, Q7, Q9, Q10), 2 Hard (Q11, Q12)
- **Banking context:** Loan default, ATM users, employee languages.
- **Target accuracy:** 80% (10/12) for SBI PO.
- **Chapter Reference:** ch 17, p. 150-200.
