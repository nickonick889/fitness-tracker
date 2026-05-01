//@ts-check

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const programSchema = new Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  days: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Day"
    }
  ],
});

const Program = model('Program', programSchema)

module.exports = Program


//GRAVEYARD CODE

// const setSchema = new mongoose.Schema({
//   weight: Number,
//   reps: Number,
// });

// const exerciseSchema = new mongoose.Schema({
//   exerciseId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "ExerciseLibrary",
//   },
//   name: String,
//   sets: [setSchema],
// });

// const daySchema = new mongoose.Schema({
//   name: String,
//   exercises: [exerciseSchema],
// });
