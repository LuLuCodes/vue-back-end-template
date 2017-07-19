<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
             class="card-box login-form">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="email">
        <span class="svg-container"><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
        <el-input name="account" type="text" v-model="loginForm.account" autoComplete="on" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container"><i class="fa fa-lock" aria-hidden="true"></i></span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                  placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    components: { },
    name: 'Login',
    data() {
      const validateAccount = (rule, value, callback) => {
        if (!value) {
          callback(new Error('账号不能为空'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          account: '',
          password: ''
        },
        loginRules: {
          account: [
            { required: true, trigger: 'blur', validator: validateAccount }
          ],
          password: [
            { required: true, trigger: 'blur', validator: validatePass }
          ]
        },
        loading: false,
        showDialog: false
      };
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('LoginByAccount', this.loginForm).then(() => {
              this.loading = false;
              this.$router.push({ path: '/' });
            }).catch(err => {
              this.$message.error(err);
              this.loading = false;
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created() {
    },
    destroyed() {
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/css/mixin.scss";
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }
  
  .login-container {
    @include relative;
    height: 100vh;
    background-color: #2d3a4b;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eeeeee;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #889aa4;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #eeeeee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .forget-pwd {
      color: #fff;
    }
  }
</style>
