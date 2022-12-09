<template>
  <div class="settings-option">
    <p class="settings-title">{{title}}</p>
    <p class="settings-desc">{{description}}</p>
  </div>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
        type: String,
    }
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/variables";
@import "~/assets/scss/generalSettings";
.settings-option {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    background-color: $profile-settings-bg;
    padding: $profile-settings-padding;
    margin-bottom: $profile-default-margin;
    border-radius: $border-radius-large;


    box-shadow: 0px 0px 25px 0.2rem #00000033;
    transition: box-shadow 0.3s, width 0.3s, height 0.3s;
    p {
        margin: 0px;
        .settings-title {

        }
        .settings-desc {
            color: $profile-settings-desc-color;
        }
    }

    &:hover {
        box-shadow: 0px 0px 25px 0.5rem #00000055;
    }
}

</style>