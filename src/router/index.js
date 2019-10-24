import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/User/Login.vue'
import register from '@/components/User/register'
import reset from '@/components/User/reset'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reset',
      name: 'reset',
      component: reset
    }
  ]
})
