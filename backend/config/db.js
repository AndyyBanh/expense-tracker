const mongoose = require("mongoose"); // load mongoose

// define connectDB function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {}); // connect to MongoDB
        console.log("MongoDB connected"); // log if connected
    } catch (err) { 
        console.error("Error connecting to MongoDB", err); // log message and error
        process.exit(1);
    }
};

module.exports = connectDB;