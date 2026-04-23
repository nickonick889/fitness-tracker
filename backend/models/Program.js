//@ts-check

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const programSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProgramTemplate",
  },
  days: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Day"
    }
  ],
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
 createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Program = model('Program', programSchema)

module.exports = Program