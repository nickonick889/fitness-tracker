const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const templateSetSchema = new Schema({
  weight: Number,
  reps: Number,
});


const templateExerciseSchema = new Schema(
  {
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExerciseLibrary",
      required: true,
    },
    name: String,
    sets: [templateSetSchema],
  }
);

const templateDaySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    exercises: [templateExerciseSchema]
  }
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