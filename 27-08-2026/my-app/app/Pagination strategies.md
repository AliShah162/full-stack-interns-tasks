You have **1 million results**, and your frontend can only display 20 at a time. How do you let the user scroll through them without crashing your database?

Welcome to the art of **Pagination**. 

There are two main ways to do this, and choosing the wrong one is the #1 reason production apps slow down as they grow. Let’s break them down with our trusty analogies.

---

### The Big Picture: What is Pagination?

Pagination is the technique of splitting a large result set into smaller "pages" (chunks). 

- **Page 1:** Rows 1–20
- **Page 2:** Rows 21–40
- **Page 3:** Rows 41–60

But *how* you ask the database for these chunks makes all the difference. You have two tools: **Offset Pagination** (using `skip`/`limit`) and **Cursor-Based Pagination** (using `seek`/`next`).

---

### 1. Offset Pagination (`skip` / `limit`) — The Classic Trap

**How it works:** You tell the database, *"Give me 20 results, but skip the first 40."*

**Syntax (MongoDB/SQL):**
```javascript
db.products.find().sort({ price: 1 }).skip(40).limit(20)   // Page 3
```

**Analogy:** You are looking through a **stack of 10,000 papers** on a desk. 

- To get Page 1, you pick up the top 20 papers. Easy.
- To get Page 3, you have to **count out and throw aside** the first 40 papers just to reach papers 41–60. 
- To get Page 500, you have to physically pick up, count, and toss aside **9,980 papers** just to get to the last 20. 

**Why it's bad for performance:** 
The database doesn't magically "jump" to page 500. It actually finds **all 10,000 matching rows**, sorts them, scans past the first 9,980 rows (discarding them), and only returns the last 20. 

**The "Deep Page" Problem:**
As your `skip` number gets higher, the database works **exponentially harder**. 
- Page 1 takes **2ms**.
- Page 500 takes **8 seconds** (and crashes if millions of users do it).

| Offset | Work the Database Does | Result |
| :--- | :--- | :--- |
| `skip(0)` | Scans 20 rows | Fast |
| `skip(10000)` | Scans 10,020 rows (discards 10,000) | Slow |
| `skip(1000000)` | Scans 1,000,020 rows (discards 1,000,000) | **Timeout / Crash** |

**When to use it:** Only when you have **very small datasets** (under a few thousand rows) or you absolutely need to jump to a specific arbitrary page number (e.g., "Go to Page 87").

---

### 2. Cursor-Based Pagination (`seek` / `next`) — The Professional Standard

**How it works:** Instead of telling the database *how many to skip*, you tell it *"Give me 20 results that come AFTER this specific item."*

**Syntax (MongoDB):**
```javascript
// Page 1: Get the first 20
db.products.find().sort({ price: 1 }).limit(20)

// The last item on Page 1 was { price: 50, _id: "abc" }

// Page 2: Give me 20 items where price is >= 50, but exclude the one I already have
db.products.find({ 
  price: { $gt: 50 } 
}).sort({ price: 1 }).limit(20)
```

**Analogy:** You are reading a **dictionary**. 

- You open to page 1 (words starting with "A"). 
- When you finish that page, you don't count back to the start. You look at the **last word** on the page (e.g., "Apple") and say, *"Give me the next 20 words that come AFTER 'Apple'."* 
- The database instantly flips to the exact spot where "Apple" ends and grabs the next 20 words. No counting, no skipping.

**Why it's blazing fast:** 
The database uses your index on `price` to **seek directly to the exact position** of the last item you saw. It doesn't need to scan and discard millions of previous rows. It just grabs the next 20.

| Page | Work the Database Does | Result |
| :--- | :--- | :--- |
| Page 1 | Index Seek for first 20 | Fast (2ms) |
| Page 500 | Index Seek for the exact point after item 500 | Still Fast (2ms) |
| Page 1,000,000 | Index Seek for the exact point after item 1M | **Still Fast (2ms)!** |

---

### The Catch: You Lose "Total Pages"

Cursor-based pagination is not perfect. It has one major trade-off:

- **Offset Pagination:** You know *"There are 1,000,000 total results, and I am on Page 50 of 50,000."* You can jump to Page 1,000 instantly.
- **Cursor-Based Pagination:** You only know *"Next"* and *"Previous"*. You **cannot** jump to a specific arbitrary page (like Page 87). There is no "Go to Page 87" button.

**Use Case:** If you are building **Instagram, Twitter, or Reddit** (infinite scroll), cursor-based is the only choice. If you are building **Google Search results** (Page 1, 2, 3... 87), offset is technically required, but you limit the max page to 10 to prevent crashes.

---

### Deep Dive: Cursor Pagination in MongoDB (Using `$sort` + `$match`)

Since MongoDB doesn't have a built-in `SEEK` keyword, you use a `$match` on a unique combination to simulate it.

**Scenario:** Products sorted by `price` (ascending) and `_id` (ascending).

**Page 1 (Get initial data):**
```javascript
db.products.aggregate([
  { $sort: { price: 1, _id: 1 } },
  { $limit: 10 }
])

// Result: Last item returned is { price: 10, _id: "xyz" }
```

**Page 2 (Get the next 10 AFTER `{ price: 10, _id: "xyz" }`):**
```javascript
db.products.aggregate([
  { $match: { 
      $or: [
        { price: { $gt: 10 } },  // If price is higher, any ID works
        { 
          $and: [ 
            { price: 10 },        // If price is the same...
            { _id: { $gt: "xyz" } } // ...only get IDs greater than the last one
          ]
        }
      ]
  } },
  { $sort: { price: 1, _id: 1 } },
  { $limit: 10 }
])
```

**Why this works:** 
- It ensures you never miss a document, even if 100 products have the exact same price.
- It uses a compound index on `{ price: 1, _id: 1 }` to seek instantly.

---

### The "Previous Page" Problem

Cursor pagination is easy for "Next Page," but tricky for "Previous Page."

**The solution:** Reverse the sort.

To go backwards, you reverse the `$sort` and `$match`:
```javascript
// To go BACKWARDS from { price: 10, _id: "xyz" }
db.products.aggregate([
  { $match: { 
      $or: [
        { price: { $lt: 10 } },
        { $and: [ { price: 10 }, { _id: { $lt: "xyz" } } ] }
      ]
  } },
  { $sort: { price: -1, _id: -1 } }, // Reverse sort to get the immediate previous ones
  { $limit: 10 }
])
// Then reverse the result set in your application code.
```

---

### The Ultimate Decision Matrix

| Feature | Offset (`skip`/`limit`) | Cursor (`seek`/`next`) |
| :--- | :--- | :--- |
| **Performance on large datasets** | ❌ Gets slower the deeper you go | ✅ Constant speed, no matter the depth |
| **Jump to arbitrary page (Page 87)** | ✅ Yes (easy to calculate) | ❌ No (you only know Next/Previous) |
| **Real-time data changes** | ❌ Skips or duplicates items if new data is inserted mid-pagination | ✅ Stable—you always start exactly from the last cursor |
| **Implementation complexity** | ✅ Very easy (simple `skip`) | ❌ More complex (need unique cursor fields) |
| **Database resource usage** | ❌ High CPU/Memory for deep pages | ✅ Minimal (just index seeks) |

---

### Real-World Standard (The Industry Rule)

1. **For admin dashboards / internal tools:** Use `skip`/`limit` because admins need to jump to page 87 to find a specific order. **But** enforce a max `skip` (e.g., never let them go past page 500).
2. **For customer-facing apps (Public APIs, Mobile, Infinite Scroll):** **Always use cursor-based pagination.** This is what Twitter, Facebook, Stripe, and Shopify use for their APIs. 

If you are building a REST API, you will often see this in the response:

**Cursor-Based API Response:**
```json
{
  "data": [ ... ],
  "next_cursor": "eyJwcmljZSI6MTAsIl9pZCI6Inh5eiJ9",
  "has_more": true
}
```
The client passes that `next_cursor` back to the server to get the next page.

---

### Summary (The Short Version)

- **`skip`/`limit`** = Counting papers on a desk. Fine for page 1, but counting to page 1,000,000 will crash your app. Only use for small data or admin panels.
- **Cursor-based** = Using a dictionary bookmark. You always start exactly where you left off. Requires an index on your sort fields. **This is the gold standard for production apps.**

Rule of thumb: If you are using `skip` on a collection with more than 10,000 documents, you are doing it wrong. Time to switch to cursors! 🚀