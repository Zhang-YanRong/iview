<style scoped>
    .container {
        width: 1200px;
        margin: auto;
        background-color: #fff;
        margin-top: 20px;
        padding: 0 30px;
        box-sizing: border-box;
        font-size: 14px;
        color: #333333;
        padding-bottom: 100px;
    }

    .info {
        padding-top: 40px;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .info span.name {
        font-size: 18px;
    }

    .info .office-cert img {
        width: 58px;
        height: 20px;
    }

    .info .office-cert {
        padding: 0 20px;
        margin: 0 20px;
        border-left: 1px solid #B3B3B3;
        border-right: 1px solid #B3B3B3;
    }

    .info .cert {
        width: 26px;
        height: 22px;
        vertical-align: bottom;
    }

    .info .panel-control{
        width: 34px;
        height: 28px;
        background: url("../../resource/images/guide-open.png") no-repeat center center;
        background-size: cover;
    }
    .info .close-panel{
        background: url("../../resource/images/close-panel.png") no-repeat center center;
    }

    .info > div > span, .info > div > span > img {
        vertical-align: middle;
    }

    .guide {
        border: 1px solid #ebebeb;
    }

    .guide .title {
        padding: 13px 15px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #f7f7f7;
        border-bottom: 1px solid #ebebeb;
    }

    .guide .title img {
        display: block;
        width: 10px;
        height: 10px;
    }

    .guide .panel {
        display: flex;
        align-items: inherit;
    }

    .guide .left {
        width: 450px;
        padding: 20px 23px;
        border-right: 1px solid #d9d9d9;
        flex: none;
    }

    .guide .left li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        cursor: pointer;
    }

    .guide .left li.active span{
        color: #3388ff;
    }

    .guide .left li:last-child {
        margin-bottom: 0;
    }

    .guide .left li span {
        font-size: 12px;
        color: #666666;
    }

    .guide .right {
        padding: 20px 25px;
        position: relative;
        width: 689px;
        flex: none;
    }

    .guide .right div {
        font-size: 12px;
    }

    .guide .right button {
        width: 60px;
        height: 26px;
        line-height: 26px;
        background-color: #f7f7f7;
        border: 1px solid #d9d9d9;
        font-size: 12px;
        color: #666666;
        text-align: center;
        position: absolute;
        right: 30px;
        bottom: 20px;
    }

    .data-show {
        width: 100%;
        padding: 40px 0;
        display: flex;
        align-items: center;
        background-color: #f7f7f7;
        margin-top: 10px;
    }

    .data-show div {
        text-align: center;
    }

    .data-show > div {
        flex: 1;
    }

    .data-show > div > div:first-child {
        font-size: 24px;
        color: #3388ff;
    }

    .container h4 {
        color: #666666;
        margin-top: 50px;
        margin-bottom: 20px;
    }

    .feature > div {
        overflow: hidden;
    }

    .feature div p, .feature div .link {
        width: 276px;
        height: 60px;
        line-height: 60px;
        background-color: #f7f7f7;
        float: left;
        margin-right: 12px;
        padding-left: 17px;
        color: #333333;
    }

    .feature div p img, .feature div .link img {
        width: 26px;
        height: 26px;
        vertical-align: middle;
        margin-right: 12px;
    }

    .feature div p span, .feature div .link span {
        vertical-align: middle;
    }

    .feature div p:last-child {
        margin-right: 0;
    }

    .feature div.line2 {
        margin-top: 12px;
    }

    .count > div {
        overflow: hidden;
    }

    .count .col {
        float: left;
        margin-right: 20px;
        width: 270px;
        padding: 32px 0;
        text-align: center;
        background-color: blue;
    }

    .count .col h3 {
        font-size: 18px;
        color: #fff;
        text-align: center;
        font-weight: normal;
    }

    .count .col p {
        font-size: 12px;
        color: #fff;
        text-align: center;
    }

    .count .col:last-child {
        margin-right: 0;
    }

    /*弹窗通用样式*/
    .modal_common .model_title{
        text-align: center;
    }
</style>
<template>
    <div>
        <div class="container">
            <div class="info">
                <div>
                    <span class="name">张朝阳</span>
                    <span class="office-cert">
                    <img src="../../resource/images/info-office-cert.png" alt="">
                </span>
                    <img class="cert" src="../../resource/images/info-cert.png" alt="">
                </div>

                <div @click="panelToggle" class="panel-control" :class="{'close-panel' : !openGuide}"></div>

            </div>
            <div class="guide" v-show="openGuide">
                <div class="title">
                    <span>新手指引</span>
                    <img @click="closePanel" src="../../resource/images/close.png" alt="">
                </div>
                <div class="panel">
                    <div class="left">
                        <ul>
                            <li v-for="item in guideStepList" :class="{'active' : currentStep.title == item.title}" @click="showGuideStep(item)">
                                <span>{{item.title}}</span>
                                <span>{{item.is_over == 1 ? '已完成' : '未完成'}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="right">
                        <div>{{currentStep.description}}</div>
                        <button @click="goStart">开始</button>
                    </div>
                </div>
            </div>
            <div class="data-show">
                <div>
                    <div>0</div>
                    <div>待付款</div>
                </div>
                <div>
                    <div>0</div>
                    <div>待收货</div>
                </div>
                <div>
                    <div>0</div>
                    <div>待评价</div>
                </div>
                <div>
                    <div>￥0.00</div>
                    <div>今日交易额</div>
                </div>
                <div>
                    <div>￥0.00</div>
                    <div>账户余额</div>
                </div>
            </div>
            <div class="feature">
                <h4>常用功能</h4>
                <div>
                    <router-link :to="{name:'user_account'}" class="link">
                        <img src="../../resource/images/zhsz.png" alt="">
                        <span>账号设置</span>
                    </router-link>
                    <router-link :to="{name: 'user_address'}" class="link">
                        <img src="../../resource/images/shdz.png" alt="">
                        <span>收货地址</span>
                    </router-link>
                    <p @click="showModal('cert')">
                        <img src="../../resource/images/gfrz.png" alt="">
                        <span>官方认证</span>
                    </p>
                    <p @click="showModal('auth')">
                        <img src="../../resource/images/smrz.png" alt="">
                        <span>实名认证</span>
                    </p>
                </div>
                <div class="line2">
                    <router-link :to="{name: 'user_my_letter'}" class="link">
                        <img src="../../resource/images/wdsx.png" alt="">
                        <span>我的私信</span>
                    </router-link>
                    <router-link :to="{name: 'user_friends_notice'}" class="link">
                        <img src="../../resource/images/hytz.png" alt="">
                        <span>好友通知</span>
                    </router-link>
                    <router-link :to="{name: 'user_system_msg'}" class="link">
                        <img src="../../resource/images/xtxx.png" alt="">
                        <span>系统消息</span>
                    </router-link>
                    <p @click="showModal('phone')">
                        <img src="../../resource/images/xgsj.png" alt="">
                        <span>修改手机</span>
                    </p>
                </div>
            </div>
            <div class="count">
                <h4>我的账号</h4>
                <div>
                    <router-link :to="{name: 'user_my_wallet'}" class="col" style="background-color: #77d277">
                        <h3>我的钱包</h3>
                        <p>最安全的财务保障，放心的贴身管家</p>
                    </router-link>
                    <div class="col" style="background-color: #67b8d3" @click="showModal('secret_order')">
                        <h3>操作密令</h3>
                        <p>最安全的财务保障，放心的贴身管家</p>
                    </div>
                    <router-link :to="{name: 'user_shop_order'}" class="col" style="background-color: #7a96d5">
                        <h3>订单管理</h3>
                        <p>最安全的财务保障，放心的贴身管家</p>
                    </router-link>
                    <router-link :to="{name: 'user_shopping_cart'}" class="col" style="background-color: #d77eca">
                        <h3>我的购物车</h3>
                        <p>最安全的财务保障，放心的贴身管家</p>
                    </router-link>
                </div>
            </div>
            <div class="feature">
                <h4>我的活动</h4>
                <div>
                    <router-link :to="{name: 'user_my_activity_order'}" class="link">
                        <img src="../../resource/images/hddd.png" alt="">
                        <span>活动订单</span>
                    </router-link>
                    <p>
                        <img src="../../resource/images/zchd.png" alt="">
                        <span>支持活动</span>
                    </p>
                    <router-link :to="{name: 'user_follow_activity'}" class="link">
                        <img src="../../resource/images/gzhd.png" alt="">
                        <span>关注活动</span>
                    </router-link>
                </div>
            </div>
            <div class="feature">
                <h4>我的文章</h4>
                <div>
                    <router-link :to="{name: 'user_find_art'}" class="link">
                        <img src="../../resource/images/fxwz.png" alt="">
                        <span>发现文章</span>
                    </router-link>
                    <p>
                        <img src="../../resource/images/gzwz.png" alt="">
                        <span>关注文章</span>
                    </p>
                    <router-link :to="{name: 'user_reward_art'}" class="link">
                        <img src="../../resource/images/dswz.png" alt="">
                        <span>打赏文章</span>
                    </router-link>
                </div>
            </div>
            <div class="feature">
                <h4>我的圈子</h4>
                <div>
                    <p>
                        <img src="../../resource/images/wdwy.png" alt="">
                        <span>我的微友</span>
                    </p>
                    <p>
                        <img src="../../resource/images/wder.png" alt="">
                        <span>我的恩人</span>
                    </p>
                    <p>
                        <img src="../../resource/images/wdej.png" alt="">
                        <span>我的恩金</span>
                    </p>
                </div>
            </div>
        </div>
        <div>
            <Modal v-model="showOurModal" :mask-closable="false" class-name="modal_common" @on-cancel="cancelIt">
                <p slot="header" class="model_title">
                    <span>{{modalTitle}}</span>
                </p>
                <!--弹窗内容-实名认证部分-->
                <AuthModal ref="comp" v-if="currentModal=='auth'" @changeBtnText="changeBtnText"></AuthModal>
                <!--弹窗内容-官方认证部分-->
                <CertModal ref="comp" v-if="currentModal=='cert'" @changeBtnText="changeBtnText"></CertModal>
                <!--弹窗内容-修改手机-->
                <EditPhone ref="comp" v-if="currentModal=='phone'" @changeBtn="changeBtn" @closeModal="closeModal"></EditPhone>
                <!--弹窗内容-操作密令-->
                <secretOrder ref="comp" v-if="currentModal=='secret_order'"></secretOrder>

                <div slot="footer">
                    <Button type="primary" size="large" @click="handleSome" long>{{modalFooter}}</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>
    import AuthModal from '@path/components/AuthModal.vue';
    import CertModal from '@path/components/CertModal.vue';
    import EditPhone from '@path/components/EditPhone.vue';
    import secretOrder from '@path/components/secretOrder.vue';
    export default {
        components: {
            AuthModal,
            CertModal,
            EditPhone,
            secretOrder
        },
        data(){
            return {
                isStepLast: false,
                modalTitle: '',
                modalFooter: '',
                showOurModal: false,
                currentModal: '',
                currentStep: {},
                openGuide: true,
                guideStepList: []
            };
        },
        methods: {
            cancelIt: function () {
                this.currentModal = '';
                this.showOurModal = false;
            },
            goStart: function () {
              switch (this.currentStep.title){
                  case '设置个人资料':
                      this.$router.push({name:'user_account'});
                      break;
                  case '实名认证':
                      this.showModal('auth');
                      break;
                  case '官方认证':
                      this.showModal('cert');
                      break;
                  case '收货地址管理':
                      this.$router.push({name:'user_address'});
                      break;
              }
            },
            closeModal: function () {
                this.showOurModal = false;
            },
            handleSome: function () {
                this.$nextTick(function () {
                    if(this.modalFooter === '确定'){
                        this.cancelIt();
                    }else{
                        this.$refs.comp.next(this.modalFooter);
                    }

                });
            },
            changeBtn: function () {
                this.isStepLast = true;
                this.modalFooter = '完成';
            },
            panelToggle: function () {
                this.openGuide = !this.openGuide;
            },
            closePanel: function(){
                this.openGuide = false;
            },
            showGuideStep: function(item){
                this.currentStep = item;
            },
            showModal: function (type) {
                this.currentModal = type;
                this.showOurModal = true;
                switch (this.currentModal){
                    case 'auth':
                        this.modalTitle = '实名认证';
                        this.modalFooter = '提交申请';
                        break;
                    case 'cert':
                        this.modalTitle = '官方认证';
                        this.modalFooter = '提交申请';
                        break;
                    case 'phone':
                        this.modalTitle = '修改手机';
                        this.modalFooter = this.isStepLast ? '完成' : '下一步';
                        break;
                    case 'secret_order':
                        this.modalTitle = '操作密令';
                        this.modalFooter = '提交';
                }
            },
            changeBtnText: function (payload) {
                this.modalFooter = payload.tip;
            }
        },
        mounted(){
            var self = this;
            this.$axios.post('task/userTaskList',{'style': 1}).then(function (res) {
                if(res.code == 200 && res.data){
                    self.guideStepList = res.data;
                    self.currentStep = res.data[0];
                }
            });
        }
    }
</script>