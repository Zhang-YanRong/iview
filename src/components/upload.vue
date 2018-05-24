<template>
    <div>
        <div @click="getToken">
            <Upload style="margin-top: 20px" action="https://upload-z1.qiniup.com/" :on-exceeded-size="MaxSize" :max-size="1024"
                    :data="upLoadData" :show-upload-list="false" :before-upload="beforeUpload"
                    :format="['jpg','jpeg','png','bmp','gif']" :on-format-error="uploadError" :on-success="uploadSucess">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
        </div>
        <ul class="imgshow">
            <li v-for="(item,index) in photo">
                <img :src="item" alt="">
                <div class="cancle" @click="cancle(index)">
                    <Icon type="ios-trash-outline" style="font-size: 20px;color: #fafafa;line-height: 100px;"></Icon>
                </div>
            </li>
            <!--<input type="hidden" v-model="photo">-->
        </ul>
    </div>

</template>

<script>
    export default {
        name: 'upload',
        data() {
            return {
                upLoadData: {
                    'token': ''
                },
                backImgFile:{},
                photo:[],
                parameter:parameter,
                cangetToken:true
            };
        },
        methods: {
            //上传之前
            beforeUpload(){
                this.$Message.loading('正在上传中...',60);

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
            //上传成功
            uploadSucess: function (res,file,fileList) {
                console.log('成功上传-back',res,file,fileList);
                this.backImgFile = file;
                var photo = this.parameter.upShow + file.response.key;
                this.photo.push(photo)
                console.log(this.photo)
                this.$Message.destroy();
            },

            //评论图片取消
            cancle(i){
                this.photo.splice(i,1);
                // var data={
                //     index:i,
                //     goods_id:this.itemid
                // }
                // this.$emit('photocancle', data);
            },

            //获取token
            getToken(){
                if(this.cangetToken){
                    this.cangetToken = false;
                    this.$axios.get('file/qiniu_token').then( (res) => {
                        if(res.status == 200 && res.data && res.data.uptoken){
                            this.upLoadData.token = res.data.uptoken;
                        }
                    });
                }
            }

        },
        props: {
            itemid: {
                type: String,
                default: ''
            }
        },
        watch:{
            photo:function () {
                var data = {
                    'photo':this.photo,
                    'weid':this.itemid,
                }
                this.$emit('photo', data);
            }
        },
        mounted(){
            console.log(this.itemid);
        }
    };
</script>

<style scoped>
    .imgshow{
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-top: 10px;
    }
    .imgshow > li{
        float: left;
        margin-right: 29px;
        width: 100px;
        height: 100px;
        overflow: hidden;
        position: relative;
    }
    .imgshow > li > img{
        display: block;
        width: 100px;
        height: 100px;
        box-sizing: border-box;
        padding: 10px;

        border: 1px solid #E6E6E6;
    }
    .imgshow > li:hover .cancle{
        opacity: 1;
    }
    .cancle{
        width: 100px;
        height: 100px;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        background: rgba(0,0,0,0.5);
        z-index: 20;
        box-sizing: border-box;
        padding :0 44px;
    }
</style>