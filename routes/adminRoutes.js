const express = require('express');
const router = express.Router();
const { adminLogin, adminRegister, deleteManager, getAllManagers, addButtonSizeRatio, getAllButtonSizeRatios, getspecificButton } = require('../controller/adminController');

// Admin routes
router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.delete('/manager/:id', deleteManager);
router.get('/allmanagers', getAllManagers);
router.post('/addratios', addButtonSizeRatio);
router.get('/allratios', getAllButtonSizeRatios);
router.get('/onebutton/:id', getspecificButton);

module.exports = router;
 