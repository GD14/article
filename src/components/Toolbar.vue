<template>
    <div id='toolbar'>
        <div>
            <i class="glyphicon glyphicon-plus"></i>
            <span v-on:click="addOne">新建分类</span>
        </div>
        <ul>
            <li v-for="(item, index) in dirs" :key="index" v-bind:title="item.content" v-bind:class="item==currentDir?'activeDir':'normalDir'" v-on:click="setCurrentDir(item)">
                <span>{{ item.name}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    computed: {
        dirs() {
            return this.$store.getters.directories
        },
        currentDir() {
            return this.$store.getters.activeDir
        }
    },
    methods: {
        addOne() {
            // this.$http.get('apis/dir/1').then(
            //     res => {
            //         console.log(res, '请求成功')
            //     },
            //     err => {
            //         console.log(err, '请求失败')
            //     }
            // )

            this.$store.dispatch('addDirs')
        },
        setCurrentDir(dir) {
            this.$store.dispatch('showCurrentDirectory', dir)
            this.$http.get('apis/notebooks/' + dir.id + '/notes').then(
                res => {
                    let notesResult = res.data
                    let articles = notesResult.data
                    let activeArticle = articles[0]
                    this.$store.dispatch('setArticles', articles)
                    this.$store.dispatch('showCurrentArticle', activeArticle)
                    console.log(!articles.content);
                    console.log(activeArticle);
                    
                    if (!activeArticle.content) {
                        this.$http
                            .get('apis/notes/' + activeArticle.id + '/content')
                            .then(
                                res => {
                                    
                                    let contentResult = res.data.data
                             
                                    
                                    this.$store.dispatch('editArticle',contentResult.content);
                                },
                                err => {
                                    console.log('dsf')
                                }
                            )
                    }
                },
                err => {}
            )
        }
    }
}
</script>
<style>
#toolbar {
    float: left;
    width: 130px;
    height: 100%;
    background-color: #30414d;
    color: #767676;
    padding: 35px 25px 25px 25px;
}
.activeDir {
    background-color: #337ab7;
}
.normalDir {
    background-color: #30414d;
}
</style>
