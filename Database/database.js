const mongoose = require('mongoose');


const data= async()=> {
    try {
        await mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    } catch (error) {
        console.error(error);
    }
}

module.exports = data;