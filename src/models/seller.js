const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: String,
  location: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model("Seller", sellerSchema);