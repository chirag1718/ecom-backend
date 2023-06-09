const express = require("express");
const app = express();

// DB
const mongoose = require("mongoose");

// DotENV
const dotenv = require("dotenv");
dotenv.config();

// Import Routes
// Authentication route
const authRoute = require("./routes/auth");

// Dashboard route
const dashboardRoute = require("./routes/dashboard");

// Product route
const productRoute = require("./routes/product");

// Banner route
const bannerRoute = require("./routes/banner");

// Cart route
const cartRoute = require("./routes/cart");

// cors import
const cors = require("cors");
const { adminAuthMiddleware } = require("./routes/verifyToken");

// Express File upload
const bodyParser = require("body-parser");

// Connection to DB
mongoose.set("strictQuery", true);
// When using strictQuery: true, Mongoose will only save fields that are specified in your schema

mongoose
  .connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
    }
    // () => console.log("Connected to DB")
  )
  .then(() => {
    // Server Connection
    const port = process.env.PORT || 3006;
    app.listen(port, console.log("Server is up and Running!"));
    console.log("Connected to DB");
  })

  .catch((e) => console.log(e));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Route Middlewares
// User authentication Route
app.use("/api/v1/user", authRoute);

// Dashboard Route
app.use("/api/v1/dashboard", adminAuthMiddleware, dashboardRoute);

// Product Route
app.use("/api/v1/product", productRoute);

// Banner Route
app.use("/api/v1/banner", bannerRoute);

// Cart Route
app.use("/api/v1/cart", cartRoute);

app.use("/health", (req, res) => {
  res.send("server is healthy");
});
