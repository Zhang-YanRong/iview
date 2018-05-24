import Env from './env';
import Param from './parameter';
import Storage from '@path/libs/storage';
import Validate from './validate';
//
let config = {
    // env: Env,
    // param: Param
};

global.Env = Env;
global.Param = Param;
global.Storage = Storage;
global.Validate = Validate;
export default config;