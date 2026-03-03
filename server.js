const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/db");

// Routes
const warehouseRoutes = require("./src/routes/warehouse.routes");
const shippingRoutes = require("./src/routes/shipping.routes");
const metaRoutes = require("./src/routes/meta.routes");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/v1/warehouse", warehouseRoutes);
app.use("/api/v1/shipping-charge", shippingRoutes);
app.use("/api/v1/meta", metaRoutes);
const path = require("path");

// Serve static frontend files
app.use(express.static(path.join(__dirname, "frontend")));

// Catch-all route (VERY IMPORTANT)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

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
        url: process.env.BASE_URL || "http://localhost:5000"
      }
    ]
  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Serve frontend
app.use(express.static(path.join(__dirname, "frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});