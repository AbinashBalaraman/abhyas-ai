# Chapter 1: Computer Fundamentals & History

> **Chapter Overview:** Computer Fundamentals is the **foundation topic** for all Computer Aptitude sections across Indian competitive exams. It appears in **3-5 questions per SSC CGL Tier-I**, **5-8 per CGL Tier-II**, **5-10 per IBPS PO/SBI PO/RBI Grade B**, and is essential for **RRB NTPC, SSC CPO, Delhi Police, DSSSB**, and all State exams. This chapter covers computer history, generations, architecture, types, input/output devices, software, operating systems, and modern concepts.
>
> **Primary sources used:** General StudiesComputer Updated Jan 2026 (Gangan Pratap Sir — 80 pages covering History, Generations, Input/Output Devices, Software, OS, MS Office, Internet, E-mail, Networking, Cyber Security, Number Systems), Standard ReferenceComputer Theory PYQ (RBE Computer 2.0 — comprehensive content for all SSC exams), Standard Exam ReferenceComputer (Competitive Exam Question Bank topics), RBE Computer (Radhika Mam).

---

## 1. Core Concepts (Conceptual Foundation)

### 1.1 What is a Computer?

A **computer** is an electronic device that takes input, processes it according to a program, and gives output. It works on the **Input-Process-Output (IPO) cycle**.

**Key characteristics:**
- **Speed:** Millions of operations per second.
- **Accuracy:** No errors if program is correct.
- **Storage:** Can store vast amounts of data.
- **Automation:** Once programmed, runs without human intervention.
- **Versatility:** Can perform diverse tasks.

**Limitation:** No intelligence of its own (without AI/ML).

### 1.2 The IPO Cycle (Input-Process-Output)

```
INPUT → PROCESS → OUTPUT
   ↓        ↓         ↓
Data → CPU executes → Result
         program
```

**Components of the IPO cycle:**
- **Input:** Data fed to computer via keyboard, mouse, scanner, etc.
- **Process:** CPU executes instructions on data.
- **Output:** Result displayed via monitor, printer, speakers.

### 1.3 Computer History (Timeline)

| Year | Device | Inventor | Significance |
|------|--------|----------|--------------|
| 3000 BC | **Abacus** | — | First calculating device for basic arithmetic |
| 1617 | **Napier's Bones** | John Napier | Simplified calculations |
| 1642 | **Pascaline** | Blaise Pascal | Mechanical calculator (addition/subtraction) |
| 1671 | **Leibniz Calculator** | G.W. Leibniz | Multiplication & division |
| 1822 | **Difference Engine** | Charles Babbage | First automated calculation machine |
| 1837 | **Analytical Engine** | Charles Babbage | "Father of Computer"; concept of modern computer |
| 1890 | **Punch Cards** | Herman Hollerith | Used in US Census; tabulating machines |
| 1944 | **Mark-I** | Howard Aiken | First electromechanical computer |
| 1946 | **ENIAC** | J. Presper Eckert & John Mauchly | First electronic digital computer; used vacuum tubes |
| 1949 | **EDVAC** | John von Neumann | Introduced stored-program concept |
| 1951 | **UNIVAC-I** | Eckert & Mauchly | First commercial computer |

### 1.4 Generations of Computers

| Generation | Period | Technology Used | Language | Examples |
|-----------|--------|-----------------|----------|----------|
| **First** | 1940-1956 | **Vacuum Tubes** | Machine Language (0s and 1s) | ENIAC, EDVAC, UNIVAC |
| **Second** | 1957-1963 | **Transistors** | Assembly Language | IBM 1401, IBM 7094 |
| **Third** | 1964-1971 | **Integrated Circuits (ICs)** | High-Level (C, BASIC, COBOL, FORTRAN) | IBM 360, PDP |
| **Fourth** | 1972-present | **Microprocessors / VLSI** | Very High Level (C, C++, Java, SQL) | IBM PC, Apple Macintosh |
| **Fifth** | 1980-onwards | **AI / ULSI** | AI-based (PROLOG, LISP) | AI-based systems, robotics |

**Key Characteristics:**

**First Generation (Vacuum Tubes):**
- Very large size
- High power consumption
- Generated lots of heat
- Used machine language (binary 0s and 1s)
- Non-volatile storage: Magnetic core memory (RAM)
- Punch cards for input; printouts for output

**Second Generation (Transistors):**
- Replaced vacuum tubes due to small size, low power use, high speed
- Used semiconductors (silicon, germanium)
- Assembly language
- Smaller, faster, more reliable

**Third Generation (ICs):**
- Based on Integrated Circuits (ICs)
- Invented by **J. Kilby** and **R. Noyce**
- High-level languages (C, BASIC, COBOL, FORTRAN)
- Reduced size and cost, increased speed

**Fourth Generation (Microprocessors / VLSI):**
- Based on **Microprocessors / VLSI (Very Large Scale Integration)**
- Very High Level Languages (C, C++, Java, SQL)
- Personal computers developed
- Examples: IBM PC, Apple Macintosh

**Fifth Generation (AI / ULSI):**
- Based on **Artificial Intelligence (AI) / ULSI (Ultra Large Scale Integration)**
- Used AI and Natural Language (PROLOG, LISP)
- Advanced technologies: Machine Learning, Robotics
- AI-based systems, expert systems, supercomputers

### 1.5 Charles Babbage — Father of Computer

- **Charles Babbage (1791-1871):** English mathematician.
- **Father of Computer.**
- Designed **Difference Engine (1822)** and **Analytical Engine (1837)**.
- **Lady Ada Lovelace:** First programmer; wrote first algorithm for Babbage's Analytical Engine. She was the student/associate of Charles Babbage. World's first computer programmer.

---

## 2. Computer Architecture & Components

### 2.1 The Three Main Sections of Computer

**1. Input Unit** — Receives data from user.
- Examples: Keyboard, Mouse, Scanner, Microphone, Joystick, Light Pen, Touch Screen, Barcode Reader, OCR, MICR, Digital Camera.

**2. Central Processing Unit (CPU)** — Processes data.
- **ALU (Arithmetic Logic Unit):** Performs arithmetic (+, -, ×, ÷) and logical (AND, OR, NOT) operations.
- **CU (Control Unit):** Controls and coordinates all computer operations.
- **MU (Memory Unit):** Temporary storage.

**3. Output Unit** — Displays results.
- Examples: Monitor, Printer, Plotter, Speaker, Headphone.

### 2.2 Computer Memory Hierarchy

| Type | Capacity | Speed | Volatility | Cost |
|------|----------|-------|------------|------|
| **Register** | Bytes | Fastest | Volatile | Most expensive |
| **Cache** | KB-MB | Very fast | Volatile | Expensive |
| **RAM** (Primary) | GB | Fast | Volatile | Moderate |
| **Hard Disk** (Secondary) | TB | Slower | Non-volatile | Cheap |
| **Optical/Magnetic Tapes** | TB+ | Slowest | Non-volatile | Cheapest |

### 2.3 RAM vs ROM

| Feature | RAM (Random Access Memory) | ROM (Read Only Memory) |
|---------|---------------------------|------------------------|
| Volatility | **Volatile** (data lost on power off) | **Non-volatile** (retains data) |
| Read/Write | Both read and write | Read only (in basic form) |
| Speed | Faster | Slower |
| Use | Running programs, temporary storage | Firmware, boot instructions |
| Types | SRAM, DRAM | PROM, EPROM, EEPROM |

**Types of RAM:**
- **SRAM (Static RAM):** Faster, more expensive, used in cache memory.
- **DRAM (Dynamic RAM):** Slower, cheaper, needs refresh, used as main memory.

**Types of ROM:**
- **PROM (Programmable ROM):** Programmable once.
- **EPROM (Erasable PROM):** Can be erased using UV light, reprogrammed.
- **EEPROM (Electrically Erasable PROM):** Can be erased electrically, reprogrammed.
- **Flash Memory:** A type of EEPROM; used in SSDs, USB drives, memory cards.

### 2.4 Storage Devices Comparison

| Device | Type | Capacity | Speed |
|--------|------|----------|-------|
| **Hard Disk Drive (HDD)** | Magnetic | 500GB - 10TB | Moderate |
| **Solid State Drive (SSD)** | Flash memory | 128GB - 8TB | Fast |
| **CD (Compact Disc)** | Optical | 700 MB | Slow |
| **DVD** | Optical | 4.7 GB (single-layer) | Moderate |
| **Blu-ray** | Optical | 25 GB (single-layer) | Fast |
| **Pen Drive / USB** | Flash | 8GB - 1TB | Fast |
| **Memory Card** | Flash | Up to 1TB | Fast |
| **Magnetic Tape** | Sequential | TB+ | Slow |

### 2.5 Cache Memory

- **Cache:** Small, high-speed memory between CPU and RAM.
- **L1 (Level 1):** Built into CPU, smallest, fastest.
- **L2 (Level 2):** Larger than L1, slightly slower.
- **L3 (Level 3):** Shared among cores, larger, slower than L2.

**Purpose:** Reduces CPU-RAM speed mismatch. Most frequently accessed data is cached.

---

## 3. Input Devices

### 3.1 Keyboard

- **Most common input device.**
- **QWERTY layout** (named after first 6 keys in top row).
- **Number of keys:** 104 (standard), 105 (Windows).
- **Special keys:** Shift, Ctrl, Alt, Caps Lock, Num Lock, Tab, Enter, Backspace, Esc, Function keys (F1-F12).
- **Types:** Mechanical, Membrane, Chiclet, Ergonomic, Gaming.

### 3.2 Mouse

- **Inventor:** Douglas Engelbart (1964).
- **Types:** Mechanical (ball), Optical (LED), Laser, Trackball, Touchpad.
- **Buttons:** Left, Right, Scroll wheel.
- **DPI (Dots Per Inch):** Measures mouse sensitivity.

### 3.3 Scanner

- Converts physical documents/images into digital format.
- **Types:** Flatbed, Sheet-fed, Handheld, Drum scanner.
- **Resolution:** Measured in DPI.

### 3.4 Other Input Devices

| Device | Function |
|--------|----------|
| **Joystick** | Gaming/flight simulation |
| **Light Pen** | Drawing on screen |
| **Touch Screen** | Direct touch input (smartphones, ATMs) |
| **Barcode Reader** | Reads barcodes (POS systems) |
| **OCR (Optical Character Recognition)** | Converts scanned text to editable text |
| **MICR (Magnetic Ink Character Recognition)** | Used in banks for cheque processing |
| **OMR (Optical Mark Recognition)** | Reads marked answers (MCQ sheets) |
| **Webcam** | Video input |
| **Microphone** | Audio input |
| **Biometric Devices** | Fingerprint, retina, face recognition |

---

## 4. Output Devices

### 4.1 Monitor (Display)

- **Most common output device.**
- **Types:**
  - **CRT (Cathode Ray Tube):** Old, bulky.
  - **LCD (Liquid Crystal Display):** Thin, common in laptops.
  - **LED (Light Emitting Diode):** Better than LCD.
  - **OLED (Organic LED):** Best color and contrast; used in high-end TVs and smartphones.
  - **Plasma:** Used in TVs (older).
  - **AMOLED:** Active Matrix OLED.

**Resolution:** Measured in pixels (e.g., 1920×1080 = Full HD).
**Refresh Rate:** Hz (60Hz, 120Hz, 144Hz).

### 4.2 Printer

| Type | Technology | Speed | Quality |
|------|------------|-------|---------|
| **Impact (Dot Matrix)** | Pins striking ribbon | Slow | Low |
| **Inkjet** | Liquid ink sprayed | Moderate | High color |
| **Laser** | Toner + heat | Fast | High B&W |
| **Thermal** | Heat on thermal paper | Fast | Low |
| **3D Printer** | Layer-by-layer material | Slow | High for 3D |

### 4.3 Other Output Devices

| Device | Function |
|--------|----------|
| **Speaker** | Audio output |
| **Plotter** | Large-format drawings (engineering, architecture) |
| **Projector** | Display on large screen |
| **Headphone** | Personal audio |
| **LED Indicator Lights** | Status indication |

---

## 5. Software and Operating Systems

### 5.1 Software Types

**1. System Software:** Manages hardware; runs the computer.
- **Operating System (OS):** Windows, macOS, Linux, Android, iOS, Unix.
- **Device Drivers:** Programs that control specific hardware.
- **Utility Software:** Disk cleanup, antivirus, backup tools.
- **Firmware:** Low-level software (BIOS, UEFI).

**2. Application Software:** Performs specific user tasks.
- **General-purpose:** MS Word, Excel, PowerPoint, browsers.
- **Specific-purpose:** Tally (accounting), Photoshop (image editing), AutoCAD.
- **Custom:** Built for specific organization.

**3. Programming Software:** Tools for developers.
- **Compilers:** gcc, javac.
- **Interpreters:** Python interpreter.
- **IDEs (Integrated Development Environments):** Visual Studio, Eclipse, PyCharm.
- **Text Editors:** VS Code, Sublime Text, Notepad++.

### 5.2 Programming Languages (Evolution)

| Era | Type | Examples | Translation |
|-----|------|----------|-------------|
| 1940s | **Machine Language** | Binary (0/1) | Direct execution |
| 1950s | **Assembly Language** | Mnemonics (ADD, MOV) | Assembler |
| 1960s | **High-Level** | FORTRAN, COBOL, BASIC, ALGOL | Compiler/Interpreter |
| 1970s | **Structured** | C, Pascal | Compiler |
| 1980s | **Object-Oriented** | C++, Smalltalk, Java | Compiler/Interpreter |
| 1990s+ | **Internet/Modern** | Java, Python, JavaScript, C#, Ruby, PHP, Go | Various |
| 2010s+ | **AI/Scripting** | Python, R, Julia, Kotlin, Swift, TypeScript | Various |

**Note:** JavaScript was originally called Mocha, then LiveScript, then JavaScript (1995).

### 5.3 Operating Systems

**Popular OS:**

| OS | Developer | Type |
|----|-----------|------|
| **Windows 11** | Microsoft | GUI, Personal Computer |
| **macOS Sonoma (14)** | Apple | GUI, Apple computers |
| **Linux (Ubuntu, Fedora, etc.)** | Open source | Server, Personal |
| **Android 14** | Google (Open Handset Alliance) | Mobile |
| **iOS 17** | Apple | Mobile (iPhone/iPad) |
| **Unix** | Bell Labs | Server, Mainframe |
| **MS-DOS** | Microsoft | Command-line, legacy |

**OS Functions:**
- Process management
- Memory management
- File system management
- Device management
- Security and access control
- User interface (CLI/GUI)

### 5.4 Mobile Operating Systems

| OS | Developer | Year | Used In |
|----|-----------|------|---------|
| **Android** | Google (OHA) | 2008 | Most smartphones |
| **iOS** | Apple | 2007 | iPhones, iPads |
| **HarmonyOS** | Huawei | 2019 | Huawei devices |
| **KaiOS** | KaiOS Tech | 2017 | JioPhone, feature phones |
| **Tizen** | Samsung/Linux Foundation | 2012 | Samsung smartwatches, TVs |

**Android versions (recent):** Android 11 (2020), 12 (2021), 13 (2022), 14 (2023).

---

## 6. Computer Networks and Internet

### 6.1 Computer Network Types (by area)

| Network | Coverage | Example |
|---------|----------|---------|
| **PAN (Personal Area Network)** | Few meters | Bluetooth, USB |
| **LAN (Local Area Network)** | Building/campus | Office, school network |
| **MAN (Metropolitan Area Network)** | City | Cable TV network, city-wide Wi-Fi |
| **WAN (Wide Area Network)** | Country/world | Internet |
| **GAN (Global Area Network)** | Global | Internet backbone |

### 6.2 Network Topologies

| Topology | Description |
|----------|-------------|
| **Bus** | All devices on a single cable |
| **Star** | All devices connected to a central hub/switch |
| **Ring** | Devices in a closed loop |
| **Mesh** | Every device connected to every other |
| **Tree** | Hierarchical (combination of star and bus) |
| **Hybrid** | Combination of two or more |

### 6.3 Internet Protocols

| Protocol | Full Form | Function |
|----------|-----------|----------|
| **HTTP** | HyperText Transfer Protocol | Web page transfer |
| **HTTPS** | HTTP Secure | Encrypted web transfer |
| **FTP** | File Transfer Protocol | File upload/download |
| **SMTP** | Simple Mail Transfer Protocol | Sending email |
| **POP3** | Post Office Protocol v3 | Receiving email |
| **IMAP** | Internet Message Access Protocol | Email with sync |
| **TCP/IP** | Transmission Control Protocol / Internet Protocol | Internet foundation |
| **IP** | Internet Protocol | Addressing |
| **DNS** | Domain Name System | Domain-to-IP translation |
| **DHCP** | Dynamic Host Configuration Protocol | Auto IP assignment |
| **SSH** | Secure Shell | Secure remote access |
| **SSL/TLS** | Secure Sockets Layer / Transport Layer Security | Encryption |

### 6.4 Internet Terms

| Term | Full Form | Definition |
|------|-----------|------------|
| **URL** | Uniform Resource Locator | Web address (e.g., https://www.example.com) |
| **WWW** | World Wide Web | Information space on internet |
| **HTML** | HyperText Markup Language | Web page structure |
| **XML** | Extensible Markup Language | Data representation |
| **CSS** | Cascading Style Sheets | Web styling |
| **IP Address** | Internet Protocol Address | Unique device identifier (IPv4: 32-bit; IPv6: 128-bit) |
| **Domain** | — | Name identifying a website (e.g.,.com,.org,.in) |
| **ISP** | Internet Service Provider | Company providing internet access (e.g., Jio, Airtel) |

### 6.5 Search Engines

| Engine | Developer | Year |
|--------|-----------|------|
| **Google** | Larry Page, Sergey Brin | 1998 |
| **Bing** | Microsoft | 2009 |
| **Yahoo** | Jerry Yang, David Filo | 1994 |
| **DuckDuckGo** | Gabriel Weinberg | 2008 |
| **Baidu** | Robin Li | 2000 (China) |

**Google is the most-used search engine globally (~92% market share).**

---

## 7. Number Systems and Data Representation

### 7.1 The Four Number Systems

| System | Base | Digits Used | Example |
|--------|------|-------------|---------|
| **Binary** | 2 | 0, 1 | 1010 = 10 in decimal |
| **Octal** | 8 | 0-7 | 12 = 10 in decimal |
| **Decimal** | 10 | 0-9 | 10 |
| **Hexadecimal** | 16 | 0-9, A-F | A = 10 in decimal |

### 7.2 Conversions

**Decimal to Binary:** Repeated division by 2.
- 25 decimal → 11001 binary
- 25 ÷ 2 = 12 r 1
- 12 ÷ 2 = 6 r 0
- 6 ÷ 2 = 3 r 0
- 3 ÷ 2 = 1 r 1
- 1 ÷ 2 = 0 r 1
- Read remainders bottom-up: 11001

**Binary to Decimal:** Multiply each digit by power of 2.
- 11001 = 1(16) + 1(8) + 0(4) + 0(2) + 1(1) = 25

**Binary to Octal:** Group 3 bits from right.
- 11001 → 011 001 → 3 1 → 31 octal

**Binary to Hexadecimal:** Group 4 bits from right.
- 11001 → 0001 1001 → 1 9 → 19 hexadecimal

### 7.3 Data Units

| Unit | Size |
|------|------|
| **Bit** | 0 or 1 (smallest) |
| **Nibble** | 4 bits |
| **Byte** | 8 bits |
| **Kilobyte (KB)** | 1,024 bytes |
| **Megabyte (MB)** | 1,024 KB |
| **Gigabyte (GB)** | 1,024 MB |
| **Terabyte (TB)** | 1,024 GB |
| **Petabyte (PB)** | 1,024 TB |
| **Exabyte (EB)** | 1,024 PB |

---

## 8. Cybersecurity and Emerging Tech

### 8.1 Common Cybersecurity Threats

| Threat | Description |
|--------|-------------|
| **Virus** | Self-replicating malicious program; needs user action to spread |
| **Worm** | Self-replicating; spreads over network without user action |
| **Trojan Horse** | Disguised as legitimate software |
| **Phishing** | Fraudulent emails/websites to steal data |
| **Ransomware** | Encrypts victim's files; demands ransom |
| **Spyware** | Secretly monitors user activity |
| **Adware** | Displays unwanted advertisements |
| **Malware** | General term for malicious software |
| **Rootkit** | Hides malicious activities from OS |
| **Keylogger** | Records keystrokes |

### 8.2 Protection Methods

| Method | Description |
|--------|-------------|
| **Antivirus** | Detects and removes malware |
| **Firewall** | Blocks unauthorized access |
| **Encryption** | Converts data to unreadable form |
| **VPN (Virtual Private Network)** | Secure tunnel over public network |
| **Two-Factor Authentication (2FA)** | Requires two forms of verification |
| **Strong Passwords** | Combination of letters, numbers, symbols |
| **Regular Updates** | Patches vulnerabilities |

### 8.3 Hacker Categories

| Type | Intent |
|------|--------|
| **White Hat (Ethical)** | Authorized to test security |
| **Black Hat** | Malicious intent |
| **Grey Hat** | Mix of both; unauthorized but not always malicious |
| **Script Kiddie** | Uses ready-made tools; not skilled |

---

## 9. Key Terms Dictionary (50+ Terms)

| Term | Full Form | Definition |
|------|-----------|------------|
| **CPU** | Central Processing Unit | Brain of computer |
| **GPU** | Graphics Processing Unit | Specialized for graphics/parallel computation |
| **RAM** | Random Access Memory | Volatile main memory |
| **ROM** | Read Only Memory | Non-volatile firmware memory |
| **ALU** | Arithmetic Logic Unit | Performs arithmetic and logic |
| **CU** | Control Unit | Directs computer operations |
| **USB** | Universal Serial Bus | Standard connection interface |
| **HDMI** | High Definition Multimedia Interface | Audio/video interface |
| **BIOS** | Basic Input Output System | Firmware that initializes hardware |
| **UEFI** | Unified Extensible Firmware Interface | Modern replacement for BIOS |
| **SSD** | Solid State Drive | Storage using flash memory |
| **HDD** | Hard Disk Drive | Magnetic storage |
| **OS** | Operating System | Manages hardware and software |
| **GUI** | Graphical User Interface | Visual interface (windows, icons) |
| **CLI** | Command Line Interface | Text-based interface |
| **API** | Application Programming Interface | Software communication interface |
| **IDE** | Integrated Development Environment | Software development tool |
| **IDE (other)** | Integrated Drive Electronics | HDD interface standard |
| **SATA** | Serial ATA | HDD/SSD interface |
| **NVMe** | Non-Volatile Memory Express | SSD interface (faster than SATA) |
| **PCIe** | Peripheral Component Interconnect Express | High-speed expansion bus |
| **LAN** | Local Area Network | Local network |
| **WAN** | Wide Area Network | Wide network |
| **Wi-Fi** | Wireless Fidelity | Wireless networking |
| **DNS** | Domain Name System | Domain name resolver |
| **DHCP** | Dynamic Host Configuration Protocol | Auto IP assignment |
| **IP** | Internet Protocol | Network addressing |
| **TCP** | Transmission Control Protocol | Reliable data transmission |
| **UDP** | User Datagram Protocol | Faster but unreliable transmission |
| **HTTP** | HyperText Transfer Protocol | Web protocol |
| **HTTPS** | HTTP Secure | Encrypted HTTP |
| **VPN** | Virtual Private Network | Secure network access |
| **LAN** | Local Area Network | Same as above |
| **SaaS** | Software as a Service | Cloud software |
| **PaaS** | Platform as a Service | Cloud platform |
| **IaaS** | Infrastructure as a Service | Cloud infrastructure |
| **AI** | Artificial Intelligence | Smart systems |
| **ML** | Machine Learning | Subset of AI |
| **IoT** | Internet of Things | Connected devices |
| **AR** | Augmented Reality | Digital overlay on real world |
| **VR** | Virtual Reality | Immersive digital environment |
| **5G** | 5th Generation | Latest mobile network |
| **QR Code** | Quick Response Code | 2D barcode |
| **OCR** | Optical Character Recognition | Text recognition |
| **PDF** | Portable Document Format | Document format (Adobe) |
| **URL** | Uniform Resource Locator | Web address |
| **HTML** | HyperText Markup Language | Web markup |
| **SQL** | Structured Query Language | Database query language |
| **JSON** | JavaScript Object Notation | Data interchange format |

---

## 10. Keyboard Shortcuts (20 Essential)

| Shortcut | Function |
|----------|----------|
| Ctrl + C | Copy |
| Ctrl + V | Paste |
| Ctrl + X | Cut |
| Ctrl + Z | Undo |
| Ctrl + Y | Redo |
| Ctrl + A | Select All |
| Ctrl + S | Save |
| Ctrl + P | Print |
| Ctrl + F | Find |
| Ctrl + H | Find & Replace |
| Ctrl + N | New |
| Ctrl + O | Open |
| Ctrl + W | Close current window |
| Ctrl + T | New tab (browser) |
| Ctrl + Tab | Switch tabs |
| Ctrl + Shift + Esc | Task Manager |
| Ctrl + Alt + Delete | Security options |
| Alt + F4 | Close window |
| Alt + Tab | Switch windows |
| Win + D | Show Desktop |
| Win + E | Open File Explorer |
| Win + L | Lock screen |
| Win + R | Run dialog |
| F1 | Help |
| F5 | Refresh |

---

## 11. Practice Questions (25 MCQs)

**Q1.** Who is known as the Father of the Computer?
- (a) Charles Babbage (b) Herman Hollerith (c) Blaise Pascal (d) John Napier
**Answer: (a)**

**Q2.** Who is known as the world's first computer programmer?
- (a) Charles Babbage (b) Lady Ada Lovelace (c) Herman Hollerith (d) John Mauchly
**Answer: (b)** Lady Ada Lovelace

**Q3.** ENIAC was built using:
- (a) Transistors (b) Vacuum Tubes (c) ICs (d) Microprocessors
**Answer: (b)** Vacuum Tubes

**Q4.** First Generation computers used which memory?
- (a) Semiconductor (b) Magnetic Core (c) RAM (d) Optical
**Answer: (b)** Magnetic Core Memory

**Q5.** Which generation of computers used Microprocessors?
- (a) First (b) Second (c) Third (d) Fourth
**Answer: (d)** Fourth Generation

**Q6.** Integrated Circuits (ICs) were invented by:
- (a) J. Kilby and R. Noyce (b) Charles Babbage (c) John von Neumann (d) Howard Aiken
**Answer: (a)**

**Q7.** Which of the following is volatile memory?
- (a) ROM (b) RAM (c) Hard Disk (d) SSD
**Answer: (b)** RAM

**Q8.** Which memory is the fastest?
- (a) Cache (b) RAM (c) Hard Disk (d) Magnetic Tape
**Answer: (a)** Cache

**Q9.** The brain of the computer is:
- (a) Monitor (b) CPU (c) Keyboard (d) Mouse
**Answer: (b)** CPU

**Q10.** ALU stands for:
- (a) Arithmetic Large Unit (b) Arithmetic Logic Unit (c) Application Logic Unit (d) Arithmetic Level Unit
**Answer: (b)**

**Q11.** Which device is used to read barcodes?
- (a) OCR (b) MICR (c) Barcode Reader (d) OMR
**Answer: (c)**

**Q12.** MICR is used in:
- (a) ATM (b) Banks for cheque processing (c) Audio input (d) Scanning
**Answer: (b)**

**Q13.** Full form of HTTP:
- (a) HyperText Transfer Protocol (b) High Transfer Text Protocol (c) HyperText Type Protocol (d) Hybrid Text Transfer Protocol
**Answer: (a)**

**Q14.** Which protocol is used for sending email?
- (a) POP3 (b) IMAP (c) SMTP (d) FTP
**Answer: (c)** SMTP

**Q15.** Which of the following is an Operating System?
- (a) MS Word (b) Google Chrome (c) Windows 11 (d) Photoshop
**Answer: (c)**

**Q16.** What does URL stand for?
- (a) Universal Resource Locator (b) Uniform Resource Locator (c) Unified Resource Locator (d) Uniform Routing Locator
**Answer: (b)** Uniform Resource Locator

**Q17.** 1 byte = _____ bits:
- (a) 4 (b) 8 (c) 16 (d) 32
**Answer: (b)** 8

**Q18.** Binary equivalent of decimal 25 is:
- (a) 11001 (b) 10011 (c) 11010 (d) 11100
**Answer: (a)** 11001

**Q19.** Which of these is NOT malware?
- (a) Virus (b) Worm (c) Firewall (d) Trojan
**Answer: (c)** Firewall (it protects against malware)

**Q20.** Hacker who tests security with permission is called:
- (a) Black Hat (b) White Hat (c) Grey Hat (d) Script Kiddie
**Answer: (b)** White Hat

**Q21.** Ctrl + S is for:
- (a) Save (b) Search (c) Settings (d) Select
**Answer: (a)** Save

**Q22.** F5 key is typically used for:
- (a) Help (b) Refresh (c) Find (d) Close
**Answer: (b)** Refresh

**Q23.** What is the binary representation of decimal 10?
- (a) 1010 (b) 1100 (c) 1110 (d) 1001
**Answer: (a)** 1010

**Q24.** LAN stands for:
- (a) Large Area Network (b) Local Area Network (c) Long Area Network (d) Linked Area Network
**Answer: (b)**

**Q25.** What is the full form of SSD?
- (a) Solid State Drive (b) Solid Storage Disk (c) System Storage Drive (d) Standard State Disk
**Answer: (a)** Solid State Drive

---

## 12. Quick Revision Sheet

### 12.1 The 5 Generations at a Glance

| Generation | Component | Language | Key Feature |
|-----------|-----------|----------|-------------|
| 1st | Vacuum Tubes | Machine | ENIAC, EDVAC |
| 2nd | Transistors | Assembly | IBM 1401 |
| 3rd | ICs | High-level | IBM 360 |
| 4th | Microprocessors | VHL | PCs |
| 5th | AI/ULSI | Natural/AI | AI systems |

### 12.2 Computer History Mnemonic

"A Napier's Bones P **A**ssists **L**ady Lovelace's **A**nalytical **M**achine **E**ventually **B**uilding **E**lectronic **N**umerical **I**ntegrator **U**sing **V**acuum **T**ubes"
- A: Abacus (3000 BC)
- N: Napier's Bones (1617)
- P: Pascaline (1642)
- L: Leibniz (1671)
- L: Lady Lovelace's work (1843)
- A: Analytical Engine (1837)
- M: Mark-I (1944)
- E: ENIAC (1946)
- E: EDVAC (1949)
- U: UNIVAC (1951)

### 12.3 RAM vs ROM Mnemonic

**"RAM = Refreshed After Moment" (volatile)**
**"ROM = Readily On Memory" (non-volatile)**

### 12.4 Input Devices Mnemonic

**"KMS JTOS"**
- K: Keyboard
- M: Mouse
- S: Scanner
- J: Joystick
- T: Touch screen
- O: OCR/MICR/OMR
- S: Speaker (output, not input)

### 12.5 Output Devices Mnemonic

**"MPS"**
- M: Monitor
- P: Printer
- S: Speaker

### 12.6 Top 5 Traps in Computer MCQs

1. **ENIAC vs EDVAC vs UNIVAC:** ENIAC = first electronic (1946); EDVAC = stored-program (1949); UNIVAC = first commercial (1951).
2. **RAM vs ROM:** RAM is volatile; ROM is not.
3. **CPU components:** CPU = ALU + CU + MU (not just "the brain").
4. **Generation-component trap:** 1st = vacuum tube; 2nd = transistor; 3rd = IC; 4th = microprocessor; 5th = AI.
5. **Email protocols:** POP3/IMAP receive; SMTP sends.

---

## 13. PYQ Tag Index

| Exam | Pattern | Source |
|------|---------|--------|
| SSC CGL Tier-I | History, Generations, Components | (SSC CGL, Standard Reference_Computer_Theory_PYQ) |
| SSC CGL Tier-II | Advanced topics (Networks, Cybersecurity) | (SSC CGL, General Studies Reference_Computer_Updated_Jan2026) |
| IBPS PO/SO | Mixed topics | (IBPS PO, RBE Computer) |
| SBI PO/Clerk | Hardware, Software | (SBI PO, Standard Exam Reference_Computer) |
| RRB NTPC | Basic components | (RRB NTPC, RBE Computer) |
| RBI Grade B | Advanced (Networks, Security) | (RBI Grade B, General Studies Reference_Computer_Updated_Jan2026) |
| SSC CPO | Hardware, Generations | (SSC CPO, Standard Reference_Computer_Theory_PYQ) |

---
