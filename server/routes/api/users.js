const express = require("express");
const router = express.Router();
const axios = require("axios")

const User = require("../../models/userSchema");
const jwtCheck = require("../../protectedRoute")

router.get("/basicInfo/:userId", async (req, res) => {
    User.findOne({userId: req.params.userId}).then((userDataResponse, userDataError) => {
        const userData = {
            username: userDataResponse.username,
            iconLink: userDataResponse.profilePicture
        }
        return res.status(200).send(userData)
    }).catch(async userFindingError => {
        const userExists = await User.exists({userId: req.params.userId})
        if(userExists == null) {
            return res.status(200).send("User does not exist.")
        }
        console.log("Error finding user data.")
        console.log(userFindingError)
        //return res.status(400).json({ err: userFindingError.toString() })
        res.status(400).send(`Failed to find basic info about user with id: ${req.params.userId}`)
    })
})
router.get("/profile/:userId", (req, res) => {
    let done = false;
    // const headers = {
    //     "content-type": "application/json",
    //     "apiKey": process.env.GRAPHQL_KEY
    // };
    // const graphqlQuery = {
    //     "query": `
    //     {
    //         user(query: {userId: ${req.params.userId}}) {
    //             username
    //             profilePicture
    //         }
    //     }
    //     `,
    //     "variables": {}
    // };
    // axios({
    //     url: process.env.GRAPHQL_ENDPOINT,
    //     method: 'post',
    //     headers: headers,
    //     data: graphqlQuery
    // })
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