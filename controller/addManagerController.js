const Manager = require('../models/managerModel');
const jwt = require('jsonwebtoken');

// Create token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.MANAGER_JWT_SECRET, { expiresIn: '3d' });
};

// Middleware to check if the user is an admin
const checkAdmin = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'Not authorized, token missing' });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    const admin = await Admin.findById(decoded._id);
    if (admin && admin.status === 'admin') {
      req.admin = admin;
      next();
    } else {
      throw new Error('Not authorized');
    }
  } catch (error) {
    res.status(403).json({ error: 'Not authorized' });
  }
};

// Manager registration
const managerRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const manager = await Manager.managerSignup(name, email, password);
    const token = createToken(manager._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Manager login
const managerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const manager = await Manager.managerLogin(email, password);
    const token = createToken(manager._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { managerRegister, managerLogin, checkAdmin };
