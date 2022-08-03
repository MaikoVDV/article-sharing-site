<template>
<div id="titlebar-container">
    <div class="titlebar">
        <div id="main-navigation">
            <TitlebarLogo tabindex="-1" />
            <TitlebarButton href="/" title="Home" tabindex="1" />
            <TitlebarButton href="/discover" title="Discover" tabindex="2" />
            <TitlebarButton href="/write" title="Write" tabindex="3" />
            <TitlebarButton href="/faq" title="FaQ" tabindex="4" />
        </div>
        <Profile tabindex="5" />
    </div>
    <div id="shadow" />
</div>
</template>
<script>
import AuthButton from '~/components/Auth/AuthButton.vue'
import Profile from "~/components/Titlebar/Profile/Profile.vue"
export default {
    components: {
        AuthButton,
        Profile,
    },
}
</script>
<style scoped lang="scss">
    @import "~/assets/scss/variables";
    @import "~/assets/scss/generalSettings";
    #titlebar-container {
        width: 100%;
        position: fixed !important;
        z-index: $z-index-titlebar;
        @include noOffsets;
    }
    .titlebar {
        // Sizing & Positioning
        width: 100%;
        height: $titlebar-thickness;
        position: fixed !important;
        box-sizing: border-box;
        @include noOffsets;

        // Styling
        background-color: $titlebar-bg-color;
        font-size: $titlebar-font-size;

        // Text-styling
        font-weight: 500;
        font-size: 1.1rem;

        @include horizontal-flexbox;
        justify-content: space-between;
    }
    #main-navigation {
        @include horizontal-flexbox;
        width: max-content;
        height: 100%;
        padding-left: 1rem;
    }
    #shadow {
        background-image: linear-gradient(to bottom, #00000033, transparent);
        position: fixed;
        top: $titlebar-thickness;
        height: calc($titlebar-thickness / 5);
        //height: 25px;
        width: 100%;
        z-index: $z-index-titlebar-shadow;
    }
</style>