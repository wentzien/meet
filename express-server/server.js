require("dotenv").config();
const config = require("config");

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const logger = require("./startup/logger");
require("./startup/logging")();
// require("./startup/db/mongoDb").connectToDb();
// require("./startup/db/mySql").createPool();
require("./startup/db/mongoose")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/reactApp")(app);
require("./sockets/socket")(server);
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || config.get("port");
server.listen(port, () =>
    logger.info(`Listening on port ${port}...`)
);