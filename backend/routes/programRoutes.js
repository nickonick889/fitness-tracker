const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const programController = require("../controllers/programController");

router.post("/new", verifyToken, programController.addProgram);
router.post("/addDay", verifyToken, programController.addDayToProgram);
router.delete("/:programId", verifyToken, programController.deleteProgram);
router.get("/", verifyToken, programController.getPrograms);

module.exports = router;