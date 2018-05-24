<template>
    <div>
        <Logi v-if="callbackdata.send.length > 0" :listnub="logisticsData"></Logi>
        <Button style="margin: 5px auto 0!important;display: block;width: 80px;height: 32px;" type="ghost" @click="Determinetransaction">确定交易</Button>
        <Button style="margin: 5px auto 0!important;display: block;width: 80px;height: 32px;" type="ghost" @click="Requestrefund">申请退款</Button>
    </div>

</template>

<script>
    import Logi from '@path/components/orderListBtn/Logistics.vue';
    import bus from '@path/bus.js';

    export default {
        components:{
            Logi
        },
        name: 'five',
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
            }
        },
        methods:{
            Determinetransaction(){
                bus.handleClick(this.logisticsData.weid,'Determinetransaction');
            },
            Requestrefund(){
                bus.handleClick(this.logisticsData.weid,'Requestrefund');
            },
        },
        mounted(){
            this.logisticsData.weid = this.callbackdata.weid;
        }
    };
</script>

<style scoped>

</style>