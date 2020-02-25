<template>
  <el-container id="dashboard" v-cloak>
    <el-header><Nav></Nav></el-header>
    <el-container class="dashboard-list">
      <el-aside class="dashboard-list-aside" :class="{'collapse':isCollapse}"><Aside></Aside>
      </el-aside>
      <el-main class="dashboard-list-main" :class="{'collapse':isCollapse}">
        <transition name="slider">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
    <el-footer>虎特信息科技（上海）有限公司  版权所有</el-footer>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import Nav from '@/components/layout/Nav'
  import Aside from '@/components/layout/aside/Index'
  import Main from '@/components/layout/Main'

  import {mapState} from 'vuex'
  export default {
    name: 'Dashboard',
    data(){
      return{
        toggleAside: true,
        asideFlag:true
      }
    },
    computed: {
      ...mapState({
        isCollapse:state => state.layout.isCollapse
      }),
    },
    components: {
      Nav,
      Aside,
      Main
    },
    /*created(){
      console.log(this.$route.meta.asideFlag)
      let asideFlag = this.$route.meta.asideFlag;
      console.log(undefined == undefined)
      asideFlag == (asideFlag == undefined)? true: asideFlag;

      console.log(asideFlag)
      this.asideFlag = asideFlag;
    },*/
  }
</script>

<style scoped lang="less">
  #dashboard {
    .el-header{
      background-color: #2e3f60;
      padding: 0 24px;
      position: fixed;
      width: 100%;
      z-index: 9999;
      height: auto!important;
    }
    .dashboard-list{
      margin-top: 60px;
      min-height: 900px;
      .dashboard-list-aside{
        overflow: inherit;
        position: fixed;
        left: 0;
        top: 60px;
        width: 210px;
        &.collapse {
          width: 56px!important;
          #aside{
            width: 100%;
            /deep/
            .el-menu--collapse{
              width: 100%;
              .aside-item{
                .item{
                  .el-menu-item{
                    .el-tooltip{
                      padding: 0 20px!important;
                    }
                  }
                }
                .el-submenu{
                  .el-submenu__title{
                    padding-left: 20px!important;
                  }
                }
              }
            }
          }
        }
      }
      .dashboard-list-main{
        padding: 0;
        margin-left: 210px;
        background-color: #f4f4f4;
        min-height: 900px;
        &.collapse{
          margin-left: 56px!important;
        }
      }
    }
    .el-footer{
      background-color: #ececec;
      height: 60px!important;
      line-height: 60px;
      font-family: PingFangSC-Regular;
      color: #999;
      z-index: 1001;
      font-size: 16px;
    }
  }
  .slider-enter{
    opacity: 0;
    transform: translateX(100px);
  }
  .slider-enter-active{
    transition: all .3s ease;
  }
</style>

