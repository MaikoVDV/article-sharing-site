<template>
<div class="page-content">
    <h1 class="page-title">Signing in...</h1>
</div>
</template>
<script>
import authMixin from '~/mixins/auth.js'
export default {
    mixins: [authMixin],
    head: {
        title: "Signing in..."
    },
    mounted() {
        var that = this
        this.getAccessToken().then((accessToken) => {
            this.getUserInfo(accessToken, that).then((userInfo) => {
                this.getBasicUserInfo(userInfo.sub, this).then(profile => {
                    this.putDataIntoStore(profile, true, accessToken)
                    this.$router.push(this.$cookies.get("currentPage"))
                })
            }).catch(err => {
                console.log(err)
            });
        }).catch(err => {
            console.log(err)
        });
    }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/generalSettings.scss';
    .page-content {
        @include pageContentCentered;
    }
</style>