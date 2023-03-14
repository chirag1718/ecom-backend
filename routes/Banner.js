const router = require("express").Router();

// Banner Schema
const Banner = require("../model/Banner");

// Cloudinary
const cloudinary = require("../utils/cloudinary");

// Multer
const bannerMulter = require("../utils/bannerMulter");

// Routes

// Get Banner
router.get("/get-banner", async (req, res) => {
  // get banner image
});
// Add Banner
router.post("/add-banner", bannerMulter.single("image"), async (req, res) => {
  try {
    const file = req.file.path;
    // console.log(file);
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(file, {
      // public_id: `${Date.now()}`,
      folder: "assets/banner",
    });
    console.log(result);

    // Create new Banner 🍫
    const banner = new Banner({
      name: req.body.name,
      image: result.url,
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
