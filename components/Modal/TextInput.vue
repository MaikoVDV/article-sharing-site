<template>
  <div class="text-input">
    <input type="text" ref="textarea" :placeholder="placeholder" wrap="soft" />
  </div>
</template>

<script>
export default {
    props: {
        placeholder: String
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/variables.scss";
@import "~/assets/scss/generalSettings.scss";
    .text-input {
        input {
            box-sizing: border-box;
            width: 100%;
            height: $modal-input-height;
            border: none;
            border-radius: $modal-border-radius;
            padding: 0.5rem;
            margin: $modal-element-margin 0rem;
            &:focus {
                outline: none;
            }
            font-size: 20px;
            font-weight: 450;
        }
    }
</style>