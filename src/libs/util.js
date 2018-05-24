import axios from 'axios';
import iView from 'iview';
import router from '@path/routerMain';
let util = {};
util.title = function (title) {
    title = title ? title + ' - Home' : 'vue-title';
    window.document.title = title;
};
const ajaxUrl = parameter.apiSite;

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});
// http request 拦截器
util.ajax.interceptors.request.use(
    config => {
       global.Storage.set(global.Param.userData , {
           token: '08bd428c2f9122676e9ae98b53b72877',
           weid: '914087f0-d0e1-11e7-ae66-c11b9b4ee3b1'
       });
        if (global.Storage.get(global.Param.userData).token) {
              config.headers.Token = global.Storage.get(global.Param.userData).token;
        }
        return config;
    },
    err => {
        console.log(err);
        return Promise.reject(err);
    }
);

// http response 拦截器
util.ajax.interceptors.response.use(
    response => {
        return response.data;
        switch (response.data.code){
            case 200:
                if (response.data.message == 'Success'){
                    return response.data;
                }
                break;
            case -200:
                iView.Message.error(response.data.message);
                return false;
                break;
            case 401:
                iView.Message.error('登陆状态失效');
                router.replace({
                    name: 'login',
                    query: {redirect: router.currentRoute.fullPath}
                });
                return Promise.reject('请求异常');
                break;
            default:
                return response;

        }
    },
    error => {
        //console.log(error);
        iView.Message.error({
            content: '接口服务器异常!',
            duration: 10
        });
        return Promise.reject(error);
    }
);

util.ajax.qiniu = (fun)=>{
    let token = ''
    axios.get('http://new.wezchina.com/api/file/qiniu_token')
        .then((response)=>{
            fun(response);
    });
}

export default util;