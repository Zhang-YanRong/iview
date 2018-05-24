// 管理后台路由分组
import routerHome from '@path/router/routerHome';

const routers = [
    // 404 所有找不到页面都访问这个路由
    {
        path: '*',
        meta: {
            title: '***',
        },
        redirect: { name: 'user_index' }
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登陆'
        },
        component: (resolve) => require(['@path/views/login.vue'], resolve)
    },
    {
        path: '/news',
        name: 'news',
        meta: {
            title: '管理中心'
        },
        component: (resolve) => require(['@path/views/new/news.vue'], resolve)
        children:newschild
    },
    {
        path: '/user',
        name: 'user',
        meta: {
            title: '用户中心',
            auth: false
        },
        component: (resolve) => require(['@path/views/index.vue'], resolve),
        children: routerHome
    },
];
export default routers;