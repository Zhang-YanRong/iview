// 参数设定
let state = {
    // LoginState: ()=>{
    //     let data = global.Storage.get(global.Param.userData);
    //     return data;
    // }
    LoginState:  global.Storage.get(global.Param.userData),
    MenuItem: {},
    Roles: {},
    Match: {
        0: '请选择',
        1 : 'all',
        2 : 'get',
        3 : 'post',
        4 : 'delete',
    }
};
export default state;