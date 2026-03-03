const express = require("express");
const router = express.Router();
const { getNearestWarehouse } = require("../controllers/warehouse.controller");

router.get("/nearest", getNearestWarehouse);

module.exports = router;