const express = require('express');

const router = express.Router();
const verifyToken = require('../middlewares/auth');

const PostController = require('../controllers/PostController');

// @route GET /api/posts
// @desc Get posts
// @access private
router.get('/', verifyToken, PostController.getPosts);

// @route POST /api/posts
// @desc Create post
// @access private
router.post('/', verifyToken, PostController.createPosts);

// @route PUT /api/posts
// @desc Update post
// @access private
router.put('/:id', verifyToken, PostController.updatePosts);

// @route DELETE /api/posts
// @desc Delete post
// @access private
router.delete('/:id', verifyToken, PostController.deletePosts);

module.exports = router;
