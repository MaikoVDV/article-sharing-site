const express = require("express");
const router = express.Router();
const axios = require("axios")

router.get("/basicInfo/:userId", (req, res) => {
    const requestConfig = {
        headers: {
            'Authorization': `Bearer ${managementKey}`
          }
    }
    axios.get(`https://article-sharing-site.eu.auth0.com/api/v2/users/${req.params.userId}`, requestConfig).then((response) => {
        const responseData = {
            username: response.data.nickname,
            iconLink: response.data.picture,
        }
        return res.status(200).json(responseData)
    }).catch(err => {
        console.log(err.response.data);
        return res.status(400).json(err.response.data)
    });
})

module.exports = router