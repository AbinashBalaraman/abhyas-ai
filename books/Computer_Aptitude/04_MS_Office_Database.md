# MS Office & Database Management

## 1. Core Concepts: MS Office

### 1.1 What is MS Office?

MS Office is a family of client software, server software and services designed by **Microsoft Corporation** for office productivity.

**Current Version**: Microsoft Office 2019 / Microsoft 365 (subscription-based)

### 1.2 Components of MS Office

```
MS Office Suite
├── Word (Word Processing)
├── Excel (Spreadsheet)
├── PowerPoint (Presentations)
├── Outlook (Email Client)
├── Access (Database)
├── OneNote (Note-taking)
├── Publisher (Desktop Publishing)
└── OneDrive (Cloud Storage)
```

---

## 2. MS Word — Word Processing

### 2.1 Overview

MS Word is a word processing program developed by Microsoft Corporation. Native file formats: `.doc`, `.docx`, `.docm`.

**Uses**:
- Creating documents
- Letters, reports, resumes
- Mail merge
- Templates
- PDF export

### 2.2 MS Word Interface

```
┌──────────────────────────────────────────┐
│  Title Bar (File name)                    │
├──────────────────────────────────────────┤
│  Quick Access Toolbar (Save, Undo, Redo)  │
├──────────────────────────────────────────┤
│  Menu Bar/Tab Row (File, Home, Insert...) │
├──────────────────────────────────────────┤
│  Ribbon (Commands grouped)                │
├──────────────────────────────────────────┤
│  Workspace (Document area)                │
├──────────────────────────────────────────┤
│  Status Bar (Page number, Word count)     │
└──────────────────────────────────────────┘
```

### 2.3 MS Word Tabs

**HOME Tab**:
- **Clipboard**: Cut, Copy, Paste
- **Font**: Font type, size, bold, italic, colour
- **Paragraph**: Alignment, indentation, bullets, numbering
- **Styles**: Heading styles
- **Editing**: Find, Replace, Select

**Default settings**:
- Default Font: **Calibri**
- Default Font Size: **11 points**
- Maximum Font Size: 72 points (auto) / 1638 (manual)
- Minimum Font Size: 8 points (auto) / 1 (manual)

**Alignment Shortcuts**:
- Ctrl + L → Left aligned
- Ctrl + E → Centre aligned
- Ctrl + R → Right aligned
- Ctrl + J → Justify

**INSERT Tab**:
- **Pages**: Cover page, blank page
- **Tables**: Insert table
- **Illustrations**: Pictures, shapes, charts, SmartArt
- **Media**: Online videos
- **Links**: Hyperlink (Ctrl+K), Bookmark, Cross-reference
- **Comments**: Insert comment
- **Header & Footer**: Page numbers, title, date
- **Text**: Text box, WordArt, Drop Cap
- **Symbols**: Equation, Symbol

### 2.4 Important MS Word Shortcuts

| Shortcut | Function |
|---|---|
| Ctrl + N | New document |
| Ctrl + O | Open document |
| Ctrl + S | Save |
| Ctrl + P | Print |
| Ctrl + B | Bold |
| Ctrl + I | Italic |
| Ctrl + U | Underline |
| Ctrl + C | Copy |
| Ctrl + V | Paste |
| Ctrl + X | Cut |
| Ctrl + Z | Undo |
| Ctrl + Y | Redo |
| Ctrl + A | Select All |
| Ctrl + F | Find |
| Ctrl + H | Replace |
| Ctrl + K | Insert Hyperlink |
| Ctrl + L | Left align |
| Ctrl + E | Centre align |
| Ctrl + R | Right align |
| Ctrl + J | Justify |
| Ctrl + 1 | Single line spacing |
| Ctrl + 2 | Double line spacing |
| Ctrl + 5 | 1.5 line spacing |

### 2.5 File Operations in MS Word

- **New** (Ctrl + N): Create new document
- **Open** (Ctrl + O): Open existing document
- **Save** (Ctrl + S): Save changes
- **Save As** (F12): Save with different name/format
- **Print** (Ctrl + P): Print document
- **Close** (Ctrl + W): Close document
- **Export**: Convert to PDF

---

## 3. MS Excel — Spreadsheet

### 3.1 Overview

MS Excel is a spreadsheet application used for calculations, data analysis, and visualisation. Native file formats: `.xls`, `.xlsx`, `.xlsm`.

**Uses**:
- Calculations (formulas, functions)
- Data analysis
- Charts and graphs
- Pivot tables
- Financial modelling
- Data organisation

### 3.2 MS Excel Interface

```
   A    B    C    D    E
1 ┌────┬────┬────┬────┬────┐
  │    │    │    │    │    │
2 ├────┼────┼────┼────┼────┤
  │    │    │    │    │    │
3 ├────┼────┼────┼────┼────┤
  │    │    │    │    │    │
4 └────┴────┴────┴────┴────┘
```

### 3.3 Key Concepts

**Cell**: Intersection of row and column
**Range**: Group of cells (e.g., A1:C5)
**Workbook**: Excel file containing multiple worksheets
**Worksheet**: Single sheet in workbook

### 3.4 Cell Reference Types

| Type | Format | Behaviour when copied |
|---|---|---|
| **Relative** | A1 | Changes (A1 → A2) |
| **Absolute** | $A$1 | Doesn't change |
| **Mixed** | $A1 or A$1 | Partially changes |

### 3.5 Important Excel Formulas

| Function | Purpose | Example |
|---|---|---|
| =SUM(A1:A10) | Sum of range | =SUM(B2:B10) |
| =AVERAGE(A1:A10) | Average | =AVERAGE(C1:C10) |
| =MAX(A1:A10) | Maximum value | =MAX(D1:D10) |
| =MIN(A1:A10) | Minimum value | =MIN(E1:E10) |
| =COUNT(A1:A10) | Count of numbers | =COUNT(F1:F10) |
| =IF(condition, true, false) | Conditional | =IF(A1>50, "Pass", "Fail") |
| =VLOOKUP(lookup, range, col) | Vertical lookup | =VLOOKUP("John", A:B, 2) |
| =HLOOKUP(lookup, range, row) | Horizontal lookup | Similar |
| =CONCATENATE(A1, B1) | Join text | =CONCAT(A1, B1) |
| =LEN(A1) | Length of text | =LEN("Hello") = 5 |
| =LEFT(A1, n) | Left n chars | =LEFT("Hello", 2) = "He" |
| =RIGHT(A1, n) | Right n chars | =RIGHT("Hello", 2) = "lo" |
| =MID(A1, start, n) | Middle chars | =MID("Hello", 2, 3) = "ell" |
| =TODAY() | Today's date | =TODAY() |
| =NOW() | Current date/time | =NOW() |

### 3.6 Important Excel Shortcuts

| Shortcut | Function |
|---|---|
| Ctrl + N | New workbook |
| Ctrl + O | Open |
| Ctrl + S | Save |
| Ctrl + P | Print |
| Ctrl + C/V/X | Copy/Paste/Cut |
| Ctrl + Z | Undo |
| Ctrl + Y | Redo |
| Ctrl + F | Find |
| Ctrl + H | Replace |
| Ctrl + A | Select all |
| Ctrl + Home | Go to A1 |
| Ctrl + End | Last used cell |
| Ctrl + Page Up/Down | Switch sheets |
| Alt + = | AutoSum |
| F2 | Edit cell |
| F4 | Repeat last action |
| Ctrl + Shift + L | Filter |
| Ctrl + T | Create table |
| Ctrl + 1 | Format cells |

### 3.7 Charts in Excel

- **Column Chart**: Vertical bars
- **Bar Chart**: Horizontal bars
- **Line Chart**: Trends over time
- **Pie Chart**: Proportions
- **Scatter Chart**: Relationship between variables
- **Area Chart**: Magnitude over time

---

## 4. MS PowerPoint — Presentations

### 4.1 Overview

MS PowerPoint is a presentation program. Native file formats: `.ppt`, `.pptx`, `.pptm`.

**Uses**:
- Creating slide presentations
- Business presentations
- Educational content
- Visual storytelling

### 4.2 MS PowerPoint Interface

```
┌─────────────────────────────────────────┐
│  Title Bar                                │
├─────────────────────────────────────────┤
│  Ribbon (Tabs)                            │
├─────────────────────────────────────────┤
│                                          │
│         Current Slide (Workspace)        │
│                                          │
├─────────────────────────────────────────┤
│  Notes Pane                              │
└─────────────────────────────────────────┘
┌──────┐
│Slide 1│
│Slide 2│  ← Slides panel (thumbnails)
│Slide 3│
└──────┘
```

### 4.3 PowerPoint Views

| View | Purpose |
|---|---|
| **Normal** | Default editing view |
| **Slide Sorter** | All slides as thumbnails |
| **Reading View** | Full screen reading |
| **Slide Show** | Actual presentation (F5) |

### 4.4 PowerPoint Tabs

- **HOME**: Slide layout, font, paragraph
- **INSERT**: New slide, table, image, chart, video, audio, shapes
- **DESIGN**: Themes, variants, formatting
- **TRANSITIONS**: Animation between slides
- **ANIMATIONS**: Animation within slides
- **SLIDESHOW**: Start presentation, setup
- **REVIEW**: Spell check, comments
- **VIEW**: Presentation views

### 4.5 Important PowerPoint Shortcuts

| Shortcut | Function |
|---|---|
| Ctrl + N | New presentation |
| Ctrl + O | Open |
| Ctrl + S | Save |
| Ctrl + M | New slide |
| Ctrl + D | Duplicate slide |
| Ctrl + P | Print |
| F5 | Start slideshow |
| Shift + F5 | Start from current slide |
| Esc | End slideshow |
| B | Black screen during slideshow |
| W | White screen during slideshow |
| Arrow keys | Navigate slides |
| Page Up/Down | Previous/Next slide |
| Ctrl + T | Insert table |

### 4.6 Slide Elements

- **Title**: Main heading
- **Content**: Bullets, text
- **Images**: Pictures
- **Shapes**: Geometric shapes
- **SmartArt**: Visual diagrams
- **Charts**: Data visualisation
- **Tables**: Tabular data
- **Animations**: Movement effects
- **Transitions**: Slide change effects

---

## 5. Database Concepts

### 5.1 What is a Database?

A database is an organised collection of structured information, typically stored electronically in a computer system. Managed by **Database Management System (DBMS)**.

### 5.2 DBMS — Database Management System

DBMS is software that allows users to define, create, maintain, and manipulate databases. Examples: MySQL, Oracle, SQL Server, PostgreSQL, MongoDB.

**Functions**:
- Data definition
- Data storage
- Data retrieval
- Data manipulation
- Data security
- Data integrity
- Backup & recovery

### 5.3 RDBMS — Relational DBMS

RDBMS stores data in **tables** (relations) with rows and columns. Uses **SQL** for queries.

**Examples**: Oracle, MySQL, MS SQL Server, PostgreSQL, IBM DB2

### 5.4 Key Database Terminology

| Term | Definition |
|---|---|
| **Table** | Collection of related data in rows/columns |
| **Row/Record/Tuple** | Single entry in a table |
| **Column/Field/Attribute** | Vertical data element |
| **Primary Key** | Unique identifier for each row |
| **Foreign Key** | Links to primary key in another table |
| **Schema** | Structure/design of database |
| **Query** | Request for data from database |
| **Index** | Structure to speed up retrieval |

### 5.5 SQL — Structured Query Language

SQL is the standard language for managing relational databases.

**Key SQL Commands**:

#### DDL (Data Definition Language)
```sql
CREATE DATABASE SchoolDB;
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(50),
    Age INT
);
ALTER TABLE Students ADD Email VARCHAR(100);
DROP TABLE Students;
```

#### DML (Data Manipulation Language)
```sql
INSERT INTO Students (StudentID, Name, Age) VALUES (1, 'Ram', 20);
SELECT * FROM Students;
UPDATE Students SET Age = 21 WHERE StudentID = 1;
DELETE FROM Students WHERE StudentID = 1;
```

#### DCL (Data Control Language)
```sql
GRANT SELECT ON Students TO user1;
REVOKE SELECT ON Students FROM user1;
```

#### TCL (Transaction Control)
```sql
COMMIT;
ROLLBACK;
SAVEPOINT sp1;
```

### 5.6 SQL Clauses

| Clause | Purpose | Example |
|---|---|---|
| **SELECT** | Choose columns | SELECT Name FROM Students |
| **FROM** | Specify table | SELECT * FROM Students |
| **WHERE** | Filter rows | WHERE Age > 18 |
| **GROUP BY** | Group rows | GROUP BY City |
| **HAVING** | Filter groups | HAVING COUNT(*) > 5 |
| **ORDER BY** | Sort results | ORDER BY Name ASC |
| **JOIN** | Combine tables | INNER JOIN, LEFT JOIN |
| **DISTINCT** | Unique values | SELECT DISTINCT City |

### 5.7 SQL JOINs

```
INNER JOIN: Only matching rows from both tables
LEFT JOIN: All from left + matching from right
RIGHT JOIN: All from right + matching from left
FULL OUTER JOIN: All from both
CROSS JOIN: Cartesian product
```

### 5.8 SQL Constraints

| Constraint | Purpose |
|---|---|
| **PRIMARY KEY** | Unique, not null |
| **FOREIGN KEY** | Refers to other table's PK |
| **UNIQUE** | No duplicates |
| **NOT NULL** | Cannot be null |
| **CHECK** | Condition check |
| **DEFAULT** | Default value |

### 5.9 SQL Functions

**Aggregate Functions**:
- `COUNT()` - Count rows
- `SUM()` - Sum values
- `AVG()` - Average
- `MAX()` - Maximum
- `MIN()` - Minimum

**String Functions**:
- `UPPER()` / `LOWER()` - Case conversion
- `LENGTH()` / `LEN()` - Length
- `SUBSTRING()` / `SUBSTR()` - Extract substring
- `CONCAT()` - Concatenate

**Date Functions**:
- `NOW()` - Current date/time
- `DATE()` - Extract date
- `YEAR()`, `MONTH()`, `DAY()` - Extract parts
- `DATEDIFF()` - Difference between dates

### 5.10 Normalisation

Process of organising data to reduce redundancy:
- **1NF**: Atomic values; no repeating groups
- **2NF**: 1NF + no partial dependencies
- **3NF**: 2NF + no transitive dependencies
- **BCNF**: Stricter 3NF
- **4NF, 5NF**: Higher normal forms

### 5.11 ACID Properties

| Property | Meaning |
|---|---|
| **Atomicity** | All or nothing |
| **Consistency** | Valid state transitions |
| **Isolation** | Concurrent transactions independent |
| **Durability** | Committed data persists |

### 5.12 NoSQL Databases

Non-relational databases:
- **Document**: MongoDB, CouchDB
- **Key-Value**: Redis, DynamoDB
- **Column-Family**: Cassandra, HBase
- **Graph**: Neo4j

Used for big data, real-time web apps.

---

## 6. Key Terms Dictionary

| Term | Full Form | Definition |
|---|---|---|
| DBMS | Database Management System | Software to manage databases |
| RDBMS | Relational DBMS | Database using tables |
| SQL | Structured Query Language | Language for RDBMS |
| DDL | Data Definition Language | Define structure |
| DML | Data Manipulation Language | Insert/update/delete |
| DCL | Data Control Language | Grant/revoke permissions |
| TCL | Transaction Control Language | Commit/rollback |
| OLTP | Online Transaction Processing | Real-time transactions |
| OLAP | Online Analytical Processing | Data analysis |
| ETL | Extract, Transform, Load | Data integration |
| CSV | Comma-Separated Values | Text file format |
| XML | eXtensible Markup Language | Structured data |
| JSON | JavaScript Object Notation | Data interchange format |
| ERD | Entity-Relationship Diagram | Database design tool |

---

## 7. Comparison Tables

### 7.1 MS Word vs MS Excel vs MS PowerPoint

| Feature | Word | Excel | PowerPoint |
|---|---|---|---|
| Purpose | Documents | Spreadsheets | Presentations |
| File format | .docx | .xlsx | .pptx |
| Best for | Letters, reports | Calculations | Slides |
| Tables | Basic | Advanced | Basic |
| Charts | Limited | Advanced | Moderate |

### 7.2 DBMS vs RDBMS

| Feature | DBMS | RDBMS |
|---|---|---|
| Structure | Any | Tables (relations) |
| Relationships | No | Yes |
| Normalisation | No | Yes |
| Examples | XML, file system | MySQL, Oracle |
| SQL | Not always | Yes |

### 7.3 SQL vs NoSQL

| Feature | SQL | NoSQL |
|---|---|---|
| Structure | Tables | Various |
| Schema | Fixed | Flexible |
| Scaling | Vertical | Horizontal |
| Use | Transactions, ACID | Big data, real-time |
| Example | MySQL | MongoDB |

### 7.4 DDL vs DML vs DCL vs TCL

| Type | Commands | Purpose |
|---|---|---|
| **DDL** | CREATE, ALTER, DROP | Define schema |
| **DML** | INSERT, SELECT, UPDATE, DELETE | Manipulate data |
| **DCL** | GRANT, REVOKE | Permissions |
| **TCL** | COMMIT, ROLLBACK | Transactions |

---

## 8. Practice Questions (20)

**Q1.** MS Word default font is:
(a) Times New Roman
(b) Arial
(c) Calibri
(d) Verdana

**Answer: (c)**

**Q2.** Default font size in MS Word:
(a) 10
(b) 11
(c) 12
(d) 14

**Answer: (b)**

**Q3.** Ctrl + E in MS Word:
(a) Left align
(b) Right align
(c) Centre align
(d) Justify

**Answer: (c)**

**Q4.** Ctrl + K is used to:
(a) Insert table
(b) Insert hyperlink
(c) Insert picture
(d) Insert comment

**Answer: (b)**

**Q5.** To start slideshow in MS PowerPoint:
(a) F1
(b) F2
(c) F5
(d) F12

**Answer: (c)**

**Q6.** SQL stands for:
(a) Simple Query Language
(b) Structured Query Language
(c) Sequential Query Language
(d) Standard Query Language

**Answer: (b)**

**Q7.** Which command is used to retrieve data in SQL?
(a) GET
(b) FETCH
(c) SELECT
(d) RETRIEVE

**Answer: (c)**

**Q8.** Primary Key must be:
(a) Null
(b) Unique
(c) Duplicate
(d) Foreign

**Answer: (b)**

**Q9.** Full form of DBMS:
(a) Data Backup Management System
(b) Database Management System
(c) Database Manipulation System
(d) Data Management System

**Answer: (b)**

**Q10.** ACID properties relate to:
(a) Hardware
(b) Database transactions
(c) Networking
(d) Programming

**Answer: (b)**

**Q11.** Excel function for sum:
(a) =SUM()
(b) =ADD()
(c) =TOTAL()
(d) =PLUS()

**Answer: (a)**

**Q12.** Excel shortcut for AutoSum:
(a) Alt + =
(b) Ctrl + =
(c) Shift + =
(d) Tab + =

**Answer: (a)**

**Q13.** F4 in Excel:
(a) Find
(b) Format
(c) Repeat last action
(d) Filter

**Answer: (c)**

**Q14.** Which is NoSQL database?
(a) MySQL
(b) Oracle
(c) MongoDB
(d) SQL Server

**Answer: (c)**

**Q15.** Normalisation is used to:
(a) Increase data redundancy
(b) Reduce data redundancy
(c) Delete data
(d) Encrypt data

**Answer: (b)**

**Q16.** Ctrl + M in PowerPoint:
(a) New slide
(b) Move slide
(c) Merge slides
(d) Mark slide

**Answer: (a)**

**Q17.** Maximum font size in Word (automatic):
(a) 50
(b) 72
(c) 100
(d) 1638

**Answer: (b)**

**Q18.** To end slideshow:
(a) F1
(b) Esc
(c) F5
(d) Enter

**Answer: (b)**

**Q19.** Foreign Key refers to:
(a) Another database
(b) Primary key of another table
(c) Primary key of same table
(d) Index

**Answer: (b)**

**Q20.** DCL in SQL includes:
(a) INSERT, UPDATE
(b) GRANT, REVOKE
(c) CREATE, DROP
(d) SELECT, DELETE

**Answer: (b)**

---

## 9. Quick Revision Sheet

### Top 25 Must-Knows
1. MS Office = Word, Excel, PowerPoint, Outlook, Access
2. Word default font: Calibri, size 11
3. Word max font: 72 (auto), 1638 (manual)
4. Ctrl + B/I/U = Bold/Italic/Underline
5. Ctrl + L/E/R/J = Left/Centre/Right/Justify
6. Ctrl + K = Insert Hyperlink
7. PowerPoint F5 = Start slideshow; Esc = End
8. PowerPoint Ctrl + M = New slide
9. DBMS = Software to manage databases
10. RDBMS = Tables with relationships
11. SQL = Structured Query Language
12. SQL commands: DDL, DML, DCL, TCL
13. DDL: CREATE, ALTER, DROP
14. DML: SELECT, INSERT, UPDATE, DELETE
15. DCL: GRANT, REVOKE
16. TCL: COMMIT, ROLLBACK
17. Primary Key = Unique, Not Null
18. Foreign Key = Reference to other table's PK
19. ACID = Atomicity, Consistency, Isolation, Durability
20. Normalisation: 1NF, 2NF, 3NF, BCNF
21. Excel =SUM(A1:A10) for sum
22. Excel Alt + = for AutoSum
23. Excel F4 = Repeat last action
24. NoSQL examples: MongoDB, Redis, Cassandra
25. SQL JOINs: INNER, LEFT, RIGHT, FULL

### Mnemonics
- **SQL Sub-languages**: "DDL DML DCL TCL" = "DDD DDC" (3D's + TCL)
- **Word Shortcuts**: Ctrl+B/I/U = Bold/Italic/Underline (BIU)
- **Alignment**: Ctrl+L/E/R/J = Left/Centre/Right/Justify
- **ACID**: "ACID" = Atomic, Consistent, Isolated, Durable

---
