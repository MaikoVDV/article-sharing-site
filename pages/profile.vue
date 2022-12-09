<template>
    <div class="page-content">
        <h1 class="page-title"><br/></h1>
        <LargeProfile class="large-profile-display" />
        <HorizontalNavbar class="horizontal-navbar" ref="profile-page-navbar" :buttons="pages" />
        <Settings v-if="horizontalNavbar && horizontalNavbar.currentlySelected == 'settings'" />
        <Written v-if="horizontalNavbar && horizontalNavbar.currentlySelected == 'written'" />
        <Starred v-if="horizontalNavbar && horizontalNavbar.currentlySelected == 'starred'" />
    </div>
</template>

<script>
import Modal from '~/mixins/modal.js'
import Settings from '~/components/ProfileSections/Settings/Settings.vue'
import Written from '~/components/ProfileSections/Written.vue'
import Starred from '~/components/ProfileSections/Starred.vue'

export default {
    mixins: [Modal],
    components: {
        Settings,
        Written,
        Starred,
    },
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
        this.horizontalNavbar = this.$refs["profile-page-navbar"];
    },
    computed: {
        profile() {
            return this.$store.getters.profile
        },
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
            ],
            horizontalNavbar: null
        }
    },
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/variables";
@import "~/assets/scss/generalSettings";
    .page-content {
        @include pageContentCentered;
        // Pretty much the whole page except the title
        height: 100%;

        .navbar-container {
            width: 25%;
        }
        .horizontal-navbar,
        .large-profile-display {
            margin-bottom: $profile-default-margin;
        }
    }

</style>