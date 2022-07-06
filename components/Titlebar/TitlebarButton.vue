<template>
    <NuxtLink :to=href><div class="navigation-button">{{title}}</div></NuxtLink>
</template>
<script>
    export default {
        props: {
            href: String,
            title: String
        }
    }
</script>
<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";
    .navigation-button {
        // Sizing
        padding: 0px $titlebar-button-horizontal-padding;
        height: $titlebar-thickness - 1rem;

        // Aligning text to center
        display: grid;
        align-items: center;

        // Background & animation
        background-image: radial-gradient(closest-corner, black 50%, transparent 50%);
        background-color: transparent;
        background-size: 0% 100%;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        
        transition: background-size 0.2s, color 0.2s;
        transition-timing-function: ease-out;

        color: black;

        &:hover { // Animating hover
            background-size: 200% 200%;
            color: white;
        }
    }
    a {
        text-decoration-line: none;
        .navigation-button {
            border-right: $titlebar-button-border;
        }
        &:last-child {
            .navigation-button {
                border-right: none;
            }
        }
    }
</style>