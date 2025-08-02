const User = require('../models/User');
const jwt = require("jsonwebtoken"); // load jwt

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,  {expiresIn: "1h" });
}

// export functions to auth routes
// Register User
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl} = req.body;

    // Validation: Check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required "}); // return error message 
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }

        // Create User 
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res 
            .status(500)
            .json({ message: "Error registering user", error: err.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body; // Destructure 'email' and 'password' properties from the request body
    if (!email || ! password) {
        return res.status(400).json({ message: "All fields are required!"});
    }

    try {
        const user = await User.findOne({ email }); // check if email exists
        if (!user || !(await user.comparePassword(password))) { // if no email or passwords don't match return error
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // If login is successful, respond with user data and JWT token
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res 
            .status(500)
            .json({ message: "Error registering user", error: err.message });   
    }
};

// Get User Info
exports.getUserInfo = async (req, res) => {
    try {
        // Find the user in the database by their ID (attached to req.user by auth middleware)
        // Exclude the password field from the result using .select("-password")
        const user = await User.findById(req.user.id).select("-password"); 
        // If user is not found, respond with 404 Not Found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // If user is found, respond with 200 OK and send the user object (without password) 
        res.status(200).json(user);
    } catch (err) {
        // If an error occurs (e.g. database issue), respond with 500 Internal Server Error
        res 
            .status(500)
            .json({ message: "Error registering user", error: err.message }); 
    }
};