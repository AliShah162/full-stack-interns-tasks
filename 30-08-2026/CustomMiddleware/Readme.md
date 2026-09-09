---

## **What is Custom Middleware?**

**Custom middleware** = Functions YOU write that run between request and response

```
Request → [YOUR MIDDLEWARE] → Route → Response
```

---

## **The Basic Structure** 🏗️

```javascript
const express = require('express');
const app = express();

// Custom middleware
app.use((req, res, next) => {
    console.log('This is custom middleware!');
    next(); // ← MUST call next() to continue
});

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.listen(3000);
```

**Every request will trigger your middleware!**

---

## **Simple Examples** 📝

### **1. Logger Middleware**
```javascript
app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    console.log(`⏰ ${new Date().toISOString()}`);
    next();
});
```

### **2. Timer Middleware**
```javascript
app.use((req, res, next) => {
    req.startTime = Date.now(); // Add custom data to req
    next();
});

app.get('/', (req, res) => {
    const duration = Date.now() - req.startTime;
    res.send(`Response time: ${duration}ms`);
});
```

### **3. Authentication Middleware**
```javascript
app.use((req, res, next) => {
    const token = req.headers.authorization;
    
    if (token === 'secret123') {
        req.user = { id: 1, name: 'Ali' }; // Add user to req
        next(); // ✅ Allow
    } else {
        res.status(401).json({ error: 'Unauthorized' }); // ❌ Block
    }
});

app.get('/profile', (req, res) => {
    res.json({ user: req.user });
});
```

---

## **Types of Custom Middleware** 📂

### **1. Application-Level (runs on all routes)**
```javascript
app.use((req, res, next) => {
    console.log('Runs on EVERY route');
    next();
});
```

### **2. Route-Level (runs on specific routes)**
```javascript
// Only runs on /api routes
app.use('/api', (req, res, next) => {
    console.log('Runs only on /api routes');
    next();
});

// Only runs on this specific route
app.get('/admin', (req, res, next) => {
    console.log('Runs only on /admin');
    next();
}, (req, res) => {
    res.send('Admin page');
});
```

### **3. Error-Handling (4 parameters)**
```javascript
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: 'Something went wrong!' });
});
```

---

## **Real-World Examples** 🌐

### **Example 1: Request Logger with Details**
```javascript
// logger.js
const logger = (req, res, next) => {
    const start = Date.now();
    
    // Log when request arrives
    console.log(`➡️ ${req.method} ${req.url} started`);
    
    // Override res.json to log when done
    const originalJson = res.json;
    res.json = function(data) {
        const duration = Date.now() - start;
        console.log(`✅ ${req.method} ${req.url} completed in ${duration}ms`);
        originalJson.call(this, data);
    };
    
    next();
};

app.use(logger);
```

### **Example 2: Authentication Check**
```javascript
// auth.js
const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    // Simple token check (in real app, verify JWT)
    if (token === 'Bearer secret123') {
        req.user = { id: 1, name: 'Ali', role: 'admin' };
        next();
    } else {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Use on protected routes
app.get('/profile', auth, (req, res) => {
    res.json({ user: req.user });
});

app.get('/admin', auth, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin only' });
    }
    res.json({ message: 'Admin panel' });
});
```

### **Example 3: Rate Limiter**
```javascript
// rate-limiter.js
const rateLimit = new Map();

const limiter = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    
    if (!rateLimit.has(ip)) {
        rateLimit.set(ip, { count: 1, firstRequest: now });
        return next();
    }
    
    const data = rateLimit.get(ip);
    const timeWindow = 60000; // 1 minute
    
    if (now - data.firstRequest > timeWindow) {
        // Reset after 1 minute
        rateLimit.set(ip, { count: 1, firstRequest: now });
        return next();
    }
    
    if (data.count >= 10) {
        return res.status(429).json({ error: 'Too many requests' });
    }
    
    data.count++;
    next();
};

app.use(limiter);
```

### **Example 4: Input Validator**
```javascript
// validator.js
const validateUser = (req, res, next) => {
    const { name, email, age } = req.body;
    const errors = [];
    
    if (!name || name.length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    
    if (!email || !email.includes('@')) {
        errors.push('Valid email required');
    }
    
    if (age && (age < 18 || age > 100)) {
        errors.push('Age must be between 18 and 100');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    next();
};

app.post('/users', validateUser, (req, res) => {
    // Only runs if validation passes
    res.json({ message: 'User created!', data: req.body });
});
```

---

## **Complete Example** 🚀

```javascript
const express = require('express');
const app = express();

// ----- CUSTOM MIDDLEWARE -----

// 1. Logger
app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
});

// 2. Add timestamp to every request
app.use((req, res, next) => {
    req.timestamp = new Date().toISOString();
    next();
});

// 3. Admin check (route-level)
const isAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === 'admin123') {
        req.isAdmin = true;
        next();
    } else {
        res.status(403).json({ error: 'Admin access required' });
    }
};

// 4. Log response time
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`⏱️ ${req.method} ${req.url} - ${duration}ms`);
    });
    next();
});

// ----- ROUTES -----

app.get('/', (req, res) => {
    res.json({
        message: 'Home Page',
        timestamp: req.timestamp
    });
});

app.get('/admin', isAdmin, (req, res) => {
    res.json({
        message: 'Admin Panel',
        isAdmin: req.isAdmin
    });
});

app.get('/profile', (req, res) => {
    res.json({
        message: 'Profile Page',
        timestamp: req.timestamp
    });
});

// ----- ERROR HANDLER -----
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
    console.log('\n📋 Try:');
    console.log('  GET  /');
    console.log('  GET  /profile');
    console.log('  GET  /admin (with header: authorization: admin123)');
});
```

---

## **Middleware Chains** 🔗

```javascript
// Multiple middleware in a chain
app.get('/user', 
    (req, res, next) => {
        console.log('1. First middleware');
        next();
    },
    (req, res, next) => {
        console.log('2. Second middleware');
        next();
    },
    (req, res) => {
        console.log('3. Route handler');
        res.send('User page');
    }
);

// Output:
// 1. First middleware
// 2. Second middleware
// 3. Route handler
```

---

## **The `next()` Function** 🔑

```javascript
app.use((req, res, next) => {
    console.log('1. Doing something');
    next(); // ← Continue to next middleware/route
});

app.use((req, res, next) => {
    console.log('2. Doing something else');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello');
});

// ⚠️ If you don't call next(), request STOPS here!
app.use((req, res, next) => {
    console.log('This runs');
    // next() is missing! ❌
});

app.get('/', (req, res) => {
    res.send('Never reaches here'); // ❌ Will never run
});
```

---

## **When to Use Custom Middleware** 🎯

| Use Case | Example |
|----------|---------|
| **Logging** | Log all requests |
| **Authentication** | Check user is logged in |
| **Authorization** | Check user permissions |
| **Validation** | Validate input data |
| **Rate Limiting** | Prevent abuse |
| **Caching** | Cache responses |
| **Compression** | Compress responses |
| **Headers** | Add custom headers |

---

## **Organizing Middleware** 📂

```
my-app/
├── server.js
├── middleware/
│   ├── logger.js
│   ├── auth.js
│   ├── validator.js
│   └── errorHandler.js
```

**middleware/logger.js:**
```javascript
const logger = (req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    next();
};

module.exports = logger;
```

**middleware/auth.js:**
```javascript
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        req.user = { id: 1, name: 'Ali' };
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = auth;
```

**server.js:**
```javascript
const express = require('express');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');

const app = express();

app.use(logger);
app.use(auth);

app.get('/', (req, res) => {
    res.json({ user: req.user });
});

app.listen(3000);
```

---

## **Quick Reference** 📋

```javascript
// Basic middleware
app.use((req, res, next) => {
    // Do something
    next();
});

// Route-specific
app.use('/api', (req, res, next) => {
    // Only for /api routes
    next();
});

// Error middleware (4 parameters)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Error!');
});

// Chain middleware
app.get('/route', 
    middleware1,
    middleware2,
    (req, res) => {
        res.send('Hello');
    }
);
```

---

## **Summary** 📝

| Concept | Explanation |
|---------|-------------|
| **What** | Functions YOU write |
| **When** | Between request and response |
| **Why** | Logging, auth, validation, etc. |
| **How** | `app.use()` or route-specific |
| **Key** | Must call `next()` to continue |

---
