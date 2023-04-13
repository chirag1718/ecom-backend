const router = require("express").Router();

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
router.put(
  "/update-product/:id",
  multerUpload.single("file"),
  async (req, res) => {
    try {
      const file = req.file.path;

      const productId = req.params.id;

      const upload = await cloudinary.uploader.explicit(file, {
        type: "upload",
        public_id: "assets/product/qiq6k2cqxruphafrliez",
        overwrite: true,
        invalidate: true,
        folder: "assets/product",
      });

      const results = await Product.updateOne(
        { _id: productId },
        {
          $set: {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            image: upload.url,
          },
        },
        { upsert: true }
      );

      res.status(200).send(results);
    } catch (err) {
      console.log(err, "product update failed");
    }
  }
);

module.exports = router;
