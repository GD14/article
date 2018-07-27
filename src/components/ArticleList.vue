<template>
    <div id="article-list">
        <div class="article-wrap">
            <div class="article-new" v-on:click="addOne">
                <i class="glyphicon glyphicon-plus"></i>
                <span>新建文章</span>
            </div>
            <div class="article-container">
                <ul class="container-list">
                    <li v-for="(item, index) in Articles" v-on:click="showArticle(item)" v-bind:class="item==activeArticle?'active-article normal-article':'normal-article'">
                        <div>
                            <i class="glyphicon glyphicon-file file-icon"> </i>
                            <div class="article-edit-group" v-if="item==activeArticle">
                                <i class="glyphicon glyphicon-cog" v-on:click="setArticleEdit"></i>
                                <span>
                                    <ul class="article-edit-choice" v-show="isEditArticle">
                                        <li class="article-edit-item">
                                            <i class='glyphicon glyphicon-edit'></i>移动文章
                                        </li>
                                        <li class="article-edit-item">
                                            <i class='glyphicon glyphicon-trash'></i>删除文章
                                        </li>
                                    </ul>
                                </span>
                            </div>
                        </div>
                        <span class="article-title">
                            {{item.title}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isEditArticle:false
        }
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
        articlesMap() {
            return this.$store.getters.articlesMap
        }
    },
    methods: {
        addOne() {
            this.$store.dispatch('addArticle', this.activeDir.id)
        },
        getArticle(dirId) {
            this.$store.dispatch('getArticle()')
        },
        showArticle(article) {
            this.$store.dispatch('getContent', article)
        },
        setArticleEdit(){
            this.isEditArticle=!this.isEditArticle;
        }
    },
    watch: {
        activeDir: function(val, oldVal) {
            this.$store.dispatch('getArticle', {
                dirId: val.id,
                articlesMap: this.articlesMap
            })
        }
    }
}
</script>
<style>
#article-list {
    float: left;
    width: 24%;
    height: 100%;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    position: relative;
    padding-left: 0;
    padding-right: 0;
}
.article-wrap {
    overflow-y: scroll;
    height: 100%;
    position: relative;
}
.article-container {
    position: relative;
    opacity: 1;
}
span.article-title {
    overflow: hidden;
    display: block;
    height: 30px;
    line-height: 30px;
    margin-right: 40px;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
}
.article-new {
    line-height: 20px;
    font-size: 15px;
    font-weight: 400;
    padding: 20px 0 20px 25px;
    cursor: pointer;
    color: #595959;
}
li.normal-article {
    position: relative;
    height: 90px;
    margin-bottom: 0;
    padding: 15px 10px 15px 60px;
    box-shadow: 0 0 0 1px #d9d9d9;
    border-left: 5px solid transparent;
    list-style: none;
    line-height: 60px;
    cursor: pointer;
    user-select: none;
}
li.active-article {
    border-left-color: #ec7259;
    background-color: #e6e6e6;
}
li.normal-article:hover{
    background-color: #e6e6e6;
}
ul.container-list {
    position: relative;
    margin-bottom: 0;
    padding-left: 0;
    margin-top: 0;
    border-top: 1px solid #d9d9d9;
}
.file-icon {
    position: absolute;
    top: 30px;
    left: 20px;
    font-size: 26px;
}
.article-edit-group {
    float: right;
    width: 40px;
    font-size: 20px;
    text-align: center;
    position: relative;
    min-width: 30px;
    max-width: 50px;
}
.article-edit-choice {
    top: 100%;
    position: absolute;
    z-index: 99;
    right: 0;
    list-style: none;
    background: #ffffff;
    color: #595959;
    border-radius: 6px;
    font-size: 14px;
    padding-left: 0;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
ul.article-edit-choice:before {
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid #fff;
    top: -9px;
    position: absolute;
    right: 12px;
    content: '';
    display: inline-block;
}
.article-edit-item {
    white-space: nowrap;
    line-height: 20px;
    padding: 10px 20px;
    text-align: left;
    position: relative;
    border-bottom: 1px solid #d9d9d9;
}
</style>

