<style scoped>
    .modal_cert .modal_form>div{
        margin-bottom: 20px;
    }
    .modal_cert .modal_form div:last-child{
        margin-bottom: 0;
    }
    .modal_cert .modal_form>div>label{
        margin-bottom: 14px;
        font-size: 14px;
        color: #333;
        display: block;
    }
    .modal_cert .upload_img{
        width: 120px;
        height: 120px;
        display: block;
        padding: 5px;
        border: 1px solid #DDDEE1;
        border-radius: 8px;
    }
    .modal_cert .modal_select{
        margin-bottom: 20px;
    }
    .modal_cert .default_upload_img{
        width: 60px;
        height: 60px;
        display: block;
        padding: 30px;
        border: 1px solid #DDDEE1;
        border-radius: 8px;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
    }
    .modal_cert .upload_tip{
        font-size: 12px;
        color: #b3b3b3;
        line-height: 18px;
    }
</style>
<template>
    <div class="modal_cert">

        <div v-if="certForm">
            <div class="modal_form modal_select">
                <div>
                    <label>认证类型</label>
                    <RadioGroup v-model="certType">
                        <Radio label="1" v-if="showCert"><span>个人认证</span></Radio>
                        <Radio label="2" v-if="showInst"><span>机构认证</span></Radio>
                    </RadioGroup>
                </div>
            </div>
            <!--个人认证表单内容-->
            <div class="modal_form" v-if="certType == 1">
                <div>
                    <label>身份证姓名</label>
                    <Input v-model="cert.name" type="text" placeholder="请输入身份证姓名" style="width: 280px"></Input>
                </div>
                <div>
                    <label>身份证号码</label>
                    <Input v-model="cert.card_id" placeholder="请输入身份证号码" style="width: 280px"></Input>
                </div>
                <div>
                    <label>加V认证</label>
                    <Input v-model="cert.cert_info" type="textarea" placeholder="请如实填写你的加V认证资料，填写后可更好的彰显你的身份" style="width: 450px"></Input>
                </div>
                <div>
                    <label>证明资料</label>
                    <Upload ref="upload" action="https://upload-z1.qiniup.com/" :show-upload-list="false" :on-success="handleFrontSucess" :data="upLoadData" :format="['jpg','jpeg','png','gif','bmp']" :on-format-error="handleFormatError">
                        <div @click="handleBeforeUpload('perCertImg')">
                            <img class="default_upload_img" v-if="!perCertImgsFile.url" src="../resource/images/upload-file-add.png" alt="">
                            <div v-else>
                                <img class="upload_img" :src="parameter.upShow + perCertImgsFile.url" alt="">
                            </div>
                        </div>
                    </Upload>
                </div>
            </div>
            <!--机构认证表单内容-->
            <div class="modal_form" v-if="certType == 2">
                <div>
                    <label>机构名称</label>
                    <Input v-model="inst.org_name" type="text" placeholder="请输入你所在的机构名称" style="width: 280px"></Input>
                </div>
                <div>
                    <label>营业执照</label>
                    <Upload ref="upload" action="https://upload-z1.qiniup.com/" :max-size="5120" :show-upload-list="false" :format="['jpg','jpeg','png','bmp','gif']" :on-format-error="handleFormatError" :on-success="handleFrontSucess" :on-exceeded-size="handleMaxSize" :data="upLoadData">
                        <div @click="handleBeforeUpload('orgLicenseImg')">

                            <img class="default_upload_img" v-if="!orgLicenseImageFile.url" src="../resource/images/upload-file-add.png" alt="">
                            <div v-else>
                                <img class="upload_img" v-if="orgLicenseImageFile.status === 'finished'" :src="parameter.upShow + orgLicenseImageFile.url" alt="">
                                <div v-else>
                                    <Progress v-if="orgLicenseImageFile.showProgress" :percent="orgLicenseImageFile.percentage" hide-info></Progress>
                                </div>
                            </div>

                        </div>
                    </Upload>
                    <span class="upload_tip">请上传原件照片或扫描件，或者复印件加盖企业公司章后的扫描件。在有效期内且年检章齐全(当年成立的可无年检章)。由中国大陆工商局或市场监督管理局颁发格式要求：支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过5M。</span>
                </div>
                <div>
                    <label>工商执照</label>
                    <Input v-model="inst.org_cert_number" type="text" placeholder="请参照营业执照人输入" style="width: 280px"></Input>
                </div>
                <div>
                    <label>一般经营范围</label>
                    <Input v-model="inst.org_scope_common" type="text" placeholder="请参照营业执照人输入" style="width: 280px"></Input>
                </div>
                <div>
                    <label>前置经营范围</label>
                    <Input v-model="inst.org_scope_front" type="text" placeholder="请参照营业执照人输入" style="width: 280px"></Input>
                </div>
                <div>
                    <label>企业类型</label>
                    <Input v-model="inst.org_type" type="text" placeholder="请参照营业执照人输入" style="width: 280px"></Input>
                </div>
                <div>
                    <label>企业成立日期</label>
                    <DatePicker :clearable="false" :value="inst.org_setup_date" @on-change="handleChangeSetupDate" placeholder="请选择企业成立日期"></DatePicker>
                </div>
                <div>
                    <label>授权资料</label>
                    <Upload ref="upload" action="https://upload-z1.qiniup.com/" :max-size="5120" :show-upload-list="false" :format="['jpg','jpeg','png','bmp','gif']" :on-format-error="handleFormatError" :on-success="handleFrontSucess" :on-exceeded-size="handleMaxSize" :data="upLoadData">
                        <div @click="handleBeforeUpload('orgAuthImg')">

                            <img class="default_upload_img" v-if="!orgAuthImgsFile.url" src="../resource/images/upload-file-add.png" alt="">
                            <div v-else>
                                <img class="upload_img" v-if="orgAuthImgsFile.status === 'finished'" :src="parameter.upShow + orgAuthImgsFile.url" alt="">
                                <div v-else>
                                    <Progress v-if="orgAuthImgsFile.showProgress" :percent="orgAuthImgsFile.percentage" hide-info></Progress>
                                </div>
                            </div>

                        </div>
                    </Upload>
                    <span class="upload_tip">请上传原件照片或扫描件，或者复印件加盖企业公司章后的扫描件。格式要求：支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M。</span>
                </div>
                <div>
                    <label>联系人</label>
                    <Input v-model="inst.org_contact_people" type="text" placeholder="请输入真实联系人姓名" style="width: 280px"></Input>
                </div>
                <div>
                    <label>联系人电话</label>
                    <Input v-model="inst.org_contact_phone" type="text" placeholder="请输入联系人电话" style="width: 280px"></Input>
                </div>
                <div>
                    <label>联系人地址</label>
                    <Input v-model="inst.org_address" type="text" placeholder="请输入联系人地址" style="width: 280px"></Input>
                </div>
                <div>
                    <label>加V认证</label>
                    <Input v-model="inst.cert_info" type="textarea" placeholder="请如实填写你的加V认证资料，填写后可更好的彰显你的身份" style="width: 280px"></Input>
                </div>
                <div>
                    <label>证明资料</label>
                    <Upload ref="upload" action="https://upload-z1.qiniup.com/" :max-size="5120" :show-upload-list="false" :format="['jpg','jpeg','png','bmp','gif']" :on-format-error="handleFormatError" :on-success="handleFrontSucess" :on-exceeded-size="handleMaxSize" :data="upLoadData">
                        <div @click="handleBeforeUpload('orgCertImg')">

                            <img class="default_upload_img" v-if="!orgCertImgsFile.url" src="../resource/images/upload-file-add.png" alt="">
                            <div v-else>
                                <img class="upload_img" v-if="orgCertImgsFile.status === 'finished'" :src="parameter.upShow + orgCertImgsFile.url" alt="">
                                <div v-else>
                                    <Progress v-if="orgCertImgsFile.showProgress" :percent="orgCertImgsFile.percentage" hide-info></Progress>
                                </div>
                            </div>

                        </div>
                    </Upload>
                    <span class="upload_tip">请上传原件照片或扫描件，或者复印件加盖企业公司章后的扫描件。格式要求：支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过2M。</span>
                </div>
            </div>
        </div>
        <div v-if="toAuth">您还未进行实名认证，请先完成实名认证！</div>
        <div v-if="isPass">官方认证已通过！</div>
        <div v-if="notOpen">官方认证功能暂未开通！</div>
        <div v-if="isVerify">官方认证审核中，请您耐心等待...</div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                showCert: true,
                showInst: true,
                isVerify: false,
                isPass: false,
                notOpen: false,
                certForm: false,
                toAuth: false,
                currentUploadObj: {},
                currentUploadType: '',
                perCertImgsFile: {},
                cert: {
                    name: '',
                    card_id: '',
                    cert_info: '',
                    per_cert_imgs: ''
                },
                orgLicenseImageFile: {},
                orgAuthImgsFile: {},
                orgCertImgsFile: {},
                inst: {
                    org_name: '',
                    org_license_image: '',
                    org_cert_number: '',
                    org_scope_common: '',
                    org_scope_front: '',
                    org_type: '',
                    org_setup_date: '',
                    org_auth_imgs: '',
                    org_contact_people: '',
                    org_contact_phone: '',
                    org_address: '',
                    cert_info: '',
                    org_cert_imgs: ''
                },
                modal_loading: false,
                upLoadData: {
                    'token': ''
                },
                parameter: parameter,
                certType: 1
            };
        },
        methods: {
            handleChangeSetupDate: function (date) {
                this.inst.org_setup_date = date;
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
            handleBeforeUpload: function (type) {
                console.log('开始上传');
                var self = this;
                this.$axios.get('file/qiniu_token').then(function (res) {
                    if(res.status == 200 && res.data && res.data.uptoken){
                        self.upLoadData.token = res.data.uptoken;
                    }
                });
                this.currentUploadType = type;
            },
            handleFrontSucess:function (res,file,fileList) {
                console.log('成功上传-front');
                console.log('res,file,fileList', res,file,fileList);
                this.currentUploadObj = file;
                this.currentUploadObj.url = file.response.key;
                switch (this.currentUploadType){
                    case 'perCertImg':
                        this.perCertImgsFile = this.currentUploadObj;
                        this.cert.per_cert_imgs = this.currentUploadObj.url;
                        break;
                    case 'orgLicenseImg':
                        this.orgLicenseImageFile = this.currentUploadObj;
                        this.inst.org_license_image = this.currentUploadObj.url;
                        break;
                    case 'orgAuthImg':
                        this.orgAuthImgsFile = this.currentUploadObj;
                        this.inst.org_auth_imgs = this.currentUploadObj.url;
                        break;
                    case 'orgCertImg':
                        this.orgCertImgsFile = this.currentUploadObj;
                        this.inst.org_cert_imgs = this.currentUploadObj.url;
                        break;
                }
            },
            getCertType: function () {
                this.$axios.get('cert/ofccerts').then((res)=>{
                    console.log('官方认证结果',res);
                    if(!res.data){
                        //初始化官方认证
                        this.certForm = true;
                    }else if(res.data.type === 2){
                        console.log('机构认证类型');
                        this.certType = 2;
                        this.handleProcess('inst',res.data);
                    }else{
                        console.log('个人认证类型');
                        this.certType = 1;
                        this.handleProcess('cert',res.data);
                    }
                });
            },
            handleProcess: function (type,obj) {
                if(type === 'cert'){
                    console.log('开始官方-个人认证逻辑');
                    if(obj && JSON.stringify(obj)!=='{}'){
                        if(obj.operation_status == 3 && (obj.is_authenticated ==2 || obj.is_done == 2)) {
                            this.$Modal.warning({
                                title: '提示',
                                content: '审核被拒绝，请重新修改表单后提交！'
                            });
                            this.certForm = true;
                            this.cert.cert_info = obj.cert_info;
                            this.cert.per_cert_imgs = obj.per_cert_imgs;
                            this.perCertImgsFile.url = obj.per_cert_imgs;
                            this.$emit('changeBtnText', {tip: '修改'});
                        } else if(obj.is_done == 1) {
                            //审核中
                            this.certForm = false;
                            this.isVerify = true;
                            this.$emit('changeBtnText', {tip: '确定'});
                        }
                    }

                }else if(type === 'inst'){
                    console.log('开始官方-机构认证逻辑');
                    // 官方认证 -> 机构认证相关逻辑
                    if(obj && JSON.stringify(obj)!=='{}'){
                        if(obj.operation_status == 3 && (obj.is_authenticated ==2 || obj.is_done == 2)) {
                            this.$Modal.warning({
                                title: '提示',
                                content: '审核被拒绝，请重新修改表单后提交！'
                            });
                            this.certForm = true;
                            this.$emit('changeBtnText', {tip: '修改'});
                            this.inst.org_name = obj.org_name;
                            this.inst.org_license_image = obj.org_license_image;
                            this.inst.org_cert_number = obj.org_cert_number;
                            this.inst.org_scope_common = obj.org_scope_common;
                            this.inst.org_scope_front = obj.org_scope_front;
                            this.inst.org_type = obj.org_type;
                            this.inst.org_setup_date = obj.org_setup_date;
                            this.inst.org_auth_imgs = obj.org_auth_imgs;
                            this.inst.org_contact_people = obj.org_contact_people;
                            this.inst.org_contact_phone = obj.org_contact_phone;
                            this.inst.org_address = obj.org_address;
                            this.inst.cert_info = obj.cert_info;
                            this.inst.org_cert_imgs = obj.org_cert_imgs;

                        } else if(obj.is_done == 1) {
                            //审核中
                            this.certForm = false;
                            this.isVerify = true;
                            this.$emit('changeBtnText', {tip: '确定'});
                        }
                    }
                }
            },
            next: function (type) {
                //判断当前是哪一种的认证 1 个人认证  2 机构认证
                if(this.certType == 1){

                    console.log('个人认证提交/修改信息', this.cert);
                    if(!this.cert.name || !this.cert.card_id || !this.cert.cert_info || !this.cert.per_cert_imgs){
                        this.$Modal.warning({
                            title: '提示',
                            content: '请完善相关信息！'
                        });
                        return;
                    }

                    if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.cert.card_id)){
                        this.$Modal.warning({
                            title: '提示',
                            content: '身份证信息不合法！'
                        });
                        return;
                    }
                    if(type==='修改'){
                        this.$axios.put('cert/ofccerts',this.cert).then((res)=>{
                            if(res.code == 200){
                                this.getCertType();
                            }
                        });
                    }else{
                        this.cert.type = 1;
                        this.$axios.post('cert/ofccerts',this.cert).then((res)=>{
                            if(res.code == 200){
                                this.getCertType();
                            }
                        });
                    }

                }else if(this.certType == 2){

                    //机构认证的提交/修改
                    console.log('机构认证提交/修改信息', this.inst);

                    if(!this.inst.org_name || !this.inst.org_license_image || !this.inst.org_cert_number || !this.inst.org_scope_common || !this.inst.org_scope_front || !this.inst.org_type || !this.inst.org_setup_date || !this.inst.org_auth_imgs || !this.inst.org_contact_people || !this.inst.org_contact_phone || !this.inst.org_address || !this.inst.cert_info || !this.inst.org_cert_imgs) {
                        this.$Modal.warning({
                            title: '提示',
                            content: '请完善相关信息！'
                        });
                        return;
                    }

                    if(!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.inst.org_contact_phone)){
                        this.$Modal.warning({
                            title: '提示',
                            content: '请输入正确手机号！'
                        });
                        return;
                    }

                    if(type==='修改'){
                        this.$axios.put('cert/ofccerts',this.inst).then((res)=>{
                            if(res.code == 200){
                                this.getCertType();
                            }
                        });
                    }else{
                        this.cert.type = 2;
                        this.$axios.post('cert/ofccerts',this.inst).then((res)=>{
                            if(res.code == 200){
                                this.getCertType();
                            }
                        });
                    }
                }
            }
        },
        mounted(){
            this.$nextTick(()=>{
//                this.showLoading = true;
                this.$axios.get('member/setting').then((res)=>{
                    console.log('初始判断条件1', res);
                    if(res.code == 200){
                        if(res.data && res.data.member_open_type == 2){
                            //只允许个人认证
                            this.showInst = false;
                            this.certType = 1;
                        }else if(res.data && res.data.member_open_type == 3){
                            //只允许机构认证
                            this.showCert = false;
                            this.certType = 2;
                        }
                        this.$axios.get('pages/page/info').then((ponse)=>{
                            console.log('初始判断条件2', ponse);
                            if(ponse.code == 200){
//                                this.showLoading = false;
                                this.$axios.get('cert/realName/detail').then((data)=>{
                                    if(data.code == 200){
                                        if(!data.data || data.data.operation_status == 3){
                                            //未进行过初始化实名认证或者实名认证被拒绝
                                            this.toAuth = true;
                                            this.$emit('changeBtnText', {tip: '确定'});
                                        }else{
                                            this.cert.card_id = data.data.card_id;
                                            this.cert.name = data.data.name;

                                            if(ponse.data.isUG == false && res.data.condition.includes('UG')){
                                                console.log('进入官方认证逻辑');
                                                //先判断上一次官方认证的情况
                                                this.getCertType();
                                            }else if(ponse.data.isUG && res.data.condition.includes('UG')){
                                                //已通过
                                                this.isPass = true;
                                                this.$emit('changeBtnText', {tip: '确定'});
                                            }else{
                                                //未开通以及其他的例外情况
                                                this.notOpen = true;
                                                this.$emit('changeBtnText', {tip: '确定'});
                                            }

                                        }
                                    }

                                });
                            }
                        });
                    }
                });
            });
        }
    };
</script>