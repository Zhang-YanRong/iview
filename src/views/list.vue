<template>
    <div>
        <li v-for="(item,index) in datas" >{{item.title}}</li>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                // VUE 中所有使用的变量都需要初始化 在模板中不需要 this 在方法中使用必须使用 this
                datas: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '地址',
                        key: 'as'
                    },
                    {
                        title: '电话',
                        key: 'phone'
                    },
                    {
                        title: '下单次数',
                        key: 'number'
                    },
                    {
                        title: '下单时间',
                        key: 'time'
                    }
                ],
            }
        },
        mounted() {
            // 页面加载第一次调用数据必须 在this.$nextTick 中调用
            this.$nextTick( function () {
                console.log(this.datas);

                // 接口请求使用
                // get 传递参数第一个键值必须是params
                // 初始化接口链接修改 config 文件夹中的 parameter
//                this.$axios.get(this.mark , {params:{'match' : this.matchVal}})
//                    .then((response)=>{
//                        // 改变 datas 列表数据自动加载
//                        this.datas = response.data.list;
//                    });

                // get 传递参数第一个键值必须是params
//                this.$axios.post(this.mark , {'match' : this.matchVal})
//                    .then((response)=>{
//                        this.datas = response.data.list;
//                    });

                // 项目学习任务 配置好母页面,并将路由配置.
            });
        },
    }
</script>
