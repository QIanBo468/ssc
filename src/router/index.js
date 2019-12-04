import Vue from 'vue'
import router from 'vue-router'
import routes from './mod/pages'
import children from './mod/tabbarFoot'
import components from './mod/components'
Vue.use(router)

Object.keys(components).forEach(item => {
    Vue.component(item, components[item]);
})

export default new router({
    routes: [
        ...routes,
        // {
        //     path: '/',
        //     redirect: '/login'
        //   },
        {
            path: '/',
            component: () => import('@/components/tabbar'),
            children
        },
    ]
})