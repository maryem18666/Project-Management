
const mongoose = require("mongoose");

// Définir le modèle User
const User = mongoose.model("User", {
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = User;
