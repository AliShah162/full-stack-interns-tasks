## 1. Introduction to NoSQL & MongoDB

### What is NoSQL?
NoSQL (Not Only SQL) databases are non-relational databases designed for distributed data stores with large-scale data storage needs. They differ from traditional SQL databases in several ways:

**Key Characteristics of NoSQL:**
- **Schema-flexible**: No fixed table structure
- **Horizontal scaling**: Easy to distribute across multiple servers
- **High performance**: Optimized for specific data models
- **Document-oriented**: Stores data as documents (JSON-like)

### Types of NoSQL Databases:
1. **Document Databases** (MongoDB, CouchDB)
2. **Key-Value Stores** (Redis, DynamoDB)
3. **Column-Family Stores** (Cassandra, HBase)
4. **Graph Databases** (Neo4j, Amazon Neptune)

### What is MongoDB?
MongoDB is a **document-oriented NoSQL database** that stores data in flexible, JSON-like documents. It was developed by MongoDB Inc. in 2009.

**Key Features:**
- Document-based storage
- Full index support
- Aggregation framework
- Replication and high availability
- Auto-sharding for horizontal scaling
- Rich query language

---

## 2. Documents & Collections

### Collections
A collection is a group of MongoDB documents. It's equivalent to a **table** in relational databases but without a fixed schema.

**Characteristics:**
- Collections exist within a database
- Collections don't enforce schema
- Documents within a collection can have different fields
- Collections are created implicitly when first document is inserted

### Documents
A document is a set of key-value pairs. It's equivalent to a **row** in relational databases.

**Document Structure:**
```json
{
  "_id": ObjectId("507f191e810c19729de860ea"),
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  },
  "hobbies": ["reading", "traveling", "coding"]
}
```

**Key Points:**
- **`_id`**: Required unique identifier (auto-generated if not provided)
- Field names are strings
- Values can be various types (strings, numbers, arrays, nested objects)
- Documents can be up to 16MB in size

---

## 3. BSON vs JSON

### JSON (JavaScript Object Notation)
Text-based, human-readable format for data interchange.

**JSON Characteristics:**
- **Text-based**: Easy to read and write
- **Limited data types**: String, Number, Boolean, Array, Object, Null
- **No binary support**
- **No date type** (stored as strings)
- **Inefficient for storage** (text format)

### BSON (Binary JSON)
Binary-encoded serialization of JSON-like documents used by MongoDB.

**BSON Characteristics:**
- **Binary format**: More efficient for storage and transmission
- **Rich data types**:
  - Date
  - Binary data
  - ObjectId
  - Decimal128
  - Regular Expression
  - Code
- **Supports all JSON data types plus additional ones**
- **Traversable**: Includes field length information
- **Efficient**: Faster to parse and generate

**Comparison Table:**

| Feature | JSON | BSON |
|---------|------|------|
| Format  | Text | Binary |
| Human-readable | Yes | No |
| File Size | Larger | Smaller |
| Data Types | Limited | Extensive |
| Traversable | No | Yes |
| Encoding/Decoding | Slower | Faster |

---

## 4. MongoDB Compass & Atlas Setup

### MongoDB Atlas (Cloud)
MongoDB Atlas is a fully-managed cloud database service.

**Setup Steps:**
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create an account (free tier available)
3. Create a new cluster (M0 free tier gives 512MB storage)
4. Set up database user credentials
5. Whitelist your IP address
6. Get connection string

**Connection String Format:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
```

### MongoDB Compass (GUI)
MongoDB Compass is a graphical interface for MongoDB operations.

**Features:**
- **Visual query builder**: Build queries without writing code
- **Data visualization**: View and edit documents
- **Schema analysis**: Understand your data structure
- **Performance monitoring**: View query performance
- **Index management**: Create and manage indexes
- **Aggregation pipeline builder**: Build complex aggregations visually

**Installation:**
1. Download from MongoDB website
2. Install for your OS (Windows/Mac/Linux)
3. Connect using connection string or localhost

### Local MongoDB Setup
**Installation:**
- **Windows**: Download MSI installer from MongoDB website
- **Mac**: `brew install mongodb-community`
- **Linux**: Use package manager or download tgz

**Start MongoDB:**
```bash
# Linux/Mac
sudo systemctl start mongod

# Windows (as administrator)
net start MongoDB
```

---

## 5. CRUD Operations in MongoDB

### Create (Insert)

#### **insertOne()**
Inserts a single document into a collection.

**Syntax:**
```javascript
db.collection.insertOne(document, options)
```

**Example:**
```javascript
db.users.insertOne({
  name: "Alice Johnson",
  email: "alice@example.com",
  age: 28,
  joinedDate: new Date(),
  isActive: true
})
```

**Returns:**
```json
{
  "acknowledged": true,
  "insertedId": ObjectId("507f191e810c19729de860ea")
}
```

#### **insertMany()**
Inserts multiple documents into a collection.

**Syntax:**
```javascript
db.collection.insertMany([document1, document2, ...], options)
```

**Example:**
```javascript
db.users.insertMany([
  {
    name: "Bob Smith",
    email: "bob@example.com",
    age: 35
  },
  {
    name: "Carol White",
    email: "carol@example.com",
    age: 42
  }
])
```

**Returns:**
```json
{
  "acknowledged": true,
  "insertedIds": [
    ObjectId("507f191e810c19729de860eb"),
    ObjectId("507f191e810c19729de860ec")
  ]
}
```

---

### Read (Find)

#### **find()**
Retrieves multiple documents from a collection.

**Syntax:**
```javascript
db.collection.find(query, projection)
```

**Examples:**
```javascript
// Find all documents
db.users.find()

// Find with query
db.users.find({ age: { $gt: 25 } })

// Find with projection
db.users.find(
  { age: { $gt: 25 } },
  { name: 1, email: 1, _id: 0 }
)

// Limit and sort
db.users.find()
  .limit(5)
  .sort({ age: -1 })
```

#### **findOne()**
Retrieves a single document matching the query.

**Syntax:**
```javascript
db.collection.findOne(query, projection)
```

**Example:**
```javascript
db.users.findOne(
  { email: "alice@example.com" },
  { name: 1, age: 1 }
)
```

### Query Operators

**Comparison Operators:**

| Operator | Description | Example |
|----------|-------------|---------|
| `$eq` | Equal to | `{ age: { $eq: 30 } }` |
| `$ne` | Not equal | `{ age: { $ne: 30 } }` |
| `$gt` | Greater than | `{ age: { $gt: 25 } }` |
| `$gte` | Greater than or equal | `{ age: { $gte: 25 } }` |
| `$lt` | Less than | `{ age: { $lt: 30 } }` |
| `$lte` | Less than or equal | `{ age: { $lte: 30 } }` |
| `$in` | In array | `{ age: { $in: [25, 30, 35] } }` |
| `$nin` | Not in array | `{ age: { $nin: [25, 30] } }` |

**Logical Operators:**

| Operator | Description | Example |
|----------|-------------|---------|
| `$and` | All conditions true | `{ $and: [{ age: { $gt: 25 } }, { age: { $lt: 40 } }] }` |
| `$or` | At least one condition true | `{ $or: [{ age: 25 }, { age: 35 }] }` |
| `$not` | Negates condition | `{ age: { $not: { $gt: 30 } } }` |
| `$nor` | None of the conditions true | `{ $nor: [{ age: 25 }, { age: 35 }] }` |

**Element Operators:**

| Operator | Description | Example |
|----------|-------------|---------|
| `$exists` | Field exists | `{ email: { $exists: true } }` |
| `$type` | Field type | `{ age: { $type: "number" } }` |

**Array Operators:**

| Operator | Description | Example |
|----------|-------------|---------|
| `$all` | Array contains all elements | `{ hobbies: { $all: ["reading", "coding"] } }` |
| `$size` | Array size | `{ hobbies: { $size: 3 } }` |
| `$elemMatch` | Match array elements | `{ scores: { $elemMatch: { $gt: 80, $lt: 90 } } }` |

---

### Update

#### **updateOne()**
Updates a single document matching the filter.

**Syntax:**
```javascript
db.collection.updateOne(filter, update, options)
```

**Examples:**
```javascript
// Update a field
db.users.updateOne(
  { name: "Alice Johnson" },
  { $set: { age: 29 } }
)

// Add to array
db.users.updateOne(
  { name: "Alice Johnson" },
  { $push: { hobbies: "swimming" } }
)

// Increment value
db.users.updateOne(
  { name: "Alice Johnson" },
  { $inc: { age: 1 } }
)
```

#### **updateMany()**
Updates all documents matching the filter.

**Syntax:**
```javascript
db.collection.updateMany(filter, update, options)
```

**Example:**
```javascript
// Update all users older than 30
db.users.updateMany(
  { age: { $gt: 30 } },
  { $set: { isActive: true } }
)
```

### Update Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `$set` | Set field value | `{ $set: { age: 30 } }` |
| `$unset` | Remove field | `{ $unset: { age: "" } }` |
| `$inc` | Increment value | `{ $inc: { age: 1 } }` |
| `$mul` | Multiply value | `{ $mul: { age: 2 } }` |
| `$rename` | Rename field | `{ $rename: { "name": "fullName" } }` |
| `$push` | Add to array | `{ $push: { hobbies: "coding" } }` |
| `$pull` | Remove from array | `{ $pull: { hobbies: "coding" } }` |
| `$addToSet` | Add if not exists | `{ $addToSet: { hobbies: "reading" } }` |
| `$pop` | Remove first/last | `{ $pop: { hobbies: -1 } }` |

---

### Delete

#### **deleteOne()**
Deletes a single document matching the filter.

**Syntax:**
```javascript
db.collection.deleteOne(filter)
```

**Example:**
```javascript
db.users.deleteOne({ email: "alice@example.com" })
```

**Returns:**
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

#### **deleteMany()**
Deletes all documents matching the filter.

**Syntax:**
```javascript
db.collection.deleteMany(filter)
```

**Examples:**
```javascript
// Delete all inactive users
db.users.deleteMany({ isActive: false })

// Delete all documents (use with caution!)
db.users.deleteMany({})
```

**Returns:**
```json
{
  "acknowledged": true,
  "deletedCount": 5
}
```

---

## Complete CRUD Example

```javascript
// Connect to database
use myDatabase

// CREATE - Insert documents
db.employees.insertMany([
  {
    name: "John Doe",
    department: "Engineering",
    salary: 75000,
    skills: ["JavaScript", "Python", "MongoDB"],
    hireDate: new Date("2020-01-15")
  },
  {
    name: "Jane Smith",
    department: "Marketing",
    salary: 65000,
    skills: ["Social Media", "Content Writing"],
    hireDate: new Date("2021-03-20")
  },
  {
    name: "Bob Johnson",
    department: "Engineering",
    salary: 85000,
    skills: ["Java", "Spring", "SQL"],
    hireDate: new Date("2019-06-10")
  }
])

// READ - Find all engineers
db.employees.find({ department: "Engineering" })

// READ - Find with query operators
db.employees.find({
  salary: { $gt: 70000 },
  skills: { $in: ["JavaScript", "Python"] }
})

// UPDATE - Give all engineers a 10% raise
db.employees.updateMany(
  { department: "Engineering" },
  { $mul: { salary: 1.1 } }
)

// UPDATE - Add skill to a specific employee
db.employees.updateOne(
  { name: "John Doe" },
  { $push: { skills: "Docker" } }
)

// DELETE - Remove an employee
db.employees.deleteOne({ name: "Jane Smith" })

// DELETE - Remove all employees from a department
db.employees.deleteMany({ department: "Marketing" })
```

---

## Best Practices

1. **Indexing**: Create indexes for frequently queried fields
2. **Schema Design**: Design schemas based on application access patterns
3. **Validation**: Use schema validation to enforce data structure
4. **Authentication**: Always use authentication in production
5. **Backup**: Regular database backups are essential
6. **Connection Pooling**: Use connection pooling for production applications
7. **Projection**: Always specify fields in queries to reduce network usage
8. **Batch Operations**: Use bulk operations for better performance

---

## Common Errors and Solutions

| Error | Solution |
|-------|----------|
| Duplicate key error | Check for duplicate `_id` or unique index violations |
| Connection timeout | Check network, firewall, and connection string |
| Authentication failed | Verify username and password |
| Write concern errors | Check replica set status and network latency |
| Out of memory | Use projection to reduce data returned |