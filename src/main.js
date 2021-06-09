/*!

 =========================================================
 * Vue Light Bootstrap Dashboard - v2.0.0 (Bootstrap 4)
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'
import Vuex from 'vuex'


// Axios
axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('token');

axios.interceptors.request.use(
  function(config) {
   const token = localStorage.getItem('token')
   if (token) config.headers.Authorization = `JWT ${token}`
   return config
  },
  function(error) {
   return Promise.reject(error)
  }
)

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import routes from './routes/routes'

import './registerServiceWorker'
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(Vuex);


// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// Vuex 
const state = {
  user: null
}

const store = new Vuex.Store({
  state,
  getters: {
    user: (state) => {
      return state.user;
    }
  },
  actions: {
    user(context, user) {
      context.commit('user', user);
    }
  },
  mutations: {
    user(state, user) {
      state.user = user;
    }
  }
})

export default store;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
