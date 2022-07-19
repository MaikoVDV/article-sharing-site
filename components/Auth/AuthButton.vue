<template>
<div v-on:click="authenticateUser" id="sign-in">
<div class="highlighted-bg">
    <p>Sign In</p>
    <p>{{loggedIn}}</p>
</div>
</div>
</template>
<script>
import crypto from 'crypto'
export default {
    mounted() {
        if(!this.$store.state.authInfo.loggedIn && $nuxt.$route.path != "/auth/signed-in") {
            this.authenticateUser();
        }
    },
    computed: {
        loggedIn() {
            console.log("Auth button says: " + this.$store.state.authInfo.loggedIn)
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
            this.$cookies.set('verifier', verifier, { sameSite: true, maxAge: 2 * 60 /* Cookie lasts 2 minutes */ })

            const responseType = "code";
            const clientId = "BI1G7Qlow69cBRSJhfHMRJZZJWET2pGu";
            const scope = "openid profile email offline_access";
            const audience = "http://localhost:3001";
            const redirectURI = "http://localhost:3000/auth/signed-in";
            const codeChallengeMethod = "S256";
            const url = `https://article-sharing-site.eu.auth0.com/authorize?response_type=${responseType}&client_id=${clientId}&scope=${scope}&audience=${audience}&redirect_uri=${redirectURI}&code_challenge_method=${codeChallengeMethod}&challenge=${challenge}`
            window.location.href = url
        },
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