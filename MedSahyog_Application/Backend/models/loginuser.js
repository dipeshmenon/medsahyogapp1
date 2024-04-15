// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['admin', 'doctor', 'user'], // Allowed user types
        required: true
    }
});

module.exports = mongoose.model('Loginuser', userSchema);
