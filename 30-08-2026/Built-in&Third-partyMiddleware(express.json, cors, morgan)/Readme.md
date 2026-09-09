---

## **What is Middleware Again?**

**Middleware** = Functions that run **between** request and response

```
Request → [MIDDLEWARE] → Route → Response
```

---

## **Types of Middleware** 📂

| Type | Example | Source |
|------|---------|--------|
| **Built-in** | `express.json()` | Comes with Express |
| **Third-party** | `cors`, `morgan` | Need to install |

---

## **1. Built-in Middleware** 📦

### **express.json()** - Parse JSON bodies

```javascript
const express = require('express');
const app = express();

// BEFORE: req.body is undefined
app.use(express.json()); // ✅ Parses JSON automatically!

app.post('/users', (req, res) => {
    console.log(req.body); // Now has data!
    res.json({ received: req.body });
});

app.listen(3000);
```

**Without `express.json()`:**
```javascript
// POST /users with { "name": "Ali" }
// req.body = undefined ❌
```

**With `express.json()`:**
```javascript
// POST /users with { "name": "Ali" }
// req.body = { name: 'Ali' } ✅
```

---

### **express.urlencoded()** - Parse form data

```javascript
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    console.log(req.body); // Parsed form data!
    res.send('Form received!');
});

// HTML form: <form action="/submit" method="POST">
// req.body = { name: 'Ali', email: 'ali@email.com' }
```

---

### **express.static()** - Serve static files

```javascript
// Serve files from 'public' folder
app.use(express.static('public'));

// Now these files are accessible:
// public/style.css → http://localhost:3000/style.css
// public/script.js → http://localhost:3000/script.js
// public/image.png → http://localhost:3000/image.png
```

---

## **2. Third-party Middleware** 📦

### **Installation**
```bash
npm install cors morgan
```

---

### **CORS** - Allow cross-origin requests

**What is CORS?** Blocks requests from different domains (security).

**Without CORS:**
```javascript
// Frontend: http://localhost:3001
// Backend:  http://localhost:3000
// ❌ Browser blocks request!
```

**With CORS:**
```javascript
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors()); // Allow ALL origins

app.get('/data', (req, res) => {
    res.json({ message: 'This works with CORS!' });
});

// Now frontend can access your API! ✅
```

**CORS with options:**
```javascript
// Allow specific origins only
app.use(cors({
    origin: 'http://localhost:3001' // Only this domain
}));

// Allow multiple origins
app.use(cors({
    origin: ['http://localhost:3001', 'https://myapp.com']
}));

// Allow with credentials
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
```

---

### **Morgan** - Logger middleware

```javascript
const morgan = require('morgan');
const express = require('express');
const app = express();

// Logs every request in the console
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.listen(3000);
```

**Output when you visit `/`:**
```
GET / 200 3.456 ms - 6
GET /favicon.ico 404 1.234 ms - 150
```

**Morgan formats:**
```javascript
app.use(morgan('dev'));     // Concise color output
app.use(morgan('combined')); // Apache combined format
app.use(morgan('common'));   // Apache common format
app.use(morgan('tiny'));     // Minimal output
app.use(morgan(':method :url :status :response-time ms'));
```

---

## **Complete Example** 🚀

```javascript
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// ----- MIDDLEWARE -----

// 1. Logger (third-party)
app.use(morgan('dev'));

// 2. CORS (third-party)
app.use(cors());

// 3. JSON parser (built-in)
app.use(express.json());

// 4. URL-encoded parser (built-in)
app.use(express.urlencoded({ extended: true }));

// 5. Static files (built-in)
app.use(express.static('public'));

// ----- ROUTES -----

// GET
app.get('/', (req, res) => {
    res.send('Home Page');
});

// POST with JSON
app.post('/api/users', (req, res) => {
    console.log('📝 Data received:', req.body);
    res.json({ 
        message: 'User created!', 
        user: req.body 
    });
});

// POST with form data
app.post('/submit', (req, res) => {
    res.json({ 
        message: 'Form submitted!', 
        data: req.body 
    });
});

// ----- START -----
app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
    console.log('\n📋 Test these URLs:');
    console.log('  GET  /');
    console.log('  POST /api/users');
    console.log('  POST /submit');
});
```

---

## **Testing the Middleware** 🧪

### **1. Test JSON parser**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ali","age":25}'
```

### **2. Test form parser**
```bash
curl -X POST http://localhost:3000/submit \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Ali&email=ali@email.com"
```

### **3. See Morgan logs**
```
POST /api/users 200 2.345 ms - 42
POST /submit 200 1.234 ms - 35
```

---

## **Middleware Order Matters!** ⚠️

```javascript
// ✅ CORRECT ORDER
app.use(morgan('dev'));        // 1. Log everything
app.use(cors());               // 2. Allow CORS
app.use(express.json());       // 3. Parse JSON
app.use(express.urlencoded({ extended: true })); // 4. Parse forms
app.use(express.static('public')); // 5. Serve static files
app.post('/api', (req, res) => { // 6. Route
    res.json(req.body);
});

// ❌ WRONG ORDER
app.post('/api', (req, res) => { // 1. Route runs first
    res.json(req.body); // req.body is undefined!
});
app.use(express.json());       // 2. Never reaches here!
```

---

## **Custom Logger vs Morgan** 📝

### **Custom Logger (you built before)**
```javascript
app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    next();
});
```

### **Morgan (does more!)**
```javascript
const morgan = require('morgan');
app.use(morgan('dev'));
// Shows: method, URL, status code, response time, size
```

---

## **Common Middleware Packages** 📦

| Package | Purpose |
|---------|---------|
| `express.json()` | Parse JSON bodies |
| `express.urlencoded()` | Parse form data |
| `express.static()` | Serve static files |
| `cors` | Enable CORS |
| `morgan` | Logging |
| `helmet` | Security headers |
| `compression` | Compress responses |
| `rate-limit` | Rate limiting |

---

## **Quick Reference** 📋

```javascript
// BUILT-IN
app.use(express.json());                          // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse forms
app.use(express.static('public'));                // Static files

// THIRD-PARTY (need to install)
const cors = require('cors');
app.use(cors());                                   // Allow CORS

const morgan = require('morgan');
app.use(morgan('dev'));                            // Logging

const helmet = require('helmet');
app.use(helmet());                                 // Security

const compression = require('compression');
app.use(compression());                            // Compress
```

---

## **Complete Working Example** 💪

```javascript
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(morgan('dev'));              // Logging
app.use(cors());                     // CORS
app.use(express.json());             // JSON parser
app.use(express.urlencoded({ extended: true })); // Form parser
app.use(express.static('public'));   // Static files

// Routes
app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'Ali' },
        { id: 2, name: 'Sara' }
    ]);
});

app.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name) {
        return res.status(400).json({ error: 'Name required' });
    }
    res.status(201).json({ 
        message: 'User created!', 
        user: { id: Date.now(), ...user }
    });
});

app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
    console.log('\n📋 Try:');
    console.log('  GET  /api/users');
    console.log('  POST /api/users (with JSON)');
});
```

---

## **Summary** 📝

| Middleware | Type | Purpose |
|------------|------|---------|
| `express.json()` | Built-in | Parse JSON bodies |
| `express.urlencoded()` | Built-in | Parse form data |
| `express.static()` | Built-in | Serve static files |
| `cors` | Third-party | Allow cross-origin requests |
| `morgan` | Third-party | Log requests |

---