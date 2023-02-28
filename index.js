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

// cors import
const cors = require("cors");
const { adminAuthMiddleware } = require("./routes/verifyToken");

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
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log(e));

// Middleware
app.use(cors());
app.use(express.json());

// Route Middlewares
// User authentication Route
app.use("/api/v1/user", authRoute);

// Dashboard Route
app.use("/api/v1/dashboard", adminAuthMiddleware, dashboardRoute);

// Product Route
app.use("/api/v1/product", productRoute);

// Server Connection
const port = process.env.PORT || 3006;
app.listen(port, console.log("Server is up and Running!"));
