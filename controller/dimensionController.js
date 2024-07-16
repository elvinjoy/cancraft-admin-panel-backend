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
    // Map the dimensions to include the _id
    const dimensionsWithId = dimensions.map(dimension => ({
      _id: dimension._id,
      dimensions: dimension.dimensions
    }));
    res.status(200).json(dimensionsWithId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a dimension by ID
exports.deleteDimension = async (req, res) => {
  try {
    const { id } = req.params;
    await Dimension.findByIdAndDelete(id);
    res.status(200).json({ message: 'Dimension deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
