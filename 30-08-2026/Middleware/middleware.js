const express = require('express');
const app = express();

// MIDDLEWARE: Logs every request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // ← IMPORTANT! Move to next function ← Without this, request STOPS here!
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000);

// Types of Middleware 📂
// 1. Application-Level (Runs on all routes)
app.use((req, res, next) => {
    console.log('Runs on EVERY route');
    next();
});

// 2. Route-Level (Runs on specific routes)
app.use('/api', (req, res, next) => {
    console.log('Runs only on /api routes');
    next();
});


// 3. Error-Handling (Takes 4 parameters)

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something broke!');
});


// Middleware Flow 🔄

app.use((req, res, next) => {
    console.log('1. First middleware');
    next();
});

app.use((req, res, next) => {
    console.log('2. Second middleware');
    next();
});

app.get('/', (req, res) => {
    console.log('3. Route handler');
    res.send('Hello!');
});

// When you visit /
// Output:
// 1. First middleware
// 2. Second middleware
// 3. Route handler


// Real-World Example 🌐
const express = require('express');
const app2 = express();

// 1. Logger (runs first)
app2.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    next();
});

// 2. JSON Parser (runs second)
app2.use(express.json());

// 3. Auth Check (runs third - only for /api)
app2.use('/api', (req, res, next) => {
    if (req.headers.token === 'secret') {
        next(); // ✅ Good token
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// 4. Routes (run after middleware)
app2.get('/', (req, res) => {
    res.send('Home');
});

app2.get('/api/data', (req, res) => {
    res.json({ data: 'Secret data' });
});

// 5. Error Handler (runs last)
app2.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something broke!' });
});

app2.listen(3000);

// Middleware Order Matters! ⚠️
// ✅ CORRECT order
app.use(express.json());      // 1. Parse JSON
app.use(express.urlencoded({ extended: true })); // 2. Parse forms
app.use(authMiddleware);      // 3. Check auth
app.get('/api', handler);     // 4. Handle route

// ❌ WRONG order
app.get('/api', handler);     // 1. Handler runs first
app.use(express.json());      // 2. Never reaches here!

