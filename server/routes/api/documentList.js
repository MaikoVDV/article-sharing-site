const express = require("express");
const router = express.Router();
const axios = require("axios");
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
            const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            documents.forEach(document => {
                let originalDate = new Date(document.date)
                let day = originalDate.getDate()
                const month = months[originalDate.getMonth() - 1]
                const year = originalDate.getFullYear();
                switch(day % 10) {
                    case 1:
                        day = day + "st"
                        break;
                    case 2:
                        day = day + "nd"
                        break;
                    case 3:
                        day = day + "rd"
                        break;
                    default:
                        day = day + "th"
                        break;
                }
                document.date = `${day} of ${month} ${year}`
            })
            return res.status(200).json(response.data)
        } catch (err) {
            console.error(err)
            return res.status(500).send("Failed to transmit data to client. Something went wrong on the server :(")
        }
    });
})

module.exports = router