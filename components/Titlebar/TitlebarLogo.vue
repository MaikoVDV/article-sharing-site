<template>
    <NuxtLink to="/"><img src="~/assets/images/Amogus.png" alt="Logo"></NuxtLink>
</template>

<style scoped lang="scss">
    @import "~/assets/scss/variables.scss";
    img {
        $h: $titlebar-thickness - $titlebar-font-size;
        height: $h;
        width: $h;
    }
</style>