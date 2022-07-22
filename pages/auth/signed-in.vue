<template>
<div class="page-content">
    <h1 class="page-title">Signing in...</h1>
</div>
</template>
<script>
export default {
    head: {
        title: "Signing in..."
    },
    mounted() {
        let getAccessToken = new Promise ((resolve, reject) => {
            // Using the Auth Code received earlier, get an access token, ID token and (optionally) a refresh token from Auth0.
            const verifier = this.$cookies.get("verifier")
            //console.log(query)

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
        function getUserInfo(accessToken, thisObj) {
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
        }

        getAccessToken.then((accessToken) => {
            var that = this
            getUserInfo(accessToken, that).then((userInfo) => {
                this.putDataIntoStore(userInfo, true, accessToken)
            }).catch(err => {
                console.log(err)
            });
        }).catch(err => {
            console.log(err)
        });
    },
    methods: {
        putDataIntoStore(userInfo, loggedIn, accessToken) {
            this.$store.commit('authInfo/setUserInfo', userInfo)
            this.$store.commit('authInfo/setLoggedIn', loggedIn)
            this.$store.commit('authInfo/addAccessToken', accessToken)
            this.$cookies.set("loggedInBefore", true, { sameSite: true, maxAge: 60 * 24 * 30, path: "/", secure: true})
            this.$cookies.set("accessToken", accessToken, { sameSite: true, maxAge: 60 * 24, path: "/", secure: true})
            this.$router.push(this.$cookies.get("currentPage"))
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/generalSettings.scss';
    .page-content {
        @include pageContentCentered;
    }
</style>