const express = require('express');

const router = express.Router();

const Post = require('../models/Post');

// @route POST /api/posts
// @desc Create post
// @access private

router.post('/', async (req, res) => {
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
        });
    } catch (error) {}
});
