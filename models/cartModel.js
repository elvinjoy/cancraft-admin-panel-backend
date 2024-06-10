const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  dimension: {
    type: String,
    required: true,
  },
  frameColor: {
    type: String,
    required: true,
  },
  orginalImage: {
    type: String,
    required: true,
  },
  cropedImage: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
