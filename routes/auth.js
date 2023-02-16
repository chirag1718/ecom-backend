const router = require("express").Router();
const User = require("../model/User");
// Register User

router.post("/register", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  // console.log(user)
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", (req, res) => {
  res.send("User logged in succesfully");
});

module.exports = router;
