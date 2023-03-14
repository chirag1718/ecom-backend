const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, image, cb) => {
    let ext = path.extname(image.originalname);
    // if (!req.image) return cb(new Error("Please upload a file"));
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported image type!"), false);
      return;
    }
    cb(null, true);
  },
});
