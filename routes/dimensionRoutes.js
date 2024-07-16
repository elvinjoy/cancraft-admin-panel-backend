const express = require("express");
const router = express.Router();
const dimensionController = require("../controller/dimensionController");

router.post("/dimensions", dimensionController.createDimension);
router.get("/dimensions", dimensionController.getAllDimensions);
router.get("alldimensions", dimensionController.sentAllDimensions);
router.delete("/dimensions/:id", dimensionController.deleteDimension); 

module.exports = router;
