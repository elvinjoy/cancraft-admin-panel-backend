const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const Manager = require('../models/managerModel');

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Admin.findById(id) || await Manager.findById(id);
    if (!req.user) {
      throw new Error('User not found');
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
