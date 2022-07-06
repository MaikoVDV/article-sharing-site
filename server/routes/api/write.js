const express = require("express");
const router = express.Router();

// Article model
const Article = require("../../models/articleSchema");

// @route  Post api/write
// @desc   Post a new article
// @access Public
router.post("/", (req, res) => {

    const article = new Article({
        title: req.body.title,
        description: req.body.desc,
        author: {
            name: req.body.author.name,
            icon: req.body.author.icon
        },
        thumbnail: req.body.thumbnail
    })
    article.save().then(err => {
        if(err) {
            console.log(err)
            return res.json(err)
        }
        return res.json("Article posted!")
    })
})

module.exports = router