const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Address', addressSchema);
