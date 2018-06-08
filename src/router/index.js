import Vue from 'vue'
import Router from 'vue-router'
import Features from '../pages/features'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Features',
      component: Features
    },
    {
      path: '/',
      name: 'Features',
      component: Features
    }
  ]
})
