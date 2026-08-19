# SSC CGL Tier 1 — Set Theory & Venn Diagrams

> **Exam:** SSC CGL Tier 1 | **Time:** 15 min (60 sec/Q) | **Total:** 15 Qs
> **Difficulty:** 6 Easy, 7 Medium, 2 Hard | **Trap Qs:** 2
> **Source basis:** Ch. 17 Set Theory

---

## Q1. Basic Cardinality (Easy)
In a class of 50 students, 30 study Maths, 25 study Physics. 10 study both. How many study neither?
(a) 5  (b) 10  (c) 15  (d) 20

**Answer:** (a) 5
**Solution:** $n(M \cup P) = 30 + 25 - 10 = 45$. Neither = $50 - 45 = 5$.
**Shortcut:** Inclusion-exclusion: $n(A \cup B) = n(A) + n(B) - n(A \cap B)$.
**Common Mistake:** Just adding 30+25 = 55 (double counts intersection).
**Time target:** 45 sec

---

## Q2. Direct Union (Easy)
$n(A) = 50, n(B) = 40, n(A \cap B) = 10$. Find $n(A \cup B)$.
(a) 70  (b) 80  (c) 90  (d) 100

**Answer:** (b) 80
**Solution:** $50 + 40 - 10 = 80$
**Shortcut:** Apply formula directly.
**Common Mistake:** Just adding 50+40=90 (missing subtraction).
**Time target:** 30 sec

---

## Q3. Complement (Easy)
$n(A) = 60, n(B) = 50, n(U) = 100, n(A \cap B) = 20$. Find $n(A^c \cap B^c)$.
(a) 10  (b) 20  (c) 30  (d) 40

**Answer:** (a) 10
**Solution:** $n(A \cup B) = 60 + 50 - 20 = 90$. $A^c \cap B^c = 100 - 90 = 10$.
**Shortcut:** De Morgan: $(A \cup B)^c = A^c \cap B^c$.
**Common Mistake:** Computing 100 - 60 = 40.
**Time target:** 60 sec

---

## Q4. Subsets Count (Easy)
Number of subsets of a set with 5 elements?
(a) 25  (b) 32  (c) 50  (d) 120

**Answer:** (b) 32
**Solution:** $2^5 = 32$
**Shortcut:** $2^n$ subsets.
**Common Mistake:** Computing $5! = 120$ (permutations, not subsets).
**Time target:** 15 sec

---

## Q5. Set Intersection (Easy)
$A = \{1, 2, 3\}, B = \{3, 4, 5\}$. Find $A \cap B$.
(a) $\{1, 2\}$  (b) $\{3\}$  (c) $\{4, 5\}$  (d) $\{1, 2, 3, 4, 5\}$

**Answer:** (b) {3}
**Solution:** Common element is 3.
**Shortcut:** Find common elements.
**Common Mistake:** Listing all elements.
**Time target:** 15 sec

---

## Q6. De Morgan's Law (Easy)
$(A \cup B)^c = ?$
(a) $A^c \cup B^c$  (b) $A^c \cap B^c$  (c) $A \cap B$  (d) $A \cup B$

**Answer:** (b) $A^c \cap B^c$
**Solution:** De Morgan's law.
**Shortcut:** Memorize: complement of union = intersection of complements.
**Common Mistake:** Choosing (a) — flipping union and intersection.
**Time target:** 30 sec

---

## Q7. Hindi/English Speakers (Medium)
In a group of 75 people, 35 speak Hindi, 30 speak English, 20 speak both. How many speak at least one?
(a) 35  (b) 40  (c) 45  (d) 50

**Answer:** (c) 45
**Solution:** $35 + 30 - 20 = 45$
**Shortcut:** $n(A \cup B) = n(A) + n(B) - n(A \cap B)$.
**Common Mistake:** Adding 35+30=65.
**Time target:** 45 sec

---

## Q8. Set Difference (Medium)
If $A = \{1, 2, 3, 4\}$ and $B = \{3, 4, 5, 6\}$, then $A - B = ?$
(a) $\{1, 2\}$  (b) $\{3, 4\}$  (c) $\{5, 6\}$  (d) $\emptyset$

**Answer:** (a) {1, 2}
**Solution:** A - B = elements in A but not in B.
**Shortcut:** Remove common elements.
**Common Mistake:** Returning $B - A = \{5, 6\}$.
**Time target:** 20 sec

---

## Q9. Empty Set Subsets (Medium)
How many subsets does an empty set have?
(a) 0  (b) 1  (c) 2  (d) Infinity

**Answer:** (b) 1
**Solution:** Just the empty set itself.
**Shortcut:** $2^0 = 1$.
**Common Mistake:** Saying 0 (empty set is its own subset).
**Time target:** 20 sec

---

## Q10. Pass Percentage (Medium)
In a class, 50% passed in Maths, 40% passed in English, 20% failed in both. What % passed in both?
(a) 5%  (b) 10%  (c) 15%  (d) 20%

**Answer:** (b) 10%
**Solution:** Pass in M = 50%, Pass in E = 40%, Fail in both = 20% (so pass in at least one = 80%). $n(M \cap E) = 50 + 40 - 80 = 10\%$.
**Shortcut:** Convert % failed → % pass.
**Common Mistake:** Confusing fail and pass.
**Time target:** 90 sec

---

## Q11. Exactly Two Sets (Medium)
$n(A \cap B \cap C) = 5, n(A \cap B) = 15, n(B \cap C) = 12, n(A \cap C) = 10$. Find $n(\text{exactly two})$.
(a) 22  (b) 32  (c) 27  (d) 37

**Answer:** (a) 22
**Solution:** $n(\text{exactly two}) = 15 + 12 + 10 - 3 \times 5 = 37 - 15 = 22$
**Shortcut:** Sum of pairs minus 3×triple.
**Common Mistake:** Not multiplying triple by 3.
**Time target:** 90 sec

---

## Q12. Only One Set (Medium)
Out of 100 students, 40 study Hindi, 30 study Sanskrit, 20 study both. How many study only Hindi?
(a) 10  (b) 20  (c) 30  (d) 40

**Answer:** (b) 20
**Solution:** Only Hindi = $40 - 20 = 20$
**Shortcut:** "Only A" = $n(A) - n(A \cap B)$.
**Common Mistake:** Using total 40 directly.
**Time target:** 45 sec

---

## Q13. Proper Subsets (Hard)
A set $A$ has 8 elements. How many proper subsets does it have?
(a) 256  (b) 255  (c) 128  (d) 127

**Answer:** (b) 255
**Solution:** Total subsets = $2^8 = 256$. Proper = $256 - 1 = 255$.
**Shortcut:** Subtract 1 (the set itself) from total.
**Common Mistake:** Returning 256 (includes the set itself).
**Time target:** 30 sec

---

## Q14. Set Union (Hard)
$A = \{a, b, c, d\}, B = \{c, d, e, f\}$. Find $A \cup B$.
(a) $\{a, b, c, d, e, f\}$  (b) $\{c, d\}$  (c) $\{a, b, e, f\}$  (d) $\emptyset$

**Answer:** (a) {a, b, c, d, e, f}
**Solution:** All unique elements.
**Shortcut:** Combine without duplicates.
**Common Mistake:** Listing duplicates.
**Time target:** 20 sec

---

## Q15. Neither — Sports (Hard)
In a class of 60, 25 play cricket, 20 play football, 15 play both. How many play neither?
(a) 20  (b) 30  (c) 40  (d) 50

**Answer:** (b) 30
**Solution:** $n(C \cup F) = 25 + 20 - 15 = 30$. Neither = $60 - 30 = 30$.
**Shortcut:** Total minus union.
**Common Mistake:** Returning 30+60 confusion.
**Time target:** 60 sec

---

## Set Summary
- **Total Questions:** 15 | **Time:** 15 min
- **Difficulty:** 6 Easy (Q1–Q6), 7 Medium (Q7–Q12, Q14), 2 Hard (Q13, Q15)
- **Key concepts tested:** Inclusion-exclusion (Q1, Q2, Q7), De Morgan (Q3, Q6), subsets (Q4, Q9, Q13), set difference (Q8), only/exactly (Q10, Q11, Q12, Q15).
- **Target accuracy:** 80% (12/15) for safe attempt.
- **Chapter Reference:** ch 17, p. 150-200 — Set Theory & Venn Diagrams.
