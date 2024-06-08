const mongoose = require('mongoose');

const ratioSchema = new mongoose.Schema({
    buttonSizeRatio: {
        type: String,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Ratio = mongoose.model('Ratio', ratioSchema);
module.exports = Ratio;
