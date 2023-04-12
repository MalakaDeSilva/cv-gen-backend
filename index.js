const express = require("express");
const app = express();
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swagger = require("./swagger");

const dotenv = require("dotenv");
dotenv.config();

// Routes
const eduDetailsRoute = require("./api/routes/edu.controller");
const { authenticateJWT } = require("./api/routes/auth.controller");

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api-docs", swaggerUi.serve, swagger);
app.use("/edu-details", /* authenticateJWT, */ eduDetailsRoute);

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
