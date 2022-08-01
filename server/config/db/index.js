const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.weipm.mongodb.net/mern-learnit`,
        );
        console.log('MongoDB connected successfully!!!');
    } catch (error) {
        console.log('Connect failed!!!');
    }
}

module.exports = { connect };
