class Test
{
    constructor() {
        // 构造方法
        this.str = 1;
    }
    static factory(type) {
        return new Test[type]();
    }
}

Test.localStorage = class Storage extends Test{
    constructor() {
        // 获取父类this 构造方法
        super();
        this.str = 110;
    }
    get(key) {
        alert('localStorage->get');
    }
    set(key) {

    }
}

Test.sessionStorage = class SessionStorage extends Test{
    constructor() {
        // 获取父类this 构造方法
        super();
        this.str = 119;
    }
    get(key) {

    }
    set(key) {

    }
}
export default Test;