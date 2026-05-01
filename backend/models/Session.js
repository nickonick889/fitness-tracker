
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const setSchema = new Schema({
  weight: Number,
  reps: Number,
});

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sets: [setSchema],
});

const sessionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  },
  day: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Day",
  },
  exercises: [exerciseSchema],

  status: {
    type: String,
    default: "in_progress",
  },

  startTime: {
    type: Date,
    default: Date.now,
  },

  endTime: {
    type: Date,
    default: null,
  },
});

module.exports = model("Session", sessionSchema);