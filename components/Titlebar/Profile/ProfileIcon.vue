<template>
    <div id="profile-image">
        <img :src="picture" />
    </div>
</template>
<script>
export default {
    props: {
        picture: String
    },
    // computed: {
    //     icon() {
    //         try {
    //             return require(`~/assets/images/${this.document.author.icon}`);
    //         } catch {
    //             console.error(`Author icon ${this.document.author.icon} could not be found`)
    //         }
    //     },
    // }
}
</script>
<style lang="scss" scoped>
    #profile-image {
        width: 100%;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
        }
    }
</style>