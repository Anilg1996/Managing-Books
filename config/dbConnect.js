const mongoose = require("mongoose");

const dbConnect = () => {
    try {
        const connect = mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("Database error");
    }
    
};

module.exports = dbConnect;
