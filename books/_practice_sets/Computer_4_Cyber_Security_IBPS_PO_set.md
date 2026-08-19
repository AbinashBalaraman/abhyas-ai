# Practice Set: Computer Chapter 4 — Cyber Security & Number Systems (IBPS PO Pattern)

**Exam Pattern:** IBPS PO Prelims
**Total Questions:** 10
**Time Target:** 30 seconds per question (5 minutes total)
**Difficulty:** Easy to Moderate
**Chapter Reference:** Computer/05_Cyber_Security_Number_Systems.md

---

## Questions

### Q1. The DoS attack is:
(a) Steals data (b) Overloads system (c) Installs malware (d) Encrypts files

**Answer: (b) Overloads system**

**Solution:** A DoS (Denial of Service) attack overloads a system with traffic or requests, making it unavailable to legitimate users. A DDoS (Distributed DoS) attack uses multiple systems to launch the attack simultaneously, making it harder to mitigate. Common DDoS attack types: SYN Flood, UDP Flood, ICMP Flood, HTTP Flood, Slowloris. Mitigation: rate limiting, firewalls, DDoS protection services (Cloudflare, Akamai), traffic analysis, CDNs. Notable attacks: GitHub (2018, 1.35 Tbps), Dyn DNS (2016), Spamhaus (2013). DoS/DDoS attacks are often used by hacktivists, criminals for extortion, or nation-state actors.

**Time Target:** 30s | **Chapter Reference:** Computer/05_Cyber_Security_Number_Systems.md, p.42-50 | **VERIFY:** No

---

### Q2. SQL Injection is a:
(a) Hardware attack (b) Database attack (c) Network speedup (d) Password change

**Answer: (b) Database attack**

**Solution:** SQL Injection is a code injection attack that targets databases. The attacker inserts malicious SQL code into a query (typically through a web form input) to manipulate the database. Effects: bypassing authentication, stealing data, modifying/deleting data, executing administrative operations. Famous examples: Heartland Payment Systems (2008, 130 million cards), TalkTalk (2015), 7-Eleven (2010). Protection: parameterized queries/prepared statements, input validation, escaping special characters, stored procedures, ORM frameworks. SQL Injection is consistently in the OWASP Top 10 (most critical web application security risks). It is a common attack vector in banking and financial applications.

**Time Target:** 30s | **Chapter Reference:** Computer/05_Cyber_Security_Number_Systems.md, p.44-50 | **VERIFY:** No

---

### Q3. The Octal 17 in decimal is:
(a) 14 (b) 15 (c) 16 (d) 17

**Answer: (b) 15**

**Solution:** The Octal 17 in decimal is 15. Conversion: 17₈ = (1×8¹) + (7×8⁰) = 8 + 7 = 15. Octal is base 8 and uses digits 0-7. Each octal digit = 3 binary bits. Octal is sometimes used in computing (less common than hexadecimal). Conversion examples: 0o17 (octal) = 15 (decimal); 0o20 (octal) = 16 (decimal); 0o10 (octal) = 8 (decimal); 0o7 (octal) = 7 (decimal). Octal is rarely used in modern computing but was common in older systems (PDP-11). Hexadecimal is the more common base used in modern computing.

**Time Target:** 30s | **Chapter Reference:** Computer/05_Cyber_Security_Number_Systems.md, p.215-230 | **VERIFY:** No

---

### Q4. The decimal 10 in binary is:
(a) 1000 (b) 1010 (c) 1100 (d) 1110

**Answer: (b) 1010**

**Solution:** The decimal 10 in binary is 1010. Conversion using repeated division by 2: 10 ÷ 2 = 5 r 0; 5 ÷ 2 = 2 r 1; 2 ÷ 2 = 1 r 0; 1 ÷ 2 = 0 r 1. Read bottom to top: 1010₂. Verification: 1010₂ = 8 + 0 + 2 + 0 = 10. Other conversions: 5₁₀ = 101₂; 8₁₀ = 1000₂; 12₁₀ = 1100₂; 15₁₀ = 1111₂; 16₁₀ = 10000₂; 20₁₀ = 10100₂. The Decimal to Binary conversion is fundamental in computing. The binary number system uses only two digits (0 and 1) and is the internal language of computers.

**Time Target:** 30s | **Chapter Reference:** Computer/05_Cyber_Security_Number_Systems.md, p.205-220 | **VERIFY:** No

---

### Q5. UTF-8 is:
(a) 8-bit encoding (b) Unicode Transformation Format (c) Both (a) and (b) (d) Compressed format

**Answer: (c) Both (a) and (b)**

**Solution:** UTF-8 is both an 8-bit encoding and a Unicode Transformation Format. UTF-8 is a variable-width character encoding that can represent every character in the Unicode character set. UTF-8 uses 1-4 bytes per character (1 byte for ASCII, 2-3 for most languages, 4 for rare characters). UTF-8 is the dominant character encoding on the web (~98% of web pages). It is backward compatible with ASCII. UTF-8 was invented by Ken Thompson (also of UNIX fame) and Rob Pike. Other Unicode encodings: UTF-16 (2-4 bytes), UTF-32 (always 4 bytes). UTF-8 is widely used in HTML, JSON, XML, databases, and programming languages.

**Time Target:** 30s | **Chapter Reference:** Computer/05_Cyber_Security_Number_Systems.md, p.290-300 | **VERIFY:** No

---

### Q6. CERT-In is:
(a) Central Emergency Response Team - India (b) Computer Emergency Response Team - India (c) Cyber Emergency Response Team - India (d) None

**Answer: (b) Computer Emergency Response Team - India**

**Solution:** CERT-In stands for Indian Computer Emergency Response Team. It is the national agency for cyber incident response in India. CERT-In was established under Section 70B of the IT Act, 2000. CERT-In operates under the Ministry of Electronics and Information Technology (MeitY). CERT-In's functions: collect, analyze, and disseminate information on cyber incidents; forecast and issue alerts on cybersecurity threats; coordinate incident response; issue guidelines, advisories, and white papers on cybersecurity. CERT-In is India's equivalent of US-CERT. In April 2022, CERT-In issued new cybersecurity directions requiring companies to report cyber incidents within 6 hours.

**Time Target:** 30s | **Chapter Reference:** Computer/05_Cyber_Security_Number_Systems.md, p.150-160 | **VERIFY:** No

---

### Q7. The IT Act 2000 was amended in:
(a) 2005 (b) 2008 (c) 2012 (d) 2018

**Answer: (b) 2008**

**Solution:** The IT Act, 2000 was amended in 2008 (called the IT Act, 2008). The IT Act 2000 provides the legal framework for e-commerce, digital signatures, and cyber crimes in India. The 2008 amendment added several new sections (43, 65, 66, 66A, 66B, 66C, 66D, 66E) dealing with various cyber offences. Section 66A (which criminalized "offensive" messages online) was struck down by the Supreme Court in 2015 in the Shreya Singhal case. Section 69 gives government interception powers. Section 79 deals with intermediary liability. The IT Act 2008 amendment was a major overhaul.

**Time Target:** 30s | **Chapter Reference:** Computer/05_Cyber_Security_Number_Systems.md, p.155-160 | **VERIFY:** No

---

### Q8. The WannaCry ransomware attack happened in:
(a) 2015 (b) 2017 (c) 2019 (d) 2020

**Answer: (b) 2017**

**Solution:** The WannaCry ransomware attack happened in May 2017. It was a global cyber attack that affected 230,000+ computers in 150+ countries. WannaCry exploited a vulnerability in Windows (EternalBlue) leaked from the NSA. The attack hit the UK's NHS, FedEx, Telefónica, and many others. The damage was estimated at billions of dollars. A security researcher (Marcus Hutchins) found a kill switch that slowed the attack. The attack highlighted the importance of patching systems and cybersecurity. WannaCry demanded ransom in Bitcoin. The attackers (Lazarus Group) were linked to North Korea.

**Time Target:** 30s | **Chapter Reference:** Computer/05_Cyber_Security_Number_Systems.md, p.165-170 | **VERIFY:** No

---

### Q9. The "Heartbleed" vulnerability is in:
(a) Linux kernel (b) OpenSSL (c) Windows (d) Apache

**Answer: (b) OpenSSL**

**Solution:** Heartbleed is a critical vulnerability in OpenSSL's heartbeat extension, discovered in April 2014. It allows attackers to read sensitive data (passwords, keys, certificates) from the memory of affected servers. Heartbleed affected about 17% of SSL servers at the time. OpenSSL is the most widely used cryptographic library. The vulnerability was discovered independently by Neel Mehta (Google) and the Codenomicon team. The fix was released on the same day. Heartbleed highlighted the need for better software testing and security. The vulnerability was due to a missing bounds check in the TLS heartbeat extension.

**Time Target:** 30s | **Chapter Reference:** Computer/05_Cyber_Security_Number_Systems.md, p.165-170 | **VERIFY:** No

---

### Q10. The "MD5" is a:
(a) Symmetric encryption (b) Hash function (c) Asymmetric encryption (d) Network protocol

**Answer: (b) Hash function**

**Solution:** MD5 (Message-Digest Algorithm 5) is a widely used hash function. It produces a 128-bit (16-byte) hash value, typically rendered as a 32-character hexadecimal number. MD5 is now considered insecure due to vulnerabilities. SHA-1 (160-bit hash) is also considered weak. SHA-256 (256-bit) is currently the recommended hash function. Hash functions are one-way (cannot be reversed) and produce a fixed-size output. They are used for data integrity verification, password hashing, and digital signatures. Other hash functions: SHA-1, SHA-256, SHA-3, BLAKE2.

**Time Target:** 30s | **Chapter Reference:** Computer/05_Cyber_Security_Number_Systems.md, p.118-125 | **VERIFY:** No

---

## Answer Key Summary

| Q | Ans | Q | Ans |
|---|---|---|---|
| 1 | (b) | 6 | (b) |
| 2 | (b) | 7 | (b) |
| 3 | (b) | 8 | (b) |
| 4 | (b) | 9 | (b) |
| 5 | (c) | 10 | (b) |

---

**Source Files:**
-

**Total Marks Possible:** 10 × 1 = 10
**Time Available:** 5 minutes
**Average Time per Question:** 30 seconds
