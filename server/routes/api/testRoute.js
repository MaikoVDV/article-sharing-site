const express = require("express");
const router = express.Router();

// Test model
const Test = require("../../models/testSchema");

// @route  Get api/cards
// @desc   Get all groups
// @access Public
router.get("/", (req, res) => {
    Test.find().then(test => {
        res.json(test)
    })
})
router.post("/", (req, res) => {
    const newTest = new Test({
        name: req.body.name
    });

    newTest.save()
    res.send("Success!")
})

module.exports = router