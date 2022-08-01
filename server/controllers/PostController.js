const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

class PostController {
    // @route GET /api/posts
    // @desc Get posts
    // @access private
    async getPosts(req, res) {
        try {
            const posts = await Post.find({ user: req.userId }).populate(
                'user',
                ['username'],
            );
            res.json({
                success: true,
                posts,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }

    // @route POST /api/posts
    // @desc Create post
    // @access private
    async createPosts(req, res) {
        const { title, description, url, status } = req.body;

        // Simple validation
        if (!title)
            return res
                .status(400)
                .json({ success: false, message: 'Title is required' });

        try {
            const newPost = new Post({
                title: title,
                description: description,
                url: url.startsWith('https://') ? url : `https://${url}`,
                status: status || 'TO LEARN',
                user: req.userId,
            });

            await newPost.save();

            res.json({
                success: true,
                message: 'Happy learning!!!',
                post: newPost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }

    // @route PUT /api/posts
    // @desc Update post
    // @access private
    async updatePosts(req, res) {
        const { title, description, url, status } = req.body;

        // Simple validation
        if (!title)
            return res
                .status(400)
                .json({ success: false, message: 'Title is required' });

        try {
            let updatedPost = {
                title: title,
                description: description || '',
                url:
                    (url.startsWith('https://') ? url : `https://${url}`) || '',
                status: status || 'TO LEARN',
            };

            const postUpdateCondition = {
                _id: req.params.id,
                user: req.userId,
            };

            updatedPost = await Post.findByIdAndUpdate(
                postUpdateCondition,
                updatedPost,
                { new: true },
            );

            // User not authorized to update the post or post not found
            if (!updatedPost)
                return res.status(401).json({
                    success: false,
                    message: 'Post not found or User not authorized',
                });

            res.json({
                success: true,
                message: 'Excellent progress!!!',
                post: updatedPost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }

    // @route DELETE /api/posts
    // @desc Delete post
    // @access private
    async deletePosts(req, res) {
        try {
            const postDeleteCondition = {
                _id: req.params.id,
                user: req.userId,
            };

            const deletedPost = await Post.findOneAndDelete(
                postDeleteCondition,
            );

            // User not authorized to update the post or post not found
            if (!deletedPost)
                return res.status(401).json({
                    success: false,
                    message: 'Post not found or User not authorized',
                });

            res.json({
                success: true,
                post: deletedPost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
}

module.exports = new PostController();
