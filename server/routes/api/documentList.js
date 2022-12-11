const express = require("express");
const router = express.Router();
const axios = require("axios");
const { ConvertDate } = require("../../mixins/ConvertDate.js")
// @route  Get api/articleList
// @desc   Get all articles
// @access Public
router.get("/", async (req, res) => {
    let amount = (req.body.amount != undefined) ? req.body.amount : 10; // Request 10 articles by default, or x if specified
    const maxArticles = 25;
    if (amount > maxArticles) amount = maxArticles;
    
    const headers = {
        "content-type": "application/json",
        "apiKey": process.env.GRAPHQL_KEY
    };
    const graphqlQuery = {
        "query": `
        {
            documents {
                shortId
                title
                date
                authorId
                description
            }
        }
        `,
        "variables": {}
    };
    axios({
        url: process.env.GRAPHQL_ENDPOINT,
        method: 'post',
        headers: headers,
        data: graphqlQuery
    }).then((response, err) => {
        if(err) {
            return res.status(500).json(err)
        }
        try {
            //console.log(response.data)
            let documents = response.data.data.documents;
            documents.sort((doc1, doc2) => new Date(doc1.date) - new Date(doc2.date))
            documents.reverse();
            documents.forEach(document => {
                document.date = ConvertDate(document.date)
            })
            return res.status(200).json(response.data)
        } catch (err) {
            console.error(err)
            return res.status(500).send("Failed to transmit data to client. Something went wrong on the server :(")
        }
    });
})

module.exports = router