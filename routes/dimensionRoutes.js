const express = require("express");
const router = express.Router();
const dimensionController = require("../controller/dimensionController");

router.post("/dimensions", dimensionController.createDimension);
router.get("/dimensions", dimensionController.getAllDimensions);

module.exports = router;
