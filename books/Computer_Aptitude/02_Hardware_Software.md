# Computer Hardware & Software

## 1. Core Concepts

### 1.1 What is a Computer?

A computer is an electronic device that takes **input**, processes it, and produces **output** following an **IPO (Input-Process-Output) cycle**.

```
        INPUT              PROCESS              OUTPUT
    ┌──────────┐      ┌──────────┐       ┌──────────┐
    │  Keyboard │  →  │   CPU    │   →   │  Monitor │
    │   Mouse   │      │  Memory  │       │  Printer │
    │  Scanner  │      │          │       │  Speaker │
    └──────────┘      └──────────┘       └──────────┘
```

**Key Characteristics**:
- Works with high speed and accuracy
- Has no intelligence of its own
- Stores data and instructions for future use
- Executes programmed instructions

### 1.2 Computer Organisation

A computer is organised into three basic units:
1. **Central Processing Unit (CPU)**
2. **Memory Unit**
3. **Input/Output Unit**

Computer has two main parts:
- **Hardware** — physical components
- **Software** — set of instructions

### 1.3 Historical Evolution

| Year | Development | Inventor |
|---|---|---|
| ~3000 BC | Abacus | Ancient |
| 1617 | Napier's Bones | John Napier |
| 1642 | Pascaline | Blaise Pascal |
| 1671 | Leibniz Calculator | G.W. Leibniz |
| 1822 | Difference Engine | Charles Babbage |
| 1837 | Analytical Engine | Charles Babbage (Father of Computer) |
| 1890 | Tabulating Machine | Herman Hollerith |
| 1944 | Mark-I | Howard Aiken |
| 1946 | ENIAC | J. Presper Eckert & John Mauchly |
| 1949 | EDVAC (stored-program) | John von Neumann |
| 1951 | UNIVAC-I (first commercial) | Eckert & Mauchly |

**First computer programmer**: Lady Ada Augusta Lovelace (student of Charles Babbage)

### 1.4 Generations of Computer

| Generation | Period | Technology | Examples | Language | Speed |
|---|---|---|---|---|---|
| **1st** | 1940-1956 | Vacuum Tubes | ENIAC, EDVAC, UNIVAC-I, IBM 701 | Machine (0,1) | Milliseconds |
| **2nd** | 1957-1963 | Transistors | IBM 1400, IBM 7094, CDC 1604 | Assembly | Microseconds |
| **3rd** | 1964-1971 | Integrated Circuits (ICs) | IBM System/360, PDP-8 | High-level (C, COBOL) | Nanoseconds |
| **4th** | 1971-1985 | Microprocessors (VLSI) | IBM PC, Apple II | Very high-level (C++, Java) | Picoseconds |
| **5th** | 1985-Present | ULSI, AI-based | IBM Watson, AI systems | AI/ML-based | Ultra fast |

### 1.5 Types of Computers

**By Data Handling**:
1. **Analog Computer** — Continuous data (e.g., thermometer, speedometer)
2. **Digital Computer** — Discrete binary data (e.g., laptop, desktop, smartphone)
3. **Hybrid Computer** — Combines analog + digital (e.g., petrol pump processor)

**By Size/Power**:
1. **Personal Computer (Microcomputer)** — Single user
2. **Workstation** — Engineering applications (CAD/CAM)
3. **Minicomputer** — Multi-user (5-50x more than PC)
4. **Mainframe Computer** — 100+ users via time-sharing
5. **Supercomputer** — Most powerful; first: CDC 6600 (1964); Cray developed in 1976
6. **Quantum Computer** — Uses Qubits (still developing)

**India-specific Supercomputers**:
- **AIRAWAT-PSAI**: India's fastest supercomputer (as of 2025)
- **Paramishan**: Developed by C-DAC/IIT Guwahati (2016)
- World's fastest (as of 2025): **El Capitan** (USA)

---

## 2. CPU — Central Processing Unit

### 2.1 CPU Components

The CPU has three main components:

1. **ALU (Arithmetic Logic Unit)** — Performs arithmetic (+, -, ×, ÷) and logical (AND, OR, NOT) operations
2. **CU (Control Unit)** — Controls and coordinates all computer operations; fetches, decodes, executes instructions
3. **Registers** — High-speed memory inside CPU for temporary storage

**CPU Operations (Fetch-Decode-Execute cycle)**:
```
Fetch instruction → Decode instruction → Execute → Store result → Repeat
```

### 2.2 CPU Terminology
- **Clock Speed**: Measured in GHz (Gigahertz); 1 GHz = 1 billion cycles per second
- **Cores**: Multiple processing units (Dual-core, Quad-core, Octa-core)
- **Threads**: Virtual cores; each physical core can run 2 threads
- **Cache Memory**: L1, L2, L3 within CPU
- **Bus**: Data, Address, Control buses for communication

### 2.3 Bus Types in Computer
- **Data Bus**: Carries actual data (bi-directional)
- **Address Bus**: Carries memory addresses (unidirectional)
- **Control Bus**: Carries control signals (read/write)

---

## 3. Memory Hierarchy

### 3.1 Memory Units

```
            Memory Hierarchy (Speed ↓ Capacity ↑)
    ┌─────────────────────────────────────────┐
    │  Registers (fastest, smallest, in CPU)  │
    ├─────────────────────────────────────────┤
    │  Cache Memory (L1, L2, L3)              │
    ├─────────────────────────────────────────┤
    │  RAM (Primary/Main Memory)              │
    ├─────────────────────────────────────────┤
    │  Secondary Storage (HDD, SSD)           │
    └─────────────────────────────────────────┘
```

### 3.2 Data Measurement Units

| Unit | Equivalent |
|---|---|
| 1 Bit | 0 or 1 |
| 1 Nibble | 4 bits |
| 1 Byte | 8 bits |
| 1 KB (Kilobyte) | 1024 Bytes |
| 1 MB (Megabyte) | 1024 KB |
| 1 GB (Gigabyte) | 1024 MB |
| 1 TB (Terabyte) | 1024 GB |
| 1 PB (Petabyte) | 1024 TB |

### 3.3 RAM — Random Access Memory

- **Volatile** (data lost when power off)
- Primary memory; directly accessed by CPU
- Types:
  - **SRAM (Static RAM)**: Faster; uses flip-flops; cache memory; no refresh needed
  - **DRAM (Dynamic RAM)**: Needs periodic refresh; cheaper; main memory
  - **SDRAM, DDR, DDR2, DDR3, DDR4, DDR5**: Various generations

### 3.4 ROM — Read Only Memory

- **Non-volatile** (retains data without power)
- Stores boot instructions (firmware/BIOS)
- Types:
  - **ROM**: Original; programmed at factory
  - **PROM**: Programmable once
  - **EPROM**: Erasable via UV light
  - **EEPROM**: Electrically erasable; used for BIOS updates

### 3.5 Cache Memory

- High-speed memory between CPU and RAM
- Holds frequently used instructions/data
- **L1 Cache**: Smallest, fastest (in CPU core)
- **L2 Cache**: Larger than L1
- **L3 Cache**: Largest, shared across cores
- **Volatile**

### 3.6 Secondary Storage

**Magnetic Storage**:
- **HDD (Hard Disk Drive)**: Invented by IBM (Reynold B. Johnson); uses magnetic coating; large capacity; slow
- **Floppy Disk**: Portable magnetic storage; invented by IBM (Alan Shugart) 1967; commercial 1982; obsolete now
- **Magnetic Tape**: Sequential access; backup

**Optical Storage**:
- **CD (Compact Disc)**: ~700 MB; uses laser; CD-ROM, CD-R, CD-RW
- **DVD (Digital Versatile Disc)**: 4.7 GB single-layer; 8.5 GB dual-layer
- **Blu-ray**: 17 GB

**Solid State Storage**:
- **SSD (Solid State Drive)**: Flash memory; faster than HDD; no moving parts
- **Pen Drive / USB**: Portable flash memory

**Flash memory invented by**: Dr. Fujio Masuoka (Japanese engineer)

---

## 4. Input Devices

### 4.1 Common Input Devices
- **Keyboard**: Most common; QWERTY layout
- **Mouse**: Pointing device
- **Scanner**: Converts documents to digital
- **Joystick**: Gaming/control
- **Microphone**: Audio input
- **Webcam**: Video input
- **Barcode Reader**: Reads barcodes
- **OCR (Optical Character Reader)**: Reads printed text
- **MICR (Magnetic Ink Character Recognition)**: Used in cheque processing
- **OMR (Optical Mark Recognition)**: Reads marked answers
- **Touchpad/Touchscreen**: Direct input
- **Trackball**: Stationary pointing device
- **Light Pen**: Direct screen input
- **Digitizer**: Converts analog to digital

---

## 5. Output Devices

### 5.1 Common Output Devices
- **Monitor (VDU)**: Visual display
  - **CRT (Cathode Ray Tube)**: Old technology
  - **LCD (Liquid Crystal Display)**: Thin, common
  - **LED (Light Emitting Diode)**: Better contrast
  - **OLED**: Organic LED; better colours
- **Printer**: Hard copy output
  - **Impact**: Dot matrix, line printer
  - **Non-impact**: Inkjet, laser
- **Speakers**: Audio output
- **Plotter**: Large format printing (engineering drawings)
- **Projector**: Large screen display

---

## 6. Software

### 6.1 What is Software?

Software is a set of programs, procedures, and routines that instruct the computer to perform specific tasks. Software controls hardware and enables applications.

### 6.2 Types of Software

```
                SOFTWARE
                  │
    ┌─────────────┼─────────────┐
    │             │             │
SYSTEM         APPLICATION    PROGRAMMING
SOFTWARE       SOFTWARE       SOFTWARE
    │             │             │
  OS,           MS Office,    C, C++,
Utilities      Games,         Java
```

### 6.3 System Software

**Operating System (OS)**: Master program that manages hardware and software resources.

**Functions of OS**:
1. Process Management
2. Memory Management
3. File Management
4. Device Management
5. Security & Access Control
6. User Interface

**Popular Operating Systems**:

| OS | Developer | Type |
|---|---|---|
| **Windows** | Microsoft | Proprietary; most popular desktop |
| **macOS** | Apple | Proprietary; for Mac |
| **Linux** | Open Source (Linus Torvalds, 1991) | Free; multi-user |
| **UNIX** | Bell Labs (1969) by Ken Thompson | Multi-user, server |
| **Android** | Google (Open Handset Alliance) | Mobile |
| **iOS** | Apple | Mobile (iPhone/iPad) |

### 6.4 Linux Commands (Common)

- `mkdir` — Make directory
- `cd` — Change directory
- `ls` — List files
- `pwd` — Print working directory
- `rm` — Remove file
- `cp` — Copy file
- `mv` — Move file
- `cat` — Display file content
- `chmod` — Change permissions
- `chown` — Change ownership
- `sudo` — Superuser do
- `man` — Manual/help

### 6.5 Application Software

**General Purpose**:
- MS Office (Word, Excel, PowerPoint)
- Adobe Acrobat
- Browsers (Chrome, Firefox, Edge)

**Special Purpose**:
- Tally (Accounting)
- Medical software
- Engineering CAD/CAM
- Banking software

---

## 7. Key Terms Dictionary

| Term | Full Form | Definition |
|---|---|---|
| CPU | Central Processing Unit | Brain of computer |
| ALU | Arithmetic Logic Unit | Performs arithmetic/logic |
| CU | Control Unit | Coordinates operations |
| RAM | Random Access Memory | Volatile primary memory |
| ROM | Read Only Memory | Non-volatile boot memory |
| PROM | Programmable ROM | Programmable once |
| EPROM | Erasable PROM | UV-erasable |
| EEPROM | Electrically Erasable PROM | Electrically erasable |
| HDD | Hard Disk Drive | Magnetic storage |
| SSD | Solid State Drive | Flash storage |
| CD | Compact Disc | Optical storage |
| DVD | Digital Versatile Disc | Optical storage |
| OS | Operating System | Manages resources |
| GUI | Graphical User Interface | Visual interface |
| CLI | Command Line Interface | Text-based interface |
| NIC | Network Interface Card | Network adapter |
| BIOS | Basic Input Output System | Boot firmware |
| POST | Power-On Self-Test | Initial system check |
| UPS | Uninterruptible Power Supply | Backup power |
| SMPS | Switched Mode Power Supply | Power supply unit |

---

## 8. Keyboard Shortcuts & Practical Knowledge

### 8.1 Essential Shortcuts

| Shortcut | Action |
|---|---|
| Ctrl + C | Copy |
| Ctrl + V | Paste |
| Ctrl + X | Cut |
| Ctrl + Z | Undo |
| Ctrl + Y | Redo |
| Ctrl + S | Save |
| Ctrl + A | Select All |
| Ctrl + F | Find |
| Ctrl + P | Print |
| Ctrl + N | New |
| Ctrl + O | Open |
| Ctrl + T | New Tab (browser) |
| Ctrl + Shift + N | Incognito window (Chrome) |
| Ctrl + W | Close current window |
| Alt + Tab | Switch windows |
| Alt + F4 | Close program |
| F1 | Help |
| F2 | Rename |
| F5 | Refresh |
| F11 | Fullscreen toggle |

---

## 9. Comparison Tables

### 9.1 RAM vs ROM

| Feature | RAM | ROM |
|---|---|---|
| Volatility | Volatile | Non-volatile |
| Speed | Faster | Slower |
| Use | Temporary | Permanent (boot) |
| Writable | Yes | No (or limited) |
| Cost | Higher per GB | Lower |
| Types | SRAM, DRAM | ROM, PROM, EPROM |

### 9.2 SRAM vs DRAM

| Feature | SRAM | DRAM |
|---|---|---|
| Speed | Faster | Slower |
| Cost | Expensive | Cheap |
| Density | Low | High |
| Refresh | Not needed | Needed periodically |
| Use | Cache | Main memory |
| Power | More | Less |

### 9.3 HDD vs SSD

| Feature | HDD | SSD |
|---|---|---|
| Speed | Slower (ms) | Faster (μs) |
| Durability | Less (moving parts) | More (no moving parts) |
| Cost | Cheaper | Costlier |
| Capacity | Higher | Lower (typically) |
| Power | More | Less |
| Weight | Heavier | Lighter |

### 9.4 Windows vs Linux vs macOS

| Feature | Windows | Linux | macOS |
|---|---|---|---|
| Developer | Microsoft | Community | Apple |
| Cost | Paid (License) | Free | Bundled with Mac |
| Source | Closed | Open | Closed |
| Security | Less secure | More secure | More secure |
| Customisation | Limited | Highly customisable | Limited |
| Users | Most desktop | Servers, devs | Creative pros |

---

## 10. Practice Questions (20)

**Q1.** Who is known as the Father of Computer?
(a) Blaise Pascal
(b) Charles Babbage
(c) John Napier
(d) Herman Hollerith

**Answer: (b)**

**Q2.** First computer programmer was:
(a) Charles Babbage
(b) Lady Ada Augusta Lovelace
(c) Herman Hollerith
(d) John Napier

**Answer: (b)**

**Q3.** ENIAC was developed in:
(a) 1944
(b) 1946
(c) 1949
(d) 1951

**Answer: (b)**

**Q4.** Which generation used Vacuum Tubes?
(a) 1st
(b) 2nd
(c) 3rd
(d) 4th

**Answer: (a)**

**Q5.** Microprocessors were introduced in which generation?
(a) 1st
(b) 2nd
(c) 3rd
(d) 4th

**Answer: (d)**

**Q6.** Which is volatile memory?
(a) ROM
(b) RAM
(c) HDD
(d) SSD

**Answer: (b)**

**Q7.** Which memory uses flip-flops?
(a) DRAM
(b) SRAM
(c) ROM
(d) HDD

**Answer: (b)**

**Q8.** EPROM is erased by:
(a) Heat
(b) UV light
(c) Magnetic field
(d) Electric current

**Answer: (b)**

**Q9.** Linux was developed by:
(a) Bill Gates
(b) Steve Jobs
(c) Linus Torvalds
(d) Ken Thompson

**Answer: (c)**

**Q10.** UNIX was developed at:
(a) Microsoft
(b) IBM
(c) Bell Labs
(d) Apple

**Answer: (c)**

**Q11.** 1 GB equals:
(a) 1024 Bytes
(b) 1024 KB
(c) 1024 MB
(d) 1024 TB

**Answer: (c)**

**Q12.** Cache memory is located:
(a) On motherboard
(b) Inside CPU
(c) In RAM
(d) In HDD

**Answer: (b)**

**Q13.** Blu-ray disc capacity:
(a) 700 MB
(b) 4.7 GB
(c) 8.5 GB
(d) 17 GB

**Answer: (d)**

**Q14.** Which is faster:
(a) DRAM
(b) SRAM
(c) HDD
(d) SSD

**Answer: (b)**

**Q15.** First generation computers used:
(a) Transistors
(b) Vacuum Tubes
(c) ICs
(d) Microprocessors

**Answer: (b)**

**Q16.** Supercomputer Paramishan was developed by:
(a) DRDO
(b) ISRO
(c) C-DAC
(d) BARC

**Answer: (c)**

**Q17.** India's fastest supercomputer (as of 2025):
(a) Param Siddhi
(b) AIRAWAT-PSAI
(c) Pratyush
(d) Mihir

**Answer: (b)**

**Q18.** Ctrl + Shift + N opens:
(a) New window
(b) New tab
(c) Incognito window
(d) Notepad

**Answer: (c)**

**Q19.** Which of the following is application software?
(a) Windows
(b) Linux
(c) MS Word
(d) macOS

**Answer: (c)**

**Q20.** Flash memory was invented by:
(a) Jack Kilby
(b) Robert Noyce
(c) Dr. Fujio Masuoka
(d) Steve Wozniak

**Answer: (c)**

---

## 11. Quick Revision Sheet

### Top 20 Must-Knows
1. Computer = Input → Process → Output
2. Father of Computer: Charles Babbage
3. First programmer: Lady Ada Lovelace
4. ENIAC (1946): First electronic digital computer
5. UNIVAC (1951): First commercial computer
6. 1st Gen: Vacuum Tubes (1940-1956)
7. 4th Gen: Microprocessors (1971-1985)
8. 5th Gen: AI-based (1985-Present)
9. CPU = ALU + CU + Registers
10. RAM: Volatile primary memory
11. ROM: Non-volatile; stores boot
12. Cache: Between CPU and RAM; L1/L2/L3
13. 1 KB = 1024 Bytes; 1 MB = 1024 KB
14. Linux: Free, open-source, by Linus Torvalds
15. UNIX: Multi-user OS by Bell Labs (Ken Thompson, 1969)
16. Windows: Most popular desktop OS by Microsoft
17. HDD: Magnetic storage (slow, cheap)
18. SSD: Flash storage (fast, expensive)
19. Blu-ray: 17 GB; DVD: 4.7 GB; CD: 700 MB
20. SRAM: Faster than DRAM (cache); DRAM: main memory

### Mnemonics
- **CPU Components**: "ACR" → ALU + CU + Registers
- **Memory Hierarchy (top to bottom)**: Registers → Cache → RAM → HDD/SSD
- **Generation Order**: "V-T-I-M-U" (Vacuum, Transistor, IC, Microprocessor, ULSI/AI)

---
