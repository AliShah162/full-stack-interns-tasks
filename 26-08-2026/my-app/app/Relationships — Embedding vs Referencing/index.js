// ========== E-COMMERCE SCHEMAS ==========

// so embedding is like nesting like:
// name, age dn then addredd has its own odject like nested objects
// and refrence will just simple wont have anything nested as everything is separated.

// by using type: mongoose.Schema.Types.ObjectId,
// the authot will become a separete object and we only care about the id, when we access the id, we will get all the author options


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

// here i will tell why we use type: mongoose.Schema.Types.ObjectId,
