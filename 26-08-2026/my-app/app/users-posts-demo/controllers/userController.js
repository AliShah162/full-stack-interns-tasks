const User = require('../models/User');
const Post = require('../models/Post');

// ==========================================
// 1. CREATE - Add a new user
// ==========================================
const createUser = async (req, res) => {
    try {
        // Get user data from the request body
        const { name, email, age, bio } = req.body;
        
        // Check if email is already taken
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists!'
            });
        }

        // Create and save the new user
        const user = new User({ name, email, age, bio });
        await user.save();

        // Send success response
        res.status(201).json({
            success: true,
            data: user,
            message: 'User created successfully!'
        });
    } catch (error) {
        // Send error response
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// 2. READ - Get all users
// ==========================================
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();  // Get ALL users from DB!!!!
        res.status(200).json({
            success: true,
            count: users.length,  // How many users found
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// 3. READ - Get one user by ID
// ==========================================
const getUserById = async (req, res) => {
    try {
        // Find user by ID from URL parameter
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// 4. UPDATE - Edit an existing user
// ==========================================
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,      // Which user to update
            req.body,           // What to update (new data)
            {
                new: true,          // Return the updated version
                runValidators: true // Check if new data is valid
            }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user,
            message: 'User updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// 5. DELETE - Remove a user
// ==========================================
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Also delete ALL posts by this user
        await Post.deleteMany({ author: user._id });

        res.status(200).json({
            success: true,
            message: 'User and their posts deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// ==========================================
// GET USER WITH POST COUNT
// ==========================================
const getUserWithPostCount = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const postCount = await Post.countDocuments({ author: user._id });

        res.status(200).json({
            success: true,
            data: {
                ...user.toObject(),
                postCount
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// GET USER STATS
// ==========================================
const getUserStats = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const postStats = await Post.aggregate([
            { $match: { author: user._id } },
            {
                $group: {
                    _id: null,
                    totalPosts: { $sum: 1 },
                    totalLikes: { $sum: '$likes' },
                    totalViews: { $sum: '$views' },
                    averageLikes: { $avg: '$likes' }
                }
            }
        ]);

        const stats = postStats.length > 0 ? postStats[0] : {
            totalPosts: 0,
            totalLikes: 0,
            totalViews: 0,
            averageLikes: 0
        };

        res.status(200).json({
            success: true,
            data: {
                user: user.toObject(),
                statistics: stats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// EXPORT all functions
// ==========================================
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserWithPostCount,  // ← ADD THIS
    updateUser,
    deleteUser,
    getUserStats            // ← ADD THIS
};