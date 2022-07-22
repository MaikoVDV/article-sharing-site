const { expressjwt: jwt } = require("express-jwt")
const jwks = require("jwks-rsa")

// JWT middleware
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

module.exports = jwtCheck