const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Address = require('../models/addressModel');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.USER_JWT_SECRET, { expiresIn: '3d' });
};

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.userSignup(name, email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.userLogin(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Enter address
const userAddress = async (req, res) => {
  const { name, streetAddress, phoneNumber, pincode } = req.body.address;

  try {
    const address = {
      name,
      streetAddress,
      phoneNumber,
      pincode
    };

    console.log({ address }); 
    res.status(200).json({ address });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Check if there is an address inside user.id
const user = async (req, res) => {
  try {
    const userdata = req.user;
    console.log(userdata);

    if (userdata && userdata._id && userdata.address) {
      return res.status(200).json(userdata);
    } else {
      return res.status(400).json({ error: 'User ID or address missing' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { userLogin, userRegister, userAddress, user };
