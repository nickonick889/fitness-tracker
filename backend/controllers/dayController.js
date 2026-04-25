const Day = require("../models/Day");

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

        await Program.findByIdAndUpdate(programId, {
            $push: {days: newDay._id},
        })

        res.status(200).json(newDay);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

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