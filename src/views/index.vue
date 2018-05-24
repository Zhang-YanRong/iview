<style scoped>
    .header {
        width: 100%;
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        font-size: 14px;
        color: #333333;
    }

    .header > div {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .header > div > div {
        display: flex;
        align-items: center;
    }

    .header .user img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: block;
        margin-right: 10px;
    }

    .header .user span {
        font-size: 12px;
    }

    .header .nav span {
        display: block;
        padding: 0 40px;
    }

    .footer {
        height: 280px;
        width: 100%;
        background-color: #fafafa;
        padding-top: 45px;
        margin-top: 20px;
    }

    .footer p {
        text-align: center;
        font-size: 14px;
        color: #808080;
        line-height: 30px;
    }

    .footer img {
        width: 52px;
        height: 56px;
        margin: 20px auto 0;
        display: block;
    }
    .homepage ul{
        margin: 0;
        padding: 0;
        position: absolute;
        left: -130px;
        top: 0;
    }
    .homepage{
        width: 1200px;
        margin: auto;
        background-color: #fff;
        margin-top: 20px;
        box-sizing: border-box;
        font-size: 14px;
        color: #333333;
        position: relative;
    }
    .homepage ul li{
        width: 90px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #b3b3b3;
        margin-bottom: 14px;
        background-color: #fff;
        border: 1px solid #d9d9d9;
    }
    .homepage ul li.active{
        background-color: #009AFE;
        color: #fff;
        border: 1px solid #e5e5e5;
    }
</style>
<template>
    <div>
        <div class="header">
            <div>
                <div @click="goHome">
                    <img src="../resource/images/LOGO.png" alt="">
                </div>
                <div class="nav">
                    <span>文章</span>
                    <span>活动</span>
                    <span>商城</span>
                    <span>圈子</span>
                </div>
                <div class="user">
                    <img src="../resource/images/body-bg.jpg" alt="">
                    <span>用户中心</span>
                </div>
            </div>
        </div>
        <div class="homepage">
            <ul v-if="showNav">
                <li class="active">我的文章</li>
                <li>我的活动</li>
                <li>我的商城</li>
                <li>我的圈子</li>
                <li>用户中心</li>
                <li>我的钱包</li>
            </ul>
            <router-view></router-view>
        </div>
        <div class="footer">
            <p>咨询与建议 站点地图 联系我们</p>
            <p>全球秦商大会组委会 陕西省秦商联合会 | 地址：西安市新城大院省政府院内综合楼B101 邮编：710006</p>
            <p>办公电话：029-87298395 87298138 | 传真：029-87298138 | 电子邮件: sxsqslhh@163.com</p>
            <p>版权所有 陕西省秦商联合会 | 网站备案信息：陕ICP备17021746号</p>
            <img src="../resource/images/emblem.png" alt="">
        </div>
    </div>
</template>
<script>
    export default {
        data() {
          return {
              showNav: true
          };
        },
        methods: {
            goHome: function () {
                this.$router.push({name:'user_index'});
            }
        },
        beforeRouteUpdate (to, from, next) {
            if(to.name === 'user_index'){
                this.showNav = false;
            }else{
                this.showNav = true;
            }
            next();
        },
        mounted() {
            this.$nextTick(() => {
                if(this.$route.name === 'user_index'){
                    this.showNav = false;
                }
            });
        },
    };
</script>