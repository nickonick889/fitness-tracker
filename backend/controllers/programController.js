const Program = require("../models/Program");

exports.createNewProgram = async (req, res) => {
    try {
        const userId = req.params.userId;

        const newProgram = await Program.create({
            user: userId,
            name: req.body.name,
            days: [],
        });

        res.status(200).json(newProgram);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.addDayToProgram = async (req, res) => {
    try {
        const programId = req.params.programId;
        const {dayId} = req.body;

        const updated = await Program.findByIdAndUpdate(
            programId,
            { $addToSet: { days: dayId } },
            { new: true }
        ).populate({
            path: "days",
            populate: { path: "exercises" }
        });

        res.json(updated);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}