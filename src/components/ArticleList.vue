<template>
    <div id="article-list">
        <div>
            <i class="glyphicon glyphicon-plus"></i>
            <span v-on:click="addOne">新建文章</span>
        </div>
        <div class="container">
            <ul>
                <li v-for="(item, index) in Articles" v-on:click="showArticle(item)">
                    <h4>
                        {{item.title}}
                    </h4>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },

    computed: {
        Articles() {
            return this.$store.getters.articles
        },
        activeArticle() {
            return this.$store.getters.activeArticle
        },
        activeDir() {
            return this.$store.getters.activeDir
        },
        articlesMap(){
            return this.$store.getters.articlesMap
        }
    },
    methods: {
        addOne() {
            this.$store.dispatch('addArticle',this.activeDir.id)
        },
        getArticle(dirId) {
            this.$store.dispatch('getArticle()')
        },
        showArticle(article) {
            this.$store.dispatch('getContent', article)
        }
    },
    watch: {
        activeDir: function(val, oldVal) {
            
            this.$store.dispatch('getArticle', {'dirId':val.id,'articlesMap':this.articlesMap})
        }
    }
}
</script>
<style>
#article-list {
    float: left;
    width: 30%;
    height: 100%;
    background-color: #f5f5f5;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    overflow-y: scroll;
}
</style>

