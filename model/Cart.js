const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: {
    type: Number,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
