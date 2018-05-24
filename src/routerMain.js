import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Config from './config/config';
import Routers from './router/index.js';

Vue.use(VueRouter);
Vue.use(iView);

// 路由配置 mode: history 正常URL 模式  去掉#号模式
const RouterConfig = {
    mode: 'history',
    routes: Routers
};

const router = new VueRouter(RouterConfig);
console.log(router,'router');
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    // 判断该路由是否需要登录权限
    window.document.title = to.meta.title ? to.meta.title + ' - admin' : 'admin' ;
    if (to.meta.auth) {
        if (global.Storage.get(global.Param.userData).token){
            next();
        }else{
            next({
                name: 'login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            });
        }
    }
    else
    {
        next();
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;