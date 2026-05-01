const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const dayController = require("../controllers/dayController");

router.post("/:programId/add", verifyToken, dayController.createNewDay);
router.post("/:dayId/add-exercise", verifyToken, dayController.addExerciseToDay);
router.get("/:dayId", verifyToken, dayController.getDays);
router.put("/:dayId", verifyToken, dayController.updateDay);
router.put("/:dayId/name", verifyToken, dayController.updateDayName);
router.delete("/:dayId", verifyToken, dayController.deleteDay);

module.exports = router;