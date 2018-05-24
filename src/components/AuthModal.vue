<style scoped>
    .modal_auth .modal_form>div{
        margin-bottom: 20px;
    }
    .modal_auth .modal_form div:last-child{
        margin-bottom: 0;
    }
    .modal_auth .modal_form>div>label{
        margin-bottom: 14px;
        font-size: 14px;
        color: #333;
        display: block;
    }
    .modal_auth .upload_img{
        width: 200px;
        height: 125px;
        display: block;
        padding: 5px;
        border: 1px solid #DDDEE1;
        border-radius: 8px;
    }
    .modal_auth .upload_tip{
        font-size: 12px;
        color: #b3b3b3;
        line-height: 18px;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>
<template>
    <div class="modal_auth">

        <div v-if="showForm" class="modal_form">
            <div>
                <label>身份证姓名</label>
                <Input v-model="name" type="text" placeholder="请输入身份证姓名" style="width: 280px"></Input>
            </div>
            <div>
                <label>身份证号码</label>
                <Input v-model="card_id" placeholder="请输入身份证号码" style="width: 280px"></Input>
            </div>
            <div>
                <label>身份证正面</label>
                <!--有异步请求的操作不能放到 before-upload 属性方法中-->
                <Upload ref="upload" action="https://upload-z1.qiniup.com/" :max-size="5120" :show-upload-list="false" :format="['jpg','jpeg','png','bmp','gif']" :on-format-error="handleFormatError" :on-success="handleFrontSucess" :on-exceeded-size="handleMaxSize" :data="upLoadData">
                    <div @click="handleBeforeUpload">

                        <img class="upload_img" v-if="!frontImgFile.url" src="../resource/images/frontcard.png" alt="">
                        <div v-else>
                            <img class="upload_img" :src="parameter.upShow + frontImgFile.url" alt="">
                        </div>

                    </div>
                </Upload>
                <span class="upload_tip">请提交中华人民共和国居民身份证，无居民身份证的内地居民可提交《临时居民身份证》。格式要求：支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过5M。</span>
            </div>
            <div>
                <label>身份证背面</label>
                <!--有异步请求的操作不能放到 before-upload 属性方法中-->
                <Upload ref="upload" action="https://upload-z1.qiniup.com/" :max-size="5120" :show-upload-list="false" :format="['jpg','jpeg','png','bmp','gif']" :on-format-error="handleFormatError" :on-success="handleBackSucess" :on-exceeded-size="handleMaxSize" :data="upLoadData">
                    <div @click="handleBeforeUpload">

                        <img class="upload_img" v-if="!backImgFile.url" src="../resource/images/backcard.png" alt="">
                        <div v-else>
                            <img class="upload_img" :src="parameter.upShow + backImgFile.url" alt="">
                        </div>

                    </div>
                </Upload>
                <span class="upload_tip">请提交中华人民共和国居民身份证，无居民身份证的内地居民可提交《临时居民身份证》。格式要求：支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过5M。</span>
            </div>
        </div>
        <div v-if="isPass">实名认证已通过</div>
        <div v-if="notOpen">该功能暂未开通</div>
        <div v-if="isVerify">实名认证审核中，请耐心等待...</div>
        <div v-if="showLoading">
            <Spin>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                showLoading: false,
                weid: '',
                isVerify: false,
                notOpen: false,
                isPass: false,
                showForm: false,
                upLoadData: {
                    'token': ''
                },
                frontImgFile: {},
                backImgFile: {},
                parameter: parameter,
                name: '',
                card_id: '',
            };
        },
        methods: {
            next: function (type) {

                if(!this.frontImgFile.url || !this.backImgFile.url || !this.name || !this.card_id){
                    this.$Modal.warning({
                        title: '提示',
                        content: '请完善相关信息！'
                    });
                    return;
                }
                if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.card_id)){
                    this.$Modal.warning({
                        title: '提示',
                        content: '身份证信息不合法！'
                    });
                    return;
                }
                let sendData = {
                    card_front: this.frontImgFile.url,
                    card_back: this.backImgFile.url,
                    name: this.name,
                    card_id: this.card_id
                };

                if(type === '修改'){
                    sendData.weid = this.weid;
                    this.$axios.post('cert/realName/update',sendData).then((res) => {
                        if(res.code == 200){
                            this.certProcess();
                        }
                    });
                }else{
                    this.$axios.post('cert/realName',sendData).then((res) => {
                        if(res.code == 200){
                            this.certProcess();
                        }
                    });
                }

            },
            handleFormatError: function (file) {
                this.$Notice.warning({
                    title: '文件格式错误',
                    desc: '您所上传的文件 ' + file.name + ' 格式错误, 请选择 jpg , png , bmp , gif 或者 jpeg 格式的图片上传。'
                });
            },
            handleMaxSize: function (file) {
                this.$Notice.warning({
                    title: '文件大小超出限制',
                    desc: '您所上传的文件  ' + file.name + ' 过大, 不能超过 5M.'
                });
            },
            handleBeforeUpload: function () {
                var self = this;
                this.$axios.get('file/qiniu_token').then(function (res) {
                    if(res.status == 200 && res.data && res.data.uptoken){
                        self.upLoadData.token = res.data.uptoken;
                    }
                });
            },
            handleFrontSucess:function (res,file,fileList) {
                console.log('成功上传-front');
                console.log('res,file,fileList', res,file,fileList);
                this.frontImgFile = file;
                this.frontImgFile.url = file.response.key;
            },
            handleBackSucess: function (res,file,fileList) {
                console.log('成功上传-back');
                console.log('res,file,fileList', res,file,fileList);
                this.backImgFile = file;
                this.backImgFile.url = file.response.key;
            },
            certProcess: function () {
                //进入实名认证相关逻辑
                this.$axios.get('cert/realName/detail').then((res) => {
                    console.log('certProcess', res);
                    if(!res.data){
                        //初次认证
                        this.showForm = true;
                    }
                    if(res && res.data){
                        if(res.data.operation_status == 1) {
                            //待审核
                            this.showForm = false;
                            this.isVerify = true;
                            this.$emit('changeBtnText', {tip: '确定'});
                        }else if(res.data.operation_status == 3){
                            //审核被拒绝 需要修改表单信息
                            this.$Modal.warning({
                                title: '提示',
                                content: '审核被拒绝，请重新修改表单后提交！'
                            });
                            this.showForm = true;
                            this.name = res.data.name;
                            this.card_id = res.data.card_id;
                            this.frontImgFile.url = res.data.card_front;
                            this.backImgFile.url = res.data.card_back;
                            this.weid = res.data.weid;
                            this.$emit('changeBtnText', {tip: '修改'});
                        }

                    }
                });
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.showLoading = true;
                this.$axios.get('member/setting').then((res)=>{
                    console.log('初始判断条件1', res);
                    if(res.code == 200){
                        this.$axios.get('pages/page/info').then((ponse)=>{
                            console.log('初始判断条件2', ponse);
                            if(ponse.code == 200){
                                this.showLoading = false;
                                if(ponse.data.isUA == false && res.data.condition.includes('UA')){
                                    console.log('可以开始实名认证');
                                    this.certProcess();
                                }else if(ponse.data.isUA && res.data.condition.includes('UA')){
                                    console.log('已通过实名认证');
                                    this.isPass = true;
                                    this.$emit('changeBtnText', {tip: '确定'});
                                }else{
                                    console.log('未开通实名认证功能');
                                    this.notOpen = true;
                                    this.$emit('changeBtnText', {tip: '确定'});
                                }
                            }
                        });
                    }
                });
            });
        }
    };
</script>