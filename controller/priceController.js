const Price = require("../models/priceModel");

// create new price
exports.createPrice = async (req, res) => {
    try {
        const price = req.body;
        const newPrice = new Price({ price });
        const savedPrice = await newPrice.save();
        res.status(201).json(savedPrice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllPrice = async (req, res) => {
    try {
        const prices = await Price.find();
        const aggregatedPrices = {};

        prices.forEach(priceEntry => {
            const priceObject = priceEntry.price;
            for (const dimension in priceObject) {
                if (priceObject.hasOwnProperty(dimension)) {
                    aggregatedPrices[dimension] = priceObject[dimension];
                }
            }
        });

        res.status(200).json(aggregatedPrices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
