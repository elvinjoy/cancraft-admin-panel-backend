require('dotenv').config();
const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const Manager = require('../models/managerModel');
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.ADMIN_JWT_SECRET, { expiresIn: "3d" });
};

// Admin signup
const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Save the admin data to the database
    const admin = await Admin.adminSignup(name, email, password);
    // Generate JWT token
    const token = createToken(admin._id);
    // Send admin data and token to the frontend
    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.adminLogin(email, password);
    const token = createToken(admin._id);
    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Restrict user from website
const deleteManager = async (req, res) => {
  const managerId = req.params.id;

  try {
    const manager = await Manager.findByIdAndDelete(managerId);
    if (!manager) {
      return res.status(404).json({ error: 'Manager not found' });
    }
    return res.status(200).json({ message: 'Manager deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// display all the managers
const getAllManagers = async (req, res) => {
  try {
    const managers = await Manager.find();
    res.status(200).json({ managers });
    console.log(managers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { adminLogin, adminRegister, deleteManager, getAllManagers };
