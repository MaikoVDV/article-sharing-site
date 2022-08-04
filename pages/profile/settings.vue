<template>
  <div class="page-content">
    <h1 class="page-title"><br/></h1>
    <div class="settings">
        <div class="navbar-container">
            <VerticalNavbar ref="profile-page-navbar" :buttons="pages" />
        </div>
        <div class="profile-info">
            <LargeProfile />
            Settings n documents n stuff
        </div>
    </div>
  </div>
</template>

<script>
import Modal from '~/mixins/modal.js'
export default {
    mixins: [Modal],
    async mounted() {
        const that = this;
        if(!this.$store.state.authInfo.loggedIn && this.$cookies.get("loggedInBefore") != true) {
            // User has not logged in.
            this.createModal(
                "Not logged in",
                `Your profile could not be found because you are not logged in. If you're trying to find someone else's profile, go to https://${location.host}/user/USER_ID`,
                [
                    {text: "I understand", type: "Default", action: function(){that.removeModal()}}
                ]
            )
        }
    },
    computed: {
        profile() {
            return this.$store.getters.profile
        }
    },
    data() {
        return {
            pages: [
                {
                    text: "Settings",
                    code: "settings"
                },
                {
                    text: "Written Articles",
                    code: "written"
                },
                {
                    text: "Starred Articles",
                    code: "starred"
                },
            ]
        }
    }
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/variables";
@import "~/assets/scss/generalSettings";
    .page-content {
        @include pageContentCentered;
        .settings {
            // Pretty much the whole page except the title
            display: flex;
            flex-direction: row;
            height: 100%;

            .navbar-container {
                width: 25%;
            }
            .profile-info {
                display: flex;
                flex-direction: column;
                width: 75%;
                height: 100%;
            }
        }
    }

</style>