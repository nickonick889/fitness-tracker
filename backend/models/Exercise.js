//@ts-check

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const exerciseSchema = new Schema({
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExerciseLibrary",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  restTime: {
    type: Number,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

const User = model("User", userSchema);

module.exports = User;
