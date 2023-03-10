const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 256,
  },

  email: {
    type: String,
    required: true,
    min: 6,
    max: 256,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  role: {
    type: String,
    default: "user"
  }
});

module.exports = mongoose.model("User", userSchema);
