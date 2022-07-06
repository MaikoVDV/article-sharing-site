<template>
<div>
    <Titlebar />
    <Nuxt class="page"/>
</div>
</template>
<style scoped lang="scss">
    @import "~/assets/scss/variables.scss";
    .page {
        position: fixed;
        top: $titlebar-thickness;
        width: 100%;
        height: 100%;
        background: $universal-background-color;
    }
</style>
