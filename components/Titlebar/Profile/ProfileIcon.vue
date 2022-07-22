<template>
    <div id="profile-image">
        <img :src="picture" referrerpolicy="no-referrer" alt="Profile Picture" />
    </div>
</template>
<script>
export default {
    props: {
        picture: String
    },
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/generalSettings.scss';
@import '~/assets/scss/variables.scss';
    #profile-image {
        width: 3rem;
        height: 3rem;

        img {
            width: 100%;
            height: 100%;
            @include rounded-icon;
        }
    }
</style>