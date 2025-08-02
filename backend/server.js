require("dotenv").config(); // Load environment variables from a .env file into process.env keeps sensitive info out of source code
// import modules
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const saleRoutes = require("./routes/salesRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

// create object to access express methods
const app = express();

// Middleware to handle CORS
app.use(
    cors({ 
        origin: process.env.CLIENT_URL || "*", // define domains allowed
        methods: ["GET", "POST", "PUT", "DELETE"], // define methods allowed
        allowedHeaders: ["Content-Type", "Authorization"] // define request headers allowed 
    })
);

app.use(express.json()); // express method that parse JSON data

connectDB(); // connects server js file to MongoDB database

// APIs
app.use("/api/v1/auth", authRoutes); // auth API
app.use("/api/v1/expense", expenseRoutes); // expense API
app.use("/api/v1/dashboard", dashboardRoutes); // dashboard API
app.use("/api/v1/sales", saleRoutes); // Sales API
app.use("/api/v1/inventory", inventoryRoutes); // Inventory API

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000; // define port server is running on
app.listen(PORT, () => { // start server
    console.log(`Server running on port ${PORT}`);
})

