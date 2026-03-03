const getDistance = require("./distance.service");

// Transport rate mapping
const transportRates = {
  MiniVan: 3,
  Truck: 2,
  Aeroplane: 1
};

const calculateShippingCharge = (
  warehouse,
  customer,
  productWeight,
  deliverySpeed,
  selectedMode
) => {
  const distance = getDistance(
    warehouse.location.lat,
    warehouse.location.lng,
    customer.location.lat,
    customer.location.lng
  );

  // If no mode selected, auto choose
  let mode = selectedMode;

  if (!mode) {
    if (distance > 500) mode = "Aeroplane";
    else if (distance > 100) mode = "Truck";
    else mode = "MiniVan";
  }

  const rate = transportRates[mode];

  let shippingCost = distance * productWeight * rate;

  // Base handling charge
  const baseCharge = 10;
  shippingCost += baseCharge;

  // Express delivery surcharge
  if (deliverySpeed === "express") {
    shippingCost += productWeight * 1.2;
  }

  return {
    shippingCost,
    mode,
    distance
  };
};

module.exports = { calculateShippingCharge };