const User = require("../models/userModel");

const adminOnly = async (req, res, next) => {
  const user = req.user;

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = adminOnly;
