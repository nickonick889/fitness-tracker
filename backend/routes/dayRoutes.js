const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const dayController = require("../controllers/dayController");

router.post("/:programId/create", verifyToken, dayController.createNewDay);
router.post("/:dayId/add-exercise", verifyToken, dayController.addExerciseToDay);

module.exports = router;