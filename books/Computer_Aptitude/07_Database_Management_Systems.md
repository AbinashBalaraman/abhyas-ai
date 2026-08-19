# Chapter 7: Database Management Systems (DBMS)

> **Chapter Overview:** DBMS is heavily tested in **SSC CGL Tier-II, IBPS PO/SO, RBI Grade B, Insurance AO** (2-4 Qs per exam). Covers database concepts, RDBMS, SQL basics, normalization. Currently scattered across Ch.04_MS_Office_Database. **Phase B new chapter** using OCR-extracted Computer PDFs as source.
>
> **Primary sources used:**
> - `books_raw_text/ocr2_extracted/Computer theory (4th edition).md` (Standard Exam Reference, 278 pages)
> - `books_raw_text/OCR_extracted/General Studiescomputer ( old edition )_Batch OCR.md`
> - `books_raw_text/ocr2_extracted/Ebook ( Updated Jan 2026 )_Batch OCR.md`
> - `books_raw_text/OCR_extracted/15. Computer.md` (Standard Exam ReferencePYQ compilation)

---

## 1. Database Fundamentals

### 1.1 Definition

A **database** is an organized collection of structured data, typically stored electronically and accessed electronically.

**Database Management System (DBMS)**: Software that allows users to define, create, maintain, and control access to databases.

### 1.2 DBMS vs RDBMS

| Feature | DBMS | RDBMS |
|---|---|---|
| **Data structure** | Hierarchical, Network, or flat | Tables (relations) |
| **Relationships** | Not explicit | Foreign keys, joins |
| **ACID compliance** | May not be | Yes (Atomicity, Consistency, Isolation, Durability) |
| **Examples** | XML, File systems | MySQL, PostgreSQL, Oracle, SQL Server |

### 1.3 Database Models

| Model | Structure | Use |
|---|---|---|
| **Hierarchical** | Tree (parent-child) | File systems, XML |
| **Network** | Graph (many-to-many) | Telecommunications |
| **Relational (RDBMS)** | Tables with relationships | Most common today |
| **Object-oriented** | Objects (like OOP) | Complex data, multimedia |
| **NoSQL** | Document/Key-value/Column/Graph | Big data, real-time |

---

## 2. RDBMS Concepts

### 2.1 Table

A **relation/table** is a 2D structure with rows and columns.

| Term | Description |
|---|---|
| **Tuple/Record/Row** | A single entry in the table |
| **Attribute/Field/Column** | A named property of the relation |
| **Domain** | Set of allowed values for an attribute |
| **Schema** | Structure definition of the database |
| **Instance** | Data at a particular point in time |

### 2.2 Keys

| Key Type | Description | Example |
|---|---|---|
| **Primary Key** | Uniquely identifies each row | `student_id` in students table |
| **Foreign Key** | References primary key in another table | `student_id` in enrollments table |
| **Candidate Key** | All possible unique identifiers | `student_id` OR `email` |
| **Composite Key** | Primary key from multiple columns | (order_id, product_id) |
| **Alternate Key** | Candidate keys not chosen as primary | `email` (if `student_id` is PK) |
| **Super Key** | Any set of columns that uniquely identifies | {student_id} or {student_id, name} |

---

## 3. SQL Basics

### 3.1 SQL Commands by Type

**DDL (Data Definition Language)**:
- `CREATE TABLE`
- `ALTER TABLE`
- `DROP TABLE`
- `TRUNCATE TABLE`

**DML (Data Manipulation Language)**:
- `SELECT` (also classified as DQL)
- `INSERT INTO`
- `UPDATE`
- `DELETE FROM`

**DCL (Data Control Language)**:
- `GRANT`
- `REVOKE`

**TCL (Transaction Control Language)**:
- `COMMIT`
- `ROLLBACK`
- `SAVEPOINT`

### 3.2 SELECT Statement

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition
GROUP BY column
HAVING condition
ORDER BY column [ASC | DESC]
LIMIT n;
```

### 3.3 Common SQL Queries (Banking Exam PYQs)

**Q1.** Select all employees with salary > 50000:
```sql
SELECT * FROM employees WHERE salary > 50000;
```

**Q2.** Count employees in each department:
```sql
SELECT department, COUNT(*) FROM employees GROUP BY department;
```

**Q3.** Find the second highest salary:
```sql
SELECT MAX(salary) FROM employees 
WHERE salary < (SELECT MAX(salary) FROM employees);
```

**Q4.** Join employees with departments:
```sql
SELECT e.name, d.dept_name 
FROM employees e 
INNER JOIN departments d ON e.dept_id = d.dept_id;
```

---

## 4. Normalization

### 4.1 Purpose

Eliminate redundancy, ensure data integrity, prevent anomalies (insertion, update, deletion).

### 4.2 Normal Forms

| Normal Form | Rule |
|---|---|
| **1NF** | Atomic values (no repeating groups), unique rows |
| **2NF** | 1NF + No partial dependency (all non-key columns depend on entire primary key) |
| **3NF** | 2NF + No transitive dependency (non-key columns don't depend on other non-key columns) |
| **BCNF** | 3NF + Every determinant is a candidate key |
| **4NF** | BCNF + No multi-valued dependencies |
| **5NF** | 4NF + No join dependencies |

---

## 5. ACID Properties

| Property | Description |
|---|---|
| **Atomicity** | All or nothing — transaction either completes fully or not at all |
| **Consistency** | Database moves from one valid state to another (no rule violations) |
| **Isolation** | Concurrent transactions don't interfere with each other |
| **Durability** | Once committed, changes persist even after system failure |

---

## 6. Practice Questions (15 PYQs)

**Q1.** Which of the following is NOT a DBMS?
(a) MySQL (b) Oracle (c) Excel (d) PostgreSQL
**Answer**: (c) Excel (it's a spreadsheet, not DBMS)

**Q2.** A primary key:
(a) Can have duplicate values (b) Cannot be NULL (c) Is always auto-increment (d) Must be text
**Answer**: (b) Cannot be NULL (primary key is unique + NOT NULL)

**Q3.** Which SQL command is used to retrieve data?
(a) GET (b) FETCH (c) SELECT (d) READ
**Answer**: (c) SELECT

**Q4.** "Atomic" in ACID means:
(a) Small data (b) All or nothing (c) Fast (d) Distributed
**Answer**: (b) All or nothing (transaction completes fully or not at all)

**Q5.** Foreign key is used to:
(a) Identify unique rows (b) Reference another table's primary key (c) Speed up queries (d) Encrypt data
**Answer**: (b) Reference another table's primary key

**Q6.** Which normal form removes transitive dependency?
(a) 1NF (b) 2NF (c) 3NF (d) BCNF
**Answer**: (c) 3NF (Third Normal Form)

**Q7.** DDL stands for:
(a) Data Definition Language (b) Data Description Language (c) Database Definition (d) Direct Data Language
**Answer**: (a) Data Definition Language

**Q8.** Which is NOT a DML command?
(a) SELECT (b) INSERT (c) UPDATE (d) CREATE
**Answer**: (d) CREATE (DDL, not DML)

**Q9.** "GROUP BY" is used with:
(a) Aggregate functions (b) Single rows (c) Joins only (d) Subqueries only
**Answer**: (a) Aggregate functions (COUNT, SUM, AVG, MAX, MIN)

**Q10.** HAVING clause is used to filter:
(a) Rows before grouping (b) Groups after grouping (c) Columns (d) Tables
**Answer**: (b) Groups (whereas WHERE filters rows before grouping)

**Q11.** Which is a NoSQL database?
(a) MySQL (b) MongoDB (c) Oracle (d) SQL Server
**Answer**: (b) MongoDB (document-based NoSQL)

**Q12.** What does "DROP TABLE" do?
(a) Deletes data but keeps structure (b) Deletes data AND structure (c) Renames (d) Creates index
**Answer**: (b) Deletes both data and structure (vs TRUNCATE which keeps structure)

**Q13.** "ORDER BY" defaults to:
(a) DESC (b) ASC (c) Random (d) No order
**Answer**: (b) ASC (ascending)

**Q14.** The "WHERE" clause cannot contain:
(a) Aggregate functions (b) Comparison operators (c) Column names (d) Constants
**Answer**: (a) Aggregate functions (use HAVING for that)

**Q15.** A "view" in SQL is:
(a) A physical table (b) A virtual table from a query (c) A stored procedure (d) An index
**Answer**: (b) A virtual table based on a SELECT query

---
