## **1. What is Node.js?**
- **JavaScript runtime** built on Chrome's V8 engine
- Allows JavaScript to run **outside the browser**
- **Event-driven, non-blocking I/O** model
- Uses **CommonJS** modules by default

---

## **2. Setup Your Environment**

### **Check if Node is installed:**
```bash
node -v    # Should show v18+ or v20+
npm -v     # Should show v9+
```

### **Not installed?** Download from [nodejs.org](https://nodejs.org)

---

## **3. Your First Node.js File**

Create a file called `hello.js`:

```javascript
// hello.js
console.log("Hello, Node.js!");

// Variables work just like browser JS
const name = "Node Learner";
let age = 25;
console.log(`I'm ${name}, learning ${age} days old!`);
```

**Run it:**
```bash
node hello.js
```

Output:
```
Hello, Node.js!
I'm Node Learner, learning 25 days old!
```

---

## **4. The Global Object**

In browsers, you have `window`. In Node.js, you have `global`:

```javascript
// global.js
console.log(global);  // See all global objects

// Some useful globals:
console.log(__dirname);  // Current folder path
console.log(__filename); // Current file path

// setTimeout works the same
setTimeout(() => {
  console.log("2 seconds passed!");
}, 2000);

// process - gives info about the running process
console.log(process.argv);  // Command line arguments
console.log(process.env);   // Environment variables
```

**Run:**
```bash
node global.js
```

---

## **5. Core Modules (Built-in)**

Node comes with modules you can use without installing anything:

### **File System (fs)**
```javascript
// fs-example.js
const fs = require('fs');

// Reading a file (async)
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('File content:', data);
});

// Writing a file
fs.writeFile('output.txt', 'Hello from Node!', (err) => {
  if (err) throw err;
  console.log('File saved!');
});

// Sync version (blocks execution - use sparingly!)
const content = fs.readFileSync('example.txt', 'utf8');
console.log('Sync read:', content);
```

### **Path Module**
```javascript
// path-example.js
const path = require('path');

const filePath = '/users/john/documents/file.txt';

console.log(path.basename(filePath));     // file.txt
console.log(path.dirname(filePath));      // /users/john/documents
console.log(path.extname(filePath));      // .txt
console.log(path.parse(filePath));        // Full object

// Join paths (cross-platform!)
const fullPath = path.join('users', 'john', 'docs', 'file.txt');
console.log(fullPath); // users/john/docs/file.txt (on Mac/Linux)
```

### **OS Module**
```javascript
// os-example.js
const os = require('os');

console.log('Platform:', os.platform());     // darwin, win32, linux
console.log('CPU cores:', os.cpus().length);
console.log('Free memory:', os.freemem() / 1024 / 1024, 'MB');
console.log('Total memory:', os.totalmem() / 1024 / 1024, 'MB');
console.log('Home dir:', os.homedir());
console.log('Hostname:', os.hostname());
```

---

## **6. Understanding Modules**

### **Creating Your Own Module:**

**math.js:**
```javascript
// math.js - exporting functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;

// Export multiple ways:
module.exports = { add, subtract, multiply };

// Or individually:
// exports.add = add;
// exports.subtract = subtract;
```

**app.js:**
```javascript
// app.js - importing your module
const math = require('./math');

console.log(math.add(5, 3));        // 8
console.log(math.subtract(10, 4));  // 6
console.log(math.multiply(7, 6));   // 42

// Destructuring import:
const { add, subtract } = require('./math');
console.log(add(2, 2)); // 4
```

---

## **7. Your First Simple Server**

### **HTTP Module (Built-in):**
```javascript
// server.js
const http = require('http');

const server = http.createServer((req, res) => {
  // req = request (what the browser sends)
  // res = response (what we send back)
  
  console.log(`Request received: ${req.method} ${req.url}`);
  
  // Set response headers
  res.writeHead(200, { 'Content-Type': 'text/html' });
  
  // Send response
  res.end(`
    <h1>Hello from Node.js!</h1>
    <p>You requested: ${req.url}</p>
    <p>Method: ${req.method}</p>
  `);
});

// Start server on port 3000
server.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
  console.log('Press Ctrl+C to stop');
});
```

**Run:**
```bash
node server.js
```

Then open browser to `http://localhost:3000`

---

## **8. Practice Exercises**

### **Exercise 1: File Manager**
Create a script that:
1. Creates a folder called "my-files"
2. Creates 3 text files inside with some content
3. Reads and displays the content of all files
4. Deletes one of them

```javascript
// Hint: Use fs.mkdir, fs.writeFile, fs.readdir, fs.unlink
```

### **Exercise 2: System Info**
Create a script that displays:
- Current directory
- All environment variables (filter for something interesting)
- Free memory percentage
- CPU cores and their speeds

### **Exercise 3: Simple API Server**
Create a server that:
- Returns "Hello World" at `/`
- Returns JSON at `/api` with your name, age, and city
- Shows "404 Not Found" for any other route
- Logs every request with timestamp

---

## **9. Common Gotchas**

```javascript
// ❌ DON'T DO THIS - Blocks the event loop
const data = fs.readFileSync('huge-file.txt'); 
// Use async version instead!

// ❌ DON'T DO THIS - Missing error handling
fs.readFile('file.txt', (err, data) => {
  console.log(data); // Error if file doesn't exist!
});

// ✅ DO THIS - Always handle errors
fs.readFile('file.txt', (err, data) => {
  if (err) {
    console.error('File not found!');
    return;
  }
  console.log(data);
});

// ❌ DON'T USE var - Use const or let
// ❌ DON'T use == - Use ===
```

---

## **10. Cheat Sheet for Day 1**

```javascript
// Run a file
node filename.js

// Common built-in modules
const fs = require('fs');       // Files
const path = require('path');   // Paths
const os = require('os');       // OS info
const http = require('http');   // Servers

// Create a module
module.exports = { myFunction };

// Import a module
const myModule = require('./myModule');

// Global variables
__dirname   // Current directory
__filename  // Current file
process     // Process info
global      // Global object