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
        }
    },
    methods: {
        addOne() {
            console.log('xx')

            this.$store.dispatch('addArticle')
        },
        showArticle(article) {
            this.$http.get('apis/notes/' + article.id + '/content').then(
                res => {
                    let contentResult = res.data.data
                    article.content=contentResult.content
                    this.$store.dispatch('showCurrentArticle', article)
                },
                err => {
                    console.log('dsf')
                }
            )
        }
    }
}
</script>
<style>
#article-list {
    float: left;
    width: 300px;
    height: 100%;
    background-color: #f5f5f5;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    overflow-y: scroll;
}
</style>

