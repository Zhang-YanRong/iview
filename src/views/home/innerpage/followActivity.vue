<template>
    <div>
        <div class="content">
            <main>
                <div class="add">
                    <span>关注活动</span>
                </div>
                <div class="list">
                    <ul>
                        <li v-for="item in dataList">
                            <div class="img" :style="{background: 'url('+ parameter.upShow + item.cover + ') no-repeat center/cover' }">
                                <a :href="parameter.httpdomain + item.domain + '/activity/' + item.activity_id"></a>
                            </div>
                            <div class="con">
                                <p class="text">{{item.title}}</p>
                                <p>{{item.begain_time}}&nbsp;&nbsp;开始 <span @click="noCare(item.weid)"><Icon type="star"></Icon>&nbsp;已关注</span></p>
                            </div>
                        </li>
                    </ul>
                    <div class="page">
                        <Page :total="inIt.total" :current="inIt.page" :page-size="inIt.limit" @on-change="everyList" show-total></Page>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'active',
        data(){
            return{
                parameter:parameter,
                inIt:{
                    page:1,
                    limit:8,
                    total:0
                },
                dataList:[
                    {
                        cover:'',
                        title:'',
                        time1:'本周五',
                        time2:'12：30'
                    },
                    // {
                    //     imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525691324426&di=ec4d3b3bda2f9f38bd3fbf58f67d9d16&imgtype=0&src=http%3A%2F%2Fpic73.nipic.com%2Ffile%2F20150720%2F5554109_140503997000_2.jpg',
                    //     title:'破局者-2018运营增长变化现峰会,盛大召开',
                    //     time1:'本周五',
                    //     time2:'12：30'
                    // },
                    // {
                    //     imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525691324426&di=ec4d3b3bda2f9f38bd3fbf58f67d9d16&imgtype=0&src=http%3A%2F%2Fpic73.nipic.com%2Ffile%2F20150720%2F5554109_140503997000_2.jpg',
                    //     title:'破局者-2018运营增长变化现峰会,盛大召开',
                    //     time1:'本周五',
                    //     time2:'12：30'
                    // },
                    // {
                    //     imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525691324426&di=ec4d3b3bda2f9f38bd3fbf58f67d9d16&imgtype=0&src=http%3A%2F%2Fpic73.nipic.com%2Ffile%2F20150720%2F5554109_140503997000_2.jpg',
                    //     title:'破局者-2018运营增长变化现峰会,盛大召开',
                    //     time1:'本周五',
                    //     time2:'12：30'
                    // },
                    // {
                    //     imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525691324426&di=ec4d3b3bda2f9f38bd3fbf58f67d9d16&imgtype=0&src=http%3A%2F%2Fpic73.nipic.com%2Ffile%2F20150720%2F5554109_140503997000_2.jpg',
                    //     title:'破局者-2018运营增长变化现峰会,盛大召开',
                    //     time1:'本周五',
                    //     time2:'12：30'
                    // },
                    // {
                    //     imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525691324426&di=ec4d3b3bda2f9f38bd3fbf58f67d9d16&imgtype=0&src=http%3A%2F%2Fpic73.nipic.com%2Ffile%2F20150720%2F5554109_140503997000_2.jpg',
                    //     title:'破局者-2018运营增长变化现峰会,盛大召开',
                    //     time1:'本周五',
                    //     time2:'12：30'
                    // },
                    // {
                    //     imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525691324426&di=ec4d3b3bda2f9f38bd3fbf58f67d9d16&imgtype=0&src=http%3A%2F%2Fpic73.nipic.com%2Ffile%2F20150720%2F5554109_140503997000_2.jpg',
                    //     title:'破局者-2018运营增长变化现峰会,盛大召开',
                    //     time1:'本周五',
                    //     time2:'12：30'
                    // },
                    // {
                    //     imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525691324426&di=ec4d3b3bda2f9f38bd3fbf58f67d9d16&imgtype=0&src=http%3A%2F%2Fpic73.nipic.com%2Ffile%2F20150720%2F5554109_140503997000_2.jpg',
                    //     title:'破局者-2018运营增长变化现峰会,盛大召开',
                    //     time1:'本周五',
                    //     time2:'12：30'
                    // }

                ],

            };
        },
        methods:{
            //我的活动列表
            activeList(){
                var self = this;
                var data = {
                    'page':self.inIt.page,
                    'limit':self.inIt.limit
                };
                this.$axios.post('activity/collection/lists',data).then(function (res) {
                    if(res.code == 200 && res.data){
                        self.dataList = res.data.list;
                        self.inIt.total = res.data.total;
                        console.log(res.data,res.data.total,111);

                    }
                });
            },
            //取消关注
            noCare(weid){
                var self = this;
                this.$axios.get('activity/collection/destroy/' + weid).then(function (res) {
                    if(res.code == 200 && res.data){
                        self.activeList();
                        self.$Message.success('已取消关注！');
                    }
                });
            },
            //分页
            everyList(res){
                this.inIt.page = res;
                this.activeList();
            }
        },
        mounted(){
            this.$nextTick(()=>{
                console.log(this.parameter);
                this.activeList();
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

    .list{
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 34px 39px;
        background: #fff;
        border-right: 1px solid #dedede;
        border-left: 1px solid #dedede;
        border-bottom: 1px solid #dedede;
        overflow: hidden;
    }

    .list > ul{
        width: 100%;
        height: auto;
        overflow: hidden;
    }

    .list > ul > li{
        width: 250px;
        height: 230px;
        background: #f5f5f5;
        float: left;
        margin-right: 40px;
        margin-bottom: 35px;
    }

    .list > ul > li:nth-of-type(4n){
        margin-right: 0;
    }
    /*.list > ul > li:nth-last-of-type(1),.list > ul > li:nth-last-of-type(2),.list > ul > li:nth-last-of-type(3),.list > ul > li:nth-last-of-type(4){*/
        /*margin-bottom: 0;*/
    /*}*/
    .page{
        width: 100%;
        height: 34px;
        margin-top: 35px;
    }
    .ivu-page {
        border-top: 0 solid #E6E6E6;
    }
    .img{
        width: 250px;
        height: 160px;
        display: block;
    }

    .img > a {
        display: block;
        width: 100%;
        height: 100%;
    }

    .con{
        width: 100%;
        height: 70px;
        box-sizing: border-box;
        padding: 14px;
    }

    .con > p{
        font-size: 14px;
        line-height: 14px;
        color: #989898;
    }

    .con > p:nth-of-type(1){
        margin-bottom: 13px;
        color: #4d4d4d;
    }

    .con > p > span{
        float: right;
    }

    .text{
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }

    .nav > a{
        display: block;
        text-decoration: none;
        width: 200px;
        text-align: center;
        line-height: 50px;
        float: left;
    }
</style>