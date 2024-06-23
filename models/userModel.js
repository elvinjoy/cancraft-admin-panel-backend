const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "0",
  },
});

usersSchema.statics.userSignup = async function (name, email, password) {
  // Check if all fields are filled
  if (!name || !email || !password) {
    throw Error("All fields must be filled");
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  // Validate password strength
  const isStrongPassword = validator.isStrongPassword(password, {
    minLength: 6,       // Minimum 6 characters
    minLowercase: 0,    // No requirement for lowercase letters
    minUppercase: 1,    // At least one uppercase letter
    minNumbers: 0,      // No requirement for numbers
    minSymbols: 0,      // No requirement for symbols
  });

  // Throw error if password is not strong enough
  if (!isStrongPassword) {
    throw Error("Password must be at least 6 characters long and include at least one uppercase letter");
  }

  // Check if email is already in use
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create new user
  const user = await this.create({ name, email, password: hash, status: "0" });
  return user;
};

usersSchema.statics.userLogin = async function (email, password) {
  // Check if all fields are filled
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // Find user by email
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  // Compare entered password with hashed password in database
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", usersSchema);
