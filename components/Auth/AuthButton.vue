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
        if($nuxt.$route.path == "/auth/signed-in") return;
        if(this.$cookies.get("loggedInBefore") == true) {
            if(!this.$store.state.authInfo.loggedIn) {
                const token = this.$cookies.get("accessToken")
                await this.$axios.get("https://article-sharing-site-server.onrender.com/api/verifyAccessToken", {headers: {"Authorization": `Bearer ${token}`}}).then(async () => {
                    await this.getUserInfo(token, this).then(async (userInfo) => {
                        // On success
                        await this.getProfile(userInfo.sub, this).then(async profile => {
                            console.log("Putting data into store.")
                            this.putDataIntoStore(profile, true, token)
                            return;
                        }, err => {
                            // On fail
                            console.error("Failed to get profile")
                            console.error(err)
                        })
                    }, err => {
                        // On fail
                        console.error("Failed to get user info")
                        console.error(err)
                    });
                }, err => {
                    // On fail
                    console.error("Failed to verify access token")
                    console.error(err)
                    return this.authenticateUser();
                })
            } else {
                // Automatically try to sign in if the user has logged in before, but is not logged in currently.
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