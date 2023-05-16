const express = require("express");
const app = express();
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swagger = require("./swagger");

const dotenv = require("dotenv");
dotenv.config();

// Routes
const eduDetailsRoute = require("./api/routes/edu.controller");
const workDetailsRoute = require("./api/routes/work.controller");
const personalDetailsRoute = require("./api/routes/personal.info.controller");
const skillsRoute = require("./api/routes/skills.controller");
const pdfRoute = require("./api/routes/pdf.controller");
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
app.use("/work-details", /* authenticateJWT, */ workDetailsRoute);
app.use("/personal-details", /* authenticateJWT, */ personalDetailsRoute);
app.use("/skill-details", /* authenticateJWT, */ skillsRoute);
app.use("/pdf", /* authenticateJWT, */ pdfRoute);

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
