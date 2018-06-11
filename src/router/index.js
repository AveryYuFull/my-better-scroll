import Vue from 'vue'
import Router from 'vue-router'
import Features from '../pages/features'
import Examples from '../pages/examples'
import VerticalScroll from '../pages/vertical-scroll'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Features',
      component: Features
    },
    {
      path: '/:lang',
      name: 'Features',
      component: Features
    },
    {
      path: '/examples/:lang',
      component: Examples
    },
    {
      path: '/examples',
      component: Examples,
      children: [
        {
          path: 'vertical-scroll/:lang',
          component: VerticalScroll
        }
      ]
    }
  ]
})
