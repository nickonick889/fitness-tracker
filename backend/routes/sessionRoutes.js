const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const sessionController = require("../controllers/sessionController");

router.post("/start", verifyToken, sessionController.startSession);
router.post("/end", verifyToken, sessionController.endSession);

module.exports = router;