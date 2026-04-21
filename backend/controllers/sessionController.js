const WorkoutSession = require("../models/Session");
const express = require("express");

exports.startSession = async (req, res) => {
    try {
        const session = await WorkoutSession.create({
            user: req.params.userId,
            program: req.body.programId,
            day: req.body.dayId,
            startTime: new Date(),
            status: "in_progress",
        });

        res.status(200).json(session);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.endSession = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const session = await WorkoutSession.findByIdAndUpdate(
            sessionId,
            {
                endTime: newDate(),
                status: "completed",
                duration: session.endTime - session.startTime,
            },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({message: "Session not found."});
        }

        res.json(session);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}