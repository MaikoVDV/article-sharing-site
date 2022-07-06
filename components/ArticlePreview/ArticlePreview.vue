<template>
<div class="article-preview">
    <div class="text-container">
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
    </div>
    <div class="author-section">
        <img :src="article.author.icon" v-if="article.author.icon != undefined">
        <img src="~/assets/images/Unknown User Icon.jpg" v-else>
        <p>{{article.author.name}} | {{ new Date(article.date).toLocaleString()}}</p>
    </div>
    <img class="thumbnail" :src="article.thumbnail" v-if="article.thumbnail != undefined || article.thumbnail == ''">
</div>
</template>
<script>
export default {
    computed: {
        thumbnail() {
            return require(`~/assets/images/${this.article.thumbnailLink}`);
        },
        authorIcon() {
            return require(`~/assets/images/${this.article.author.icon}`);
        }
    },
    props: {
        article: {
            title: String,
            description: String,
            author: Object,
            date: String,
            thumbnail: String,
            id: String
        }
    }
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

        // Styling
        background: white;
        border-radius: $border-radius-large;

        box-shadow: 0px 0px 25px 0.2rem #00000033;
        transition: box-shadow 0.3s, width 0.3s, height 0.3s;

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