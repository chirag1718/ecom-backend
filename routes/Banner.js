const router = require("express").Router();

// Banner Schema
const Banner = require("../model/Banner");

// Cloudinary
const cloudinary = require("../utils/cloudinary");

// Multer
const multerUpload = require("../utils/multer");

// Routes

// Get Banner
router.get("/get-banner", async (req, res) => {
  // get banner image
});
// Add Banner
router.post("/add-banner", multerUpload.single("file"), async (req, res) => {
  try {
    // Upload banner image to cloudinary
    const file = req.file.path;
    const result = await cloudinary.uploader.upload(file, {
      folder: "assets/banner",
    });
    console.log(result);

    // Create new banner
    const banner = new Banner({
      name: req.body.name,
      image: req.body.file,
    });

    const savedBanner = await banner.save();
    res.status(200).send("Banner saved successfully", savedBanner);
  } catch (err) {
    console.log(err, "Banner Error");
    res.status(400).send(err);
  }
});

module.exports = router;
