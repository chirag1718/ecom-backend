const router = require("express").Router();

// Cart Schema
const Cart = require("../model/Cart");

// ROUTES 👇🏻

// Get all Cart Items
router.get("/get-all-items", async (req, res) => {
  try {
    const results = await Cart.find({});
    if (!results) {
      return res.status(404).send("Cart not found!");
    }
    console.log("this is get-all-items cart route");
    res.status(200).send(results);
  } catch (err) {
    console.log(err, "Error: Cart get-all-items route");
  }
});

// Add Item to cart
router.post("/add-item", async (req, res) => {
  try {
    // Check if current user already has this product in his cart
    // If true then update quantity or else add new item
    const currentProduct = await Cart.findOne({
      userId: req.body.userId,
      productId: req.body.productId,
    });
    if (currentProduct) {
      currentProduct.quantity = currentProduct.quantity + 1;
      currentProduct.save();
      return res.status(200).send(currentProduct);
    } else {
      const cart = new Cart({
        userId: req.body.userId,
        productId: req.body.productId,
        quantity: 1,
      });
      const savedCart = await cart.save();
      return res.status(200).send(savedCart);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
