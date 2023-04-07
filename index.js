const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const dotenv = require("dotenv");
dotenv.config();

// Routes
const eduDetailsRoute = require("./api/routes/edu.controller");

const PORT = process.env.PORT;
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
    ],
  },
  apis: ["./api/routes/*.js"], // Path to the API routes files
};

const swaggerSpec = swaggerJSDoc(options);

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/edu-details", eduDetailsRoute);

app.use((req, res, next) => {
  const error = new Error("Not found.");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});
