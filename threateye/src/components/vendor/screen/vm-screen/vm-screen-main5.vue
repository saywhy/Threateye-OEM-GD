<template>
  <div class="vm-screen-main5">
    <div class="state-top">
        <span class="t-info t-info_0">
          <i class="t-arrow"></i><span class="t-name">预警：10</span>
        </span>
      <span class="t-info t-info_1">
          <i class="t-arrow"></i><span class="t-name">健康：24</span>
        </span>
      <span class="t-info t-info_2">
          <i class="t-arrow"></i><span class="t-name">离线：0</span>
        </span>
    </div>
    <div class="state-content">
      <div class="item item0">
        <h3 class="item_fs0">引擎/探针</h3>
        <div class="item_fs1">
          <i class="t_fork"></i>
          <span class="t_name">192.168.191.24</span>
        </div>
        <vm-screen-progress></vm-screen-progress>
        <div class="item_fs2">
          <i class="t_aw t-aw_1"></i><span class="t-name">42B</span>
          <i class="t_aw t-aw_2"></i><span class="t-name">12.52MB</span>
        </div>
      </div>
      <div class="item item1">
        <h3 class="item_fs0">引擎/探针</h3>
        <div class="item_fs1">
          <i class="t_fork"></i>
          <span class="t_name">192.168.191.24</span>
        </div>
        <vm-screen-progress></vm-screen-progress>
        <div class="item_fs2">
          <i class="t_aw t-aw_1"></i><span class="t-name">42B</span>
          <i class="t_aw t-aw_2"></i><span class="t-name">12.52MB</span>
        </div>
      </div>
      <div class="item item3">
        <img class="t_disabled" src="../../../../assets/images/screen/system/disabled.png">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VmScreenProgress from '../vm-screen-sup/vm-screen-progress';
  export default {
    name: "vm-screen-main5",
    components: {VmScreenProgress},
    data(){
      return{
        data:[]
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
  .vm-screen-main5{
    padding: 0 16px 16px;
    .state-top{
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: left;
      .t-info{
        margin-right: 20px;
        .t-arrow{
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-right: 8px;
          background-size: 14px;
          vertical-align: inherit;
        }
        .t-name{
          font-family: PingFangSC-Regular;
          font-size: 14px;
        }
        &.t-info_0{
          .t-arrow{
            background-image: url("../../../../assets/images/screen/system/arrow0.png");
          }
          .t-name{
            color: #D0A13F;
          }
        }
        &.t-info_1{
          .t-arrow{
            background-image: url("../../../../assets/images/screen/system/arrow1.png");
          }
          .t-name{
            color: #60C160;
          }
        }
        &.t-info_2{
          .t-arrow{
            background-image: url("../../../../assets/images/screen/system/arrow2.png");
          }
          .t-name{
            color: #D44361;
          }
        }
      }
    }
    .state-content{
      height: 200px;
      display: flex;
      margin: 4px 0;
      justify-content:space-between;
      .item{
        width: 156px;
        height: 198px;
        padding: 0 5px;
        background-repeat: no-repeat;
        background-size: 156px 198px;
        &.item0{
          background-image: url("../../../../assets/images/screen/system/bg0.png");
        }
        &.item1{
          background-image: url("../../../../assets/images/screen/system/bg1.png");
        }
        &.item2{
          background-image: url("../../../../assets/images/screen/system/bg2.png");
        }
        &.item3{
          background-image: url("../../../../assets/images/screen/system/bg3.png");
          .t_disabled{
            width: 48px;
            height: 48px;
            margin: 75px 0;
          }
        }
        .item_fs0{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #FFFFFF;
          line-height: 40px;
          height: 40px;
        }
        .item_fs1{
          height: 30px;
          .t_fork{
            width: 18px;
            height: 18px;
            display: inline-block;
            background-image: url("../../../../assets/images/screen/system/fs.png");
            background-repeat: no-repeat;
            background-size: 18px;
            vertical-align: bottom;
          }
          .t_name{
            ont-family: PingFangSC-Regular;
            font-size: 12px;
            color: #FFFFFF;
            line-height: 14px;
          }
        }
        .item_fs2{
          margin: 5px 0;
          .t_aw{
            width: 12px;
            height: 24px;
            display: inline-block;
            background-repeat: no-repeat;
            vertical-align: bottom;
            background-size: 12px 24px;
            &.t-aw_1{
              background-image: url("../../../../assets/images/screen/system/aw1.png");
            }
            &.t-aw_2{
              background-image: url("../../../../assets/images/screen/system/aw2.png");
            }
          }
          .t-name{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #FFFFFF;
          }
        }
      }
    }
  }
</style>
