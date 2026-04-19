const express = require("express");
const router = express.Router();

const programController = require("../controllers/programController");

router.post("/:userId/createNewProg", programController.createNewProgram);
router.post("/:programId/add-day", programController.addDayToProgram);

module.exports = router;