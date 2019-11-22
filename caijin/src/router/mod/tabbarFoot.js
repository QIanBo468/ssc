const tabbar_files = require.context('@/view/tabcont', true, /\.vue$/),
    tabbar = {};
let children = [];

tabbar_files.keys().forEach(key => {
    tabbar[key.replace(/(\.\/|\.vue)/g, '')] = tabbar_files(key).default
})

Object.keys(tabbar).forEach(item => {
    
    children.push({
        name: item === "index" ? "/" : item,
        path: item === "index" ? "/" : "/" + item,
        component: () => import('@/view/tabcont/' + item)
    })
})

export default children;