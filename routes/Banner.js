const router = require("express").Router();

// Banner Schema 📃
const Banner = require("../model/Banner");

// Cloudinary ☁️
const cloudinary = require("../utils/cloudinary");

// Multer
const multerUpload = require("../utils//multer");

// Routes 👇🏻

// Get all Banner
router.get("/get-all-banner", async (req, res) => {
  try {
    const results = await Banner.find({});
    if (!results) {
      // Banner not found
      return res.status(404).send("Banner not found! Please nvaigate to Home.");
    }
    res.status(200).send(results);
  } catch (err) {
    res.send("Products not found please navigate to Home!", err);
  }
});

// Add Banner 📷
router.post("/add-banner", multerUpload.single("file"), async (req, res) => {
  try {
    const file = req.file.path;
    console.log(file, "this is banner req.file.path log");
    const result = await cloudinary.uploader.upload(file, {
      folder: "assets/banner",
    });
    console.log(result, "this is banner log");

    // Create new Banner 🍫
    const banner = new Banner({
      name: req.body.name,
      image: result.url,
      source: req.body.source,
    });

    //Save new Banner 🍫
    const savedBanner = await banner.save();
    res.status(200).send(savedBanner);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
