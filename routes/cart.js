const router = require("express").Router();

// Cart Schema
const Cart = require("../model/Cart");
const Product = require("../model/Product");

// ROUTES 👇🏻

// Get all Cart Items
router.get("/get-all-items", async (req, res) => {
  try {
    const results = await Cart.find({});
    res.status(200).send(results);
  } catch (err) {
    console.log(err, "Error: Cart get-all-items route");
  }
});

// Get one Cart Item
router.get("/get-one-item/:id", async (req, res) => {
  try {
  } catch (err) {
    console.log(err, "Error Cart get-one-item route");
  }
});

// Add Item to cart
router.post("/add-item", async (req, res) => {
  const userId = req.params.id;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const item = Product.findOne({ _id: productId });
});

module.exports = router