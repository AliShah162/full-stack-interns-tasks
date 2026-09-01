// ==========================================
// 1. LOAD ENVIRONMENT VARIABLES
// ==========================================
// Loads variables from .env file into process.env
// Example: MONGODB_URI, PORT, etc.
require('dotenv').config();

// ==========================================
// 2. IMPORT REQUIRED PACKAGES
// ==========================================
const express = require('express');    // Web framework for building APIs
const mongoose = require('mongoose');  // MongoDB ODM (Object Data Modeling)

// ==========================================
// 3. CREATE EXPRESS APP
// ==========================================
const app = express();

// Set port from environment variable or use 5000 as default
const PORT = process.env.PORT || 5000;

// ==========================================
// 4. MIDDLEWARE
// ==========================================
// Middleware = functions that run before routes

// Parse JSON data from request body (for POST/PUT requests)
app.use(express.json());

// Parse URL-encoded data from forms (extended: true allows nested objects)
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 5. IMPORT ROUTES
// ==========================================
// Routes handle different API endpoints
const userRoutes = require('./routes/userRoutes');  // User-related routes
const postRoutes = require('./routes/postRoutes');  // Post-related routes

// ==========================================
// 6. MOUNT ROUTES
// ==========================================
// All user routes start with /api/users
// Example: /api/users/, /api/users/123, etc.
app.use('/api/users', userRoutes);

// All post routes start with /api/posts
// Example: /api/posts/, /api/posts/123, etc.
app.use('/api/posts', postRoutes);

// ==========================================
// 7. HOME ROUTE (Root URL)
// ==========================================
// When you visit http://localhost:5000/
// Shows a welcome page with all available endpoints
app.get('/', (req, res) => {
    res.send(`
        <h1>📚 Users & Posts API</h1>
        <p>Welcome to the Users & Posts API!</p>
        <h2>Available Endpoints:</h2>
        
        <h3>👤 Users:</h3>
        <ul>
            <li>POST /api/users - Create user</li>
            <li>GET /api/users - Get all users</li>
            <li>GET /api/users/:id - Get user with posts</li>
            <li>GET /api/users/:id/stats - Get user stats</li>
            <li>GET /api/users/:id/count - Get user with post count</li>
            <li>PUT /api/users/:id - Update user</li>
            <li>DELETE /api/users/:id - Delete user</li>
        </ul>
        
        <h3>📝 Posts:</h3>
        <ul>
            <li>POST /api/posts - Create post</li>
            <li>GET /api/posts - Get all posts</li>
            <li>GET /api/posts/search?query=keyword - Search posts</li>
            <li>GET /api/posts/analytics - Get post analytics</li>
            <li>GET /api/posts/category/:category - Get posts by category</li>
            <li>GET /api/posts/user/:userId - Get posts by user</li>
            <li>GET /api/posts/:id - Get single post</li>
            <li>PUT /api/posts/:id - Update post</li>
            <li>PUT /api/posts/:id/like - Like a post</li>
            <li>DELETE /api/posts/:id - Delete post</li>
        </ul>
    `);
});

// ==========================================
// 8. CONNECT TO DATABASE & START SERVER
// ==========================================
// This function connects to MongoDB and starts the server
const startServer = async () => {
    try {
        // Connect to MongoDB using the URI from .env file
        // Example: mongodb://localhost:27017/my_database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected successfully!');
        
        // Start the server and listen for requests
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
            console.log(`📍 http://localhost:${PORT}`);
        });
    } catch (error) {
        // If connection fails, log error and exit
        console.error('❌ Error connecting to MongoDB:', error.message);
        process.exit(1);  // Exit with error code
    }
};

// Call the function to start everything
startServer();