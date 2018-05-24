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
    .box{
        padding: 0 60px;
    }
    .box>div{
        margin-top: 30px;
        display: flex;
        align-items: flex-start;
    }
    .box>div>img{
        width: 90px;
        height: 90px;
        flex: none;
        margin-right: 20px;
    }
    .right-box{
        width: 100%;
    }
    .right-box .up{
        height: 90px;
        background: #fafafa;
        border: 1px solid #e5e5e5;
        padding: 20px 30px;
        font-size: 14px;
    }

    .right-box .up .name{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .right-box .up .name p:first-child{
        color: #333;
    }
    .right-box .up .name p:last-child span{
        color: #666;
    }
    .toggle-panel-icon{
        width: 10px;
        height: 11px;
        background: url("../../../resource/images/arrow-down.png") no-repeat center center;
        display: inline-block;
        padding: 0 20px;
        vertical-align: middle;
    }
    .toggle-panel-icon.toggle-panel-icon-up{
        background: url("../../../resource/images/arrow-up.png") no-repeat center center;
    }
    .right-box .up .msg{
        color: #999;
    }
    .chat-box{
        height: 265px;
        border: 1px solid #e5e5e5;
    }
    .chat-panel{
        background: #ededed;
        padding: 30px 30px 46px;
    }
    .chat-panel Input{
        height: 40px;
        margin-bottom: 10px;
    }
    .icon-send{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .icon-send div img:first-child{
        width: 21px;
        height: 21px;
        margin-right: 10px;
        vertical-align: middle;
    }
    .icon-send div img:last-child{
        width: 19px;
        height: 22px;
        vertical-align: middle;
    }
    .box .ivu-page{
        padding: 50px 0;
        text-align: center;
        border-top: none;
    }
</style>
<template>
    <div>
        <div class="title">
            <span>我的私信</span>
        </div>
        <div class="box">
            <div>
                <img src="../../../resource/images/body-bg.jpg" alt="">
                <div class="right-box">
                    <div class="up">
                        <div class="name">
                            <p>abc人名</p>
                            <p>
                                <span>2018-03-01</span>
                                <span class="toggle-panel-icon" :class="{'toggle-panel-icon-up' : showBox}" @click="toggleBox"></span>
                            </p>
                        </div>
                        <div class="msg">下午一起吃饭</div>
                    </div>
                    <div class="down" v-show="showBox">
                        <div class="chat-box"></div>
                        <div class="chat-panel">
                            <Input v-model="msg"></Input>
                            <div class="icon-send">
                                <div>
                                    <img src="../../../resource/images/emoji-icon.png" alt="">
                                    <img src="../../../resource/images/img-icon.png" alt="">
                                </div>
                                <Button type="warning">发送</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Page :total="100"></Page>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                msg: '',
                showBox: false
            };
        },
        methods: {
            toggleBox: function () {
                this.showBox = !this.showBox;
            }
        }
    };
</script>