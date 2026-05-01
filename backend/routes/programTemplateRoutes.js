const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const programTemplateController = require("../controllers/programTemplateController");

router.post("/create", verifyToken, programTemplateController.createTemplate);
router.post("/seed", programTemplateController.seedTemplate);
router.post("/seed2", programTemplateController.seedTemplate2);
router.get("/", verifyToken, programTemplateController.getTemplates);

module.exports = router;