const express = require("express");
const router = express.Router();
const createPrice  = require("../controller/priceController");

router.post("/createprice", createPrice.createPrice);
router.get('/allprices', createPrice.getAllPrice);

module.exports = router;