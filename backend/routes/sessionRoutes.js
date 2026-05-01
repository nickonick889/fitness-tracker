const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const controller = require("../controllers/sessionController");

router.get("/", verifyToken, controller.getSessions);
router.post("/start", verifyToken, controller.startSession);
router.get("/:sessionId", verifyToken, controller.getSessionById);
router.put("/:sessionId", verifyToken, controller.updateSession);
router.put("/:sessionId/end", verifyToken, controller.endSession);
router.get("/", verifyToken, controller.getSessions);

module.exports = router;