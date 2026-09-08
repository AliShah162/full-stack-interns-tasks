---

## **What is npm?**

**npm** = **N**ode **P**ackage **M**anager

Think of it as an **app store** for JavaScript code:
- 2+ million packages available
- Free to use
- Install other people's code with 1 command

```bash
npm install express    # Downloads Express framework
npm install mongoose   # Downloads MongoDB library
npm install react      # Downloads React
```

---

## **What is package.json?**

**package.json** = Your project's **ID card** 📇

It tells others (and npm) about your project:
- Project name
- Version
- Dependencies (what packages you need)
- Scripts (how to run your project)

---

## **Creating package.json**

### **Method 1: Interactive Setup**
```bash
npm init
# Answer questions: name, version, description, etc.
```

### **Method 2: Quick Setup (Default)**
```bash
npm init -y    # Skips questions, uses defaults
```

---

## **What's Inside package.json?**

```json
{
  "name": "my-awesome-app",
  "version": "1.0.0",
  "description": "My first Node.js app",
  "main": "server.js",           // Entry point
  "scripts": {
    "start": "node server.js",   // npm start
    "dev": "nodemon server.js"   // npm run dev
  },
  "dependencies": {
    "express": "^4.18.0",        // Production packages
    "mongoose": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0"          // Development only
  }
}
```

---

## **Key Commands You'll Use Daily** 🔑

### **Installing Packages**

```bash
npm install express              # Install for production
npm install express --save       # Same as above
npm install nodemon --save-dev   # For development only
npm install -g nodemon           # Install globally (anywhere)
```

### **Installing ALL Dependencies**

```bash
npm install
# Reads package.json and installs everything
```

### **Uninstalling Packages**

```bash
npm uninstall express
```

### **Updating Packages**

```bash
npm update    # Update all packages
npm outdated  # See what needs updating
```

---

## **Dependencies vs DevDependencies** 📦

| Type | When to Use | Example |
|------|-------------|---------|
| **dependencies** | Needed for app to RUN | express, mongoose, axios |
| **devDependencies** | Needed for DEVELOPMENT | nodemon, jest, eslint |

```javascript
// Production (app needs these)
"dependencies": {
    "express": "^4.18.0",    // For running server
    "mongoose": "^7.0.0"     // For database
}

// Development (only you need these)
"devDependencies": {
    "nodemon": "^2.0.0",     // Auto-restart on save
    "jest": "^29.0.0"        // Testing
}
```

When someone runs `npm install --production`, ONLY dependencies install (saves space).

---

## **The Magic Scripts** ✨

```json
{
  "scripts": {
    "start": "node server.js",          // npm start
    "dev": "nodemon server.js",         // npm run dev
    "test": "jest",                     // npm test
    "build": "webpack --config webpack.config.js",  // npm run build
    "lint": "eslint .",                 // npm run lint
    "format": "prettier --write ."      // npm run format
  }
}
```

**Run scripts:**
```bash
npm start          # Special - no 'run' needed
npm run dev        # Need 'run' for custom scripts
npm test           # Special - no 'run' needed
npm run build      # Custom script
```

---

## **The Node Modules Folder** 📁

```
my-project/
├── node_modules/        # ALL packages go here (BIG)
│   ├── express/
│   ├── mongoose/
│   └── ... (100s of folders)
├── package.json
└── package-lock.json    # Locks package versions
```

**Important:** 
- `node_modules` is HUGE - don't commit to git!
- Add to `.gitignore`:

```
node_modules/
.env
```

---

## **package-lock.json** 🔒

**What it does:** Locks EXACT versions of every package and their dependencies.

```json
{
  "name": "my-app",
  "lockfileVersion": 2,
  "packages": {
    "node_modules/express": {
      "version": "4.18.2",    // Exact version
      "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz"
    }
  }
}
```

**Why it's important:**
- Ensures everyone gets the same versions
- Prevents "works on my machine" problems
- Should ALWAYS be committed to git

---

## **Version Numbers Explained** 🔢

```
^4.18.2  →  Allows minor updates (4.18.x)
~4.18.2  →  Allows patch updates (4.18.2 only)
4.18.2   →  Exact version only
*        →  Any version (dangerous!)
>=4.18.0  →  4.18.0 or higher
```

**Example:**
```json
{
  "dependencies": {
    "express": "^4.18.0",    // Will install 4.18.x (not 5.0.0)
    "lodash": "~4.17.21",    // Will install 4.17.x only
    "react": "18.2.0"        // Exactly 18.2.0
  }
}
```

---

## **Common npm Commands Cheatsheet** 📋

```bash
# Initialize project
npm init -y

# Install packages
npm install express          # Add to dependencies
npm install -D nodemon       # Add to devDependencies
npm install -g create-react-app  # Global install

# Install all dependencies
npm install

# Remove packages
npm uninstall express

# Update packages
npm update
npm outdated

# Run scripts
npm start
npm run dev
npm test

# See installed packages
npm list                    # All packages
npm list --depth=0          # Top-level only
npm list -g                 # Global packages

# Publishing (if you make a package)
npm publish
```

---

## **Real-World Example: Setting Up a Project** 🚀

```bash
# 1. Create project
mkdir my-api
cd my-api

# 2. Initialize
npm init -y

# 3. Install packages
npm install express mongoose dotenv
npm install -D nodemon

# 4. Add scripts
# Edit package.json:
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}

# 5. Create .gitignore
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore

# 6. Start developing!
npm run dev
```

---

## **Quick Tips** 💡

1. **Always include** `node_modules/` in `.gitignore`
2. **Always commit** `package.json` and `package-lock.json`
3. **Use `--save-dev`** for development tools
4. **Use `^` versioning** (starts with `^4.18.0`) for flexibility
5. **Run `npm outdated`** to see if packages need updating
6. **Never edit** files in `node_modules/` manually

---

## **That's It!** 🎉

**npm** = Package manager
**package.json** = Project ID card
**node_modules** = Where packages live

**3 commands you'll use 90% of the time:**
```bash
npm init -y          # Start a project
npm install <pkg>    # Add a package
npm start            # Run your app
```

