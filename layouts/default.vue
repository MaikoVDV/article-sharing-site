<template>
<div>
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
    * {
        font-family: Arial, Helvetica, sans-serif;
    }
</style>
