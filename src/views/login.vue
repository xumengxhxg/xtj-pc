<template>
<div class="bg-login">
    <div class="top-container">
        <img src="../assets/guohui.png" alt="">
    </div>
    <div class="mt20 content">
        <div class="title ft-size-21">姑苏分局巡特警大队</div>
        <div class="title ft-size-28">特警勤务训练考核系统</div>
        <div class="mt20">
            <el-form ref="form" :model="form">
                <el-form-item>
                    <el-input class="mt20" prefix-icon="el-icon-s-custom" v-model="form.username" placeholder='请输入用户名'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" prefix-icon="el-icon-lock" v-model='form.password' placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item style="color: #91d5ff;" class="text-left">
                    <el-radio label="1" style="color: #91d5ff" v-model="form.remember">记住我（请勿在公共电脑勾选，以防止密码泄露)</el-radio>
                </el-form-item>
                <el-button class="wp-100" style="background-color: #29b2b9; border-color: #04f1f3;color: #fff;" @click="login">登录</el-button>
            </el-form>
        </div>
    </div>
</div>
</template>
<script>
import { login } from '@/api/login.js'
import { authEncode } from '@/utils/settings.js'
export default {
    data() {
        return {
            form: {
                username: '',
                password:' '
            }
        }
    },
    created() {
        
    },
    methods: {
        login() {
            let query = {
                _allow_anonymous: true
            }
            let data = {
                zhanya: authEncode(this.form)
            }
            login(query, data).then((res) => {
                if (res.status === 200) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.$router.push('/index')
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                    })
                }
            }).catch((err) => {
                  this.$message.error(err)
            })
        }
    }
}
</script>
<style scoped>
.wp-100 {
    width: 100%;
}
.border-04f1f3 {
    border: 1px solid #04f1f3;
}
.mh20 {
    margin-top: 20px;
}
.mt20 {
    margin-top: 20px;
}
.text-left {
    text-align-last: left;
}
.bg-login {
    background: url('../assets/bg.jpg') no-repeat;
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    /* position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0; */
}
.top-container {
    padding-top: 20px;
    text-align: center;
}
.content {
    background: url('../assets/card-bg.png') no-repeat;
    width: 800px;
    height: 520px;
    margin: 0 auto;
    padding: 86px 198px;
    box-sizing: border-box;
}
.content .title {
    color: #00fcff;
}
.ft-size-21 {
    font-size: 21px;
}
.ft-size-28 {
    font-size: 28px;
}
.mt10 {
    margin-top: 10px;
}
</style>