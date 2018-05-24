<template>
    <div>
        <div class="content">
            <main>
                <div class="add">
                    <span>我的订单</span>
                </div>
                <div class="time">
                    成交时间：
                    <DatePicker type="daterange" @on-change="days" format="yyyy-MM-dd" placement="bottom"
                                placeholder="日期选择" style="width: 200px;position: relative;top:1px;"></DatePicker>
                    <Input v-model="searchs.order_num" clearable placeholder="商品名/订单号"
                           style="width: 200px;margin-left: 40px;"></Input>
                    <Select v-model="searchs.order_status" placeholder="订单状态" style="width:200px;margin-left: 40px;">
                        <Option v-for="item in statusTypelist" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                    <Button type="primary" @click="search" style="height: 30px;margin-left: 40px;">搜索</Button>
                </div>
                <div class="table">
                    <ul>
                        <li v-for="(item,index) in dataList">
                            <div class="listTile">
                                <Row>
                                    <Col span="3">
                                    <span>{{item.created_at}}</span></Col>
                                    <Col span="6">
                                    <span>订单号：{{item.order_num}}</span></Col>
                                    <Col span="3">
                                    <span>单价</span></Col>
                                    <Col span="3">
                                    <span>数量</span></Col>
                                    <Col span="3" style="border-right: 1px solid #e6e6e6">
                                    <span>操作</span></Col>
                                    <Col span="3">
                                    <span>应付金额</span></Col>
                                    <Col span="3">
                                    <a :href="parameter.httpdomain + 'user/order/detail/'+item.weid">查看详情></a></Col>
                                </Row>
                            </div>
                            <div class="listCon" v-for="(v,i) in item.goods" :key="item.weid">
                                <Row>
                                    <Col span="3">
                                    <div style="width:100%;height: 100%;overflow: hidden;margin-top: 20px;">
                                        <div class="img"
                                             :style="{background: 'url(' + parameter.upShow + v.goods_cover + ') no-repeat center/cover' }"></div>
                                    </div>
                                    </Col>
                                    <Col span="6">
                                    <p class="text">{{v.goods_title}}</p></Col>
                                    <Col span="3">
                                    <p>{{v.goods_price}}</p></Col>
                                    <Col span="3" style="border-right: 1px solid #e6e6e6;">
                                    <p>{{v.goods_num}}</p></Col>
                                    <Col v-if="i == 0" span="3" id="ctrl"
                                         style="height: 120px;display: flex;align-items: center;">
                                    <component style="margin-left: 34px;" :callbackdata="dataList[index]"
                                               v-bind:is="show[index]"></component>
                                    </Col>
                                    <Col span="3">
                                    <p v-if="i == 0">{{dataListTotlprice[index]}}</p>
                                    <p v-else>&nbsp;</p></Col>
                                    <Col span="3" v-if="i == 0">
                                    <p v-if="item.status == 1 && item.order_status != 6">待付款</p>
                                    <p v-if="item.status == 2">已支付</p>
                                    <p v-if="item.status == 3">已退款</p>
                                    <p v-if="item.order_status == 6">已取消</p>
                                    </Col>
                                </Row>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="page">
                    <Page style="margin: 0 auto;width: 392px" :total="inIt.total" :current="inIt.page" :page-size="inIt.limit" @on-change="everyList"
                          show-total></Page>
                </div>
            </main>
        </div>
        <Modal title="退款原因：" v-model="inIt.reason" class-name="vertical-center-modal" @on-ok="tuikuan"
               @on-cancle="cancletuikuan">
            <Input v-model="reason" type="textarea" style="min-width: 488px;" :rows="4" placeholder="请输入退款原因"></Input>
        </Modal>
        <Modal title="评价商品：" v-model="inIt.comment" class-name="vertical-center-modal" @on-ok="comment"
               @on-cancle="cancletuikuan">
            <ul class="pcomment">
                <li v-for="(item,i) in commentData" :key="item.weid">
                    <ul class="tuikuan">
                        <li>
                            <img :src="parameter.upShow + item.goods_cover" alt="">
                            <div class="goog_titles"><p class="text2">{{item.goods_title}}</p></div>
                        </li>
                    </ul>
                    <div class="addImage">
                        <UPLOAD @photo="getPhoto" :itemid="item.goods_id"></UPLOAD>
                    </div>
                    <commentchild @goodscomment="getGoodscomment" :itemid="item.goods_id"></commentchild>
                </li>
            </ul>

        </Modal>
    </div>
</template>

<script>
    // import BTN from '@path/components/detailBtn.vue';
    import first from '@path/components/orderListBtn/first.vue';
    import second from '@path/components/orderListBtn/second.vue';
    import third from '@path/components/orderListBtn/third.vue';
    import fourth from '@path/components/orderListBtn/fourth.vue';
    import five from '@path/components/orderListBtn/five.vue';
    import six from '@path/components/orderListBtn/six.vue';
    import seven from '@path/components/orderListBtn/seven.vue';
    import eighth from '@path/components/orderListBtn/eighth.vue';
    import ninth from '@path/components/orderListBtn/ninth.vue';
    import Logi from '@path/components/orderListBtn/Logistics.vue';
    import UPLOAD from '@path/components/upload.vue';
    import commentchild from '@path/components/commentchild.vue';
    import bus from '@path/bus.js';

    export default {
        components: {
            first,
            second,
            third,
            fourth,
            five,
            six,
            seven,
            eighth,
            ninth,
            Logi,
            UPLOAD,
            commentchild,
        },
        name: 'my',
        data() {
            return {
                day: [],
                parameter: parameter,
                plat_user_id: '',
                dataList: [],
                dataListTotlprice: [],
                goodsName: null,
                goodsType: '',
                modal1: false,
                inIt: {
                    limit: 5,
                    page: 1,
                    total: 0,
                    reason: false,
                    comment: false
                },
                searchs: {
                    order_num: null,
                    order_status: 0,
                    //搜索时候重置
                    limit: 5,
                    page: 1
                },
                statusTypelist: [
                    {
                        value: 0,
                        label: '全部'
                    },
                    {
                        value: 1,
                        label: '待支付'
                    },
                    {
                        value: 2,
                        label: '待发货'
                    },
                    {
                        value: 3,
                        label: '已发货'
                    },
                    {
                        value: 7,
                        label: '已完成'
                    },
                    {
                        value: 8,
                        label: '已申请退款'
                    },
                    {
                        value: 9,
                        label: '已退款'
                    },

                ],
                wuliu: true,
                show: [],
                arr: ['first', 'second', 'third', 'fourth', 'five', 'six', 'seven', 'eighth', 'ninth'],
                callbackdata: {
                    goodList: []
                },
                reason: '',//退款理由
                tuikuanweid: '',
                commentreason: [],//评论
                commentData: [],//评论的物品
                photo: [],//评论图片地址
                commentSenddata: [],
                pinglunweid:''

            };
        },
        methods: {
            //去付款-ok
            gopay(id, domain) {
                window.location.href = parameter.httpdomain + domain + '/wemall/pay/' + id;
            },
            //日期选择器-ok
            days(value) {
                this.day = value;
            },
            //确认收货-ok
            Confirmreceipt(weid) {
                this.$axios.post('order/take', {'order_id': weid}).then((res) => {
                    if (res.code == 200 && res.data) {
                        this.$Message.info('订单已成功确认收货！');
                        this.orderList();
                    }
                });
            },
            //删除前确认提示框-ok
            instance(weid) {
                this.$Modal.confirm({
                    title: '请确认操作：',
                    content: '<p>删除后订单将无法恢复</p>',
                    onOk: () => {
                        this.remove(weid);
                    }
                });
            },
            //删除订单-ok
            remove(weid) {
                this.$axios.post('order/delete', {'order_id': weid}).then((res) => {
                    if (res.code == 200 && res.data) {
                        this.$Message.info('订单已成功删除！');
                        this.orderList();
                    }
                });
            },
            //确定交易-ok
            Determinetransaction(weid) {
                this.$axios.post('order/ok', {'order_id': weid}).then((res) => {
                    if (res.code == 200 && res.data) {
                        this.$Message.info('订单已成功确认收货！');
                        this.orderList();
                    }
                });
            },
            //申请退款-ok
            Requestrefund(weid) {
                this.inIt.reason = true;
                this.tuikuanweid = weid;
            },
            tuikuan() {
                this.$axios.post('order/refund', {'order_id': this.tuikuanweid, 'reason': this.reason}).then((res) => {
                    if (res.code == 200 && res.data) {
                        this.$Message.info('订单已发起退款申请！');
                        this.orderList();
                    }
                });
            },
            cancletuikuan() {
                this.inIt.reason = false;
                this.tuikuanweid = '';
            },
            //评论-ok
            pinglun(weid) {
                this.dataList.forEach(v => {
                    if (v.weid == weid) {
                        this.commentData = v.goods;
                    }
                });
                this.inIt.comment = true;
                this.pinglunweid = weid;
            },
            canclepinlun() {
                this.inIt.comment = false;
                this.commentreason = [];
            },
            comment() {
                this.commentData.forEach(v => {
                    var obj = {
                        'goods_id': '',
                        'order_id': '',
                        'pictures': [],
                        'content': '',
                        'title': '',
                        'grade': 5
                    };
                    obj.goods_id = v.goods_id;
                    obj.order_id = v.order_id;
                    obj.title = v.goods_title;
                    this.commentSenddata.push(obj);
                });
                this.commentSenddata.forEach(v => {
                    this.photo.forEach(x => {
                        if (v.goods_id == x.goods_id) {
                            v.pictures = x.photo;
                        }
                    });
                    this.commentreason.forEach(x => {
                        if (v.goods_id == x.goods_id) {
                            v.content = x.reason;
                        }
                    });
                });
                var data = {
                    'order_id':this.pinglunweid,
                    'data': this.commentSenddata
                };
                this.$axios.post('goods/comment/store', data).then((res) => {
                    if (res.code == 200 && res.data) {
                        this.$Message.info('评论成功！');
                    }
                });
            },
            //获取子组件评论图片路径-ok
            getPhoto(res) {
                if (this.photo.length == 0) {
                    this.photo.push(res);
                } else {
                    for (var i = 0; i < this.photo.length; i++) {
                        if (this.photo[i].goods_id == res.goods_id) {
                            this.photo[i] = res;
                        }
                    }
                }
                console.log(this.photo, 8888888888888888);
            },
            //获取子组件评论内容-ok
            getGoodscomment(res) {
                if (this.commentreason.length == 0) {
                    this.commentreason.push(res);
                } else {
                    console.log(this.commentreason);
                    for (var i = 0; i < this.commentreason.length; i++) {
                        console.log(res, 444444444444444);
                        if (this.commentreason[i].goods_id == res.goods_id) {
                            this.commentreason[i] = res;
                        }
                    }
                }
                console.log(this.commentreason, 9999999999999999);
            },
            //订单未支付-取消订单 -ok
            cancle(weid) {
                var self = this;
                this.$axios.post('order/cancel', {order_id: weid}).then((res) => {
                    if (res.code == 200 && res.data) {
                        this.$Message.info('订单已成功取消！');
                        self.orderList();
                    }
                });
            },
            //计算每单总价-ok
            computedPrice() {
                this.dataList.forEach((v, i) => {
                    this.dataListTotlprice[i] = 0;
                    v.goods.forEach((m, n) => {
                        var prices = parseFloat(m.goods_price);
                        this.dataListTotlprice[i] = this.dataListTotlprice[i] + prices;
                    });
                });
            },
            //我的订单列表-ok
            orderList(S_time, B_time, order_num, keywords) {
                var data = {
                    limit: this.inIt.limit,
                    plat_user_id: this.plat_user_id,
                    page: this.inIt.page,
                    order_status: this.searchs.order_status,
                    time_start: (S_time) ? S_time : '',
                    time_end: (B_time) ? B_time : '',
                    order_num: (order_num) ? order_num : null,
                    keywords: (keywords) ? keywords : ''
                };
                this.$axios.post('order/list', data).then((res) => {
                    if (res.code == 200 && res.data) {
                        this.show = [];
                        this.dataList = [];
                        this.dataList = res.data.list;
                        this.callbackdata.goodList = this.dataList;
                        console.log(this.dataList, 2222);
                        this.inIt.total = res.data.total;
                        this.dataList.forEach(v => {
                            this.show.push(this.arr[v.order_status - 1]);
                        });
                        console.log(this.show);
                        this.computedPrice();
                    }
                });
            },
            //分页-ok
            everyList(res) {
                this.inIt.page = res;
                this.orderList();
            },
            //用户身份信息请求-ok
            people() {
                this.$axios.get('cert/realName/detail').then((res) => {
                    if (res.code == 200 && res.data) {
                        this.plat_user_id = res.data.plat_user_id;
                        this.platidReq();
                    }
                });
            },
            //搜索-ok
            search() {
                this.inIt.limit = this.searchs.limit;
                this.inIt.page = this.searchs.page;
                var S_time = this.day[0];
                var B_time = this.day[1];
                var order_num = this.searchs.order_num;
                var keywords = this.searchs.keywords;
                this.orderList(S_time, B_time, order_num, keywords);
            },
            platidReq() {
                var self = this;
                this.$axios.get('pages/page/getDetailByUser/' + self.plat_user_id).then(function (res) {
                    if (res.code == 200 && res.data) {
                        self.orderList();
                    }
                });
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.people();
                bus.$on('getData', (res) => {
                    var functionName = res.data.names;
                    this[functionName](res.data.weid, res.data.domain);
                });
            });
        }
    };
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    body {
        background: #ededed;
    }

    .addImage {
        margin-bottom: 10px;
    }

    .pcomment > li {
        margin-top: 20px;
    }

    .pcomment > li:nth-of-type(1) {
        margin-top: 0;
    }

    .page {
        width: 100%;
        height: 34px;
        margin-top: 35px;
        margin-bottom: 35px;
    }

    .tuikuan {
        width: 100%;
        height: auto;
        overflow: hidden;
    }

    .tuikuan > li {
        float: left;
        margin-right: 29px;
        width: 100px;
        height: auto;
        font-size: 14px;
        line-height: 1.42857143;
    }

    .tuikuan > li > img {
        display: block;
        width: 100px;
        height: 100px;
        padding: 10px;
        border: 1px solid #E6E6E6;
        box-sizing: border-box;
    }

    .tuikuan > li:nth-of-type(4n) {
        margin-right: 0;
    }

    .goog_titles {
        width: 100px;
        height: auto;
        overflow: hidden;
        padding: 10px 0;
    }

    .ivu-page {
        border-top: 0 solid #E6E6E6;
    }

    .top {
        width: 100%;
        height: 50px;
        background: #fff;
    }

    main {
        width: 1200px;
        height: auto;
        margin: 0 auto;
    }

    .top > main {
        box-sizing: border-box;
        height: 100%;
        border-bottom: 1px solid #dedede;
        background: pink;
    }

    .content {
        width: 100%;
        height: auto;
        margin-top: 19px;
        overflow: hidden;
    }

    .add {
        width: 100%;
        height: 59px;
        border: 1px solid #dedede;
        background: #fff;
        box-sizing: border-box;
    }

    .add > span {
        font-size: 18px;
        color: #666666;
        line-height: 59px;
        margin-left: 20px;
    }

    .time {
        height: 96px;
        width: 100%;
        background: #fff;
        border-right: 1px solid #dedede;
        border-left: 1px solid #dedede;
        box-sizing: border-box;
        padding: 30px 71px;
        line-height: 36px;
        font-size: 14px;
        color: #646464;
    }

    .table {
        width: 100%;
        height: auto;
        border: 1px solid #dedede;
        border-bottom: 0 solid #dedede;
    }

    .table > ul {
        width: 100%;
        height: auto;
    }

    .table > ul > li {
        width: 100%;
        height: auto;
        position: relative;
        background: #fff;
    }

    .table > ul > li > div {
        border-bottom: 1px solid #e6e6e6;
    }

    .listTile {
        width: auto;
        background: #e6e6e6;
        height: 40px;

    }

    .listTile span {
        display: block;
        width: auto;
        height: 40px;
        overflow: hidden;
        line-height: 40px;
        text-align: center;
    }

    .listTile a {
        display: block;
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
    }

    .listCon {
        width: 100%;
        height: 120px;
        background: #fff;
        overflow: hidden;

    }

    .img {
        width: 80px;
        height: 80px;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        margin: 0 auto;
    }

    .center {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    .listCon p {
        line-height: 120px;
        text-align: center;
    }

    .list {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
        z-index: 2;
    }

    .back {
        background: #e6e6e6;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 40px;
    }

    .text2 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .nav > a {
        display: block;
        text-decoration: none;
        width: 200px;
        text-align: center;
        line-height: 50px;
        float: left;
    }
</style>