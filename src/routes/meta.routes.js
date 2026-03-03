const express = require("express");
const router = express.Router();
const Seller = require("../models/seller");
const Customer = require("../models/Customer");
const Product = require("../models/Product");

router.get("/sellers", async (req, res) => {
  const sellers = await Seller.find();
  res.json(sellers);
});

router.get("/customers", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

router.get("/products/:sellerId", async (req, res) => {
  const products = await Product.find({ seller: req.params.sellerId });
  res.json(products);
});

module.exports = router;