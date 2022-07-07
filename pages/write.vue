<template>
<div class="page-content">
    <h1 class="page-title">Write</h1>
    <client-only>
        <div id="edit-area">
            <Toolbar id="edit-toolbar" :editor="this.contentEditor"/>
            <ArticleView :maxTitleLength="this.maxTitleLength" :titleEditor="this.titleEditor" :contentEditor="this.contentEditor"/>
        </div>
    </client-only>
</div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Highlight from '@tiptap/extension-highlight'
import History from '@tiptap/extension-history'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'

import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'

import Toolbar from '~/components/ArticleView/Toolbar/Toolbar.vue'

const CustomTitle = Document.extend({
  content: 'heading',
})

export default {
    head: {
        title: "Write"
    },
    components: {
        EditorContent,
        Toolbar,
    },
    data() {
        return {
            contentEditor: null,
            titleEditor: null,
            maxTitleLength: 128
        }
    },
    mounted() {
        this.contentEditor = new Editor({
            extensions: [
                StarterKit.configure({
                history: false
                }),
                History.configure({
                    newGroupDelay: 100,
                }),
                Highlight,
                TaskList,
                TaskItem,
                Placeholder.configure({
                    placeholder: ({ node }) => {
                        if (node.type.name === 'paragraph') {
                            return 'Anything else to mention?'
                        }
                    },
                }),
            ],
            autofocus: false,
        })
        this.titleEditor = new Editor({
            extensions: [
                CustomTitle,
                Text,
                Heading,
                History.configure({
                    newGroupDelay: 100,
                }),
                Placeholder.configure({
                    placeholder: ({ node }) => {
                        if (node.type.name === 'heading') {
                            return 'What’s the title?'
                        }
                    },
                }),
                CharacterCount.configure({
                    limit: this.maxTitleLength,
                })
            ],
            autofocus: true,
        })
    },
    beforeUnmount() {
        this.editor.destroy()
        this.titleEditor.destroy()
    },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/generalSettings.scss';
@import '~/assets/scss/variables.scss';
    .page-content {
        @include pageContentCentered;
    }
</style>