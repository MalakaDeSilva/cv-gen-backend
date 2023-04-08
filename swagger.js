const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const dotenv = require("dotenv");
dotenv.config();

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
const PORT = process.env.PORT || 8080;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "cv-gen-backend API",
      version: "1.0.0",
      description: "API cv generator application created for RAD module.",
    },
    servers: [
      {
        url: "http://localhost:" + PORT,
        description: "Local server",
      },
      {
        url: "https://cv-gen-backend.vercel.app/",
        description: "Remote server",
      },
    ],
  },
  apis: ["./api/routes/*.js"], // Path to the API routes files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerUi.setup(swaggerSpec, { customCssUrl: CSS_URL });
