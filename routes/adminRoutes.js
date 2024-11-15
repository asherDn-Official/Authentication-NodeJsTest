const express = require("express");
const router = express.Router();
const { unlockUserAccount } = require("../controllers/adminControllers");
const { protect } = require("../middlewares/authenticationMiddleware");
const adminOnly = require("../middlewares/adminMiddlewares");

// Admin route to unlock user account manually
router.post("/admin/unlock", protect, adminOnly, unlockUserAccount);

module.exports = router;
