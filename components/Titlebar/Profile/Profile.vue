<template>
    <NuxtLink to="/profile" v-if="logged_in" id="profile-container">
        <ProfileText :name="username" />
        <ProfileIcon :picture="profile_picture" />
    </NuxtLink>
    <AuthButton v-else />
</template>
<script>
import ProfileIcon from './ProfileIcon.vue';
import ProfileText from './ProfileText.vue';
import AuthButton from '~/components/Auth/AuthButton.vue'
export default {
    components: { 
        ProfileIcon,
        ProfileText,
        AuthButton,
    },
    computed: {
        username() {
            return this.$store.state.userProfile.profile.name;
        },
        profile_picture() {
            return this.$store.state.userProfile.profile.picture;
        },
        logged_in() {
            return this.$store.state.authInfo.loggedIn
        }
    },
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";
@import "~/assets/scss/generalSettings.scss";
#profile-container {
    // Positioning container
    width: fit-content;
    height: 100%;
    justify-self: flex-end;
    box-sizing: border-box;
    padding: 0 1rem;
    // Positioning children
    display: flex;
    align-items: center;
    // Getting rid of NuxtLink attributes
    outline: none;
    text-decoration: none;
    color: black;
    // Styling
    background-color: white;
    // Border
        // Background & animation
        //background-image: radial-gradient(closest-corner, #00000044 50%, transparent 50%);
        background-image: linear-gradient(to left, $titlebar-profile-bg-hover 50%, transparent 50%);
        background-color: transparent;
        background-size: 0% 100%;
        //background-position: 50% 50%;
        background-repeat: no-repeat;
        background-position: right center;
        
    border: 1px transparent solid;
    border-radius: $border-radius-large 0 0 $border-radius-large;
    transition: background-size 0.2s, border-color 0.2s;
    transition-timing-function: ease-out;
    &:hover {
        border-color: $titlebar-profile-border-color;
        background-size: 200% 200%;
    }
}
</style>