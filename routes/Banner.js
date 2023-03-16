const router = require("express").Router();

// Banner Schema 📃
const Banner = require("../model/Banner");

// Cloudinary ☁️
const cloudinary = require("../utils/cloudinary");

// Multer 🗄️
const bannerMulter = require("../utils/bannerMulter");

// Routes 👇🏻

// Get a single Banner 
router.get("/get-banner/:id", async (req, res) => {
  try {
    const bannerId = req.params.id;
    const results = await Banner.findById(bannerId);
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
router.post("/add-banner", bannerMulter.single("image"), async (req, res) => {
  try {
    const file = req.file.path;
    // console.log(file);
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(file, {
      // public_id: `${Date.now()}`,
      folder: "assets/banner",
    });
    // console.log(result);

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
