<template>
    <div id="article-editor">
        <input type="text" class="form-control" v-bind:value="articleTitle" v-on:input="editTitle">
        <ul></ul>
        <textarea v-bind:value="articleContent" v-on:input="editArticle" class="form-control"></textarea>
    </div>
</template>
<script>
    export default {
        computed:{
            articleTitle(){
                return this.$store.getters.activeArticle.title;
            },
            articleContent(){
                console.log("content");
                
                return this.$store.getters.activeArticle.content;
            }
        },
        methods:{
            editTitle(e){
                this.$store.dispatch("editTitle",e.target.value)
            },
            editArticle(e){
                console.log(e.target.value);
                this.$store.dispatch("editArticle",e.target.value)
            }
        }
    }
</script>

<style>
#article-editor{
    height: 100%;
    margin-left: 440px;
}
#article-editor textarea{
    height: 100%;
    border:0;
    border-radius: 0;
}

</style>

