import Vue from 'vue';
export default new Vue({
    data() {
        return {
        };
    },
    computed: {

    },
    methods: {
        handleClick(weid,name,domain){
            var datas = {
                weid: weid,
                names:name,
                domain:(domain) ? domain : ''
            };
            this.$emit('getData',{data:datas});
        }
    }
});