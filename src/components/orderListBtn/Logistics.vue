<template>
    <div>
        <p style="display: block;height: 20px;width: 80px;padding: 0;line-height: 20px;text-align: center" type="ghost"><router-link :to="{name:'user_shop_Logistics',query: {weid:listnub.weid}}">查看物流</router-link></p>
    </div>
</template>

<script>
    export default {
        name: 'logistics',
        data(){
            return{
            };
        },
        props:{
            listnub:{
                type:Object,
                default: function () {
                    return {};
                }
            }
        },
        mounted(){
            console.log(this.listnub);
        }
    };
</script>

<style scoped>

</style>