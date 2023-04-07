const http = require("http");
const { app, PORT } = require(".");
const { log } = require("console");

const port = PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  log("Server is up and listening on : " + PORT);
});
