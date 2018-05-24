<template>
    <div>
        <Logi v-if="callbackdata.send.length > 0" :listnub="logisticsData"></Logi>

        <Button style="margin: 5px auto 0!important;display: block;width: 80px;height: 32px;" @click="gopay" type="ghost">前往付款</Button>
        <Button style="margin: 5px auto 0!important;display: block;width: 80px;height: 32px;" @click="cancle" type="ghost">取消订单</Button>
    </div>
</template>

<script>
    import Logi from '@path/components/orderListBtn/Logistics.vue';
    import bus from '@path/bus.js';
    export default {
        components:{
            Logi
        },
        name: 'logistics',
        data(){
            return{
                parameter:parameter,
                datas:{},
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
            gopay(){
                bus.handleClick(this.logisticsData.weid,'gopay',this.callbackdata.domain);
            },
            cancle(){
                bus.handleClick(this.logisticsData.weid,'cancle');
            },
        },

        mounted(){
            this.logisticsData.weid = this.callbackdata.weid;
        }
    };
</script>

<style scoped>

</style>