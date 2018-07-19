<template>
    <div id="article-editor">
        <input type="text" class="form-control" v-bind:value="activeArticle.title" v-on:input="editTitle">
        <ul></ul>
        <textarea v-model="activeArticle.content" class="form-control"></textarea>
    </div>
</template>
<script>
export default {
    computed: {
        articleTitle() {
            return this.$store.getters.activeArticle.title
        },
        articleContent() {
            return this.$store.getters.activeArticle.content
        },
        activeArticle() {
            return this.$store.getters.activeArticle
        }
    },
    methods: {
        editTitle(e) {
            this.$store.dispatch('editTitle', e.target.value)
        },
        editArticle(e) {
            this.$store.dispatch('editArticle', e.target.value)
        }
    },
    watch: {
        activeArticle: function(val, oldVal) {
            if(val.content=="")
            this.$store.dispatch('getContent',val )
        }
    }
}
</script>

<style>
#article-editor {
    height: 100%;
    margin-left: 440px;
}
#article-editor textarea {
    height: 100%;
    border: 0;
    border-radius: 0;
}
</style>

