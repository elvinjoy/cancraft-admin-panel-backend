const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const requireCustomerAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.USER_JWT_SECRET);
    req.user = await User.findOne({ _id });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};


// authenticate user
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


module.exports ={ requireCustomerAuth, authenticateToken };
