# Chapter 5: Physics — Electricity

> **Chapter Overview:** This chapter consolidates NCERT Class 10 Chapter 11 (Electricity). It is one of the highest-weightage topics in Physics sections of SSC CGL, RRB NTPC, IBPS, and other competitive exams — typically 3-5 questions per paper. Topics: electric charge, current, potential difference, Ohm's law, V-I characteristics, resistance, resistivity, series and parallel combinations, Joule's law of heating, electric power, commercial unit of energy (kWh), fuses, household circuits.
>
> **Primary sources:** NCERT Class 10 Science textbook (Reprint 2025-26), Ch. 11, pp. 171-194.

---

## 1. Comprehensive Theory

### 1.1 Electric Current

A continuous and closed path of an electric current is called an **electric circuit**. If the circuit is broken anywhere (e.g., switch off), the current stops flowing and the bulb does not glow.

If a net charge $Q$ flows across any cross-section of a conductor in time $t$, then the current $I$ through the cross-section is:

$$I = \frac{Q}{t}$$

**SI unit of electric charge:** coulomb (C) — equivalent to the charge contained in nearly $6 \times 10^{18}$ electrons (an electron has charge $1.6 \times 10^{-19}$ C).

**SI unit of electric current:** ampere (A), named after French scientist André-Marie Ampère (1775–1836). 1 A = 1 C/s. Smaller quantities: milliampere (1 mA = $10^{-3}$ A), microampere (1 μA = $10^{-6}$ A).

**Direction of current:** Conventionally, the direction of electric current is taken as **opposite** to the direction of flow of electrons (which are negative charges). Current flows in the circuit from the **positive terminal** of the cell to the **negative terminal** through the bulb and ammeter.

**Ammeter:** An instrument that measures electric current in a circuit. It is always connected in **series** in a circuit.

### 1.2 Electric Potential and Potential Difference

Just as water in a horizontal tube does not flow by itself, charges do not flow in a copper wire by themselves. For charges to flow, there must be a difference of electric pressure — called **potential difference** — produced by a battery.

**Definition:** The electric potential difference between two points in an electric circuit carrying some current is the work done to move a unit charge from one point to the other:

$$V = \frac{W}{Q}$$

**SI unit:** volt (V), named after Alessandro Volta (1745–1827), Italian physicist. $1 \text{ V} = 1 \text{ J/C} = 1 \text{ J C}^{-1}$.

**Definition:** 1 volt is the potential difference between two points in a current-carrying conductor when 1 joule of work is done to move a charge of 1 coulomb from one point to the other.

**Voltmeter:** Measures potential difference; always connected in **parallel** across the points between which the potential difference is to be measured.

### 1.3 Circuit Symbols (Table 11.1)

| Component | Symbol |
|-----------|--------|
| An electric cell | Two parallel lines (one long, one short) |
| A battery or combination of cells | Multiple cells in series |
| Plug key or switch (open) | Open circuit symbol |
| Plug key or switch (closed) | Closed circuit symbol |
| A wire joint | Filled dot at junction |
| Wires crossing without joining | Bridge over crossing |
| Electric bulb | Circle with × inside |
| A resistor of resistance R | Rectangular box |
| Variable resistance / rheostat | Resistor with arrow through |
| Ammeter | Circle with A |
| Voltmeter | Circle with V |

### 1.4 Ohm's Law

In 1827, German physicist **Georg Simon Ohm (1787–1854)** found the relationship between current I, flowing in a metallic wire, and the potential difference V across its terminals:

> The potential difference V, across the ends of a given metallic wire in an electric circuit, is **directly proportional to the current** flowing through it, **provided its temperature remains the same**.

$$V \propto I \quad \text{or} \quad V = IR$$

**Resistance** $R$ is a constant for the given metallic wire at a given temperature — it is the property of a conductor to resist the flow of charges through it. Its SI unit is **ohm** (Ω):

$$R = \frac{V}{I}$$

If V = 1 V and I = 1 A, then R = 1 Ω, so 1 Ω = 1 V/1 A.

**V–I graph:** A straight line passing through the origin. The slope gives R.

### 1.5 Factors Affecting Resistance

The resistance of a conductor depends on:

1. **Length (l):** $R \propto l$
2. **Area of cross-section (A):** $R \propto 1/A$
3. **Nature of the material**

Combining these:

$$R = \rho \frac{l}{A}$$

where $\rho$ (rho) is a constant of proportionality called the **electrical resistivity** of the material. SI unit: Ω·m. It is a characteristic property of the material.

**Conductors vs insulators:** Metals and alloys have very low resistivity in the range $10^{-8}$ Ω·m to $10^{-6}$ Ω·m (good conductors). Insulators like rubber and glass have resistivity of the order of $10^{12}$ to $10^{17}$ Ω·m. Both resistance and resistivity vary with temperature.

**Table 11.2 — Electrical resistivity of some substances at 20°C:**

| Material | Resistivity (Ω·m) |
|----------|------------------|
| Silver | $1.60 \times 10^{-8}$ |
| Copper | $1.62 \times 10^{-8}$ |
| Aluminium | $2.63 \times 10^{-8}$ |
| Tungsten | $5.20 \times 10^{-8}$ |
| Iron | $10.0 \times 10^{-8}$ |
| Mercury | $94.0 \times 10^{-8}$ |
| Nichrome (alloy) | $100 \times 10^{-6}$ |
| Manganin (alloy) | $44 \times 10^{-6}$ |
| Constantan (alloy) | $49 \times 10^{-6}$ |
| Glass | $10^{10}$–$10^{14}$ |
| Hard rubber | $10^{13}$–$10^{16}$ |
| Diamond | $10^{12}$–$10^{13}$ |

**Key facts:**

- Alloys generally have higher resistivity than their constituent metals.
- Alloys do not oxidise (burn) readily at high temperatures → used in electric heating devices (electric iron, toasters).
- **Tungsten** is used almost exclusively for filaments of electric bulbs.
- **Copper and aluminium** are generally used for electrical transmission lines.

### 1.6 Resistors in Series

When several resistors are joined in **series**, the resistance of the combination $R_s$ equals the sum of their individual resistances:

$$R_s = R_1 + R_2 + R_3 + \ldots$$

**Key properties of series combination:**

- The current through each resistor is the **same** (the same current flows through every part of the circuit).
- The total potential difference across the combination is the **sum** of potential differences across individual resistors: $V = V_1 + V_2 + V_3$.
- The equivalent resistance is **greater** than any individual resistance.
- **Disadvantage:** When one component fails, the entire circuit is broken; none of the components works (e.g., old "fairy lights" in series).

### 1.7 Resistors in Parallel

When several resistors are connected in **parallel**, the reciprocal of the equivalent resistance equals the sum of reciprocals of the individual resistances:

$$\frac{1}{R_p} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3} + \ldots$$

**Key properties of parallel combination:**

- The **potential difference** across each resistor is the **same** (= V, the source voltage).
- The **total current** I is the sum of currents through individual branches: $I = I_1 + I_2 + I_3$.
- The total resistance is **less than** the smallest individual resistance.
- **Advantage:** Each appliance has the same potential difference and can be operated independently; failure of one does not affect others.

**Why parallel circuits are used in homes:** Appliances have different resistances and need different currents; series connection would be impracticable.

### 1.8 Heating Effect of Electric Current — Joule's Law

When current flows through a resistor, the source energy continually gets dissipated in the form of heat — this is the **heating effect of electric current**.

The work done in moving charge Q through a potential difference V in time t is $V \times Q$. The power input is $P = V \times Q/t = VI$. The energy supplied in time t is $VIt$. This energy is dissipated in the resistor as heat:

$$H = VIt = I^2Rt \quad \text{(Joule's law of heating)}$$

**Joule's law states:** Heat produced in a resistor is:
- (i) Directly proportional to the **square of current** ($H \propto I^2$) for a given resistance.
- (ii) Directly proportional to **resistance** ($H \propto R$) for a given current.
- (iii) Directly proportional to the **time** ($H \propto t$) for which the current flows.

**Applications of heating effect:**

- **Electric heating devices:** Laundry iron, toaster, oven, kettle, heater — based on Joule heating.
- **Electric bulb:** Tungsten filament (melting point 3380°C) glows when heated; bulbs usually filled with nitrogen and argon (chemically inactive) to prolong filament life.
- **Electric fuse:** Piece of wire (aluminium, copper, iron, lead) of appropriate melting point. If current exceeds the specified value, fuse melts and breaks the circuit. Fuses are rated 1 A, 2 A, 3 A, 5 A, 10 A, etc.

### 1.9 Electric Power

The rate at which electric energy is dissipated or consumed in an electric circuit is called **electric power**:

$$P = VI = I^2R = \frac{V^2}{R}$$

**SI unit:** watt (W). 1 W = 1 V × 1 A = 1 VA. 1 W is the power consumed by a device that carries 1 A of current when operated at a potential difference of 1 V.

**Larger units:** kilowatt (kW) = 1000 W.

**Commercial unit of electric energy:** **kilowatt hour (kWh)**, commonly called "unit":

$$1 \text{ kWh} = 1000 \text{ W} \times 3600 \text{ s} = 3.6 \times 10^6 \text{ J}$$

### 1.10 Domestic Electric Circuits

In our homes, we receive AC electric power of **220 V** with a frequency of **50 Hz**. The main wires:

- **Live wire (positive):** Red insulation cover; potential 220 V relative to earth.
- **Neutral wire (negative):** Black insulation.
- **Earth wire:** Green insulation, connected to a metal plate deep in the earth.

In each separate circuit, different appliances are connected across the live and neutral wires, each with a separate ON/OFF switch, all connected in **parallel** so each appliance has the same potential difference.

**Two circuit ratings:**

- **15 A** for high-power appliances (geysers, air coolers).
- **5 A** for bulbs, fans.

**Earth wire function:** Connected to the metallic body of appliances (electric press, toaster, refrigerator). Provides a low-resistance conducting path for current if there's a leakage, ensuring the user does not get a severe electric shock.

**Short-circuiting and overloading:**

- **Short circuit:** When the live wire and neutral wire come into direct contact (damaged insulation, appliance fault). The current abruptly increases.
- **Overloading:** Connecting too many appliances to a single socket, or accidental hike in supply voltage. The fuse melts due to Joule heating and breaks the circuit, preventing damage.

---

## 2. Key Formulas, Units & Constants

| Formula | Meaning | SI Unit | Application |
|---------|---------|---------|-------------|
| $I = Q/t$ | Electric current | A (ampere) | Charge flowing per second |
| $V = W/Q$ | Potential difference | V (volt) | Work per unit charge |
| $V = IR$ | Ohm's law | — | V-I relationship |
| $R = \rho l/A$ | Resistance of conductor | Ω | Length, area, material dependence |
| $R_s = R_1 + R_2 + \ldots$ | Series combination | Ω | Total resistance in series |
| $\frac{1}{R_p} = \frac{1}{R_1} + \frac{1}{R_2} + \ldots$ | Parallel combination | Ω | Total resistance in parallel |
| $H = I^2Rt$ | Joule heating | J | Heat produced |
| $P = VI = I^2R = V^2/R$ | Electric power | W | Power dissipated |
| $E = Pt$ | Electrical energy | J or kWh | Energy consumed |
| 1 kWh | = 3.6 × 10⁶ J | — | Commercial unit of energy |
| $1.6 \times 10^{-19}$ C | Charge of one electron | C | Elementary charge |
| $6 \times 10^{18}$ electrons | 1 C of charge | — | Charge per electron |

---

## 3. Everyday Science & Applications

**Q1: Why does a bulb glow when current flows through it?**
A: The filament (tungsten) has high resistance and high melting point (3380°C). When current flows, Joule heating raises the temperature, and the filament glows white-hot, emitting light.

**Q2: Why are electric bulbs filled with inert gases (nitrogen/argon)?**
A: To prolong the life of the filament by preventing oxidation (burning) at high temperatures.

**Q3: Why is the cord of an electric heater not heated/glowing but the heating element does?**
A: The cord is made of thick copper wire with very low resistance, so very little heat is produced (H = I²Rt). The heating element is made of nichrome (high resistance), so a lot of heat is produced.

**Q4: Why are heating coils made of alloys (nichrome) rather than pure metals?**
A: Alloys have higher resistivity than pure metals, produce more heat per unit current, and don't oxidise (burn) at high temperatures.

**Q5: Why are copper and aluminium wires used for electrical transmission?**
A: They have very low resistivity ($1.62 \times 10^{-8}$ Ω·m for Cu; $2.63 \times 10^{-8}$ Ω·m for Al) → low energy loss as heat.

**Q6: Why are home appliances connected in parallel, not in series?**
A: In series, the same current would flow through all appliances — but they need different currents to operate. Also, if one fails, all stop. In parallel, each gets the full 220 V and can be operated independently.

**Q7: What is the function of a fuse?**
A: A fuse is a safety device that protects circuits from damage due to overloading or short-circuiting. It contains a wire of low melting point that melts (breaks the circuit) when the current exceeds a safe value.

**Q8: Why is the earth wire used?**
A: It is connected to the metal body of an appliance. In case of current leakage to the body, the earth wire provides a low-resistance path, preventing severe electric shock to the user.

**Q9: Why does an electric fan become warm if used continuously?**
A: Some part of the source energy is expended in heat to raise the temperature of the gadget, even in useful devices.

**Q10: What is a short circuit?**
A: When the live and neutral wires come into direct contact (due to damaged insulation), the resistance in the circuit becomes almost zero, and the current rises abruptly — this is a short circuit. The fuse blows to prevent damage.

**Q11: How does a higher current affect the fuse rating?**
A: For an electric iron consuming 1 kW at 220 V, the current is 1000/220 = 4.54 A. A 5 A fuse must be used — a fuse rated lower would blow unnecessarily.

**Q12: What happens if a 100 W bulb is operated on a voltage lower than its rated 220 V?**
A: Power consumed = $V^2/R$ → if V is halved, power becomes 1/4 (25 W). The bulb glows dimmer.

**Q13: Why does a thicker wire have lower resistance?**
A: Resistance is inversely proportional to the cross-sectional area (R = ρl/A). A thicker wire has larger area → lower resistance.

**Q14: Why does the direction of conventional current oppose electron flow?**
A: At the time of discovery, electrons were unknown, so the direction of positive charge flow was taken as the current direction. Later, when electrons (negative) were discovered, the convention was kept.

**Q15: Why is a "kWh" used as a commercial unit rather than joule?**
A: Joule is a very small unit; for household consumption over days, joules would be unwieldy. 1 kWh = 3.6 × 10⁶ J is more practical.

**Q16: Why is the current the same throughout a series circuit?**
A: Charge is conserved. The same amount of charge that enters the circuit at one end must leave at the other end at every moment; otherwise, charge would accumulate somewhere, which doesn't happen.

**Q17: What is the role of the ammeter being connected in series?**
A: An ammeter has very low resistance. If connected in parallel, it would short-circuit the component. Connected in series, it measures the current without affecting the circuit.

**Q18: What is the role of the voltmeter being connected in parallel?**
A: A voltmeter has very high resistance. Connected in parallel, it draws negligible current, so the potential difference is measured accurately.

---

## 4. Important Facts & One-Liners

1. **SI unit of current:** ampere (A) = 1 C/s.
2. **SI unit of charge:** coulomb (C) = charge of ~$6 \times 10^{18}$ electrons.
3. **SI unit of potential difference:** volt (V); 1 V = 1 J/C.
4. **SI unit of resistance:** ohm (Ω); 1 Ω = 1 V/1 A.
5. **SI unit of resistivity:** Ω·m.
6. **SI unit of power:** watt (W).
7. **Commercial unit of energy:** kWh (= 3.6 × 10⁶ J).
8. **Ohm's law:** V = IR (at constant temperature).
9. **Best conductor:** Silver (resistivity $1.60 \times 10^{-8}$ Ω·m).
10. **Worst conductor (in table):** Diamond (resistivity $10^{12}$–$10^{13}$ Ω·m).
11. **Filament material:** Tungsten (melting point 3380°C).
12. **Heating coil material:** Nichrome (an alloy of Ni, Cr, Mn, Fe).
13. **Resistance wires:** Manganin and constantan (low temperature coefficient).
14. **House supply voltage:** 220 V, 50 Hz, AC.
15. **Live wire colour:** Red.
16. **Neutral wire colour:** Black.
17. **Earth wire colour:** Green.
18. **Charge of electron:** $1.6 \times 10^{-19}$ C (negative).
19. **Direction of conventional current:** Opposite to electron flow.
20. **Joule's law of heating:** H = I²Rt.
21. **Series combination:** $R_s = R_1 + R_2 + \ldots$ (greater than any individual).
22. **Parallel combination:** $\frac{1}{R_p} = \frac{1}{R_1} + \frac{1}{R_2} + \ldots$ (less than the smallest).
23. **Ammeter:** Connected in **series**; very low resistance.
24. **Voltmeter:** Connected in **parallel**; very high resistance.
25. **Georg Simon Ohm:** Discovered Ohm's law in 1827 (German physicist).
26. **André-Marie Ampère:** French scientist (1775–1836); unit of current named after him.
27. **Alessandro Volta:** Italian physicist (1745–1827); unit of voltage named after him.
28. **Domestic circuit rating:** 5 A (bulbs, fans), 15 A (geysers, coolers).
29. **Fuse rating example:** A 1 kW iron at 220 V draws 4.54 A → 5 A fuse.
30. **Fuse materials:** Aluminium, copper, iron, lead (low melting point).

---

## 5. Solved Numerical Problems

### Problem 1 (Easy — Ohm's law)
**A current of 0.5 A is drawn by a filament of an electric bulb for 10 minutes. Find the charge that flows through the circuit.**

**Solution:**
$I = 0.5$ A, $t = 10$ min = 600 s.
$Q = It = 0.5 \times 600 = 300$ C.

### Problem 2 (Easy — Work done)
**How much work is done in moving a charge of 2 C across two points having a potential difference of 12 V?**

**Solution:**
$V = 12$ V, $Q = 2$ C.
$W = VQ = 12 \times 2 = 24$ J.

### Problem 3 (Easy — Current calculation)
**(a) How much current will an electric bulb draw from a 220 V source if the resistance of the bulb filament is 1200 Ω? (b) How much current will a 100 Ω heater coil draw from the same source?**

**Solution:**
(a) $I = V/R = 220/1200 = 0.18$ A.
(b) $I = 220/100 = 2.2$ A.

### Problem 4 (Medium — Series)
**An electric lamp of resistance 20 Ω and a conductor of 4 Ω are connected in series to a 6 V battery. Calculate (a) total resistance, (b) current, (c) potential difference across the lamp and the conductor.**

**Solution:**
$R_s = 20 + 4 = 24$ Ω.
$I = V/R = 6/24 = 0.25$ A.
$V_{lamp} = 20 \times 0.25 = 5$ V.
$V_{conductor} = 4 \times 0.25 = 1$ V.

### Problem 5 (Medium — Parallel)
**Resistors 5 Ω, 10 Ω, 30 Ω are connected in parallel to a 12 V battery. Find (a) current through each, (b) total current, (c) total resistance.**

**Solution:**
$I_1 = 12/5 = 2.4$ A.
$I_2 = 12/10 = 1.2$ A.
$I_3 = 12/30 = 0.4$ A.
$I_{total} = 2.4 + 1.2 + 0.4 = 4$ A.
$1/R_p = 1/5 + 1/10 + 1/30 = (6 + 3 + 1)/30 = 10/30 = 1/3$. $R_p = 3$ Ω.

### Problem 6 (Medium — Power)
**An electric iron consumes energy at a rate of 840 W when heating is at the maximum rate and 360 W when at the minimum. The voltage is 220 V. What are the current and resistance in each case?**

**Solution:**
(a) Max: $I = P/V = 840/220 = 3.82$ A; $R = V/I = 220/3.82 = 57.6$ Ω.
(b) Min: $I = 360/220 = 1.64$ A; $R = 220/1.64 = 134.15$ Ω.

### Problem 7 (Medium — Heating)
**100 J of heat is produced each second in a 4 Ω resistor. Find the potential difference across it.**

**Solution:**
$H = 100$ J, $R = 4$ Ω, $t = 1$ s.
$I = \sqrt{H/Rt} = \sqrt{100/4} = 5$ A.
$V = IR = 5 \times 4 = 20$ V.

### Problem 8 (Hard — Cost calculation)
**An electric refrigerator rated 400 W operates 8 hours/day. What is the cost of the energy to operate it for 30 days at ₹3.00 per kWh?**

**Solution:**
Energy = 400 W × 8 h/day × 30 days = 96,000 Wh = 96 kWh.
Cost = 96 × 3 = ₹288.

---

## 6. Practice MCQs (25 Questions)

### Set A — Fact-Based (10 Qs)

**Q1. The SI unit of electric current is:**
(a) Volt
(b) Coulomb
(c) Ampere
(d) Ohm

✅ **(c) Ampere**

**Q2. The commercial unit of electrical energy is:**
(a) Joule
(b) Watt
(c) Watt-hour
(d) Kilowatt-hour

✅ **(d) Kilowatt-hour (kWh)**

**Q3. An ammeter is connected in:**
(a) Parallel
(b) Series
(c) Both series and parallel
(d) None of these

✅ **(b) Series**

**Q4. The resistance of a conductor depends on:**
(a) Length only
(b) Cross-sectional area only
(c) Material only
(d) Length, area, and material

✅ **(d) Length, area, and material**

**Q5. The filament of an electric bulb is made of:**
(a) Copper
(b) Nichrome
(c) Tungsten
(d) Aluminium

✅ **(c) Tungsten**

**Q6. The heating coils of an electric iron are made of:**
(a) Copper
(b) Nichrome
(c) Tungsten
(d) Manganin

✅ **(b) Nichrome**

**Q7. 1 kWh is equal to:**
(a) 3.6 × 10³ J
(b) 3.6 × 10⁶ J
(c) 36 × 10⁶ J
(d) 36 × 10⁵ J

✅ **(b) 3.6 × 10⁶ J**

**Q8. The colour of the earth wire in a domestic circuit is:**
(a) Red
(b) Black
(c) Green
(d) Blue

✅ **(c) Green**

**Q9. The colour of the live wire in a domestic circuit is:**
(a) Red
(b) Black
(c) Green
(d) Yellow

✅ **(a) Red**

**Q10. The direction of conventional current is:**
(a) Same as electron flow
(b) Opposite to electron flow
(c) Perpendicular to electron flow
(d) Unrelated to electron flow

✅ **(b) Opposite to electron flow**

### Set B — Application-Based (8 Qs)

**Q11. When three resistors of 2 Ω, 4 Ω, and 6 Ω are connected in series, the total resistance is:**
(a) 1 Ω
(b) 6 Ω
(c) 12 Ω
(d) 2 Ω

✅ **(c) 12 Ω** ($R_s = 2 + 4 + 6$)

**Q12. When three resistors of 2 Ω, 4 Ω, and 6 Ω are connected in parallel, the total resistance is:**
(a) 12 Ω
(b) 1.09 Ω
(c) 0.92 Ω
(d) 0.5 Ω

✅ **(b) ~1.09 Ω**

**Solution:** $1/R_p = 1/2 + 1/4 + 1/6 = 6/12 + 3/12 + 2/12 = 11/12$, $R_p = 12/11 = 1.09$ Ω.

**Q13. A 100 W bulb and a 60 W bulb are connected in parallel to a 220 V supply. The current drawn from the line is:**
(a) 0.73 A
(b) 1.6 A
(c) 0.27 A
(d) 16 A

✅ **(a) 0.73 A**

**Solution:** $I = P_1/V + P_2/V = 100/220 + 60/220 = 0.727$ A.

**Q14. A wire of resistance 4 Ω is doubled on itself. The new resistance is:**
(a) 1 Ω
(b) 2 Ω
(c) 4 Ω
(d) 8 Ω

✅ **(a) 1 Ω**

**Solution:** Doubling halves the length (l/2) and doubles the area (2A). $R' = \rho(l/2)/(2A) = R/4 = 1$ Ω.

**Q15. Two wires of the same material, same length, but one is thicker. The thicker wire has:**
(a) Higher resistance
(b) Lower resistance
(c) Same resistance
(d) Depends on the material

✅ **(b) Lower resistance** ($R \propto 1/A$)

**Q16. The current in a circuit is 2 A. If the potential difference is doubled, the current becomes:**
(a) 1 A
(b) 2 A
(c) 4 A
(d) Depends on the resistance

✅ **(c) 4 A** (if R is constant, I ∝ V)

**Q17. The power dissipated in a 10 Ω resistor carrying 2 A is:**
(a) 20 W
(b) 40 W
(c) 80 W
(d) 200 W

✅ **(b) 40 W** ($P = I^2 R = 4 \times 10$)

**Q18. If a 250 W TV is used for 1 hour, the energy consumed is:**
(a) 250 J
(b) 250 Wh (= 0.25 kWh)
(c) 250 kWh
(d) 900 kJ

✅ **(b) 250 Wh = 0.25 kWh = 9 × 10⁵ J**

### Set C — Numerical/Process (5 Qs)

**Q19. A current of 0.2 A flows through a resistor of 100 Ω for 5 minutes. The heat produced is:**
(a) 120 J
(b) 1200 J
(c) 12000 J
(d) 120000 J

✅ **(b) 1200 J**

**Solution:** $H = I^2Rt = (0.2)^2 \times 100 \times (5 \times 60) = 0.04 \times 100 \times 300 = 1200$ J.

**Q20. An electric heater draws 5 A from a 220 V source. The power of the heater is:**
(a) 44 W
(b) 110 W
(c) 1100 W
(d) 2200 W

✅ **(c) 1100 W** ($P = VI = 220 \times 5$)

**Q21. A copper wire has length 2 m and area $10^{-6}$ m². The resistance is:**
(a) 1.62 × 10⁻⁸ Ω
(b) 3.24 × 10⁻² Ω
(c) 3.24 × 10⁻⁸ Ω
(d) 0.0324 Ω

✅ **(d) 0.0324 Ω** ($R = \rho l/A = 1.62 \times 10^{-8} \times 2 / 10^{-6} = 0.0324$)

**Q22. A 12 V battery is connected to a 4 Ω resistor. The current flowing is:**
(a) 0.33 A
(b) 3 A
(c) 48 A
(d) 16 A

✅ **(b) 3 A** ($I = V/R = 12/4$)

**Q23. If the resistance of a 60 W bulb at 220 V is 800 Ω, the resistance of a 100 W bulb at 220 V is:**
(a) 484 Ω
(b) 800 Ω
(c) 1210 Ω
(d) 220 Ω

✅ **(a) 484 Ω** ($R = V^2/P = 220^2/100 = 484$)

### Set D — Assertion-Reasoning (2 Qs)

**Q24. Assertion (A):** The resistance of a wire increases with temperature.
**Reason (R):** Metals have more collisions of electrons at higher temperatures, impeding their flow.

(a) Both A and R are true, and R is the correct explanation of A.
(b) Both A and R are true, but R is not the correct explanation of A.
(c) A is true but R is false.
(d) A is false but R is true.

✅ **(a)**

**Q25. Assertion (A):** Household circuits are connected in parallel.
**Reason (R):** In parallel, each appliance gets the same potential difference and can be operated independently.

(a) Both A and R are true, and R is the correct explanation of A.
(b) Both A and R are true, but R is not the correct explanation of A.
(c) A is true but R is false.
(d) A is false but R is true.

✅ **(a)**

---
