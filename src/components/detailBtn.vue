<template>
    <div id="btn">
        <ul>
            <li class="1">
            </li>
            <li class="2"></li>
            <li class="3">
            </li>
            <li class="4">
                <p style="margin: 5px auto 0!important;display: block;height: 20px;line-height: 20px;width: aoto" type="ghost" ><span @click="comment(item.weid)">评论</span>|<span @click="Requestrefund(item.weid)">退款</span></p>
                <Button style="margin: 5px auto 0!important;display: block;" type="ghost" @click="Determinetransaction(item.weid)">确定交易</Button>
            </li>
            <li class="5">

            </li>
            <li class="6">
            </li>
            <li class="7">
            </li>
            <li class="8"></li>
            <li class="9">
            </li>
        </ul>
    </div>


</template>

<script>
    export default {
        data() {
            return {
                open:[0,0,0,0,]
            };
        },
        methods: {}
    };
</script>

<style>
#btn{
    width: 100%;
    height: auto;
    overflow: hidden;
}
</style>
