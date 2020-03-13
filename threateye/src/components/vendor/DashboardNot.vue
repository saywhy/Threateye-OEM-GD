<template>
  <el-container id="DashboardNot" v-cloak>
    <el-header><Nav></Nav></el-header>
    <el-container class="dashboard-list">
      <el-main class="dashboard-list-main">
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
  export default {
    name: 'DashboardNot',
    components: {
      Nav,
      Aside,
      Main
    }
  }
</script>

<style scoped lang="less">
  #DashboardNot {
    .el-header{
      background-color: #2e3f60;
      padding: 0 24px;
      position: fixed;
      width: 100%;
      z-index: 1000;
      height: auto!important;
    }

    .dashboard-list{
      margin-top: 60px;
      min-height: 900px;
      margin-bottom: 60px;
      .dashboard-list-main{
        padding: 0;
        margin-left: 0;
        background-color: #f4f4f4;
        min-height: 900px;
      }
    }
    .el-footer{
      background-color: #ececec;
      height: 60px!important;
      line-height: 60px;
      font-family: PingFangSC-Regular;
      color: #999;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      font-size: 16px;
      z-index: 1001;
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
