const express = require("express");
const router = express.Router();
const { addToCart, getAllCart } = require("../controller/cartController");
const { requireCustomerAuth } = require("../middleware/requireUserAuth");

router.get("/getallcart", getAllCart);
router.use(requireCustomerAuth);
router.post("/addtocart", addToCart);

module.exports = router;
