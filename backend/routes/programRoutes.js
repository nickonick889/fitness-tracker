const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const programController = require("../controllers/programController");

router.post("/:userId/addProgram", verifyToken, programController.addProgram);
router.post("/:programId/addDay", verifyToken, programController.addDayToProgram);
router.delete("/:programId", verifyToken, programController.deleteProgram);

module.exports = router;