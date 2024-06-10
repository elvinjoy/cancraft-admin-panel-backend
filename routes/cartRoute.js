const express = require("express");
const router = express.Router();
const { addToCart, getAllCart } = require("../controller/cartController");
const { requireCustomerAuth } = require("../middleware/requireUserAuth");

router.use(requireCustomerAuth);
router.post("/addtocart", addToCart);
router.get("/getallcart", getAllCart);

module.exports = router;
