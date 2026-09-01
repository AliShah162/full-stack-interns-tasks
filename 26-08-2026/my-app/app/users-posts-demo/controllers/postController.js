const Post = require('../models/Post');
const User = require('../models/User');

// ==========================================
// 1. CREATE - Make a new post
// ==========================================
const createPost = async (req, res) => {
    try {
        const { title, content, authorId, category, tags } = req.body;

        const user = await User.findById(authorId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const post = new Post({ title, content, author: authorId, category, tags });
        await post.save();

        res.status(201).json({
            success: true,
            data: post,
            message: 'Post created successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// 2. READ - Get all posts
// ==========================================
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// 3. READ - Get one post by ID
// ==========================================
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.status(200).json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// 4. READ - Get posts by user
// ==========================================
const getPostsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const posts = await Post.find({ author: userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// 5. READ - Get posts by category
// ==========================================
const getPostsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        
        const posts = await Post.find({ category })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// 6. READ - Search posts
// ==========================================
const searchPosts = async (req, res) => {
    try {
        const { query } = req.query;
        
        const posts = await Post.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        })
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// 7. READ - Get post analytics
// ==========================================
const getPostAnalytics = async (req, res) => {
    try {
        const analytics = await Post.aggregate([
            {
                $group: {
                    _id: '$category',
                    totalPosts: { $sum: 1 },
                    totalLikes: { $sum: '$likes' },
                    totalViews: { $sum: '$views' },
                    averageLikes: { $avg: '$likes' },
                    averageViews: { $avg: '$views' }
                }
            },
            { $sort: { totalPosts: -1 } }
        ]);

        res.status(200).json({
            success: true,
            data: analytics
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// 8. UPDATE - Edit a post
// ==========================================
const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.status(200).json({
            success: true,
            data: post,
            message: 'Post updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// 9. UPDATE - Like a post
// ==========================================
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        post.likes += 1;
        await post.save();

        res.status(200).json({
            success: true,
            data: { likes: post.likes },
            message: 'Post liked successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// 10. DELETE - Remove a post
// ==========================================
const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==========================================
// ✅ EXPORT ALL 10 FUNCTIONS
// ==========================================
module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    getPostsByUser,        // ✅ ADDED
    getPostsByCategory,    // ✅ ADDED
    searchPosts,           // ✅ ADDED
    getPostAnalytics,      // ✅ ADDED
    updatePost,
    likePost,
    deletePost
};