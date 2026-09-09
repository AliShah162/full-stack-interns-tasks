// Import the Express framework
const express = require('express');

// Create an Express application instance
const app = express();

// ---------- LOGGER MIDDLEWARE ----------
// This runs for EVERY request before reaching the routes
// app.use() = runs on all routes
app.use((req, res, next) => {
    // req = request object (contains info about the incoming request)
    // res = response object (used to send response)
    // next = function that passes control to the next middleware/route
    
    // req.method = HTTP method (GET, POST, PUT, DELETE, etc.)
    // req.url = the URL path requested (/, /about, /api/users, etc.)
    // new Date().toISOString() = current date/time in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
    
    // Log the request details to the console
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    //like if i go to /about, the middleware will tell me that i visited, /about and used GET method
    
    // next() = IMPORTANT! This tells Express to continue to the next middleware or route
    // Without this, the request would STUCK here forever!
    next();
});

// ---------- ROUTE HANDLERS ----------

// GET / - Home page route
// When someone visits http://localhost:3000/
app.get('/', (req, res) => {
    // res.send() = sends a response to the client
    // It automatically sets Content-Type to text/html
    res.send('Home Page');
});

// GET /about - About page route
// When someone visits http://localhost:3000/about
app.get('/about', (req, res) => {
    res.send('About Page');
});

// ---------- START SERVER ----------
// app.listen() = starts the server and listens for incoming requests
// 3000 = the port number (you can change this to any number)
app.listen(3000, () => {
    // This callback runs once when the server starts successfully
    console.log('🚀 Server running on http://localhost:3000');
});