const express = require("express");
const router = express.Router();

const programTemplateController = require("../controllers/programTemplateController");

router.post("/create", programTemplateController.createTemplate);
router.post("/seed", programTemplateController.seedTemplate);

module.exports = router;