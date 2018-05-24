<template>
    <div>
        <Logi v-if="callbackdata.send.length > 0" :listnub="logisticsData"></Logi>
        <Button style="margin: 5px auto 0!important;display: block;width: 80px;height: 32px;" type="ghost" @click="Confirmreceipt">确认收货</Button>
    </div>
</template>

<script>
    import Logi from '@path/components/orderListBtn/Logistics.vue';
    import bus from '@path/bus.js';

    export default {
        components:{
            Logi
        },
        name: 'third',
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
            Confirmreceipt(){
                bus.handleClick(this.logisticsData.weid,'Confirmreceipt');
            },
        },
        mounted(){
            this.logisticsData.weid = this.callbackdata.weid;
        }
    };
</script>

<style scoped>

</style>