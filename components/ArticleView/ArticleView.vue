
<template>
<div id="article-view" v-if="titleEditor && contentEditor">
  <pre><editor-content class="editor-content TitleEditor" :editor="titleEditor" /></pre>
  <div 
    id="character-count" 
    v-if="titleEditor" 
    :class="
      (titleEditor.storage.characterCount.characters() < maxTitleLength) ? `title-ok` : `title-not-ok`
    ">
    {{ titleEditor.storage.characterCount.characters() }}/{{ maxTitleLength }}
  </div>
  <hr id="title-separator" />
  <editor-content class="editor-content ContentEditor" :editor="contentEditor" />
</div>
</template>

<script>
import { EditorContent } from '@tiptap/vue-2'
export default {
  components: {
    EditorContent
  },
  props: {
    titleEditor: {
      type: Object,
      required: true,
    },
    contentEditor: {
      type: Object,
      required: true,
    },
    maxTitleLength: Number
  },
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/variables.scss";
@import "~/assets/scss/generalSettings.scss";
  .TitleEditor {
    padding-bottom: 0px !important;
  }
  .ContentEditor {
  }
  #character-count {
    padding: 0px 3rem;
  }
  .title-ok {
    color: $article-secondary-color;
  }
  .title-not-ok {
    color: red;
  }
</style>