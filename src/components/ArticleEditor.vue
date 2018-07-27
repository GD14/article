<template>
    <div id="article-editor" v-show="hasActiveArticle">
        <input type="text" class="form-control" v-model="articleTitle">
        <ul></ul>
        <textarea v-model="articleContent" class="form-control"></textarea>
    </div>
</template>
<script>
export default {
    computed: {
        articleTitle: {
            get: function() {
                return this.$store.getters.activeArticle.title
            },
            set: function(newValue) {
                let article={}
                article.id=this.activeArticle.id
                article.title=newValue
                article.content=this.activeArticle.content
                this.$store.dispatch("editArticle",article)
            }
        },
        articleContent: {
            get: function() {
                return this.$store.getters.activeArticle.content
            },
            set: function(newValue) {
                console.log("dsf");
                
                let article={}
                article.id=this.activeArticle.id
                article.title=this.activeArticle.title
                article.content=newValue
                this.$store.dispatch("editArticle",article)
            }
        },
        activeArticle: {
            get: function() {
                return this.$store.getters.activeArticle
            },
            set: function() {
                console.log('213213')
            }
        },
        hasActiveArticle() {
            let article = this.$store.getters.articles

            return article.length == 0 ? false : true
        }
    },
    methods: {
    },
    watch: {
        activeArticle: function(val, oldVal) {
            console.log('in watching')
            
            if (val.content == '') this.$store.dispatch('getContent', val)
        }
    }
}
</script>

<style>
#article-editor {
    height: 100%;
    width: 50%;
    margin-left: 10px;
    float: left;
}
#article-editor textarea {
    height: 95%;
    border: 0;
    border-radius: 0;
}
</style>

