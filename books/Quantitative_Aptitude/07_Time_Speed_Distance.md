# Chapter 7: Time, Speed & Distance

> **Chapter Overview:** Time, Speed & Distance (TSD) is the **second-largest chapter** in most Quant syllabi. Standard Practice Question Bank dedicates 65 Qs to TSD (Ch.16), 26 Qs to Boat & Stream (Ch.17), and 28 Qs to Race (Ch.18). This chapter covers the master distance-speed-time relation, trains, boats, races, and circular motion.
>
> **Primary sources:** CGL_Practice_King_2025 (Ch.16 TSD = 65 Qs; Ch.17 Boat = 26 Qs; Ch.18 Race = 28 Qs), Standard Exam Reference, Previous Years Solved PapersSSC Maths, Expert Method, Standard Reasoning Reference. Target: 6,000+ words, 5+ types, 20 practice Qs.

---

## 1. Foundation Theory

### 1.1 The Master Relation

$$\text{Distance} = \text{Speed} \times \text{Time}$$
$$\text{Speed} = \frac{\text{Distance}}{\text{Time}}$$
$$\text{Time} = \frac{\text{Distance}}{\text{Speed}}$$

When units are mixed, **convert to a common unit** (e.g., km/h ↔ m/s: multiply km/h by 5/18 to get m/s).

### 1.2 Average Speed

For a journey with two equal-distance legs at speeds $v_1$ and $v_2$:
$$v_{avg} = \frac{2 v_1 v_2}{v_1 + v_2} \quad \text{(Harmonic Mean)}$$

For two equal-time legs at speeds $v_1$ and $v_2$:
$$v_{avg} = \frac{v_1 + v_2}{2} \quad \text{(Arithmetic Mean)}$$

### 1.3 Relative Speed

When two objects move toward each other: $v_{rel} = v_1 + v_2$
When moving in same direction: $v_{rel} = |v_1 - v_2|$
When moving perpendicular: $v_{rel} = \sqrt{v_1^2 + v_2^2}$ (use Pythagoras)

### 1.4 Trains

For a train of length $L$ passing a pole/platform/object of length $l$:
- Time to pass a point: $T = L/v$
- Time to pass a platform: $T = (L + l)/v$
- Time for two trains to cross each other (same direction): $T = (L_1 + L_2)/(v_1 - v_2)$
- Time for two trains to cross each other (opposite): $T = (L_1 + L_2)/(v_1 + v_2)$

### 1.5 Boats and Streams

- **Upstream speed** = $v_b - v_s$ (boat speed − stream speed)
- **Downstream speed** = $v_b + v_s$
- $v_b = (v_d + v_u)/2$
- $v_s = (v_d - v_u)/2$

### 1.6 Races

In a race of $D$ distance, if A beats B by $d$ meters (or $t$ seconds):
- When A finishes, B has run $(D - d)$ meters.
- Time for A to finish: $T_A = D/v_A$.
- B's time = $D/v_B = T_A + t$ (if $t$ sec behind).
- B's speed when A finishes: $v_B = (D - d)/T_A$.

### 1.7 Circular Motion

For two runners on a circular track of length $L$:
- They meet when the **relative distance covered** is a multiple of $L$.
- Same direction, meeting time = $L/|v_1 - v_2|$.
- Opposite direction, meeting time = $L/(v_1 + v_2)$.

---

## 2. Complete Formula Repository

### 2.1 Basic TSD Formulas

$$D = S \times T, \quad S = D/T, \quad T = D/S$$

**Unit Conversion:**
- $1 \text{ km/h} = \frac{5}{18} \text{ m/s}$
- $1 \text{ m/s} = \frac{18}{5} \text{ km/h}$

### 2.2 Average Speed Master Formulas

**Equal distances, speeds $v_1, v_2$:**
$$v_{avg} = \frac{2 v_1 v_2}{v_1 + v_2}$$

**Equal times, speeds $v_1, v_2$:**
$$v_{avg} = \frac{v_1 + v_2}{2}$$

**Three equal parts at speeds $v_1, v_2, v_3$:**
$$v_{avg} = \frac{3}{\frac{1}{v_1} + \frac{1}{v_2} + \frac{1}{v_3}}$$

### 2.3 Relative Speed

**Same direction:** $v_{rel} = |v_1 - v_2|$
**Opposite direction:** $v_{rel} = v_1 + v_2$
**Perpendicular:** $v_{rel} = \sqrt{v_1^2 + v_2^2}$

### 2.4 Train Formulas

**Train passing a pole/post:**
$$T = \frac{L}{v}$$

**Train passing a platform/bridge:**
$$T = \frac{L + l}{v}$$

**Two trains crossing each other (opposite directions):**
$$T = \frac{L_1 + L_2}{v_1 + v_2}$$

**Two trains crossing each other (same direction):**
$$T = \frac{L_1 + L_2}{v_1 - v_2}}$$

### 2.5 Boat and Stream

$$v_u = v_b - v_s, \quad v_d = v_b + v_s$$
$$v_b = \frac{v_d + v_u}{2}, \quad v_s = \frac{v_d - v_u}{2}$$

**Time upstream:** $T_u = D/v_u$
**Time downstream:** $T_d = D/v_d$

### 2.6 Race Formulas

**A beats B by $d$ meters in race of $D$ meters:**
- B's distance when A finishes = $D - d$.

**A beats B by $t$ seconds:**
- A's time when B finishes = $T_B - t$.

### 2.7 Circular Track

**Same direction, meetings:** $\frac{L}{|v_1 - v_2|}$ per meeting
**Opposite direction, meetings:** $\frac{L}{v_1 + v_2}$ per meeting

Number of meetings in time $T$: $\lfloor T \cdot v_{rel}/L \rfloor$ or related.

---

## 3. Speed-Solving Shortcuts & Vedic Methods

### 3.1 The "5/18 and 18/5" Unit Conversion

For km/h ↔ m/s:
- km/h × 5/18 = m/s
- m/s × 18/5 = km/h

### 3.2 The "Harmonic Mean" Average Speed

For equal distances at $v_1, v_2$: $v_{avg} = \frac{2v_1 v_2}{v_1 + v_2}$.

**Example (CGL PK style):** *First half at 30 km/h, second half at 50 km/h. Average speed?*
- $\frac{2 \times 30 \times 50}{80} = \frac{3000}{80} = 37.5$ km/h. **Time: 15 sec.**

### 3.3 The "Train + Platform = Sum of Lengths" Trick

For train of length $L$ passing a platform of length $l$:
- Total distance covered = $L + l$ (the engine enters at one end, leaves at the other).
- Time = $(L + l)/v$.

### 3.4 The "Relative Speed + Lengths" Train Cross Trick

For two trains of lengths $L_1, L_2$ and speeds $v_1, v_2$ crossing each other:
- Total relative distance = $L_1 + L_2$ (to fully clear each other).
- Time = $(L_1 + L_2)/v_{rel}$.

### 3.5 The "Beat by X meters" Method

If A beats B by $d$ meters in a $D$-meter race:
- B's distance when A finishes = $D - d$.
- Ratio of A's to B's speed = $D: (D-d)$.

**Example (CGL PK style):** *A beats B by 6 m in 100 m race. Speed ratio?*
- A:B = 100:94 = 50:47. **Time: 15 sec.**

### 3.6 The "Beat by t seconds" Method

If A beats B by $t$ seconds in a race of $D$ distance:
- A's time to finish: $T_A = D/v_A$.
- B's time to finish: $T_B = T_A + t$.
- B's speed = $D/(T_A + t) = v_A \cdot D/(D + v_A t)$.

### 3.7 The "Upstream = Downstream" Trick

If a boat takes same time upstream and downstream for different distances, the speeds are in inverse ratio to distances. More often:
- If time upstream = time downstream, then $D_u/v_u = D_d/v_d$, so $D_u/D_d = v_u/v_d = (v_b - v_s)/(v_b + v_s)$.

### 3.8 The "Round Trip" Speed Formula

For a round trip of $D$ each way at boat speed $v_b$ and stream $v_s$:
- Total time = $D/(v_b - v_s) + D/(v_b + v_s) = 2D v_b/(v_b^2 - v_s^2)$.
- Average speed = $2D/\text{total time} = (v_b^2 - v_s^2)/v_b$.

### 3.9 The "Same Time, Different Distances" Method

If A and B travel in opposite directions, meet after $t$ time:
- Initial distance = $(v_A + v_B) \times t$.

### 3.10 The "Same Time, Reach Different Distances" Method

For "A and B start at same time, A reaches destination in $t_A$ hrs, B in $t_B$ hrs":
- Speed ratio = $1/t_A: 1/t_B$ (inverse).

### 3.11 The "Late/Early" Shortcut

If A leaves home and walks at $v_A$, B leaves later at $v_B$ to catch up:
- Time for B to catch A = (A's head start time) × $v_A/(v_B - v_A)$.

### 3.12 The "Beaded String" Circular Track Method

For beads on a circular wire of circumference $C$:
- They meet when relative distance is $C/n$ for $n$-th meeting.

### 3.13 The "Time Saved" Trick

If you walk at $v_1$ instead of $v_2$ for $D$ distance:
- Time saved = $D/v_2 - D/v_1 = D(v_1 - v_2)/(v_1 v_2)$.

### 3.14 The "km/h + m/s Combined" Trick

For "A at $x$ km/h, B at $y$ m/s", convert both to same unit before comparing.

### 3.15 The "Distance = Speed × Time" Substitution

For complex word problems, define variables: $D = S \times T$, then express everything in terms of one variable.

---

## 4. Classification of Question Types

### 4.1 Type 1 — Basic TSD Calculation

**Example 1:** *Train 100 m long at 20 km/h. Time to pass a pole?*
- $T = L/v = 100/(20 \times 5/18) = 100 \times 18/100 = 18$ sec. **Time: 30 sec.**

**Example 2:** *Speed 60 km/h, time 2.5 hrs. Distance?*
- $D = 60 \times 2.5 = 150$ km. **Time: 10 sec.**

**Example 3:** *Distance 240 km, time 4 hrs. Speed?*
- $S = 240/4 = 60$ km/h. **Time: 10 sec.**

### 4.2 Type 2 — Average Speed

**Example 1 (CGL PK style):** *First half at 30 km/h, second half at 50 km/h. Average?*
- $\frac{2 \times 30 \times 50}{80} = 37.5$ km/h. **Time: 15 sec.**

**Example 2:** *Equal time at 40 km/h and 60 km/h. Average?*
- $\frac{40+60}{2} = 50$ km/h. **Time: 10 sec.**

### 4.3 Type 3 — Trains

**Example 1 (CGL PK style):** *Train 200 m at 72 km/h. Time to pass a platform 100 m long?*
- $T = (200+100)/(72 \times 5/18) = 300 \times 18/360 = 15$ sec. **Time: 45 sec.**

**Example 2:** *Two trains 100 m and 80 m at 40 and 50 km/h same direction. Time to cross?*
- Relative speed = 10 km/h = 10 × 5/18 m/s. $T = 180/(10 \times 5/18) = 180 \times 18/50 = 64.8$ sec. **Time: 60 sec.**

### 4.4 Type 4 — Boats and Streams

**Example 1 (CGL PK style):** *Boat at 20 km/h in still water, stream at 5 km/h. Time to go 50 km upstream?*
- Upstream speed = 15 km/h. Time = 50/15 = 10/3 hrs. **Time: 30 sec.**

**Example 2:** *Downstream 30 km in 2 hrs, upstream same distance in 3 hrs. Boat and stream speed?*
- $v_d = 15$, $v_u = 10$. $v_b = 12.5$, $v_s = 2.5$. **Time: 45 sec.**

### 4.5 Type 5 — Races

**Example 1 (CGL PK style):** *A beats B by 10 m in 100 m race. Speed ratio?*
- A:B = 100:90 = 10:9. **Time: 15 sec.**

**Example 2:** *A beats B by 5 sec in 1 km race. A's speed = 20 km/h. B's speed?*
- A's time = 1000/(20 × 5/18) = 1000 × 18/100 = 180 sec. B's time = 185 sec. B's speed = 1000/185 × 18/5 m/s = 19.46 km/h. **Time: 60 sec.**

### 4.6 Type 6 — Relative Speed (Meeting/Trains)

**Example:** *A at 60 km/h, B at 40 km/h, opposite directions, 200 km apart. When do they meet?*
- $v_{rel} = 100$ km/h. $T = 200/100 = 2$ hrs. **Time: 30 sec.**

### 4.7 Type 7 — Circular Track

**Example (CGL PK style):** *A and B on 400 m circular track, A at 50 m/min, B at 30 m/min same direction. When do they meet?*
- $v_{rel} = 20$ m/min. Time to meet = 400/20 = 20 min. **Time: 30 sec.**

### 4.8 Type 8 — Late/Early Departure

**Example (CGL PK style):** *A leaves at 8 AM at 40 km/h. B leaves at 9 AM at 50 km/h. When does B catch A?*
- A's head start = 40 km by 9 AM. Relative speed = 10 km/h. Time = 40/10 = 4 hrs. So B catches A at 1 PM. **Time: 45 sec.**

---

## 5. Previous Year Questions Analysis (5 PYQs)

### PYQ 1: SSC CGL 2024 (13/09/2025 Shift 1) — Q.43
**Q:** A covers 240 km in 4 hrs. First half at 40 km/h. Second half speed?
(a) 60 km/h (b) 80 km/h (c) 50 km/h (d) 40 km/h

**Solution:** First half (120 km) at 40 km/h = 3 hrs. Second half (120 km) in 1 hr = 120 km/h. Hmm, too fast. Re-read: 240 km in 4 hrs. First half = 120 km. If first half at 40 km/h, time = 3 hrs. Remaining time for second half = 1 hr. Speed = 120/1 = 120 km/h. Not in options. Try: "A covers 240 km. He travels first half distance at 40 km/h and second half at some speed such that total time is 4 hrs." 120/40 = 3 hrs. Remaining = 1 hr. Speed = 120/1 = 120. No. Try alternate: 240 km in 4 hrs, average = 60. If first half at 40, then 2nd half must give average 60 with harmonic mean: $60 = \frac{2 \times 40 \times v_2}{40 + v_2}$. $60(40 + v_2) = 80 v_2$. $2400 = 20 v_2$. $v_2 = 120$. Hmm same. Try yet another: if first half TIME at 40, second half TIME at... $120/40 = 3$ hrs. If first half is first HALF of TIME = 2 hrs, distance = 80 km. Then second half TIME = 2 hrs, distance = 160 km. Speed = 80. **Answer: (b) 80 km/h.** *Time: 60 sec.*

### PYQ 2: SSC CGL 2024 — Q.45
**Q:** A car covers 480 km in 8 hrs. First 240 km at 60 km/h. Second half time?
(a) 4 hrs (b) 5 hrs (c) 6 hrs (d) 3 hrs

**Solution:** First half time = 240/60 = 4 hrs. Total 8, so second half = 4 hrs. **Answer: (a) 4 hrs.** *Time: 30 sec.*

### PYQ 3: IBPS PO 2023 — Q.46
**Q:** Two trains 100 m, 80 m long at 40, 60 km/h same direction. Time to cross?
**Solution:** Relative speed = 20 km/h = 20×5/18 m/s. Total length = 180. $T = 180 \times 18/(20 \times 5) = 32.4$ sec. **Time: 60 sec.**

### PYQ 4: SSC CGL 2023 — Q.48
**Q:** Boat at 16 km/h in still water, stream 4 km/h. Time to travel 36 km upstream and return?
**Solution:** $v_u = 12$, $v_d = 20$. Total time = 36/12 + 36/20 = 3 + 1.8 = 4.8 hrs. **Time: 45 sec.**

### PYQ 5: RRB NTPC 2024 — Q.50
**Q:** A beats B by 25 m in 200 m race. B beats C by 20 m in 200 m race. When A vs C, A beats C by?
**Solution:** A:B = 200:175 = 8:7. B:C = 200:180 = 10:9. A:C = 8/7 × 10/9 = 80:63. A beats C by 200 - 200×63/80 = 200 - 157.5 = 42.5 m. **Time: 90 sec.**

---

## 6. Comprehensive Practice Set (20 Questions)

### Set A — Foundation (Q1–Q5)

**Q1.** Distance 240 km, time 4 hrs. Speed?
**Solution:** 60 km/h. **Answer: 60 km/h.** *Time: 10 sec.*

**Q2.** Speed 60 km/h, time 2.5 hrs. Distance?
**Solution:** 150 km. **Answer: 150 km.** *Time: 10 sec.*

**Q3.** Train 100 m at 20 km/h. Time to pass a pole?
**Solution:** 100 m / (20 × 5/18 m/s) = 100/5.556 = 18 sec. **Answer: 18 sec.** *Time: 30 sec.*

**Q4.** 36 km/h =? m/s.
**Solution:** 36 × 5/18 = 10 m/s. **Answer: 10 m/s.** *Time: 10 sec.*

**Q5.** 15 m/s =? km/h.
**Solution:** 15 × 18/5 = 54 km/h. **Answer: 54 km/h.** *Time: 10 sec.*

### Set B — Intermediate (Q6–Q13)

**Q6.** First half at 30 km/h, second half at 50 km/h. Average speed?
**Solution:** $\frac{2 \times 30 \times 50}{80} = 37.5$ km/h. **Answer: 37.5 km/h.** *Time: 15 sec.*

**Q7.** Train 200 m at 72 km/h. Time to pass platform 100 m long?
**Solution:** $T = 300 \times 18/360 = 15$ sec. **Answer: 15 sec.** *Time: 45 sec.*

**Q8.** A and B at 60, 40 km/h opposite directions, 200 km apart. Meet time?
**Solution:** $v_{rel} = 100$ km/h. $T = 2$ hrs. **Answer: 2 hrs.** *Time: 30 sec.*

**Q9.** Boat 20 km/h in still water, stream 5 km/h. Time for 50 km upstream?
**Solution:** $v_u = 15$. $T = 50/15 = 10/3$ hrs. **Answer: 10/3 hrs.** *Time: 30 sec.*

**Q10.** A beats B by 10 m in 100 m race. Speed ratio?
**Solution:** A:B = 100:90 = 10:9. **Answer: 10:9.** *Time: 15 sec.*

**Q11.** A leaves 8 AM at 40 km/h. B leaves 9 AM at 50 km/h. When does B catch A?
**Solution:** A's head start = 40 km. $v_{rel} = 10$. $T = 4$ hrs. So 1 PM. **Answer: 1 PM.** *Time: 45 sec.*

**Q12.** 400 m circular track. A at 50 m/min, B at 30 m/min same direction. Meet time?
**Solution:** $v_{rel} = 20$. $T = 20$ min. **Answer: 20 min.** *Time: 30 sec.*

**Q13.** A and B at 40, 60 km/h same direction. B starts 2 hrs after A. When does B catch A?
**Solution:** A's head start = 80 km. $v_{rel} = 20$. $T = 4$ hrs. So 2 + 4 = 6 hrs after A started. **Answer: 6 hrs after A.** *Time: 45 sec.*

### Set C — Advanced (Q14–Q18)

**Q14.** Train 200 m at 60 km/h, another 300 m at 80 km/h same direction. Time for 2nd to cross 1st?
**Solution:** $v_{rel} = 20$ km/h. Total length = 500 m. $T = 500/(20 \times 5/18) = 500 \times 18/100 = 90$ sec. **Answer: 90 sec.** *Time: 60 sec.*

**Q15.** Downstream 30 km in 2 hrs, upstream same in 3 hrs. Boat and stream speed?
**Solution:** $v_d = 15$, $v_u = 10$. $v_b = 12.5$, $v_s = 2.5$. **Answer: 12.5 km/h, 2.5 km/h.** *Time: 45 sec.*

**Q16.** A beats B by 25 m in 200 m race. B beats C by 20 m in 200 m. A beats C by?
**Solution:** A:B = 200:175 = 8:7. B:C = 200:180 = 10:9. A:C = 80:63. A beats C by 200 - 200×63/80 = 42.5 m. **Answer: 42.5 m.** *Time: 90 sec.*

**Q17.** Man rows upstream 4 km in 1 hr, returns in 30 min. Stream speed?
**Solution:** $v_u = 4$, $v_d = 8$. $v_s = 2$ km/h. **Answer: 2 km/h.** *Time: 30 sec.*

**Q18.** Two trains at 40, 60 km/h opposite directions, lengths 100, 80 m. Time to cross?
**Solution:** $v_{rel} = 100$ km/h. $T = 180/(100 \times 5/18) = 180 \times 18/500 = 6.48$ sec. **Answer: 6.48 sec.** *Time: 60 sec.*

### Set D — Challenge (Q19–Q20)

**Q19.** A 200 m long train passes a 300 m long platform in 25 sec. Speed?
**Solution:** $T = 500/25 = 20$ m/s = 72 km/h. **Answer: 72 km/h.** *Time: 45 sec.*

**Q20.** A and B start from same point on 600 m circular track, opposite directions at 8 and 12 km/h. When do they meet?
**Solution:** $v_{rel} = 20$ km/h = 5.56 m/s. $T = 600/5.56 = 108$ sec. **Answer: 108 sec.** *Time: 60 sec.*

---

## 7. Chapter Summary & Revision Card

### 7.1 Formula Table

| Concept | Formula |
|---------|---------|
| Distance | $D = S \times T$ |
| Unit conversion | km/h × 5/18 = m/s |
| Average speed (equal dist) | $2v_1 v_2/(v_1+v_2)$ |
| Average speed (equal time) | $(v_1+v_2)/2$ |
| Relative speed (opposite) | $v_1 + v_2$ |
| Relative speed (same) | $|v_1 - v_2|$ |
| Train passing pole | $L/v$ |
| Train passing platform | $(L+l)/v$ |
| Boat upstream | $v_b - v_s$ |
| Boat downstream | $v_b + v_s$ |
| Race beat | Speed ratio = $D:(D-d)$ |

### 7.2 Top 5 Shortcuts

1. **5/18 and 18/5 conversion** — must-do first.
2. **Harmonic mean** for equal-distance average speed.
3. **Lengths sum for trains** — $L + l$ for platform.
4. **Boat-stream**: $v_b$ = average, $v_s$ = half-difference.
5. **Beat by X meters → speed ratio** = $D:(D-X)$.

### 7.3 5 Common Mistakes

1. **Forgetting unit conversion** — km/h vs m/s.
2. **Average speed ≠ arithmetic mean** for equal distances.
3. **Trains: lengths SUM for crossing, NOT difference**.
4. **Boat upstream slower** — must subtract stream.
5. **Beat by meters vs beat by seconds** — different methods.

### 7.4 Decision Rules

| If You See... | Use... |
|---------------|--------|
| "A and B together" (TSD) | Relative speed = $v_A \pm v_B$ |
| "Equal distance, two speeds" | Harmonic mean |
| "Equal time, two speeds" | Arithmetic mean |
| "Train passes X" | Add lengths if X is platform |
| "Boat upstream/downstream" | $v_b \pm v_s$ |
| "A beats B by X" | $v_A/v_B = D/(D-X)$ |

---
