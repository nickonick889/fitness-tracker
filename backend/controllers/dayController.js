const Day = require("../models/Day");
const Program = require("../models/Program");

exports.createNewDay = async (req, res) => {
  try {
    const programId = req.params.programId;

    const count = await Day.countDocuments({ program: programId });
    const defaultName = `Day ${count + 1}`;

    const newDay = await Day.create({
      program: programId,
      name: defaultName,
      exercises: [],
    });

    // keeping Program in sync
    await Program.findByIdAndUpdate(programId, {
      $push: { days: newDay._id },
    });

    res.status(200).json(newDay);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDayName = async (req, res) => {
  try {
    const { dayId } = req.params;
    const { name } = req.body;

    const updated = await Day.findByIdAndUpdate(
      dayId,
      { name },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDay = async (req, res) => {
  try {
    const { dayId } = req.params;

    console.log("BODY:", req.body);
    console.log("DAY ID:", req.params.dayId);

    if (!req.body.exercises) {
      return res.status(400).json({ message: "Exercises missing" });
    }

    const updated = await Day.findByIdAndUpdate(
      dayId,
      { exercises: req.body.exercises },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Day not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("updateDay error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getDays = async (req, res) => {
  try {
    const { dayId } = req.params;

    const day = await Day.findById(dayId);

    if (!day) {
      return res.status(404).json({ message: "Day not found" });
    }

    res.json(day);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.deleteDay = async (req, res) => {
  try {
    const { dayId } = req.params;

    const day = await Day.findById(dayId);

    if (!day) {
      return res.status(404).json({ message: "Day not found" });
    }

    const programId = day.program;

    // delete day
    await Day.findByIdAndDelete(dayId);

    // remove from program.days array
    await Program.findByIdAndUpdate(programId, {
      $pull: { days: dayId },
    });

    res.json({ message: "Day deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addExerciseToDay = async (req, res) => {
    try {
        const dayId = req.params.dayId;
        const {exerciseId} = req.body;

        const updated = await Day.findByIdAndUpdate(
            dayId,
            { $addToSet: { exercises: exerciseId } },
            { new: true }
        ).populate("exercises");

        res.json(updated);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}