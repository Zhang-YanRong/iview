<style scoped>
    *{
        padding: 0;
        margin: 0;
        list-style: none;
        text-decoration: none;
    }
    #par{
        width: 1200px;
        height: auto;
        overflow: hidden;
    }
    #par > ul {
        width: 100%;
        height: auto;
        overflow: hidden;
        border: 1px solid #dcdcdc;
    }
    #par > ul > li{
        width: 100%;
        height: auto;
        overflow: hidden;
    }
    .title{
        width: 100%;
        height: 62px;
        background: #fbfbfb;
        border-bottom: 1px solid #dcdcdc;
        font-size: 18px;
        color: #626262;
        box-sizing: border-box;
        padding-left: 28px;
        line-height: 62px;
    }
    .titles{
        width: 100%;
        height: 40px;
        background: #eeeeee;
        border-top: 1px solid #dcdcdc;
        border-bottom: 1px solid #dcdcdc;
        font-size: 18px;
        color: #666666;
        box-sizing: border-box;
        padding-left: 28px;
        line-height: 40px;
    }
    .titles span{
        font-size: 12px;
    }
    .contenta{
        width: 1120px;
        height: auto;
        overflow: hidden;
        background: #f6f6f6;
        box-sizing: border-box;
        border-radius: 5px;
        margin: 0 auto 40px;
        padding: 0 40px 16px;
        line-height: 36px;
        font-size: 12px;
        border: 1px solid #dadada;
    }
    #par .ivu-steps-item{
        width: 250px!important;
    }
    .contitle{
        width: 1040px;
        height: 81px;
        border-bottom: 1px solid #dcdcdc;
        margin: 0 auto 16px;
        line-height: 81px;
        font-size: 18px;
    }
    .detial{
        width: 300px;
        height: 100%;
        float: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 60px;
    }
    .detial > span {
        display: block;
        width: auto;
        height: 100%;
    }
    .goodslist{
        width: 100%;
        background: #fff;
        box-sizing: border-box;
    }
    .goodslist > li{
        width: 100%;
        min-height: 111px;
        height: auto;
        border-bottom:1px solid #efefef;
        box-sizing: border-box;
        padding: 15px 40px;
        overflow: hidden;
    }
    .goodslist > li > p {
        float: left;
        margin-left: 30px;
        line-height: 80px;
        display: block;
        width: 400px;
    }
    .imgsa{
        width: 80px;
        height: 80px;
        border: 1px solid #ebebeb;
        box-sizing: border-box;
        float: left;
    }
    .imgsa > img{
        width: 65px;
        height: 65px;
        display: block;
        margin: 6.5px auto;
    }
    .text{
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .listd{
        line-height: 80px;
        padding-right: 12px;
        width: 268px;
    }
    .total{
        width: 400px;
        height: 110px;
        float: right;
    }
    .total > p{
        display: block;
        width: 400px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #666666;
    }
    .total > p:nth-of-type(3){
        font-size: 18px;
        line-height: 42px;
        height: 42px;
    }
    .total > p > span {
        float: right;
    }
    .totalMoney{
        color: #d44d44;
    }
    .conlist{
        width: 100%;
        height: auto;
        box-sizing: border-box;
        font-size: 12px;
        color: #626262;
        padding: 20px 40px;
        line-height: 38px;
    }
</style>
<template>
    <div id="par">
        <ul>
            <li>
                <div class="title"><p>订单号：13141121</p></div>
                <Steps :current="status" style="margin:75px 0 40px 150px;width: 1000px">
                    <Step title="已下单"></Step>
                    <Step title="已付款"></Step>
                    <Step title="已发货"></Step>
                    <Step title="交易成功"></Step>
                </Steps>
                <div class="contenta" >
                    <div class="contitle">
                        订单状态：
                        <span v-if="detail.order_status == 1">已下单</span>
                        <span v-if="detail.order_status == 2">已付款</span>
                        <span v-if="detail.order_status == 3">已发货</span>
                        <span v-if="detail.order_status == 4">已收货</span>
                        <span v-if="detail.order_status != 2 && detail.status == 3">已退款</span>
                    </div>
                    <template v-for="(x,y) in logistics">
                        <p v-if="send.length > 1">快递{{y + 1}}：</p>
                        <p v-for="item in x">{{item.time}}:&#12288;{{item.context}} </p>
                        <div v-if="y != 0" style="border-bottom: 1px solid #dcdcdc"></div>
                    </template>
                </div>
            </li>
            <li>
                <div class="titles"><span>商品名称</span><div class="detial"><span>单价</span><span>数量</span><span>小计</span></div></div>
                <ul class="goodslist">
                    <li v-for="item in detail.goods">
                        <div class="imgsa" >
                            <img :src="parameter.upShow + item.goods_cover" alt="">
                        </div>
                        <p class="text">{{item.goods_title}}&#12288;-&#12288;{{item.goods_summary}}</p>
                        <div class="detial listd">
                            <span>￥{{item.goods_price}}</span>
                            <span>{{item.goods_num}}</span>
                            <span>￥{{item.goods_num*item.goods_price}}</span>
                        </div>
                    </li>
                    <li>
                        <div class="total">
                            <p><span>商品总计:￥{{totalprice}}</span></p>
                            <p><span>运费:+￥{{postage}}</span></p>
                            <p><span>应付金额:<span class="totalMoney">￥{{totalP}}</span></span></p>
                        </div>
                        <div style="width: 100%;height: 28px"></div>
                    </li>
                </ul>
            </li>
            <li>
                <div class="titles"><span>付款信息</span></div>
                <div class="conlist">
                    <p>支付方式：<span v-if="detail.pay_way == 1">微信支付</span><span v-if="detail.pay_way == 2">支付宝支付</span></p>
                    <p>支付金额：￥{{totalprice}}</p>
                </div>
            </li>
            <li>
                <div class="titles"><span>收货信息</span></div>
                <div class="conlist">
                    <p>姓名：{{detail.username}}</p>
                    <p>联系电话：{{detail.phone}}</p>
                    <p>详细地址：{{detail.address_detail}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                status:0,
                weid:'',
                send:[],
                detail:{},
                logistics:[],
                parameter:parameter,
                logistics_no:'',
                totalprice:0,
                postage:0,
                totalP:0
            };
        },
        methods: {
            firstReq(){
                this.$axios.get('order/detail/'+ this.weid).then((res) => {
                    if(res.code == 200 && res.data){
                        this.detail = res.data;
                        this.send = res.data.send;
                        console.log(this.send.length,22)
                        console.log(this.detail.goods,9999999999999999);
                        this.detail.goods.forEach(v => {
                            this.totalprice += parseFloat(v.goods_price);
                            if(v.postage){
                                this.postage += parseFloat(v.postage);
                            }else {
                                this.postage += 0;
                            }
                        })
                        this.totalP = this.totalprice + this.postage;
                        this.send.forEach(v => {
                            this.getLogistics(v.logistics_no,v.logistics_company_code);
                        })
                        this.status=res.data.order_status - 1;
                    }
                });
            },
            getLogistics(id,code){
                this.$axios.post('pages/logistics/getLogisticsInfo',{logistics_NO:id,company_code:code}).then((res) => {
                    if(res.code == 200 && res.data){
                        this.logistics.push(res.data.data);
                        console.log(this.logistics);
                    }
                });
            },
            getSearch(x) {
                var info = window.location.search;
                var arrs = info.slice(1,info.length).split('&');
                var y;
                arrs.forEach((v)=>{
                    var arrAy = v.split('&');
                    var objarr = arrAy[0].split('=')
                    if(objarr[0] == x){
                        y = objarr[1];
                    }
                });
                return y;
            }
        },
        mounted(){
            console.log(this.parameter)
            this.weid = this.getSearch('weid');
            this.$nextTick(()=>{
                this.firstReq();
            });
        }
    };
</script>

