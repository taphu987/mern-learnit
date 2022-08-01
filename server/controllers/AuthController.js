const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
    // @route POST /api/auth/register
    // @desc Register a user
    // @access public
    async register(req, res) {
        const { username, password } = req.body;

        // Simple validation
        if (!username || !password)
            return res.status(400).json({
                success: false,
                message: 'Please enter a username and/or password.',
            });
        try {
            // Check for existing users
            const user = await User.findOne({ username: username });

            if (user)
                return res.status(400).json({
                    success: false,
                    message: 'Username already exists.',
                });

            // ALl good
            const hashedPassword = await argon2.hash(password);
            const newUser = new User({
                username: username,
                password: hashedPassword,
            });
            await newUser.save();

            // Return token
            const accessToken = jwt.sign(
                { userId: newUser._id },
                process.env.ACCESS_TOKEN_SECRET,
            );

            res.status(200).json({
                success: true,
                message: 'User saved successfully.',
                accessToken,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }

    // @route POST /api/auth/login
    // @desc Login the user
    // @access public
    async login(req, res) {
        const { username, password } = req.body;

        // Simple validation
        if (!username || !password)
            return res.status(400).json({
                success: false,
                message: 'Please enter a username and/or password.',
            });

        try {
            // Check for existing users
            const user = await User.findOne({ username: username });

            if (!user)
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect username or password',
                });

            //Username found
            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid)
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect username or password',
                });

            // All good
            // Return token
            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET,
            );

            res.status(200).json({
                success: true,
                message: 'User logged in successfully.',
                accessToken,
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

module.exports = new AuthController();
