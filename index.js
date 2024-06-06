const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const adminAuthRoutes = require("./routes/adminRoutes");
const addManagerRoutes = require("./routes/addManagerRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/admin", adminAuthRoutes);
app.use("/api/managers", addManagerRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to cancraft admin panel backend!");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONG_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
      console.log("admin panel backend server started");
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();
