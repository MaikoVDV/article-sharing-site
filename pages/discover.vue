<template>
<div class="page-content">
    <h1 class="page-title">Discover</h1>
    <!--<button @click="addArticles()">Click me!</button>-->
    <ArticlePreview v-for="article in articles" :key="article._id" :article="article" />
</div>
</template>
<script>
    export default {
        head: {
            title: "Discover"
        },

        async asyncData({ $axios }) {
            const res = await $axios.$get('http://localhost:3001/api/articleList')
            return { articles: res}
        },
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/generalSettings.scss';
    .page-content {
        @include pageContentCentered;
    }
</style>