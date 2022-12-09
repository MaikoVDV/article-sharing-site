<template>
  <div>
    <Option 
      title="Change display name"
      description="Change the name others see in your articles and on your profile page"
      type="String"
    />
    <Option 
      title="Change profile picture"
      description="Change the picture others see in your articles and on your profile page"
      type="String"
    />
    <Option 
      title="Change linked webpage"
      description="Change the website link others see on your profile page"
      type="String"
    />
    <Option 
      title="Show starred articles on your profile page"
      description="Let others see the articles you’ve starred and voted on on your profile page. Does not affect your written articles, which are always shown"
      type="Boolean"
    />
    <Option 
      title="Show starred articles on your profile page"
      description="Let others see the articles you’ve starred and voted on on your profile page. Does not affect your written articles, which are always shown"
      type="Danger"
    />
  </div>
</template>

<script>
import SettingsOption from './SettingsOption.vue'
export default {
  components: {
    Option: SettingsOption
  }
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/variables";
@import "~/assets/scss/generalSettings";


</style>