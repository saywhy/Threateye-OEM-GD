<template>
  <el-container id="dashboard" v-cloak>
    <el-header><Nav></Nav></el-header>
    <el-container class="dashboard-list">
      <el-aside class="dashboard-list-aside"
                :class="{'collapse':isCollapse}"><Aside></Aside>
      </el-aside>
      <div class="dashboard-list-fixed">
        <el-main class="dashboard-list-main" :class="{'collapse':isCollapse}">
          <transition name="slider">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </transition>
        </el-main>
      </div>
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
      padding: 0 24px;
      position: fixed;
      width: 100%;
      z-index: 3000;
      height: 60px!important;
      background-color: #2e3f60;
    }
    .dashboard-list{
      .dashboard-list-aside{
        overflow: inherit;
        position: fixed;
        left: 0;
        top: 60px;
        background-color: #fff;
        width: 210px!important;
        height: calc(100% - 120px);
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
      .dashboard-list-fixed{
        background-color: #c2e7b0;
        top: 60px;
        left: 210px;
        position: fixed;
        width: calc(100% - 210px);
        height: calc(100% - 120px);
        overflow-y: scroll;
        padding: 0;
        margin: 0;
        &::-webkit-scrollbar {/*滚动条整体样式*/
          width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 800px;
          border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 6px;
          background: #c1c1c1;
        }
        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          border-radius: 6px;
          background: #F8F8F8;
        }
      }
      .dashboard-list-main{
        padding: 0;
        background-color: #f4f4f4;
        min-height: 900px;
        &.collapse{
          margin-left: 56px!important;
        }
      }
    }
    .el-footer{
      position: fixed;
      left: 0;
      bottom: 0;
      background-color: #ececec;
      height: 60px!important;
      line-height: 60px;
      color: #999;
      font-size: 16px;
      width: 100%;
      z-index: 1001;
      font-family: PingFangSC-Regular;
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

