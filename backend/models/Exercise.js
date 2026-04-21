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
    default: Date.now,
  },
});

const Exercise = model('Exercise', exerciseSchema)

module.exports = Exercise