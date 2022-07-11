<template>
<div id="titlebar-container">
    <div class="titlebar">
        <div id="main-navigation">
            <TitlebarLogo />
            <TitlebarButton href="/" title="Home"/>
            <TitlebarButton href="/discover" title="Discover"/>
            <TitlebarButton href="/write" title="Write"/>
            <TitlebarButton href="/faq" title="FaQ"/>
        </div>
    </div>
    <div id="shadow" />
</div>
</template>
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
        @include noOffsets;

        // Styling
        background-color: $titlebar-bg-color;
        font-size: $titlebar-font-size;

        // Text-styling
        font-family: 'Lato', Arial, sans-serif;

        @include horizontal-flexbox;
    }
    #main-navigation {
        @include horizontal-flexbox;
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