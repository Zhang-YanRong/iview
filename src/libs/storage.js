let Storage = {
    // 获取
    get: (key) =>
    {
        let dataString = localStorage.getItem(key);
        if (dataString == null)
        {
            return false;
        }
        return JSON.parse(dataString);
    },
    // 获取
    set: (key , data) =>
    {
        if (typeof data == "object")
        {
            let dataJson = JSON.stringify(data);
            localStorage.setItem(key , dataJson);
        }
        else
        {
            console.log('参数只能是对象');
        }
    }
}

export default Storage;