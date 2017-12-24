import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/components/index').default
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/login').default
    },
    {
      path: '/main-content',
      name: 'main-content',
      component: require('@/components/main_content').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
