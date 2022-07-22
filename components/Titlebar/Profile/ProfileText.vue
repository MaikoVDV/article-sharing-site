<template>
    <div id="profile-text">
        {{name}}
    </div>
</template>
<script>
export default {
    props: {
        name: String
    }
}
</script>
<style lang="scss" scoped>
    #profile-text {
        margin-right: 1rem;
    }
</style>