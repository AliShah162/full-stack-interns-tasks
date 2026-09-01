# Timestamps & Virtuals in Mongoose

## 1. Timestamps

Timestamps automatically track when a document is created and updated. They're like an automatic audit trail for your data.

### What Timestamps Do:
- `createdAt` - When the document was first created
- `updatedAt` - When the document was last modified

---

### Basic Usage

```javascript
// Option 1: Enable timestamps in schema options
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
}, {
    timestamps: true  // ✅ This adds createdAt & updatedAt automatically
});

const User = mongoose.model('User', userSchema);

// Creating a user
const user = new User({ name: 'John', email: 'john@example.com', age: 25 });
await user.save();

console.log(user);
// Output:
{
    "_id": "user123",
    "name": "John",
    "email": "john@example.com",
    "age": 25,
    "createdAt": "2024-01-15T10:30:00.000Z",  // ✅ Auto-added
    "updatedAt": "2024-01-15T10:30:00.000Z"   // ✅ Auto-added
}

// Updating the user
user.age = 26;
await user.save();
// updatedAt automatically changes to current time
console.log(user.updatedAt); // New timestamp
```

---

### Custom Timestamp Names

```javascript
const userSchema = new mongoose.Schema({
    name: String,
    email: String
}, {
    timestamps: {
        createdAt: 'created_at',  // Custom name
        updatedAt: 'updated_at'   // Custom name
    }
});

// Now the fields are named 'created_at' and 'updated_at'
const user = await User.create({ name: 'John', email: 'john@example.com' });
console.log(user.created_at); // ✅ Works with custom name
console.log(user.updated_at); // ✅ Works with custom name
```

---

### Using Timestamps in Queries

```javascript
// 1. Find users created in the last 7 days
const weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 7);

const recentUsers = await User.find({
    createdAt: { $gte: weekAgo }
});

// 2. Find users updated today
const today = new Date();
today.setHours(0, 0, 0, 0);

const updatedToday = await User.find({
    updatedAt: { $gte: today }
});

// 3. Sort by creation date (newest first)
const newestUsers = await User.find().sort({ createdAt: -1 });

// 4. Delete users older than 30 days
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

await User.deleteMany({
    createdAt: { $lt: thirtyDaysAgo }
});
```

---

### Manual Timestamps

```javascript
// You can also set timestamps manually
const userSchema = new mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true  // Can't be changed after creation
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update updatedAt manually
userSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});
```

---

## 2. Virtuals

**Virtuals** are properties that don't get stored in the database. They're like calculated fields that Mongoose creates on the fly when you access them.

Think of it like:
- **Real property** = Stored in database (like a physical file)
- **Virtual property** = Calculated when needed (like a formula in Excel)

---

### Basic Virtual Example

```javascript
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    birthYear: Number
}, {
    timestamps: true
});

// Create a virtual property
userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Another virtual
userSchema.virtual('isAdult').get(function() {
    return this.age >= 18;
});

// Virtual that calculates age from birthYear
userSchema.virtual('calculatedAge').get(function() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.birthYear;
});

const User = mongoose.model('User', userSchema);

const user = new User({
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    birthYear: 1998
});

console.log(user.fullName);        // "John Doe" (not stored)
console.log(user.isAdult);         // true (not stored)
console.log(user.calculatedAge);   // 26 (not stored)

// These don't appear in the database
const savedUser = await user.save();
console.log(savedUser.fullName);   // Still "John Doe"
console.log(savedUser.toObject()); // Virtuals NOT included by default
```

---

### Virtual with Schema Options

```javascript
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    salary: Number,
    bonus: Number,
    startDate: Date
}, {
    // These options control how virtuals appear
    toJSON: { virtuals: true },   // Include virtuals in JSON output
    toObject: { virtuals: true }  // Include virtuals in objects
});

// Virtual with calculation
userSchema.virtual('totalCompensation').get(function() {
    return this.salary + (this.bonus || 0);
});

// Virtual with condition
userSchema.virtual('employmentDuration').get(function() {
    const now = new Date();
    const diff = now - this.startDate;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    return `${years} years, ${months} months`;
});

// Virtual with transformation
userSchema.virtual('displayName').get(function() {
    return `${this.lastName}, ${this.firstName}`;
});

const User = mongoose.model('User', userSchema);

const user = new User({
    firstName: 'John',
    lastName: 'Doe',
    salary: 50000,
    bonus: 5000,
    startDate: new Date('2020-01-01')
});

console.log(user.totalCompensation);  // 55000
console.log(user.displayName);        // "Doe, John"
console.log(user.employmentDuration); // "3 years, 5 months"
```

---

### Real-World Virtual Examples

```javascript
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    discount: Number,
    taxRate: Number,
    weight: Number,
    dimensions: {
        length: Number,
        width: Number,
        height: Number
    },
    ratings: [Number]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

// 1. Calculate final price after discount
productSchema.virtual('finalPrice').get(function() {
    const discountAmount = this.price * (this.discount / 100);
    return this.price - discountAmount;
});

// 2. Calculate price with tax
productSchema.virtual('priceWithTax').get(function() {
    return this.finalPrice * (1 + this.taxRate / 100);
});

// 3. Calculate volume
productSchema.virtual('volume').get(function() {
    return this.dimensions.length * this.dimensions.width * this.dimensions.height;
});

// 4. Average rating
productSchema.virtual('averageRating').get(function() {
    if (this.ratings.length === 0) return 0;
    const sum = this.ratings.reduce((a, b) => a + b, 0);
    return (sum / this.ratings.length).toFixed(1);
});

// 5. Shipping cost based on weight
productSchema.virtual('shippingCost').get(function() {
    if (this.weight <= 1) return 5.99;
    if (this.weight <= 5) return 10.99;
    return 19.99;
});

const Product = mongoose.model('Product', productSchema);

const product = new Product({
    name: 'Laptop',
    price: 1000,
    discount: 10,
    taxRate: 0.08,
    weight: 2.5,
    dimensions: { length: 30, width: 20, height: 2 },
    ratings: [5, 4, 5, 4, 3]
});

console.log(product.finalPrice);      // 900
console.log(product.priceWithTax);    // 972
console.log(product.volume);          // 1200
console.log(product.averageRating);   // 4.2
console.log(product.shippingCost);    // 10.99
```

---

### Virtuals with References (Populate)

```javascript
// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

// Post Schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Add virtual to User for posts
userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'authorId',
    justOne: false  // Multiple posts
});

// Add virtual for total posts count
userSchema.virtual('postCount').get(function() {
    return this.posts ? this.posts.length : 0;
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// Use with populate
const user = await User.findById('user123').populate('posts');
console.log(user.posts);        // Array of all user's posts
console.log(user.postCount);    // Number of posts
```

---

### Advanced Virtual Examples

```javascript
const orderSchema = new mongoose.Schema({
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

// 1. Calculate subtotal
orderSchema.virtual('subtotal').get(function() {
    return this.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
});

// 2. Tax calculation (8%)
orderSchema.virtual('tax').get(function() {
    return this.subtotal * 0.08;
});

// 3. Shipping fee
orderSchema.virtual('shippingFee').get(function() {
    if (this.subtotal > 100) return 0;
    return 10;
});

// 4. Total
orderSchema.virtual('total').get(function() {
    return this.subtotal + this.tax + this.shippingFee;
});

// 5. Order summary for display
orderSchema.virtual('summary').get(function() {
    return {
        items: this.items.length,
        totalItems: this.items.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: this.subtotal,
        tax: this.tax,
        shipping: this.shippingFee,
        total: this.total
    };
});

// 6. Order status badge (for UI)
orderSchema.virtual('statusBadge').get(function() {
    const colors = {
        pending: 'yellow',
        processing: 'blue',
        shipped: 'green',
        delivered: 'gray'
    };
    return colors[this.status] || 'gray';
});

// 7. Estimated delivery date
orderSchema.virtual('estimatedDelivery').get(function() {
    if (this.status === 'delivered') return 'Delivered';
    const days = {
        pending: 5,
        processing: 3,
        shipped: 2
    };
    const addDays = days[this.status] || 7;
    const date = new Date(this.createdAt);
    date.setDate(date.getDate() + addDays);
    return date.toLocaleDateString();
});

const Order = mongoose.model('Order', orderSchema);

const order = new Order({
    items: [
        { name: 'Laptop', price: 1000, quantity: 1 },
        { name: 'Mouse', price: 25, quantity: 2 }
    ],
    shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
    },
    status: 'pending'
});

await order.save();

console.log(order.summary);
// {
//   items: 2,
//   totalItems: 3,
//   subtotal: 1050,
//   tax: 84,
//   shipping: 0,
//   total: 1134
// }
console.log(order.statusBadge);        // "yellow"
console.log(order.estimatedDelivery);  // Date string
```

---

## Summary Comparison

| Feature | Timestamps | Virtuals |
|---------|------------|----------|
| **Purpose** | Track creation/update times | Calculate values on the fly |
| **Stored in DB?** | ✅ Yes | ❌ No |
| **Auto-updated?** | ✅ Yes | ❌ No (recalculated when accessed) |
| **Can query on?** | ✅ Yes | ❌ No |
| **Used for** | Audit trails, filtering by date | Computed properties, formatting |

---

### When to Use Each

**Use Timestamps when:**
- You need to track when data was created/updated
- You need to query by date ranges
- You want automatic audit trails
- You need to clean old data

**Use Virtuals when:**
- You need computed/calculated values
- You want to format data for display
- You need to combine fields (like full name)
- You want to avoid storing redundant data
- You're building APIs and need derived fields

---

### Complete Example with Both

```javascript
const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    hireDate: Date,
    salary: Number,
    department: String,
    performance: [Number]
}, {
    timestamps: true,  // ✅ Track creation/updates
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtuals for calculated fields
employeeSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

employeeSchema.virtual('yearsEmployed').get(function() {
    const now = new Date();
    const diff = now - this.hireDate;
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
});

employeeSchema.virtual('performanceRating').get(function() {
    if (this.performance.length === 0) return 'No reviews';
    const avg = this.performance.reduce((a, b) => a + b) / this.performance.length;
    return avg >= 4 ? 'Excellent' : avg >= 3 ? 'Good' : 'Needs Improvement';
});

employeeSchema.virtual('annualPackage').get(function() {
    return this.salary * 12;
});

// Query using timestamps
const recentEmployees = await Employee.find({
    createdAt: { $gte: new Date('2024-01-01') }
});

const employee = await Employee.findById('emp123');
console.log(employee.fullName);          // "John Doe"
console.log(employee.yearsEmployed);     // 3
console.log(employee.performanceRating); // "Excellent"
console.log(employee.annualPackage);     // 60000
```

---

**Remember:**
- **Timestamps** = Automatic time tracking in database
- **Virtuals** = Calculated fields, not stored, just for convenience

Both make your life easier and your code cleaner! 🚀