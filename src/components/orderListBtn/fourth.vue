<template>
    <div>
        <Logi v-if="callbackdata.send.length > 0" :listnub="logisticsData"></Logi>

        <p style="margin: 5px auto 0!important;display: block;height: 20px;line-height: 20px;width: aoto;text-align: center" type="ghost" ><span @click="comment">评论</span>|<span @click="Requestrefund">退款</span></p>
        <Button style="margin: 5px auto 0!important;display: block;width: 80px;height: 32px;" type="ghost" @click="Determinetransaction">确定交易</Button>
    </div>
</template>

<script>
    import Logi from '@path/components/orderListBtn/Logistics.vue';
    import bus from '@path/bus.js';

    export default {
        components:{
            Logi
        },
        name: 'fourth',
        data(){
            return{
                logisticsData:{
                    weid:'',
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
            comment(){
                bus.handleClick(this.logisticsData.weid,'pinglun');
            },
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