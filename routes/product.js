const router = require("express").Router();

// Product Schema 📃
const Product = require("../model/Product");

// Cloudinary ☁️
const cloudinary = require("../utils/cloudinary");

// Multer 🗄️
const upload = require("../utils/multer");

// Product Route 👇🏻
router.post("/", upload.single("image"), async (req, res) => {
  // Upload image to cloudinary
  const result = await cloudinary.uploader.upload(req.file.path);

  // Create new product 🍫
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: result.url,
    price: req.body.price,
    quantity: req.body.quantity,
    rating: req.body.rating,
  });

  //Save new product 🍫
  try {
    const savedProduct = await product.save();
    res.send(savedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
