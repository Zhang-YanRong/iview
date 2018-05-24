// 参数设定
let mutations = {
    setLoginState: function (state , data) {
        global.Storage.set(global.Param.userData , data);
        state.LoginState = data;
    },
    setLoginOut: function (state , data) {
        global.Storage.set(global.Param.userData , {});
        state.LoginState = '';
    },
    setMenuItem: function (state , data) {
        state.MenuItem = data;
    },
    setRoles: function (state , data) {
        state.Roles = data;
    },
};
export default mutations;