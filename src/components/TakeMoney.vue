<style scoped>
    .pop-content{
        padding: 10px;
    }
    .tip{
        background-color: #FFF7E5;
        font-size: 12px;
        padding: 18px 13px;
        border: 1px solid #E8AA2E;
    }
    .money-total{
        padding: 30px 0;
        border-bottom: 1px solid #E5E5E5;
    }
    .money-total span{
        font-size: 14px;
    }
    .money-total span:first-child{
        margin-right: 68px;
    }
    .form-group{
        padding: 30px 0;
    }
    .form-group>div>label{
        display: block;
        margin-bottom: 14px;
        font-size: 14px;
    }
    .form-group>div:first-child{
        margin-bottom: 20px;
    }
    .form-item div span{
        color: #666666;
        font-size: 14px;
        margin-left: 20px;
    }
    .red-tip{
        color: #E53939;
        font-size: 12px;
    }
</style>
<template>
    <div class="pop-content">
        <div class="tip">
            1、请输入您要提现的金额，以及正确无误的银行账号信息。2、我们将在3个工作日(双休日和法定节假日除外)之内，将钱转入您绑定的微信账号。3、在双休日和法定节假日期间，用户可申请取现，但暂不处理，需要等回复正常上班之后才进行处理。不便之处，请多多谅解！
        </div>
        <div class="money-total">
            <span>账户总资金：￥0.00</span>
            <span>待审核金额：￥0.00</span>
        </div>
        <div class="form-group">
            <div class="form-item">
                <label>提取现金</label>
                <div>
                    <Input v-model="money" placeholder="请输入充值金额" style="width: 280px"></Input>
                    <span>可用余额：￥0.00</span>
                </div>
            </div>
            <div class="form-item">
                <label>操作密令</label>
                <div>
                    <Input v-model="psd" placeholder="请输入操作密令" style="width: 280px"></Input>
                    <span>忘记了？点这里</span>
                </div>
            </div>
        </div>
        <p class="red-tip">警告：禁止信用卡套现、虚假交易等行为，一经确认，将终止该账户的使用。</p>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                money: '',
                psd: ''
            };
        }
    };
</script>