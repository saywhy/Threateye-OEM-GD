<template>
    <div class="vm-screen-main7">
      <div class="vm-progress-list">
        <div class="item" v-for="(item,index) in progress_data_list">
      <span class="vam-progress-title">
        <!--<img class="progress-img" src="../../../../assets/images/screen/outer/{{item.img}}.png">-->
        <span class="progress-title">{{item.name}}&nbsp;&nbsp;{{item.num}}</span>
      </span>
          <el-progress :color="item.color" :show-text="false" :text-inside="true"
                       :stroke-width="20" :percentage="item.count">
          </el-progress>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-main7",
      data(){
          return{
            progress_data_list:[{img:'progress0',name:'英国',num:2431,count:70},
              {img:'progress0',name:'美国',num:1687,count:60},
              {img:'progress0',name:'法国',num:1496,count:50},
              {img:'progress0',name:'德国',num:1069,count:30},
              {img:'progress0',name:'意大利',num:998,count:20}]
          }
      },
      mounted() {
        //this.drawGraph();
      },
      methods:{

      }
    }
</script>

<style scoped lang="less">
.vm-screen-main7{
  padding: 0 16px 16px;
  .vm-progress-list{
    height: auto;
    .item{
      display: flex;
      line-height: 45px;
      .vam-progress-title{
        width: 140px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: left;
        cursor: default;
        .progress-title{
          display: inline-block;
          font-family: PingFang;
          font-size: 14px;
          color: #ffffff;
          margin: 0 20px 0 0;

        }
      }
      /deep/
      .el-progress{
        flex: 1;
        margin: 8px 0;
        .el-progress-bar{
          .el-progress-bar__outer{
            border-radius: 2px;
            background: rgba(0,215,233,0.12);
            .el-progress-bar__inner{
              border-radius: 2px 0 0 2px;
              opacity: 1;
              background: linear-gradient(270deg, #00D7E9 0%, #007AFF 100%);
             /* background-image: linear-gradient(270deg, #00D7E9 0%, #007AFF 100%);*/
            }
          }
        }
      }
    }
  }
}
</style>
