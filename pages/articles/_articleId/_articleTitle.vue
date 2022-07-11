<template>
<div class="page-content">
    <h1 class="page-title">Article</h1>
</div>
</template>
<script>
    export default {
        head: {
            title: "Article"
        },
        asyncData(context) {
            console.log(context.params)
        }
    }
</script>