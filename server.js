const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/", taskRoutes);

// Swagger Documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});