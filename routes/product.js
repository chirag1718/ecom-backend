const router = require("express").Router();

// Product Schema
const Product = require("../model/Product");

router.post("/", async (req, res) => {
  // Create new product
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
    quantity: req.body.quantity,
    rating: req.body.rating,
  });

  //Save new product
  try {
    const savedProduct = await product.save();
    res.send(savedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
