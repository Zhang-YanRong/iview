<style scoped>
    .money-panel{
        padding: 10px;
    }
    .money-select{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        border-bottom: 1px solid #E5E5E5;
    }
    .money-select p{
        width: 130px;
        height: 60px;
        line-height: 60px;
        flex: none;
        margin-bottom: 30px;
        text-align: center;
        border: 1px solid #009AFE;
        font-size: 24px;
        color: #009AFE;
    }
    .form{
        padding-top: 30px;
    }
    .form label{
        font-size: 14px;
        color: #333;
        margin-bottom: 13px;
        display: block;
    }
</style>
<template>
    <div class="money-panel">
        <div class="money-select">
            <p>￥50</p>
            <p>￥50</p>
            <p>￥50</p>
            <p>￥50</p>
            <p>￥100</p>
            <p>￥1000</p>
        </div>
        <div class="form">
            <label>自定义充值金额（人民币：元）</label>
            <Input v-model="money" placeholder="请输入充值金额" style="width: 280px"></Input>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                money: ''
            };
        }
    };
</script>