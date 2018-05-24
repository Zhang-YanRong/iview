<style scoped>
    .secret_modal>div{
        margin-bottom: 20px;
    }
    .secret_modal>div:last-child{
        margin-bottom: 0;
    }
    .secret_modal>div>label{
        margin-bottom: 14px;
        font-size: 14px;
        color: #333;
        display: block;
    }
    .secret_modal>div>div>Button{
        margin-left: 13px;
    }
</style>
<template>
    <div class="secret_modal">
        <div>
            <label>新密令</label>
            <Input v-model="newSecret" placeholder="请输入新密令" style="width: 280px"></Input>
        </div>
        <div>
            <label>确认密令</label>
            <Input v-model="confrimSecret" placeholder="请再次输入密令" style="width: 280px"></Input>
        </div>
        <div>
            <label>手机号码</label>
            <Input v-model="phone" placeholder="请输入手机号码" style="width: 280px"></Input>
        </div>
        <div>
            <label>验证码</label>
            <div>
                <Input v-model="code" placeholder="请输入验证码" style="width: 168px"></Input>
                <Button>发送验证码</Button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                newSecret: '',
                confrimSecret: '',
                phone: '',
                code: ''
            };
        },
        methods: {
            next: function () {

            }
        }
    };
</script>