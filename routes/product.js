const router = require("express").Router();

// Product Schema 📃
const Product = require("../model/Product");

// Cloudinary ☁️
const cloudinary = require("../utils/cloudinary");

// Multer 🗄️
const multerUpload = require("../utils/multer");

// Add Product Route 👇🏻
router.post("/addproduct", multerUpload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new product 🍫
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      image: result.url,
      price: req.body.price,
    });
    // console.log("New Product", product);

    //Save new product 🍫
    const savedProduct = await product.save();
    // console.log("Saved Product", savedProduct);
    res.status(200).send(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
