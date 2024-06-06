const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const managerSchema = new mongoose.Schema({
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
    default: 'manager'
  }
});

// Hash password before saving
managerSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Static method to login manager
managerSchema.statics.managerLogin = async function (email, password) {
  const manager = await this.findOne({ email });
  if (manager) {
    const auth = await bcrypt.compare(password, manager.password);
    if (auth) {
      return manager;
    }
    throw new Error('Incorrect password');
  }
  throw new Error('Incorrect email');
};

// Static method to signup manager
managerSchema.statics.managerSignup = async function (name, email, password) {
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error('Email already in use');
  }
  const manager = await this.create({ name, email, password });
  return manager;
};

module.exports = mongoose.model('Manager', managerSchema);
