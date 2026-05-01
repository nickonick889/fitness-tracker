const Session = require("../models/Session");
const Day = require("../models/Day");

// Get all sessions for the logged-in user
exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.userId })
      .populate("day")
      .populate("program")
      .sort({ startTime: -1 });

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Start session
exports.startSession = async (req, res) => {
  try {
    const { programId, dayId } = req.body;

    const day = await Day.findById(dayId);

    if (!day) {
      return res.status(404).json({ error: "Day not found" });
    }

    // copy exercises from Day
    const exercises = day.exercises.map((ex) => ({
      name: ex.name,
      sets: ex.sets.map((s) => ({
        weight: s.weight || 0,
        reps: s.reps || 0,
      })),
    }));

    const session = await Session.create({
      user: req.user.userId,
      program: programId,
      day: dayId,
      exercises,
      status: "in_progress",
      startTime: new Date(),
    });

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get session
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update session (save inputs)
exports.updateSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { exercises } = req.body;

    const updated = await Session.findByIdAndUpdate(
      sessionId,
      { exercises },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// End session
exports.endSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    session.status = "completed";
    session.endTime = new Date();

    await session.save();

    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};