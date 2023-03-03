const router = require("express").Router();

// Product Schema 📃
const Product = require("../model/Product");

// Cloudinary ☁️
const cloudinary = require("../utils/cloudinary");

// Multer 🗄️
const multerUpload = require("../utils/multer");

// ROUTES 👇🏻

// Get All products 🍫*N
router.get("/getallproducts", async (req, res) => {
  try {
    // const product = await db.collection("products")
    const results = await Product.find({});
    res.status(200).send(results);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

// Get One Product 🍫
router.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const results = await Product.findOne({ productId });
    res.status(200).send(results)
  } catch (err) {
    console.log(err);
  }
});

// Add Product Route 👇🏻➕
router.post("/addproducts", multerUpload.single("file"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // console.log(result);

    // Create new product 🍫
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      image: result.url,
      price: req.body.price,
    });

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
