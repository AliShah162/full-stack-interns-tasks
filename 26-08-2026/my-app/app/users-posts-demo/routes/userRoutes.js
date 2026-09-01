const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ==========================================
// USER ROUTES
// ==========================================

// CREATE - Add a new user
router.post('/', userController.createUser);

// READ - Get all users
router.get('/', userController.getAllUsers);

// READ - Get a specific user by ID (with their posts)
router.get('/:id', userController.getUserById);

// READ - Get user statistics (likes, views, etc.)
router.get('/:id/stats', userController.getUserStats);

// READ - Get user with just post count (without loading all posts)
router.get('/:id/count', userController.getUserWithPostCount);

// UPDATE - Edit a user
router.put('/:id', userController.updateUser);

// DELETE - Remove a user (and their posts)
router.delete('/:id', userController.deleteUser);

module.exports = router;