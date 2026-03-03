const { findNearestWarehouse } = require("../services/warehouse.service");

const getNearestWarehouse = async (req, res) => {
  try {
    const { sellerId } = req.query;

    if (!sellerId)
      return res.status(400).json({ message: "sellerId required" });

    const warehouse = await findNearestWarehouse(sellerId);

    res.json({
      warehouseId: warehouse._id,
      warehouseLocation: warehouse.location
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getNearestWarehouse };