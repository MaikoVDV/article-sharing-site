<template>
<div v-on:click="authenticateUser" id="sign-in">
<div class="highlighted-bg" alt="sign-in button">
    <p>Sign In</p>
</div>
</div>
</template>
<script>
import authMixin from '~/mixins/auth.js'
export default {
    mixins: [authMixin],
    async mounted() {
        if(this.$cookies.get("loggedInBefore") == true && !this.$store.state.authInfo.loggedIn && $nuxt.$route.path != "/auth/signed-in") {
            try {
                const token = this.$cookies.get("accessToken")
                await this.$axios.get("http://localhost:3001/api/verifyAccessToken", {headers: {"Authorization": `Bearer ${token}`}}).then(res => {
                    console.log("Token verified")
                    this.getUserInfo(token, this).then((userInfo) => {
                        this.getProfile(userInfo.sub, this).then(profile => {
                            this.putDataIntoStore(profile, true, token)
                        })
                    }).catch(err => {
                        console.log("Failed to get user info")
                    });
                }).catch(err => {
                    console.log("Failed to verify access token")
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