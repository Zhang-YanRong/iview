<style scoped>
    .reward-art .title{
        height:60px;
        line-height: 60px;
        padding-left: 30px;
        background-color: #fafafa;
        border-bottom: 1px solid #e6e6e6;
        font-size: 18px;
        color: #666666;
    }
    .reward-art .flow-box{
        padding-top: 40px;
        padding-left: 40px;
        padding-bottom: 0;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .reward-art .flow-box .col-item{
        width: 250px;
        flex: none;
        margin-bottom: 35px;
        margin-right: 40px;
    }
    .reward-art .flow-box .col-item>img{
        width: 250px;
        height: 180px;
        display: block;
    }
    .reward-art .flow-box .col-item>p{
        height: 44px;
        line-height:44px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #e6e6e6;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 15px;
    }
    .reward-art .flow-box .col-item>div{
        padding: 0 15px;
        height: 50px;
        line-height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #f5f5f5;
    }
    .reward-art .flow-box .col-item>div .left img{
        width: 30px;
        height: 30px;
        margin-right: 10px;
        vertical-align: middle;
        border-radius: 50%;
    }
    .reward-art .flow-box .col-item>div .left span{
        color: #666666;
        vertical-align: middle;
    }
    .reward-art .flow-box .col-item>div .right span{
        display: inline-block;
        padding-left: 22px;
        background: url("../../../resource/images/body-bg.jpg") no-repeat left center;
        background-size: 12px 14px;
    }
    .pagination{
        padding-top: 15px;
        padding-bottom: 50px;
        text-align: center;
    }
</style>
<template>
    <div class="reward-art">
        <div class="title">
            <span>打赏文章</span>
        </div>
        <div class="flow-box">
            <div class="col-item">
                <img src="../../../resource/images/body-bg.jpg" alt="">
                <p>互联网产业的梦想和自我突破</p>
                <div>
                    <div class="left">
                        <img src="../../../resource/images/body-bg.jpg" alt="">
                        <span>张朝阳</span>
                    </div>
                    <div class="right">
                        <span>已打赏</span>
                    </div>
                </div>
            </div>
            <div class="col-item">
                <img src="../../../resource/images/body-bg.jpg" alt="">
                <p>互联网产业的梦想和自我突破</p>
                <div>
                    <div class="left">
                        <img src="../../../resource/images/body-bg.jpg" alt="">
                        <span>张朝阳</span>
                    </div>
                    <div class="right">
                        <span>已打赏</span>
                    </div>
                </div>
            </div>
            <div class="col-item">
                <img src="../../../resource/images/body-bg.jpg" alt="">
                <p>互联网产业的梦想和自我突破</p>
                <div>
                    <div class="left">
                        <img src="../../../resource/images/body-bg.jpg" alt="">
                        <span>张朝阳</span>
                    </div>
                    <div class="right">
                        <span>已打赏</span>
                    </div>
                </div>
            </div>
            <div class="col-item">
                <img src="../../../resource/images/body-bg.jpg" alt="">
                <p>互联网产业的梦想和自我突破</p>
                <div>
                    <div class="left">
                        <img src="../../../resource/images/body-bg.jpg" alt="">
                        <span>张朝阳</span>
                    </div>
                    <div class="right">
                        <span>已打赏</span>
                    </div>
                </div>
            </div>
            <div class="col-item">
                <img src="../../../resource/images/body-bg.jpg" alt="">
                <p>互联网产业的梦想和自我突破</p>
                <div>
                    <div class="left">
                        <img src="../../../resource/images/body-bg.jpg" alt="">
                        <span>张朝阳</span>
                    </div>
                    <div class="right">
                        <span>已打赏</span>
                    </div>
                </div>
            </div>
            <div class="col-item">
                <img src="../../../resource/images/body-bg.jpg" alt="">
                <p>互联网产业的梦想和自我突破</p>
                <div>
                    <div class="left">
                        <img src="../../../resource/images/body-bg.jpg" alt="">
                        <span>张朝阳</span>
                    </div>
                    <div class="right">
                        <span>已打赏</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination">
            <Page :total="100"></Page>
        </div>
    </div>
</template>
<script>
    export default {

    };
</script>