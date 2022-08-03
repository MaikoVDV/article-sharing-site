import crypto from 'crypto'
export default {
    methods: {
        authenticateUser() {
            // Get an Auth Code from Auth0. Redirects user to domain.auth0.com/authorize
            function base64URLEncode(str) {
                return str.toString('base64')
                    .replace(/\+/g, '-')
                    .replace(/\//g, '_')
                    .replace(/=/g, '');
            }
            function sha256(buffer) {
                return crypto.createHash('sha256').update(buffer).digest();
            }

            const verifier = base64URLEncode(crypto.randomBytes(32));
            const challenge = base64URLEncode(sha256(verifier));
            this.$store.commit('authInfo/addAuthChallenge', challenge)
            this.$store.commit('authInfo/addAuthVerifier', verifier)
            this.$cookies.set('verifier', verifier, { path: "/", sameSite: true, maxAge: 2 * 60 /* Cookie lasts 2 minutes */, secure: true })
            if(location.pathname != '/auth/signed-in') this.$cookies.set('currentPage', location.pathname, { path: "/", sameSite: true, maxAge: 2 * 60 /* Cookie lasts 2 minutes */, secure: true })

            const responseType = "code";
            const clientId = "BI1G7Qlow69cBRSJhfHMRJZZJWET2pGu";
            const scope = "openid profile email offline_access";
            const audience = "http://localhost:3001";
            const redirectURI = "http://localhost:3000/auth/signed-in";
            const codeChallengeMethod = "S256";
            const url = `https://article-sharing-site.eu.auth0.com/authorize?response_type=${responseType}&client_id=${clientId}&scope=${scope}&audience=${audience}&redirect_uri=${redirectURI}&code_challenge_method=${codeChallengeMethod}&challenge=${challenge}`
            window.location.href = url
        },
        getAccessToken() {
            return new Promise ((resolve, reject) => {
                // Using the Auth Code received earlier, get an access token, ID token and (optionally) a refresh token from Auth0.
                const verifier = this.$cookies.get("verifier")

                var options = {
                    method: 'POST',
                    url: 'https://article-sharing-site.eu.auth0.com/oauth/token',
                    headers: {'content-type': 'application/x-www-form-urlencoded'},
                    data: new URLSearchParams({
                        grant_type: 'authorization_code',
                        client_id: 'BI1G7Qlow69cBRSJhfHMRJZZJWET2pGu',
                        code_verifier: verifier,
                        code: this.$nuxt.context.query.code,
                        redirect_uri: 'http://localhost:3000'
                    })
                };
                this.$axios.$request(options).then(function (response) {
                    resolve(response.access_token)
                }).catch(function (error) {
                    console.error("Error while getting access token")
                    console.error(error);
                    reject(error)
                });
            })
        },
        getUserInfo(accessToken, thisObj) {
            return new Promise((resolve, reject) => {
                // Using the access token (stored in cookies and also state), get user info from Auth0.
                var options = {
                    method: 'GET',
                    url: 'https://article-sharing-site.eu.auth0.com/userinfo',
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                };
                thisObj.$axios.request(options).then(function (response) {
                    resolve(response.data)
                }).catch(function (error) {
                    console.error("Error while getting user info")
                    console.error(error);
                    reject(error)
                })
            });
        },
        getBasicUserInfo(userId, thisObj) {
            return new Promise((resolve, reject) => {
                // Using the access token (stored in cookies and also state), get user info from Auth0.
                var options = {
                    method: 'GET',
                    url: `http://localhost:3001/api/users/basicInfo/${userId}`
                };
                thisObj.$axios.request(options).then(function (response) {
                    resolve(response.data)
                }).catch(function (error) {
                    console.error("Error while getting basic user info")
                    console.error(error);
                    reject(error)
                })
            });
        },
        putDataIntoStore(profile, loggedIn, accessToken) {
            this.$store.commit('userProfile/setProfile', profile)
            this.$store.commit('authInfo/setLoggedIn', loggedIn)
            this.$store.commit('authInfo/addAccessToken', accessToken)
            this.$cookies.set("loggedInBefore", true, { sameSite: true, maxAge: 60 * 24 * 30, path: "/", secure: true})
            this.$cookies.set("accessToken", accessToken, { sameSite: true, maxAge: 60 * 24, path: "/", secure: true})
        }
    }
}