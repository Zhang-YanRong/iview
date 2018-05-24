<style scoped>
    *{
        padding: 0;
        margin: 0;
        list-style: none;
    }
    body{
        background: #ededed;
    }
    .top{
        width: 100%;
        height: 50px;
        background: #fff;
    }
    main{
        width: 1200px;
        height: auto;
        margin: 0 auto;
    }
    .top > main{
        box-sizing: border-box;
        height: 100%;
        border-bottom: 1px solid #dedede;
        background: pink;
    }
    .content{
        width: 100%;
        height: auto;
        margin-top: 19px;
        overflow: hidden;
    }
    .add{
        width: 100%;
        height: 59px;
        border-top: 1px solid #dedede;
        border-right: 1px solid #dedede;
        border-left: 1px solid #dedede;
        background: #fff;
        box-sizing: border-box;
    }
    .add > span{
        font-size: 18px;
        color: #666666;
        line-height: 59px;
        margin-left: 20px;
    }
    .edict {
        line-height: 30px;
    }
    .name{
        margin-bottom: 20px!important;
    }

    .nav > a{
        display: block;
        text-decoration: none;
        width: 200px;
        text-align: center;
        line-height: 50px;
        float: left;
    }
    .rowstyle{
        width: 340px;
        height: 32px;
        margin: 0 auto 20px;
    }
    .rowstyle > span{
        float: left;
        line-height: 32px;
    }
    .rowstyle > div{
        float: left;
    }
</style>
<template>
    <div>
        <div class="content">
            <main>
                <div class="add">
                    <span>收货地址</span>
                    <span @click="adds" style="float: right;margin-right: 20px;"><Icon type="android-add"></Icon>&nbsp;添加地址</span>
                </div>
                <Table border :columns="columns" :data="dataList"></Table>
            </main>
        </div>
        <Modal title="添加收货地址：" v-model="add" @on-ok="save" @on-cancel="cancle" class-name="vertical-center-modal">
            <div class="rowstyle">
                <span>姓名:&#12288;</span><Input v-model="newList.name" placeholder="请输入收件人姓名" style="width: 300px"></Input>
            </div>
            <div class="rowstyle">
                <span>省市:&#12288;</span><div><Cascader :data="data" v-model="newList.add" style="width: 300px"></Cascader></div>
            </div>
            <div class="rowstyle">
                <span>街道:&#12288;</span><Input v-model="newList.detail" placeholder="请输入街道地址" style="width: 300px"></Input>
            </div>
            <div class="rowstyle">
                <span>电话:&#12288;</span><Input v-model="newList.telophone" placeholder="请输入收件人电话" style="width: 300px"></Input>
            </div>
            <div class="rowstyle">
                <span>邮编:&#12288;</span><Input v-model="newList.zipcode" placeholder="请输入收件地区邮编" style="width: 300px"></Input>
            </div>
        </Modal>
        <Modal title="修改收货地址：" v-model="edict" @on-ok="edictUpdate(edictIndex,edictweid)" class-name="vertical-center-modal">
            <div class="rowstyle">
                <span>姓名:&#12288;</span><Input v-model="oldList.name" placeholder="姓名" style="width: 300px"></Input>
            </div>
            <div class="rowstyle">
                <span>省市:&#12288;</span>
                <div><Cascader :data="data" v-model="oldList.add" style="width: 300px"></Cascader></div>
            </div>
            <div class="rowstyle">
                <span>街道:&#12288;</span><Input v-model="oldList.detail" placeholder="街道" style="width: 300px"></Input>
            </div>
            <div class="rowstyle">
                <span>电话:&#12288;</span><Input v-model="oldList.telophone" placeholder="电话" style="width: 300px"></Input>
            </div>
            <div class="rowstyle">
                <span>邮编:&#12288;</span><Input v-model="oldList.zipcode" placeholder="邮编" style="width: 300px"></Input>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        name: 'index',
        data(){
            return{
                columns: [
                    {
                        title: '姓名',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '地址',
                        key: 'detail' //addresse
                    },
                    {
                        title: '手机',
                        key: 'telophone'
                    },
                    {
                        title: '邮编',
                        key: 'zipcode'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index,params);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index,params.row.weid);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                edict:false,
                edictIndex:'',
                edictweid:'',
                add:false,
                dataList: [
                    {
                        name: '张朝阳',
                        add:['陕西','西安'],
                        detail: '陕西省西安市高新区领海大厦1500',
                        telophone: '1314112441',
                        zipcode:'70000'
                    },
                ],
                newList: {
                    name: '',
                    add:['山西','运城'],
                    detail: '',
                    telophone: '',
                    zipcode:''
                },
                oldList: {
                    name: '',
                    add:['山西','运城'],
                    detail: '',
                    telophone: '',
                    zipcode:''
                },
                data: [
                    {
                        value: 'beijing',
                        label: '北京',
                        children: [
                            {
                                value: 'gugong',
                                label: '故宫'
                            },
                            {
                                value: 'tiantan',
                                label: '天坛'
                            },
                            {
                                value: 'wangfujing',
                                label: '王府井'
                            }
                        ]
                    },
                    {
                        value: '陕西',
                        label: '陕西',
                        children: [
                            {
                                value: '西安',
                                label: '西安',
                            }
                        ]
                    },
                    {
                        value: '山西',
                        label: '山西',
                        children: [
                            {
                                value: '运城',
                                label: '运城',
                            }
                        ]
                    }
                ]
            };
        },
        methods: {
            show(index){
                this.edict = true;
                this.oldList = this.dataList[index];
                this.edictweid = this.oldList.weid;
                this.edictIndex = index;
            },
            adds(){
                this.add = true;
                this.inItnewList();
            },
            //取消
            cancle(){
                this.inItnewList();
            },
            //校验
            check(data){
                if(data.name == ''){
                    this.$Notice.warning({desc:'姓名不能为空'});
                    return false;
                }else if(data.telophone == ''){
                    this.$Notice.warning({desc:'电话不能为空'});
                    return false;
                }else if(data.telophone.length != 11 && !(/^1[34578]\d{9}$/.test(this.newList.telophone))){
                    this.$Notice.warning({desc:'电话号码格式错误'});
                    return false;
                }else if(data.zipcode == ''){
                    this.$Notice.warning({desc:'邮编不能为空'});
                    return false;
                }
                //少地址不能为空校验
            },
            //保存
            save(){
                if(this.check(this.newList) == false){
                    this.adrlist();
                    return;
                }
                var data = {
                    name: this.newList.name,
                    province_id: 27,
                    area_id: 28,
                    county_id: 29,
                    detail: this.newList.detail,
                    telophone: this.newList.telophone,
                    zipcode: this.newList.zipcode,
                };
                var self = this;
                this.$axios.post('users/address/store',data).then(function (res) {
                    if(res.code == 200 && res.data){
                        self.adrlist();
                        self.inItnewList();
                        self.$Message.info('地址添加成功');
                    }
                });
            },

            //初始化 newList
            inItnewList(){
                this.newList.name = '';
                this.newList.add = ['山西','运城'];
                this.newList.detail = '';
                this.newList.telophone = '';
                this.newList.zipcode = '';
            },

            //修改
            edictUpdate(index,weid){
                if(this.check(this.oldList) == false){
                    this.adrlist();
                    return;
                }
                this.dataList[index] = this.oldList;
                var data = {
                    weid:weid,
                    name: this.oldList.name,
                    province_id: 27,
                    area_id: 28,
                    county_id: 29,
                    detail: this.oldList.detail,
                    telophone: this.oldList.telophone,
                    zipcode: this.oldList.zipcode,
                    status:2,
                };
                var self = this;
                this.$axios.post('users/address/update',data).then(function (res) {
                    if(res.code == 200 && res.data){
                        self.adrlist();
                        self.edictIndex = '';
                        self.$Message.info('地址修改成功');
                    }
                });
            },
            //删除
            remove (index,weid) {
                this.dataList.splice(index, 1);
                var self = this;
                this.$axios.get('users/address/destroy/' + weid).then(function (res) {
                    if(res.code == 200 && res.data){
                        self.$Message.info('数据删除成功');
                    }
                });
            },
            //地址列表
            adrlist(){
                var self = this;
                this.$axios.get('users/address/list').then(function (res) {
                    if(res.code == 200 && res.data){
                        self.dataList = res.data.list;
                        console.log(res.data.list);
                    }
                });
            },

        },
        mounted(){
            this.$nextTick(()=>{
                this.adrlist();
            });

        }
    };
</script>

