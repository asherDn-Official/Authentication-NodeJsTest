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
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per `windowMs`
  message: {
    message:
      "Too many login attempts from this IP, please try again after 15 minutes",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);

module.exports = router;
