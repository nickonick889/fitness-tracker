const Program = require("../models/Program");
const Day = require("../models/Day");

exports.addProgram = async (req, res) => {
    try {
        const userId = req.user.userId;
        const count = await Program.countDocuments({ user: userId });
        const defaultName = `Program ${count + 1}`;

        const newProgram = await Program.create({
            user: userId,
            name: defaultName,
            days: [],
        });

        res.status(200).json(newProgram);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateProgram = async (req, res) => {
  try {
    const updated = await Program.findOneAndUpdate(
      {
        _id: req.params.programId,
        user: req.user.userId,
      },
      {
        name: req.body.name,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPrograms = async (req, res) => {
    try {
        const userId = req.user.userId;
        const programs = await Program.find({ user: userId });

        res.status(200).json(programs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getProgramById = async (req, res) => {
  try {
    const program = await Program.findOne({
      _id: req.params.programId,
      user: req.user.userId,
    }).populate("days");

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json(program);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addDayToProgram = async (req, res) => {
    try {
        const programId = req.params.programId;
        const {name} = req.body;

        const newDay = await Day.create({
            program: programId,
            name: name || "New Day",
            exercises: [],
            createdAt: new Date(),
        })

        await Program.findByIdAndUpdate(programId, {
            $push: {days: newDay._id}
        });

        res.status(200).json(newDay);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.deleteProgram = async (req, res) => {
  try {
    const { programId } = req.params;

    // 1. Find program + ensure ownership
    const program = await Program.findOne({
      _id: programId,
      user: req.user.userId,
    });

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    // 2. Delete related days
    await Day.deleteMany({ program: programId });

    // 3. Delete program
    await Program.findByIdAndDelete(programId);

    return res.status(200).json({
      message: "Program deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};