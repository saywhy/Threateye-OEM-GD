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
      <div class="screen-1">
        <div class="list-item" v-if="totalLists.length>0">
          <vm-screen-all :data="totalLists[0]"></vm-screen-all>
        </div>
        <div class="list-item" v-if="totalLists.length>2">
          <vm-screen-all :data="totalLists[2]"></vm-screen-all>
        </div>
        <div class="list-item" v-if="totalLists.length>4">
          <vm-screen-all :data="totalLists[4]"></vm-screen-all>
        </div>
      </div>
      <div class="screen-2">
        <div class="list-item list-item-top">
          <vm-screen-middle0></vm-screen-middle0>
        </div>
        <div class="list-item list-item-middle">
          <header class="title">外连分布<i class="t_img"></i></header>
          <!--<vm-screen-middle1></vm-screen-middle1>-->
        </div>
        <div class="list-item list-item-bottom">

        </div>

      </div>
      <div class="screen-3">
        <div class="list-item" v-if="totalLists.length>1">
          <vm-screen-all :data="totalLists[1]"></vm-screen-all>
        </div>
        <div class="list-item" v-if="totalLists.length>3">
          <vm-screen-all :data="totalLists[3]"></vm-screen-all>
        </div>
        <div class="list-item" v-if="totalLists.length>5">
          <vm-screen-all :data="totalLists[5]"></vm-screen-all>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import draggable from 'vuedraggable';

  import VmScreenAll from './vm-screen/vm-screen-all';
  import VmScreenMiddle0 from './vm-screen/vm-screen-middle0';
  import VmScreenMiddle1 from './vm-screen/vm-screen-middle1';
  import { mapGetters } from 'vuex'

  export default {
    name: "home-screen",
    components: {
      draggable,
      VmScreenAll,
      VmScreenMiddle0,
      VmScreenMiddle1
    },
    data() {
      return {
       /* lists:[{name: '威胁分布', flag: true, aside_id: 0},
          {name: '关注告警', flag: true, aside_id: 1},
          {name: '风险趋势', flag: true, aside_id: 2},
          {name: '全球安全动态', flag: false, aside_id: 3},
          {name: '分支安全', flag: false, aside_id: 4},
          {name: '威胁指标热力图', flag: true, aside_id: 5},
          {name: '外连国家TOP5', flag: true, aside_id: 6},
          {name: '威胁排行', flag: true, aside_id: 7},
          {name: '横向态势威胁', flag: false, aside_id: 8},
          {name: '系统监控状态', flag: false, aside_id: 9}]*/
      }
    },
    computed:{
      ...mapGetters({
        lists:'asideLists'
      }),
      totalLists(){
        return this.lists.filter(item => { return item.flag == true; });
      }
    },
    created(){
      console.log(this.totalLists)
    },
    methods: {
      set_screen() {
        this.$router.push({path: '/screen/set_screen', query: {num: '0'}});
      }
    }
  }
</script>

<style scoped lang="less">
  .home-screen {
    padding: 0 36px;
    background-color: #001034;
    background-image: url("../../../assets/images/screen/bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    overflow-y: auto;
    height: 100vh;

    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 0px;
      /*高宽分别对应横竖滚动条的尺寸*/
      /* border-radius: 6px;*/
    }

    /*&::-webkit-scrollbar-thumb { !*滚动条里面小方块*!
      border-radius: 6px;
      background: #a8a8a8;
      !*background: red;*!
    }

    &::-webkit-scrollbar-track { !*滚动条里面轨道*!
      border-radius: 6px;
      background: #f4f4f4;
    }*/

    .home-top {
      height: 66px;
      display: flex;

      .home_l {
        flex: 1;
        .e_label {
          width: 64px;
          height: 48px;
          margin-top: 16px;
          display: block;
          background-image: url("../../../assets/images/screen/head-logo.png");
          background-repeat: no-repeat;
          background-size: 64px 48px;
        }
      }

      .home_c {
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

      .home_r {
        flex: 1;
        text-align: end;
        font-size: 0;

        /deep/
        .e_btn {
          width: 120px;
          height: 36px;
          line-height: 36px;
          background-size: 120px 36px;
          border-width: 0;
          margin-top: 6px;
          line-height: 0;
          background-color: #001034;
          background-repeat: no-repeat;

          & + .el-button {
            margin-left: 0;
          }

          &.e_btn_set {
            background-image: url("../../../assets/images/screen/head-set.png");
          }

          &.e_btn_full {
            background-image: url("../../../assets/images/screen/head-full.png");
          }
        }
      }
    }

    .home-content {
      display: flex;
      padding: 20px 0;

      .list-item {
        width: 506px;
        height: 310px;
        margin-bottom: 15px;
        background-image: url("../../../assets/images/screen/content-lc.png");
        background-repeat: no-repeat;
        background-size: 506px 310px;
        box-shadow: inset 0 0 12px 6px rgba(0, 122, 255, 0.36);
        border-radius: 16px;

        /*.title {
          font-size: 18px;
          color: #00D7E9;
          text-align: left;
          padding: 14px 16px;
          font-family: PingFangSC-Medium;

          .t_img {
            width: 140px;
            height: 24px;
            margin-left: 6px;
            display: inline-block;
            vertical-align: bottom;
            background-image: url("../../../assets/images/screen/content-bt.png");
            background-repeat: no-repeat;
            background-size: 140px 24px;
          }
        }*/
      }

      .screen-1 {
        flex: 1;

        .list-item {
          float: left;
        }
      }

      .screen-2 {
        .list-item-top {
          width: 800px;
          height: 85px;
          margin-bottom: 15px;
          background-image: url("../../../assets/images/screen/content-top.png");
          background-repeat: no-repeat;
          background-size: 800px 85px;
        }

        .list-item-middle {
          width: 800px;
          height: 534px;
          margin-bottom: 15px;
          background-image: url("../../../assets/images/screen/content-mid.png");
          background-repeat: no-repeat;
          background-size: 800px 534px;
        }

        .list-item-bottom {
          width: 800px;
          height: 310px;
          background-image: url("../../../assets/images/screen/content-bom.png");
          background-repeat: no-repeat;
          background-size: 800px 310px;
        }
      }

      .screen-3 {
        flex: 1;

        .list-item {
          float: right;
        }
      }
    }
  }
</style>
