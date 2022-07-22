const express = require("express");
const router = express.Router();
const jwtCheck = require("../../protectedRoute")

router.get("/", jwtCheck, (req, res) => {
    return res.status(200).send(true)
})

module.exports = router