const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

// Routes
const warehouseRoutes = require("./src/routes/warehouse.routes");
const shippingRoutes = require("./src/routes/shipping.routes");
const metaRoutes = require("./src/routes/meta.routes");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express(); // ✅ Always initialize app FIRST

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/v1/warehouse", warehouseRoutes);
app.use("/api/v1/shipping-charge", shippingRoutes);
app.use("/api/v1/meta", metaRoutes);

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shipping Estimator API",
      version: "1.0.0",
      description: "API documentation for E-Commerce Shipping Estimator"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Default Route
app.get("/", (req, res) => {
  res.send("Shipping Estimator API is running...");
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});