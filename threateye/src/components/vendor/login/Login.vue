<template>
  <div id="Login" class="login-container" v-cloak>
    <div class="logo">
      <img class="l_product_logo" src="@/assets/images/login/logo.png" alt="logo"/>
      <span class="l_product_title">ThreatEye</span>
      <h4 class="l_product_name">ThreatEye高级威胁检测系统</h4>
      <p class="l_product_content">ThreatEye Advanced Threat Detection System</p>
    </div>

    <div class="login-box">
      <div class="login-main">
        <h2 class="l-title">登录</h2>
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
      top: 360px;
      left: 156px;
      text-align: initial;
      .l_product_logo{
        vertical-align: middle;
        width: 108px;
        height: 108px;
      }
      .l_product_title{
        font-family: HelveticaNeue-Bold;
        font-size: 48px;
        color: #FFFFFF;
        letter-spacing: 4px;
        vertical-align: middle;
      }
      .l_product_name{
        font-family: PingFangSC-Semibold;
        font-size: 30px;
        color: #FFFFFF;
        margin-top: 48px;
      }
      .l_product_content{
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #FFFFFF;
        margin-top: 12px;
      }
    }
    .login-box {
      position: absolute;
      top: 210px;
      right: 180px;
      width: 480px;
      min-height: 462px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 0 48px 4px rgba(0,0,0,0.16);
      /*&.add-code{
        height: 582px;
      }*/
      .login-main{
        text-align: left;
        padding: 24px 42px;
        .l-title{
          font-family: PingFangSC-Semibold;
          font-size: 32px;
          color: #0070FF;
          letter-spacing: 2.67px;
          line-height: 48px;
        }
      }
    }
  }
</style>
