require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

async function connectionToDb() {
    try {
        if (!process.env.DB_CONNECT) {
            throw new Error('Missing DB_CONNECT in .env file');
        }

        await mongoose.connect(process.env.DB_CONNECT);
        console.log('✅ Connected to MongoDB Atlas');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
    }
}

module.exports = connectionToDb;

