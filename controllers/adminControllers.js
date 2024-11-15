const User = require("../models/userModel");

// Manually unlock a locked user account
const unlockUserAccount = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Unlock the user account
    user.locked = false;
    user.loginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    res
      .status(200)
      .json({ message: `User ${user.email} has been unlocked successfully.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { unlockUserAccount };
