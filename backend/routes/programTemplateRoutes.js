const express = require("express");
const router = express.Router();

const programTemplateController = require("../controllers/programTemplateController");

router.post("/create", programTemplateController.createTemplate);
router.post("/seed", programTemplateController.seedTemplate);
router.post("/seed2", programTemplateController.seedTemplate2);

module.exports = router;