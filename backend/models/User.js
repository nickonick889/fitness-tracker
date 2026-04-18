const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

// ChatGPT code, will change later
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("hashedPassword")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("hashedPassword")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = model("User", userSchema);