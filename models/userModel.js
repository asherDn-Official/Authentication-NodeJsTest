const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], //only 2 roles accepted
    default: "user", // Default role is user
  },
  loginAttempts: {
    type: Number,
    default: 0,
  },
  locked: {
    type: Boolean,
    default: false,
  },
  lockUntil: {
    type: Date,
    default: null,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Locked account check
userSchema.methods.isLocked = function () {
  return this.locked && this.lockUntil > Date.now();
};

const User = mongoose.model("User", userSchema);
module.exports = User;
