# Relationships — Embedding vs Referencing in MongoDB
// so embedding is like nesting like:
// name, age dn then addredd has its own odject like nested objects
// and refrence will just simple wont have anything nested as everything is separated.

## The Big Picture

In MongoDB, you have two ways to connect related data:

1. **Embedding** (Nested documents) - Put data inside other data
2. **Referencing** (Separate collections) - Keep data separate, link with IDs

Think of it like:
- **Embedding** = Putting all your photos inside an album (everything together)
- **Referencing** = Putting photos in different albums, with a list of which album has which photos

---

## 1. Embedding (Nested Documents)

### What is Embedding?
You store related data as a nested object/array inside a parent document.

### Example:
```javascript
// One document contains ALL related data
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    // Address is EMBEDDED directly inside user
    address: {
        street: String,
        city: String,
        zipCode: String,
        country: String
    },
    // Orders are EMBEDDED as an array
    orders: [
        {
            orderId: String,
            total: Number,
            date: Date,
            items: [
                {
                    product: String,
                    quantity: Number,
                    price: Number
                }
            ]
        }
    ]
});

const User = mongoose.model('User', userSchema);

// One query gets everything
const user = await User.findOne({ name: 'John' });
console.log(user.address); // Direct access
console.log(user.orders); // Direct access
```

### Data Structure:
```json
{
    "_id": "user123",
    "name": "John Doe",
    "email": "john@example.com",
    "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipCode": "10001",
        "country": "USA"
    },
    "orders": [
        {
            "orderId": "ORD-001",
            "total": 150.99,
            "date": "2024-01-15",
            "items": [
                {
                    "product": "Laptop",
                    "quantity": 1,
                    "price": 1000
                }
            ]
        }
    ]
}
```

### When to use Embedding ✅
- **One-to-One** relationships (User → Profile)
- **One-to-Few** relationships (User → Addresses)
- Data is always accessed together
- Data doesn't change frequently
- You want atomic updates
- You need fast reads (single query)

---

## 2. Referencing (Normalization)

### What is Referencing?
You keep related data in separate collections and use IDs to connect them.

### Example:
```javascript
// Separate collections
// 1. User Collection
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    // Reference to address
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'  // Reference to Address model
    },
    // References to orders
    orderIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
});

// 2. Address Collection (Separate)
const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    zipCode: String,
    country: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// 3. Order Collection (Separate)
const orderSchema = new mongoose.Schema({
    orderId: String,
    total: Number,
    date: Date,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [
        {
            product: String,
            quantity: Number,
            price: Number
        }
    ]
});

const User = mongoose.model('User', userSchema);
const Address = mongoose.model('Address', addressSchema);
const Order = mongoose.model('Order', orderSchema);

// Need multiple queries to get all data
const user = await User.findOne({ name: 'John' })
    .populate('addressId')  // Gets address data
    .populate('orderIds');  // Gets orders data

console.log(user.addressId); // Now has address data
console.log(user.orderIds); // Now has order data
```

### Data Structure:
```json
// users collection
{
    "_id": "user123",
    "name": "John Doe",
    "email": "john@example.com",
    "addressId": "addr456",
    "orderIds": ["ord789", "ord790"]
}

// addresses collection
{
    "_id": "addr456",
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001",
    "country": "USA",
    "userId": "user123"
}

// orders collection
{
    "_id": "ord789",
    "orderId": "ORD-001",
    "total": 150.99,
    "date": "2024-01-15",
    "userId": "user123",
    "items": [...]
}
```

### When to use Referencing ✅
- **One-to-Many** relationships (User → Many Orders)
- **Many-to-Many** relationships (Students → Courses)
- Data is frequently updated
- Data is large and grows over time
- You need flexibility in queries
- You want to avoid duplication
- Data is accessed independently

---

## Complete Comparison Example

### Scenario: Blog System

```javascript
// ============ EMBEDDING APPROACH ============
const blogPostWithEmbeddedComments = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    // Comments are embedded directly
    comments: [
        {
            text: String,
            author: String,
            date: Date,
            likes: Number
        }
    ]
});

// PROS:
// - One query gets post + all comments
// - Fast reads
// - Atomic updates

// CONS:
// - Comments can't be queried independently
// - Post grows huge with many comments
// - Difficult to query "all comments by user X"
// - Can exceed 16MB document limit

// ============ REFERENCING APPROACH ============
const blogPostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String
});

const commentSchema = new mongoose.Schema({
    text: String,
    author: String,
    date: Date,
    likes: Number,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost'
    }
});

// PROS:
// - Comments can be queried independently
// - No document size limit
// - Better for many comments
// - Can add features like "comments by user"

// CONS:
// - Need multiple queries or populate()
// - Slower reads
// - More complex queries
```

---

## Decision Guide

### Use Embedding When:

```javascript
// 1. One-to-One relationships
const userSchema = new mongoose.Schema({
    name: String,
    profile: {
        bio: String,
        avatar: String,
        website: String
    }
});

// 2. One-to-Few (small, fixed number)
const blogPostSchema = new mongoose.Schema({
    title: String,
    tags: ['tech', 'javascript', 'mongodb'] // Small array
});

// 3. Data always accessed together
const orderSchema = new mongoose.Schema({
    orderNumber: String,
    customer: {
        name: String,
        email: String,
        phone: String
    },
    items: [
        {
            product: String,
            price: Number,
            quantity: Number
        }
    ]
});
```

### Use Referencing When:

```javascript
// 1. One-to-Many (unbounded, large)
const userSchema = new mongoose.Schema({
    name: String,
    // Reference to many orders
    orderIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
});

// 2. Many-to-Many
const studentSchema = new mongoose.Schema({
    name: String,
    courseIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const courseSchema = new mongoose.Schema({
    name: String,
    studentIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

// 3. Frequently updated data
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number // Updated frequently
});

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: Number
});
```

---

## Real-World Example: E-Commerce

```javascript
// ========== E-COMMERCE SCHEMAS ==========

// 1. User - EMBED addresses (few), REFERENCE orders (many)
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    
    // Embed: Addresses (1-to-few)
    addresses: [
        {
            type: {
                home: String,
                work: String
            },
            street: String,
            city: String,
            zipCode: String,
            isDefault: Boolean
        }
    ],
    
    // Reference: Orders (1-to-many, grows over time)
    orderIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    
    // Reference: Wishlist (many-to-many)
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

// 2. Order - EMBED items (always accessed with order)
const orderSchema = new mongoose.Schema({
    orderNumber: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered']
    },
    total: Number,
    shippingAddress: {
        // Embed: Snapshot of address at order time
        street: String,
        city: String,
        zipCode: String
    },
    // Embed: Order items
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            name: String, // Snapshot of product name
            price: Number, // Snapshot of price
            quantity: Number
        }
    ],
    payment: {
        method: String,
        transactionId: String,
        status: String
    }
});

// 3. Product - REFERENCE categories, review
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    stock: Number,
    
    // Reference: Category
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    
    // Embed: Product details (always needed)
    details: {
        brand: String,
        color: String,
        size: String,
        weight: Number
    },
    
    // Embed: Average rating (calculated)
    averageRating: {
        type: Number,
        default: 0
    }
});

// 4. Review - REFERENCE product (many reviews per product)
const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
```

---

## Populate (Getting Referenced Data)

```javascript
// Get user with all referenced data
const user = await User.findById('user123')
    .populate('orderIds')  // Get all orders
    .populate('wishlist'); // Get wishlist products

// Get orders with product details
const orders = await Order.find({ userId: 'user123' })
    .populate('items.productId'); // Populate nested reference

// Deep populate
const userWithAll = await User.findById('user123')
    .populate({
        path: 'orderIds',
        populate: {
            path: 'items.productId',
            model: 'Product'
        }
    });
```

---

## Performance Comparison

| Aspect | Embedding | Referencing |
|--------|-----------|-------------|
| **Read Speed** | ⚡ Fast (1 query) | 🐢 Slower (multiple queries or populate) |
| **Write Speed** | ⚡ Fast (1 update) | ⚡ Fast (1 update) |
| **Memory Usage** | 📈 More for large docs | 📉 Less per document |
| **Query Flexibility** | 🚫 Limited | ✅ Very flexible |
| **Data Duplication** | 🔴 Can duplicate data | 🟢 No duplication |
| **Document Size** | 📏 Limited to 16MB | 📏 No limit per collection |
| **Atomic Updates** | ✅ Yes | ✅ Yes |

---

## Summary & Best Practices

| Relationship | Best Approach | Reason |
|--------------|---------------|--------|
| **1-to-1** | Embedding | Always accessed together |
| **1-to-Few** (≤100) | Embedding | Simple, fast queries |
| **1-to-Many** (hundreds) | Referencing | Document size, flexibility |
| **1-to-Many** (thousands) | Referencing | Scalability, independence |
| **Many-to-Many** | Referencing | Both sides need access |
| **Frequently Updated** | Referencing | Avoid updating large docs |
| **Read-Heavy** | Embedding | Single query |

### Golden Rules:
1. **Embed when:** Data is always accessed together and doesn't change much
2. **Reference when:** Data is accessed independently or grows unbounded
3. **Consider:** Your application's read/write patterns
4. **Consider:** Future scalability needs
5. **Consider:** Data consistency requirements

**Remember:** There's no "right" answer - it depends on your specific use case! 🎯