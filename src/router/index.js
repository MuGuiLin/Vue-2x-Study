import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/vueapi',
    name: 'Vueapi',
    component: () => import('../views/Vueapi.vue')
  },
  {
    path: '/components',
    name: 'Components',
    component: () => import('../views/Components/Index.vue'),
    children: [
      {
        path: '/components/communicate',
        name: 'Communicate',
        component: () => import('../views/Components/Communicate.vue')
      },
      {
        path: '/components/slots',
        name: 'Slots',
        component: () => import('../views/Components/Slots.vue')
      },
      {
        path: '/components/Examples',
        name: 'Examples',
        component: () => import('../views/Components/Examples.vue')
      },
      {
        path: '/components/recursive',
        name: 'Recursive',
        component: () => import('../views/Components/Recursive.vue')
      },
      {
        path: '/components/function',
        name: 'Function',
        component: () => import('../views/Components/Function.vue')
      },
      {
        path: '/components/mixins',
        name: 'Mixins',
        component: () => import('../views/Components/Mixins.vue')
      },
      {
        path: '',
        name: 'communicate',
        component: () => import('../views/Components/Communicate.vue')
      }
    ]
  },
  {
    path: '/router',
    name: 'Router',
    component: () => import('../views/Router.vue')
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: () => import('../views/Vuex.vue')
  },
  {
    path: '/muvuex',
    name: 'muVuex',
    component: () => import('../views/muVuex.vue')
  },
  {
    path: '/element',
    name: 'Element',
    component: () => import('../views/Element.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('../views/Form.vue')
  },
  {
    path: '/alert',
    name: 'Alert',
    component: () => import('../views/Alert.vue')
  },
  {
    path: '/muvue',
    name: 'muVue',
    component: () => import('../views/muVue.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
