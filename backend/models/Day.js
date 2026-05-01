//@ts-check

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const setSchema = new mongoose.Schema({
  weight: Number,
  reps: Number,
});

const dayExerciseSchema = new mongoose.Schema({
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExerciseLibrary",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sets: [setSchema],
});

const daySchema = new Schema({
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
    required: true,
  },
  exercises: [dayExerciseSchema],
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    default: "planned",
  },
  completedAt: {
    type: Date,
    default: null,
  },
});

const Day = model('Day', daySchema)

module.exports = Day