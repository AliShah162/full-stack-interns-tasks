const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// ==========================================
// POST ROUTES
// All routes start with: /api/posts
// ==========================================

// ==========================================
// 1. CREATE - Add a new post
// ==========================================
// Method: POST
// URL: /api/posts/
// Body: { title, content, authorId, category, tags }
// Response: Returns the created post
router.post('/', postController.createPost);

// ==========================================
// 2. READ - Get all posts
// ==========================================
// Method: GET
// URL: /api/posts/
// Response: Returns array of all posts
router.get('/', postController.getAllPosts);

// ==========================================
// 3. READ - Search posts by title or content
// ==========================================
// Method: GET
// URL: /api/posts/search?query=your_search_term
// Query: ?query=hello
// Response: Returns matching posts
// IMPORTANT: This MUST come before /:id routes!
router.get('/search', postController.searchPosts);

// ==========================================
// 4. READ - Get post analytics (statistics)
// ==========================================
// Method: GET
// URL: /api/posts/analytics
// Response: Returns stats like total posts, likes, views by category
// IMPORTANT: This MUST come before /:id routes!
router.get('/analytics', postController.getPostAnalytics);

// ==========================================
// 5. READ - Get posts by category
// ==========================================
// Method: GET
// URL: /api/posts/category/:category
// Example: /api/posts/category/Technology
// Response: Returns all posts in that category
// IMPORTANT: This MUST come before /:id routes!
router.get('/category/:category', postController.getPostsByCategory);

// ==========================================
// 6. READ - Get all posts by a specific user
// ==========================================
// Method: GET
// URL: /api/posts/user/:userId
// Example: /api/posts/user/60f7c5c8d99d8a1a2c8d4e5f
// Response: Returns all posts written by that user
// IMPORTANT: This MUST come before /:id routes!
router.get('/user/:userId', postController.getPostsByUser);

// ==========================================
// 7. READ - Get a single post by ID
// ==========================================
// Method: GET
// URL: /api/posts/:id
// Example: /api/posts/60f7c5c8d99d8a1a2c8d4e5f
// Response: Returns the post with the given ID
// NOTE: This is a GENERIC route - must come AFTER all specific routes!
router.get('/:id', postController.getPostById);

// ==========================================
// 8. UPDATE - Update an existing post
// ==========================================
// Method: PUT
// URL: /api/posts/:id
// Body: { title, content, category, tags, isPublished }
// Response: Returns the updated post
router.put('/:id', postController.updatePost);

// ==========================================
// 9. UPDATE - Like a post (increment like count)
// ==========================================
// Method: PUT
// URL: /api/posts/:id/like
// Example: /api/posts/60f7c5c8d99d8a1a2c8d4e5f/like
// Response: Returns the new like count
router.put('/:id/like', postController.likePost);

// ==========================================
// 10. DELETE - Remove a post
// ==========================================
// Method: DELETE
// URL: /api/posts/:id
// Example: /api/posts/60f7c5c8d99d8a1a2c8d4e5f
// Response: Returns success message
router.delete('/:id', postController.deletePost);

// ==========================================
// EXPORT ROUTER
// ==========================================
module.exports = router;