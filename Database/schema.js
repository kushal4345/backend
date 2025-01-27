const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true // Removes extra spaces from input
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Converts email to lowercase for consistency
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
