const express = require("express");
const router = express.Router();
const dimensionController = require("../controller/dimensionController");

router.post("/dimensions", dimensionController.createDimension);
router.get("/dimensions", dimensionController.getAllDimensions);
router.delete("/dimensions/:id", dimensionController.deleteDimension); // Add this line

module.exports = router;
