const WorkoutSession = require("../models/Session");
const Day = require("../models/Day");
const express = require("express");

exports.getSessions = async (req, res) => {
  try {
    const sessions = await WorkoutSession.find({ user: req.user.userId });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSessionById = async (req, res) => {
  try {
    const session = await WorkoutSession.findById(req.params.sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.startSession = async (req, res) => {
    try {
        const session = await WorkoutSession.create({
            user: req.user.userId, 
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

exports.updateSession = async (req, res) => {
    const {sessionId, exercises} = req.body();

    const updated = await WorkoutSession.findByIdAndUpdate(
        sessionId,
        {exercises},
        {new: true},
    )
}

exports.endSession = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const session = await WorkoutSession.findByIdAndUpdate(
            sessionId,
            {
                endTime: Date.now(),
                status: "completed",
                duration: session.endTime - session.startTime,
            },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({message: "Session not found."});
        }

        await Day.findByIdAndUpdate(session.day, {
            status: "completed",
            completedAt: Date.now(),
        })

        res.status(200).json(session);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}