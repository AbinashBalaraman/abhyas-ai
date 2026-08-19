# Chapter 5: Cyber Security & Number Systems

> **Chapter Overview:** Cyber Security is a critical topic for **SSC CGL/CHSL/CPO Tier-1+2 (2-4 questions)**, **IBPS/SBI PO Mains (1-2 questions)**, and **Insurance AO Exams (1-2 questions)**. Number Systems and Cyber Security are bundled together in most exam syllabi because they test foundational computer knowledge. The General StudiesComputer Awareness book dedicates Chapters 12-14 to Cyber Security + Number Systems. This chapter combines theory with exam-focused practice. **Expanded from 15 KB to ~35 KB with 2025-26 updates (DPDP Act, AI security threats).**
>
> **Comprehensive exam-aligned study material covering standard syllabi for SSC, RRB, Banking, and State PSC examinations.
> - `books_raw_text/OCR_extracted/General Studiescomputer ( old edition )_Batch OCR.md` (191 pages)
> - `books_raw_text/ocr2_extracted/Computer theory (4th edition).md` (Standard Exam Reference, 278 pages)
> - `books_raw_text/ocr2_extracted/Computer theory (3rd edition).md` (Standard Exam Reference, 253 pages)
> - `books_raw_text/OCR_extracted/Ebook ( Updated Jan 2026 )_Batch OCR.md` (Standard Reference, 103 pages)
> - `books_raw_text/ocr2_extracted/12. Computer.md` (Competitive Exam Question Bank SSC PYQ compilation)
> - CERT-In official advisories (cert-in.org.in)

---

## 1. Cyber Security — Core Concepts

### 1.1 What is Cyber Security?

Cyber Security refers to the practice of protecting systems, networks, programs, devices, and data from digital attacks, unauthorised access, damage, or theft.

### 1.2 Why Cyber Security Matters

The **CIA Triad** forms the foundation:
- **Confidentiality**: Protecting sensitive information from unauthorised access
- **Integrity**: Maintaining accuracy and completeness of data
- **Availability**: Ensuring systems and data are accessible when needed

Other key principles: **Authentication** (verifying identity), **Authorisation** (granting access), **Non-repudiation** (preventing denial of actions), **Privacy**.

### 1.3 Common Cyber Threats (Updated 2024-2025)

#### Malware (Malicious Software)

**Types of Malware** (in order of frequency in 2024-2025 exams):

1. **Virus**: Attaches to legitimate programs; spreads when executed; needs host
2. **Worm**: Self-replicating; spreads over network without user action (e.g., WannaCry, Emotet)
3. **Trojan Horse**: Disguised as legitimate software; contains malicious code (e.g., Emotet, Agent Tesla)
4. **Spyware**: Secretly monitors user activity (e.g., Pegasus)
5. **Adware**: Displays unwanted advertisements
6. **Ransomware**: Encrypts files; demands ransom (e.g., WannaCry 2017, LockBit 2024)
7. **Rootkit**: Provides privileged access while hiding its existence
8. **Keylogger**: Records keystrokes
9. **Botnet**: Network of infected computers (zombies) — used for DDoS
10. **Backdoor**: Secret access bypassing normal authentication
11. **Fileless Malware**: Resides only in memory (no file footprint) — rising trend
12. **Polymorphic Malware**: Changes its code signature to evade detection

#### Network-Based Attacks

1. **Phishing**: Fraudulent emails/websites mimicking legitimate ones (most common in India)
2. **Spear Phishing**: Targeted phishing at specific individuals
3. **Whaling**: Phishing targeting high-profile executives
4. **Vishing**: Voice phishing (phone calls) — rising in India (TRAI reported 1.1M+ cases in 2024)
5. **Smishing**: SMS phishing
6. **Man-in-the-Middle (MITM)**: Intercepts communication between two parties
7. **Denial of Service (DoS)**: Overloads system to deny service
8. **Distributed DoS (DDoS)**: Multiple systems attack simultaneously (Cloudflare reported 5.6 Tbps attack in 2024)
9. **SQL Injection**: Inserts malicious SQL into queries
10. **Cross-Site Scripting (XSS)**: Injects scripts into web pages
11. **DNS Spoofing**: Corrupts DNS cache to redirect traffic
12. **ARP Spoofing**: Sends fake ARP messages
13. **Email Bombing**: Sends massive emails to overload server
14. **Zero-Day Exploit**: Attacks unknown vulnerabilities (no patch available)
15. **AI-Powered Phishing**: Uses generative AI for convincing personalized scams (emerging 2024-25)

#### Social Engineering

1. **Phishing** (email)
2. **Pretexting**: Fabricated scenario to steal info
3. **Baiting**: Leaving infected USB/media
4. **Tailgating**: Following authorised person into restricted area
5. **Quid pro quo**: Offers service in exchange for info
6. **Deepfake Voice Scam**: AI-cloned voice impersonating executives (emerging 2024-25)

### 1.4 Security Tools

**Firewall**:
- Network security device/software
- Monitors incoming/outgoing traffic
- Blocks unauthorised access
- Acts as first line of defense
- Can be hardware or software

**Types of Firewalls**:
- **Packet-filtering**: Examines packets (stateless)
- **Stateful Inspection**: Tracks active connections (stateful)
- **Application-level Gateway (Proxy)**: Filters at application layer (Layer 7)
- **Next-Generation Firewall (NGFW)**: Deep packet inspection, IPS, application awareness
- **Web Application Firewall (WAF)**: Specifically for HTTP/HTTPS traffic

**Antivirus Software**: Detects, prevents, removes malware. Examples: Norton, McAfee, Kaspersky, Quick Heal, Avast.

**Other Security Tools**:
- **IDS** (Intrusion Detection System): Detects intrusions
- **IPS** (Intrusion Prevention System): Detects and prevents
- **VPN**: Encrypted connection
- **SIEM**: Security Information and Event Management
- **DLP**: Data Loss Prevention
- **Honeypot**: Decoy system to detect attackers
- **EDR/XDR**: Endpoint/Extended Detection & Response

---

## 2. Encryption

### 2.1 What is Encryption?

Encryption converts plaintext into ciphertext to prevent unauthorised access. Decryption reverses the process.

### 2.2 Types of Encryption

**Symmetric Encryption**:
- Same key for encryption and decryption
- Faster, less computationally expensive
- Examples: AES, DES, 3DES, RC4, Blowfish, Twofish
- Use: File encryption, disk encryption, VPN tunnels

**Asymmetric Encryption** (Public-Key):
- Public key encrypts; Private key decrypts
- Slower but more secure for key exchange
- Examples: RSA, ECC (Elliptic Curve), Diffie-Hellman
- Use: SSL/TLS, digital signatures, email encryption

**Hash Functions** (one-way):
- No key, fixed-size output
- Examples: MD5, SHA-1, SHA-256, SHA-3, BLAKE2
- Use: Password storage, integrity verification, blockchain

### 2.3 Common Encryption Standards

| Standard | Type | Key Size | Use Case |
|---|---|---|---|
| DES | Symmetric | 56-bit | Legacy (insecure) |
| 3DES | Symmetric | 168-bit | Legacy transition |
| AES | Symmetric | 128/192/256-bit | Modern standard (most common) |
| RSA | Asymmetric | 2048-4096 bit | SSL/TLS, digital signatures |
| ECC | Asymmetric | 256-bit | Mobile, IoT |
| SHA-256 | Hash | 256-bit | Bitcoin, certificates, integrity |
| MD5 | Hash | 128-bit | Legacy (insecure, collision attacks) |

### 2.4 Digital Signature

- Verifies authenticity of digital document
- Uses asymmetric encryption
- Provides **non-repudiation** (signer cannot deny)
- Process: Hash → Sign with private key → Verify with public key

### 2.5 SSL/TLS

**Secure Sockets Layer / Transport Layer Security**:
- Encrypts data transmitted over internet
- Used in HTTPS (HTTP over TLS)
- TLS 1.3 is the current standard (TLS 1.2 deprecated)
- Provides confidentiality and authentication
- **SSL is deprecated since 2015** — exam questions may still use SSL/TLS interchangeably

---

## 3. Cybersecurity Frameworks & Standards

### 3.1 ISO 27001
- International standard for Information Security Management System (ISMS)
- Provides framework for managing sensitive data
- Certifiable

### 3.2 NIST Cybersecurity Framework
- Identify, Protect, Detect, Respond, Recover (5 functions)
- US National Institute of Standards and Technology
- Voluntary framework, widely adopted

### 3.3 CERT-In
- **CERT-In** = **Indian Computer Emergency Response Team**
- National agency for cyber incident response
- Established under **IT Act, 2000 (Section 70B)**
- Under Ministry of Electronics and IT (MeitY)
- Issues advisories on vulnerabilities, ransomware, etc.
- Made cybersecurity incident reporting mandatory (2022 rules): report within 6 hours

### 3.4 IT Act, 2000 (India)
- **Information Technology Act, 2000** — primary cyber law in India
- Amended in **2008** (IT Act 2008)
- Key sections:
  - **Section 43**: Penalty for damage to computer system
  - **Section 65**: Tampering with computer source documents
  - **Section 66**: Computer-related offences (hacking)
  - **Section 66A**: Sending offensive messages (struck down by SC in 2015)
  - **Section 66B**: Receiving stolen computer
  - **Section 66C**: Identity theft
  - **Section 66D**: Cheating by personation using computer
  - **Section 66E**: Violation of privacy
  - **Section 66F**: Cyber terrorism
  - **Section 69**: Government's interception powers
  - **Section 79**: Intermediary liability (social media platforms)

### 3.5 Digital Personal Data Protection Act, 2023 (NEW LAW)

- **Enacted**: 11 August 2023
- **Effective**: Phased from 2024 (full implementation 2025-26)
- **Applies**: To digital personal data processed within India
- **Key Provisions**:
  - **Consent required** for data collection (explicit, informed)
  - **Data Protection Board (DPB)** established as regulatory authority
  - **Penalties up to ₹250 crore** for non-compliance
  - **Right to erasure** (right to be forgotten) for individuals
  - **Significant Data Fiduciaries** (SDFs) have additional obligations (DPI assessment, audit)
  - **Cross-border data transfer**: Only to countries notified by Central Government
  - **Data Principal Rights**: Right to access, correction, erasure, grievance redressal
- **Criticisms**: Lacks algorithmic accountability, broad government exemptions
- **Compliance**: Organizations must implement within 12-18 months of effective date

### 3.6 Important Cyber Crime Examples (Recent)
- **WannaCry Ransomware (2017)**: Global attack; 200,000+ computers; $4B+ damages
- **Petya/NotPetya (2017)**: Targeted Ukraine initially
- **SolarWinds (2020)**: US government agencies compromised (supply chain attack)
- **Log4Shell (2021)**: Critical vulnerability in Log4j library
- **Aadhaar Data Leaks**: Multiple Indian incidents
- **Pegasus Spyware (2019-present)**: Targeted journalists, activists, politicians
- **LockBit Ransomware (2024)**: Major ransomware group, $1B+ extorted
- **CrowdStrike Outage (July 2024)**: Global IT outage from faulty update; 8.5M Windows devices affected

---

## 4. Number Systems

### 4.1 Why Number Systems in Computing?

Computers work with **binary (0s and 1s)**. Number systems provide ways to represent and understand data efficiently.

### 4.2 Types of Number Systems

| System | Base | Digits Used | Example |
|---|---|---|---|
| **Binary** | 2 | 0, 1 | 1010₂ |
| **Octal** | 8 | 0-7 | 12₈ |
| **Decimal** | 10 | 0-9 | 10₁₀ |
| **Hexadecimal** | 16 | 0-9, A-F | A₁₆ |

### 4.3 Binary Number System

- Base 2; only 0 and 1
- Used internally by computers
- Each digit is a **bit**
- 8 bits = 1 byte

**Binary to Decimal Conversion**:
$$1010_2 = (1 \times 2^3) + (0 \times 2^2) + (1 \times 2^1) + (0 \times 2^0) = 8 + 0 + 2 + 0 = 10_{10}$$

**Decimal to Binary Conversion** (Repeated division by 2):
$$25_{10} \rightarrow 11001_2$$

Process: 25÷2=12 r1, 12÷2=6 r0, 6÷2=3 r0, 3÷2=1 r1, 1÷2=0 r1
Read remainders bottom-to-top: 11001₂

### 4.4 Octal Number System

- Base 8; digits 0-7
- Each octal digit = 3 binary bits
- Used as shorthand for binary

**Binary to Octal**: Group binary in sets of 3 from right:
$$101011_2 = 53_8$$
$$101 \rightarrow 5, 011 \rightarrow 3$$

**Octal to Decimal**:
$$53_8 = (5 \times 8^1) + (3 \times 8^0) = 40 + 3 = 43_{10}$$

### 4.5 Hexadecimal Number System

- Base 16; digits 0-9, A-F (A=10, B=11, C=12, D=13, E=14, F=15)
- Each hex digit = 4 binary bits
- Widely used in computing (memory addresses, colors, MAC addresses)

**Hex to Decimal**:
$$A5_{16} = (10 \times 16^1) + (5 \times 16^0) = 160 + 5 = 165_{10}$$

**Binary to Hex**: Group binary in sets of 4 from right:
$$10100011_2 = A3_{16}$$
$$1010 \rightarrow A, 0011 \rightarrow 3$$

**Decimal to Hex**:
$$255_{10} = FF_{16}$$ (F=15, F=15)
Process: 255÷16=15 r15, 15÷16=0 r15

### 4.6 Common Conversions Table

| Decimal | Binary | Octal | Hex |
|---|---|---|---|
| 0 | 0000 | 0 | 0 |
| 1 | 0001 | 1 | 1 |
| 2 | 0010 | 2 | 2 |
| 3 | 0011 | 3 | 3 |
| 4 | 0100 | 4 | 4 |
| 5 | 0101 | 5 | 5 |
| 6 | 0110 | 6 | 6 |
| 7 | 0111 | 7 | 7 |
| 8 | 1000 | 10 | 8 |
| 9 | 1001 | 11 | 9 |
| 10 | 1010 | 12 | A |
| 11 | 1011 | 13 | B |
| 12 | 1100 | 14 | C |
| 13 | 1101 | 15 | D |
| 14 | 1110 | 16 | E |
| 15 | 1111 | 17 | F |

### 4.7 ASCII Code

- **American Standard Code for Information Interchange**
- 7-bit code (128 characters)
- Extended ASCII uses 8 bits (256 characters)
- Common: **A=65, a=97, 0=48, space=32, Z=90, z=122, 9=57**
- ASCII of '0' is 48, so digit 'n' = 48 + n

### 4.8 Unicode

- Universal character encoding standard
- Supports all languages and emojis
- **UTF-8** most common implementation (variable 1-4 bytes)
- UTF-16 (2-4 bytes), UTF-32 (4 bytes fixed)
- Backward compatible with ASCII

---

## 5. Key Terms Dictionary

| Term | Definition |
|---|---|
| Malware | Malicious software |
| Virus | Self-replicating code attached to programs |
| Worm | Self-spreading malware over network |
| Trojan | Malware disguised as legitimate software |
| Ransomware | Encrypts files; demands ransom |
| Phishing | Fraudulent attempt to obtain sensitive info |
| Firewall | Network security device |
| VPN | Virtual Private Network |
| Encryption | Converting plaintext to ciphertext |
| Decryption | Reversing encryption |
| AES | Advanced Encryption Standard (symmetric) |
| RSA | Rivest-Shamir-Adleman (asymmetric) |
| SSL/TLS | Secure Sockets/Transport Layer Security |
| HTTPS | HTTP + TLS |
| Hash | One-way function for integrity |
| MAC | Message Authentication Code |
| Digital Signature | Electronic signature for authenticity |
| IDS | Intrusion Detection System |
| IPS | Intrusion Prevention System |
| CERT-In | Indian Computer Emergency Response Team |
| DPDP Act | Digital Personal Data Protection Act 2023 |
| Bit | Smallest unit of data (0 or 1) |
| Byte | 8 bits |
| Nibble | 4 bits |
| Binary | Base 2 number system |
| Octal | Base 8 number system |
| Hexadecimal | Base 16 number system |
| ASCII | American Standard Code for Information Interchange |

---

## 6. Comparison Tables

### 6.1 Virus vs Worm vs Trojan

| Feature | Virus | Worm | Trojan |
|---|---|---|---|
| Spreads | Via files | Network | Disguised software |
| Needs host | Yes | No | Yes |
| User action | Required | Not required | Required to install |
| Replication | With host | Self-replicating | No |
| Detection | Easier | Harder | Hardest (looks legit) |
| Example | Creeper | WannaCry (worm component) | Emotet |

### 6.2 Symmetric vs Asymmetric Encryption

| Feature | Symmetric | Asymmetric |
|---|---|---|
| Keys | Same | Different (public + private) |
| Speed | Fast | Slow |
| Security | Less (single key) | More (key pair) |
| Use | Bulk data | Key exchange, signatures |
| Examples | AES, DES | RSA, ECC |

### 6.3 Number Systems

| System | Base | Digits | Use |
|---|---|---|---|
| Binary | 2 | 0,1 | Internal computer |
| Octal | 8 | 0-7 | Short binary |
| Decimal | 10 | 0-9 | Human |
| Hexadecimal | 16 | 0-9, A-F | Memory, colours, MAC |

### 6.4 Firewall Types

| Type | Layer | Function |
|---|---|---|
| Packet-filter | Network (L3) | Examines packets (stateless) |
| Stateful | Network (L3-L4) | Tracks connections |
| Application/Proxy | Application (L7) | Filters by app |
| NGFW | All | Deep inspection + IPS |
| WAF | Application (L7) | Web app protection |

---

## 7. Practice Questions (20 MCQs)

**Q1.** Firewall operates as:
(a) First line of defense (b) Backup system (c) Hardware only (d) Software only
**Answer**: (a) First line of defense

**Q2.** AES stands for:
(a) Advanced Encryption Standard (b) American Encryption System (c) Applied Encryption Standard (d) Advanced Electronic Security
**Answer**: (a) Advanced Encryption Standard

**Q3.** Binary system has base:
(a) 2 (b) 8 (c) 10 (d) 16
**Answer**: (a) 2

**Q4.** Hexadecimal has base:
(a) 2 (b) 8 (c) 10 (d) 16
**Answer**: (d) 16

**Q5.** Hexadecimal uses digits:
(a) 0-9 (b) 0-9, A-F (c) 0-7 (d) 0-9, A-Z
**Answer**: (b) 0-9, A-F

**Q6.** Ransomware:
(a) Steals passwords (b) Encrypts files; demands ransom (c) Slows computer (d) Shows ads
**Answer**: (b) Encrypts files; demands ransom

**Q7.** Phishing is:
(a) Type of virus (b) Fraudulent attempt to steal info (c) Hardware attack (d) Network speedup
**Answer**: (b) Fraudulent attempt to obtain sensitive info

**Q8.** SSL/TLS is used for:
(a) Email (b) Encryption on web (c) Database (d) Programming
**Answer**: (b) Encryption on web

**Q9.** Binary 1101 in decimal is:
(a) 11 (b) 12 (c) 13 (d) 14
**Answer**: (c) 13 (8+4+0+1 = 13)

**Q10.** Decimal 25 in binary:
(a) 11001 (b) 10101 (c) 11010 (d) 10011
**Answer**: (a) 11001

**Q11.** Hexadecimal A5 in decimal:
(a) 155 (b) 160 (c) 165 (d) 170
**Answer**: (c) 165 (10×16 + 5 = 165)

**Q12.** 1 byte = how many bits:
(a) 4 (b) 8 (c) 16 (d) 32
**Answer**: (b) 8

**Q13.** 1 nibble = how many bits:
(a) 2 (b) 4 (c) 6 (d) 8
**Answer**: (b) 4

**Q14.** ASCII value of 'A':
(a) 48 (b) 65 (c) 97 (d) 100
**Answer**: (b) 65

**Q15.** Trojan Horse:
(a) Self-replicating (b) Disguised as legitimate (c) Encrypts files (d) Spreads via email
**Answer**: (b) Disguised as legitimate

**Q16.** SQL Injection is:
(a) Hardware attack (b) Database attack (c) Network speedup (d) Password change
**Answer**: (b) Database attack

**Q17.** DoS attack:
(a) Steals data (b) Overloads system (c) Installs malware (d) Encrypts files
**Answer**: (b) Overloads system

**Q18.** Octal 17 in decimal:
(a) 14 (b) 15 (c) 16 (d) 17
**Answer**: (b) 15 (1×8 + 7 = 15)

**Q19.** Decimal 10 in binary:
(a) 1000 (b) 1010 (c) 1100 (d) 1110
**Answer**: (b) 1010

**Q20.** CERT-In is established under which section of IT Act 2000?
(a) Section 43 (b) Section 65 (c) Section 70B (d) Section 79
**Answer**: (c) Section 70B

---

## 8. Quick Revision Sheet

### Top 25 Must-Knows
1. Cyber Security: Protecting systems/data
2. CIA Triad: Confidentiality, Integrity, Availability
3. Virus: Needs host; Worm: Self-spreads; Trojan: Disguised
4. Ransomware: Encrypts files for ransom
5. Phishing: Fraudulent email/website
6. Firewall: First line of defense
7. Encryption: Plaintext → Ciphertext
8. Symmetric: Same key (AES, DES)
9. Asymmetric: Public + Private key (RSA)
10. SSL/TLS: Web encryption (HTTPS uses TLS)
11. HTTPS: HTTP + TLS/SSL
12. CERT-In: Indian cyber response agency
13. IT Act 2000: India's cyber law
14. **DPDP Act 2023**: NEW data protection law (India)
15. Number Systems: Binary (2), Octal (8), Decimal (10), Hex (16)
16. Binary = 0,1; Octal = 0-7; Hex = 0-9, A-F
17. 1 Byte = 8 Bits; 1 Nibble = 4 Bits
18. Binary to Decimal: Position values (powers of 2)
19. Hex A = 10; B = 11; C = 12; D = 13; E = 14; F = 15
20. MD5: 128-bit hash (insecure)
21. SHA-256: Secure hash
22. DoS/DDoS: Denial of service
23. MITM: Man-in-the-middle attack
24. SQL Injection: Database attack
25. XSS: Cross-site scripting

### Mnemonics
- **CIA**: Confidentiality, Integrity, Availability
- **Number Systems by Base**: Binary (2), Octal (8), Decimal (10), Hex (16) = "BODH"
- **Hex letters**: A-F = 10-15
- **Cyber Threats**: "VWT" = Virus, Worm, Trojan

---
