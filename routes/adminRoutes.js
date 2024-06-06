const express = require('express');
const router = express.Router();
const { adminLogin, adminRegister,  deleteManager, getAllManagers } = require('../controller/adminController');

// Admin routes
router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.delete('/manager/:id', deleteManager);
router.get('/allmanagers', getAllManagers);

module.exports = router;
