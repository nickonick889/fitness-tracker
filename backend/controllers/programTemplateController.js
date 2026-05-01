const ProgramTemplate = require("../models/ProgramTemplate");
const ExerciseLibrary = require("../models/ExerciseLibrary");
const express = require("express");
const mongoose = require("mongoose");

exports.createTemplate = async (req, res) => {
    try {
        const template = await ProgramTemplate.create(req.body);

        res.status(200).json(template);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getTemplates = async (req, res) => {
  try {

    const templates = await ProgramTemplate.find();
    res.json(templates);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
          _id: new mongoose.Types.ObjectId(),
          name: "Push",
          exercises: [
            {
              exerciseId: chest._id,
              sets: [
                { weight: 100, reps: 8 },
                { weight: 100, reps: 8 },
                { weight: 100, reps: 8 },
              ]
            }
          ]
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Pull",
          exercises: [
            {
              exerciseId: back._id,
              sets: [
                { weight: 100, reps: 10 },
                { weight: 100, reps: 10 },
                { weight: 100, reps: 10 },
              ]
            }
          ]
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Legs",
          exercises: [
            {
              exerciseId: legs._id,
              sets: [
                { weight: 100, reps: 10 },
                { weight: 100, reps: 10 },
                { weight: 100, reps: 10 },
              ]
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
},

exports.seedTemplate2 = async (req, res) => {
  try {
    // Fetching exercise data from DB
    const chest = await ExerciseLibrary.findOne({name: "Diamond Press"});
    const back = await ExerciseLibrary.findOne({name: "One Arm Bent-over Row"});
    const legs = await ExerciseLibrary.findOne({name: "Sissy Squat"});
    const shoulders = await ExerciseLibrary.findOne({name: "Arnold Press"});
    const arms = await ExerciseLibrary.findOne({name: "One arm Revers Wrist Curl"});

    if (!chest || !back || !legs) {
        return res.status(404).json({ message: "No exercise found in library." });
    }

    const sample = {
      name: "7 days Push Pull Legs",
      days: [
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Push day 1",
          exercises: [
            {
              exerciseId: chest._id,
              sets: [
                { weight: 100, reps: 8 },
                { weight: 100, reps: 8 },
                { weight: 100, reps: 8 },
              ]
            }
          ]
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Pull day 2",
          exercises: [
            {
              exerciseId: back._id,
              sets: [
                { weight: 100, reps: 10 },
                { weight: 100, reps: 10 },
                { weight: 100, reps: 10 },
              ]
            }
          ]
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Legs day 3",
          exercises: [
            {
              exerciseId: legs._id,
              sets: [
                { weight: 100, reps: 5 },
                { weight: 100, reps: 5 },
                { weight: 100, reps: 5 },
              ]
            }
          ]
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Shoulders day 4",
          exercises: [
            {
              exerciseId: shoulders._id,
              sets: [
                { weight: 100, reps: 8 },
                { weight: 100, reps: 8 },
                { weight: 100, reps: 8 },
              ]
            }
          ]
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Arms day 5",
          exercises: [
            {
              exerciseId: arms._id,
              sets: [
                { weight: 100, reps: 10 },
                { weight: 100, reps: 10 },
                { weight: 100, reps: 10 },
              ]
            }
          ]
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Push day 6",
          exercises: [
            {
              exerciseId: chest._id,
              sets: [
                { weight: 100, reps: 8 },
                { weight: 100, reps: 8 },
                { weight: 100, reps: 8 },
              ]
            }
          ]
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Pull day 7",
          exercises: [
            {
              exerciseId: back._id,
              sets: [
                { weight: 100, reps: 10 },
                { weight: 100, reps: 10 },
                { weight: 100, reps: 10 },
              ]
            }
          ]
        },
      ]
    };



    const created = await ProgramTemplate.create(sample);

    res.json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};