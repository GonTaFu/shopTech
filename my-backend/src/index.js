const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Atlas connection
const uri =
  "mongodb+srv://hoanguy:hoanguy123456@mongodb.p9ncspb.mongodb.net/Onlineshopping";

mongoose
  .connect(uri)
  .then(() => console.log("Kết nối thành công với MongoDB Atlas!"))
  .catch((error) => {
    console.error("Lỗi kết nối với MongoDB Atlas:", error);
    process.exit(1);
  });

// Middleware
app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// APIs
app.get("/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use("/api", router); // Mounts routes at /api

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

// Listen
app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
});
