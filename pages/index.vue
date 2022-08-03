<template>
  <div class="page-content">
    <h1 class="page-title">Homepage</h1>
    <p>pittig leeg</p>
  </div>
</template>

<script>
  export default {
    name: 'IndexPage',
    head: {
      title: "Home"
    }
  }
</script>
<style lang="scss" scoped>
@import "~/assets/scss/variables";
@import "~/assets/scss/generalSettings";
    .page-content {
        @include pageContentCentered;
    }
</style>