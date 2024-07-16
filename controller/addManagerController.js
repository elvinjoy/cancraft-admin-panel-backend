const Manager = require("../models/managerModel");
const jwt = require("jsonwebtoken");

// Create token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.MANAGER_JWT_SECRET, { expiresIn: "3d" });
};

//  creating Manager 
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
    res.status(200).json({ manager, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { managerRegister, managerLogin };
