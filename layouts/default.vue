<template>
<div class="layout">
    <Titlebar />
    <Nuxt class="page"/>
    <Modal ref="modal"/>
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
    .layout {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
    }
</style>
