require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userPaymentRoutes = require("./routes/payment/payment-routes");


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

const openCors = cors(); // allows all origins by default

app.use(cookieParser());
app.use(express.json());


app.use("/api/payment", userPaymentRoutes);

app.get("/api/ping", openCors, (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));