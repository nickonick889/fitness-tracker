//@ts-check

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const daySchema = new Schema({
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
    required: true,
  },
  exercises: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
    }
  ],
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Day = model('Day', daySchema)

module.exports = Day