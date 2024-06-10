const Dimension = require("../models/dimensionModel"); // Ensure the correct path

// Create a new dimension
exports.createDimension = async (req, res) => {
  try {
    const dimensions = req.body;
    const newDimension = new Dimension({ dimensions });
    const savedDimension = await newDimension.save();
    res.status(201).json(savedDimension);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all dimensions
exports.getAllDimensions = async (req, res) => {
  try {
    const dimensions = await Dimension.find();
    // Combine all dimensions into a single object
    const combinedDimensions = dimensions.reduce((acc, dimension) => {
      return { ...acc, ...dimension.dimensions };
    }, {});
    res.status(200).json(combinedDimensions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
