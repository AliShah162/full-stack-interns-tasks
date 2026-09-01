const mongoose = require('mongoose');

// ============================================
// 1. DEFINE THE USER SCHEMA (blueprint for user data)
// ============================================
const userSchema = new mongoose.Schema({
    // ---------- NAME FIELD ----------
    name: {
        type: String,
        required: [true, 'Name is required'],        // Must provide a name
        trim: true,                                   // Remove extra spaces: "  John  " → "John"
        minlength: [2, 'Name must be at least 2 characters'],  // At least 2 chars
        maxlength: [50, 'Name cannot exceed 50 characters']     // At most 50 chars
    },
    
    // ---------- EMAIL FIELD ----------
    email: {
        type: String,
        required: [true, 'Email is required'],       // Must provide an email
        unique: true,                                 // No two users can have same email
        lowercase: true,                              // Convert to lowercase: "John@Email.com" → "john@email.com"
        trim: true,                                   // Remove extra spaces
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']  // Email format validation
    },
    
    // ---------- AGE FIELD ----------
    age: {
        type: Number,
        min: [13, 'Must be at least 13 years old'],   // Minimum age
        max: [120, 'Age cannot exceed 120']           // Maximum age
    },
    
    // ---------- BIO FIELD ----------
    bio: {
        type: String,
        maxlength: [200, 'Bio cannot exceed 200 characters'],  // Short bio limit
        default: ''                                           // If not provided, default is empty string
    },
    
    // ---------- PROFILE PICTURE ----------
    profilePicture: {
        type: String,
        default: 'default-avatar.png'                // Default avatar if user doesn't upload one
    },
    
    // ---------- ACTIVE STATUS ----------
    isActive: {
        type: Boolean,
        default: true                                // New users are active by default
    }
    
// ============================================
// 2. SCHEMA OPTIONS (extra settings)
// ============================================
}, {
    timestamps: true,        // Automatically adds createdAt & updatedAt fields
    toJSON: { virtuals: true },   // Include virtuals when converting to JSON (API responses)
    toObject: { virtuals: true }  // Include virtuals when converting to plain objects
});

// ============================================
// 3. VIRTUALS (calculated properties - NOT stored in DB)
// ============================================

// ---------- VIRTUAL: Get all posts by this user ----------
// This creates a "relationship" between User and Post collections
// When you access user.posts, Mongoose will fetch all posts where author = user._id
userSchema.virtual('posts', {
    ref: 'Post',              // Which collection to look in (Post model)
    localField: '_id',        // Field in User model to match
    foreignField: 'author',   // Field in Post model to match against
    justOne: false            // false = get ALL matching posts (not just one)
});

// ---------- VIRTUAL: Count user's posts ----------
// This counts how many posts the user has
// Example: if user has 5 posts, user.postCount returns 5
userSchema.virtual('postCount').get(function() {
    return this.posts ? this.posts.length : 0;   // If posts exist, count them; otherwise return 0
});

// ---------- VIRTUAL: Display name in uppercase ----------
// This returns the user's name in ALL CAPS
// Example: if user.name = "John", user.displayName returns "JOHN"
userSchema.virtual('displayName').get(function() {
    return this.name.toUpperCase();
});

// ============================================
// 4. MIDDLEWARE (runs automatically at certain times)
// ============================================

// ---------- PRE-SAVE MIDDLEWARE ----------
// This runs RIGHT BEFORE a user is saved to the database
// Useful for: hashing passwords, formatting data, validation, etc.


// ============================================
// 5. CREATE THE MODEL & EXPORT
// ============================================

const User = mongoose.model('User', userSchema);  // Create the User model from schema
module.exports = User;                           // Export so other files can use it