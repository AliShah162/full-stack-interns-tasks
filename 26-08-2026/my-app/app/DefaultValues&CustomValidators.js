//Default Values & Custom Validators in Mongoose
// 1. Default Values
// Default values are automatically assigned to a field if you don't provide a value when creating a document.

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    // Static default - always the same
    role: {
        type: String,
        default: 'user'  // If not provided, becomes 'user'
    },
    
    // Static default for numbers
    age: {
        type: Number,
        default: 18
    },
    
    // Boolean default
    isActive: {
        type: Boolean,
        default: true
    },
    
    // Date default - current time
    createdAt: {
        type: Date,
        default: Date.now  // Function that returns current date
    },
    
    // Array default - empty array
    tags: {
        type: [String],
        default: []  // Empty array by default
    }
});

// Example:
const user = new User({ name: 'John' });
// user.role = 'user' (automatic)
// user.isActive = true (automatic)
// user.createdAt = current date (automatic)
// user.tags = [] (automatic)



//Dynamic Default Values (Functions):
const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        default: function() {
            // Generate a random order number
            return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
        }
    },
    
    createdAt: {
        type: Date,
        default: () => new Date()  // Arrow function
    },
    
    // Default based on other fields
    fullName: {
        type: String,
        default: function() {
            return this.firstName + ' ' + this.lastName;
        }
    }
});


//Default Values with Conditions:
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    
    // Default based on condition
    discount: {
        type: Number,
        default: function() {
            // If price > 100, give 10% discount
            return this.price > 100 ? 10 : 0;
        }
    },
    
    // Default based on environment
    currency: {
        type: String,
        default: process.env.DEFAULT_CURRENCY || 'USD'
    }
});



// 2. ---Custom Validators----
// Custom validators allow you to create your own validation rules beyond the built-in ones.

const userSchemA = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Must contain @ and .
                return value.includes('@') && value.includes('.');
            },
            message: 'Email must contain @ and .'
        }
    }
});

// Advanced Custom Validators:
const UserSchema = new mongoose.Schema({
    // 1. Validate with RegExp
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                // Must be 10 digits
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Must be 10 digits`
        }
    },
    
    // 2. Validate based on other fields
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Password must be different from username
                return value !== this.username;
            },
            message: 'Password cannot be same as username'
        }
    },
    
    // 3. Validate array
    tags: {
        type: [String],
        validate: {
            validator: function(tags) {
                // Must have at least 1 tag and at most 5
                return tags.length >= 1 && tags.length <= 5;
            },
            message: 'Must have between 1 and 5 tags'
        }
    },
    
    // 4. Validate with external API (async)
    username: {
        type: String,
        required: true,
        validate: {
            validator: async function(username) {
                // Check if username is available (not taken)
                const existing = await User.findOne({ username });
                return !existing;
            },
            message: 'Username is already taken'
        }
    }
});




// Full Final Example
const mongoose = require('mongoose');

const MyuserSchema = new mongoose.Schema({
    // ========== BASIC FIELDS ==========
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [20, 'Username cannot exceed 20 characters'],
        unique: true,
        trim: true,
        lowercase: true,
        // Custom: No special characters except underscore
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9_]+$/.test(v);
            },
            message: 'Username can only contain letters, numbers, and underscore'
        }
    },
    
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        // Custom: Advanced email validation
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        // Custom: Password strength
        validate: {
            validator: function(v) {
                // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message: 'Password must contain uppercase, lowercase, number, and special character'
        }
    },
    
    // ========== DEFAULT VALUES ==========
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user'
    },
    
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    
    // Dynamic default
    referralCode: {
        type: String,
        default: function() {
            return 'REF-' + Math.random().toString(36).substr(2, 8).toUpperCase();
        }
    },
    
    // ========== COMPLEX CUSTOM VALIDATION ==========
    age: {
        type: Number,
        min: [13, 'Must be at least 13 years old'],
        max: [120, 'Age cannot exceed 120'],
        validate: {
            validator: function(v) {
                // Must be an integer
                return Number.isInteger(v);
            },
            message: 'Age must be a whole number'
        }
    },
    
    // Array with custom validation
    interests: {
        type: [String],
        default: [],
        validate: {
            validator: function(v) {
                // No duplicates, max 10 items
                const unique = new Set(v);
                return unique.size === v.length && v.length <= 10;
            },
            message: 'Interests must be unique and at most 10 items'
        }
    },
    
    // Nested object validation
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true,
            // Custom: City must start with capital letter
            validate: {
                validator: function(v) {
                    return /^[A-Z][a-z]*$/.test(v);
                },
                message: 'City must start with a capital letter'
            }
        },
        zipCode: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    // US zip code: 5 digits or 5+4
                    return /^\d{5}(-\d{4})?$/.test(v);
                },
                message: 'Invalid zip code format'
            }
        }
    },
    
    // ========== TIMESTAMPS ==========
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    
    lastLogin: {
        type: Date,
        default: null
    },
    
    // ========== CROSS-FIELD VALIDATION ==========
    confirmPassword: {
        type: String,
        validate: {
            validator: function(v) {
                // Must match password field
                return v === this.password;
            },
            message: 'Passwords do not match'
        }
    }
});

// ========== USING THE SCHEMA ==========

const User = mongoose.model('User', userSchema);

async function testUserValidation() {
    try {
        // Test 1: Valid user
        const validUser = new User({
            username: 'john_doe',
            email: 'john@example.com',
            password: 'StrongP@ss123',
            age: 25,
            interests: ['coding', 'reading', 'gaming'],
            address: {
                street: '123 Main St',
                city: 'New York',
                zipCode: '10001'
            },
            confirmPassword: 'StrongP@ss123'
        });
        
        await validUser.save();
        console.log('✅ User saved successfully!');
        console.log('Referral Code:', validUser.referralCode); // Dynamic default
        
    } catch (error) {
        console.log('❌ Validation Error:');
        Object.keys(error.errors).forEach(key => {
            console.log(`  - ${key}: ${error.errors[key].message}`);
        });
    }
}

// testUserValidation();

