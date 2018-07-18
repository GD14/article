<template>
  <div id="app">
    <toolbar></toolbar>
    <article-list></article-list>
    <article-editor></article-editor>
  </div>
</template>
<script>
import Toolbar from '@/components/Toolbar'
import ArticleList from '@/components/ArticleList'
import ArticleEditor from '@/components/ArticleEditor'
export default {
    name: 'App',
    components: {
        Toolbar,
        ArticleList,
        ArticleEditor
    },
    beforeCreate() {
        this.$http.get('apis/notebooks').then(
            res => {
                let result = res.data
                this.$store.dispatch('setDirs', result.data)
                let activeDir = result.data[0]
                this.$store.dispatch('showCurrentDirectory', activeDir)
                this.$http.get('apis/notebooks/' + activeDir.id + '/notes').then(
                    res => {
                        let notesResult=res.data
                        let articles=notesResult.data;
                        let activeArticle=articles[0];
                        this.$store.dispatch('setArticles',articles);
                        this.$store.dispatch('showCurrentArticle',activeArticle);
                    },
                    err => {}
                )
            },
            err => {
                console.log(err, '请求失败')
            }
        )
    }
}
</script>

<style type="text/css">
html,
#app {
    height: 100%;
}

body {
    margin: 0;
    padding: 0;
    border: 0;
    height: 100%;
    max-height: 100%;
    position: relative;
}
</style>
