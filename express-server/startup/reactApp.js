const express = require("express");
const path = require("path");
const error = require("../middleware/error");

module.exports = function (app) {
    app.use(express.static(path.join(__dirname, "..", "..", "react-app", "build")));
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "..", "..", "react-app", "build", "index.html"));
    });
    app.use(error);
}