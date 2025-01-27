const express = require('express');
const jwt = require('jsonwebtoken'); // Import jwt
const router = express.Router();
const User = require('../Database/schema.js');
const parser = require('cookie-parser');
const authenticate = require('../controllers/authenticate.js');

router.use(parser());
router.get('/profiledata', authenticate, async function (req, res) {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send("User  not found");
        }
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;