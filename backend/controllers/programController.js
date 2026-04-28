const Program = require("../models/Program");

exports.addProgram = async (req, res) => {
    try {
        const userId = req.params.userId;
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
        const program = await Program.findById(programId);

        if (!program) {
            return res.status(404).json({error: "Program not found"});
        }

        await Day.deleteMany({program: programId});
        await Program.findByIdAndDelete(programId);

        res.status(200).json({message: "Program deleted successfully"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}