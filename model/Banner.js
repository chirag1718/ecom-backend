const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 128,
  },

  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  source: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Banner", bannerSchema);
