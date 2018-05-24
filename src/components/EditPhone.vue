<style scoped>
    .modal_change_phone>div{
        margin-bottom: 20px;
    }
    .modal_change_phone>div:last-child{
        margin-bottom: 0;
    }
    .modal_change_phone>div>label{
        margin-bottom: 14px;
        font-size: 14px;
        color: #333;
        display: block;
    }
    .step{
        margin-bottom: 30px;
    }
    .modal_change_phone Button{
        margin-left: 13px;
    }
    .result{
        text-align: center;
    }
    .result p{
        margin-top: 20px;
        color: #58D138;
        font-size: 16px;
    }
</style>
<template>
    <div>
        <div class="step">
            <Steps :current="current">
                <Step title="核实原手机"></Step>
                <Step title="输入新手机"></Step>
                <Step title="修改成功"></Step>
            </Steps>
        </div>
        <div class="modal_change_phone">
            <template v-if="current == 0">
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
            </template>
            <template v-if="current == 1">
                <div>
                    <label>新手机号码</label>
                    <Input v-model="newPhone" placeholder="请输入新手机号码" style="width: 280px"></Input>
                </div>
                <div>
                    <label>验证码</label>
                    <div>
                        <Input v-model="newCode" placeholder="请输入验证码" style="width: 168px"></Input>
                        <Button>发送验证码</Button>
                    </div>
                </div>
            </template>
            <template v-if="current >= 2">
                <div class="result">
                    <Icon type="checkmark-circled" size="50" color="#58D138"></Icon>
                    <p>恭喜！您的手机号码修改成功。</p>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
              current: 0,
                phone: '',
                code: '',
                newPhone: '',
                newCode: ''
            };
        },
        methods: {
            next: function () {
                this.current += 1;
                if(this.current >= 2){
                    this.$emit('changeBtn');
                }
                if(this.current >= 3){
                    this.$emit('closeModal');
                }
            }
        }
    };
</script>