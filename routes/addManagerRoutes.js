const express = require('express');
const { managerRegister, managerLogin, checkAdmin } = require('../controller/addManagerController');

const router = express.Router();

router.post('/register', checkAdmin, managerRegister);
router.post('/login', managerLogin);

module.exports = router;
