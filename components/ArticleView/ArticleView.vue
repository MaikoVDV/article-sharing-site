
<template>
<div id="article-view" v-if="titleEditor && contentEditor">
  <editor-content class="editor-content TitleEditor" :editor="titleEditor" />
  <hr />
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
  },
}
</script>
<style lang="scss" scoped>
  .TitleEditor {
    padding-bottom: 0px !important;
  }
  .ContentEditor {
  }
</style>