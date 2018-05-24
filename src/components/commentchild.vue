<template>
    <div>
        <Input v-model="reason" type="textarea" style="min-width: 488px;" :rows="4"
               placeholder="请输入评论"></Input>
    </div>
</template>

<script>
    export default {
        name: 'commentchild',
        data() {
            return {
                reason: '',
                goods_id: ''
            };
        },
        props: {
            itemid: {
                type: String,
                default: ''
            }
        },
        methods: {},

        watch: {
            reason:function () {
                var data = {
                    'reason': this.reason,
                    'goods_id': this.goods_id,
                };
                this.$emit('goodscomment', data);
            }
        },
        mounted() {
            console.log(this.itemid, 'common');
            this.goods_id = this.itemid;
        }
    };
</script>

<style scoped>

</style>