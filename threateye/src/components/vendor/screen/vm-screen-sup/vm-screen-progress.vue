<template>
  <div class="vm-screen-progress">
    <div class="item" v-for="(item,index) in progress_data">
      <span class="vam-progress-title">
        <span class="progress-title" :title="item.name">{{item.name}}</span>
      </span>
      <el-progress :color="item.color" :show-text="true"
                   :text-inside="false" :percentage="item.count">
      </el-progress>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'vm-screen-progress',
    /*props:{
      progress_data:{
        type:Array,
        default:[{name:'CPU'},{name:'内存'},{name:'硬盘'}]
      }
    },*/
    data(){
      return{
        progress_data:[{name:'CPU',count:24,color:'#fff'},
          {name:'内存',count:41,color:'#fff'},
          {name:'硬盘',count:35,color:'#fff'}]
      }
    }
  }
</script>

<style scoped lang="less">
  .vm-screen-progress{
    height: auto;
   /* padding: 0 5px;*/
    .item{
      display: flex;
      line-height: 28px;
      .vam-progress-title{
        /*width: 180px;*/
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: left;
        cursor: default;
        .progress-title{
          display: inline-block;
          font-family: PingFang;
          font-size: 14px;
          color: #fff;
          padding: 0 10px 0 0;
        }
      }
      /deep/
      .el-progress{
        flex: 1;
        margin: 4px 0;
        .el-progress-bar{
          .el-progress-bar__outer{
            border-radius: 0;
            background: rgba(255,255,255,0.12);
            .el-progress-bar__inner{
              border-radius: 0;
            }
          }
        }
        .el-progress__text{
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
</style>

