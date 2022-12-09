<template>
  <div class="horizontal-navbar">
    <button v-for="button in buttons" :key="button.code" v-on:click="updateSelected(button.code)" :class="(currentlySelected == button.code) ? 'is-active' : ''">
        <p>
            {{button.text}}
        </p>
    </button>
  </div>
</template>

<script>
export default {
    expose: ["currentlySelected"],
    data() {
        return {
            currentlySelected: this.buttons[0].code
        }
    },
    props: {
        buttons: Array
    },
    methods: {
        updateSelected(code) {
            this.currentlySelected = code;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";
@import "~/assets/scss/generalSettings";
.horizontal-navbar {
    display: flex;
    flex-direction: row;
    
    button {
        width: $profile-navbar-button-width;
        height: $profile-navbar-button-height;
        background-color: $profile-navbar-button-bg;
        border: none;

        transition: background-color 0.2s;
        transition-timing-function: ease-out;

        &:first-child {
            border-top-left-radius: $profile-navbar-button-radius;
            border-bottom-left-radius: $profile-navbar-button-radius;
        }
        &:last-child {
            border-top-right-radius: $profile-navbar-button-radius;
            border-bottom-right-radius: $profile-navbar-button-radius;
        }
        &.is-active,
        &:hover { // Animating hover
            background-color: $profile-navbar-button-bg-hover;
        }
    }
}
</style>