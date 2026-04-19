const express = require("express");
const router = express.Router();

const exerciseController = require("../controllers/exerciseController");

router.get("/all", exerciseController.getExercises);

module.exports = router;