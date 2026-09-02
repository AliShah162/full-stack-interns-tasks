---

### 1. Single-Field Index (The Simple Approach)

This is an index built on exactly **one** column of a table.

```sql
CREATE INDEX idx_lastname ON users (last_name);
```
**What it does:** It sorts the entire index alphabetically by `last_name` and nothing else.

**When to use it:** When your queries filter exclusively by that one column.

**The Problem:** Imagine you run this query:
```sql
SELECT * FROM users WHERE last_name = 'Smith' AND first_name = 'John';
```
The database uses the `idx_lastname` index to find every single "Smith" (let's say there are 50,000 of them). It then has to go back to the main table, grab each of those 50,000 rows, and manually check which ones have `first_name = 'John'`. It still does a lot of extra work.

---

### 2. Compound Index (The Multi-Column Powerhouse)

A compound index (also called a Composite Index) is built on **two or more** columns within a **specific order**.

```sql
CREATE INDEX idx_lastname_firstname ON users (last_name, first_name);
```
**What it does:** It sorts the index by `last_name` first. If two people have the same `last_name`, it sorts those entries by `first_name` inside that group. (It is sorted like a phone book: Last name, *then* first name).

**The Magic:** Now when you run `WHERE last_name = 'Smith' AND first_name = 'John'`, the database navigates the index directly to "Smith", then directly to "John" inside that group. **It finds the exact row in 2 logical steps**, skipping the 49,999 other Smiths entirely.

---

### 3. The "Phone Book" Analogy

Think of a physical phone book:

- A **Single-Field Index** on `last_name` is like a phone book sorted **only by last name**. If you know the last name is "Smith" but there are 50 pages of Smiths, you still have to scan all 50 pages to find "John."
- A **Compound Index** on `(last_name, first_name)` is like a **normal phone book**. It is sorted by Last Name, then First Name. You flip directly to "Smith, John" in one go. 

---

### 4. The Golden Rule You MUST Know: The "Left-Most Prefix" Rule

This is the #1 mistake developers make with compound indexes. 

**The rule:** A compound index on `(A, B, C)` can be used to speed up queries that filter on:
1. `A` (Yes)
2. `A` and `B` (Yes)
3. `A`, `B`, and `C` (Yes)

**But it CANNOT** be used to speed up queries that filter only on:
- `B` by itself
- `C` by itself
- `B` and `C`

**Why?** Because the index is sorted by A first. Within A, it is sorted by B. Within B, it is sorted by C. If you don't provide A, the database has no idea where to start looking—it has to scan everything.

**Real-world example:**
You create this index: `(state, city, zip_code)`

| Query | Will the index help? | Why? |
| :--- | :--- | :--- |
| `WHERE state = 'TX'` | **Yes (100%)** | It uses the first column. |
| `WHERE state = 'TX' AND city = 'Austin'` | **Yes (100%)** | It uses the first two columns in order. |
| `WHERE state = 'TX' AND city = 'Austin' AND zip_code = '78701'` | **Yes (100%)** | It uses all three columns in order. |
| `WHERE city = 'Austin'` | **NO (0%)** | The index is sorted by `state` first. Without `state`, the database must scan the entire index. |
| `WHERE state = 'TX' AND zip_code = '78701'` | **Partial (50%)** | It uses the index to find all 'TX' entries, but then has to manually scan through every TX row to check the zip_code (because it skipped `city` in the middle). |

---

### 5. The Secret Superpower: "Covering" with Compound Indexes

Compound indexes are the best way to create a **Covering Index** (which we touched on earlier).

If your query is:
```sql
SELECT first_name, last_name, email FROM users WHERE last_name = 'Smith';
```
Instead of a single index on `(last_name)`, create a compound index on `(last_name, first_name, email)`.
Now, the database finds "Smith" in the index, and **without touching the main table at all**, it reads the `first_name` and `email` directly from the index file. This is blindingly fast.

---

### 6. When to use which? (The Decision Matrix)

| Scenario | What Index to Use |
| :--- | :--- |
| You filter mostly by `user_id` (unique). | **Single-Field** is perfect. |
| You always filter by `country` AND `date` together. | **Compound** on `(country, date)` in that order. |
| You sometimes filter by `country` alone, and sometimes by `country` + `date`. | **Compound** on `(country, date)`. The left-most rule handles both! |
| You filter by `date` alone, and also by `country` + `date`. | Create **two indexes**: One single on `(date)`, and one compound on `(country, date)`. You cannot use a compound starting with `country` for a `date`-only search. |

---

### The Final Boss Tip: Order Matters by Cardinality

When creating a compound index, **which column goes first?**

The general rule of thumb is: **Put the column with the highest "cardinality" (the most unique values) first.**

- **Bad:** Index on `(gender, user_id)`. There are only 2 genders. The index groups everything into two massive buckets. 
- **Good:** Index on `(user_id, gender)`. `user_id` is unique for every row. The index instantly finds the user, then checks the gender. 

Always put the most selective column (the one that filters out the most rows) at the far left of your compound index.