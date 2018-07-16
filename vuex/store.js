import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  //所有文章
  articles: [],
  //当前文章
  activeArticle: {}
}

const mutations = {
  ADD_ARTICLE(state) {
    const newArticle = {
      id: 1,
      title: 'new article',
      context: ''
    }
    console.log("xdg");
    
    state.articles.push(newArticle)
    state.activeArticle = newArticle
  }
}

const actions = {
  addArticle({ commit }) {
    commit('ADD_ARTICLE')
  }
} 

const getters={
    articles: state=> state.articles,
    activeArticle: state=>state.activeArticle
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})