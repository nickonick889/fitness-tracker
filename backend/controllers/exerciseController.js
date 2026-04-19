const Exercise = require("../models/Exercise");
const ExerciseLibrary = require("../models/ExerciseLibrary");
const express = require("express");

exports.getExercises = async(req, res) => {
    try {
        const exercises = await ExerciseLibrary.find();
        res.status(200).json(exercises);
    } 
    catch (err) {
        res.status(500).json( { error: err.message } );
    }
}