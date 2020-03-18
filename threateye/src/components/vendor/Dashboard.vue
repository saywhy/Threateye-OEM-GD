<template>
  <el-container id="dashboard"
                v-cloak>
    <el-header>
      <Nav></Nav>
    </el-header>
    <el-container class="dashboard-list">
      <el-aside class="dashboard-list-aside"
                :class="{'collapse':isCollapse}">
        <Aside></Aside>
      </el-aside>
      <el-main class="dashboard-list-main"
               :class="{'collapse':isCollapse}">
        <transition name="slider">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
    <el-footer>©虎特信息科技（上海）有限公司  版权所有</el-footer>
  </el-container>
</template>

<script type="text/ecmascript-6">
import Nav from '@/components/layout/Nav'
import Aside from '@/components/layout/aside/Index'
import Main from '@/components/layout/Main'
import { mapState } from 'vuex'
export default {
  name: 'Dashboard',
  data () {
    return {
      toggleAside: true,
      asideFlag: true
    }
  },
  computed: {
    ...mapState({
      isCollapse: state => state.layout.isCollapse
    }),
  },
  components: {
    Nav,
    Aside,
    Main
  }
}
</script>

<style scoped lang="less">
#dashboard {
  .el-header {
    background-color: #2e3f60;
    padding: 0 24px;
    position: fixed;
    width: 100%;
    z-index: 99999999;
    height: auto !important;
  }

  .dashboard-list {
    margin-top: 60px;
    min-height: 900px;
    margin-bottom: 60px;
    .dashboard-list-aside {
      overflow: inherit;
      position: fixed;
      left: 0;
      top: 60px;
      width: 210px !important;
      &.collapse {
        width: 56px !important;
        #aside {
          width: 100%;
          /deep/ .el-menu--collapse {
            width: 100%;
            .aside-item {
              .item {
                .el-menu-item {
                  .el-tooltip {
                    padding: 0 20px !important;
                  }
                }
              }
              .el-submenu {
                .el-submenu__title {
                  padding-left: 20px !important;
                }
              }
            }
          }
        }
      }
    }
    .dashboard-list-main {
      padding: 0;
      margin-left: 210px;
      background-color: #f4f4f4;
      min-height: 900px;
      &.collapse {
        margin-left: 56px !important;
      }
    }
  }
  .el-footer {
    background-color: #ececec;
    height: 60px !important;
    line-height: 60px;
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

