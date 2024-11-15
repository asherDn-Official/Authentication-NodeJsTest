const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  try {
    // Check if token exists in cookies
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access, no token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID from the token payload
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if the account is locked
    if (user.locked) {
      return res
        .status(403)
        .json({
          message: "Account is locked. Please contact admin for assistance.",
        });
    }

    // Attach the user information to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Protect Middleware Error:", error.message);
    res.status(401).json({ message: "Token is invalid or expired" });
  }
};

module.exports = { protect };
