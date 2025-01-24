const express = require('express');
const app = express();
const cors = require('cors');
const data = require('./database.js');
const router = require('./routers/auth.js');


router.use(express.json());
app.use(cors());
app.use('/api', router); 

const databaseConnection = async () => {
    try {
        await data(); 
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

databaseConnection();