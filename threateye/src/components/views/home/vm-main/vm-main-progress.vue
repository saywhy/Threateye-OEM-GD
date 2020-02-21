<template>
  <div class="vm-progress-list">
    <div class="item">
      <span class="vam-progress-title">漏洞风险</span>
      <el-progress color="#5389E0" :text-inside="true" :stroke-width="20" :percentage="70"></el-progress>
    </div>
    <div class="item">
      <span class="vam-progress-title">配置风险</span>
      <el-progress color="#5389E0" :text-inside="true" :stroke-width="20" :percentage="60"></el-progress>
    </div>
    <div class="item">
      <span class="vam-progress-title">弱密码</span>
      <el-progress color="#5389E0" :text-inside="true" :stroke-width="20" :percentage="50"></el-progress>
    </div>
    <div class="item">
      <span class="vam-progress-title">明文传输</span>
      <el-progress color="#5389E0" :text-inside="true" :stroke-width="20" :percentage="40"></el-progress>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'vm-progress-list',
    props: {
      option: {
        type: Object,
        default: () => {}
      }
    },
    mounted(){

    }
  }
</script>

<style scoped lang="less">
  .vm-progress-list{
    height: 240px;
    .item{
      display: flex;
      line-height: 60px;
      .vam-progress-title{
        width: 90px;
        padding-right: 10px;
        ont-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        text-align: right;
      }
      .el-progress{
        flex: 1;
      }
    }
  }
</style>
<style lang="less">
.el-progress{
  line-height: 58px;
  .el-progress-bar{
    .el-progress-bar__outer{
      border-radius: 2px;
      background: #F8F8F8;
      .el-progress-bar__inner{
        border-radius: 2px 0 0 2px;
      }
    }
  }
}
</style>
