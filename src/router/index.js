import Vue from 'vue'
import Router from 'vue-router'
import Features from '../pages/features'
import Examples from '../pages/examples'
import VerticalScroll from '../pages/vertical-scroll'
import IndexList from '../pages/index-list'
import Picker from '../pages/picker'
import Slide from '../pages/slide'
import FullPageSlide from '../pages/full-page-slide'
import FreeScroll from '../pages/free-scroll'
import FormList from '../pages/form-list'

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
        },
        {
          path: 'index-view/:lang',
          component: IndexList
        },
        {
          path: 'picker/:lang',
          component: Picker
        },
        {
          path: 'slide/:lang',
          component: Slide
        },
        {
          path: 'full-page-slide/:lang',
          component: FullPageSlide
        },
        {
          path: 'free-scroll/:lang',
          component: FreeScroll
        },
        {
          path: 'form-list/:lang',
          component: FormList
        }
      ]
    }
  ]
})
