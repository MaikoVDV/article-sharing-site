const express = require("express");
const router = express.Router();
const axios = require("axios");
const chalk = require("chalk")

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
            if(response.data.data.user == null) {
                return res.status(200).send(createNewUser(req.params.userId.toString()))
                // console.error(chalk.red.bold("Error: ") + chalk.red("Failed to get basic user info. Returned null. Here's the error"))
                // console.error(err)
                // return res.status(400).send("User was not found. Have you entered the right user ID?")
            }
            console.error(chalk.red.bold("Error: ") + chalk.red("Failed to get basic user info. Here's the error"))
            console.error(err);
            return res.status(400).send("User was not found. Have you entered the right user ID?")
        }
    }, error => {
        console.log(error)
        res.status(500).send("Failed to get basic information of user.")
    })
})
// Get a user's entire profile information.
router.get("/profile/:userId", async (req, res) => {
    const headers = {
        "content-type": "application/json",
        "apiKey": process.env.GRAPHQL_KEY
    };
    const graphqlQuery = {
        "query": `
        {
            user(query: {userId: "${req.params.userId.toString()}"}) {
                userId
                username
                profilePicture
                linkedWebsite
                writtenDocuments
                starredDocuments
                votedDocuments
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
        console.log(response.data)
        try {
            const user = response.data.data.user;
            const responseData = {
                userId: user.userId,
                username: user.username,
                iconLink: user.profilePicture,
                linkedWebsite: user.linkedWebsite,
                writtenDocuments: user.writtenDocuments,
                starredDocuments: user.starredDocuments,
                votedDocuments: user.votedDocuments
            }
            res.status(200).json(responseData)
        } catch(err) {
            if(response.data.data.user == null) {
                return res.status(200).send(createNewUser(req.params.userId.toString()))
                
                // console.error(chalk.red.bold("Error: ") + chalk.red("A user's profile was requested, but null was returned. The user probably hasn't signed up or a wrong ID was entered. Here's the error"))
                // console.error(err)
                // return res.status(400).send("User was not found. Have you entered the right user ID?")
            }
            console.error(chalk.red.bold("Failed to get a users profile. Here's the error"))
            console.error(err)
            return res.status(400).send("User's profile could not be found.")
        }
    }, error => {
        console.log(error);
        res.status(500).send("Failed to get user profile.")
    })
    return
    User.findOne({userId: req.params.userId}).then((userDataResponse, userDataError) => {

        const userData = {
            userId: userDataResponse.userId,
            username: userDataResponse.username,
            profilePicture: userDataResponse.profilePicture,
            linkedWebsite: userDataResponse.linkedWebsite,
            writtenDocuments: userDataResponse.writtenDocuments,
            starredDocuments: userDataResponse.starredDocuments,
            votedDocuments: userDataResponse.votedDocuments
        }
        console.log("Returning user data")
        done = true
        return res.status(200).send(userData)
    }).catch(async userFindingError => {
        console.log("Couldn't get user data.")
        const userExists = await User.exists({userId: req.params.userId})
        console.log("UserExists: " + userExists)
        if(userExists == null) {
            // User does not exists yet (in Mongo), so create one.
            console.log("User does not exist. Creating new one.")
            const auth0UserInfo = await requestUserInfo(req.params.userId)
            const newUser = new User({
                username: auth0UserInfo.nickname,
                profilePicture: auth0UserInfo.picture,
                email: auth0UserInfo.email,
                userId: req.params.userId,
            })
            await newUser.save().then((response, userSavingError) => {
                if(userSavingError) {
                    console.error("Failed to save account data to Mongo");
                    console.error(userSavingError)
                    done = true
                    return res.status(500).send("Failed to save account data :(")
                }
                //console.log(response)
                done = true
                const userData = {
                    userId: response.userId,
                    username: response.username,
                    profilePicture: response.profilePicture,
                    linkedWebsite: response.linkedWebsite,
                    writtenDocuments: response.writtenDocuments,
                    starredDocuments: response.starredDocuments,
                    votedDocuments: response.votedDocuments
                }
                return res.status(200).send(userData)
            })
            
            //return res.status(200).send("User does not exist. Do you want to sign up?")
        }
        if (!done) {
            console.log("Error finding user data.")
            console.log(userFindingError)
            //return res.status(400).json({ err: userFindingError.toString() })
            res.status(400).send(`Failed to find profile of user with id: ${req.params.userId}`)
        }
    })
})
async function createNewUser(id) {
    // User does not exists yet (in Mongo), so create one.
    console.log("User does not exist. Creating new one.")
    const auth0UserInfo = await requestUserInfo(id)
    const newUser = new User({
        username: auth0UserInfo.nickname,
        profilePicture: auth0UserInfo.picture,
        email: auth0UserInfo.email,
        userId: id,
    })
    await newUser.save().then((response, userSavingError) => {
        if(userSavingError) {
            console.error("Failed to save account data to Mongo");
            console.error(userSavingError)
            return res.status(500).send("Failed to save account data :(")
        }
        const userData = {
            userId: response.userId,
            username: response.username,
            profilePicture: response.profilePicture,
            linkedWebsite: response.linkedWebsite,
            writtenDocuments: response.writtenDocuments,
            starredDocuments: response.starredDocuments,
            votedDocuments: response.votedDocuments
        }
        return userData;
    })
}
async function requestUserInfo(id) {
    const requestConfig = {
        headers: {
            'Authorization': `Bearer ${managementKey}`
          }
    }
    let responseData = {}
    await axios.get(`https://article-sharing-site.eu.auth0.com/api/v2/users/${id}`, requestConfig).then((response) => {
        responseData = response.data
    }).catch(err => {
        console.error("Couldn't find user info in Auth0 database.")
        console.error(err.response.data);
        return res.status(400).send(`Failed to find information from user with id: ${id}`)
    });
    return responseData
}

module.exports = router