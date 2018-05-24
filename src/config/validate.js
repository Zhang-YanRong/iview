// 参数设定
let validate = {
    // 手机号码验证规则
    'phone': /^1\d{10}$/,
    'en': /^[A-Za-z]+$/,
    int: (rule, value, callback)=>{
        const rex =  /^[0-9]+$/;
        if(!rex.test(value)){
            callback(new Error('必须是数字'));
        }else{
            callback();
        }
    }
};
export default validate;