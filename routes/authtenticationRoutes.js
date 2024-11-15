const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getProfile,
} = require("../controllers/authenticationControllers");
const { protect } = require("../middlewares/authenticationMiddleware");
const rateLimit = require("express-rate-limit");

// Define rate limiter for login route
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
    message:
      "Too many login attempts from this IP, please try again after 15 minutes",
  },
  standardHeaders: true, 
  legacyHeaders: false,
});

// Resister a User
router.post("/register", register);

// Login to a User Account
router.post("/login",loginLimiter, login);

// Logout a User
router.post("/logout", logout);

// access a profie data (protected) login must
router.get("/profile", protect, getProfile);

module.exports = router;
