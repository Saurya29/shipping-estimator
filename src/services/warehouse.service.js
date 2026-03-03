const Warehouse = require("../models/warehouse");
const Seller = require("../models/seller");
const getDistance = require("./distance.service");

const findNearestWarehouse = async (sellerId) => {
  const seller = await Seller.findById(sellerId);
  if (!seller) throw new Error("Seller not found");

  const warehouses = await Warehouse.find();
  if (!warehouses.length) throw new Error("No warehouses available");

  let nearest = null;
  let minDistance = Infinity;

  warehouses.forEach((warehouse) => {
    const distance = getDistance(
      seller.location.lat,
      seller.location.lng,
      warehouse.location.lat,
      warehouse.location.lng
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearest = warehouse;
    }
  });

  return nearest;
};

module.exports = { findNearestWarehouse };