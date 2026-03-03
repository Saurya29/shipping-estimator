const Customer = require("../models/Customer");
const Product = require("../models/Product");
const { findNearestWarehouse } = require("../services/warehouse.service");
const { calculateShippingCharge } = require("../services/shipping.service");

const calculateShipping = async (req, res) => {
  try {
    const { sellerId, customerId, productId, deliverySpeed } = req.body;

    const customer = await Customer.findById(customerId);
    const product = await Product.findById(productId);

    if (!customer || !product)
      return res.status(404).json({ message: "Invalid data" });

    const warehouse = await findNearestWarehouse(sellerId);

    const result = calculateShippingCharge(
      warehouse,
      customer,
      product.weight,
      deliverySpeed,
      req.body.transportMode
    );

    res.json({
        shippingCharge: result.shippingCost,
        transportMode: result.mode,
        distance: result.distance,
        nearestWarehouse: {
          warehouseId: warehouse._id,
          warehouseLocation: warehouse.location
  }
});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { calculateShipping };