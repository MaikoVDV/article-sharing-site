// Importing libraries
const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv')

// Importing middleware
const { expressjwt: jwt } = require("express-jwt")
const jwks = require("jwks-rsa")
// Getting the routes
const testRoute = require('./routes/api/testRoute');
const articleList = require('./routes/api/articleList');
const write = require('./routes/api/write');
const document = require('./routes/api/document');
const documentList = require('./routes/api/documentList');

// Getting the .env file
dotenv.config(); 
// Initializing the express app
const app = express()
const port = 3001
// Bodyparser middleware
app.use(express.json());
// JWT Middleware
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://article-sharing-site.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:3001',
  issuer: 'https://article-sharing-site.eu.auth0.com/',
  algorithms: ['RS256']
});
app.use(jwtCheck);

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
    .then(() => console.log("Connected to database"))
    .catch(err => console.log(err));

// Using the routes
app.use('/api/testRoute', testRoute);
app.use('/api/articleList', articleList);
app.use('/api/write', write);
app.use('/api/document', document);
app.use('/api/documentList', documentList);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
