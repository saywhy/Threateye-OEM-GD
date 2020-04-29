<template>
  <el-container class="screen-set" v-cloak>
    <el-aside class="set-aside">
      <div class="set-aside-top">
        <el-link @click="back_router()">
          <i class="el-icon-arrow-left el-icon--right"></i>
          <span class="back">返回大屏</span>
        </el-link>
      </div>
      <el-menu :default-active="defaultIndex"
               class="set-aside-menu"
               @open="handleOpen"
               @close="handleClose">
        <el-submenu index="-1">
          <template slot="title">
            <i class="e-aside-screen-set"></i>
            <span slot="title">大屏设置</span>
          </template>
        </el-submenu>
        <div class="aside-item">
          <el-menu-item index="0" @click="change_router('0')">基本内容设置</el-menu-item>
        </div>
        <div class="aside-item">
          <el-menu-item index="1" @click="change_router('1')">两侧内容设置</el-menu-item>
          <vuedraggable class="menu-list" v-model="setAsideLists" v-show="defaultIndex == 1">
            <transition-group>
              <div v-for="(item,$index) in setAsideLists" :key="item.aside_id" class="item">
                <span class="title">{{item.name}}</span>
                <button class="bt" :class="{'active':item.flag}" @click="click_aside(item.aside_id);">
                  <span v-show="!item.flag">添加</span>
                  <span v-show="item.flag">已添加</span>
                </button>
              </div>
            </transition-group>
          </vuedraggable>
        </div>
        <div class="aside-item">
          <el-menu-item index="2" @click="change_router('2')">顶部指标设置</el-menu-item>
          <ul class="menu-list" v-show="defaultIndex == 2">
            <li class="item" v-for="(item,$index) in topList">
              <span class="title">{{item.name}}</span>
              <button class="bt" :class="{'active':!item.flag}">已添加</button>
            </li>
          </ul>
        </div>
      </el-menu>
    </el-aside>

    <el-container class="set-container">
      <el-header class="set-header">
        <h3 class="title">两侧内容设置</h3>
        <div class="btn-group">
          <el-button class="btn btn_cacel" @click="click_screen_cancel();">取消</el-button>
          <el-button class="btn btn_ok" @click="click_screen_ok();">确认</el-button>
        </div>
      </el-header>
      <el-main class="set-main">
        <div class="set-main-list">
          <!--<transition name="slider">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </transition>-->
          {{asideLists}}
          <br/>
          {{setAsideLists}}
          <br/>
        </div>
      </el-main>
    </el-container>
    <el-footer class="set-footer">©虎特信息科技（上海）有限公司 版权所有</el-footer>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import vuedraggable from 'vuedraggable';
  import {mapGetters} from 'vuex'

  export default {
    name: "screen-set",
    data() {
      return {
        defaultIndex: "0",
        oldAsideLists: [],
        topList: [{name: '风险资产数', flag: true},
          {name: '外连资产数', flag: true},
          {name: '告警数', flag: true},
          {name: '未处理告警数', flag: false},
          {name: '风险服务器数', flag: false},
          {name: '风险终端数', flag: false},
          {name: '风险网络设备数', flag: false}]
      }
    },
    computed: {
      ...mapGetters(['asideLists'])
    },
    created() {
      let num = this.$route.query.num;
      this.defaultIndex = num;

      //拷贝
      let asideLists = this.asideLists;
      this.setAsideLists = asideLists;

    },
    updated() {
      console.log(this.setAsideLists);
    },
    components: {vuedraggable},
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //返回大屏
      back_router() {
        this.$router.push({path: '/screen'});
      },
      //两侧内容添加点击
      click_aside(id) {
        let attr = this.setAsideLists
          .filter(item => {return item.flag == true});

        if (attr.length < 6) {
          this.$store.commit('SCREEN_ASIDE_FLAG', id);
        } else {
          this.$message.warning('两侧内容最多只能添加6条.');
        }
      },
      //侧边栏tabs切换
      change_router(index) {
        if (index == '0') {
          this.$router.push({path: '/screen/set/base', query: {num: index}});
        } else if (index == '1') {
          this.$router.push({path: '/screen/set/aside', query: {num: index}});
        } else if (index == '2') {
          this.$router.push({path: '/screen/set/top', query: {num: index}});
        }
      },

      //取消按钮点击
      click_screen_cancel() {
        this.$store.commit('SCREEN_ASIDE_LISTS', this.oldAsideLists);
        this.setAsideLists = this.oldAsideLists;
      },
      //确认按钮点击
      click_screen_ok() {
        this.$store.commit('SCREEN_ASIDE_LISTS', this.setAsideLists);
        this.$router.push({path: '/screen'});
      }
    }
  }
</script>

<style scoped lang="less">
  .screen-set {
    /deep/
    .set-aside {
      width: 250px !important;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      .set-aside-top {
        width: 100%;
        height: 56px;
        line-height: 56px;
        text-align: left;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
        font-weight: bold;
        padding: 0 16px;

        /deep/
        .el-link {
          &.el-link--default {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #999999;

            &:hover {
              color: #999999;
              border-width: 0;
            }

            &:after {
              border-width: 0;
            }
          }

          .back {
            margin-left: 0;
          }
        }
      }

      .set-aside-menu {
        position: inherit;
        border-width: 0;

        .el-submenu {
          .el-submenu__title {
            padding: 0 16px !important;
            text-align: left;
            overflow: hidden;

            .e-aside-screen-set {
              width: 18px;
              height: 18px;
              display: inline-block;
              background-repeat: no-repeat;
              vertical-align: middle;
              background-size: 16px;
              background-image: url("../../../../assets/images/layout/aside/default/big.png");
            }

            .el-icon-arrow-down {
              display: none;
            }
          }
        }

        .el-menu-item {
          height: 56px;
          font-size: 14px;
          color: #333;
          display: block;
          text-align: left;
          padding: 0 16px 0 44px;
          cursor: pointer;
          width: 250px;
          position: relative;

          &.is-active {
            color: #fff;
            background-color: #0070ff;
            -webkit-transition: 0s height, 0s padding-top, 0s padding-bottom;
            transition: 0s height, 0s padding-top, 0s padding-bottom;

            &:after {
              content: "";
              display: block;
              width: 0px;
              height: 0px;
              border-top: 8px solid transparent;
              border-bottom: 8px solid transparent;
              border-left: 8px solid #0070FF;
              position: absolute;
              top: 20px;
              right: -8px;
              z-index: 999;
            }
          }
        }

        .menu-list {
          padding: 6px 16px;

          .item {
            margin: 6px 0;
            width: 218px;
            height: 44px;
            border: 1px solid #ECECEC;
            padding: 10px 8px;
            line-height: 1;

            .title {
              float: left;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #333333;
            }

            .bt {
              float: right;
              width: 64px;
              height: 24px;
              line-height: 24px;
              outline: none;
              border-width: 0;
              background: #5389E0;
              color: #fff;
              border-radius: 2px;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              text-align: center;
              cursor: pointer;

              &.active {
                background: #ECECEC;
                color: #BBBBBB;
                cursor: not-allowed;
              }
            }
          }
        }
      }
    }

    /deep/
    .set-container {
      margin-left: 250px;
      margin-top: 56px;
      width: calc(100vw - 250px);
      height: calc(100vh - 120px);

      .set-header {
        height: 56px !important;
        line-height: 56px !important;
        padding: 0 56px 0 16px;
        position: fixed;
        top: 0;
        left: 250px;
        z-index: 1000;
        background-color: #fff;
        width: calc(100vw - 250px);

        .title {
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          text-align: left;
          float: left;
        }

        .btn-group {
          float: right;

          /deep/
          .btn {
            margin: 9px 0;
            border: 1px solid #0070FF;
            width: 136px;
            height: 38px;
            line-height: initial;
            border-radius: 0;
            font-size: 16px;
            padding: 0;
            font-family: PingFangSC-Regular;

            &.btn_cacel {
              background: #fff;
              color: #0070FF;
            }

            &.btn_ok {
              background: #0070FF;
              color: #FFFFFF;
            }
          }
        }
      }

      .set-main {
        /*height: calc(100vh - 120px);*/
       /* background: #00113c;*/
        padding: 0;
        /*height: calc(100vh + 220px);*/
        overflow-y: auto;

        .set-main-list {
          zoom: 0.86;
        }
      }
    }

    /deep/
    .set-footer {
      background-color: #ececec;
      height: 64px !important;
      line-height: 64px !important;
      font-family: PingFangSC-Regular;
      color: #999;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      font-size: 16px;
      z-index: 999;
    }
  }

  .slider-enter {
    opacity: 0;
    transform: translateX(100px);
  }

  .slider-enter-active {
    transition: all 0.3s ease;
  }
</style>
