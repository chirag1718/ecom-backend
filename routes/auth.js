const router = require("express").Router();

// Bcrypt
const bcrypt = require("bcryptjs");

// JSON Web Token
const jwt = require("jsonwebtoken");

// User schema import
const User = require("../model/User");

// User validtion import
const { registerValidation, loginValidation } = require("../userValidation.js");

// Register User
router.post("/register", async (req, res) => {
  // Validate User Credentials
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if user email is already registered in the database
  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) return res.status(400).send("Email already exists!");

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  // Salt is a random string added to passwords before hashing to increase security.

  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // Fixed-length alphanumeric string generated from password using an algorithm (e.g. bcrypt) for secure storage or verification.

  // Create new user
  const user = new User({
    firstName: req.body.firstName,
    email: req.body.email,
    password: hashedPassword,
  });

  // Save new user
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// User Login
router.post("/login", async (req, res) => {
  // Validate User Credentials
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if user email exists
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Email doesn't exists!");

  // Check if Password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Indvalid Password");

  // Create and assign a token
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).send(token);
});

module.exports = router;
