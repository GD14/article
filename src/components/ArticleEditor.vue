<template>
    <div id="article-editor">
        <input type="text" class="form-control" v-bind:value="articleTitle">
        <ul></ul>
        <textarea class="form-control"></textarea>
    </div>
</template>
<script>
    export default {
        computed:{
            articleTitle(){
                return "数学";
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

