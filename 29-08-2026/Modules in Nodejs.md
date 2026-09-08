## **What are Modules?** 📚

**Modules** are like **building blocks** or **Lego pieces** - they let you split your code into separate files and reuse them.

### **Without Modules (BAD):**
```javascript
// All code in ONE file - MESSY! 😱
// server.js (5000 lines!)

// Database code
// User code
// Product code
// Auth code
// Email code
// EVERYTHING HERE!!!
```

### **With Modules (GOOD):**
```
my-app/
├── server.js          # Main file
├── database.js        # Database functions
├── user.js           # User functions
├── product.js        # Product functions
├── auth.js           # Authentication
└── email.js          # Email functions
```

---

## **The Two Module Systems in Node.js** 📦

Node.js has **TWO** ways to handle modules:

| Feature | CommonJS | ES Modules |
|---------|----------|------------|
| **Syntax** | `require()` / `module.exports` | `import` / `export` |
| **Default in Node.js** | ✅ Yes (older, established) | ✅ Yes (newer, modern) |
| **Browser compatible** | ❌ No | ✅ Yes |
| **File extension** | `.js` (default) | `.mjs` or `.js` with `"type": "module"` |
| **Loading** | Synchronous | Asynchronous |
| **Created** | 2009 | 2015 |

---

## **1. CommonJS (The Traditional Way)** 📜

### **Exporting from a Module:**

**user.js** (CommonJS):
```javascript
// Option 1: Export single function
function getUser() {
    return { name: 'Alice', age: 25 };
}
module.exports = getUser;

// Option 2: Export multiple functions
const getUser = () => ({ name: 'Alice', age: 25 });
const getUsers = () => ([{ name: 'Alice' }, { name: 'Bob' }]);
const updateUser = (id, data) => { /* update user */ };

module.exports = {
    getUser,
    getUsers,
    updateUser
};

// Option 3: Export one by one
exports.getUser = () => ({ name: 'Alice', age: 25 });
exports.getUsers = () => ([{ name: 'Alice' }, { name: 'Bob' }]);
exports.updateUser = (id, data) => { /* update user */ };
```

### **Importing into Another File:**

**server.js** (CommonJS):
```javascript
// Import the whole module
const userModule = require('./user');
const user = userModule.getUser();
console.log(user); // { name: 'Alice', age: 25 }

// Or destructure
const { getUser, getUsers } = require('./user');
const user = getUser();
const users = getUsers();

// Or import a single export
const getUser = require('./user'); // if module.exports = getUser
```

---

## **2. ES Modules (The Modern Way)** ✨

### **Exporting from a Module:**

**user.mjs** or **user.js** (with `"type": "module"`):
```javascript
// Option 1: Named exports
export function getUser() {
    return { name: 'Alice', age: 25 };
}

export function getUsers() {
    return [{ name: 'Alice' }, { name: 'Bob' }];
}

export function updateUser(id, data) {
    // update user
}

// Option 2: Export as you declare
export const getUser = () => ({ name: 'Alice', age: 25 });
export const getUsers = () => ([{ name: 'Alice' }, { name: 'Bob' }]);

// Option 3: Default export (only ONE per file)
const getUser = () => ({ name: 'Alice', age: 25 });
export default getUser;

// Option 4: Export all at once
const getUser = () => ({ name: 'Alice', age: 25 });
const getUsers = () => ([{ name: 'Alice' }, { name: 'Bob' }]);
export { getUser, getUsers };
```

### **Importing into Another File:**

**server.mjs** (ES Modules):
```javascript
// Import named exports
import { getUser, getUsers } from './user.mjs';
const user = getUser();
console.log(user);

// Import default export
import getUser from './user.mjs';
const user = getUser();

// Import everything as an object
import * as userModule from './user.mjs';
const user = userModule.getUser();

// Rename imports
import { getUser as fetchUser } from './user.mjs';
const user = fetchUser();
```

---

## **Visual Comparison** 👀

### **CommonJS:**
```javascript
// ---------- math.js ----------
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
module.exports = { add, subtract };

// ---------- app.js ----------
const math = require('./math');
console.log(math.add(5, 3)); // 8
```

### **ES Modules:**
```javascript
// ---------- math.js ----------
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// ---------- app.js ----------
import { add, subtract } from './math.js';
console.log(add(5, 3)); // 8
```

---

## **How to Use ES Modules in Node.js** 🛠️

### **Method 1: Use `.mjs` Extension**
```bash
# File: user.mjs
export const name = 'Alice';

# File: app.mjs
import { name } from './user.mjs';
console.log(name);
```

```bash
node app.mjs  # Works!
```

### **Method 2: Set `"type": "module"` in package.json**
```json
{
    "name": "my-app",
    "type": "module",
    "version": "1.0.0"
}
```
```javascript
// Now .js files work with ES Modules!
// user.js
export const name = 'Alice';

// app.js
import { name } from './user.js';
```

---

## **Real-World Example: Building a Simple API** 🌐

### **CommonJS Version:**

**config.js**:
```javascript
module.exports = {
    port: 3000,
    dbUrl: 'mongodb://localhost:27017',
    secretKey: 'my-secret-key'
};
```

**database.js**:
```javascript
const config = require('./config');

function connectDB() {
    console.log(`Connecting to ${config.dbUrl}`);
    // Connection logic
}

function disconnectDB() {
    console.log('Disconnected from DB');
}

module.exports = { connectDB, disconnectDB };
```

**server.js**:
```javascript
const http = require('http'); // Built-in module
const config = require('./config');
const db = require('./database');

const server = http.createServer((req, res) => {
    db.connectDB();
    res.end('Hello!');
});

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
```

### **ES Modules Version:**

**config.js**:
```javascript
export const config = {
    port: 3000,
    dbUrl: 'mongodb://localhost:27017',
    secretKey: 'my-secret-key'
};
```

**database.js**:
```javascript
import { config } from './config.js';

export function connectDB() {
    console.log(`Connecting to ${config.dbUrl}`);
    // Connection logic
}

export function disconnectDB() {
    console.log('Disconnected from DB');
}
```

**server.js**:
```javascript
import http from 'http'; // Built-in module
import { config } from './config.js';
import { connectDB } from './database.js';

const server = http.createServer((req, res) => {
    connectDB();
    res.end('Hello!');
});

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
```

---

## **Important Differences** ⚠️

### **1. File Extensions**

```javascript
// CommonJS
require('./file');     // No extension needed (assumes .js)
require('./file.js'); // Works

// ES Modules
import from './file';      // ❌ ERROR! Must include extension
import from './file.js';   // ✅ Works
```

### **2. `__dirname` and `__filename`**

```javascript
// CommonJS (these exist!)
console.log(__dirname);  // /path/to/folder
console.log(__filename); // /path/to/file.js

// ES Modules (need to create them!)
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

### **3. Import/Export Timing**

```javascript
// CommonJS - Synchronous (loads immediately)
const fs = require('fs'); // Loads NOW

// ES Modules - Asynchronous (loads differently)
import fs from 'fs'; // Loads at compile time
```

---

## **When to Use Which?** 🤔

### **Use CommonJS when:**
- Working with older Node.js projects
- Using libraries that haven't updated
- Writing server-side scripts
- You need `__dirname` and `__filename`

### **Use ES Modules when:**
- Starting a new project (modern)
- Writing code that works in browsers too
- Using newer Node.js versions (v14+)
- You want cleaner, more modern syntax

---

## **Real-World: Combining Both Systems** 🔄

### **ES Module importing CommonJS:**
```javascript
// database.js (CommonJS)
module.exports = {
    connect: () => console.log('Connected!')
};

// app.mjs (ES Module)
import db from './database.js';  // Works!
// Or
import { connect } from './database.js'; // If exported as object
```

### **CommonJS importing ES Module:**
```javascript
// user.mjs (ES Module)
export const name = 'Alice';

// app.js (CommonJS)
const { name } = await import('./user.mjs'); // Need dynamic import
console.log(name);
```

---

## **Dynamic Imports** 🚀

### **CommonJS (Old Way):**
```javascript
// Always loads at the top
const fs = require('fs');

// Conditional loading
if (condition) {
    const module = require('./some-module');
}
```

### **ES Modules (New Way):**
```javascript
// Dynamic import - load only when needed!
const module = await import('./some-module.js');
console.log(module.default);

// Conditional loading
if (condition) {
    const { getUser } = await import('./user.js');
    const user = getUser();
}
```

---

## **Common Pitfalls** 🚨

### **1. Mixing Systems Incorrectly**

```javascript
// ❌ BAD - Can't use require in ES Module (without special setup)
import { readFile } from 'fs';
const express = require('express'); // ERROR!

// ✅ GOOD - Use import for everything
import express from 'express';
```

### **2. Forgetting File Extensions**

```javascript
// ❌ ERROR - Missing extension
import { getUser } from './user';

// ✅ Works - With extension
import { getUser } from './user.js';
```

### **3. Circular Dependencies**

```javascript
// a.js
import { b } from './b.js';
export const a = 'A';

// b.js
import { a } from './a.js'; // ⚠️ Circular!
export const b = 'B';
// Avoid this pattern!
```

---

## **Exercise: Convert a CommonJS Project to ES Modules** 💪

### **Step 1: CommonJS Version**

**package.json**:
```json
{
    "name": "my-app",
    "version": "1.0.0"
}
```

**math.js**:
```javascript
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

module.exports = { add, subtract, multiply, divide };
```

**app.js**:
```javascript
const math = require('./math');
console.log(math.add(5, 3));
console.log(math.subtract(10, 4));
console.log(math.multiply(7, 6));
```

### **Step 2: Convert to ES Modules**

**package.json**:
```json
{
    "name": "my-app",
    "version": "1.0.0",
    "type": "module"
}
```

**math.js**:
```javascript
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a * b; }
export function divide(a, b) { return a / b; }
```

**app.js**:
```javascript
import { add, subtract, multiply, divide } from './math.js';
console.log(add(5, 3));
console.log(subtract(10, 4));
console.log(multiply(7, 6));
```

**Run:**
```bash
node app.js
```

---

## **Quick Reference Card** 📋

### **CommonJS**
```javascript
// Export
module.exports = { ... };
exports.function = () => {};

// Import
const module = require('./module');
const { func } = require('./module');
```

### **ES Modules**
```javascript
// Export
export { ... };
export default ...;
export const func = () => {};

// Import
import { func } from './module.js';
import defaultExport from './module.js';
import * as module from './module.js';
```

---

## **Your Turn: Module Exercises** 🎯

### **Exercise 1: Create a Calculator Module (CommonJS)**
Create these files:
1. `calculator.js` - Export add, subtract, multiply, divide
2. `app.js` - Import and use the calculator

### **Exercise 2: Create a User Module (ES Modules)**
1. `user.js` - Export getUser, createUser, updateUser
2. `app.js` - Import and use the user functions

### **Exercise 3: Mix Both Systems**
1. Create one module in CommonJS
2. Create another in ES Modules
3. Import both into a main file

---

## **Summary** 📝

| Aspect | CommonJS | ES Modules |
|--------|----------|------------|
| **Syntax** | `require`/`module.exports` | `import`/`export` |
| **Default** | Node.js | Modern/New Projects |
| **File Ext** | `.js` | `.mjs` or `"type": "module"` |
| **Loading** | Synchronous | Asynchronous |
| **Browser** | ❌ | ✅ |
| **`__dirname`** | ✅ Built-in | Need to create |
| **Dynamic** | Conditional require | Dynamic import() |

---

