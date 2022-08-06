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
        width: 7rem;
        height: 3rem;
        background-color: $v-navbar-button-bg;
        border: none;

        transition: background-color 0.2s;
        transition-timing-function: ease-out;

        &:first-child {
            border-top-left-radius: $v-navbar-button-radius;
            border-bottom-left-radius: $v-navbar-button-radius;
        }
        &:last-child {
            border-top-right-radius: $v-navbar-button-radius;
            border-bottom-right-radius: $v-navbar-button-radius;
        }
        &.is-active,
        &:hover { // Animating hover
            background-color: $v-navbar-button-bg-hover;
        }
    }
}
</style>