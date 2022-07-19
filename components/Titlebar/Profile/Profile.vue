<template>
    <div v-if="logged_in" id="profile-container">
        <ProfileText :name="username" />
        <ProfileIcon :picture="profile_picture" />
    </div>
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
            return this.$store.state.authInfo.userInfo.nickname;
        },
        profile_picture() {
            return this.$store.state.authInfo.userInfo.picture;
        },
        logged_in() {
            return this.$store.state.authInfo.loggedIn
        }
    },
}
</script>
<style lang="scss" scoped>
#profile-container {
    width: fit-content;
    height: 100%;
    justify-self: flex-end;

    display: flex;
    align-items: center;
}
</style>