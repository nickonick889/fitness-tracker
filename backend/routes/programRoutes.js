const express = require("express");
const router = express.Router();

const programController = require("../controllers/programController");

router.post("/:userId/addProgram", programController.addProgram);
router.post("/:programId/addDay", programController.addDayToProgram);
router.delete("/:programId", programController.deleteProgram);

module.exports = router;