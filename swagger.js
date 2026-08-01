const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FlyRank Task API",
      version: "1.0.0",
      description: "Simple CRUD Task API built using Express.js",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);