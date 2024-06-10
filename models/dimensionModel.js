const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const dimensionSchema = new Schema({
  dimensions: {
    type: Mixed,
    required: true,
  },
});

module.exports = mongoose.model("Dimension", dimensionSchema);
