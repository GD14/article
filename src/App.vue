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
        ArticleEditor,
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
