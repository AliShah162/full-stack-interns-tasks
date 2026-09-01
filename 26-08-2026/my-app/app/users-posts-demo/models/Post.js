const mongoose = require('mongoose');

// ============================================
// 1. DEFINE THE POST SCHEMA (blueprint for blog posts)
// ============================================
const postSchema = new mongoose.Schema({
    // ---------- TITLE FIELD ----------
    title: {
        type: String,
        required: [true, 'Title is required'],        // Must have a title
        trim: true,                                   // Remove extra spaces
        minlength: [3, 'Title must be at least 3 characters'],   // Minimum length
        maxlength: [100, 'Title cannot exceed 100 characters']   // Maximum length
    },
    
    // ---------- CONTENT FIELD ----------
    content: {
        type: String,
        required: [true, 'Content is required'],      // Must have content
        minlength: [10, 'Content must be at least 10 characters'],  // Minimum content length
        maxlength: [5000, 'Content cannot exceed 5000 characters']  // Maximum content length
    },
    
    // ---------- AUTHOR FIELD (Relationship to User) ----------
    author: {
        type: mongoose.Schema.Types.ObjectId,   // This is a special ID type that references another document
        ref: 'User',                            // Tells Mongoose this refers to the User model
        required: [true, 'Author is required']  // Every post must have an author
    },
    // Think of this like: "author" stores the User's _id
    // Example: author: ObjectId("60f7c5c8d99d8a1a2c8d4e5f")
    
    // ---------- CATEGORY FIELD ----------
    category: {
        type: String,
        enum: ['Technology', 'Health', 'Education', 'Business', 'Entertainment', 'Other'],
        // ↑ Only allows these specific values (like a dropdown menu)
        default: 'Other'  // If not specified, defaults to 'Other'
    },
    
    // ---------- TAGS FIELD (Array of strings) ----------
    tags: {
        type: [String],  // Array of strings: ["JavaScript", "MongoDB", "Backend"]
        validate: {
            validator: function(tags) {
                return tags.length <= 5;  // Custom validation: max 5 tags
            },
            message: 'Cannot have more than 5 tags'  // Error message if validation fails
        },
        default: []  // If no tags provided, default is empty array
    },
    
    // ---------- LIKES FIELD ----------
    likes: {
        type: Number,
        default: 0,   // New posts start with 0 likes
        min: 0        // Can't go below 0 (no negative likes)
    },
    
    // ---------- VIEWS FIELD ----------
    views: {
        type: Number,
        default: 0,   // New posts start with 0 views
        min: 0        // Can't go below 0
    },
    
    // ---------- PUBLISHED STATUS ----------
    isPublished: {
        type: Boolean,
        default: true  // New posts are published by default (set to false for drafts)
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

// ---------- VIRTUAL: Reading Time ----------
// Calculates how long it takes to read the post
// Example: 500 words / 200 words per minute = ~3 minutes
postSchema.virtual('readingTime').get(function() {
    const wordsPerMinute = 200;           // Average reading speed
    const wordCount = this.content.split(' ').length;  // Count words by splitting on spaces
    const minutes = Math.ceil(wordCount / wordsPerMinute);  // Round up to nearest minute
    return `${minutes} min read`;         // Returns like "3 min read"
});

// ---------- VIRTUAL: Preview (shortened content) ----------
// Creates a preview of the content for blog listings
// Example: if content is 500 chars, shows first 100 chars + "..."
postSchema.virtual('preview').get(function() {
    if (this.content.length <= 100) return this.content;  // If short, show everything
    return this.content.substring(0, 100) + '...';       // Otherwise, truncate
});

// ---------- VIRTUAL: URL Slug ----------
// Creates a URL-friendly version of the title
// Example: "My Awesome Blog Post!" → "my-awesome-blog-post"
postSchema.virtual('slug').get(function() {
    return this.title
        .toLowerCase()                              // Convert to lowercase
        .replace(/[^a-zA-Z0-9]/g, '-')              // Replace any non-letter/number with -
        .replace(/-+/g, '-');                       // Replace multiple - with single -
});

// ---------- VIRTUAL: Author Name ----------
// Gets the author's name from the populated User document
// IMPORTANT: This only works if you call .populate('author') when querying
postSchema.virtual('authorName').get(function() {
    return this.author ? this.author.name : 'Unknown Author';  // If no author, show "Unknown"
});

// ============================================
// 4. MIDDLEWARE (runs automatically at certain times)
// ============================================

// ---------- PRE-SAVE MIDDLEWARE ----------
// Runs RIGHT BEFORE a post is saved to the database
// Here: If no tags are provided but a category is set, use the category as a tag
postSchema.pre('save', function(next) {
    // If there's a category AND the tags array is empty
    if (this.category && this.tags.length === 0) {
        this.tags.push(this.category);  // Add the category as a tag
        // Example: If category is "Technology", tags becomes ["Technology"]
    }
    next();  // IMPORTANT: Call next() to continue the save process
});

// ============================================
// 5. CREATE THE MODEL & EXPORT
// ============================================

const Post = mongoose.model('Post', postSchema);
module.exports = Post;  // Export so other files can use it