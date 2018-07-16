<template>
    <div id="article-list">
        <div>
            <i class="glyphicon glyphicon-plus"></i>
            <span v-on:click="addOne">新建文章</span>
        </div>
        <ul>
            <li v-for="(item, index) in Articles">
                <h4>
                    {{item.title}}
                </h4>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
          
        }
    },
    computed:{
        Articles(){
            return this.$store.getters.articles
        }
    },
    methods:{
        addOne(){
            console.log("xx");
            
            this.$store.dispatch('addArticle')
        }
    }
}
</script>
<style>
#article-list{
    float: left;
    width: 300px;
    height: 100%;
    background-color: #f5f5f5;
    font-family: 'Raleway',sans-serif;
    font-weight: 400;
    overflow-y: scroll;
}
</style>

