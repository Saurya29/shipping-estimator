const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  weight: Number,
  dimensions: String,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller"
  }
});

module.exports = mongoose.model("Product", productSchema);