# Practice Set: Computer Chapter 2 — Networking & Internet (IBPS PO Pattern)

**Exam Pattern:** IBPS PO Prelims
**Total Questions:** 10
**Time Target:** 30 seconds per question (5 minutes total)
**Difficulty:** Easy to Moderate
**Chapter Reference:** Computer/03_Networking_Internet.md

---

## Questions

### Q1. TCP is a:
(a) Connectionless protocol (b) Connection-oriented protocol (c) Routing protocol (d) Network protocol

**Answer: (b) Connection-oriented protocol**

**Solution:** TCP (Transmission Control Protocol) is a connection-oriented protocol. It establishes a connection before sending data (via the 3-way handshake: SYN, SYN-ACK, ACK) and ensures reliable data delivery through acknowledgements, sequencing, and error recovery. TCP is slower than UDP but more reliable. UDP (User Datagram Protocol) is connectionless and faster but less reliable. TCP is used for web browsing (HTTP/HTTPS), email (SMTP, POP3, IMAP), file transfer (FTP), and SSH. UDP is used for streaming (video, audio), gaming, DNS, and VoIP. TCP provides ordered, error-free delivery; UDP provides best-effort delivery.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.165-175 | **VERIFY:** No

---

### Q2. UDP is a:
(a) Connection-oriented protocol (b) Connectionless protocol (c) Routing protocol (d) Hardware protocol

**Answer: (b) Connectionless protocol**

**Solution:** UDP (User Datagram Protocol) is a connectionless protocol. It does not establish a connection before sending data, so it is faster than TCP but less reliable. UDP does not guarantee delivery, ordering, or error recovery. UDP has a smaller header (8 bytes) compared to TCP (20 bytes). UDP is used for applications where speed is more important than reliability: streaming (video, audio), online gaming, VoIP, DNS, DHCP, and SNMP. TCP is used for web, email, and file transfer. Both TCP and UDP operate at the Transport Layer (Layer 4) of the OSI model.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.165-180 | **VERIFY:** No

---

### Q3. The topmost layer of the OSI model is:
(a) Physical (b) Network (c) Application (d) Session

**Answer: (c) Application**

**Solution:** The topmost layer of the OSI model is the Application Layer (Layer 7). The OSI layers from top to bottom: 7. Application, 6. Presentation, 5. Session, 4. Transport, 3. Network, 2. Data Link, 1. Physical. Mnemonic: "All People Seem To Need Data Processing". The Application Layer is closest to the user and provides network services to applications. Examples: HTTP, HTTPS, FTP, SMTP, DNS, SNMP. The bottommost layer is the Physical Layer (Layer 1) which deals with bits, cables, and connectors. The OSI model has 7 layers; the TCP/IP model has 5 layers.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.117-135 | **VERIFY:** No

---

### Q4. The Ctrl + T shortcut in Chrome opens a:
(a) New window (b) New tab (c) New incognito window (d) New history tab

**Answer: (b) New tab**

**Solution:** The Ctrl + T shortcut in Google Chrome opens a New Tab. Other Chrome shortcuts: Ctrl + N (New window), Ctrl + Shift + N (New incognito window), Ctrl + W (Close current tab), Ctrl + Shift + T (Reopen closed tab), Ctrl + H (History), Ctrl + J (Downloads), Ctrl + L (Focus address bar), Ctrl + D (Bookmark), F5 (Reload page), F11 (Fullscreen). These keyboard shortcuts improve browsing efficiency. Chrome also has many built-in features like tab groups, profile switching, and password manager.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.222-228 | **VERIFY:** No

---

### Q5. A Hub operates at OSI Layer:
(a) 1 (b) 2 (c) 3 (d) 7

**Answer: (a) 1**

**Solution:** A Hub operates at Layer 1 (Physical Layer) of the OSI model. It is a basic networking device that broadcasts incoming data to all connected devices. It is not intelligent (no MAC address learning). It is slower and less secure than a Switch. Other devices: Switch (Layer 2 - Data Link, uses MAC addresses), Router (Layer 3 - Network, uses IP addresses), Bridge (Layer 2), Repeater (Layer 1), Modem, NIC (Layer 1 & 2), Gateway (All layers). Hubs are now largely replaced by switches in modern networks. The OSI model has 7 layers: Application, Presentation, Session, Transport, Network, Data Link, Physical.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.58-80 | **VERIFY:** No

---

### Q6. POP3 is used to:
(a) Send email (b) Download email (c) Filter spam (d) Encrypt email

**Answer: (b) Download email**

**Solution:** POP3 (Post Office Protocol v3) is used to download email from the server to the local device. POP3 typically deletes the email from the server after download. POP3 uses port 110 (995 for secure). IMAP (Internet Message Access Protocol) is used to sync email across multiple devices, keeping email on the server. SMTP is used to send email. Most modern email clients use IMAP instead of POP3 because of the multi-device sync capability. The official IETF documents for POP3 is RFC 1939. POP3 supports simple download and delete; IMAP supports remote folder management.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.293-300 | **VERIFY:** No

---

### Q7. IPv4 address size is:
(a) 32-bit (b) 64-bit (c) 128-bit (d) 256-bit

**Answer: (a) 32-bit**

**Solution:** IPv4 address is 32 bits, displayed in dotted-decimal format (e.g., 192.168.1.1). IPv4 supports ~4.3 billion addresses, which is insufficient for the growing internet. IPv6 (128-bit) is the successor with ~340 undecillion addresses. IPv4 address is divided into 4 octets (8 bits each). IPv4 is still widely used today, but IPv6 adoption is increasing. Special IPv4 addresses: 127.0.0.1 (loopback), 192.168.x.x (private), 10.x.x.x (private), 172.16-31.x.x (private). IPv4 uses NAT (Network Address Translation) to extend its usability. The transition from IPv4 to IPv6 is ongoing globally.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.91-105 | **VERIFY:** No

---

### Q8. WAN stands for:
(a) Wireless Area Network (b) Wide Area Network (c) Wired Area Network (d) Web Area Network

**Answer: (b) Wide Area Network**

**Solution:** WAN stands for Wide Area Network. WAN covers a large geographical area — country or world. The Internet is the largest WAN. WAN has slower speeds than LAN. Examples: Internet, leased lines, satellite networks. Network types by coverage: PAN (Personal Area Network, ~10m), LAN (Local Area Network, building), CAN (Campus Area Network, campus), MAN (Metropolitan Area Network, city), WAN (Wide Area Network, country/world). Specialized networks: SAN (Storage Area Network), VPN (Virtual Private Network). WAN is typically operated by telecom companies and ISPs.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.21-30 | **VERIFY:** No

---

### Q9. HTTPS uses port:
(a) 80 (b) 443 (c) 21 (d) 25

**Answer: (b) 443**

**Solution:** HTTPS uses port 443. HTTP uses port 80. FTP uses port 21. SMTP uses port 25 (465, 587 for secure). POP3 uses port 110 (995 for secure). IMAP uses port 143 (993 for secure). DNS uses port 53. Ports are logical endpoints for communication. There are 65,535 ports (0-65535). Ports 0-1023 are "well-known" ports. Port 443 is used for HTTPS (HTTP over SSL/TLS). When you see https:// in a URL, the connection is on port 443. Most modern websites use HTTPS by default.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.198-210 | **VERIFY:** No

---

### Q10. SMTP is used for:
(a) Receiving email (b) Sending email (c) Storing email (d) Filtering email

**Answer: (b) Sending email**

**Solution:** SMTP (Simple Mail Transfer Protocol) is used for sending email. SMTP uses port 25 (or 465, 587 for secure). POP3 (port 110) is used to download email. IMAP (port 143) is used to sync email. Email is sent using SMTP and received using POP3 or IMAP. Webmail (Gmail, Outlook) uses SMTP for sending and IMAP for receiving. MIME (Multipurpose Internet Mail Extensions) is used for email attachments and non-ASCII text. Modern email uses TLS encryption (SMTPS, POP3S, IMAPS) on alternate ports for security.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.286-300 | **VERIFY:** No

---

## Answer Key Summary

| Q | Ans | Q | Ans |
|---|---|---|---|
| 1 | (b) | 6 | (b) |
| 2 | (b) | 7 | (a) |
| 3 | (c) | 8 | (b) |
| 4 | (b) | 9 | (b) |
| 5 | (a) | 10 | (b) |

---

**Source Files:**
-

**Total Marks Possible:** 10 × 1 = 10
**Time Available:** 5 minutes
**Average Time per Question:** 30 seconds
