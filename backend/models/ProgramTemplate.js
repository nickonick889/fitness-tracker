const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const templateExerciseSchema = new Schema(
  {
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise", // reference your Exercise model (Are we using the DB to populate or hard coding)
      required: true,
    },
    targetSets: {
      type: Number,
      required: true,
    },
    targetReps: {
      type: Number,
      required: true,
    }
  },
  { _id: false }
);

const templateDaySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    exercises: [templateExerciseSchema]
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
    days: [templateDaySchema],
  },
  {
    timestamps: true,
  }
);

module.exports = model("ProgramTemplate", programTemplateSchema);