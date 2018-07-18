import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  //所有目录
  directories:[],
  //当前目录
  activeDir:{},
  //所有文章
  articles: [],
  //当前文章
  activeArticle: {}
}

const mutations = {
  //新增目录
  ADD_DIR(state){
    const newDirs={
      name:"xxx"
    }
    state.directories.push(newDirs)
    state.activeDir=newDirs
  },
  //新增文章
  ADD_ARTICLE(state) {
    const newArticle = {
      id: 1,
      title: 'new article',
      content: ''
    }
    console.log("xdg");
    state.articles.push(newArticle)
    state.activeArticle = newArticle
  },
  //编辑文章
  EDIT_ARTICLE(state,content){
    state.activeArticle.content=content
  },
  //编辑title
  EDIT_TITLE(state,title){
    state.activeArticle.title=title
  },
  //设置当前文章
  SET_CURRENT_ARTICLE(state,article){
    state.activeArticle=article
  },
  //设置当前目录
  SET_CURRENT_DIR(state,dir){
    state.activeDir=dir
  },
  //设置总目录
  SET_DIRS(state,dirs){
    state.directories=dirs
  },
  //设置总文章
  SET_ARTICLES(state,articles){
    state.articles=articles
  }
}

const actions = {
  addArticle({ commit }) {
    commit('ADD_ARTICLE')
  },
  editArticle({commit},content){
    commit('EDIT_ARTICLE',content)
  },
  editTitle({commit},title){
    commit('EDIT_TITLE',title)
  },
  addDirs({commit}){
    commit('ADD_DIR')
  },
  showCurrentArticle({ commit },article){
    commit('SET_CURRENT_ARTICLE',article)
  },
  showCurrentDirectory({commit},directory){
    commit('SET_CURRENT_DIR',directory)
  },
  setDirs({commit},dirs){
    commit('SET_DIRS',dirs)
  },
  setArticles({commit},articles){
    commit('SET_ARTICLES',articles)
  }
} 

const getters={
    articles: state=> state.articles,
    activeArticle: state=>state.activeArticle,
    directories:state=>state.directories,
    activeDir:state=>state.activeDir
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})