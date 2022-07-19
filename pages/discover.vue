<template>
<div class="page-content">
    <h1 class="page-title">Discover</h1>
    <ArticlePreview v-for="document in documents" :key="document.shortId" :document="document" />
</div>
</template>
<script>
    export default {
        head: {
            title: "Discover"
        },

        async asyncData({ $axios, $cookies }) {
            //console.log($cookies.get("access_token"))
            
            const res = await $axios.$get('http://localhost:3001/api/documentList', {
                headers: {
                    "Authorization": `Bearer ${$cookies.get("access_token")}`
                }
            })
            return { documents: res.data.documents}
        },
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/generalSettings.scss';
    .page-content {
        @include pageContentCentered;
    }
</style>