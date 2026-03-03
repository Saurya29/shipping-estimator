require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("./src/config/db");
const Seller = require("./src/models/seller");
const Customer = require("./src/models/Customer");
const Product = require("./src/models/Product");
const Warehouse = require("./src/models/warehouse");

const seedData = async () => {
  try {
    await connectDB();

    // Clear old data
    await Seller.deleteMany();
    await Customer.deleteMany();
    await Product.deleteMany();
    await Warehouse.deleteMany();

    console.log("Old data cleared");

    // Insert Warehouses
    const warehouses = await Warehouse.insertMany([
      {
        name: "BLR_Warehouse",
        location: { lat: 12.99999, lng: 37.923273 }
      },
      {
        name: "MUMB_Warehouse",
        location: { lat: 11.99999, lng: 27.923273 }
      }
    ]);

    // Insert Sellers
    const sellers = await Seller.insertMany([
      {
        name: "Nestle Seller",
        location: { lat: 12.5, lng: 37.0 }
      },
      {
        name: "Rice Seller",
        location: { lat: 18.0, lng: 30.0 }
      },
      {
        name: "Sugar Seller",
        location: { lat: 20.0, lng: 32.0 }
      }
    ]);

    // Insert Products
    await Product.insertMany([
      {
        name: "Maggie 500g Packet",
        price: 10,
        weight: 0.5,
        dimensions: "10x10x10",
        seller: sellers[0]._id
      },
      {
        name: "Rice Bag 10Kg",
        price: 500,
        weight: 10,
        dimensions: "1000x800x500",
        seller: sellers[1]._id
      },
      {
        name: "Sugar Bag 25Kg",
        price: 700,
        weight: 25,
        dimensions: "1000x900x600",
        seller: sellers[2]._id
      }
    ]);

    // Insert Customers
    await Customer.insertMany([
      {
        name: "Shree Kirana Store",
        phone: "9847000000",
        location: { lat: 11.232, lng: 23.445495 }
      },
      {
        name: "Andheri Mini Mart",
        phone: "9101000000",
        location: { lat: 17.232, lng: 33.445495 }
      }
    ]);

    console.log("✅ All sample data inserted successfully");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();