<template>
  <div class="vm-progress-list-handle">
    <div class="item">
      <span class="vam-progress-title">
         <img class="progress-img" src="../../../../assets/images/handle/risks/enlish.png">
        <span class="progress-title">IP: 121.148.48.233</span>
      </span>
      <el-progress color="#0288D1" :show-text="false" :text-inside="true" :stroke-width="20" :percentage="70"></el-progress>
    </div>
    <div class="item">
     <span class="vam-progress-title">
         <img class="progress-img" src="../../../../assets/images/handle/risks/enlish.png">
        <span class="progress-title">IP: 121.148.48.233</span>
      </span>
      <el-progress color="#CDDC39" :show-text="false" :text-inside="true" :stroke-width="20" :percentage="60"></el-progress>
    </div>
    <div class="item">
      <span class="vam-progress-title">
         <img class="progress-img" src="../../../../assets/images/handle/risks/enlish.png">
        <span class="progress-title">IP: 121.148.48.233</span>
      </span>
      <el-progress color="#4CAF50" :show-text="false" :text-inside="true" :stroke-width="20" :percentage="74"></el-progress>
    </div>
    <div class="item">
      <span class="vam-progress-title">
         <img class="progress-img" src="../../../../assets/images/handle/risks/enlish.png">
        <span class="progress-title">IP: 121.148.48.233</span>
      </span>
      <el-progress color="#00BCD4" :show-text="false" :text-inside="true" :stroke-width="20" :percentage="40"></el-progress>
    </div>
    <div class="item">
      <span class="vam-progress-title">
         <img class="progress-img" src="../../../../assets/images/handle/risks/enlish.png">
        <span class="progress-title">IP: 121.148.48.233</span>
      </span>
      <el-progress color="#F57C00" :show-text="false" :text-inside="true" :stroke-width="20" :percentage="40"></el-progress>
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
  .vm-progress-list-handle{
    height: auto;
    .item{
      display: flex;
      line-height: 45px;
      .vam-progress-title{
        .progress-img{
          display: inline-block;
          width: 36px;
          height: 24px;
          margin: 10px 0;
        }
        .progress-title{
          display: inline-block;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          margin: 0 20px 0 10px;
        }
      }
      /deep/
      .el-progress{
        flex: 1;
        margin: 8px 0;
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
    }
  }
</style>

