const express = require("express");
const router = express.Router();

const dayController = require("../controllers/dayController");

router.post("/:programId/create", dayController.createNewDay);
router.post("/:dayId/add-exercise", dayController.addExerciseToDay);

module.exports = router;