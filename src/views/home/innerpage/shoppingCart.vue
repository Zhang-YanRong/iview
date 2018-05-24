<style>
    .container .ivu-table-border td,.container .ivu-table-border th{
        border-right: none;
    }
    .container .ivu-table-wrapper{
        border: none;
    }
    .container .ivu-table:after, .ivu-table:before{
        display: none;
    }
    .container .ivu-checkbox-inner{
        width: 20px;
        height: 20px;
    }
    .container .ivu-checkbox-checked .ivu-checkbox-inner{
        background-color: #009afe;
        border-color: #009afe;
    }
    .container .ivu-checkbox-checked .ivu-checkbox-inner:after{
        width: 6px;
        height: 10px;
        top: 2px;
        left: 6px;
        transition: none;
    }
    .container .table-title{
        background-color: #e6e6e6;
        font-size: 14px;
        color: #4d4d4d;
        height: 40px;
        line-height: 40px;
    }
    .container .table-title li{
        display: inline-block;
    }
    .container .ivu-table table thead tr th .ivu-checkbox{
        display: none;
    }
    .container .title{
        background-color: #fafafa;
        height: 60px;
        line-height: 60px;
        padding: 0 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .container .title span{
        font-size: 18px;
        color: #666666;
    }
    .container .title span:last-child{
        font-size: 14px;
        color: #999999;
    }
    .container .total{
        height: 100px;
        line-height: 100px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .container .total div{
        display: flex;
        align-items: center;
    }
    .container .total div label{
        width: 20px;
        height: 20px;
        background: url("../../../resource/images/unchecked.png");
        margin-right: 10px;
    }
    .container .total div label.checked{
        background: url("../../../resource/images/checked.png");
    }
    .container .total div label input{
        display: none;
    }
    .total .left span{
        font-size: 14px;
        color: #666666;
    }
    .total .right .btn{
        width: 100px;
        height: 36px;
        background-color: #009afe;
        text-align: center;
        line-height: 36px;
        font-size: 16px;
        color: #fff;
        border: none;
    }
    .total .right p{
        color: #666666;
        font-size: 14px;
    }
    .total .right p span{
        font-size: 18px;
        color: #f01010;
    }
    .total .right p.last{
        margin: 0 40px;
    }
    .store-name{
        padding: 10px 0;
        margin-left: 20px;
    }
    .nodata{
        text-align: center;
        font-size: 14px;
        padding: 20px 0;
    }
</style>
<template>
    <div class="container">
        <div class="title">
            <span>我的购物车</span>
            <span>返回</span>
        </div>
        <ul class="table-title">
            <li v-for="item in tableTitle" :style="{width : item.width + 'px', textAlign: item.align}">{{item.title}}</li>
        </ul>
        <div v-if="!cartData.length" class="nodata">暂无数据</div>
        <div v-else>
            <div v-for="(store,index) in cartData">
                <div class="store-name">{{store.mall.title}}</div>
                <Table border :show-header="false" ref="selection" @on-selection-change="changeEvent(store,$event)" :columns="columns4" :data="store.goods"></Table>
                <div class="total">
                    <div class="left">
                        <label for="check-all" :class="{'checked' : store.allCheck}" @click="handleSelectAll(store,index,$event)">
                            <input type="checkbox" id="check-all" v-model="store.allCheck">
                        </label>
                        <span>全选</span>
                    </div>
                    <div class="right">
                        <p>已选择 <span>{{store.selectNum}}</span> 件商品</p>
                        <p class="last">应付总额：<span>￥{{(store.allMoney).toFixed(2)}}</span></p>
                        <button class="btn">现在结算</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Modal v-model="showModal" title="删除商品" @on-ok="deleteGood" @on-cancel="cancel">
                <p>是否确认删除购物车中该商品？</p>
            </Modal>
        </div>

    </div>
</template>
<script>
    export default {
        data(){
            return {
                currentGoodId: '',
                showModal: false,
                tableTitle: [
                    {
                        title: '',
                        width: 76,
                        align: 'center'
                    }, {
                        title: '商品信息',
                        align: 'left',
                        width: 622,
                    }, {
                        title: '单价',
                        width: 100,
                        align: 'center'
                    },{
                        title: '数量',
                        align: 'center',
                        width: 200
                    },{
                        title: '小计',
                        align: 'center',
                        width: 100
                    },{
                        title: '操作',
                        align: 'center',
                        width: 100
                    }
                ],
                cartData: [],
                columns4 : [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '商品信息',
                        align: 'left',
                        render: (h,params) => {
                            return h('div', {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center'
                                }
                            },[
                                h('img',{
                                    attrs: {
                                        src: parameter.upShow + params.row.cover
                                    },
                                    style: {
                                        width: '80px',
                                        height: '80px',
                                        margin: '10px 20px 10px 0'
                                    }
                                }),
                                h('div', params.row.title)
                            ]);
                        }
                    },
                    {
                        title: '单价',
                        width: 100,
                        align: 'center',
                        key: 'price'
                    },
                    {
                        title: '数量',
                        align: 'center',
                        width: 200,
                        render: (h,params) => {
                            return h('div',[
                               h('span',{
                                   style: {
                                       width: '24px',
                                       height: '24px',
                                       textAlign: 'center',
                                       lineHeight: '24px',
                                       border: '1px solid #d9d9d9',
                                       display: 'inline-block',
                                       cursor: 'pointer'
                                   },
                                   on: {
                                       click: () => {
                                           this.handleNum(params.row,'reduce');
                                       }
                                   }
                               },'-'),
                                h('span',{
                                    style: {
                                        fontSize: '14px',
                                        color: '#4d4d4d',
                                        marginRight: '14px',
                                        marginLeft: '14px'
                                    }
                                },params.row.goods_num),
                                h('span',{
                                    style: {
                                        width: '24px',
                                        height: '24px',
                                        textAlign: 'center',
                                        lineHeight: '24px',
                                        border: '1px solid #d9d9d9',
                                        display: 'inline-block',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleNum(params.row,'add');
                                        }
                                    }
                                },'+')
                            ]);
                        }
                    },
                    {
                        title: '小计',
                        align: 'center',
                        width: 100,
                        render: (h,params) => {
                            return h('div', params.row.goods_num*params.row.price);
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 100,
                        render: (h,params) => {
                            return h('div',[
                                h('button',{
                                    style: {
                                        width: '58px',
                                        height: '29px',
                                        backgroundColor: '#fafafa',
                                        border: '1px solid #e5e5e5',
                                        fontSize: '14px',
                                        color: '#4d4d4d'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleDelete(params.row.cartweid);
                                        }
                                    }
                                },'删除')
                            ]);
                        }
                    }
                ]
            };
        },
        methods: {
            handleSelectAll (store,ind,e) {
                store.allCheck = !store.allCheck;
                this.$refs.selection[ind].selectAll(store.allCheck);
                e.preventDefault();
            },
            changeEvent (store,selection){
                console.log(store, selection);
                store.selectItem = selection;
                store.allCheck = selection.length === store.goods.length;
                store.selectNum = selection.length;
                //遍历所有的勾选项 计算总价格
                var allMoney = 0;
                store.selectItem.forEach(function (item) {
                    allMoney+=item.price * item.goods_num;
                });
                store.allMoney = parseFloat(allMoney);
            },
            handleNum: function (row, des) {
                console.log(row,des);
                if(des === 'reduce'){
                    row.goods_num--;
                    if(row.goods_num < 1){
                        row.goods_num = 1;
                        this.$Message.warning('不能小于1');
                    }
                }else if(des === 'add'){
                    row.goods_num++;
                    if(row.goods_num > row.stock){
                        row.goods_num = row.stock;
                        this.$Message.warning('不能大于库存');
                    }
                }
                //数据结构里的goods_num值保持一致（cartData里的和每一个store中的selectItem）
                //选择数量后再去勾选 selectItem 值是动态改变的  如果先勾选某条数据然后再选择数量，selectItem 值不是最新的 需要手动修改为最新值
                var allMoney = 0;
                this.cartData.forEach(function (store) {
                    store.goods.forEach(function (good,i) {
                        if(good.weid === row.weid){
                            store.goods[i] = row;
                            if(store.selectItem.length){
                                store.selectItem.forEach(function (obj,index) {
                                    if(obj.weid === row.weid){
                                        store.selectItem[index] = row;
                                        obj = row;
                                    }
                                    allMoney += obj.price * obj.goods_num;
                                });
                                store.allMoney = parseFloat(allMoney);
                                console.log('after-store.selectItem',store.selectItem);
                            }
                        }
                    });
                });
                console.log(this.cartData);
            },
            handleDelete: function (id) {
                this.currentGoodId = id;
                this.showModal = true;
            },
            cancel: function () {

            },
            deleteGood: function () {
                var self = this;
                this.$axios.post('cart/destroy',{
                    'weid': [this.currentGoodId]
                }).then(function (res) {
                    if(res.code == 200){
                        self.showModal = false;
                        self.$Message.success('删除成功!');
                        self.getCartData();
                    }
                });
            },
            getCartData: function () {
                var self = this;
                var id = global.Storage.get(global.Param.userData).weid;
                this.$axios.post('cart/lists',{'user_id': id}).then(function (res) {
                    if(res.code == 200 && res.data){
                        res.data.list.forEach(function (item) {
                            item.allCheck = false;
                            item.allMoney = 0;
                            item.selectNum = 0;
                            item.selectItem = [];
                        });
                        self.cartData = res.data.list;
                    }
                });
            }
        },
        mounted() {
            this.getCartData();
        }
    };
</script>