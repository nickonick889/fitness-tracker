const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const {Schema, model } = mongoose;

const userSchema = new Schema(
  {
  username:{
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword:{
    type: String,
    required: true,
  }
})

const User = model ("User", userSchema);
module.exports = User;
