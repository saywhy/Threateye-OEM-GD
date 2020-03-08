<template>
  <el-row :gutter="0" id="Nav" v-cloak>
    <el-col :span="3" style="width: 11.5%;">
      <div class="header-logo" align="left"  @click="enter_home">
        <img class="e-image" :src="logoSrc">
      </div>
    </el-col>
    <el-col :span="12">
      <el-menu :default-active="$route.meta.rootAuth" class="el-menu-demo" mode="horizontal">
        <router-link class="item" :to="item.children[0].path" v-for="(item,index) in addRouters" :key="item.meta.auth">
          <el-menu-item :index="String(item.meta.auth)">
            <i class="e-nav-icon" :class="item.meta.icon"></i><span>{{item.meta.title}}</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
    <el-col :span="9" style="width:38.5%;">
      <div class="header-basic" align="right">
        <el-badge is-dot class="item">
          <img :src="messageSrc" class="va-image" @click.once="messageClick();">
        </el-badge>
        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="avatarSrc">
            <label class="avatar-name">{{token}}</label>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown" class="nav-dropdown-menu">
           <!-- <router-link :to="{path: '/'}">-->
            <a target='_blank' @click="login()">
              <el-dropdown-item>
                home
              </el-dropdown-item>
            </a>
            <!--</router-link>-->
            <a target='_blank' href="https://github.com/liyihoo/iView-Web">
              <el-dropdown-item>
                github地址
              </el-dropdown-item>
            </a>
            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
  import { mapState,mapGetters } from 'vuex';
  export default {
    name: 'Nav',
    data() {
      return {
        logoSrc: require('@/assets/images/layout/nav/logo.png'),
        messageSrc: require('@/assets/images/layout/nav/message.png'),
        avatarSrc: require('@/assets/images/layout/nav/avatar.png'),
      };
    },
    computed:{
      ...mapState({
        token:state => state.layout.token
      }),
      ...mapGetters([
        'addRouters'
      ])
    },

    methods:{
      login(){
        this.$router.push('/', () => {});
      },
      enter_home(){
        this.$router.push({path:'/home/overview'});
      },
      //退出
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          //In order to re-instantiate the vue-router object to avoid bugs
          location.reload();
        })
      },
      //通知点击事件
      messageClick(){
        let route = this.$route.path;
        if(route == '/message'){
          return false;
        }else {
          this.$router.push('/message')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  #Nav {
    .header-logo{
      .e-image{
        margin: 9px 0;
        width: 152px;
        height: 42px;
        cursor: pointer;
      }
    }
    .el-col {
      .el-menu-demo {
        background-color: #2e3f60;
        display: flex;
        border-width: 0!important;
        > a.item {
          flex: 1;
          text-decoration: none;
          max-width: 104px;
          .el-menu-item {
            color: #fff;
            height: 60px;
            line-height: 56px;
            font-size: 16px;
            text-align: center;
            font-family: PingFangSC-Regular;
            -webkit-transition: 0s height, 0s padding-top, 0s padding-bottom;
            transition: 0s height, 0s padding-top, 0s padding-bottom;
            i.e-nav-icon{
              margin-right: 4px;
              width: 18px;
              height: 18px;
              display: inline-block;
              background-repeat: no-repeat;
              vertical-align: middle;
              background-size: 16px;
              margin-top: 3px;
              &.e-nav-home{
                background-image: url("../../assets/images/layout/nav/main.png");
              }
              &.e-nav-handle{
                background-image: url("../../assets/images/layout/nav/handle.png");
              }
              &.e-nav-emerge{
                background-image: url("../../assets/images/layout/nav/emerge.png");
              }
              &.e-nav-invest{
                background-image: url("../../assets/images/layout/nav/invest.png");
              }
              &.e-nav-report{
                background-image: url("../../assets/images/layout/nav/report.png");
              }
              &.e-nav-system{
                background-image: url("../../assets/images/layout/nav/system.png");
              }
            }
          }
          .el-menu-item:hover, .el-menu-item:focus {
            background-color: #2e3f60;
          }
          .el-menu-item.is-active {
            border-width: 0;
            color: #fff;
            background-color: #5389e0;
          }
        }
      }
    }
    .header-basic{
      height: 60px;
      display: flex;
      text-align: right;
      .el-badge{
        display: inline-block;
        flex: 1;
        margin: 22px 0;
        .va-image{
          cursor: pointer;
          width: 20px;
          height: 20px;
        }
      }
      .avatar-container{
        min-width: 140px;
        margin: 14px 0 14px 14px;
        .avatar-wrapper{
          line-height: 32px;
          color: #fff;
          cursor: pointer;
          outline: none;
          .user-avatar{
            width: 32px;
            height: 32px;
          }
          .avatar-name{
            font-size: 14px;
            cursor: pointer;
            padding: 0 3px;
            font-family: 'PingFangSC-Regular';
          }
        }
      }
    }
  }
</style>
<style lang="less">
  .nav-dropdown-menu{
    top:60px!important;
    font-family: 'PingFangSC-Regular';
    a{
      text-decoration: none;
    }
    .popper__arrow{
      left: 80px!important;
    }
  }
</style>
