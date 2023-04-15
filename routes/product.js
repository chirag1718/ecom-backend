const router = require("express").Router();

const { Collection } = require("mongoose");
// Product Schema 📃
const Product = require("../model/Product");

// Cloudinary ☁️
const cloudinary = require("../utils/cloudinary");

// Multer 🗄️
const multerUpload = require("../utils/multer");

// ROUTES 👇🏻

// Get All products 🍫
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
    // console.log(req, "this is file");
    const result = await cloudinary.uploader.upload(file, {
      folder: "assets/product",
    });
    console.log(result, "this is add product route");
    // Create new product 🍫
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      image: {
        public_id: result.public_id,
        url: result.url,
      },
      price: req.body.price,
    });

    //Save new product 🍫
    const savedProduct = await product.save();
    // console.log("this is image", product.image.public_id);

    res.status(200).send(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// Update a product 🍫
router.put(
  "/update-product/:id",
  multerUpload.single("file"),
  async (req, res) => {
    try {
      const file = req.file.path;
      const productId = req.params.id;
      const currentProduct = await Product.findById(productId);
      console.log(currentProduct.image.public_id, "this is current product");
      const update = await cloudinary.uploader.explicit(file, {
        type: "upload",
        public_id: currentProduct.image.public_id,
        overwrite: true,
        invalidate: true,
        folder: "assets/product",
      });
      // console.log(update, "this is updated log");
      const results = await Product.updateOne(
        { _id: productId },
        {
          $set: {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            image: update.url,
          },
        },
        { upsert: true }
      );

      res.status(200).send(results);
      // console.log(results, "this is results");
    } catch (err) {
      console.log(err, "product update failed");
    }
  }
);

// Delete one product 🍫💥
router.delete("/delete/:id", async (req, res) => {
  try {
    const currentProduct = await Product.findById(req.params.id);
    const imgId = currentProduct.image.public_id;
    console.log(currentProduct);
    await cloudinary.uploader.destroy(imgId);
    const removeProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).send(removeProduct);
  } catch (err) {
    console.log(err, "this is delete route error");
  }
});
module.exports = router;
