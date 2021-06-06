const express = require("express");
const user = require("../routes/users");
const auth = require("../routes/auth");
const meetings = require("../routes/meetings");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/users", user);
  app.use("/api/auth", auth);
  app.use("/api/meetings", meetings);
  app.use(error);
}