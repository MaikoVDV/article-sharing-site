<!--Shamelessly stolen from tiptap.dev/examples-->
<template>
  <button
    class="toolbar-item"
    :class="{ 'is-active': isActive ? isActive(): null }"
    @click="action"
    :title="title"
  >
  <img :src="iconRef"/>
  </button>
</template>

<script>

export default {
  computed: {
    iconRef() {
      try {
        return require(`~/assets/images/Toolbar Icons/${this.icon}.png`)
      } catch {
        console.error(`Icon not found in ~/assets/images/Toolbar Icons\n Icon name:${this.icon}`)
      }
    }
  },
  props: {
    icon: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    action: {
      type: Function,
      required: true,
    },

    isActive: {
      type: Function,
      default: null,
    },
  },
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";
@import "~/assets/scss/generalSettings.scss";
  .toolbar-item {
    width: $edit-area-toolbar-width;
    height: $edit-area-toolbar-width;
    background-color: $toolbar-button-color;
    border: none;

    transition: background-color 0.2s;
    transition-timing-function: ease-out;

    &:first-child {
      border-top-left-radius: 25%;
    }
    &:last-child {
      border-bottom-left-radius: 25%;
    }
    &.is-active,
    &:hover { // Animating hover
      background-color: $toolbar-button-color-hover;
    }
    img {
        filter: brightness(0);
        width: 60%;
        height: 60%;
    }
  }
</style>