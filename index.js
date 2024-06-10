const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const adminAuthRoutes = require("./routes/adminRoutes");
const addManagerRoutes = require("./routes/addManagerRoutes");
const userRoutes = require("./routes/userRoutes");
const dimensionRoutes = require("./routes/dimensionRoutes");
const cartRoutes = require("./routes/cartRoute");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/admin", adminAuthRoutes);
app.use("/api/managers", addManagerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dimensions", dimensionRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to cancraft admin panel backend!");
});

// Use environment variable for MongoDB URI
const MONG_URI = process.env.MONG_URI;

const connectDB = async () => {
  try {
    mongoose
      .connect(MONG_URI)
      .then(() => console.log("Database Connected"))
      .catch((err) => console.error("Database Connection Error:", err));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("admin panel backend server started");
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();
