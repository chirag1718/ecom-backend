const router = require("express").Router();

// Banner Schema 📃
const Banner = require("../model/Banner");

// Cloudinary ☁️
const cloudinary = require("../utils/cloudinary");

// Multer
const multerUpload = require("../utils//multer");

// Routes 👇🏻

// Get one Banner
router.get("/get-one-banner/:id", async (req, res) => {
  try {
    const bannerId = req.params.id;
    const results = await Banner.findById(bannerId);
    if (!results) {
      return res.status(404).send("Banner not found, Please navigate to Home");
    }
    res.status(200).send(results);
  } catch (err) {
    res.send("Banner not found please navigate to Home", err);
  }
});

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
      image: {
        public_id: result.public_id,
        url: result.url,
      },
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

// Edit Banner
router.put(
  "/update-banner/:id",
  multerUpload.single("file"),
  async (req, res) => {
    try {
      const file = req.file.path;
      const bannerId = req.params.id;
      const currentBanner = await Banner.findById(bannerId);
      console.log(currentBanner.image.public);
      const update = await cloudinary.uploader.explicit(file, {
        type: "upload",
        public_id: currentBanner.image.public_id,
        overwrite: true,
        invalidate: true,
        folder: "assets/banner",
      });

      const results = await Product.updatOne(
        { _id: bannerId },
        {
          $set: {
            name: req.body.name,
            source: req.body.source,
            image: update.url,
          },
        },
        { upsert: true }
      );
      res.status(200).send(results);
    } catch (err) {
      console.log(err, "banner update failed");
    }
  }
);
module.exports = router;
