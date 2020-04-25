<template>
  <div class="home-screen">
    <div class="home-top">
      <div class="home_l">
        <label class="e_label"></label>
      </div>
      <div class="home_c">
        iView态势感知系统
      </div>
      <div class="home_r">
        <el-button type="primary" class="e_btn e_btn_set" @click="set_screen();">设置</el-button>
        <el-button type="primary" class="e_btn e_btn_full">全屏</el-button>
      </div>
    </div>
    <div class="home-content">
      <div class="screen-1" >
        <div class="list-item">
          <header class="title">威胁分布<i class="t_img"></i></header>
          <vm-screen-left0></vm-screen-left0>
        </div>
        <div class="list-item">
          <header class="title">全球安全动态<i class="t_img"></i></header>
          <vm-screen-left1></vm-screen-left1>
        </div>
        <div class="list-item">
          <header class="title">分支安全<i class="t_img"></i></header>
          <vm-screen-left2></vm-screen-left2>
        </div>
        <div class="list-item">
          <header class="title">关注告警<i class="t_img"></i></header>
          <vm-screen-left3></vm-screen-left3>
        </div>
        <div class="list-item">
          <header class="title">风险趋势<i class="t_img"></i></header>
          <vm-screen-left4></vm-screen-left4>
        </div>
      </div>
      <div class="screen-2">
        <div class="list-item list-item-top">
          <vm-screen-middle0></vm-screen-middle0>
        </div>
        <div class="list-item list-item-middle">
          <header class="title">外连分布<i class="t_img"></i></header>
          <vm-screen-middle1></vm-screen-middle1>
        </div>
        <div class="list-item list-item-bottom">

        </div>

      </div>
      <div class="screen-3">
        <div class="list-item">
          <header class="title">威胁指标热力图<i class="t_img"></i></header>
          <vm-screen-right0></vm-screen-right0>
        </div>
        <div class="list-item">
          <header class="title">横向威胁态势<i class="t_img"></i></header>
          <vm-screen-right1></vm-screen-right1>
        </div>
        <div class="list-item">
          <header class="title">系统状态监控<i class="t_img"></i></header>
          <vm-screen-right2></vm-screen-right2>
        </div>
        <div class="list-item">
          <header class="title">外连国家TOP5<i class="t_img"></i></header>
          <vm-screen-right3></vm-screen-right3>
        </div>
        <div class="list-item">
          <header class="title">威胁排行<i class="t_img"></i></header>
          <vm-screen-right4></vm-screen-right4>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import draggable from 'vuedraggable';
  import VmScreenLeft0 from './vm-screen/vm-screen-left0';
  import VmScreenLeft1 from './vm-screen/vm-screen-left1';
  import VmScreenLeft2 from './vm-screen/vm-screen-left2';
  import VmScreenLeft3 from './vm-screen/vm-screen-left3';
  import VmScreenLeft4 from './vm-screen/vm-screen-left4';
  import VmScreenMiddle0 from './vm-screen/vm-screen-middle0';
  import VmScreenMiddle1 from './vm-screen/vm-screen-middle1';
  import VmScreenRight0 from './vm-screen/vm-screen-right0';
  import VmScreenRight1 from './vm-screen/vm-screen-right1';
  import VmScreenRight2 from './vm-screen/vm-screen-right2';
  import VmScreenRight3 from './vm-screen/vm-screen-right3';
  import VmScreenRight4 from './vm-screen/vm-screen-right4';
  export default {
    name: "home-screen",
    components: {
      draggable,
      VmScreenLeft0,
      VmScreenLeft1,
      VmScreenLeft2,
      VmScreenLeft3,
      VmScreenLeft4,
      VmScreenMiddle0,
      VmScreenMiddle1,
      VmScreenRight0,
      VmScreenRight1,
      VmScreenRight2,
      VmScreenRight3,
      VmScreenRight4
    },
    data() {
      return {

      }
    },
    methods: {
      set_screen(){
        this.$router.push({path:'/screen/set/top'});
      }
    }
  }
</script>

<style scoped lang="less">
.home-screen{
  padding: 0 36px;
  background-color: #001034;
  background-image: url("../../../assets/images/screen/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  .home-top{
    height: 66px;
    display: flex;
    .home_l{
      flex: 1;
      .e_label{
        width: 64px;
        height: 48px;
        margin-top: 16px;
        display: block;
        background-image: url("../../../assets/images/screen/head-logo.png");
        background-repeat: no-repeat;
        background-size: 64px 48px;
      }
    }
    .home_c{
      font-family: PingFangSC-Medium;
      font-size: 24px;
      color: #FFFFFF;
      line-height: 60px;
      width: 1320px;
      background-image: url("../../../assets/images/screen/head-center.png");
      background-repeat: no-repeat;
      background-size: 1320px 60px;
      background-position: 0 6px;
    }
    .home_r{
      flex: 1;
      text-align: end;
      font-size: 0;
      /deep/
      .e_btn{
        width: 120px;
        height: 36px;
        line-height: 36px;
        background-size: 120px 36px;
        border-width: 0;
        margin-top: 6px;
        line-height: 0;
        background-color: #001034;
        background-repeat: no-repeat;
        &+.el-button{
          margin-left: 0;
        }
        &.e_btn_set{
          background-image: url("../../../assets/images/screen/head-set.png");
        }
        &.e_btn_full{
          background-image: url("../../../assets/images/screen/head-full.png");
        }
      }
    }
  }
  .home-content{
    display: flex;
    padding: 20px 0;
    .list-item{
      width: 506px;
      height: 310px;
      margin-bottom: 15px;
      background-image: url("../../../assets/images/screen/content-lc.png");
      background-repeat: no-repeat;
      background-size: 506px 310px;
      box-shadow: inset 0 0 12px 6px rgba(0,122,255,0.36);
      border-radius: 16px;
      .title{
        font-size: 18px;
        color: #00D7E9;
        text-align: left;
        padding: 14px 16px;
        font-family: PingFangSC-Medium;
        .t_img{
          width: 140px;
          height: 24px;
          margin-left: 6px;
          display: inline-block;
          vertical-align: bottom;
          background-image: url("../../../assets/images/screen/content-bt.png");
          background-repeat: no-repeat;
          background-size: 140px 24px;
        }
      }
    }
    .screen-1{
      flex: 1;
      .list-item{
        float: left;
      }
    }
    .screen-2{
      .list-item-top{
        width: 800px;
        height: 85px;
        margin-bottom: 15px;
        background-image: url("../../../assets/images/screen/content-top.png");
        background-repeat: no-repeat;
        background-size: 800px 85px;
      }
      .list-item-middle{
        width: 800px;
        height: 534px;
        margin-bottom: 15px;
        background-image: url("../../../assets/images/screen/content-mid.png");
        background-repeat: no-repeat;
        background-size: 800px 534px;
      }
      .list-item-bottom{
        width: 800px;
        height: 310px;
        background-image: url("../../../assets/images/screen/content-bom.png");
        background-repeat: no-repeat;
        background-size: 800px 310px;
      }
    }
    .screen-3{
      flex: 1;
      .list-item{
        float: right;
      }
    }
  }
}
</style>
