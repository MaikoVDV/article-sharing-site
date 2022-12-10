<template>
<div>
    <div class="page-content">
        <div id="document-area">
            <div id="article-view">
                <h1>{{title}}</h1>
                <div v-html="document" class="editor-content"></div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
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

import hljs from 'highlight.js/lib/core'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('c++', cpp)
hljs.registerLanguage('c#', csharp)
hljs.registerLanguage('css', css)
hljs.registerLanguage('ruby', ruby)
hljs.registerLanguage('go', go)
hljs.registerLanguage('kotlin', kotlin)
hljs.registerLanguage('lua', lua)
hljs.registerLanguage('perl', perl)
hljs.registerLanguage('php', php)
hljs.registerLanguage('python', python)
hljs.registerLanguage('rust', rust)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('shell', shell)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('swift', swift)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('typescript', typescript)


export default {
    head: {
        title: "Article"
    },
    async asyncData({params, $axios, store }) {
        // params looks like this:
        // ArticleID: string to identify the article
        // Article Title: string for users to identify the URL easier (optional)

        const res = await $axios.$get(`https://article-sharing-site-server.onrender.com/api/document/${params.articleId}`, { headers: {"Authorization": `Bearer ${store.state.authInfo.accessToken}`}})
            .catch(err => {
                return console.error(err.response.data)
            })
        if(res != undefined) {
            return {
                jsonDoc: res.data.document,
                document: `${res.data.document.document}`,
                title: res.data.document.title
            }
        }
    },
    mounted() {
        if(process.client) {
            hljs.highlightAll()
        }
    }
}
</script>
<style lang="scss">
@import '~/assets/scss/generalSettings.scss';
@import '~/assets/scss/variables.scss';
    .page-content {
        @include pageContentCentered;
    }
    #document-area {
        margin-top: 3rem;
        #article-view {
            padding: 3rem;
            p:empty::before {
                content: "\00a0\00a0"; // Adds a non-breaking space in empty paragraphs to make them linebreaks.
            }
        }
    }
</style>