const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL
const mongoURL = process.env.MONGODB_URL_Local; // local database 
// const mongoURL = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(mongoURL);

// Get the default connection
const db = mongoose.connection;

// Event listeners
db.on('connected', () => {
    console.log('connected to MongoDB server');
});
db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});
db.on('disconnected', () => {
    console.log('MongoDB disconnection');
});

// This line exports the database connection object (db) so it can be used in other files
module.exports = db;
