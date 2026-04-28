const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const exerciseController = require("../controllers/exerciseController");

router.get("/all", verifyToken, exerciseController.getExercises);

module.exports = router;