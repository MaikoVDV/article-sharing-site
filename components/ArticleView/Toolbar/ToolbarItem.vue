<!--Shamelessly stolen from tiptap.dev/examples-->
<template>
  <button
    class="toolbar-item"
    :class="{ 'is-active': isActive ? isActive(): null }"
    @click="action"
    :title="title"
  >
  <img style="width:100%;" :src="iconRef"/>
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
    img {
        filter: brightness(0)
    }
  }
</style>