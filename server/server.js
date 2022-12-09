// Importing libraries
const express = require('express'); // Handles incoming requests
const mongoose = require('mongoose'); // Middleware for connecting to Mongo
const cors = require('cors'); // Grr CORS
const dotenv = require('dotenv'); // Used for accessing secure configuration info
const axios = require("axios") // Used for making requests to Auth0
const chalk = require("chalk"); // Used for styling output in terminal

// Importing middleware
// Getting the routes
const document = require('./routes/api/document.js');
const documentList = require('./routes/api/documentList');
const users = require('./routes/api/users');
const verifyAccessToken = require('./routes/api/verifyAccessToken');

// Getting the .env file
dotenv.config(); 
// Initializing the express app
const app = express()
const port = 3001
// Bodyparser middleware
app.use(express.json());

// CORS middleware to allow requests from other domains
const corsConfig = {
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"]
}
app.use(cors(corsConfig));

// Database config
const db = process.env.MONGO_URI;

// Connecting to database
mongoose.connect(db)
    .then((res) => console.log(chalk.white(`Connected to database ${chalk.blue.bold(res.connection.name)} at ${chalk.blue.bold(res.connection.host)}:${chalk.blue.bold(res.connection.port)}`)))
    .catch(err => console.log(err));

// Using the routes
app.use('/api/document', document);
app.use('/api/documentList', documentList);
app.use('/api/users', users);
app.use('/api/verifyAccessToken', verifyAccessToken)

app.get('/', (req, res) => {
  res.send("Git off ma property")
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
// Get an access token to communicate with the Auth0 management API. The token expires every x seconds, so it needs to be refreshed periodically.
const accessTokenRequestConfig = {
  grant_type: "client_credentials",
  client_id: process.env.AUTH0_API_CLIENT_ID,
  client_secret: process.env.AUTH0_API_CLIENT_SECRET,
  audience: process.env.AUTH0_API_MANAGEMENT_AUDIENCE
}
RefreshAccessToken();
async function RefreshAccessToken() {
  const res = await axios.post("https://article-sharing-site.eu.auth0.com/oauth/token", accessTokenRequestConfig)
  global.managementKey = res.data.access_token
  var timeout = res.data.expires_in * 1000; // expires_in is in seconds, while setTimeout uses milliseconds
  await new Promise(r => setTimeout(r, timeout));
}
