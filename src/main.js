import Vue from 'vue';
import iView from 'iview';
import Vuex from 'vuex';
import Config from './config/config';
import router from './routerMain';
import Filter from './libs/filter';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import StoreConfig from './store/index';
import 'babel-polyfill';


Vue.use(Vuex);
Vue.use(iView);

import Util from './libs/util';

// axios
Vue.prototype.$axios = Util.ajax;

const store = new Vuex.Store(StoreConfig);

new Vue({
    el: '#app',
    router: router,
    store: store,
    filters: Filter,
    render: h => h(App)
});