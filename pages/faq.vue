<template>
<div class="page-content">
    <h1 class="page-title">Frequently asked Questions</h1>
</div>
</template>
<script>
    export default {
        name: "FaqPage",
        head: {
            title: "Frequently asked questions"
        }
    }
</script>
<style lang="scss" scoped>
@import "~/assets/scss/variables";
@import "~/assets/scss/generalSettings";
    .page-content {
        @include pageContentCentered;
    }
</style>