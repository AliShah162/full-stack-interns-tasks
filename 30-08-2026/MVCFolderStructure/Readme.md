---

## **What is MVC?**

**MVC** = **M**odel **V**iew **C**ontroller

It's a way to **organize your code** so it's clean, maintainable, and professional!

```
MVC Pattern:
- Model  = Data & Database logic
- View   = What user sees (HTML, JSON)
- Controller = Business logic (connects Model & View)
```

---

## **The Simple Analogy** 🍽️

Think of a **restaurant**:

| Component | Role | Example |
|-----------|------|---------|
| **Model** | Kitchen (food prep) | Database, data logic |
| **View** | Menu/Plate (presentation) | What user sees |
| **Controller** | Waiter (middleman) | Takes order, connects kitchen to customer |

```
Customer → Waiter (Controller) → Kitchen (Model) → Food (View) → Customer
```

---

## **Without MVC (MESSY!)** 😱

```
my-app/
├── server.js          (500 lines of everything!)
```

**All code in one file:**
```javascript
// server.js - 500 lines 😱
const express = require('express');
const app = express();

// Database connection
// Routes
// Business logic
// Database queries
// Everything mixed together!
```

**Problems:** ❌ Hard to maintain ❌ Hard to test ❌ Hard to scale

---

## **With MVC (CLEAN!)** ✅

```
my-app/
├── server.js
├── package.json
├── .env
├── src/
│   ├── models/
│   │   └── User.js
│   ├── controllers/
│   │   └── userController.js
│   ├── routes/
│   │   └── userRoutes.js
│   └── config/
│       └── db.js
```

**Each file has ONE job!** ✅

---

## **The MVC Breakdown** 📂

### **1. Models** (Data Layer)
```javascript
// models/User.js
const users = [
    { id: 1, name: 'Ali', email: 'ali@email.com' },
    { id: 2, name: 'Sara', email: 'sara@email.com' }
];

// Handles ALL data operations
class User {
    static findAll() {
        return users;
    }
    
    static findById(id) {
        return users.find(user => user.id === id);
    }
    
    static create(userData) {
        const newUser = { id: users.length + 1, ...userData };
        users.push(newUser);
        return newUser;
    }
    
    static delete(id) {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            return users.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = User;
```

### **2. Controllers** (Business Logic)
```javascript
// controllers/userController.js
const User = require('../models/User');

// Handles request/response logic
const getAllUsers = (req, res) => {
    const users = User.findAll();
    res.json({ success: true, data: users });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = User.findById(id);
    
    if (!user) {
        return res.status(404).json({ 
            success: false, 
            error: 'User not found' 
        });
    }
    
    res.json({ success: true, data: user });
};

const createUser = (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            error: 'Name and email are required'
        });
    }
    
    const newUser = User.create({ name, email });
    res.status(201).json({ 
        success: true, 
        data: newUser 
    });
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = User.delete(id);
    
    if (!deleted) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }
    
    res.json({ 
        success: true, 
        message: 'User deleted successfully' 
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
};
```

### **3. Routes** (URL Mapping)
```javascript
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Map URLs to controller functions
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
```

### **4. Server Entry Point**
```javascript
// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('📋 API Endpoints:');
    console.log('  GET    /api/users');
    console.log('  GET    /api/users/:id');
    console.log('  POST   /api/users');
    console.log('  DELETE /api/users/:id');
});
```

---

## **Complete Project Structure** 🗂️

```
my-api/
├── server.js                 # Entry point
├── package.json              # Dependencies
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── src/
│   ├── models/              # Data layer
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── index.js
│   ├── controllers/         # Business logic
│   │   ├── userController.js
│   │   ├── productController.js
│   │   └── authController.js
│   ├── routes/             # URL routes
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── index.js
│   ├── middleware/          # Custom middleware
│   │   ├── auth.js
│   │   ├── logger.js
│   │   └── validator.js
│   ├── config/             # Configuration
│   │   ├── db.js
│   │   └── env.js
│   └── utils/              # Helper functions
│       ├── helpers.js
│       └── validators.js
└── tests/                  # Test files
    ├── models/
    ├── controllers/
    └── routes/
```

---

## **Complete API Example** 🚀

### **models/Product.js**
```javascript
// models/Product.js
const products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Phone', price: 800 },
    { id: 3, name: 'Headphones', price: 150 }
];

class Product {
    static findAll() {
        return products;
    }
    
    static findById(id) {
        return products.find(p => p.id === id);
    }
    
    static create(data) {
        const newProduct = { id: products.length + 1, ...data };
        products.push(newProduct);
        return newProduct;
    }
    
    static update(id, data) {
        const product = products.find(p => p.id === id);
        if (product) {
            Object.assign(product, data);
            return product;
        }
        return null;
    }
    
    static delete(id) {
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            return products.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = Product;
```

### **controllers/productController.js**
```javascript
// controllers/productController.js
const Product = require('../models/Product');

const getAllProducts = (req, res) => {
    const products = Product.findAll();
    res.json({ success: true, data: products });
};

const getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const product = Product.findById(id);
    
    if (!product) {
        return res.status(404).json({
            success: false,
            error: 'Product not found'
        });
    }
    
    res.json({ success: true, data: product });
};

const createProduct = (req, res) => {
    const { name, price } = req.body;
    
    if (!name || price === undefined) {
        return res.status(400).json({
            success: false,
            error: 'Name and price are required'
        });
    }
    
    const newProduct = Product.create({ name, price });
    res.status(201).json({ 
        success: true, 
        data: newProduct 
    });
};

const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    
    const updated = Product.update(id, { name, price });
    
    if (!updated) {
        return res.status(404).json({
            success: false,
            error: 'Product not found'
        });
    }
    
    res.json({ success: true, data: updated });
};

const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = Product.delete(id);
    
    if (!deleted) {
        return res.status(404).json({
            success: false,
            error: 'Product not found'
        });
    }
    
    res.json({ 
        success: true, 
        message: 'Product deleted successfully' 
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
```

### **routes/productRoutes.js**
```javascript
// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
```

### **server.js**
```javascript
// server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('\n📋 API Endpoints:');
    console.log('  Users:');
    console.log('    GET    /api/users');
    console.log('    GET    /api/users/:id');
    console.log('    POST   /api/users');
    console.log('    DELETE /api/users/:id');
    console.log('  Products:');
    console.log('    GET    /api/products');
    console.log('    GET    /api/products/:id');
    console.log('    POST   /api/products');
    console.log('    PUT    /api/products/:id');
    console.log('    DELETE /api/products/:id');
});
```

---

## **Why MVC?** 🎯

| Without MVC | With MVC |
|-------------|----------|
| All code mixed | Each component separate |
| Hard to test | Easy to test |
| Hard to scale | Easy to scale |
| Hard to debug | Easy to debug |
| Not reusable | Reusable code |
| Team collaboration hard | Team collaboration easy |

---

## **Best Practices** 📋

```javascript
// 1. Model: Only data logic
class User {
    static find() { /* database query */ }
}

// 2. Controller: Only business logic
const getUsers = (req, res) => {
    const users = User.find();
    res.json(users);
};

// 3. Routes: Only URL mapping
router.get('/users', getUsers);

// 4. Keep files small and focused
// 5. Use consistent naming
// 6. Export/import properly
// 7. Handle errors
```

---

## **Summary** 📝

| Component | Job | Example |
|-----------|-----|---------|
| **Model** | Data & Database | `User.find()` |
| **View** | What user sees | `res.json()` |
| **Controller** | Business logic | `getUsers()` |
| **Routes** | URL mapping | `router.get()` |

---

**MVC = Organized, professional, scalable code!** 🏗️
