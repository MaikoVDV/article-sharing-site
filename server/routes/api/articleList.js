const express = require("express");
const router = express.Router();

// Article model
const Article = require("../../models/articleSchema");

// @route  Get api/articleList
// @desc   Get all articles
// @access Public
router.get("/", (req, res) => {
    let amount = (req.body.amount != undefined) ? req.body.amount : 10; // Request 10 articles by default, or x if specified
    const maxArticles = 25;
    if (amount > maxArticles) amount = maxArticles;
    
    Article.find()
    .limit(amount)
    .then(articles => {
        /*articles.forEach(article => {
            const dbDate = new Date(article.date).toLocaleString();
            console.log(dbDate)
            article.date = dbDate
            console.log(article.date)
        })*/
        return res.json(articles)
    })
})

module.exports = router