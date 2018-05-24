import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

let store = {
    state,
    actions,
    getters,
    mutations
};
export default store;