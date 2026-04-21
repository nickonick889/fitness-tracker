const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const workoutSessionSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        program: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Program",
            required: true,
        },
        day: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Day",
            required: true,
        },
        startTime: {
            type: Date,
            default: Date.now(),
        },
        endTime: {
            type: Date,
        },
        duration: {
            type: Number,
        },
        exercises: [
            {
                exercise: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Exercise",
                },
                setsCompleted: Number,
                repsCompleted: Number,
            }
        ],
        status: {
            type: String,
            enum: ["in_progress", "completed"],
            default: "in_progress",
        }
    },
    {timestamps: true}
);

module.exports = model("WorkoutSession", workoutSessionSchema);