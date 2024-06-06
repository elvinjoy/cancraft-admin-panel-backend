const express = require("express");
const {
  managerRegister,
  managerLogin,
} = require("../controller/addManagerController");

const requireManagerAuth = require("../middleware/requireManagerAuth");

const router = express.Router();

router.post("/register", requireManagerAuth, managerRegister);
router.post("/login", managerLogin);

module.exports = router;
