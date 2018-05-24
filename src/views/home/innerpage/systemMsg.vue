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
    .right-box .up .name p span{
        color: #666;
    }
    .right-box .up .name p:first-child{
        color: #666;
    }
    .right-box .up .msg{
        color: #999;
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
            <span>系统消息</span>
        </div>
        <div class="box">
            <div>
                <img src="../../../resource/images/system-msg.png" alt="">
                <div class="right-box">
                    <div class="up">
                        <div class="name">
                            <p>系统通知</p>
                            <p>
                                <span>2018-03-01 10:10</span>
                            </p>
                        </div>
                        <div class="msg">您的订单75384251已完成。</div>
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

            };
        },
        methods: {

        }
    };
</script>