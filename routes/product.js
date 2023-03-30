const router = require("express").Router();

const { set } = require("mongoose");
// Product Schema 📃
const Product = require("../model/Product");

// Cloudinary ☁️
const cloudinary = require("../utils/cloudinary");

// Multer 🗄️
const multerUpload = require("../utils/multer");

// ROUTES 👇🏻

// Get All products 🍫*N
router.get("/get-all-products", async (req, res) => {
  try {
    // const product = await db.collection("products")
    const results = await Product.find({});
    if (!results) {
      // Product not found
      return res.status(404).send("Product not found. Please navigate to Home");
    }
    // Product found
    res.status(200).send(results);
  } catch (err) {
    res.send("Products not found please navigate to Home: ", err);
  }
});

// Get One Product 🍫
router.get("/get-one-product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const results = await Product.findById(productId);
    if (!results) {
      // Product not found
      return res.status(404).send("Product not found. Please navigate to Home");
    }
    // Product found
    res.status(200).send(results);
  } catch (err) {
    res.send("Product not found please navigate to Home: ", err);
  }
});

// Add Product Route 👇🏻➕
router.post("/add-products", multerUpload.single("file"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const file = req.file.path;
    const result = await cloudinary.uploader.upload(file, {
      folder: "assets/product",
    });

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

// Update a product 🍫
router.put("/update-product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const options = { upsert: true };
    const results = await Product.updateOne(
      { _id: productId },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          price: req.body.price,
        },
      },
      { upsert: true }
    );
    res.send(results);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
