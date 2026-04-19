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
    timestamps: false,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("hashedPassword")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt);
  } catch (err) {
    console.log({err: err.message});
  }
});

module.exports = model("User", userSchema);