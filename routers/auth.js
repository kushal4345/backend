const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../backend/schema.js');
const validation = require('../backend/helps.js');
const cors = require('cors');

// Middleware
router.use(cors());
router.use(express.json());

// Signup Route
router.post('/signup', async function (req, res) {
    try {
        console.log(req.body); // Log the incoming request body

        // Validate request body
        validation(req);

        // Extract data from request body
        const { userName, email, password, confirmPassword } = req.body;

        // Check if confirmPassword is provided
        if (!confirmPassword) {
            throw new Error("ConfirmPassword is required");
        }

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            throw new Error("Password and ConfirmPassword do not match");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            userName,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        // Send success response
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(400).send({ message: error.message });
    }
});

// Login Route
router.post('/login', async function (req, res) {
    try {
        console.log(req.body); // Log the incoming request body

        // Extract data from request body
        const { email, password } = req.body;

        // Find the user with the given email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            throw new Error("User not found");
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);

        // Check if password is correct
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        // Send success response
        res.status(200).send({ message: "Login successful" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(400).send({ message: error.message });
    }
});

module.exports = router;