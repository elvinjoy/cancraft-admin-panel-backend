const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const priceSchema = new Schema({
  price: {
    type: Mixed,
    required: true,
  },
});

module.exports = mongoose.model("Price", priceSchema);