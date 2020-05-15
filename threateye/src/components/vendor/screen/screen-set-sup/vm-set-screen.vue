<template>
    <div class="vm_set_screen_1">
      <el-header class="set-header">
        <h3 class="title">两侧内容设置</h3>
        <div class="btn-group">
          <el-button class="btn btn_cacel" @click="click_screen_cancel();">取消</el-button>
          <el-button class="btn btn_ok" @click="click_screen_ok();">确认</el-button>
        </div>
      </el-header>
      <div class="set-mainer">
        <div class="set-mainer-list">
          <screen :close="false" :topClose="false"></screen>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import screen from '../Screen.vue'
  export default {
    name: "vm_set_screen_1",
    components:{screen},
    methods:{
      //取消按钮点击
      click_screen_cancel() {

      },
      //确认按钮点击
      click_screen_ok() {
        //this.$store.commit('SCREEN_ASIDE_LISTS', this.setAsideLists);
        this.$router.push({path: '/screen'});
      }
    }
  }
</script>

<style scoped lang="less">
.vm_set_screen_1{
  /deep/
  .set-header {
    height: 56px !important;
    line-height: 56px !important;
    padding: 0 56px 0 16px;
    position: fixed;
    top: 0;
    left: 250px;
    z-index: 1000;
    background-color: #fff;
    width: calc(100vw - 250px);

    .title {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      text-align: left;
      float: left;
    }

    .btn-group {
      float: right;
      /deep/
      .btn {
        margin: 9px 0;
        border: 1px solid #0070FF;
        width: 136px;
        height: 38px;
        line-height: initial;
        border-radius: 0;
        font-size: 16px;
        padding: 0;
        font-family: PingFangSC-Regular;

        &.btn_cacel {
          background: #fff;
          color: #0070FF;
        }

        &.btn_ok {
          background: #0070FF;
          color: #FFFFFF;
        }
      }
    }
  }
  /deep/
  .set-mainer {
     margin-top: 56px;
     height: calc(100vh - 120px);
     background: #00113c;
     padding: 0;

    /*height: calc(100vh + 220px);*/
     overflow-y: hidden;
    .set-mainer-list {
      zoom: 0.88;
     /* height: calc(100vh - 120px);*/
    }
  }
}
</style>
