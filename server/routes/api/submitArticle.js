const express = require("express");
const router = express.Router();
var { customAlphabet } = require("nanoid")
const nanoid = customAlphabet('0123456789', 12)

// Article model
const Document = require("../../models/fullArticle");

// @route  Get api/articleList
// @desc   Get all articles
// @access Public
router.get("/", (req, res) => {
    let amount = (req.body.amount != undefined) ? req.body.amount : 10; // Request 10 articles by default, or x if specified
    const maxArticles = 25;
    if (amount > maxArticles) amount = maxArticles;
    
    Document.find()
    .limit(amount)
    .then(documents => {
        return res.json(documents)
    })
})
// User submits article to server, which saves it to the database.
router.post("/", async (req, res) => {
    // Generating an ID that is unique to the article
    const shortId = await findUniqueID()
    if(shortId == null) {
        var err = "Error occurred! Failed to generate a unique short ID for the article. Please try again or contact the admin."
        console.log(err)
        return res.status(507).json({msg: err})
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
            return res.err.json({msg: "Error occurred!", err: err})
        }
        return res.json("Document posted!")
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