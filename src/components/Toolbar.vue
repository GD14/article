<template>
    <div id='toolbar'>
        <div class="newDir">
            <i class="glyphicon glyphicon-plus"></i>
            <span v-on:click="addOne">新建分类</span>
        </div>
        <ul class="dirGroup">
            <li v-for="(item, index) in dirs" :key="index" v-bind:title="item.content" v-bind:class="item==currentDir?'dirItem activeDir':'dirItem normalDir'" v-on:click="setCurrentDir(item)">
                <div class='editGroup' v-if="item==currentDir">
                    <i class="glyphicon glyphicon-cog" v-on:click="setEditDir"></i>
                    <span>
                        <ul class="editChoice" v-show="clickEditDir">
                            <li class="editChoiceItem">
                                <i class='glyphicon glyphicon-edit'></i>修改目录
                            </li>
                            <li class="editChoiceItem">
                                <i class='glyphicon glyphicon-trash'></i>删除目录
                            </li>
                        </ul>
                    </span>
                </div>
                <span>{{ item.name}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            clickEditDir:false
        }
    },
    computed: {
        dirs() {
            return this.$store.getters.directories
        },
        currentDir() {
            return this.$store.getters.activeDir
        }
    },
    mounted() {
        this.$store.dispatch('getDirs')
    },
    methods: {
        addOne() {
            this.$store.dispatch('addDirs')
        },
        setCurrentDir(dir) {
            this.$store.dispatch('showCurrentDirectory', dir)
        },
        setEditDir(){
            this.clickEditDir=!this.clickEditDir
        }
    }
}
</script>
<style>
#toolbar {
    position: relative;
    height: 100%;
    background-color: #404040;
    color: #f2f2f2;
    display: block;
    width: 16.6667%;
    overflow-y: auto;
    z-index: 100;
    float: left;
}
.newDir {
    padding: 0 15px;
    margin-top: 20px;
    margin-bottom: 10px;
}
#toolbar ul {
    padding-left: 0;
}
.dirItem {
    line-height: 40px;
    position: relative;
    list-style: none;
    font-size: 15px;
    padding: 0 15px;
    cursor: pointer;
}
.activeDir {
    background-color: #337ab7;
    border-left: 3px solid #ce7259;
}
.normalDir {
    background-color: #404040;
}
.editGroup {
    float: right;
    position: relative;
    text-align: center;
    width: 30px;
    position: relative;
    font-size: 16px;
}
.editGroup span {
    display: block;
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.editChoice {
    top: 100%;
    position: absolute;
    z-index: 99;
    right: 0;
    list-style: none;
    background: #ffffff;
    color: #595959;
    border-radius: 6px;
    font-size: 14px;
}
ul.editChoice:before {
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid #fff;
    top:-9px;
    position: absolute;
    right: 12px;
    content: "";
    display: inline-block;
}
.editChoiceItem{
    white-space: nowrap;
    line-height: 20px;
    padding: 10px 20px;
    text-align: left;
    position: relative;
    border-bottom: 1px solid #d9d9d9
}
.editChoiceItem:last-child{
    border-bottom: 0;
}
.editChoiceItem i{
    margin-right: 5px;
}
</style>
