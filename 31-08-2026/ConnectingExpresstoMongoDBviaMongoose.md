    # Connecting Express to MongoDB via Mongoose

## What is Mongoose?

**Mongoose** = a tool that makes it easy for Node.js/Express to talk to MongoDB.

Without Mongoose: you write raw MongoDB queries (messy).
With Mongoose: you work with **models** and **schemas** (clean & structured).

Think of it like:
- **MongoDB** = the warehouse 🏭
- **Mongoose** = the forklift driver 🚜
- **Express** = the front desk 🏢

---

## Step-by-Step Setup

### Step 1 — Install Mongoose

In your project folder:

```bash
npm install mongoose
```

---

### Step 2 — Get Your Connection String

From MongoDB Atlas it looks like this:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<databaseName>?retryWrites=true&w=majority
```

**Example (filled in):**
```
mongodb+srv://admin:myPass123@cluster0.ab12c.mongodb.net/shopDB?retryWrites=true&w=majority
```

⚠️ **Important parts:**
- `admin:myPass123` → your DB user & password
- `cluster0.ab12c.mongodb.net` → your cluster
- `/shopDB` → your **database name** (this is where `employees` collection lives)

> 💡 You said you already created a collection called `employees` — that collection lives inside a **database**. Put that database's name in the URL (e.g., `/companyDB`).

---

### Step 3 — Store the Connection String in `.env`

Never hard-code secrets. Create a `.env` file in your project root:

```env
MONGO_URI=mongodb+srv://admin:myPass123@cluster0.ab12c.mongodb.net/shopDB?retryWrites=true&w=majority
PORT=3000
```

Then install dotenv:

```bash
npm install dotenv
```

---

### Step 4 — Create a `db.js` File (Connection Logic)

**`db.js`**

```js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // stop the app if DB fails
  }
};

module.exports = connectDB;
```

**What this does:**
- `mongoose.connect()` → opens the connection
- `try/catch` → handles errors
- `process.exit(1)` → kills the app if DB fails (better than running half-broken)

---

### Step 5 — Connect it in Your Main File

**`server.js`**

```js
require("dotenv").config();          // load .env variables
const express = require("express");
const connectDB = require("./db");

const app = express();
app.use(express.json());             // parse JSON bodies

// 🔌 Connect to MongoDB FIRST
connectDB();

// Then start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

**Order matters:**
1. Load env vars
2. Connect to DB
3. Start server

---

### Step 6 — Create a Model for `employees`

Mongoose needs a **schema** (shape of data) and a **model** (the actual tool to query).

**`models/Employee.js`**

```js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
      type: String,
    },
    salary: {
      type: Number,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports = mongoose.model("Employee", employeeSchema);
```

⚠️ **Note:** `mongoose.model("Employee", schema)` → MongoDB will look for the collection named **`employees`** (Mongoose auto-pluralizes & lowercases).

So `"Employee"` → `employees` ✅ — matches your collection!

---

### Step 7 — Use the Model in a Route

**`server.js`** (updated)

```js
require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const Employee = require("./models/Employee");

const app = express();
app.use(express.json());

connectDB();

// GET all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new employee
app.post("/employees", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
```

---

### Step 8 — Test It

Start the server:
```bash
node server.js
```

You should see:
```
✅ MongoDB connected
🚀 Server on port 3000
```

Test with **Postman** or **curl**:

**Get all employees:**
```http
GET http://localhost:3000/employees
```

**Add an employee:**
```http
POST http://localhost:3000/employees
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@company.com",
  "position": "Developer",
  "salary": 70000
}
```

✅ Response:
```http
201 Created
{
  "_id": "6512ab...",
  "name": "Alice",
  "email": "alice@company.com",
  "position": "Developer",
  "salary": 70000,
  "createdAt": "2024-09-27T10:00:00.000Z",
  "updatedAt": "2024-09-27T10:00:00.000Z"
}
```

> 💡 MongoDB uses `_id` (not `id`). That's normal.

---

## File Structure So Far

```
my-app/
├── models/
│   └── Employee.js
├── db.js
├── server.js
├── .env
└── package.json
```

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `MongooseServerSelectionError` | IP not whitelisted | Add your IP in MongoDB Atlas → Network Access |
| `Authentication failed` | Wrong username/password | Check `.env` |
| `Cannot read property 'connect'` | mongoose not installed | `npm install mongoose` |
| `MONGO_URI is undefined` | `.env` not loaded | Add `require("dotenv").config()` at top |
| Data not showing | Wrong collection name | Check Mongoose pluralization |

---

## Key Takeaways

1. ✅ Install `mongoose` + `dotenv`
2. ✅ Store connection string in `.env`
3. ✅ Use `mongoose.connect()` inside a `connectDB()` function
4. ✅ Create a **schema** → **model** for each collection
5. ✅ `mongoose.model("Employee", schema)` → maps to `employees` collection
6. ✅ Use `async/await` with `try/catch` in routes
7. ✅ Connect to DB **before** starting the server

---

## Memory Trick

> **dotenv → db.js → model → route → test**
> *Load secrets → Connect → Define shape → Use it → Verify*

---

//Correct order to setup this connection:
1. Get connection string from MongoDB Atlas
2. Install packages (mongoose, dotenv, express)
3. Create .env file → paste MONGO_URI
4. Create db.js → connection logic
5. Create model (models/Employee.js)
6. Create server.js → connect DB + start server
7. Test it