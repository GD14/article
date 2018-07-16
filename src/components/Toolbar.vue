<template>
    <div id='toolbar'>
        <div>
            <i class="glyphicon glyphicon-plus"></i>
            <span>新建分类</span>
        </div>
        <ul>
            <li v-for="(item, index) in dirtects" :key="item.id" v-bind:title="item.content">
                <span>{{ item.content}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dirtects: [
                { id: 1, content: '数学' },
                { id: 2, content: '语文' },
                { id: 3, content: '英语' }
            ]
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
</style>
