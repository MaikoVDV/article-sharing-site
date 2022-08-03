const express = require("express");
const router = express.Router();
const axios = require("axios")

// Get a user's basic info (name and pfp)
router.get("/user/:userId/writtenDocuments", async (req, res) => {
    const headers = {
        "content-type": "application/json",
        "apiKey": process.env.GRAPHQL_KEY
    };
    const graphqlQuery = {
        "query": `
        {
            documents(query: {authorId: "${req.params.userId.toString()}"}) {
                username
                profilePicture
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
    }).then(response => {
        const documents = response.data.data.user;
        let responseData = []
        documents.forEach(document => {
            responseData.push({
                title: document.title
            })
        })
        res.status(200).json(responseData)
    }, error => {
        console.log(error)
        res.status(500).send("Failed to get basic information of user.")
    })
})
// NOT SURE IF IM EVER GOING TO USE THIS ROUTE. THIS IS JUST BOILERPLATE, I THINK