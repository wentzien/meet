const express = require("express");
const router = express.Router();
const {v4: uuidV4} = require("uuid");

router.get("/start", (req, res) => {
    res.redirect("/" + uuidV4())
});

module.exports = router;
