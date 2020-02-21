<template>
  <div id="Login" class="login-container" @keyup.enter.native="handleLogin" v-cloak>
    <div class="logo">
      <img src="@/assets/images/login/logo01.png" alt="logo" style="vertical-align: middle;" />
    </div>

    <p class="login-copyright">
      虎特信息科技（上海）有限公司  版权所有
    </p>
    <div class="login-box animated">
      <div class="border-line"></div>
      <div class="login-main">
        <div class="l-img">
          <img src="@/assets/images/login/logo.png" alt="logo" style="vertical-align: middle;" />
        </div>
        <h2 class="l-title">iView 安全感知系统</h2>
        <User></User>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import User from './User'
  export default {
    name: 'Login',
    data() {
      return {
        activeName: 'user',
        website:{
          title: 'nx-admin',
          logo: 'N',
          author: 'BY nxmin',
          whiteList: ['/login', '/404', '/401', '/lock'],
          lockPage: '/lock'
        }
      }
    },

    methods: {
      handleLogin(){
      }
    },
    components:{
      User
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #Login {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    height: 100%;
    width: 100%;
    padding: 0 100px;
    &:before{
      z-index: -999;
      content: "";
      position: absolute;
      display: block;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-image: url("../../../assets/images/login/login.png");
      background-repeat: no-repeat;
      background-size: cover;
    }
    .logo{
      position: absolute;
      top: 50px;
      left: 50px;
    }
    .login-copyright{
      text-align: center;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 50px;
      line-height: 30px;
      font-size: 16px;
      color: #FFFFFF;
      font-weight: normal;
      width: 100%;
      font-family: PingFangSC-Regular;
    }
    .login-box {
      display: flex;
      flex-direction: column;
      text-align: center;
      .border-line{
        height: 6px;
        width: 100%;
        background-color: #0070ff;
      }
      .login-main{
        justify-content: center;
        padding: 20px 50px;
        background-color: rgba(79,135,255,0.48);
        .l-img{
          height: 108px;
          margin: auto;
        }
        .l-title{
          margin: 0 0 20px;
          text-align: center;
          font-family: PingFangSC-Semibold;
          font-weight: normal;
          font-size: 28px;
          color: #FFFFFF;
        }
      }
    }
  }

  .login-code {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 0 0 10px;
  }
  .login-code-img {
    margin-top: 2px;
    width: 100px;
    height: 32px;
    background-color: #fdfdfd;
    border: 1px solid #f0f0f0;
    color: #333;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 5px;
    line-height: 32px;
    text-indent: 5px;
    text-align: center;
  }
</style>
