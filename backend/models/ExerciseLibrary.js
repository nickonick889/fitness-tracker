//@ts-check

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const exerciseLibrarySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  bodyParts: {
    type: [String],
    default: [],
  },
  instructions: {
    type: [String],
    default: [],
  },
});

const ExerciseLibrary = model("ExerciseLibrary", exerciseLibrarySchema);

module.exports = ExerciseLibrary;