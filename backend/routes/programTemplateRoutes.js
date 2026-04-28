const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const programTemplateController = require("../controllers/programTemplateController");

router.post("/create", verifyToken, programTemplateController.createTemplate);
router.post("/seed", verifyToken, programTemplateController.seedTemplate);
router.post("/seed2", verifyToken, programTemplateController.seedTemplate2);

module.exports = router;