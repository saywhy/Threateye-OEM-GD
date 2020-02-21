<template>
  <div id="UserLogin">
    <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
      <el-form-item prop="username">
        <el-input class="view-input"  @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名">
          <i slot="prefix" class="icon-yonghu"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input class="view-input" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
          <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
          <i slot="prefix" class="icon-mima"></i>
        </el-input>
      </el-form-item>

      <el-form-item prop="code" style="margin-bottom:20px;">
        <div class="code-list">
          <el-input class="view-input view-code" maxlength="8" @keyup.enter.native="handleLogin" v-model="loginForm.code" auto-complete="off" placeholder="请输入图形验证码">
            <i slot="prefix" class="icon-yanzhengma"></i>
            <!--<i slot="prefix" class="icon-mima"></i>-->
          </el-input>
          <!--验证码组件-->
          <div class="code" @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </div>
      </el-form-item>

      <el-form-item style="margin:0;text-align: right;" v-show="codeCount >= 3">
        <span class="p3_error">
          <i class="el-icon-warning" style="font-size: 13px;"></i>
          <span class="p3_error">用户名密码输入错误超过三次，</span>
          <a class="p3_tips">点击联系管理员</a>
        </span>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">

  import SIdentify from './Identify';
  import { isvalidUsername } from '@/assets/js/validate'
  export default {
    name: 'UserLogin',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validateCode = (rule, value, callback) => {
        if (this.identifyCode !== value) {
          this.loginForm.code = '';
          this.identifyCode = '';
          this.codeCount ++;
          this.makeCode(this.identifyCodes, 4);
          callback(new Error('验证码不正确，请重新输入'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: '123456',
          code: ''
        },
        identifyCodes: '1234567890',
        identifyCode: '',
        codeCount: 0,
        loginRules: {
          username: [
            { required: true, trigger: 'blur', validator: validateUsername }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
            { required: true, trigger: 'blur', validator: validateCode }
          ],
        },
        passwordType: 'password'
      }
    },
    mounted() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    methods: {
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
      },
      showPassword() {
        this.passwordType === '' ? (this.passwordType = 'password') : (this.passwordType = '');
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
              this.$router.push('/', () => {});//登录成功之后重定向到首页
              this.codeCount = 0;
            }).catch(err => {
               this.$message.error(err); //登录失败提示错误
            });
          }
        })
      }
    },
    components:{
      SIdentify
    }
  }
</script>
<style lang="less">
  #UserLogin{
    .el-form-item__content{
      line-height: 1;
    }
    .view-input{
      .el-input__inner{
         border: 2px solid rgba(255,255,255,0.48);
         background-color: transparent;
         color: #fff;
      }
      .el-input__prefix{
        i{
          display: block;
          height: 40px;
          width: 25px;
          text-align: center;
          -webkit-transition: all .3s;
          transition: all .3s;
          /*line-height: 40px;*/
          background-position: 4px 11px;
          background-repeat: no-repeat;
        }
        i.icon-yonghu{
          background-image: url("../../../assets/images/login/username.png");
        }
        i.icon-mima{
          background-image: url("../../../assets/images/login/password.png");
        }
        i.icon-yanzhengma{
          background-image: url("../../../assets/images/login/password.png");
        }
      }
    }
    .code-list{
      display: flex;
      .view-code{
        flex: 1;
      }
      .s-canvas{
        padding-left: 20px;
      }
    }
    .p3_error{
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #fff;
      .p3_img{}
      .p3_tips{
        color: #FF3A36;
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .login-submit{
      background: #0070FF;
      width: 100%;
      border-color:#0070FF;
      margin: 20px 0 0;
    }
  }
</style>
