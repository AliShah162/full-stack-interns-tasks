# Indexing, Aggregation & Query Optimization - A Beginner's Complete Guide

Welcome! Today we're going to learn how to make your MongoDB database **lightning fast**. Think of this as learning how to organize a massive library so you can find any book in seconds!

---

## 1. What are Indexes & Why They Matter

### The Problem: Slow Queries

Imagine you have a library with **1 million books**, but they're all thrown in a huge pile on the floor. When someone asks for "Harry Potter", you have to search through every single book until you find it. That's **slow**!

```javascript
// Without indexes - MongoDB has to scan EVERY document
db.books.find({ title: "Harry Potter" })
// ❌ This will check 1,000,000 documents!
```

### The Solution: Indexes

An **index** is like a **card catalog** in a library. Instead of searching through every book, you look up "Harry Potter" in the catalog, and it tells you exactly where the book is.

```javascript
// With an index - MongoDB uses the catalog
// Step 1: Create the index
db.books.createIndex({ title: 1 })  // 1 = ascending order

// Step 2: Query is now FAST!
db.books.find({ title: "Harry Potter" })
// ✅ This only looks at the index, not all documents!
```

### Real-World Analogy

| Without Index | With Index |
|---------------|------------|
| 📚 Books scattered on floor | 📚 Books organized on shelves |
| 🔍 Search every book manually | 📇 Look up in card catalog |
| 🐌 Takes hours to find anything | ⚡ Find anything in seconds |
| 😰 Impossible with millions of books | 😊 Easy even with billions |

### How Indexes Work Under the Hood

An index in MongoDB is stored as a **B-tree** data structure:

```
Index Structure (B-tree):
        [M]
       /   \
    [F]     [S]
   /   \   /   \
 [A] [H] [N] [Z]
 
Each node points to the actual document location!
```

### Creating Your First Index

```javascript
// Connect to MongoDB
const mongoose = require('mongoose');

// Our user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  city: String
});

// Create an index on email (most common search field)
userSchema.index({ email: 1 });  // 1 = ascending order

// Create a model
const User = mongoose.model('User', userSchema);

// Now searches on email are SUPER FAST!
const user = await User.findOne({ email: 'john@example.com' });
// ✅ Uses the index!

// Search on name without index - SLOW
const users = await User.find({ name: 'John' });
// ❌ No index on name - scans all documents!
```

### When to Use Indexes

**✅ Use Indexes For:**
- Fields you search on frequently
- Fields used in sorting
- Fields used in grouping/aggregation
- Unique fields (email, username)

**❌ Don't Use Indexes For:**
- Small collections (< 1000 documents)
- Fields with very few unique values (e.g., `isActive: true/false`)
- Fields you rarely query on
- Collections with frequent write operations

### Index Types

```javascript
// 1. Single Field Index - Most Common
userSchema.index({ email: 1 });  // 1 = ascending, -1 = descending

// 2. Unique Index - No duplicates allowed
userSchema.index({ email: 1 }, { unique: true });

// 3. Compound Index - Multiple fields
userSchema.index({ city: 1, age: -1 });  // City ascending, age descending

// 4. Text Index - For text search
postSchema.index({ title: 'text', content: 'text' });
// Allows: db.posts.find({ $text: { $search: "mongodb" } })

// 5. Hashed Index - For sharding
userSchema.index({ email: 'hashed' });

// 6. Geospatial Index - For location queries
placeSchema.index({ location: '2dsphere' });
// Allows: db.places.find({ location: { $near: [lng, lat] } })
```

---

## 2. Single Field vs Compound Indexes

### Single Field Index

A **single field index** is like organizing books by just **one** category (e.g., by author only).

```javascript
// Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  genre: String
});

// Single field index on author
bookSchema.index({ author: 1 });

// ✅ Fast queries:
db.books.find({ author: "J.K. Rowling" })
db.books.find({ author: "J.K. Rowling" }).sort({ year: -1 })

// ❌ Slow queries (no index on these fields):
db.books.find({ title: "Harry Potter" })
db.books.find({ genre: "Fantasy" })
```

**When to use Single Field:**
- You mostly search by ONE field
- You want to ensure uniqueness on one field
- Simple use cases

### Compound Index

A **compound index** is like organizing books by **multiple** categories (e.g., by author AND year).

```javascript
// Compound index on author and year
bookSchema.index({ author: 1, year: -1 });

// ✅ Fast queries:
db.books.find({ author: "J.K. Rowling" })
db.books.find({ author: "J.K. Rowling" }).sort({ year: -1 })
db.books.find({ author: "J.K. Rowling", year: { $gt: 2000 } })

// ❌ Slow queries (can't use index efficiently):
db.books.find({ year: 2000 })  // Year is second in index
db.books.find({ genre: "Fantasy" })  // Not in index at all
```

### Compound Index Rules

The **order of fields** in a compound index is CRUCIAL!

```javascript
// INDEX A: { author: 1, year: -1 }
// Use cases:
✅ db.books.find({ author: "J.K. Rowling" })
✅ db.books.find({ author: "J.K. Rowling", year: 2000 })
✅ db.books.find({ author: "J.K. Rowling" }).sort({ year: -1 })
❌ db.books.find({ year: 2000 })  // Can't use index efficiently

// INDEX B: { year: -1, author: 1 }
// Use cases:
✅ db.books.find({ year: 2000 })
✅ db.books.find({ year: 2000, author: "J.K. Rowling" })
❌ db.books.find({ author: "J.K. Rowling" })  // Can't use index efficiently
```

### Real Example: E-commerce Product Index

```javascript
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  rating: Number,
  inStock: Boolean
});

// Best compound index for most common searches
productSchema.index({ 
  category: 1,    // First: category (most specific)
  price: -1,      // Second: price (for sorting/range)
  rating: -1      // Third: rating (secondary sorting)
});

// ✅ These queries use the index:
// Find all electronics under $500, sorted by rating
db.products.find({
  category: "Electronics",
  price: { $lte: 500 }
}).sort({ rating: -1 })

// Find electronics under $1000
db.products.find({
  category: "Electronics",
  price: { $lte: 1000 }
})

// ❌ These don't use index efficiently:
db.products.find({ price: { $lte: 500 } })  // No category in query
db.products.find({ rating: { $gt: 4 } })    // Rating is last in index
```

### Index Prefix Rule

A compound index can support queries that use a **prefix** of the indexed fields:

```javascript
// Index: { a: 1, b: 1, c: 1 }

// ✅ Supported queries (prefixes):
db.collection.find({ a: 1 })           // Uses index
db.collection.find({ a: 1, b: 1 })     // Uses index
db.collection.find({ a: 1, b: 1, c: 1 }) // Uses index

// ❌ NOT supported:
db.collection.find({ b: 1 })           // Can't use index
db.collection.find({ a: 1, c: 1 })     // Missing b, can't fully use
```

---

## 3. Aggregation Pipeline

### What is the Aggregation Pipeline?

The **aggregation pipeline** is like an **assembly line** where each step transforms your data:

```
Raw Data → [Step 1] → [Step 2] → [Step 3] → Final Result
           │          │          │
       Filter     Group     Sort/Project
```

### The Pipeline Concept

Think of it like making a smoothie:

1. **$match**: Pick the best fruits (filter)
2. **$group**: Blend similar fruits together (group)
3. **$project**: Pour into a glass (reshape)
4. **$sort**: Arrange cups neatly (sort)
5. **$limit**: Take only 5 cups (limit)

### Basic Pipeline Example

```javascript
// Scenario: Sales database
const salesSchema = new mongoose.Schema({
  product: String,
  category: String,
  price: Number,
  quantity: Number,
  date: Date,
  customer: String
});

const Sale = mongoose.model('Sale', salesSchema);

// Pipeline: Get total sales by category, sorted
const result = await Sale.aggregate([
  // Stage 1: $match - Filter data
  { 
    $match: { 
      date: { $gte: new Date('2024-01-01') }  // Only 2024 sales
    } 
  },
  
  // Stage 2: $group - Group by category
  { 
    $group: {
      _id: '$category',                     // Group by category
      totalRevenue: { $sum: '$price' },     // Sum of prices
      totalQuantity: { $sum: '$quantity' }, // Sum of quantities
      averagePrice: { $avg: '$price' }      // Average price
    } 
  },
  
  // Stage 3: $sort - Sort by revenue
  { 
    $sort: { totalRevenue: -1 }  // Highest revenue first
  },
  
  // Stage 4: $limit - Only top 5
  { 
    $limit: 5 
  }
]);

console.log('Top categories by revenue:', result);
```

### Visual Pipeline Flow

```
Original Data:
{ product: "Laptop", category: "Electronics", price: 1000, quantity: 2 }
{ product: "Book", category: "Books", price: 20, quantity: 5 }
{ product: "Phone", category: "Electronics", price: 500, quantity: 3 }

Step 1 - $match (filter 2024 data):
{ product: "Laptop", category: "Electronics", price: 1000, quantity: 2 }
{ product: "Phone", category: "Electronics", price: 500, quantity: 3 }

Step 2 - $group (group by category):
{ _id: "Electronics", totalRevenue: 1500, totalQuantity: 5 }

Step 3 - $sort (sort by revenue):
{ _id: "Electronics", totalRevenue: 1500, totalQuantity: 5 }

Step 4 - $project (reshape):
{ category: "Electronics", revenue: 1500, items: 5 }
```

---

## 4. $match, $group, $project, $sort, $limit

### $match - Filter Documents

**$match** is like a **filter** - it selects only the documents you want.

```javascript
// Basic $match
const result = await orders.aggregate([
  { $match: { status: "completed" } }  // Only completed orders
]);

// $match with comparisons
const result = await orders.aggregate([
  { $match: { 
    total: { $gte: 100 },              // Orders >= $100
    status: { $in: ["paid", "shipped"] } // Paid or shipped
  }}
]);

// $match with dates
const result = await orders.aggregate([
  { $match: { 
    orderDate: { 
      $gte: new Date('2024-01-01'),
      $lt: new Date('2024-02-01')
    }
  }}
]);

// $match with regex (text search)
const result = await products.aggregate([
  { $match: { 
    name: { $regex: /^iPhone/, $options: 'i' }  // Starts with "iPhone"
  }}
]);
```

### $group - Group Documents

**$group** is like **grouping similar items together** (like organizing by category).

```javascript
// Basic $group - Count by category
const result = await products.aggregate([
  { $group: {
    _id: '$category',           // Group by category
    count: { $sum: 1 }          // Count documents
  }}
]);

// Multiple aggregations
const result = await orders.aggregate([
  { $group: {
    _id: '$customerId',         // Group by customer
    totalOrders: { $sum: 1 },   // Count orders
    totalSpent: { $sum: '$total' }, // Sum totals
    averageOrder: { $avg: '$total' }, // Average order
    maxOrder: { $max: '$total' }, // Largest order
    minOrder: { $min: '$total' }, // Smallest order
    firstOrder: { $min: '$orderDate' }, // Earliest
    lastOrder: { $max: '$orderDate' } // Latest
  }}
]);

// Group by multiple fields
const result = await sales.aggregate([
  { $group: {
    _id: { 
      category: '$category',
      year: { $year: '$date' }  // Group by category AND year
    },
    totalRevenue: { $sum: '$amount' }
  }}
]);

// $group with push (collect items)
const result = await posts.aggregate([
  { $group: {
    _id: '$authorId',
    posts: { $push: '$title' }  // Collect all post titles
  }}
]);
```

### $project - Reshape Documents

**$project** is like **choosing what to show** and reshaping the data.

```javascript
// Basic $project - Select fields
const result = await users.aggregate([
  { $project: {
    name: 1,           // Include
    email: 1,          // Include
    _id: 0,            // Exclude
    password: 0        // Exclude
  }}
]);

// Create new fields
const result = await products.aggregate([
  { $project: {
    name: 1,
    price: 1,
    tax: { $multiply: ['$price', 0.08] },  // Calculate tax
    totalPrice: { $add: ['$price', { $multiply: ['$price', 0.08] }] },
    discountedPrice: { $divide: ['$price', 2] }  // 50% discount
  }}
]);

// Conditional fields
const result = await orders.aggregate([
  { $project: {
    orderId: '$_id',
    total: 1,
    status: 1,
    isHighValue: { $cond: {
      if: { $gte: ['$total', 1000] },
      then: 'High Value',
      else: 'Regular'
    }},
    category: { $switch: {
      branches: [
        { case: { $eq: ['$total', 0] }, then: 'Empty' },
        { case: { $lt: ['$total', 100] }, then: 'Small' },
        { case: { $lt: ['$total', 500] }, then: 'Medium' }
      ],
      default: 'Large'
    }}
  }}
]);

// Working with arrays
const result = await products.aggregate([
  { $project: {
    name: 1,
    firstTag: { $arrayElemAt: ['$tags', 0] },  // First tag
    tagCount: { $size: '$tags' },              // Number of tags
    hasDiscount: { $in: ['sale', '$tags'] }    // Check if has "sale"
  }}
]);
```

### $sort - Sort Documents

**$sort** is like **organizing items in order** (A to Z, smallest to largest).

```javascript
// Basic sort
const result = await products.aggregate([
  { $sort: { price: 1 } }  // 1 = ascending (cheapest first)
]);

// Sort multiple fields
const result = await products.aggregate([
  { $sort: { 
    category: 1,      // Sort by category A-Z
    price: -1         // Then by price highest to lowest
  }}
]);

// Sort with $match
const result = await products.aggregate([
  { $match: { inStock: true } },
  { $sort: { rating: -1 } },  // Highest rated first
  { $limit: 10 }               // Top 10 products
]);
```

### $limit and $skip

**$limit** and **$skip** are used for **pagination** (showing data in pages).

```javascript
// $limit - Take only N documents
const result = await products.aggregate([
  { $limit: 10 }  // Get first 10 documents
]);

// $skip - Skip N documents
const result = await products.aggregate([
  { $skip: 20 },   // Skip first 20
  { $limit: 10 }   // Then take 10
]);

// Complete pagination example
const page = 2;
const pageSize = 10;
const result = await products.aggregate([
  { $match: { category: 'Electronics' } },
  { $sort: { price: 1 } },
  { $skip: (page - 1) * pageSize },  // Skip previous pages
  { $limit: pageSize }                // Take current page
]);

// $sort + $limit = Top N
const result = await products.aggregate([
  { $match: { isActive: true } },
  { $sort: { sales: -1 } },  // Best selling
  { $limit: 5 }               // Top 5
]);
```

### Combining All Stages

```javascript
// Complete example: Sales dashboard
const dashboardData = await sales.aggregate([
  // 1. Filter data
  { $match: {
    date: { 
      $gte: new Date('2024-01-01'),
      $lt: new Date('2024-02-01')
    },
    status: 'completed'
  }},
  
  // 2. Group by category
  { $group: {
    _id: '$category',
    totalRevenue: { $sum: '$amount' },
    totalSales: { $sum: 1 },
    avgAmount: { $avg: '$amount' }
  }},
  
  // 3. Sort by revenue
  { $sort: { totalRevenue: -1 } },
  
  // 4. Limit to top 10
  { $limit: 10 },
  
  // 5. Reshape for output
  { $project: {
    category: '$_id',
    revenue: '$totalRevenue',
    sales: '$totalSales',
    average: { $round: ['$avgAmount', 2] },
    _id: 0
  }}
]);

console.log('Monthly dashboard:', dashboardData);
```

---

## 5. $lookup (Joins in MongoDB)

### What is $lookup?

**$lookup** is how MongoDB does **joins** - it's like connecting two different tables (collections) together.

```
Collection A (Orders)     Collection B (Customers)
┌─────────────┐           ┌─────────────┐
│ orderId: 1  │           │ _id: 101    │
│ customerId: │  ────→   │ name: John  │
│   101       │           │ email: ...  │
└─────────────┘           └─────────────┘
```

### Basic $lookup

```javascript
// SCENARIO: Orders and Customers

// 1. Order Schema
const orderSchema = new mongoose.Schema({
  orderId: String,
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  total: Number,
  date: Date
});

// 2. Customer Schema
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

// 3. $lookup example
const ordersWithCustomers = await orders.aggregate([
  {
    $lookup: {
      from: 'customers',        // Collection to join with
      localField: 'customerId', // Field from orders
      foreignField: '_id',      // Field from customers
      as: 'customer'            // Output array name
    }
  }
]);

// Result:
// { 
//   orderId: "ORD-001",
//   total: 150,
//   customer: [{
//     _id: ObjectId("..."),
//     name: "John Doe",
//     email: "john@example.com"
//   }]
// }
```

### Advanced $lookup with Pipeline

```javascript
// Complex $lookup with filtering

const ordersWithDetails = await orders.aggregate([
  {
    $lookup: {
      from: 'customers',
      let: { customerId: '$customerId' },  // Variables from orders
      pipeline: [
        { $match: { 
          $expr: { $eq: ['$_id', '$$customerId'] },
          isActive: true  // Only active customers
        }},
        { $project: {
          name: 1,
          email: 1,
          _id: 0
        }}
      ],
      as: 'customer'
    }
  },
  // Unwind customer array (convert array to object)
  { $unwind: '$customer' }
]);

// Multiple $lookup - Join multiple collections
const fullOrderData = await orders.aggregate([
  // Join customers
  { $lookup: {
    from: 'customers',
    localField: 'customerId',
    foreignField: '_id',
    as: 'customer'
  }},
  
  // Join products
  { $lookup: {
    from: 'products',
    localField: 'productIds',
    foreignField: '_id',
    as: 'products'
  }},
  
  // Join payments
  { $lookup: {
    from: 'payments',
    localField: 'paymentId',
    foreignField: '_id',
    as: 'payment'
  }},
  
  // Clean up
  { $addFields: {
    customer: { $arrayElemAt: ['$customer', 0] },
    payment: { $arrayElemAt: ['$payment', 0] }
  }}
]);

// Nested $lookup (join on joined data)
const ordersWithNestedData = await orders.aggregate([
  { $lookup: {
    from: 'customers',
    localField: 'customerId',
    foreignField: '_id',
    as: 'customer'
  }},
  
  { $unwind: '$customer' },
  
  // Now join with customer's address
  { $lookup: {
    from: 'addresses',
    localField: 'customer.addressId',
    foreignField: '_id',
    as: 'customer.address'
  }},
  
  { $addFields: {
    'customer.address': { $arrayElemAt: ['$customer.address', 0] }
  }}
]);
```

### Real-World $lookup Examples

```javascript
// 1. Blog Posts with Authors
const postsWithAuthors = await posts.aggregate([
  { $lookup: {
    from: 'users',
    localField: 'authorId',
    foreignField: '_id',
    as: 'author'
  }},
  { $addFields: {
    author: { $arrayElemAt: ['$author', 0] }
  }},
  { $project: {
    title: 1,
    content: 1,
    'author.name': 1,
    'author.email': 1
  }}
]);

// 2. Students with Courses and Grades
const studentReport = await students.aggregate([
  { $lookup: {
    from: 'enrollments',
    localField: '_id',
    foreignField: 'studentId',
    as: 'enrollments'
  }},
  
  { $unwind: '$enrollments' },
  
  { $lookup: {
    from: 'courses',
    localField: 'enrollments.courseId',
    foreignField: '_id',
    as: 'course'
  }},
  
  { $addFields: {
    'enrollments.course': { $arrayElemAt: ['$course', 0] }
  }},
  
  { $group: {
    _id: '$_id',
    name: { $first: '$name' },
    enrollments: { $push: '$enrollments' }
  }}
]);

// 3. Social Media - Posts with Comments and Likes
const feedData = await posts.aggregate([
  // Get post author
  { $lookup: {
    from: 'users',
    localField: 'authorId',
    foreignField: '_id',
    as: 'author'
  }},
  
  // Get post comments
  { $lookup: {
    from: 'comments',
    localField: '_id',
    foreignField: 'postId',
    as: 'comments'
  }},
  
  // Get comment authors
  { $unwind: { path: '$comments', preserveNullAndEmptyArrays: true } },
  
  { $lookup: {
    from: 'users',
    localField: 'comments.authorId',
    foreignField: '_id',
    as: 'comments.author'
  }},
  
  { $addFields: {
    'comments.author': { $arrayElemAt: ['$comments.author', 0] }
  }},
  
  // Re-group comments
  { $group: {
    _id: '$_id',
    title: { $first: '$title' },
    content: { $first: '$content' },
    author: { $first: '$author' },
    comments: { $push: '$comments' }
  }},
  
  // Get likes count
  { $addFields: {
    likeCount: { $size: '$likes' }
  }}
]);
```

---

## 6. Query Performance Basics — explain()

### What is explain()?

**explain()** is MongoDB's **diagnostic tool** that shows you exactly how your query is executed. It's like having X-ray vision into your database!

```javascript
// Basic usage
const result = await users.find({ email: 'john@example.com' }).explain();

console.log(result);
// Shows: 
// - If the query used an index
// - How many documents were scanned
// - How long it took
```

### Understanding explain() Output

```javascript
const explanation = await users.find({ 
  email: 'john@example.com' 
}).explain('executionStats');  // Detailed stats

// Key things to look at:
console.log({
  // 1. Did it use an index?
  usedIndex: explanation.executionStats.totalKeysExamined > 0,
  
  // 2. How many documents were scanned?
  documentsScanned: explanation.executionStats.totalDocsExamined,
  
  // 3. How many documents matched?
  documentsMatched: explanation.executionStats.nReturned,
  
  // 4. How long did it take? (milliseconds)
  executionTime: explanation.executionStats.executionTimeMillis
});

// If documentsScanned > documentsMatched, you're scanning too many documents!
```

### Comparing Query Performance

```javascript
// Example: Which query is faster?

// Query 1: Without index
const slowQuery = await users.find({ 
  city: 'New York' 
}).explain('executionStats');

console.log('SLOW QUERY:');
console.log('Documents scanned:', slowQuery.executionStats.totalDocsExamined);
console.log('Time:', slowQuery.executionStats.executionTimeMillis);

// Create index
users.createIndex({ city: 1 });

// Query 2: With index
const fastQuery = await users.find({ 
  city: 'New York' 
}).explain('executionStats');

console.log('FAST QUERY:');
console.log('Documents scanned:', fastQuery.executionStats.totalDocsExamined);
console.log('Time:', fastQuery.executionStats.executionTimeMillis);
```

### Reading explain() Results

```javascript
const explanation = await orders.find({
  customerId: '123',
  total: { $gt: 100 }
}).explain('executionStats');

// Check for index usage
if (explanation.queryPlanner.winningPlan.inputStage) {
  if (explanation.queryPlanner.winningPlan.inputStage.stage === 'IXSCAN') {
    console.log('✅ Using index scan');
  } else {
    console.log('❌ Using collection scan - needs index');
  }
}

// Check if query is efficient
const nReturned = explanation.executionStats.nReturned;
const docsExamined = explanation.executionStats.totalDocsExamined;
const keysExamined = explanation.executionStats.totalKeysExamined;

if (nReturned === docsExamined) {
  console.log('✅ Excellent - examined only matching documents');
} else if (docsExamined > nReturned * 2) {
  console.log('⚠️ Warning - scanning too many documents');
  console.log(`Examined ${docsExamined} documents to find ${nReturned} results`);
}

// Check for covered query (index only, no document access)
if (explanation.executionStats.totalDocsExamined === 0) {
  console.log('🚀 PERFECT! Covered query - index only!');
}
```

### Optimizing Queries with explain()

```javascript
// Function to analyze and optimize queries
async function analyzeQuery(model, query, projection, sort) {
  // Test with explain
  const explanation = await model.find(query)
    .select(projection)
    .sort(sort)
    .explain('executionStats');
  
  // Analyze results
  const stats = {
    nReturned: explanation.executionStats.nReturned,
    docsExamined: explanation.executionStats.totalDocsExamined,
    keysExamined: explanation.executionStats.totalKeysExamined,
    timeMs: explanation.executionStats.executionTimeMillis
  };
  
  // Performance rating
  let rating = 'Good';
  let suggestions = [];
  
  if (stats.docsExamined > stats.nReturned * 10) {
    rating = 'Poor';
    suggestions.push('Add index on query fields');
  }
  
  if (stats.keysExamined > stats.docsExamined) {
    rating = 'Can improve';
    suggestions.push('Consider compound index');
  }
  
  if (stats.timeMs > 500) {
    rating = 'Slow';
    suggestions.push('Query taking too long - optimize index');
  }
  
  return { stats, rating, suggestions };
}

// Usage
const analysis = await analyzeQuery(
  User, 
  { city: 'New York', age: { $gt: 25 } },
  'name email age',
  { age: -1 }
);

console.log('Query Analysis:', analysis);
```

---

## 7. Pagination Strategies

### What is Pagination?

Pagination is splitting large results into **pages** - like reading a book one page at a time.

```
Page 1: Items 1-10    → Next
Page 2: Items 11-20   → Next
Page 3: Items 21-30   → Next
...
```

### Strategy 1: Skip/Limit Pagination

The most common but **least efficient** for large datasets.

```javascript
// Skip/Limit pagination
async function getPaginatedUsers(page = 1, pageSize = 10) {
  const skip = (page - 1) * pageSize;
  
  const users = await User.find()
    .skip(skip)      // Skip previous pages
    .limit(pageSize) // Take current page
    .sort({ createdAt: -1 });
  
  const total = await User.countDocuments();
  
  return {
    data: users,
    page: page,
    pageSize: pageSize,
    totalPages: Math.ceil(total / pageSize),
    totalItems: total
  };
}

// Usage
const page1 = await getPaginatedUsers(1, 10);  // Users 1-10
const page2 = await getPaginatedUsers(2, 10);  // Users 11-20
```

**Problems with Skip/Limit:**
```javascript
// PROBLEM 1: Performance degrades with large skips
// Page 1: Skip 0 → Fast
// Page 100: Skip 9900 → SLOW! (must skip 9900 documents)

// PROBLEM 2: Inconsistent results if data changes
// User adds new document → Page boundaries shift!

// PROBLEM 3: No cursor for efficient iteration
// Can't efficiently iterate through millions of documents
```

### Strategy 2: Cursor-Based Pagination (Recommended)

Cursor-based pagination uses a **marker** (like a bookmark) to remember where you left off.

```javascript
// Cursor-based pagination
async function getNextPage(lastId = null, limit = 10) {
  let query = {};
  
  if (lastId) {
    // Get documents after the last one
    const lastDoc = await User.findById(lastId);
    if (lastDoc) {
      query = {
        $or: [
          // If same timestamp, use _id for tie-breaking
          { createdAt: { $gt: lastDoc.createdAt } },
          { 
            createdAt: lastDoc.createdAt,
            _id: { $gt: lastDoc._id }
          }
        ]
      };
    }
  }
  
  const users = await User.find(query)
    .sort({ createdAt: 1, _id: 1 })  // Sort by time
    .limit(limit);
  
  const nextCursor = users.length === limit ? 
    users[users.length - 1]._id : null;
  
  return {
    data: users,
    nextCursor: nextCursor,
    hasMore: users.length === limit
  };
}

// Usage - Page 1
const page1 = await getNextPage(null);
console.log('Page 1:', page1.data);
console.log('Next cursor:', page1.nextCursor);

// Page 2 - Use cursor from page 1
const page2 = await getNextPage(page1.nextCursor);
console.log('Page 2:', page2.data);
```

### Advanced Cursor Pagination with Timestamps

```javascript
// Timestamp-based cursor pagination
async function getPostsPaginated(cursor = null, limit = 10) {
  const query = {};
  
  if (cursor) {
    query.createdAt = { $lt: new Date(cursor) };
  }
  
  const posts = await Post.find(query)
    .sort({ createdAt: -1 })  // Newest first
    .limit(limit + 1)  // Get one extra to check if more exist
  
  const hasMore = posts.length > limit;
  const data = hasMore ? posts.slice(0, -1) : posts;
  const nextCursor = hasMore ? data[data.length - 1].createdAt : null;
  
  return {
    data,
    nextCursor,
    hasMore
  };
}
```

### Strategy 3: Keyset Pagination (Seek Method)

Keyset pagination uses a **specific field** as a pointer.

```javascript
// Keyset pagination using a unique field
async function paginateByUsername(lastUsername = null, limit = 10) {
  const query = {};
  
  if (lastUsername) {
    query.username = { $gt: lastUsername };
  }
  
  const users = await User.find(query)
    .sort({ username: 1 })  // Alphabetical
    .limit(limit);
  
  const nextCursor = users.length === limit ? 
    users[users.length - 1].username : null;
  
  return {
    data: users,
    nextCursor: nextCursor,
    hasMore: users.length === limit
  };
}

// Usage
const page1 = await paginateByUsername(null, 10);
// Returns users: 'alex', 'bob', 'charlie', ...

const page2 = await paginateByUsername(page1.nextCursor, 10);
// Returns users: after 'charlie'
```

### Comparing Pagination Strategies

```javascript
// Strategy Comparison
async function comparePaginationStrategies() {
  const startTime = Date.now();
  
  // 1. Skip/Limit (bad for large datasets)
  console.log('Method 1: Skip/Limit');
  const result1 = await User.find()
    .skip(100000)  // Page 10000 of size 10
    .limit(10)
    .explain('executionStats');
  console.log('Time:', result1.executionStats.executionTimeMillis, 'ms');
  
  // 2. Cursor-based (efficient)
  console.log('Method 2: Cursor-based');
  const lastDoc = await User.findOne()
    .sort({ _id: -1 })
    .skip(99999);
  
  const result2 = await User.find({
    _id: { $gt: lastDoc._id }
  })
  .limit(10)
  .explain('executionStats');
  console.log('Time:', result2.executionStats.executionTimeMillis, 'ms');
}
```

### Production-Ready Pagination Service

```javascript
class PaginationService {
  constructor(model) {
    this.model = model;
  }
  
  // Hybrid pagination supporting multiple strategies
  async paginate({
    page = 1,
    limit = 10,
    cursor = null,
    strategy = 'cursor', // 'skip' or 'cursor'
    query = {},
    sort = { _id: -1 },
    select = null,
    populate = null
  } = {}) {
    
    if (strategy === 'cursor') {
      return this.cursorPaginate({ 
        cursor, limit, query, sort, select, populate 
      });
    } else {
      return this.skipPaginate({ 
        page, limit, query, sort, select, populate 
      });
    }
  }
  
  // Cursor-based pagination
  async cursorPaginate({ 
    cursor, limit, query, sort, select, populate 
  }) {
    const baseQuery = { ...query };
    
    if (cursor) {
      // Parse cursor (could be base64 encoded JSON)
      const decoded = Buffer.from(cursor, 'base64').toString();
      const cursorObj = JSON.parse(decoded);
      
      // Build query for next page
      const sortFields = Object.keys(sort);
      const conditions = [];
      
      for (const field of sortFields) {
        const condition = {};
        const value = cursorObj[field];
        const order = sort[field];
        
        if (order === 1) {
          condition[field] = { $gt: value };
        } else {
          condition[field] = { $lt: value };
        }
        conditions.push(condition);
      }
      
      baseQuery.$or = conditions;
    }
    
    let queryBuilder = this.model.find(baseQuery)
      .sort(sort)
      .limit(limit + 1);
    
    if (select) queryBuilder = queryBuilder.select(select);
    if (populate) queryBuilder = queryBuilder.populate(populate);
    
    const results = await queryBuilder.lean();
    const hasMore = results.length > limit;
    const data = hasMore ? results.slice(0, -1) : results;
    
    // Create next cursor
    let nextCursor = null;
    if (hasMore && data.length > 0) {
      const lastDoc = data[data.length - 1];
      const cursorData = {};
      for (const field of Object.keys(sort)) {
        cursorData[field] = lastDoc[field];
      }
      nextCursor = Buffer.from(JSON.stringify(cursorData)).toString('base64');
    }
    
    return {
      data,
      pagination: {
        limit,
        nextCursor,
        hasMore,
        count: data.length
      }
    };
  }
  
  // Traditional skip/limit pagination
  async skipPaginate({ 
    page, limit, query, sort, select, populate 
  }) {
    const skip = (page - 1) * limit;
    
    const [data, total] = await Promise.all([
      this.model.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select(select)
        .populate(populate)
        .lean(),
      this.model.countDocuments(query)
    ]);
    
    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    };
  }
}

// Usage
const userPagination = new PaginationService(User);

// Cursor-based pagination (efficient for large datasets)
const page1 = await userPagination.paginate({
  strategy: 'cursor',
  limit: 10,
  query: { isActive: true },
  sort: { createdAt: -1 },
  select: 'name email createdAt',
  populate: 'profile'
});

console.log('Page 1:', page1);

const page2 = await userPagination.paginate({
  strategy: 'cursor',
  cursor: page1.pagination.nextCursor,
  limit: 10
});

// Skip/limit pagination (simpler for small datasets)
const page3 = await userPagination.paginate({
  strategy: 'skip',
  page: 3,
  limit: 10
});
```

---

## Performance Optimization Checklist

### 🚀 Quick Wins

```javascript
// 1. Always use indexes for query fields
userSchema.index({ email: 1 });
userSchema.index({ city: 1, age: -1 });

// 2. Use projection to return only needed fields
const users = await User.find({}, 'name email age');  // Only these fields

// 3. Use lean() for read-only queries (faster)
const users = await User.find().lean();

// 4. Use limit() when you don't need all results
const topUsers = await User.find().sort({ points: -1 }).limit(10);

// 5. Use explain() to find slow queries
const explanation = await User.find({ city: 'NY' }).explain();

// 6. Batch operations instead of individual updates
await User.updateMany(
  { status: 'inactive' },
  { $set: { status: 'active' } }
);

// 7. Use $in instead of multiple queries
const users = await User.find({ 
  userId: { $in: [1, 2, 3, 4, 5] } 
});
```

### Performance Comparison

| Strategy | Small Data (< 10k) | Medium Data (10k-1M) | Large Data (> 1M) |
|----------|-------------------|---------------------|-------------------|
| No Index | ✅ OK | ❌ Slow | ❌ Very Slow |
| Single Index | ✅ Fast | ✅ Fast | ⚠️ OK |
| Compound Index | ✅ Fast | ✅ Fast | ✅ Fast |
| Skip/Limit Pagination | ✅ OK | ⚠️ Slows down | ❌ Too Slow |
| Cursor Pagination | ✅ Fast | ✅ Fast | ✅ Fast |

---

## Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Indexes** | Like a book's index - makes search lightning fast |
| **Single Index** | One field - simple searches |
| **Compound Index** | Multiple fields - complex queries |
| **Aggregation** | Data processing pipeline - like an assembly line |
| **$match** | Filter data - only keep what you need |
| **$group** | Group similar items - count, sum, average |
| **$project** | Reshape data - choose what to show |
| **$lookup** | Join collections - connect related data |
| **explain()** | Performance diagnosis - see how queries run |
| **Skip/Limit** | Simple pagination - but slow for large data |
| **Cursor Pagination** | Efficient pagination - recommended for big data |

Remember: **Indexes are your best friend** for performance. Always test your queries with `explain()` and optimize based on your data size!