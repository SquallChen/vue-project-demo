import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Top from './views/Top.vue'
import Layout from '@/pages/layout/Layout';

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: Layout,
      redirect: 'home',
      children: [
        {
          path: 'home',
          component: Home,
          name: 'home',
        },
        {
          path: 'top',
          component: Top,
          name: 'top',
        },
        {
          path: 'about',
          component: About,
          name: 'about',
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login/Login'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/components/pages/errorPage/Err404'),
    }
  ]
})
