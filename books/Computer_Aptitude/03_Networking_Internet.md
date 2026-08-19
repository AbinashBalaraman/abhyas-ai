# Computer Networking & Internet

## 1. Core Concepts: Networking

### 1.1 What is a Computer Network?

A network is a group of two or more computers/devices connected together to share data, resources, and services.

```
Network Benefits:
├── Resource sharing (printers, files)
├── Communication (email, chat)
├── Data sharing
├── Centralised management
└── Cost efficiency
```

### 1.2 Types of Computer Networks

#### A. By Geographical Area

| Network Type | Full Form | Coverage | Speed | Example |
|---|---|---|---|---|
| **PAN** | Personal Area Network | Personal devices (10m) | High | Bluetooth headset to phone |
| **LAN** | Local Area Network | Building/office | Highest | School computer lab |
| **CAN** | Campus Area Network | Campus/organisation | High | University campus network |
| **MAN** | Metropolitan Area Network | City | Medium | City cable TV network |
| **WAN** | Wide Area Network | Country/world | Slowest | Internet |

#### B. Specialised Networks

**SAN (Storage Area Network)**:
- High-speed network connecting storage devices
- Operates at Network Layer
- Example: Bank data storage system

**VPN (Virtual Private Network)**:
- Private network over public internet
- Encrypts data; secure communication
- Provides secure remote access
- Example: Work from home

### 1.3 Network Topologies

| Topology | Description | Pros | Cons |
|---|---|---|---|
| **Bus** | All devices on single central cable | Easy, cheap | If backbone fails, entire network fails |
| **Star** | All devices connected to central hub/switch | Easy troubleshooting | Hub failure affects all |
| **Ring** | Devices in circular fashion | Equal access | One break can affect all |
| **Mesh** | Every device connected to every other | Very reliable | Expensive |
| **Tree** | Hierarchical (combination of star) | Scalable | Complex |
| **Hybrid** | Combination | Flexible | Costly |

---

## 2. Networking Devices

### 2.1 Common Devices

| Device | Function | OSI Layer |
|---|---|---|
| **Hub** | Basic networking device; broadcasts to all | Layer 1 (Physical) |
| **Switch** | Intelligent device; sends data to specific device via MAC | Layer 2 (Data Link) |
| **Router** | Connects different networks; uses IP address | Layer 3 (Network) |
| **Modem** | Modulator-Demodulator; converts digital↔analog | — |
| **Repeater** | Boosts/regenerates weak signals | Layer 1 (Physical) |
| **Bridge** | Connects two similar networks; reduces traffic | Layer 2 (Data Link) |
| **Gateway** | Connects dissimilar networks; protocol converter | All layers |
| **NIC** | Network Interface Card; connects computer to network | Layer 1 & 2 |
| **Access Point** | Wireless connectivity (Wi-Fi) | Layer 1 & 2 |
| **Firewall** | Network security; filters traffic | Various |

### 2.2 Hub vs Switch

| Feature | Hub | Switch |
|---|---|---|
| Intelligence | No (basic) | Yes |
| Data sending | To all devices | To specific device |
| Speed | Slower | Faster |
| Security | Less | More |
| OSI Layer | 1 (Physical) | 2 (Data Link) |

---

## 3. IP Address and MAC Address

### 3.1 IP Address

**Internet Protocol Address** — unique numerical address assigned to a device on a network/internet.

**IPv4**:
- 32-bit address
- Decimal format
- Example: 192.168.1.1

**IPv6**:
- 128-bit address
- Hexadecimal format
- Example: 2001:0db8:85a3:0000:0000:8a2e:0370:7334

**Types**:
- **Static IP**: Permanent; assigned manually
- **Dynamic IP**: Changes; assigned by ISP/DHCP

### 3.2 MAC Address

**Media Access Control Address** — physical address of a network device.

- 48-bit address
- Hexadecimal format
- Example: 00:1A:2B:3C:4D:5E
- Permanent and unique (assigned by manufacturer)
- Used for device identification within local network

---

## 4. OSI Model — 7 Layers

The **OSI (Open Systems Interconnection)** model defines how data moves through a network. It has 7 layers:

```
Layer 7: Application     → User interface (HTTP, FTP, SMTP)
Layer 6: Presentation    → Data format (SSL/TLS, JPEG)
Layer 5: Session         → Connection management (NetBIOS)
Layer 4: Transport       → End-to-end (TCP, UDP)
Layer 3: Network         → Routing (IP, ICMP)
Layer 2: Data Link       → Frames (Ethernet, MAC)
Layer 1: Physical        → Bits (Cables, Hubs)
```

### 4.1 Mnemonic: "All People Seem To Need Data Processing"
- **A**pplication
- **P**resentation
- **S**ession
- **T**ransport
- **N**etwork
- **D**ata Link
- **P**hysical

### 4.2 Layer Functions

| Layer | Function | Protocols/Examples |
|---|---|---|
| 7. Application | User interface; network services to apps | HTTP, FTP, SMTP, DNS |
| 6. Presentation | Data translation; encryption | SSL/TLS, JPEG, ASCII |
| 5. Session | Establish/maintain/terminate sessions | NetBIOS, RPC |
| 4. Transport | Reliable delivery; segmentation | TCP, UDP |
| 3. Network | Routing; logical addressing | IP, ICMP, ARP |
| 2. Data Link | Frames; MAC addressing | Ethernet, PPP, Wi-Fi |
| 1. Physical | Bits over media | Cables, Connectors, Hubs |

---

## 5. TCP/IP Model — 5 Layers

The TCP/IP model is the practical implementation of networking used in the Internet:

```
Layer 5: Application     (HTTP, FTP, DNS, SMTP)
Layer 4: Transport       (TCP, UDP)
Layer 3: Network         (IP, ICMP)
Layer 2: Data Link       (Ethernet, Wi-Fi)
Layer 1: Physical        (Cables, Radio waves)
```

**TCP vs UDP**:

| Feature | TCP | UDP |
|---|---|---|
| Full Form | Transmission Control Protocol | User Datagram Protocol |
| Connection | Connection-oriented | Connectionless |
| Reliability | High | Low |
| Speed | Slower | Faster |
| Use | Web, email, file transfer | Streaming, gaming, DNS |

---

## 6. Key Networking Protocols

| Protocol | Function | Layer |
|---|---|---|
| **HTTP** | HyperText Transfer Protocol (web) | Application |
| **HTTPS** | HTTP Secure (with SSL/TLS) | Application |
| **FTP** | File Transfer Protocol | Application |
| **SMTP** | Simple Mail Transfer Protocol (send email) | Application |
| **POP3** | Post Office Protocol (receive email) | Application |
| **IMAP** | Internet Message Access Protocol | Application |
| **DNS** | Domain Name System | Application |
| **DHCP** | Dynamic Host Configuration Protocol | Application |
| **TCP** | Reliable transmission | Transport |
| **UDP** | Fast transmission | Transport |
| **IP** | Internet addressing | Network |
| **ICMP** | Error reporting (ping) | Network |
| **ARP** | Address Resolution (IP → MAC) | Network |
| **SSL/TLS** | Secure communication | Presentation |

### Email Protocol Ports

| Protocol | Port |
|---|---|
| SMTP | 25, 465, 587 |
| POP3 | 110 |
| Secure POP3 | 995 |
| IMAP | 143 |
| Secure IMAP | 993 |
| HTTP | 80 |
| HTTPS | 443 |
| FTP | 21 |
| DNS | 53 |

---

## 7. Internet

### 7.1 What is Internet?

A global network of networks, connecting millions of computers worldwide using TCP/IP protocol.

### 7.2 Web Browser
Software to access information on WWW. Examples:
- **Google Chrome** (most popular)
- **Mozilla Firefox** (by Mozilla Foundation)
- **Microsoft Edge**
- **Safari** (Apple)
- **Opera**

**Mozilla Firefox was developed by Mozilla Foundation and its subsidiary Mozilla Corporation. Released under Mozilla Public License.**

### 7.3 World Wide Web (WWW)
Invented by **Tim Berners-Lee in 1989**. Developed HTML, HTTP, URLs that enabled hypertext linking of documents over the internet.

### 7.4 URL (Uniform Resource Locator)
Address of a web page. Format: `protocol://domain-name/path`

Example: `https://www.example.com/index.html`

Components:
- **Protocol** (https, http, ftp)
- **Subdomain** (www)
- **Domain name** (example)
- **Top-level domain** (.com, .org, .in)

**Common TLDs**:
- .com — Commercial
- .org — Organisation
- .net — Network
- .gov — Government
- .edu — Education
- .in — India

### 7.5 ISP (Internet Service Provider)
Company that provides users access to the internet. Examples: Jio, Airtel, BSNL, MTNL, ACT Fibernet.

### 7.6 Web Server
A computer that uses HTTP protocol to store, process, and deliver web pages. Examples: Apache, Nginx, IIS.

### 7.7 HTTP vs HTTPS

| Feature | HTTP | HTTPS |
|---|---|---|
| Full Form | HyperText Transfer Protocol | HyperText Transfer Protocol Secure |
| Port | 80 | 443 |
| Security | Less secure | Encrypted (SSL/TLS) |
| Use | Old websites | Modern secure sites |
| Certificate | Not required | SSL/TLS certificate |

### 7.8 Search Engines
- **Google** — Global leader
- **Baidu** — Dominant in China
- **Yahoo!** — Older
- **Bing** — Microsoft
- **DuckDuckGo** — Privacy-focused

---

## 8. Email

### 8.1 Email Components
- **Email Address**: username@domain.com
- **Inbox**: Received emails
- **Outbox/Sent**: Sent emails
- **Draft**: Unfinished emails
- **Spam**: Junk emails
- **BCC**: Blind Carbon Copy (hidden recipients)

### 8.2 Email Protocols

**SMTP (Simple Mail Transfer Protocol)**:
- Used for SENDING email
- Ports: 25, 465 (secure), 587

**POP3 (Post Office Protocol v3)**:
- DOWNLOADS email to local device
- Deletes from server by default
- Port: 110 (995 for secure)

**IMAP (Internet Message Access Protocol)**:
- SYNCS email; multiple devices
- Email remains on server
- Port: 143 (993 for secure)

### 8.3 MIME
**Multipurpose Internet Mail Extensions** — Standard for email attachments and non-ASCII text.

### 8.4 Spam Filtering
Modern email providers use machine learning to identify spam. Gmail spam filter analyses patterns, sender reputation, content.

---

## 9. Key Terms Dictionary

| Term | Definition |
|---|---|
| LAN | Local Area Network |
| WAN | Wide Area Network |
| MAN | Metropolitan Area Network |
| PAN | Personal Area Network |
| CAN | Campus Area Network |
| SAN | Storage Area Network |
| VPN | Virtual Private Network |
| ISP | Internet Service Provider |
| IP | Internet Protocol |
| MAC | Media Access Control |
| TCP | Transmission Control Protocol |
| UDP | User Datagram Protocol |
| HTTP | HyperText Transfer Protocol |
| HTTPS | HTTP Secure |
| FTP | File Transfer Protocol |
| DNS | Domain Name System |
| SMTP | Simple Mail Transfer Protocol |
| POP3 | Post Office Protocol v3 |
| IMAP | Internet Message Access Protocol |
| URL | Uniform Resource Locator |
| WWW | World Wide Web |
| HTML | HyperText Markup Language |
| XML | eXtensible Markup Language |
| NIC | Network Interface Card |
| DHCP | Dynamic Host Configuration Protocol |

---

## 10. Comparison Tables

### 10.1 LAN vs WAN

| Feature | LAN | WAN |
|---|---|---|
| Coverage | Small (building) | Large (world) |
| Speed | High | Lower |
| Cost | Low | High |
| Ownership | Single org | Multiple |
| Example | Office | Internet |

### 10.2 IPv4 vs IPv6

| Feature | IPv4 | IPv6 |
|---|---|---|
| Address size | 32-bit | 128-bit |
| Format | Decimal | Hexadecimal |
| Addresses | ~4.3 billion | ~340 undecillion |
| Header | Complex | Simplified |
| Security | Optional | Built-in (IPSec) |

### 10.3 TCP vs UDP

| Feature | TCP | UDP |
|---|---|---|
| Connection | Connection-oriented | Connectionless |
| Reliability | High | Low |
| Speed | Slower | Faster |
| Header size | 20 bytes | 8 bytes |
| Use | Web, email | Streaming, gaming |

### 10.4 HTTP vs HTTPS

| Feature | HTTP | HTTPS |
|---|---|---|
| Port | 80 | 443 |
| Encryption | No | Yes (SSL/TLS) |
| Speed | Faster | Slightly slower |
| Certificate | Not needed | Required |

---

## 11. Practice Questions (20)

**Q1.** Full form of LAN:
(a) Large Area Network
(b) Local Area Network
(c) Long Area Network
(d) Linked Area Network

**Answer: (b)**

**Q2.** PAN stands for:
(a) Private Area Network
(b) Personal Area Network
(c) Public Area Network
(d) Primary Area Network

**Answer: (b)**

**Q3.** Which device operates at Layer 3 (Network Layer)?
(a) Hub
(b) Switch
(c) Router
(d) Repeater

**Answer: (c)**

**Q4.** MAC address is how many bits?
(a) 32
(b) 48
(c) 64
(d) 128

**Answer: (b)**

**Q5.** IPv6 address size is:
(a) 32-bit
(b) 64-bit
(c) 128-bit
(d) 256-bit

**Answer: (c)**

**Q6.** Number of layers in OSI model:
(a) 4
(b) 5
(c) 7
(d) 9

**Answer: (c)**

**Q7.** HTTP port number:
(a) 21
(b) 25
(c) 80
(d) 110

**Answer: (c)**

**Q8.** HTTPS stands for:
(a) HyperText Transfer Protocol Standard
(b) HyperText Transfer Protocol Secure
(c) High Text Transfer Protocol Secure
(d) HyperText Translation Protocol Secure

**Answer: (b)**

**Q9.** WWW was invented by:
(a) Tim Berners-Lee
(b) Vint Cerf
(c) Bill Gates
(d) Steve Jobs

**Answer: (a)**

**Q10.** SMTP is used for:
(a) Receiving email
(b) Sending email
(c) Storing email
(d) Filtering email

**Answer: (b)**

**Q11.** IMAP port:
(a) 25
(b) 110
(c) 143
(d) 587

**Answer: (c)**

**Q12.** Full form of ISP:
(a) Internet Service Provider
(b) Internet Server Protocol
(c) Internal Service Provider
(d) Internet Support Provider

**Answer: (a)**

**Q13.** Switch operates at which OSI layer?
(a) Layer 1
(b) Layer 2
(c) Layer 3
(d) Layer 4

**Answer: (b)**

**Q14.** Firefox was developed by:
(a) Microsoft
(b) Google
(c) Mozilla
(d) Apple

**Answer: (c)**

**Q15.** Topmost layer of OSI model:
(a) Physical
(b) Network
(c) Application
(d) Session

**Answer: (c)**

**Q16.** Which is connection-oriented?
(a) UDP
(b) TCP
(c) IP
(d) ICMP

**Answer: (b)**

**Q17.** Google Chrome shortcut for new tab:
(a) Ctrl + N
(b) Ctrl + T
(c) Ctrl + W
(d) Ctrl + Shift + N

**Answer: (b)**

**Q18.** Google Chrome shortcut for Incognito:
(a) Ctrl + N
(b) Ctrl + T
(c) Ctrl + Shift + N
(d) Ctrl + H

**Answer: (c)**

**Q19.** Which protocol is used to download email?
(a) SMTP
(b) POP3
(c) FTP
(d) HTTP

**Answer: (b)**

**Q20.** HTTPS uses which encryption?
(a) AES
(b) SSL/TLS
(c) RSA
(d) DES

**Answer: (b)**

---

## 12. Quick Revision Sheet

### Top 20 Must-Knows
1. Network = 2+ devices sharing data/resources
2. PAN < LAN < CAN < MAN < WAN (geographic coverage)
3. Hub (Layer 1) < Switch (Layer 2) < Router (Layer 3)
4. Router connects different networks using IP
5. Switch uses MAC addresses
6. IPv4 = 32-bit (e.g., 192.168.1.1)
7. IPv6 = 128-bit (hexadecimal)
8. MAC = 48-bit (hex, 6 pairs)
9. OSI = 7 layers; TCP/IP = 5 layers
10. OSI Top: Application; Bottom: Physical
11. TCP = Connection-oriented, reliable; UDP = Connectionless, fast
12. HTTP = 80; HTTPS = 443; FTP = 21
13. SMTP = Sending email (25, 465, 587)
14. POP3 = Downloads email (110); IMAP = Syncs email (143)
15. WWW invented by Tim Berners-Lee (1989)
16. Mozilla Firefox = by Mozilla Foundation
17. ISP = Internet Service Provider (Jio, Airtel)
18. URL = protocol://domain/path
19. SAN = Storage Area Network
20. VPN = Private network over public internet (encrypted)

### Mnemonics
- **OSI Layers (Top to Bottom)**: "All People Seem To Need Data Processing"
- **TCP vs UDP**: "TCP = Tree Control Protocol" (reliable like tree); "UDP = Unreliable Datagram Protocol"
- **Email Protocols**: SMTP (Send), POP3 (Pull/Post), IMAP (Sync)
- **Port Numbers**: 80 (Web), 443 (Secure Web), 25 (Mail send), 110 (Mail pull), 143 (Mail sync)

---
