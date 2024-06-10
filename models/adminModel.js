const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,  
    required: true
  },
  status: {
    type: String,
    default: 'admin'
  }
});

// Hash password before saving
adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Static method to login admin
adminSchema.statics.adminLogin = async function (email, password) {
  const admin = await this.findOne({ email });
  if (admin) {
    const auth = await bcrypt.compare(password, admin.password);
    if (auth) {
      return admin;
    }
    throw new Error('Incorrect password');
  }
  throw new Error('Incorrect email');
};

// Static method to signup admin
adminSchema.statics.adminSignup = async function (name, email, password) {
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error('Email already in use');
  }
  const admin = await this.create({ name, email, password });
  return admin;
};

module.exports = mongoose.model('Admin', adminSchema);
