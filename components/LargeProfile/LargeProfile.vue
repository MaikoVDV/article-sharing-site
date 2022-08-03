<template>
  <div class="large-profile">
    <img :src="profile.picture">
    <div class="profile-info-display">
        <p class="username">{{profile.name}}</p>
        <p>Joined on the {{profile.date}}</p>
        <p>Wrote {{profile.written.length}} documents</p>
        <p>Starred {{profile.starred.length}} documents</p>
        <p>Voted on {{profile.voted.length}} documents</p>
        <p v-if="profile.weblink != ''">Voted on {{profile.voted.length}} documents</p>
        <p v-else>No link to personal website</p>
    </div>
  </div>
</template>

<script>
export default {
    computed: {
        profile() {
            let profile = this.$store.state.userProfile.profile
            if(profile.name == "") {
                // Profile has not been set yet.
                profile.name = "Finding profile info..."
            }
            return profile;
        }
    },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";
@import "~/assets/scss/generalSettings";
.large-profile {
    display: flex;
    flex-direction: row;
    height: $profile-large-height;
    width: 100%;

    img {
        @include rounded-icon;
        height: $profile-large-height;
        width: $profile-large-height;
        margin-right: 2rem;
    }
    .profile-info-display {
        display: flex;
        flex-direction: column;
        height: $profile-large-height;
        justify-content: space-between;
        width: 100%;

        p {
            margin: 0px;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            &.username {
                font-size: 2rem;
                font-weight: 500;
            }
        }
    }
}
</style>