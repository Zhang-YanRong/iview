<style scoped>
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
    .search-form{
        padding: 30px 71px;
    }
    .search-form Input,.search-form DatePicker{
        margin-right: 20px;
    }
    .order-item ul li{
        display: inline-block;
        text-align: center;
        vertical-align: middle;
    }
    .order-item .item-title{
        background: #e6e6e6;
        padding: 14px 30px;
    }
    .order-item .item-title li{
        font-size: 14px;
        color: #4d4d4d;
    }
    .order-item .item-content{
        padding: 30px;
    }
    .order-item .item-content li{
        font-size: 14px;
        color: #666666;
    }
    .order-item .item-content li img{
        width: 120px;
        height: 80px;
        margin-right: 10px;
        flex: none;
    }
    .order-item .item-content li:first-child div{
        display: flex;
        align-items: center;
    }
    .ivu-page{
        padding: 50px 0;
        border-top: 1px solid #E6E6E6;
        text-align: center;
    }
    .nodata{
        text-align: center;
        font-size: 14px;
        padding: 20px 0;
    }
</style>
<template>
    <div>
        <div class="title">
            <span>活动订单</span>
        </div>
        <div class="search-form">
            <label>报名时间</label>
            <DatePicker type="daterange" split-panels placeholder="选择开始和结束日期" @on-change="getDateVal" style="width: 400px;"></DatePicker>
            <Input v-model="actName" placeholder="活动名称" style="width: 200px"></Input>
            <Select v-model="actType" clearable style="width:200px">
                <Option v-for="item in cateList" :value="item.weid" :key="item.weid">{{ item.title }}</Option>
            </Select>
            <Button type="primary" @click="forSearch">搜索</Button>
        </div>
        <div v-if="!orderList.length" class="nodata">暂无数据</div>
        <div v-else>
            <div class="order-item" v-for="item in orderList">
                <ul class="item-title">
                    <li style="width: 528px; text-align: left;">订单号：{{item.out_trade_no}}</li>
                    <li style="width: 200px;">金额</li>
                    <li style="width: 183px;">状态</li>
                    <li style="width: 172px;">时间</li>
                    <li>操作</li>
                </ul>
                <ul class="item-content">
                    <li style="width: 528px; text-align: left;">
                        <div>
                            <img :src="parameter.upShow+item.cover" alt="">
                            <span>{{item.activity_title}}</span>
                        </div>
                    </li>
                    <li style="width: 200px;">￥{{item.total_fee}}</li>
                    <li style="width: 183px;">{{item.state == 1 ? '未支付' : item.state == 2 ? '已支付' : '已关闭'}}</li>
                    <li style="width: 172px;">{{item.created_at}}</li>
                    <li><Button size="small">删除</Button></li>
                </ul>
            </div>
        </div>

        <Page :total="totalList" :page-size="1" :current="page" @on-change="pagination"></Page>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                parameter: parameter,
                orderList: [],
                actName: '',
                actType: '',
                page: 1,
                totalList: 0,
                enroll_start: '',
                enroll_end: '',
                searchData: {},
                cateList: []
            };
        },
        methods: {
            forSearch: function () {
                this.page = 1;
                let param = {
                    activity_title: this.actName,
                    enroll_start: this.enroll_start,
                    enroll_end: this.enroll_end,
                    cate_id: this.actType
                };
                this.searchData = param;
                this.getData();
            },
            getDateVal: function (value) {
                if(value && value.length){
                    let start = value.shift();
                    this.enroll_start = start ? start : '';
                    let end = value.pop();
                    this.enroll_end = end ? end : '';
                }
            },
            pagination: function (page) {
                this.page = page;
                this.getData();
            },
            getData: function () {
                this.$axios.get('activity/user_order_list?limit=1&page='+this.page,  {params: this.searchData}).then((res)=>{
                    if(res.code == 200){
                        this.orderList = res.data.list;
                        this.totalList = res.data.total;
                    }
                });
            }
        },
        mounted(){
            this.$axios.get('activity/cate/lists').then((res)=>{
                if(res.code == 200){
                    this.cateList = res.data.list;
                }
            });
            this.getData();
        }
    };
</script>