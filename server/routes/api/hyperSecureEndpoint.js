const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json(req.headers)
})

module.exports = router