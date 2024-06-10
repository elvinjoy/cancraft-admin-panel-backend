const Cart = require("../models/cartModel");

exports.addToCart = async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  const { dimension, frameColor, orginalImage, cropedImage, price } = req.body;

  console.log(dimension);
  try {
    const newCart = new Cart({
      userId,
      dimension,
      frameColor,
      orginalImage,
      cropedImage,
      price,
    });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//getAll Cart
exports.getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.user._id });
    console.log(req.user._id);
    res.status(200).json({ carts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
