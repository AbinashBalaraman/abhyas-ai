# Practice Set: Computer Chapter 2 — Networking & Internet (SSC CGL Pattern)

**Exam Pattern:** SSC CGL Tier-I
**Total Questions:** 15
**Time Target:** 60 seconds per question (15 minutes total)
**Difficulty:** Moderate
**Chapter Reference:** Computer/03_Networking_Internet.md

---

## Questions

### Q1. The full form of LAN is:
(a) Large Area Network (b) Local Area Network (c) Long Area Network (d) Linked Area Network

**Answer: (b) Local Area Network**

**Solution:** LAN stands for Local Area Network. It covers a small geographical area like a building or office. LAN has the highest speed among all network types. Examples: school computer lab, office network, home network. Network types by coverage: PAN (Personal Area Network, ~10m), LAN (Local Area Network, building), CAN (Campus Area Network, campus), MAN (Metropolitan Area Network, city), WAN (Wide Area Network, country/world). Other specialized networks: SAN (Storage Area Network), VPN (Virtual Private Network). LAN typically uses Ethernet cables or Wi-Fi. Speed: 100 Mbps to 10 Gbps.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.18-30 | **VERIFY:** No

---

### Q2. PAN stands for:
(a) Private Area Network (b) Personal Area Network (c) Public Area Network (d) Primary Area Network

**Answer: (b) Personal Area Network**

**Solution:** PAN stands for Personal Area Network. It covers a very small area (about 10 meters), connecting personal devices. Examples: Bluetooth headset to phone, smartwatch to phone, wireless mouse to laptop. PAN technologies include Bluetooth, Infrared, NFC (Near Field Communication). The PAN is the smallest and most personal network. Other network types by coverage: LAN (Local Area Network, building), CAN (Campus Area Network, campus), MAN (Metropolitan Area Network, city), WAN (Wide Area Network, country/world). The coverage area increases from PAN to WAN.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.21-30 | **VERIFY:** No

---

### Q3. Which device operates at Layer 3 (Network Layer) of the OSI model?
(a) Hub (b) Switch (c) Router (d) Repeater

**Answer: (c) Router**

**Solution:** The Router operates at Layer 3 (Network Layer) of the OSI model. Router connects different networks and uses IP addresses to forward data packets between them. The OSI layer classification: Hub (Layer 1 - Physical), Switch (Layer 2 - Data Link, uses MAC addresses), Router (Layer 3 - Network, uses IP addresses), Bridge (Layer 2), Repeater (Layer 1), Modem (various), NIC (Layer 1 & 2), Gateway (All layers). Routers are the backbone of the internet, directing traffic between networks. Examples: home router, enterprise router, ISP router.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.58-70 | **VERIFY:** No

---

### Q4. The MAC address is how many bits?
(a) 32 (b) 48 (c) 64 (d) 128

**Answer: (b) 48**

**Solution:** The MAC (Media Access Control) address is 48 bits (6 bytes). It is in hexadecimal format, displayed as 6 pairs of hex digits separated by colons or hyphens (e.g., 00:1A:2B:3C:4D:5E). The MAC address is the physical address of a network device, assigned by the manufacturer. It is permanent and unique. MAC addresses operate at Layer 2 (Data Link Layer) of the OSI model. The first 24 bits (OUI - Organizationally Unique Identifier) identify the manufacturer. The remaining 24 bits are the device serial number. MAC addresses are used for local network communication; IP addresses are used for global communication.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.105-115 | **VERIFY:** No

---

### Q5. The IPv6 address size is:
(a) 32-bit (b) 64-bit (c) 128-bit (d) 256-bit

**Answer: (c) 128-bit**

**Solution:** The IPv6 address is 128 bits. IPv6 is in hexadecimal format (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334). IPv6 was developed to address the exhaustion of IPv4 addresses. IPv6 provides ~340 undecillion (3.4 × 10³⁸) addresses, virtually unlimited. IPv4 (32-bit) supports ~4.3 billion addresses. IPv6 has built-in security (IPSec), simplified header, no need for NAT, and better mobility. IPv4 is still widely used. Transition mechanisms: Dual Stack, Tunneling (6to4, Teredo), Translation (NAT64). India has been actively transitioning to IPv6.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.91-103 | **VERIFY:** No

---

### Q6. The number of layers in the OSI model is:
(a) 4 (b) 5 (c) 7 (d) 9

**Answer: (c) 7**

**Solution:** The OSI (Open Systems Interconnection) model has 7 layers. The layers (top to bottom): 7. Application, 6. Presentation, 5. Session, 4. Transport, 3. Network, 2. Data Link, 1. Physical. Mnemonic: "All People Seem To Need Data Processing" (Application, Presentation, Session, Transport, Network, Data Link, Physical). The OSI model was developed by ISO in 1984. The TCP/IP model has 5 layers: Application, Transport, Network, Data Link, Physical. The OSI model is a reference model; the TCP/IP model is the practical implementation used in the internet. The OSI model defines how data moves through a network.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.117-135 | **VERIFY:** No

---

### Q7. The HTTP port number is:
(a) 21 (b) 25 (c) 80 (d) 110

**Answer: (c) 80**

**Solution:** The HTTP port number is 80. HTTPS uses port 443. FTP uses port 21. SMTP uses port 25 (or 465, 587 for secure). POP3 uses port 110 (995 for secure). IMAP uses port 143 (993 for secure). DNS uses port 53. Ports are logical endpoints for communication in TCP/IP networking. There are 65,535 ports (0-65535). Ports 0-1023 are "well-known" ports. Port 80 is used for unencrypted web traffic. Port 443 is used for encrypted web traffic (HTTPS with SSL/TLS). Web servers listen on port 80 (HTTP) and 443 (HTTPS).

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.197-210 | **VERIFY:** No

---

### Q8. HTTPS stands for:
(a) HyperText Transfer Protocol Standard (b) HyperText Transfer Protocol Secure (c) High Text Transfer Protocol Secure (d) HyperText Translation Protocol Secure

**Answer: (b) HyperText Transfer Protocol Secure**

**Solution:** HTTPS stands for HyperText Transfer Protocol Secure. It is HTTP with SSL/TLS (Secure Sockets Layer/Transport Layer Security) encryption. HTTPS encrypts data transmitted between the client and server, providing confidentiality, integrity, and authentication. HTTPS uses port 443, while HTTP uses port 80. HTTPS is now the standard for all websites (Google Chrome marks HTTP sites as "Not Secure"). TLS 1.3 is the current standard (2024). HTTPS uses digital certificates issued by Certificate Authorities (CAs). The padlock icon in the browser indicates HTTPS.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.257-265 | **VERIFY:** No

---

### Q9. The World Wide Web (WWW) was invented by:
(a) Tim Berners-Lee (b) Vint Cerf (c) Bill Gates (d) Steve Jobs

**Answer: (a) Tim Berners-Lee**

**Solution:** The World Wide Web (WWW) was invented by Sir Tim Berners-Lee in 1989 at CERN (European Organization for Nuclear Research). Berners-Lee developed the three foundational technologies of the Web: HTML (HyperText Markup Language), URI/URL (Uniform Resource Identifier/Locator), and HTTP (HyperText Transfer Protocol). He also wrote the first web browser and the first web server. Vint Cerf is known as the "Father of the Internet" (co-inventor of TCP/IP). Bill Gates founded Microsoft. Steve Jobs co-founded Apple. Berners-Lee is now the Director of the W3C (World Wide Web Consortium).

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.230-235 | **VERIFY:** No

---

### Q10. SMTP is used for:
(a) Receiving email (b) Sending email (c) Storing email (d) Filtering email

**Answer: (b) Sending email**

**Solution:** SMTP (Simple Mail Transfer Protocol) is used for sending email. SMTP uses ports 25, 465 (secure), or 587. POP3 (Post Office Protocol v3) is used to download email to local device (port 110; 995 for secure). IMAP (Internet Message Access Protocol) is used to sync email across multiple devices (port 143; 993 for secure). Email is sent using SMTP and received using POP3 or IMAP. Webmail (Gmail, Outlook) uses IMAP for receiving and SMTP for sending. MIME (Multipurpose Internet Mail Extensions) is used for email attachments.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.286-305 | **VERIFY:** No

---

### Q11. The IMAP port is:
(a) 25 (b) 110 (c) 143 (d) 587

**Answer: (c) 143**

**Solution:** The IMAP (Internet Message Access Protocol) port is 143. Secure IMAP (IMAPS) uses port 993. SMTP uses port 25 (or 465, 587). POP3 uses port 110 (or 995 for secure). Email protocols: SMTP (sending), POP3 (downloading), IMAP (syncing). IMAP is preferred over POP3 for modern email use as it allows email to be synced across multiple devices. IMAP keeps email on the server. Most modern email clients (Gmail, Outlook) use IMAP for receiving email. Email ports are standardized by IANA.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.198-205 | **VERIFY:** No

---

### Q12. The full form of ISP is:
(a) Internet Service Provider (b) Internet Server Protocol (c) Internal Service Provider (d) Internet Support Provider

**Answer: (a) Internet Service Provider**

**Solution:** ISP stands for Internet Service Provider. An ISP is a company that provides users access to the Internet. Examples in India: Jio, Airtel, BSNL, MTNL, ACT Fibernet, Vodafone-Idea, Hathway. ISPs provide various types of internet connections: broadband (DSL, cable, fiber), dial-up, wireless (3G, 4G, 5G), satellite. ISPs are regulated by TRAI (Telecom Regulatory Authority of India) in India. ISPs assign IP addresses to customers (dynamic or static). Major ISP categories: Tier 1, Tier 2, Tier 3. ISPs interconnect at Internet Exchange Points (IXPs).

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.251-260 | **VERIFY:** No

---

### Q13. The Switch operates at which OSI layer?
(a) Layer 1 (b) Layer 2 (c) Layer 3 (d) Layer 4

**Answer: (b) Layer 2**

**Solution:** The Switch operates at Layer 2 (Data Link Layer) of the OSI model. Switch uses MAC addresses to forward data frames to the specific destination device. It is an intelligent device (compared to Hub which broadcasts to all). Switch is faster and more secure than Hub. Other devices and their OSI layers: Hub (Layer 1 - Physical, broadcasts to all), Switch (Layer 2 - Data Link, uses MAC), Router (Layer 3 - Network, uses IP), Bridge (Layer 2), Repeater (Layer 1), Modem (various), NIC (Layer 1 & 2), Gateway (All layers). Modern switches can also operate at Layer 3 (Layer 3 switches for routing).

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.73-80 | **VERIFY:** No

---

### Q14. Firefox was developed by:
(a) Microsoft (b) Google (c) Mozilla (d) Apple

**Answer: (c) Mozilla**

**Solution:** Mozilla Firefox was developed by the Mozilla Foundation and its subsidiary, the Mozilla Corporation. Firefox is an open-source web browser released under the Mozilla Public License. Firefox was first released in November 2004. Other web browsers: Google Chrome (Google), Microsoft Edge (Microsoft), Safari (Apple), Opera. Chrome is the most popular browser worldwide. Firefox is known for its privacy features, customization, and open-source nature. The Mozilla Foundation is a non-profit organization. Firefox is available for Windows, macOS, Linux, Android, and iOS.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.224-228 | **VERIFY:** No

---

### Q15. HTTPS uses which encryption?
(a) AES (b) SSL/TLS (c) RSA (d) DES

**Answer: (b) SSL/TLS**

**Solution:** HTTPS (HTTP Secure) uses SSL/TLS (Secure Sockets Layer/Transport Layer Security) encryption. SSL is the older name; TLS is the modern successor. TLS 1.3 is the current standard (2024). HTTPS encrypts data transmitted between the client (browser) and server, providing confidentiality, integrity, and authentication. HTTPS uses port 443 (HTTP uses port 80). HTTPS is essential for secure transactions like online banking, e-commerce, and login forms. Digital certificates are issued by Certificate Authorities (CAs) to verify the server's identity. Most modern websites use HTTPS by default.

**Time Target:** 30s | **Chapter Reference:** Computer/03_Networking_Internet.md, p.265-275 | **VERIFY:** No

---

## Answer Key Summary

| Q | Ans | Q | Ans | Q | Ans |
|---|---|---|---|---|---|
| 1 | (b) | 6 | (c) | 11 | (c) |
| 2 | (b) | 7 | (c) | 12 | (a) |
| 3 | (c) | 8 | (b) | 13 | (b) |
| 4 | (b) | 9 | (a) | 14 | (c) |
| 5 | (c) | 10 | (b) | 15 | (b) |

---

**Source Files:**
-

**Total Marks Possible:** 15 × 1 = 15
**Time Available:** 15 minutes
**Average Time per Question:** 60 seconds
