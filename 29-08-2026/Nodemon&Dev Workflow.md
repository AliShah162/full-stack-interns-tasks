## **What is Nodemon?**

**Nodemon** = **Node** + **Monitor**

It **auto-restarts** your server when you save files. No more manual restarts! 🎉

**Without Nodemon:**
```bash
# Change code → Stop server (Ctrl+C) → Start again → Repeat 😫!
node server.js
^C
node server.js
^C
node server.js
```

**With Nodemon:**
```bash
# Change code → Save → Auto-restarts! ✨
nodemon server.js
# Saves file → Restarts automatically!
```

---

## **Install Nodemon**

### **Global Install (anywhere):**
```bash
npm install -g nodemon
nodemon server.js
```

### **Local Install (project only) - RECOMMENDED:**
```bash
npm install --save-dev nodemon
npx nodemon server.js   # npx runs local packages
```

---

## **Setup Nodemon with package.json**

Add scripts to **package.json**:

```json
{
  "scripts": {
    "start": "node server.js",      // Production
    "dev": "nodemon server.js"      // Development
  }
}
```

**Now run:**
```bash
npm run dev   # Starts with auto-restart!
npm start     # Regular (no auto-restart)
```

---

## **Simple Workflow Example**

### **1. Setup Project**
```bash
mkdir my-app
cd my-app
npm init -y
npm install --save-dev nodemon
```

### **2. Create server.js**
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello World!');
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

### **3. Add Script (package.json)**
```json
{
  "scripts": {
    "dev": "nodemon server.js"
  }
}
```

### **4. Run!**
```bash
npm run dev
```

**Now change something:**
```javascript
res.end('Hello World!');  // Change to → 
res.end('Hello Nodemon!'); // Save → Server restarts! 🚀
```

---

## **Nodemon in Action** 🎬

```bash
$ npm run dev

> my-app@1.0.0 dev
> nodemon server.js

[nodemon] 2.0.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
Server running on port 3000

# You make a change and save...

[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
Server running on port 3000
```

---

## **Common Nodemon Commands**

```bash
nodemon server.js           # Run with nodemon
nodemon server.js --delay 2 # Wait 2 seconds before restart
nodemon --watch src/        # Only watch src folder
nodemon --ignore *.test.js  # Ignore test files
nodemon --ext js,json       # Watch .js and .json files
rs                          # Manually restart (type this in terminal)
```

---

## **Nodemon Config (Optional)**

Create **nodemon.json** to customize:

```json
{
  "watch": ["src/"],
  "ignore": ["node_modules/", "*.test.js"],
  "ext": "js,json",
  "delay": 1000
}
```

---

## **Package.json Best Practices** 📋

```json
{
  "name": "my-api",
  "version": "1.0.0",
  "description": "My first API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",           // Production
    "dev": "nodemon server.js",          // Development
    "debug": "nodemon --inspect server.js", // Debug mode
    "test": "jest"                       // Testing
  },
  "dependencies": {
    "express": "^4.18.0"                 // Production packages
  },
  "devDependencies": {
    "nodemon": "^2.0.0"                  // Dev only packages
  }
}
```

---

## **Node vs Nodemon vs npm start** 🔄

| Command | What it does | When to use |
|---------|-------------|-------------|
| `node server.js` | Runs once | Production |
| `nodemon server.js` | Auto-restarts | Development |
| `npm start` | Runs `node server.js` | Production |
| `npm run dev` | Runs `nodemon server.js` | Development |

---

## **Pro Tips** 💡

1. **Always use `--save-dev`** for nodemon (dev only!)
2. **Use `npm run dev`** for development
3. **Use `npm start`** for production
4. **Type `rs`** to restart manually without saving

---

## **Simple Workflow** 🚀

```bash
# 1. Start development
npm run dev

# 2. Write code and save
# Server auto-restarts ✅

# 3. When done, deploy
npm start    # No auto-restart (performance)
```

---
