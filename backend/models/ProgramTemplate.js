const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const templateExerciseSchema = new Schema(
  {
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise", // reference your Exercise model
      required: true,
    },
    targetSets: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const programTemplateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    exercises: [templateExerciseSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = model("ProgramTemplate", programTemplateSchema);