// Imports
const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Getting the routes
const testRoute = require('./routes/api/testRoute');
const articleList = require('./routes/api/articleList');
const write = require('./routes/api/write');

// Initializing the express app
const app = express()
const port = 3001
// Bodyparser middleware
app.use(express.json());


const config = require('config') // Importing config from ./config/default.json


// CORS middleware to allow requests from other domains
const corsConfig = {
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"]
}
app.use(cors(corsConfig));

// Database config
const db = config.get('mongoURI');

// Connecting to database
mongoose.connect(db)
    .then(() => console.log("Connected to database"))
    .catch(err => console.log(err));

// Using the routes
app.use('/api/testRoute', testRoute);
app.use('/api/articleList', articleList);
app.use('/api/write', write);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
