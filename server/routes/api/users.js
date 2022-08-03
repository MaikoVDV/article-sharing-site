const express = require("express");
const router = express.Router();
const axios = require("axios");
const chalk = require("chalk")
const { ConvertDate } = require("../../mixins/ConvertDate.js")

const User = require("../../models/user.js")

// Get a user's basic info (name and pfp)
router.get("/basicInfo/:userId", async (req, res) => {
    const userId = req.params.userId.toString();
    const headers = {
        "content-type": "application/json",
        "apiKey": process.env.GRAPHQL_KEY
    };
    const graphqlQuery = {
        "query": `
        {
            user(query: {userId: "${userId}"}) {
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
        try {
            const user = response.data.data.user;
            const responseData = {
                username: user.username,
                iconLink: user.profilePicture,
            }
            res.status(200).json(responseData)
        } catch (err) {
            catchErr()
            async function catchErr() {
                let done = false;
                if(response.data.data.user == null) {
                    await createNewUser(userId, res).then(data => {
                        if(data?.error != undefined) {
                            // Error occurred while trying to get data from Auth0.
                            console.error(chalk.red(chalk.bold("Error: ") + "Failed to save user. They probably haven't logged in with Auth0 yet and a nonexistent ID was requested."))
                            return res.status(400).send(`No profile with id ${userId} was found, and no profile could be created. Have you logged in yet?`)
                        }
                        done = true;
                    })
                }
                if(done) return
                console.error(chalk.red.bold("Failed to get a users basic info. Here's the error"))
                console.error(err)
                return res.status(400).send("User's basic info could not be found.")
            }
        }
    }, error => {
        try {
            console.log(error)
            //res.status(500).send("Failed to get basic information of user.")

        } catch(err) {
            console.log("caught")
        }
    })
})
// Get a user's entire profile information.
router.get("/profile/:userId", async (req, res) => {
    const id = req.params.userId.toString();
    const headers = {
        "content-type": "application/json",
        "apiKey": process.env.GRAPHQL_KEY
    };
    const graphqlQuery = {
        "query": `
        {
            user(query: {userId: "${id}"}) {
                userId
                username
                profilePicture
                linkedWebsite
                writtenDocuments
                starredDocuments
                votedDocuments
                settings {
                    showStarredDocuments
                    showVotedDocuments
                }
                date
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
        try {
            const user = response.data.data.user;
            const responseData = {
                userId: user.userId,
                username: user.username,
                iconLink: user.profilePicture,
                linkedWebsite: user.linkedWebsite,
                writtenDocuments: user.writtenDocuments,
                starredDocuments: user.starredDocuments,
                votedDocuments: user.votedDocuments,
                settings: user.settings,
                date: ConvertDate(user.date)
            }
            res.status(200).json(responseData)
        } catch (err) {
            catchErr()
            async function catchErr() {
                let done = false;
                console.log(response.data)
                if(response.data.data.user == null) {
                    await createNewUser(id, res).then(data => {
                        if(data?.error != undefined) {
                            // Error occurred while trying to get data from Auth0.
                            console.error(chalk.red(chalk.bold("Error: ") + "Failed to save user. They probably haven't logged in with Auth0 yet and a nonexistent ID was requested."))
                            done = true;
                            return res.status(400).send(`No profile with id ${id} was found, and no profile could be created. Have you logged in yet?`)
                        }
                    })
                }
                if(done) return
                console.error(chalk.red.bold("Failed to get a users profile. Here's the error"))
                console.error(err)
                return res.status(400).send("User's profile could not be found.")
            }
        }
    }, error => {
        console.log(error);
        //res.status(500).send("Failed to get user profile.")
    })
})
async function createNewUser(id, res) {
    // User does not exist yet (in Mongo), so create one.
    console.log(chalk.greenBright("Creating a new user!"))
    const auth0UserInfo = await requestUserInfo(id, res)
    if(auth0UserInfo.status.code != "success") {
        // Something went wrong finding user info.
        return { error: auth0UserInfo.status.err }
    }
    const newUser = new User({
        username: auth0UserInfo.data.nickname,
        profilePicture: auth0UserInfo.data.picture,
        email: auth0UserInfo.data.email,
        userId: id,
    })
    await newUser.save().then((response, userSavingError) => {
        if(userSavingError) {
            console.error(chalk.red(chalk.bold("Error: ") + "Failed to save account data to Mongo. Here's the error"));
            console.error(userSavingError)
            return res.status(500).send("Failed to save account data :(")
        }
        const userData = {
            userId: response.userId,
            username: response.username,
            iconLink: response.profilePicture,
            linkedWebsite: response.linkedWebsite,
            writtenDocuments: response.writtenDocuments,
            starredDocuments: response.starredDocuments,
            votedDocuments: response.votedDocuments,
            date: response.date,
        }
        return res.status(200).send(userData)
    })
}
async function requestUserInfo(id, res) {
    let status = { code: "success", err: undefined };
    const requestConfig = {
        headers: {
            'Authorization': `Bearer ${managementKey}`
          }
    }
    let responseData = {}
    await axios.get(`https://article-sharing-site.eu.auth0.com/api/v2/users/${id}`, requestConfig).then((userProfile) => {
        responseData = userProfile.data
    }).catch(err => {
        console.error(chalk.red(chalk.bold("Error: ") + "Couldn't find user info in Auth0 database. Here's the error:"))
        console.error(err.response.data);
        status = { code: 400, err: err.response.data }
        //res.status(400).send(`Failed to find information from user with id: ${id}`)
    });
    return { data: responseData, status: status }
}

module.exports = router