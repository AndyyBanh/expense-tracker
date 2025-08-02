const jwt = require('jsonwebtoken');
const User = require('../models/User');

// export middleware function protect
exports.protect = async (req, res, next) => {
    // Extract the token from the "Authorization" header 
    let token = req.headers.authorization?.split(" ")[1];
    // If no token is found, return 401 Unauthorized
    if (!token) return res.status(401).json({ message: "Not authorized, no token "});

    try {
        // Verify the token using the secret key stored in environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Fetch the user from the database using the ID stored in the decoded token
        // Exclude the password field from the user data for security
        req.user = await User.findById(decoded.id).select('-password');
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // If the token is invalid or expired, respond with 401 Unauthorized
        res.status(401).json({ message: "Not authorized, token failed "});
    }
}