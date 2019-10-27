import Vue from 'vue'
import Router from 'vue-router'
// 登录页
import Login from '@/components/User/Login.vue'
import register from '@/components/User/register'
import reset from '@/components/User/reset'
// 首页预览
import tabbar from '@/components/tabbarbox'
import index from '@/components/index/index'
import myindex from '@/components/index/myindex'
// 详情页
import Jhcode from '@/components/my_centre/JhCode'
import gonggao from '@/components/my_centre/gonggao'
import mydata from '@/components/my_centre/my_data'
import mydeal from '@/components/my_centre/my_deal'
import myqiang from '@/components/my_centre/my_qiang'
import myhelp from '@/components/my_centre/my_help'
import helplock from '@/components/my_centre/helplock'
import help from '@/components/my_centre/help'
import changpassword from '@/components/User/changpassword'
import extension from '@/components/my_centre/extension'
import fm from '@/components/my_centre/f_m'
import integral from '@/components/my_centre/integral'
import teamall from '@/components/my_centre/teamall'
import teamm from '@/components/my_centre/team_m'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/Login'
    // },
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/teamall',
      name: 'teamall',
      component: teamall
    },
    {
      path: '/teamm',
      name: 'teamm',
      component: teamm
    },
     {
      path: '/integral',
      name: 'integral',
      component: integral
    },
    {
      path: '/help',
      name: 'help',
      component: help
    },
    {
      path: '/fm',
      name: 'fm',
      component: fm
    },
    {
      path: '/changpassword',
      name: 'changpassword',
      component: changpassword
    },
    {
      path: '/extension',
      name: 'extension',
      component: extension
    },
    {
      path: '/myhelp',
      name: 'myhelp',
      component: myhelp
    },
    {
      path: '/helplock',
      name: 'helplock',
      component: helplock
    },
    {
      path: '/mydeal',
      name: 'mydeal',
      component: mydeal
    },
    {
      path: '/myqiang',
      name: 'myqiang',
      component: myqiang
    },
    {
      path: '/mydata',
      name: 'mydata',
      component: mydata
    },
    {
      path: '/Jhcode',
      name: 'Jhcode',
      component: Jhcode
    },
    {
      path: '/gonggao',
      name: 'gonggao',
      component: gonggao
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
    },
    {
      path: '/index',
      name: 'tabbar',
      component: tabbar,
      children: [
        {
          path: '/',
          name: 'index',
          component: index
        },
        {
          path: '/myindex',
          name: '/myindex',
          component: myindex
        }
      ]
    }
  ]
})
