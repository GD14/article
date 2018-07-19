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
    mounted() {
      this.$store.dispatch('getDirs')
    },
    methods: {
        addOne() {
            this.$store.dispatch('addDirs')
        },
        setCurrentDir(dir) {
            this.$store.dispatch('showCurrentDirectory', dir)
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
