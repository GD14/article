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
  clickEditDir: false
}

const mutations = {
  //新增目录
  ADD_DIR(state, newDir) {
    state.directories.push(newDir)
    state.activeDir = newDir
  },
  //新增文章
  ADD_ARTICLE(state, newArticle) {
    state.articles.push(newArticle)
    state.activeArticle = newArticle
  },
  //编辑文章
  EDIT_ARTICLE(state, article) {
    state.activeArticle.title = article.title
    state.activeArticle.content = article.content
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
  }
}

const actions = {
  addArticle({ commit }, dirId) {
    const newArticle = {
      dirId: dirId,
      title: 'new article'
    }
    axios.post('/apis/notes', newArticle).then(
      res => {
        let article = res.data.data
        article.content = ''
        commit('ADD_ARTICLE', article)
      },
      err => {}
    )
  },
  editArticle({ commit }, article) {
    commit('EDIT_ARTICLE', article)
    axios.put('/apis/notes/' + article.id, article).then(res => {}, err => {})
  },
  addDirs({ commit }) {
    const newDir = {
      name: 'new dir'
    }
    axios.post('/apis/notebooks', newDir).then(
      res => {
        let dir = res.data.data
        commit('ADD_DIR', dir)
      },
      err => {}
    )
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
          if (!articles) articles = []
          articles.forEach(element => {
            element.content = ''
            element.firstLoad = 0
          })

          commit('SET_TOT_ARTICLES', { dirId: dirId, articles: articles })
          commit('SET_ARTICLES', articles)
          if (articles.length == 0) commit('SET_CURRENT_ARTICLE', {})
          else commit('SET_CURRENT_ARTICLE', articles[0])
        },
        err => {}
      )
    } else {
      let articles = articlesMap.get(dirId)
      commit('SET_ARTICLES', articles)
      if (articles.length == 0) commit('SET_CURRENT_ARTICLE', {})
      else commit('SET_CURRENT_ARTICLE', articles[0])
    }
  },
  getContent({ commit }, article) {
    if (article.firstLoad == 0) {
      article.firstLoad = 1
      axios.get('/apis/notes/' + article.id + '/content').then(
        res => {
          if (res.data.data) {
            let myContent = res.data.data.content
            article.content = myContent
          }
        },
        err => {}
      )
    } else {
    }
            commit('SET_CURRENT_ARTICLE', article)
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
