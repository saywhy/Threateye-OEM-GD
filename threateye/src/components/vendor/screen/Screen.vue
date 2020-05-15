<template>
  <div class="home-screen" :class="{'active':!close}">
    <div class="home-top">
      <div class="home_l">
        <label class="e_label"></label>
      </div>
      <div class="home_c">
        {{threatEyeName}}
      </div>
      <div class="home_r">
        <button type="primary" class="e_btn e_btn_set" @click="set_screen();">
          <i class="h_img h_setting"></i><span class="t_title">设置</span></button>
        <button type="primary" class="e_btn e_btn_full" @click="full_screen();">
          <i class="h_img h_all"></i><span class="t_title">全屏</span></button>
      </div>
    </div>
    <div class="home-content">
      <div class="screen-1">
        <div class="list-item" :class="{'active':!close}" v-if="totalLists.length>0">
          <vm-screen-all :data="totalLists[0]" :close="close"></vm-screen-all>
        </div>
        <div class="list-item" :class="{'active':!close}" v-if="totalLists.length>2">
          <vm-screen-all :data="totalLists[2]" :close="close"></vm-screen-all>
        </div>
        <div class="list-item" :class="{'active':!close}" v-if="totalLists.length>4">
          <vm-screen-all :data="totalLists[4]" :close="close"></vm-screen-all>
        </div>
      </div>
      <div class="screen-2">
        <div class="list-item list-item-top" :class="{'active':!close}">
          <vm-screen-middle0 :data="totalTopLists" :close="topClose"></vm-screen-middle0>
        </div>
        <div class="list-item list-item-middle" :class="{'active':!close}">
          <header class="title">外连分支<i class="t_img"></i></header>
         <!-- <vm-screen-middle1></vm-screen-middle1>-->
        </div>
        <div class="list-item list-item-bottom" :class="{'active':!close}">
          <header class="title">实时流量统计<i class="t_img"></i></header>
        </div>
      </div>
      <div class="screen-3">
        <div class="list-item" :class="{'active':!close}" v-if="totalLists.length>1">
          <vm-screen-all :data="totalLists[1]" :close="close"></vm-screen-all>
        </div>
        <div class="list-item" :class="{'active':!close}" v-if="totalLists.length>3">
          <vm-screen-all :data="totalLists[3]" :close="close"></vm-screen-all>
        </div>
        <div class="list-item" :class="{'active':!close}" v-if="totalLists.length>5">
          <vm-screen-all :data="totalLists[5]" :close="close"></vm-screen-all>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import draggable from 'vuedraggable';

  import screenfull from 'screenfull';

  import VmScreenAll from './vm-screen/vm-screen-all';
  import VmScreenMiddle0 from './vm-screen/vm-screen-middle0';
  import VmScreenMiddle1 from './vm-screen/vm-screen-middle1';
  import { mapGetters } from 'vuex'
  export default {
    name: "home-screen",
    props:{
      close:{
        type: Boolean,
        default: true,
      },
      topClose:{
        type: Boolean,
        default: true,
      }
    },
    components: {
      draggable,
      VmScreenAll,
      VmScreenMiddle0,
      VmScreenMiddle1
    },
    data() {
      return {
        isFullscreen: false,
        threatEyeName:''
      }
    },

    computed:{
      ...mapGetters({
        lists:'asideLists',
        topLists:'topLists'
      }),
      totalLists(){
        return this.lists.filter(item => { return item.flag == true; });
      },
      totalTopLists(){
        return this.topLists.filter(item => { return item.flag == true; });
      }
    },
    created() {
      this.getName();
    },
    mounted() {
      window.onresize = () => {
        // 全屏下监控是否按键了ESC
        if (!this.checkFull()) {
          // 全屏下按键esc后要执行的动作
          this.isFullscreen = false
        }
      }
    },
    methods: {
      //获取大屏名称
      getName (){
        this.$axios
          .get('/yiiapi/demonstration/get-screen-name')

          .then((resp) => {

            let {status, data} = resp.data;

            if(status == 0){
              this.threatEyeName = data.ScreenName;
            }
          })
          .catch((error) => {

            console.log(error);

          });
      },

      //设置
      set_screen() {
        this.$router.push({path: '/screen/set/base', query: {num: '0'}});
      },
      //全屏
      full_screen() {
     /*   if (screenfull.enabled) {
          this.$message({
            message: 'Your browser does not work',
            type: 'warning'
          })
          return false
        }*/
        screenfull.toggle()
        this.isFullscreen = true
      },
      /**
       * 是否全屏并按键ESC键的方法
       */
      checkFull() {
        var isFull = document.fullscreenEnabled ||
          window.fullScreen || document.webkitIsFullScreen ||
          document.msFullscreenEnabled
        // to fix : false || undefined == undefined
        if (isFull === undefined) {
          isFull = false
        }
        return isFull
      }
    }
  }
</script>

<style scoped lang="less">
  .home-screen {
    padding: 0 36px;
   /* background-color: #001034;*/
    background-color: rgba(0,16,52,.9);
    background-image: url("../../../assets/images/screen/bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    overflow-y: auto;
    height: 100vh;
    &.active{
      padding: 0 24px;
    }
    &::-webkit-scrollbar {
      width: 0;
    }
    .home-top {
      height: 80px;
      display: flex;
      margin-top: 15px;
      .home_l {
        flex: 1;
        .e_label {
          width: 64px;
          height: 48px;
          margin-top: 6px;
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
        background-size: 1320px 50px;
        background-position: 0 6px;
      }
      .home_r {
        flex: 1;
        text-align: end;
        font-size: 0;
        /deep/
        .e_btn {
          width: 132px;
          height: 36px;
          background-size: 132px 36px;
          border-width: 0;
          line-height: inherit;
          color: #fff;
          outline: none;
          background-color: transparent;
          background-repeat: no-repeat;
          font-family: PingFangSC-Regular;
          font-size: 12.47px;
          vertical-align: text-top;
          /*box-shadow: inset 0 0 11px 5px rgba(0,122,255,0.36);*/
          & + .el-button {
            margin-left: 0;
          }
          &.e_btn_set {
            margin-top: 6px;
            margin-right: -8px;
            background-image: url("../../../assets/images/screen/head-set.png");
          }
          &.e_btn_full {
            margin-top: 5px;
            background-image: url("../../../assets/images/screen/head-full.png");
          }
          .h_img{
            margin-top: 3px;
            margin-right: 4px;
            width: 16px;
            height: 18px;
            background-repeat: no-repeat;
            background-size: 16px;
            background-position: 0;
            display: inline-block;
            vertical-align: text-top;
            &.h_setting{
              background-image: url("../../../assets/images/screen/head-setting.png");
            }
            &.h_all{
              background-image: url("../../../assets/images/screen/head-all.png");
            }
          }
          .t_title{

          }
        }
      }
    }
    .home-content {
      display: flex;
      .list-item {
        width: 506px;
        height: 310px;
        margin-bottom: 15px;
        background-image: url("../../../assets/images/screen/content-lc.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        box-shadow: inset 0 0 12px 6px rgba(0, 122, 255, 0.36);
        border-radius: 16px;
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
          background-size: 100% 100%;
        }
        .list-item-middle {
          width: 800px;
          height: 534px;
          margin-bottom: 15px;
          background-image: url("../../../assets/images/screen/content-mid.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .list-item-bottom {
          width: 800px;
          height: 310px;
          background-image: url("../../../assets/images/screen/content-bom.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .title {
          font-size: 18px;
          color: #00D7E9;
          text-align: left;
          padding: 18px 16px 10px 16px;
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
