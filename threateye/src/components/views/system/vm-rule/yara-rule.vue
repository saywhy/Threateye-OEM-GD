<template>
  <div id="yara_rule">
    <p>
      <img src=""
           alt="">
      <span>文件大小：8 B</span>
    </p>
    <p class="updata_time">上次更新时间：2019.11.25 15:23:56 </p>
    <div class="btn_box">
      <el-button class="btn_i">下载</el-button>
      <el-button class="btn_i">替换</el-button>
      <el-button class="btn_o">删除</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "yara_rule",
  data () {
    return {
      rule: {
        upload_pop: false
      }
    };
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () { },

  methods: {
  }
};
</script>

<style scoped lang="less">
#yara_rule {
  text-align: left;
  .updata_time {
    margin-top: 14px;
  }
  .btn_box {
    margin-top: 48px;
    .btn_i {
      width: 136px;
      height: 42px;
      background: #0070ff;
      color: #fff;
    }
    .btn_o {
      width: 136px;
      height: 42px;
      background: #fff;
      border: 1px solid #0070ff;
      color: #0070ff;
    }
  }
}
</style>
<style lang='less'>
</style>
