<template>
  <button class="modal-button" :class="type" v-on:click="action">
    <p>{{text}}</p>
  </button>
</template>

<script>
export default {
    props: {
        text: String,
        type: String,
        onClick: Function,
    },
    computed: {
        action() {
            console.log(this.onClick)
            if(this.onClick == null) {
                return function() {}
            }
            return this.onClick
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";
@import "~/assets/scss/generalSettings.scss";

    .modal-button {
        // Sizing
        box-sizing: border-box;
        height: $modal-input-height;
        padding: 0.75rem 1.5rem;
        margin: $modal-element-margin 0.5rem;
        // Styling
        border: none;
        border-radius: $modal-border-radius;

        font-size: 22px;
        font-weight: 600;
        // Backgrounds
        background-color: $modal-button-default-bg;
        transition: background-color 0.2s, color 0.2s, border-color 0.2s;
        transition-timing-function: ease-out;
        // Borders
        border-width: 0.25rem;
        border-style: solid;
        border-color: $modal-button-default-hover;

        &:hover {
            background-color: $modal-button-default-hover;
            border-color: $modal-button-default-border;
        }

        &.Confirm { // The blue one
            background-color: $modal-button-confirm-bg;
            border-color: $modal-button-confirm-hover;
            color: white;

            &:hover {
                background-color: $modal-button-confirm-hover;
                border-color: $modal-button-confirm-border;
            }
        }
        &.Danger { // The scary red one
            background-color: white;
            border-color: $modal-button-danger-bg;
            color: black;

            &:hover {
                background-color: $modal-button-danger-bg;
                border-color: $modal-button-danger-hover;
                color: white;
            }
        }

        &:focus {
            outline: none;
        }
    }
</style>