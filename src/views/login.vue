<style scoped>
    body{

    }
    .index {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        background: url("../resource/images/body-bg.jpg") no-repeat;
    }

    .index h1 {
        height: 150px;
    }

    .index h1 img {
        height: 100%;
    }
    .index h3 {
        height: 100%;
        margin-bottom: 20px;
    }
    .index .ivu-row-flex {
        height: 100%;
    }
</style>
<template>
    <div class="index" @keyup.enter="handleSubmit('formInline');">
        <Row type="flex" justify="center" align="middle">
            <Col>
            <Card :bordered="true">
                <div style="text-align:center">
                    <h3>{{siteName}}</h3>
                    <!--<img src="../resource/images/logo.png">-->
                </div>
                <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                    <Form-item prop="user">
                        <Input type="text" v-model="formInline.user" placeholder="账号">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="密码">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit('formInline');"  >登录</Button>
                    </Form-item>
                </Form>
            </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                siteName: global.Param.siteName,
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        {required: true, message: '请填写账号', trigger: 'blur'},
                        {type: 'string', min: 6,message: '账号长度不能小于6位' , trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
                    ]
                }
            };
        },
        mounted() {
            console.log(this.$store.state.LoginState.token);
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$axios.post('login' , {'username': this.formInline.user , 'password': this.formInline.password })
                            .then((response) =>{
                                if (response){
                                    this.$store.commit('setLoginState' , response);
                                    this.$Message.success('登陆成功!');
                                    this.$router.push({'name': 'admins'});
                                }
                            });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });
            }
        }
    };
</script>