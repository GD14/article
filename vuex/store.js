import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const state = {
  //所有目录
  directories: [],
  //当前目录
  activeDir: {},
  //所有文章
  articles: [],
  //当前文章
  activeArticle: {
    id: '',
    title: '',
    content: ''
  },
  articlesMap: new Map(),
  hasActiveDir: false,
  hasActiveArticle: false
}

const mutations = {
  //新增目录
  ADD_DIR(state) {
    const newDirs = {
      name: 'xxx'
    }
    state.directories.push(newDirs)
    state.activeDir = newDirs
  },
  //新增文章
  ADD_ARTICLE(state) {
    const newArticle = {
      id: 1,
      title: 'new article',
      content: ''
    }
    state.articles.push(newArticle)
    state.activeArticle = newArticle
  },
  //编辑文章
  EDIT_ARTICLE(state, content) {
    console.log(state.activeArticle.content)
    state.activeArticle.content = content
    console.log(state.activeArticle.content)
  },
  //编辑title
  EDIT_TITLE(state, title) {
    state.activeArticle.title = title
  },
  //设置当前文章
  SET_CURRENT_ARTICLE(state, article) {
    state.activeArticle = article
  },
  //设置当前目录
  SET_CURRENT_DIR(state, dir) {
    state.activeDir = dir
  },
  //设置总目录
  SET_DIRS(state, dirs) {
    state.directories = dirs
  },
  //设置总文章
  SET_ARTICLES(state, articles) {
    // Vue.set(state.articlesMap,dirId,articles)
    state.articles = articles
  },
  SET_TOT_ARTICLES(state, payload) {
    let dirId = payload.dirId
    let articles = payload.articles
    state.articlesMap.set(dirId, articles)
  },
  SET_HAS_ACTIVE_DIR(state, flag) {
    state.hasActiveDir = flag
  },
  SET_HAS_ACTIVE_ARTICLE(state, flag) {
    console.log('0')

    state.hasActiveArticle = flag
  }
}

const actions = {
  addArticle({ commit }) {
    commit('ADD_ARTICLE')
  },
  editArticle({ commit }, content) {
    commit('EDIT_ARTICLE', content)
  },
  editTitle({ commit }, title) {
    commit('EDIT_TITLE', title)
  },
  addDirs({ commit }) {
    commit('ADD_DIR')
  },
  showCurrentArticle({ commit }, article) {
    commit('SET_CURRENT_ARTICLE', article)
  },
  showCurrentDirectory({ commit }, directory) {
    commit('SET_CURRENT_DIR', directory)
  },
  setDirs({ commit }, dirs) {
    commit('SET_DIRS', dirs)
  },
  setArticles({ commit }, articles) {
    // commit('SET_ARTICLES', articles)
  },
  getDirs({ commit }) {
    axios.get('/apis/notebooks').then(
      res => {
        let dirs = res.data.data
        commit('SET_DIRS', dirs)
        commit('SET_CURRENT_DIR', dirs[0])
        commit('SET_HAS_ACTIVE_DIR', true)
      },
      err => {}
    )
  },
  getArticle({ commit }, playload) {
    let dirId = playload.dirId
    let articlesMap = playload.articlesMap
    if (!articlesMap.has(dirId)) {
      axios.get('/apis/notebooks/' + dirId + '/notes').then(
        res => {
          let articles = res.data.data
          articles.forEach(element => {
            element.content = ''
          })
          commit('SET_TOT_ARTICLES', { dirId: dirId, articles: articles })
          commit('SET_ARTICLES', articles)
          commit('SET_CURRENT_ARTICLE', articles[0])
          commit('SET_HAS_ACTIVE_ARTICLE', true)
        },
        err => {}
      )
    } else {
      let articles = articlesMap.get(dirId)
      commit('SET_ARTICLES', articles)

      commit('SET_CURRENT_ARTICLE', articles[0])
    }
  },
  getContent({ commit }, article) {
    if (article.content == '') {
      axios.get('/apis/notes/' + article.id + '/content').then(
        res => {
          let myContent = res.data.data.content
          article.content = myContent
          commit('SET_CURRENT_ARTICLE', article)
        },
        err => {}
      )
    } else {
      commit('SET_CURRENT_ARTICLE', article)
    }
  }
}

const getters = {
  articles: state => state.articles,
  activeArticle: state => state.activeArticle,
  directories: state => state.directories,
  activeDir: state => state.activeDir,
  articlesMap: state => state.articlesMap
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
