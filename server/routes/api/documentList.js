const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("config");

// @route  Get api/articleList
// @desc   Get all articles
// @access Public
router.get("/", async (req, res) => {
    let amount = (req.body.amount != undefined) ? req.body.amount : 10; // Request 10 articles by default, or x if specified
    const maxArticles = 25;
    if (amount > maxArticles) amount = maxArticles;
    await new Promise(r => setTimeout(r, 10000));

    
    const headers = {
        "content-type": "application/json",
        "apiKey": config.get("graphQL.apiKey")
    };
    const graphqlQuery = {
        "query": `
        {
            documents {
                shortId
                title
                date
            }
        }
        `,
        "variables": {}
    };

    axios({
        url: config.get("graphQL.endpoint"),
        method: 'post',
        headers: headers,
        data: graphqlQuery
    }).then((response, err) => {
        if(err) {
            return res.status(500).json(err)
        }
        return res.status(200).json(response.data)
    });
})

module.exports = router