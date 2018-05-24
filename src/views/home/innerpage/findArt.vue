<style scoped>
    .find-art .title{
        height:60px;
        line-height: 60px;
        padding-left: 30px;
        background-color: #fafafa;
        border-bottom: 1px solid #e6e6e6;
        font-size: 18px;
        color: #666666;
    }
    .find-art .flow-box{
        padding-top: 40px;
        padding-left: 40px;
        padding-bottom: 0;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .find-art .flow-box .col-item{
        width: 250px;
        flex: none;
        margin-bottom: 35px;
        margin-right: 40px;
    }
    .find-art .flow-box .col-item>img{
        width: 250px;
        height: 180px;
        display: block;
    }
    .find-art .flow-box .col-item>p{
        padding: 15px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #e6e6e6;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .find-art .flow-box .col-item>p span:first-child{
        white-space: nowrap;
        display: inline-block;
        color: #333333;
        margin-bottom: 6px;
    }
    .find-art .flow-box .col-item>p span:last-child{
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        color: #999999;
    }
    .find-art .flow-box .col-item>div{
        padding: 0 15px;
        height: 50px;
        line-height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #f5f5f5;
    }
    .find-art .flow-box .col-item>div .left img{
        width: 30px;
        height: 30px;
        margin-right: 10px;
        vertical-align: middle;
        border-radius: 50%;
    }
    .find-art .flow-box .col-item>div .left span{
        color: #666666;
        vertical-align: middle;
    }
    .find-art .flow-box .col-item>div .right span{
       color: #999999
    }
    .pagination{
        padding-top: 15px;
        padding-bottom: 50px;
        text-align: center;
    }
</style>
<template>
    <div class="find-art">
        <div class="title">
            <span>发现文章</span>
        </div>
        <div class="flow-box">
            <div class="col-item">
                <img src="../../../resource/images/body-bg.jpg" alt="">
                <p>
                    <span>互联网产业的梦想和自我突破</span>
                    <span>12月17日上午，2011陕西省互联网大会在西安市高新区</span>
                </p>
                <div>
                    <div class="left">
                        <img src="../../../resource/images/body-bg.jpg" alt="">
                        <span>张朝阳</span>
                    </div>
                    <div class="right">
                        <span>21分钟前</span>
                    </div>
                </div>
            </div>
            <div class="col-item">
                <img src="../../../resource/images/body-bg.jpg" alt="">
                <p>
                    <span>互联网产业的梦想和自我突破</span>
                    <span>12月17日上午，2011陕西省互联网大会在西安市高新区</span>
                </p>
                <div>
                    <div class="left">
                        <img src="../../../resource/images/body-bg.jpg" alt="">
                        <span>张朝阳</span>
                    </div>
                    <div class="right">
                        <span>21分钟前</span>
                    </div>
                </div>
            </div>
            <div class="col-item">
                <img src="../../../resource/images/body-bg.jpg" alt="">
                <p>
                    <span>互联网产业的梦想和自我突破</span>
                    <span>12月17日上午，2011陕西省互联网大会在西安市高新区</span>
                </p>
                <div>
                    <div class="left">
                        <img src="../../../resource/images/body-bg.jpg" alt="">
                        <span>张朝阳</span>
                    </div>
                    <div class="right">
                        <span>21分钟前</span>
                    </div>
                </div>
            </div>
            <div class="col-item">
                <img src="../../../resource/images/body-bg.jpg" alt="">
                <p>
                    <span>互联网产业的梦想和自我突破</span>
                    <span>12月17日上午，2011陕西省互联网大会在西安市高新区</span>
                </p>
                <div>
                    <div class="left">
                        <img src="../../../resource/images/body-bg.jpg" alt="">
                        <span>张朝阳</span>
                    </div>
                    <div class="right">
                        <span>21分钟前</span>
                    </div>
                </div>
            </div>
            <div class="col-item">
                <img src="../../../resource/images/body-bg.jpg" alt="">
                <p>
                    <span>互联网产业的梦想和自我突破</span>
                    <span>12月17日上午，2011陕西省互联网大会在西安市高新区</span>
                </p>
                <div>
                    <div class="left">
                        <img src="../../../resource/images/body-bg.jpg" alt="">
                        <span>张朝阳</span>
                    </div>
                    <div class="right">
                        <span>21分钟前</span>
                    </div>
                </div>
            </div>
            <div class="col-item">
                <img src="../../../resource/images/body-bg.jpg" alt="">
                <p>
                    <span>互联网产业的梦想和自我突破</span>
                    <span>12月17日上午，2011陕西省互联网大会在西安市高新区</span>
                </p>
                <div>
                    <div class="left">
                        <img src="../../../resource/images/body-bg.jpg" alt="">
                        <span>张朝阳</span>
                    </div>
                    <div class="right">
                        <span>21分钟前</span>
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