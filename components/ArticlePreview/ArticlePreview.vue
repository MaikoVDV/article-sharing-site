<template>
<NuxtLink :to="redirectURL" class="article-preview">
        <div class="text-container">
            <h2>{{ document.title }}</h2>
            <p v-if="document.description != undefined">{{ document.description }}</p>
        </div>
        <div class="author-section" v-if="document.author != undefined">
            <img :src="document.author.icon" v-if="document.author.icon != undefined">
            <img src="~/assets/images/Unknown User Icon.jpg" v-else>
            <p v-if="document.author.name != undefined">{{document.author.name}} | {{ new Date(document.date).toLocaleString()}}</p>
        </div>
        <img class="thumbnail" :src="document.thumbnail" v-if="document.thumbnail != undefined || document.thumbnail == ''">

    </NuxtLink>
</template>
<script>
export default {
    computed: {
        thumbnail() {
            try {
                return require(`~/assets/images/${this.document.thumbnailLink}`);
            } catch {
                console.error(`Thumbnail ${this.document.thumbnailLink} could not be found`)
            }
        },
        authorIcon() {
            try {
                return require(`~/assets/images/${this.document.author.icon}`);
            } catch {
                console.error(`Author icon ${this.document.author.icon} could not be found`)
            }
        },
        redirectURL() {
            return `article/${this.document.shortId}`
        }
    },
    props: {
        document: {
            title: String,
            shortId: String,
            date: String,
            description: String,
            author: Object,
            thumbnail: String,
        }
    },
}
</script>
<style scoped lang="scss">
@import '~/assets/scss/variables.scss';
@import "~/assets/scss/generalSettings";
    .article-preview {
        // Positioning
        width: $preview-width;
        height: $preview-height;
        position: relative;
        transform: translateX(-50%);
        left: 50%;
        box-sizing: border-box;
        margin: $preview-margin 0px;
        padding: $preview-padding;
        display: inline-block;
        

        // Styling
        background: white;
        border-radius: $border-radius-large;

        box-shadow: 0px 0px 25px 0.2rem #00000033;
        transition: box-shadow 0.3s, width 0.3s, height 0.3s;
        text-decoration: none;
        color: black;

        &:hover {
            box-shadow: 0px 0px 25px 0.5rem #00000055;
            width: $preview-width * $preview-hover-size-factor;
            height: $preview-height * $preview-hover-size-factor;
        }
        .text-container {
            width: 100% - $preview-image-width;
            height: calc(100% - $preview-author-height);

            h2 {
                margin: 0px;
            }
            p {
                margin: 0px;
            }
        }
        .thumbnail {
            height: calc($preview-height - $preview-padding * 2);
            position: absolute;
            max-width:$preview-image-width;
            right: $preview-padding;
            top: $preview-padding;
        }
        .author-section {
            width: calc(100% - $preview-image-width);
            height: $preview-author-height;
            @include horizontal-flexbox;

            img {
                height: 100%;
            }
        }
        &:last-child {
            margin-bottom: 5rem;
        }
    }
</style>