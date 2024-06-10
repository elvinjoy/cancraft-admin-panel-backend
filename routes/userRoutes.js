const express = require('express');
const router = express.Router();
const { userLogin, userRegister, userAddress, user } = require('../controller/userController');
const { authenticateToken } = require('../middleware/requireUserAuth');

router.post('/login', userLogin);
router.post('/register', userRegister);
router.get('/checkaddress', authenticateToken, user);
router.post('/address', userAddress);

module.exports = router;
