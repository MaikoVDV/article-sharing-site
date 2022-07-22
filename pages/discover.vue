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

        async asyncData({ $axios }) {
            try {
                const res = await $axios.$get('http://localhost:3001/api/documentList')
                return { documents: res.data.documents}
            } catch {
                console.log("Failed to request document list :(")
            }
        },
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/generalSettings.scss';
    .page-content {
        @include pageContentCentered;
    }
</style>