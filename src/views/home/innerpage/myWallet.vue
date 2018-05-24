<style>
    .title{
        height: 60px;
        line-height: 60px;
        background-color: #fafafa;
        border-bottom: 1px solid #e6e6e6;
        padding-left: 30px;
    }
    .title span{
        font-size: 18px;
        color: #666666;
    }
    .wallet-content{
        padding: 30px 30px 50px;
        background-color: #fff;
    }
    .wallet-content .panel-money{
        background-color: #f7f7f7;
        padding: 35px 0;
        display: flex;
        align-items: center;
    }
    .panel-money>div{
        width: 358px;
        text-align: center;
        flex: none;
        vertical-align: middle;
    }
    .panel-money>div:nth-child(2){
        border-left: 1px solid #d9d9d9;
        border-right: 1px solid #d9d9d9;
    }
    .panel-money>div>p:first-child{
        font-size: 24px;
    }
    .wallet-content .table-type{
        margin-top: 50px;
        margin-bottom: 20px;
    }
    .wallet-content .table-type li{
        display: inline-block;
        color: #666;
        padding: 0 30px;
    }
    .wallet-content .table-type li:first-child{
        padding-left: 0;
    }
    .wallet-content .table-type li:nth-child(2){
        border-left: 1px solid #b3b3b3;
        border-right: 1px solid #b3b3b3;
    }
    .table-panel{
        background: #f7f7f7;
        padding: 20px 30px;
    }
    .table-panel .ivu-table, .table-panel .ivu-table th, .table-panel .ivu-table td,.table-panel .ivu-page-next,.table-panel .ivu-page-prev, .table-panel .ivu-page-item{
        background-color: #f7f7f7;
    }
    .table-panel .ivu-page-item-active {
        background-color: #2d8cf0;
        border-color: #2d8cf0;
    }
    .table-panel .ivu-table-border td,.table-panel .ivu-table-border th{
        border-right: none;
    }
    .table-panel .ivu-table-wrapper{
        border: none;
    }
    .table-panel .ivu-table:after, .ivu-table:before{
        display: none;
    }
    .btn-group Button:first-child{
        margin: 0 50px;
    }
    .table-panel Table{
        margin-bottom: 20px;
    }
    .table-panel .ivu-page.mini{
        text-align: right;
    }
    /*弹窗通用样式*/
    .modal_common .model_title{
        text-align: center;
    }
</style>
<template>
    <div>
        <div class="title">
            <span>我的钱包</span>
        </div>
        <div class="wallet-content">
            <div class="panel-money">
                <div>
                    <p style="color: #009AFE">￥0.00</p>
                    <p>余额</p>
                </div>
                <div>
                    <p style="color: #FFAB33">￥0.00</p>
                    <p>诚意金</p>
                </div>
                <div class="btn-group">
                    <Button type="primary" @click="openModal('in')">充值</Button>
                    <Button type="primary" @click="openModal('out')">提现</Button>
                </div>
            </div>

            <ul class="table-type">
                <li>交易记录</li>
                <li>充值记录</li>
                <li>提现记录</li>
            </ul>

            <div class="table-panel">
                <Table :columns="columns1" :data="data1"></Table>
                <Page :total="100" size="small"></Page>
            </div>
        </div>
        <div>
            <Modal v-model="showModal" :mask-closable="false" class-name="modal_common">
                <p slot="header" class="model_title">
                    <span>{{modalTitle}}</span>
                </p>
                <!--弹窗内容-提现-->
                <TakeMoney ref="comp" v-if="currentModal=='out'"></TakeMoney>
                <!--弹窗内容-充值-->
                <Recharge ref="comp" v-if="currentModal=='in'"></Recharge>

                <div slot="footer">
                    <Button type="primary" size="large" @click="" long>{{modalFooter}}</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>
    import TakeMoney from '@path/components/TakeMoney.vue';
    import Recharge from '@path/components/Recharge.vue';
    export default {
        components: {
            TakeMoney,
            Recharge
        },
        data(){
            return {
                showModal: false,
                modalTitle: '',
                modalFooter: '',
                currentModal: '',
                columns1:[
                    {
                        align: 'center',
                        title: '时间',
                        key: 'time'
                    },{
                        align: 'center',
                        title: '类型',
                        key: 'type'
                    },{
                        align: 'center',
                        title: '流水号',
                        key: 'num'
                    },{
                        align: 'center',
                        title: '对方',
                        key: 'otherside'
                    },{
                        align: 'center',
                        title: '金额',
                        key: 'money'
                    },{
                        align: 'center',
                        title: '状态',
                        key: 'status'
                    }
                ],
                data1: [
                    {
                        time: '2018-03-15 10:45',
                        type: '提现',
                        num: '20180203000000000000000000000000',
                        otherside: '中国银行',
                        money: '￥36.80',
                        status: '交易成功'
                    },{
                        time: '2018-03-15 10:45',
                        type: '提现',
                        num: '20180203000000000000000000000000',
                        otherside: '中国银行',
                        money: '￥36.80',
                        status: '交易成功'
                    }
                ]
            };
        },
        methods: {
            openModal: function (type) {
                this.showModal = true;
                this.currentModal = type;
                switch (type){
                    case 'in':
                        this.modalTitle = '充值';
                        this.modalFooter = '现在付款';
                        break;
                    case 'out':
                        this.modalTitle = '提现';
                        this.modalFooter = '申请提现';
                        break;
                }
            }
        }
    };
</script>