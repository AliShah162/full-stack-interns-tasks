Great question! Let me show you **exactly why** duplicating data is bad with real scenarios:

## Problem 1: Data Inconsistency (The BIGGEST issue)

### With duplicate `full_name` field:
```javascript
const employee = new Employee({
  first_name: "John",
  last_name: "Doe",
  full_name: "John Doe"  // Manually set
});

// 6 months later, John gets married:
await Employee.updateOne(
  { _id: employee._id },
  { first_name: "John", last_name: "Smith" }  // ❌ Forgot to update full_name!
);

// NOW THE DATA IS WRONG:
const emp = await Employee.findById(employee._id);
console.log(emp.first_name);  // "John" 
console.log(emp.last_name);   // "Smith"
console.log(emp.full_name);   // "John Doe" ❌ WRONG! Should be "John Smith"
```

**With Virtual:**
```javascript
// Update only first_name and last_name
await Employee.updateOne(
  { _id: employee._id },
  { last_name: "Smith" }
);

// full_name AUTOMATICALLY correct:
console.log(emp.full_name);   // "John Smith" ✅ ALWAYS CORRECT!
```

## Problem 2: Database Bloat (Wasted Space)

Imagine you have 1 MILLION employees:

### With duplicate field:
```javascript
// Each document stores:
{
  first_name: "John",      // ~20 bytes
  last_name: "Doe",        // ~20 bytes  
  full_name: "John Doe"    // ~20 bytes - DUPLICATE!
}

// 1,000,000 employees × 20 bytes = 20MB WASTED!
// Plus index size if you index it!
```

### With virtual:
```javascript
// Each document stores ONLY:
{
  first_name: "John",      // ~20 bytes
  last_name: "Doe"         // ~20 bytes
  // No full_name - SAVED 20MB!
}
```

## Problem 3: Update Complexity

### With duplicate field:
```javascript
// You have to update in MULTIPLE places:
const updateEmployee = async (id, firstName, lastName) => {
  await Employee.updateOne(
    { _id: id },
    { 
      first_name: firstName,
      last_name: lastName,
      full_name: `${firstName} ${lastName}`  // 👈 Must remember to update!
    }
  );
};

// What if you forget? BUG!
const updateLastName = async (id, newLastName) => {
  await Employee.updateOne(
    { _id: id },
    { last_name: newLastName }
    // ❌ Forgot to update full_name - now data is inconsistent!
  );
};
```

### With virtual:
```javascript
// Update ONLY the real data:
const updateEmployee = async (id, firstName, lastName) => {
  await Employee.updateOne(
    { _id: id },
    { 
      first_name: firstName,
      last_name: lastName
      // No need to update full_name - it's virtual!
    }
  );
};
// ALWAYS correct! No way to mess up! ✅
```

## Problem 4: Multiple Ways to Display

### With duplicate field (RIGID):
```javascript
// Stored only as "John Doe"
full_name: "John Doe"  // Can't change the format!

// What if you later want:
// - "Doe, John" for formal documents?
// - "J. Doe" for short display?
// - "John D." for informal?
// You'd need to store ALL of them! 🤯
```

### With virtual (FLEXIBLE):
```javascript
// You can create MULTIPLE virtuals:
EmployeeSchema.virtual('full_name').get(function() {
  return `${this.first_name} ${this.last_name}`;  // "John Doe"
});

EmployeeSchema.virtual('formal_name').get(function() {
  return `${this.last_name}, ${this.first_name}`;  // "Doe, John"
});

EmployeeSchema.virtual('short_name').get(function() {
  return `${this.first_name[0]}. ${this.last_name}`;  // "J. Doe"
});

// ALL WITHOUT storing extra data! 🎉
```

## Problem 5: Real-World Example

### The Email Change Nightmare:
```javascript
// With duplicate fields, you might have:
const userSchema = new mongoose.Schema({
  email: String,
  display_name: String,      // "John Doe <john@email.com>"
  profile_display: String,   // "John D."
  email_signature: String,   // "John Doe, Developer"
});

// User changes email from "john@email.com" to "john@gmail.com"
// You need to update 4 fields! 😱
await User.updateOne(
  { _id: userId },
  {
    email: "john@gmail.com",
    display_name: "John Doe <john@gmail.com>",
    profile_display: "John D.",
    email_signature: "John Doe, Developer"
  }
);
// Easy to miss one = BUGS!
```

### With virtuals:
```javascript
const userSchema = new mongoose.Schema({
  email: String,
  first_name: String,
  last_name: String,
  title: String
});

// All derived fields are VIRTUALS:
UserSchema.virtual('display_name').get(function() {
  return `${this.first_name} ${this.last_name} <${this.email}>`;
});

UserSchema.virtual('profile_display').get(function() {
  return `${this.first_name} ${this.last_name[0]}.`;
});

UserSchema.virtual('email_signature').get(function() {
  return `${this.first_name} ${this.last_name}, ${this.title}`;
});

// Change email ONCE:
await User.updateOne(
  { _id: userId },
  { email: "john@gmail.com" }  // ONLY ONE update!
);
// ALL virtuals automatically update! ✅
```

## When WOULD you store duplicate data?

### ONLY in these rare cases:

1. **Performance optimization** (denormalization)
```javascript
// If you query full_name millions of times and virtual calculations are slow
// But even then, use a middleware to sync:
EmployeeSchema.pre('save', function(next) {
  this.full_name = `${this.first_name} ${this.last_name}`;
  next();
});
```

2. **Search requirements**
```javascript
// If you need to search by full_name
// MongoDB can't search virtuals
// But then create a TEXT index on full_name
```

3. **Caching/Reporting**
```javascript
// For analytics/reports where data won't change
```

## Summary: Virtual vs Stored

| Aspect | Virtual | Stored (Duplicate) |
|--------|---------|-------------------|
| **Always correct** | ✅ Yes | ❌ Can become wrong |
| **Saves space** | ✅ Yes | ❌ Wastes space |
| **Easy to update** | ✅ Just update source | ❌ Must update everywhere |
| **Flexible formatting** | ✅ Multiple formats | ❌ Fixed format |
| **Can search on it** | ❌ No | ✅ Yes |
| **Performance** | Slower (calculated) | Faster (pre-stored) |

**The Golden Rule:** 
> Store the **source of truth** (first_name, last_name), derive everything else (full_name) through virtuals!

It's like having a recipe - you store the ingredients (first_name, last_name) and cook the dish (full_name) when needed, rather than cooking it and storing the cooked food for months! 🍳