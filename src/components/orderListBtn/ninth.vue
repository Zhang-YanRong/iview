<template>
    <div>
        <Logi v-if="callbackdata.send.length > 0" :listnub="logisticsData"></Logi>

        <Button style="margin: 5px auto 0!important;display: block;width: 80px;height: 32px;" type="ghost" @click="instance">删除订单</Button>
    </div>
</template>

<script>
    import Logi from '@path/components/orderListBtn/Logistics.vue';
    import bus from '@path/bus.js';
    export default {
        components:{
            Logi
        },
        name: 'ninth',
        data(){
            return{
                logisticsData:{
                    weid:''
                },
            };
        },
        props: {
            callbackdata: {
                type: Object,
                default: {}
            },
        },
        methods:{
            instance(){
                bus.handleClick(this.logisticsData,'instance');
            },
        },
        mounted(){
            this.logisticsData.weid = this.callbackdata.weid;
        }
    };
</script>

<style scoped>

</style>