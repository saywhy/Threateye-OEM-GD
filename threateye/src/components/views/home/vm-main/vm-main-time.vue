<template>
  <div class="vm-main-time">
    <el-date-picker
      v-model="threatDate"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'vm-main-time',
    data() {
      return {
        threatDate:'2019-10-19'
      }
    }
  }
</script>
<style lang="less">
  .vm-main-time{
    position: absolute;
    z-index: 999;
    width: 130px;
    height: 28px;
    top: 10px;
    right: 20px;
    .el-date-editor{
      width: 130px;
      .el-input__inner{
        height: 28px;
        line-height: 28px;
        padding: 0 15px 0 10px;
        font-size: 12px;
        border-radius: 0;
        border: 1px solid #DDDDDD;
      }
      .el-input__prefix{
        display: none;
        width: 0;
      }
      .el-input__suffix{
        right: 5px;
        width: 25px;
        background-repeat: no-repeat;
        background-image: url("../../../../assets/images/home/common/date.png");
        background-position: 5px;
        .el-input__suffix-inner{
          .el-input__icon{
            display: none;
          }
        }
      }
    }
  }
</style>
