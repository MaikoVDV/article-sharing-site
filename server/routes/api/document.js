const express = require("express");
const router = express.Router();
var { customAlphabet } = require("nanoid")
const nanoid = customAlphabet('0123456789', 12)
const axios = require("axios")

// Article model
const Document = require("../../models/fullArticle");
const config = require("config")

// router.get("/old/:articleId", (req, res) => {
//     var articleId = Number(req.params.articleId)
//     if(!Number.isInteger(articleId) || articleId < 0 || articleId > 999999999999) {
//         console.log("Invalid articleID requested.")
//         return res.status(400).json({ msg: "The ID of the article requested is invalid. Must be a 12 digit positive number." })
//     }

//     Document.findOne({shortId: articleId})
//     .then((document, err) => {
//         if(err) {
//             console.log(err);
//             return res.status(500).send("An error occurred on the server while processing your request.")
//         }
//         if(document == null) {
//             return res.status(404).send("The requested article could not be found.")
//         }
//         return res.status(200).json(document)
//     })
// })
router.get("/:articleId", (req, res) => { // Route to get an article (shown in client at /article/{shortId})
    var articleId = Number(req.params.articleId)
    if(!Number.isInteger(articleId) || articleId < 0 || articleId > 999999999999) {
        console.log("Invalid articleID requested.")
        return res.status(400).json({ msg: "The ID of the article requested is invalid. Must be a 12 digit positive number." })
    }

    const headers = {
        "content-type": "application/json",
        "apiKey": process.env.GRAPHQL_KEY
    };
    const graphqlQuery = {
        "query": `
        {
            document(query: {shortId: ${articleId}}) {
                title
                date
                document {
                    type
                    content {
                        attrs {
                            language
                            level
                        }
                        content {
                            type
                            text
                            marks {
                                type
                            }
                        }
                        type
                    }
                }
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
        return res.status(200).json(response.data)
    });
})

// User submits article to server, which saves it to the database.
router.post("/", async (req, res) => {
    // Generating an ID that is unique to the article
    const shortId = await findUniqueID()
    if(shortId == null) {
        var err = "Error occurred! Failed to generate a unique short ID for the article. Please try again or contact the admin."
        console.log(err)
        return res.status(507).send(err)
    }

    const document = new Document({
        title: req.body.title, // Title of the article, plaintext
        document: req.body.document, // The article itself, XML
        shortId: shortId // A 12 digit number unique to the article, to be used in the URL in stead of the Mongo ObjectID because it's ugly.
    })
    // NEEDS VERIFYING AND LIKE CYBERSECURITY STUFF YOU KNOW


    // Committing the article to the database
    document.save().then((response, err) => {
        if(err) {
            console.log(err)
            return res.err.send(err)
        }
        return res.send("Document posted!")
    })
})
// A function to find a unique ID (12-digit number) for an article
async function findUniqueID() {
    var shortId = null;
    var i = 0;
    while(shortId === null && i < 10) {
        var tempId = nanoid()
        if(await Document.count({shortId: tempId}) == 0) {
            shortId = tempId;
        }

        i++; //Max of 10 tries to avoid DDOSing myself. Should be good since there are 1 trillion - 1 unique IDs possible
    }
    return shortId;
}
module.exports = router