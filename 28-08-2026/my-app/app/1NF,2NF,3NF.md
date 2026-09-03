### The Scenario: Your School's Library System

Imagine you are in charge of a database for your school library. The librarian asks you to track **which student borrowed which book**, and **who the librarian was that checked it out**.

You make ONE giant table called `Borrowing_Records`. It looks like this:

| Student ID | Student Name | Book ID | Book Title | Librarian ID | Librarian Name |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Alex | 101 | Dune | L5 | Mrs. Smith |
| 2 | Jamie | 102 | 1984 | L7 | Mr. Jones |
| 1 | Alex | 103 | Python 101 | L5 | Mrs. Smith |
| 3 | Taylor | 101 | Dune | L9 | Mrs. Davis |

Now, look closely at this table. What is the **"Primary Key"** (the unique identifier) for this table?

It has to be **Student ID + Book ID** together, because Alex (1) can borrow multiple books, and Dune (101) can be borrowed by multiple students. So the combo of `(Student ID + Book ID)` is what makes each row unique.

---

### The 2NF Problem (The "Half Key" Headache)

Now, look at the column **`Student Name`**. 

Ask yourself: *"Does `Student Name` depend on BOTH the Student ID AND the Book ID?"* 

**NO!** `Student Name` only depends on the **Student ID** (half of the key). 

What about **`Book Title`**? Does it depend on both? **NO!** It only depends on the **Book ID** (the other half of the key).

This is **2NF**. The official rule says: *"Every column must depend on the ENTIRE key (both IDs), not just half of it."*

**Why is this a mess?**
Look at Alex. His name "Alex" is written **twice**. If Alex changes his name to "Alexander," you have to find every row where Student ID = 1 and change it. If Alex borrows 500 books, you have to update 500 rows! You are repeating data that only belongs to the student.

---

### The 2NF Fix (Move the "Half Key" stuff)

You fix this by **splitting** the one giant table into **three** small tables:

**Table 1: Students** (Stuff that depends ONLY on Student ID)
| Student ID | Student Name |
| :--- | :--- |
| 1 | Alex |
| 2 | Jamie |
| 3 | Taylor |

**Table 2: Books** (Stuff that depends ONLY on Book ID)
| Book ID | Book Title |
| :--- | :--- |
| 101 | Dune |
| 102 | 1984 |
| 103 | Python 101 |

**Table 3: Borrowing Records** (Stuff that depends on BOTH IDs together)
| Student ID | Book ID | Librarian ID |
| :--- | :--- | :--- |
| 1 | 101 | L5 |
| 2 | 102 | L7 |
| 1 | 103 | L5 |
| 3 | 101 | L9 |

Now, if Alex changes his name, you change **one single cell** in the Students table. PERFECT! **That is 2NF.**

---

### The 3NF Problem (The "Nosy Neighbor" Headache)

Now look at your new `Borrowing Records` table above. There is a column called **`Librarian ID`** (L5, L7, L9).

Ask yourself: *"Does `Librarian ID` depend on the Student AND the Book?"* 
**NO!** It just depends on who was working that day. But that's okay for 2NF because it's not half of the key (it's not a Student ID or Book ID).

BUT... look at the original giant table. We had **`Librarian Name`** too!

Ask yourself: *"Does `Librarian Name` depend on the `Librarian ID`?"* 

**YES!** Mrs. Smith is L5. 

So, if you leave `Librarian Name` in the Borrowing table, Mrs. Smith's name will appear thousands of times. If she gets married and changes her last name, you have to update thousands of rows again!

This is **3NF**. The official rule says: *"Every column must depend ONLY on the Primary Key (Student ID + Book ID). You cannot have a column that depends on another non-key column (like Librarian ID)."*

---

### The 3NF Fix (Move the "Nosy Neighbor")

You create a **fourth table** just for the Librarians:

**Table 4: Librarians**
| Librarian ID | Librarian Name |
| :--- | :--- |
| L5 | Mrs. Smith |
| L7 | Mr. Jones |
| L9 | Mrs. Davis |

Now, your Borrowing table just holds the ID `L5`. If Mrs. Smith changes her name to Mrs. Johnson, you update **ONE** cell in the Librarians table, and every single borrowing record automatically knows the new name!

---

### The Ultimate Simple Summary (Read This!)

Imagine you are a **king** in a castle. You have three rules for organizing your servants:

1. **1NF (The Rule of One):** "Each servant can only do **one** job at a time." (No lists in one cell).

2. **2NF (The Rule of the King):** "A servant (column) must serve **ME**, the King (the whole primary key). If a servant only serves my advisor (half the key), send them to my advisor's house." (Move data that depends on half the key).

3. **3NF (The Rule of Loyalty):** "A servant cannot take orders from another servant. They must take orders **directly from me, the King**. If servant A takes orders from servant B, send servant A to live with servant B." (Move data that depends on another non-key column).

---

### The Quick Cheat Sheet

| Form | The Question you ask | What you do |
| :--- | :--- | :--- |
| **1NF** | "Is there more than one thing in this box?" | Split it into separate rows. |
| **2NF** | "Does this column care about **half** of the ID?" | Move it to a separate table. |
| **3NF** | "Does this column care about **another non-ID** column?" | Move it to that column's table. |

---