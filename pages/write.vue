<template>
<div class="page-content">
    <h1 class="page-title">Write</h1>
    <client-only>
        <div id="edit-area">
            <Toolbar id="edit-toolbar" :editor="this.contentEditor"/>
            <ArticleView :maxTitleLength="this.maxTitleLength" :titleEditor="this.titleEditor" :contentEditor="this.contentEditor"/>
            <button v-on:click="submitArticle">Submit!</button>
        </div>
    </client-only>
</div>
</template>

<script>
//import htmlToJson from 'html-to-json'
import { Editor, EditorContent, VueNodeViewRenderer } from '@tiptap/vue-2'
import { Extension } from '@tiptap/core'
//import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Highlight from '@tiptap/extension-highlight'
import History from '@tiptap/extension-history'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Focus from '@tiptap/extension-focus'

import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'

import lowlight from 'lowlight/lib/core.js'

import Toolbar from '~/components/ArticleView/Toolbar/Toolbar.vue'
import CodeBlockComponent from '~/components/ArticleView/CodeBlockComponent.vue'

import javascript from 'highlight.js/lib/languages/javascript.js'
import json from 'highlight.js/lib/languages/json.js'
import xml from 'highlight.js/lib/languages/xml.js'
import bash from 'highlight.js/lib/languages/bash.js'
import cpp from 'highlight.js/lib/languages/cpp.js'
import csharp from 'highlight.js/lib/languages/csharp.js'
import css from 'highlight.js/lib/languages/css.js'
import ruby from 'highlight.js/lib/languages/ruby.js'
import go from 'highlight.js/lib/languages/go.js'
import kotlin from 'highlight.js/lib/languages/kotlin.js'
import lua from 'highlight.js/lib/languages/lua.js'
import perl from 'highlight.js/lib/languages/perl.js'
import php from 'highlight.js/lib/languages/php.js'
import python from 'highlight.js/lib/languages/python.js'
import rust from 'highlight.js/lib/languages/rust.js'
import scss from 'highlight.js/lib/languages/scss.js'
import shell from 'highlight.js/lib/languages/shell.js'
import sql from 'highlight.js/lib/languages/sql.js'
import swift from 'highlight.js/lib/languages/swift.js'
import yaml from 'highlight.js/lib/languages/yaml.js'
import typescript from 'highlight.js/lib/languages/typescript.js'

lowlight.registerLanguage('javascript', javascript)
lowlight.registerLanguage('json', json)
lowlight.registerLanguage('xml', xml)
lowlight.registerLanguage('bash', bash)
lowlight.registerLanguage('c++', cpp)
lowlight.registerLanguage('c#', csharp)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('ruby', ruby)
lowlight.registerLanguage('go', go)
lowlight.registerLanguage('kotlin', kotlin)
lowlight.registerLanguage('lua', lua)
lowlight.registerLanguage('perl', perl)
lowlight.registerLanguage('php', php)
lowlight.registerLanguage('python', python)
lowlight.registerLanguage('rust', rust)
lowlight.registerLanguage('scss', scss)
lowlight.registerLanguage('shell', shell)
lowlight.registerLanguage('sql', sql)
lowlight.registerLanguage('swift', swift)
lowlight.registerLanguage('yaml', yaml)
lowlight.registerLanguage('typescript', typescript)


const CustomTitle = Document.extend({
  content: 'heading',
})
const TabExtension = Extension.create({
    name: "TabExtension",
    addKeyboardShortcuts() {
        return {
            'Tab': () => this.editor.commands.insertContent("    "),
        }
    },
})

export default {
    head: {
        title: "Write",
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
        this.contentEditor = new Editor({
            extensions: [
                StarterKit.configure({
                    history: false,
                    code: false,
                    codeBlock: false
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
                            return 'Click here to add your content'
                        }
                    },
                }),
                CodeBlockLowlight
                    .extend({
                        addNodeView() {
                            return VueNodeViewRenderer(CodeBlockComponent)
                        },
                    })
                    .configure({ lowlight }),
                Focus.configure({
                    mode: 'deepest'
                }),
                TabExtension,
            ],
            autofocus: false,
        })
    },
    methods: {
        submitArticle: function() {
            console.log(this.contentEditor.getText({blockSeparator: "\n"}));
            // let jsonDoc = htmlToJson.parse(this.contentEditor.getHTML()).then(res => {
            //     console.log(res)
            // })

            const editorContent = this.contentEditor.getJSON()
            let description = "";
            try {
                if(editorContent.content[0].type == "paragraph") {
                    description = generateHTML(editorContent.content[0], [
                        StarterKit.configure({
                            blockquote: false,
                            bulletList: false,
                            codeBlock: false,
                            hardBreak: false,
                            heading: false,
                            horizontalRule: false,
                            listItem: false,
                            orderedList: false,
                            code: false,
                            dropcursor: false,
                            gapcursor: false,
                            history: false
                        })
                    ])
                }
            } catch (err) {

            }
            const article = {
                authorId: this.$store.state.userProfile.profile.id,
                title: this.titleEditor.getText(),
                document: this.contentEditor.getHTML(),
                description: description,
            }
            this.$axios.post('https://article-sharing-site-server.onrender.com/api/document', {
                ...article
            }, {
                headers: {
                    "Authorization": `Bearer ${this.$store.state.authInfo.accessToken}`
                }
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        },
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