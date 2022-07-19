<template>
  <div class="loading-page" v-if="loading">
    <Spinner />
  </div>
</template>

<script>
import Spinner from './Spinner.vue'
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    },
    components: {
      Spinner
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 30%;
    left: 50%;
    z-index: 1000;
    width: 5em;
    height: 5em;
  }
</style>
