const ProgramTemplate = require("../models/ProgramTemplate");
const ExerciseLibrary = require("../models/ExerciseLibrary");
const express = require("express");

exports.createTemplate = async (req, res) => {
    try {
        const template = await ProgramTemplate.create(req.body);

        res.status(200).json(template);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.seedTemplate = async (req, res) => {
  try {
    // Fetching exercise data from DB
    const chest = await ExerciseLibrary.findOne({name: "Diamond Press"});
    const back = await ExerciseLibrary.findOne({name: "One Arm Bent-over Row"});
    const legs = await ExerciseLibrary.findOne({name: "Sissy Squat"});

    if (!chest || !back || !legs) {
        return res.status(404).json({ message: "No exercise found in library." });
    }

    const sample = {
      name: "Push Pull Legs",
      days: [
        {
          name: "Push",
          exercises: [
            {
              exercise: chest._id,
              targetSets: 4,
              targetReps: 8
            }
          ]
        },
        {
          name: "Pull",
          exercises: [
            {
              exercise: back._id,
              targetSets: 4,
              targetReps: 10
            }
          ]
        },
        {
          name: "Legs",
          exercises: [
            {
              exercise: legs._id,
              targetSets: 3,
              targetReps: 5
            }
          ]
        }
      ]
    };

    const created = await ProgramTemplate.create(sample);

    res.json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};