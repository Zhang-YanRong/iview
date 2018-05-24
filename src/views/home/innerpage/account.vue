<style scoped>
    * {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    body {
        background: #ededed;
    }
    main {
        width: 1200px;
        height: auto;
        margin: 0 auto;
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
        border: 1px solid #E6E6E6;
        border-bottom: 0px solid #E6E6E6;
        background:rgba(250,250,250,1);
        box-sizing: border-box;
    }

    .ivu-collapse{
        border: 1px solid #E6E6E6!important;
    }

    .listss > div.ivu-collapse > div.ivu-collapse-item > div.ivu-collapse-header{
        height: 80px;
        line-height: 80px;
        background: red!important;

    }

    .add > span {
        display: block;
        text-align: center;
        width: 100%;
        font-size: 18px;
        color: #666666;
        line-height: 59px;
    }

    .listss {
        width: 100%;
        height: auto;
        overflow: hidden;
        box-sizing: border-box;
    }

    .selfrow {
        margin-bottom: 20px;
        height: 32px;
        line-height: 32px;
    }

    .img{
        width: 200px;
        height: 200px;
        border: 1px solid #E6E6E6;
    }

    .photo{
        width: 170px;
        height: 170px;
        margin: 15px auto;
        background: pink;
    }

    .nav > a{
        display: block;
        text-decoration: none;
        width: 200px;
        text-align: center;
        line-height: 50px;
        float: left;
    }

    .tops_title{
        width: 1120px;
        height: 80px;
        background: #fff;
    }

    .ivu-collapse-item{
        background: #fff!important;
        width: 1120px!important;
        margin: 0 auto;
        box-sizing: border-box!important;
        border-color: #e5e5e5!important;
    }

    .ivu-collapse{
        background: #fff;
    }

    .ivu-radio-checked{
        background: #999999!important;
    }

    .saves{
        background: #EB1919!important;
        border: none!important;
    }

    .shouqi{
        font-size: 14px;
        float: right;
        position: relative;
    }

    .top_bot2{
        position: absolute;
        top: 36px;
        right: 2px;
    }

    .top_bot1{
        position: relative;
        top: -3px;
        right: 2px;
    }

    .ivu-icon-arrow-right-b{
        display: none;
    }

    .con_padd{
        padding-left: 60px;
    }

    .line_bot{
        width: 1200px;
        height: 42px;
        border: 1px solid #E6E6E6;
        border-top: 1px solid #fff;
        border-bottom: 0 solid #fff;
        padding-bottom: 1px;
        margin: 0 auto;
        position: relative;
        top: -1px;
        padding-left: 40px;
        padding-right: 40px;

    }
    .line_bot > div{
        width: 100%;
        height: 100%;
        border-top: 1px solid #e6e6e6;
    }
</style>


<template>
    <div>
        <div class="content">
            <main>
                <div class="add">
                    <span>账号设置</span>
                </div>
                <div class="listss">
                    <Collapse v-model="values">
                        <Panel name="a">
                            个人资料
                            <span class="shouqi">收起&#12288;<Icon class="top_bot1" type="ios-arrow-up"></Icon><Icon class="top_bot2" type="ios-arrow-up"></Icon></span>
                            <div slot="content" style="box-sizing: border-box;padding-left: 160px;padding-top: 10px;">
                                <div class="selfrow">
                                    当前昵称：<Input v-model="self.nickname" placeholder="Enter something..."
                                                style="width: 300px"></Input>
                                </div>
                                <div class="selfrow">
                                    真实姓名：<Input v-model="self.name" placeholder="Enter something..."
                                                style="width: 300px"></Input>
                                </div>
                                <div class="selfrow">
                                    用户性别：
                                    <RadioGroup v-model="self.sex">
                                        <Radio label="3"><span>男</span></Radio>
                                        <Radio label="2"><span>女</span></Radio>
                                        <Radio label="1"><span>保密</span></Radio>
                                    </RadioGroup>
                                </div>
                                <div class="selfrow">
                                    所在单位：<Input v-model="self.company" placeholder="Enter something..."
                                                style="width: 300px"></Input>
                                </div>
                                <div class="selfrow">
                                    个人职位：<Input v-model="self.position" placeholder="Enter something..."
                                                style="width: 300px"></Input>
                                </div>
                                <div class="selfrow" style="position: relative;">
                                    居住地址：
                                    <div style="width: 300px;position: absolute;top:0;left: 70px;">
                                        <Cascader :data="self.data" v-model="self.address" style="width: 300px"
                                        ></Cascader>
                                    </div>

                                </div>
                                <div>
                                    <span style="float: left">个性签名：</span><Input v-model="self.motto" type="textarea" :autosize="{minRows: 2,maxRows: 5}" style="width: 300px;" placeholder="Enter something..."></Input>
                                </div>
                                <div class="selfrow" style="margin-top: 20px;margin-left: 70px;">
                                    <Button type="primary" class="saves" @click="selfdata">保存</Button>
                                </div>
                            </div>
                        </Panel>
                        <Panel name="b">
                            头像
                            <span class="shouqi">收起&#12288;<Icon class="top_bot1" type="ios-arrow-up"></Icon><Icon class="top_bot2" type="ios-arrow-up"></Icon></span>
                            <div slot="content" style="box-sizing: border-box;padding-left: 220px;padding-top: 10px;padding-bottom: 10px;">
                                    <div class="img">
                                        <div class="photo" :style="{background:'url(' + photo + ')no-repeat center/cover' }"></div>
                                    </div>
                                <div @click="getToken">
                                <Upload  style="margin-top: 20px" action="https://upload-z1.qiniup.com/" :on-exceeded-size="MaxSize" :max-size="1024" :data="upLoadData" :show-upload-list="false" :before-upload="beforeUpload" :format="['jpg','jpeg','png','bmp','gif']" :on-format-error="uploadError" :on-success="uploadSucess">
                                        <Button type="ghost" icon="ios-cloud-upload-outline">上传头像</Button>
                                    </Upload>
                                </div>

                            </div>
                        </Panel>
                        <Panel name="c">
                            绑定手机
                            <span class="shouqi">收起&#12288;<Icon class="top_bot1" type="ios-arrow-up"></Icon><Icon class="top_bot2" type="ios-arrow-up"></Icon></span>
                            <div slot="content" style="box-sizing: border-box;padding-left: 160px;padding-top: 10px;">
                                <div class="selfrow">
                                    旧手机号：<Input v-model="phone.old" placeholder="Enter something..."
                                                style="width: 300px"></Input>
                                </div>
                                <div class="selfrow">
                                    新手机号：<Input v-model="phone.new" placeholder="Enter something..."
                                                style="width: 300px"></Input>
                                </div>
                                <div class="selfrow">
                                    &#12288;验证码：<Input v-model="phone.checkcode" placeholder="Enter something..."
                                                       style="width: 300px;margin-right: 10px"></Input><Button type="ghost" style="background:rgba(255,255,255,1)">发送</Button>
                                </div>
                                <div class="selfrow" style="margin-top: 20px;margin-left: 70px;">
                                    <Button type="primary" class="saves">保存</Button>
                                </div>
                            </div>
                        </Panel>
                        <Panel name="d">
                            个性网址
                            <span class="shouqi">收起&#12288;<Icon class="top_bot1" type="ios-arrow-up"></Icon><Icon class="top_bot2" type="ios-arrow-up"></Icon></span>
                            <div slot="content" style="box-sizing: border-box;padding-left: 160px;padding-top: 10px;">
                                <div class="selfrow">
                                    个性网址：<Input v-model="URL" placeholder="Enter something..."
                                                style="width: 300px"></Input>
                                </div>
                                <div class="selfrow" style="margin-top: 20px;margin-left: 70px;">
                                    <Button type="primary" class="saves">保存</Button>
                                </div>
                            </div>
                        </Panel>
                        <Panel name="e">
                            微信绑定
                            <span class="shouqi">收起&#12288;<Icon class="top_bot1" type="ios-arrow-up"></Icon><Icon class="top_bot2" type="ios-arrow-up"></Icon></span>
                            <div slot="content" style="box-sizing: border-box;padding-left: 160px;">
                                <div class="selfrow" style="height: auto">
                                    <img style="width: 36px;height: 36px;font-size: 0;display: block;float: left;margin-top: 5px;" src="../../../resource/images/wechat.png"  alt=""> <span style="line-height:24px;display: block;height: auto;width:610px;min-height: 56px;margin-left: 60px;">绑定第三方帐号，可以直接登录花瓣，还可以将花瓣内容同步到以下平台，与更多好友分享。如果当前帐号在对应站点处于登录状态，需退出登录后，才能重新绑定。</span>
                                </div>
                                <div class="selfrow" style="margin-top: -15px;margin-left: 60px;">
                                    <Button type="ghost">解触绑定</Button>
                                </div>
                            </div>
                        </Panel>
                        <Panel name="f">
                            隐私设置
                            <span class="shouqi">收起&#12288;<Icon class="top_bot1" type="ios-arrow-up"></Icon><Icon class="top_bot2" type="ios-arrow-up"></Icon></span>
                            <div slot="content" style="box-sizing: border-box;padding-left: 160px;padding-top: 10px;">
                                <div class="selfrow con_padd">
                                    <p>
                                        <Checkbox v-model="allow.allowShowdata">允许其他人看到我的资料</Checkbox>
                                    </p>
                                    <p>
                                        <Checkbox v-model="allow.allowShow">允许我的主页显示个人资料</Checkbox>
                                    </p>
                                </div>
                                <div class="selfrow" style="margin-top: 20px;margin-left: 60px;">
                                    <Button type="primary" class="saves" style="margin-top: 24px;">保存</Button>
                                </div>
                                <div style="width: 100%;height: 23px"></div>
                            </div>
                        </Panel>
                        <Panel name="g">
                            认证用户
                            <span class="shouqi">收起&#12288;<Icon class="top_bot1" type="ios-arrow-up"></Icon><Icon class="top_bot2" type="ios-arrow-up"></Icon></span>
                            <div slot="content" style="box-sizing: border-box;padding-left: 160px;padding-top: 10px;">
                                <div class="selfrow con_padd" >
                                    <Checkbox v-model="Certified">显示认证信息</Checkbox>
                                </div>
                                <div class="selfrow" style="margin-top: -10px;margin-left: 60px;">
                                    <Button type="primary" class="saves">保存</Button>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                    <div class="line_bot">
                        <div></div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'self',
        data() {
            return {
                values: ['a','b','c','d','e','f','g'],
                self: {
                    nickname: '',
                    name: '',
                    sex: '', //性别
                    company: '', //单位
                    position: '',//职位
                    address: [],//地址
                    motto: '',//个性签名
                    province_id:'',
                    area_id:'',
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
                            value: '陕西省',
                            label: '陕西省',
                            children: [
                                {
                                    value: '西安市',
                                    label: '西安市',
                                }
                            ]
                        }
                    ]
                },
                photo:'',
                phone:{
                    old:'',//旧号码
                    new:'',
                    checkcode:'',
                },
                URL:'www.wezchina.com',
                allow:{
                    allowShowdata:true,
                    allowShow:false,
                },
                Certified:true,
                upLoadData: {
                    'token': ''
                },
                cangetToken:true,
                parameter:parameter
            };
        },
        methods:{
            //上传之前
            beforeUpload(){
                this.$Message.loading('正在上传中...',60);

            },

            //上传成功
            uploadSucess: function (res,file,fileList) {
                console.log('成功上传-back',res,file,fileList);
                this.backImgFile = file;
                this.photo = this.parameter.upShow + file.response.key;
                console.log(this.photo)
                this.uploadImgname(file.response.key);
                this.$Message.destroy();
            },

            //头像图片名
            uploadImgname(name){
                console.log(name);
                var self = this;
                this.$axios.post('users/avatar',{'avatar':name}).then((res)=>{
                    this.$Message.success('上传成功！',0);
                });
            },

            //格式校验
            uploadError: function (file) {
                this.$Notice.warning({
                    title: '文件格式错误',
                    desc: '您所上传的文件 ' + file.name + ' 格式错误, 请选择 jpg , png , bmp , gif 或者 jpeg 格式的图片上传。'
                });
            },

            //大小校验
            MaxSize: function (file) {
                this.$Notice.warning({
                    title: '文件大小超出限制',
                    desc: '您所上传的文件  ' + file.name + ' 过大, 不能超过 1M.'
                });
            },

            //获取token
            getToken(){
                if(this.cangetToken){
                    var self = this;
                    self.cangetToken = false;
                    this.$axios.get('file/qiniu_token').then(function (res) {
                        if(res.status == 200 && res.data && res.data.uptoken){
                            self.upLoadData.token = res.data.uptoken;
                        }
                    });
                }
            },

            //个人资料保存
            selfdata(){
                var self = this;
                var send = {
                    'avatar': this.photo,
                    'real_name': this.self.name,
                    'nickname': this.self.nickname,
                    'phone': this.phone.old,
                    'sex': this.self.sex,
                    'motto': this.self.motto,
                    'province_id': this.self.province_id,
                    'area_id': this.self.area_id,
                    'company': this.self.company,
                    'position':this.self.position
                }
                this.$axios.post('users/updated/' + global.Storage.get(global.Param.userData).weid,send).then(function (res) {
                    if(res.code == 200 && res.data){
                        self.guideStepList = res.data;
                        self.currentStep = res.data[0];
                    }
                });
            },

            //初始数据
            selfInfo(id){
                var selfs = this;
                this.$axios.get('users/' + id).then(function (res) {
                    if(res.code == 200 && res.data){
                        var data = res.data;
                        console.log(data,121)
                        selfs.photo = selfs.parameter.upShow + '/' + data.avatar;
                        console.log(selfs.photo,222)
                        selfs.phone.old = data.phone;
                        selfs.self.nickname= data.nickname;
                        selfs.self.name= data.real_name;
                        selfs.self.company= data.company;
                        selfs.self.position= data.position;
                        selfs.self.sex= data.sex;
                        selfs.self.motto= data.motto;
                        selfs.self.area_id= data.area_id;
                        selfs.self.province_id= data.province_id;
                        selfs.province(data.province_id,data.area_id);
                    }
                });
            },

            //获取省
            province(id,sd){
                var selfs = this;
                this.$axios.get('province/list').then(function (res) {
                    if(res.code == 200 && res.data){
                        selfs.filter(id,res.data.list);
                        if(selfs.self.address.length == 1){
                            selfs.area(id,sd);
                        }
                    }
                });
            },
            //获取市
            area(id,sd){
                var selfs = this;
                this.$axios.get('area/list/' + id).then(function (res) {
                    if(res.code == 200 && res.data){
                        selfs.filter(sd,res.data.list);
                    }
                });
            },
            //对获取的地区进行筛选
            filter(id,data){
                data.forEach((v)=>{
                    if(v.id == id ){
                        this.self.address.push(v.name);
                        console.log(this.self.address)
                        return false;
                    }
                });
            }

        },

        mounted(){
            this.$nextTick(()=>{
                console.log(parameter);
                var dom = document.querySelectorAll('.ivu-collapse-header');
                dom.forEach((v)=>{
                    v.style.height = '80px';
                    v.style.width = '1120px';
                    v.style.background = '#fff';
                    v.style.borderBottom = '1px dashed #E6E6E6';
                    v.style.margin = '0 auto';
                    v.style.fontSize = '16px';
                    v.style.lineHeight = '80px';
                    v.style.color = '#999999';
                    v.style.padding = '0 30px';
                });
                var self = this;
                this.$axios.get('cert/realName/detail').then(function (res) {
                    if(res.code == 200 && res.data){
                        self.selfInfo(res.data.plat_user_id);
                    }
                });
            });
        }
    };
</script>

