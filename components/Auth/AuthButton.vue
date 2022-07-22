<template>
<div v-on:click="authenticateUser" id="sign-in">
<div class="highlighted-bg" alt="sign-in button">
    <p>Sign In</p>
</div>
</div>
</template>
<script>
import crypto from 'crypto'
export default {
    async mounted() {
        if(this.$cookies.get("loggedInBefore") == true && !this.$store.state.authInfo.loggedIn && $nuxt.$route.path != "/auth/signed-in") {
            try {
                const token = this.$cookies.get("accessToken")
                await this.$axios.get("http://localhost:3001/api/verifyAccessToken", {headers: {"Authorization": `Bearer ${token}`}}).then(res => {
                    console.log("Token verified")
                    this.getUserInfo(token, this).then((userInfo) => {
                        this.putDataIntoStore(userInfo, true, token)
                    }).catch(err => {
                        console.log(err)
                    });
                }).catch(err => {
                    console.log("Error happened")
                    return this.authenticateUser();
                })
            } catch (err) {
                return this.authenticateUser();
            }
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.authInfo.loggedIn
        }
    },
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
            this.$cookies.set('currentPage', location.pathname, { path: "/", sameSite: true, maxAge: 2 * 60 /* Cookie lasts 2 minutes */, secure: true })

            const responseType = "code";
            const clientId = "BI1G7Qlow69cBRSJhfHMRJZZJWET2pGu";
            const scope = "openid profile email offline_access";
            const audience = "http://localhost:3001";
            const redirectURI = "http://localhost:3000/auth/signed-in";
            const codeChallengeMethod = "S256";
            const url = `https://article-sharing-site.eu.auth0.com/authorize?response_type=${responseType}&client_id=${clientId}&scope=${scope}&audience=${audience}&redirect_uri=${redirectURI}&code_challenge_method=${codeChallengeMethod}&challenge=${challenge}`
            window.location.href = url
        },
        getUserInfo(accessToken, thisObj) {
            return new Promise((resolve, reject) => {
                console.log("Getting user info")
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
        putDataIntoStore(userInfo, loggedIn, accessToken) {
            this.$store.commit('authInfo/setUserInfo', userInfo)
            this.$store.commit('authInfo/setLoggedIn', loggedIn)
            this.$store.commit('authInfo/addAccessToken', accessToken)
            this.$cookies.set("loggedInBefore", true, { sameSite: true, maxAge: 60 * 24 * 30, path: "/", secure: true})
            this.$cookies.set("accessToken", accessToken, { sameSite: true, maxAge: 60 * 24, path: "/", secure: true})
        }
    }
}
</script>
<style scoped lang="scss">
    @import "~/assets/scss/variables";
    @import "~/assets/scss/generalSettings";

    #sign-in {
        background-color: $highlight-color-primary;

        p {
            color: white;
            font-weight: bolder;
            margin: 0px;
        }
        .highlighted-bg {
            // width: 100%;
            // height: 100%;
            padding: 0px 3rem;
            height: $titlebar-thickness - 1rem;
            justify-content: center;
            align-content: center;
            display: grid;

            // Background & animation
            background-image: radial-gradient(closest-corner, $highlight-color-secondary 50%, transparent 50%);
            background-color: transparent;
            background-size: 0% 100%;
            background-position: 50% 50%;
            background-repeat: no-repeat;
            
            transition: background-size 0.2s, color 0.2s;
            transition-timing-function: ease-out;

            &:hover {
                background-size: 200% 200%;
            }
        }
    }
</style>